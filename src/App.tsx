/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, Category } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { StoreStory } from './components/StoreStory';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PolicyModal } from './components/PolicyModal';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dg_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoCode, setPromoCode] = useState<string>('');

  const [policyModal, setPolicyModal] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
  }>({
    isOpen: false,
    title: '',
    content: '',
  });

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem('dg_cart', JSON.stringify(cart));
    } catch {
      // localStorage fallback
    }
  }, [cart]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (
    product: Product,
    size: string,
    color: string,
    quantity: number = 1
  ) => {
    const compositeId = `${product.id}-${size}-${color}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === compositeId);
      if (existing) {
        return prev.map((item) =>
          item.id === compositeId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: compositeId,
          product,
          size,
          color,
          quantity,
        },
      ];
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleProceedCheckout = (discount: number, promo: string) => {
    setAppliedDiscount(discount);
    setPromoCode(promo);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    setCart([]);
    setAppliedDiscount(0);
    setPromoCode('');
  };

  const scrollToCatalog = () => {
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStore = () => {
    const storeElem = document.getElementById('store-section');
    if (storeElem) {
      storeElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans antialiased selection:bg-stone-900 selection:text-white">
      {/* Navigation Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onScrollToStore={scrollToStore}
      />

      <main className="flex-1">
        {/* Campaign Hero Section */}
        <Hero
          onExploreClick={scrollToCatalog}
          onStoreClick={scrollToStore}
        />

        {/* Curated Product Catalog */}
        <Catalog
          products={PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onQuickView={(product) => setSelectedProduct(product)}
          onAddToCart={(product, size, color) => handleAddToCart(product, size, color, 1)}
        />

        {/* Physical Store & Craftsmanship */}
        <StoreStory />

        {/* Real Attributable Reviews */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={setActiveCategory}
        onScrollToStore={scrollToStore}
        onOpenPolicyModal={(title, text) =>
          setPolicyModal({ isOpen: true, title, content: text })
        }
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={handleProceedCheckout}
      />

      {/* Order Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        appliedDiscount={appliedDiscount}
        promoCode={promoCode}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Information & Store Policy Modal */}
      <PolicyModal
        isOpen={policyModal.isOpen}
        onClose={() => setPolicyModal({ ...policyModal, isOpen: false })}
        title={policyModal.title}
        content={policyModal.content}
      />
    </div>
  );
}
