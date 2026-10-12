import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, ArrowRight } from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory: (cat: Category) => void;
  onScrollToStore: () => void;
  onOpenPolicyModal: (policyTitle: string, policyText: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onScrollToStore,
  onOpenPolicyModal,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  const handleCategoryClick = (cat: Category) => {
    onSelectCategory(cat);
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Durga Garments
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Established in Secunderabad (Telangana). Delivering quality ethnic clothing, everyday family apparel, fancy dress costumes for school annual days, and custom tailoring.
            </p>
            <div className="text-xs text-stone-400 space-y-1 pt-1">
              <div>Store: {STORE_INFO.address}, {STORE_INFO.city}</div>
              <div>Timings: {STORE_INFO.hours.weekdays} · Sun: {STORE_INFO.hours.sunday}</div>
            </div>
          </div>

          {/* Quick Collections (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-stone-100 uppercase tracking-wider">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleCategoryClick('women')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Women's Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('men')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Men's Linen & Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('kids')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kids' Festive Cotton
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('ethnic')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ethnic Kurtas & Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All New Arrivals
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-stone-100 uppercase tracking-wider">
              Customer Care & Store
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onScrollToStore}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Visit Physical Store & Trial Rooms
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    onOpenPolicyModal(
                      'Free 7-Day Exchange Policy',
                      'We want you to love your fit! You can exchange unworn, unwashed items within 7 days of delivery. For in-store purchases, bring your invoice for complimentary alteration by our master tailor.'
                    )
                  }
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  7-Day Easy Exchange Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    onOpenPolicyModal(
                      'Shipping & Nationwide Delivery',
                      'We offer express delivery across India. Orders above ₹1,499 qualify for Free Shipping. Standard dispatch occurs within 24 hours from our Rajasthan warehouse, with delivery within 3-5 working days.'
                    )
                  }
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shipping & Pan-India Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    onOpenPolicyModal(
                      'Complimentary In-Store Alterations',
                      'Every garment purchased at Durga Garments is eligible for on-site tailoring adjustments at our Secunderabad retail showroom. Sleeve shortenings, waist cinching, and pant hemming are handled while you browse.'
                    )
                  }
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Complimentary Store Alterations
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    onOpenPolicyModal(
                      'Fabric Care & Longevity Guide',
                      'Our 100% pure cottons and Belgian flax linens are pre-shrunk. Wash in cold or lukewarm water using mild detergent. Avoid prolonged direct sun exposure when drying to maintain vivid natural dye vibrancy.'
                    )
                  }
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pure Fabric Care Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-stone-100 uppercase tracking-wider">
              Stay Connected
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive updates on seasonal handloom weaves, festive arrivals, and store offers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3 py-2 text-xs bg-stone-800 border border-stone-700 rounded-lg text-white placeholder:text-stone-500 focus:outline-none focus:border-stone-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-semibold bg-stone-100 text-stone-900 rounded-lg hover:bg-white transition-colors cursor-pointer shrink-0"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Thank you! Welcome to the Durga Garments family.</span>
                </div>
              )}
            </form>

            <div className="pt-2 text-xs text-stone-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <a href={`mailto:${STORE_INFO.email}`} className="hover:text-white underline">
                  {STORE_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <div className="flex items-center gap-2">
                  <a href={`tel:${STORE_INFO.rawPhone}`} className="hover:text-white font-mono">
                    {STORE_INFO.phone}
                  </a>
                  <span className="text-stone-600">/</span>
                  <a href="tel:9030343446" className="hover:text-white font-mono text-[11px] text-stone-400">
                    {STORE_INFO.altPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1 text-[11px]">
                <a
                  href={STORE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-300 hover:text-white underline flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>View on Google Maps</span>
                </a>
                <span className="text-stone-600">·</span>
                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright & Verification */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} Durga Garments. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Authentic Natural Fabrics</span>
            <span aria-hidden="true">·</span>
            <span>Handmade & Tailored in India</span>
            <span aria-hidden="true">·</span>
            <span>Secure Cash on Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
