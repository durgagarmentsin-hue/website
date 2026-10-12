import React, { useState } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Ruler, Sparkles, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Default');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full transition-colors cursor-pointer shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Details */}
          <div className="md:col-span-6 bg-stone-100 flex flex-col justify-center relative">
            <div className="aspect-[3/4] w-full relative">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded font-medium">
                {product.fabric}
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span className="uppercase tracking-wider font-semibold text-stone-600">
                  {product.category} · {product.subcategory}
                </span>
                <span className="font-medium text-stone-700">★ {product.rating} ({product.reviewsCount} reviews)</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-stone-900 font-mono tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-stone-600 text-xs sm:text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Fabric Specs */}
              <div className="mt-4 p-3 bg-stone-50 rounded-lg border border-stone-200/80 text-xs text-stone-700">
                <div className="font-semibold text-stone-900 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-stone-700" />
                  <span>Fabric Quality Promise</span>
                </div>
                <p className="text-stone-600 leading-normal">{product.fabricDetails}</p>
              </div>

              {/* Color Swatches */}
              <div className="mt-5">
                <label className="block text-xs font-semibold text-stone-800 mb-2">
                  Select Color: <span className="font-normal text-stone-600">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-stone-900 scale-110 shadow-xs'
                          : 'border-stone-300 hover:border-stone-500'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-stone-800">
                    Select Size: <span className="font-normal text-stone-600">{selectedSize}</span>
                  </label>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-[11px] text-stone-600 hover:text-stone-900 underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>{showSizeGuide ? 'Hide Measurements' : 'Size Guide'}</span>
                  </button>
                </div>

                {/* Size buttons */}
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                          : 'bg-white border-stone-200 text-stone-800 hover:border-stone-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Size guide table drop */}
                {showSizeGuide && (
                  <div className="mt-3 p-3 bg-stone-50 rounded-lg text-[11px] text-stone-600 border border-stone-200">
                    <div className="font-semibold text-stone-800 mb-1">Standard Garment Fit (Inches):</div>
                    <div className="grid grid-cols-4 gap-1 text-center font-mono">
                      <div className="text-stone-500">Size</div>
                      <div className="text-stone-500">Chest</div>
                      <div className="text-stone-500">Waist</div>
                      <div className="text-stone-500">Length</div>
                      <div className="font-medium text-stone-900">S (38)</div>
                      <div>38-40"</div>
                      <div>30-32"</div>
                      <div>28"</div>
                      <div className="font-medium text-stone-900">M (40)</div>
                      <div>40-42"</div>
                      <div>32-34"</div>
                      <div>29"</div>
                      <div className="font-medium text-stone-900">L (42)</div>
                      <div>42-44"</div>
                      <div>34-36"</div>
                      <div>30"</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Stepper & Stock status */}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-stone-800">Quantity:</span>
                  <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 text-xs font-semibold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-mono font-medium text-stone-900 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 text-xs font-semibold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right text-[11px] text-stone-500">
                  <span className="text-emerald-700 font-medium">In Stock</span> ({product.stockCount} available)
                </div>
              </div>
            </div>

            {/* Buy Module Footer */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 px-4 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm ${
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Shopping Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-stone-500 px-1">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                  <span>Free 7-Day Exchange</span>
                </div>
                <div className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-stone-700" />
                  <span>Free Store Alteration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
