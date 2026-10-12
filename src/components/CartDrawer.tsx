import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_INFO } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedCheckout: (discountAmount: number, promoCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const threshold = STORE_INFO.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, threshold - subtotal);
  const shippingCharge = subtotal >= threshold || items.length === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - appliedDiscount + shippingCharge);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'DURGA10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setCouponMessage({ text: 'Coupon DURGA10 applied! 10% discount added.', isError: false });
    } else if (code === 'WELCOME50') {
      const discount = Math.min(150, Math.round(subtotal * 0.05));
      setAppliedDiscount(discount);
      setCouponMessage({ text: 'Welcome discount applied! ₹' + discount + ' off.', isError: false });
    } else {
      setCouponMessage({ text: 'Invalid coupon code. Try DURGA10', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/50 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h2 className="text-base font-semibold text-stone-900">Your Shopping Bag</h2>
            <span className="text-xs text-stone-500 font-mono">({items.length} items)</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close shopping bag"
            className="p-1 text-stone-400 hover:text-stone-900 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-stone-50 p-3 sm:px-5 border-b border-stone-200 text-xs">
          {remainingForFreeShipping > 0 ? (
            <div>
              <div className="flex items-center justify-between text-stone-700 mb-1">
                <span>Add <strong>₹{remainingForFreeShipping}</strong> more for Free Shipping</span>
                <span className="font-mono text-[11px] text-stone-500">{Math.round((subtotal / threshold) * 100)}%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-stone-900 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / threshold) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="text-emerald-700 font-medium flex items-center gap-1.5">
              <span>✓ Free Nationwide Express Delivery unlocked!</span>
            </div>
          )}
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-sm font-medium text-stone-800">Your bag is empty</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our handpicked collection of cottons, linens, and festive wear.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 pb-4 border-b border-stone-100 last:border-b-0"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 bg-stone-100 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-2">
                      <span>Size: <strong>{item.size}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Color: {item.color}</span>
                    </div>

                    <div className="mt-1 font-mono text-xs font-bold text-stone-900 tabular-nums">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-stone-200 rounded bg-white text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 font-mono text-[11px] font-medium text-stone-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-[10px] text-stone-400">₹{item.product.price} each</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Calculation */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 space-y-3">
            {/* Promo code form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon (e.g. DURGA10)"
                  className="w-full pl-8 pr-2 py-1.5 text-xs bg-white border border-stone-200 rounded-lg uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold bg-stone-800 text-white rounded-lg hover:bg-stone-900 cursor-pointer"
              >
                Apply
              </button>
            </form>

            {couponMessage && (
              <p className={`text-[11px] ${couponMessage.isError ? 'text-red-600' : 'text-emerald-700'}`}>
                {couponMessage.text}
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount</span>
                  <span className="font-mono tabular-nums">-₹{appliedDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono tabular-nums text-stone-900">
                  {shippingCharge === 0 ? <span className="text-emerald-700 font-medium">FREE</span> : `₹${shippingCharge}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-1.5 border-t border-stone-200">
                <span>Estimated Total</span>
                <span className="font-mono tabular-nums">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => onProceedCheckout(appliedDiscount, couponCode)}
              className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500 pt-1">
              <ShieldCheck className="w-3 h-3 text-stone-600" />
              <span>Safe & Secure Checkout · Cash on Delivery Supported</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
