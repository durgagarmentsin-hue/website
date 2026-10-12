import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onScrollToStore: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onScrollToStore,
}) => {
  const [promoBannerVisible, setPromoBannerVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNavClick = (cat: Category) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* 1 Slim Dismissible Promotional Banner (<= 40px) */}
      {promoBannerVisible && (
        <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 flex items-center justify-between border-b border-stone-800">
          <div className="mx-auto flex items-center gap-2 font-medium tracking-wide">
            <span>Special Summer Collection · Free Express Delivery on orders above ₹1,499</span>
            <span aria-hidden="true" className="text-stone-500 hidden sm:inline">·</span>
            <span className="text-stone-400 hidden sm:inline">Use code DURGA10 for 10% off</span>
          </div>
          <button
            onClick={() => setPromoBannerVisible(false)}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-white p-1 ml-2 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: 3 Zones (Brand, Nav Links, Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-stone-700 transition-colors"
          >
            Durga Garments
          </a>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <button
              onClick={() => handleNavClick('all')}
              className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'all' ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-900' : ''
              }`}
            >
              All Apparel
            </button>
            <button
              onClick={() => handleNavClick('women')}
              className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'women' ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-900' : ''
              }`}
            >
              Women
            </button>
            <button
              onClick={() => handleNavClick('men')}
              className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'men' ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-900' : ''
              }`}
            >
              Men
            </button>
            <button
              onClick={() => handleNavClick('kids')}
              className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'kids' ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-900' : ''
              }`}
            >
              Kids
            </button>
            <button
              onClick={() => handleNavClick('ethnic')}
              className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'ethnic' ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-900' : ''
              }`}
            >
              Festive & Ethnic
            </button>
            <button
              onClick={() => {
                onScrollToStore();
                setMobileMenuOpen(false);
              }}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-stone-500"
            >
              Our Store
            </button>
          </nav>

          {/* Zone 3: Primary Action & Utilities */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Search */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-stone-100 rounded-lg px-2.5 py-1.5 border border-stone-200">
                  <Search className="w-4 h-4 text-stone-500 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search fabrics, kurtas..."
                    autoFocus
                    className="w-36 sm:w-48 bg-transparent text-xs text-stone-900 pl-2 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      setShowSearchInput(false);
                      onSearchChange('');
                    }}
                    className="text-stone-400 hover:text-stone-700 text-xs pl-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  aria-label="Search clothing"
                  className="p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              aria-label={`Shopping bag with ${cartCount} items`}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag</span>
              <span className="bg-stone-800 text-stone-100 px-1.5 py-0.5 rounded text-[11px] font-mono tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-950 rounded-lg cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('all')}
              className={`text-left py-2 px-3 rounded-md text-sm font-medium ${
                activeCategory === 'all' ? 'bg-stone-100 text-stone-900 font-semibold' : 'text-stone-700'
              }`}
            >
              All Apparel
            </button>
            <button
              onClick={() => handleNavClick('women')}
              className={`text-left py-2 px-3 rounded-md text-sm font-medium ${
                activeCategory === 'women' ? 'bg-stone-100 text-stone-900 font-semibold' : 'text-stone-700'
              }`}
            >
              Women Collection
            </button>
            <button
              onClick={() => handleNavClick('men')}
              className={`text-left py-2 px-3 rounded-md text-sm font-medium ${
                activeCategory === 'men' ? 'bg-stone-100 text-stone-900 font-semibold' : 'text-stone-700'
              }`}
            >
              Men Collection
            </button>
            <button
              onClick={() => handleNavClick('kids')}
              className={`text-left py-2 px-3 rounded-md text-sm font-medium ${
                activeCategory === 'kids' ? 'bg-stone-100 text-stone-900 font-semibold' : 'text-stone-700'
              }`}
            >
              Kids Collection
            </button>
            <button
              onClick={() => handleNavClick('ethnic')}
              className={`text-left py-2 px-3 rounded-md text-sm font-medium ${
                activeCategory === 'ethnic' ? 'bg-stone-100 text-stone-900 font-semibold' : 'text-stone-700'
              }`}
            >
              Festive & Ethnic
            </button>
            <button
              onClick={() => {
                onScrollToStore();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-md text-sm font-medium text-stone-700 hover:bg-stone-100 flex items-center justify-between"
            >
              <span>Visit Our Physical Store</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
