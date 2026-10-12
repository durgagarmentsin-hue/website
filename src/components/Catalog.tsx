import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';

interface CatalogProps {
  products: Product[];
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onQuickView,
  onAddToCart,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (activeCategory !== 'all') {
          if (activeCategory === 'ethnic') {
            if (p.category !== 'ethnic' && !p.subcategory.toLowerCase().includes('ethnic')) {
              return false;
            }
          } else if (p.category !== activeCategory) {
            return false;
          }
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchSub = p.subcategory.toLowerCase().includes(q);
          const matchFabric = p.fabric.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchSub && !matchFabric) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // featured default
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, activeCategory, searchQuery, sortBy]);

  const categoriesList: { key: Category; label: string }[] = [
    { key: 'all', label: 'All Collections' },
    { key: 'kids', label: 'Kids & Costumes' },
    { key: 'ethnic', label: 'Festive & Ethnic' },
    { key: 'women', label: 'Women' },
    { key: 'men', label: 'Men' },
  ];

  return (
    <section id="catalog-section" className="py-14 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-1">
              Curated Clothing Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Durga Garments Collection
            </h2>
          </div>

          <div className="text-xs text-stone-500">
            Showing <span className="font-semibold text-stone-800 font-mono tabular-nums">{filteredProducts.length}</span> items
          </div>
        </div>

        {/* Filter Controls Bar (Interactive tabs + Sorting) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          
          {/* Segmented Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categoriesList.map((cat) => (
              <button
                key={cat.key}
                onClick={() => onSelectCategory(cat.key)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 hover:text-stone-950'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-stone-500 shrink-0" />
            <select
              value={sortBy}
              aria-label="Sort apparel items"
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-stone-200 text-stone-800 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-stone-400 cursor-pointer shadow-xs"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Active Search Filter Chip if any */}
        {searchQuery && (
          <div className="mt-4 flex items-center gap-2 text-xs text-stone-600 bg-white py-2 px-3 rounded-lg border border-stone-200 w-fit">
            <span>Filter by: <strong className="text-stone-900">"{searchQuery}"</strong></span>
            <button
              onClick={() => onSearchChange('')}
              className="text-stone-400 hover:text-stone-900 ml-2 font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={(p, size, color) => onAddToCart(p, size, color)}
              />
            ))}
          </div>
        ) : (
          /* Empty Filter State with Reset Action */
          <div className="mt-12 text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 max-w-md mx-auto space-y-4">
            <Filter className="w-8 h-8 text-stone-400 mx-auto" />
            <h3 className="text-base font-semibold text-stone-900">No matching apparel found</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              We couldn't find items matching your current filters. Try searching for "linen", "cotton", or switch categories.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                onSearchChange('');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
