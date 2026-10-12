import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Truck, Copy, Check } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { STORE_INFO } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedDiscount: number;
  promoCode: string;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedDiscount,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Secunderabad',
    pincode: '500003',
    paymentMethod: 'cod' as 'cod' | 'upi',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [copiedOrder, setCopiedOrder] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const threshold = STORE_INFO.freeShippingThreshold;
  const shippingCharge = subtotal >= threshold ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - appliedDiscount + shippingCharge);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Please enter your full name';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid 10-digit phone number is required';
    if (!formData.address.trim()) errors.address = 'Delivery address is required';
    if (!formData.pincode.trim() || formData.pincode.length !== 6) errors.pincode = 'Valid 6-digit pincode is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newOrder: OrderDetails = {
      orderId: `DG-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      paymentMethod: formData.paymentMethod,
      items: [...items],
      subtotal,
      discount: appliedDiscount,
      shipping: shippingCharge,
      total: grandTotal,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    setCompletedOrder(newOrder);
    onOrderCompleted();
  };

  const handleCopyReceipt = () => {
    if (!completedOrder) return;
    const text = `Durga Garments Order Confirmation\nOrder ID: ${completedOrder.orderId}\nTotal: ₹${completedOrder.total}\nDelivery To: ${completedOrder.customerName}, ${completedOrder.address}, ${completedOrder.city} - ${completedOrder.pincode}\nPayment: ${completedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Prepaid UPI'}`;
    navigator.clipboard.writeText(text);
    setCopiedOrder(true);
    setTimeout(() => setCopiedOrder(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* State 1: Placed Order Success Confirmation */}
        {completedOrder ? (
          <div className="text-center py-4 space-y-5">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-emerald-800">
                Order Placed Successfully
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
                Order #{completedOrder.orderId} Confirmed
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Thank you for shopping at Durga Garments. We are preparing your tailored package for shipment.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-left text-xs space-y-2.5">
              <div className="flex justify-between pb-2 border-b border-stone-200 font-semibold text-stone-900">
                <span>Estimated Delivery</span>
                <span>3 - 5 Business Days</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Recipient:</span>
                <span className="font-medium text-stone-900">{completedOrder.customerName} ({completedOrder.phone})</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Address:</span>
                <span className="font-medium text-stone-900 text-right max-w-xs">{completedOrder.address}, {completedOrder.city} - {completedOrder.pincode}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Payment Mode:</span>
                <span className="font-medium text-stone-900">
                  {completedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (Pay upon arrival)' : 'Instant UPI / Online'}
                </span>
              </div>
              <div className="flex justify-between text-stone-900 pt-2 border-t border-stone-200 font-bold text-sm">
                <span>Total Amount Due:</span>
                <span className="font-mono tabular-nums">₹{completedOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleCopyReceipt}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {copiedOrder ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Receipt Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Order Receipt</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg cursor-pointer transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* State 2: Checkout Form */
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-serif font-bold text-stone-900">Complete Your Order</h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Fast order verification with zero hidden charges.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Sharma"
                  className={`w-full px-3 py-2 text-xs bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400 ${
                    formErrors.name ? 'border-red-400' : 'border-stone-300'
                  }`}
                />
                {formErrors.name && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.name}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Phone Number (for Delivery SMS)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={`w-full px-3 py-2 text-xs bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400 ${
                    formErrors.phone ? 'border-red-400' : 'border-stone-300'
                  }`}
                />
                {formErrors.phone && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.phone}</p>}
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Delivery Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Flat/House no., Street, Landmark"
                  rows={2}
                  className={`w-full px-3 py-2 text-xs bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400 ${
                    formErrors.address ? 'border-red-400' : 'border-stone-300'
                  }`}
                />
                {formErrors.address && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.address}</p>}
              </div>

              {/* City & Pincode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">City / District</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    maxLength={6}
                    placeholder="6-digit pincode"
                    className={`w-full px-3 py-2 text-xs bg-stone-50 border rounded-lg focus:outline-none ${
                      formErrors.pincode ? 'border-red-400' : 'border-stone-300'
                    }`}
                  />
                  {formErrors.pincode && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.pincode}</p>}
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-2">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-start gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.paymentMethod === 'cod'
                        ? 'border-stone-900 bg-stone-50/80 ring-1 ring-stone-900'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="text-xs font-semibold text-stone-900">Cash on Delivery</div>
                      <div className="text-[10px] text-stone-500">Pay cash/UPI at doorstep</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.paymentMethod === 'upi'
                        ? 'border-stone-900 bg-stone-50/80 ring-1 ring-stone-900'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="text-xs font-semibold text-stone-900">Prepaid UPI / Card</div>
                      <div className="text-[10px] text-stone-500">GPay, PhonePe, Cards</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Total Summary */}
              <div className="p-3 bg-stone-100/70 rounded-lg flex items-center justify-between text-xs">
                <span className="text-stone-600">Total payable for {items.length} items:</span>
                <span className="font-bold text-stone-900 font-mono text-sm tabular-nums">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <span>Confirm & Place Order · ₹{grandTotal.toLocaleString('en-IN')}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                <span>Durga Garments Guarantee · 100% Genuine Fabrics</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
