import React, { useState } from 'react';
import { Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, selectedSize: string, selectedColor: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Default');
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1800);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group flex flex-col bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quiet top text kicker - Zero-pill discipline: quiet unboxed label */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-medium text-stone-800 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs">
          <span>{product.subcategory}</span>
          {discountPercent > 0 && (
            <>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-amber-800 font-semibold">{discountPercent}% Off</span>
            </>
          )}
        </div>

        {/* Quick View Hover Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-stone-900 text-xs font-semibold py-2 px-3 rounded-lg shadow-sm flex items-center justify-center gap-1.5 backdrop-blur-xs cursor-pointer transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Clean Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-medium text-[11px]">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.fabric}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Clean Price Row */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-bold text-stone-900 font-mono tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-[11px] text-stone-500 ml-auto">
              ★ {product.rating} ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Size Selection & Quick Add Button */}
        <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
          {/* Size Selector Buttons */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500 text-[11px]">Size:</span>
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              {product.sizes.slice(0, 4).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-1.5 py-0.5 text-[11px] rounded transition-colors cursor-pointer ${
                    selectedSize === size
                      ? 'bg-stone-900 text-white font-medium'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {size}
                </button>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-[10px] text-stone-400">+{product.sizes.length - 4}</span>
              )}
            </div>
          </div>

          {/* Add to Bag Direct Action */}
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              isAddedRecently
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-100 hover:bg-stone-900 text-stone-900 hover:text-white'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
