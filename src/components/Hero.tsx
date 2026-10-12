import React from 'react';
import { ArrowDown, ShieldCheck, Sparkles, Scissors, Clock } from 'lucide-react';
import heroImg from '../assets/images/hero_clothing_store_1791791119258.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onStoreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onStoreClick }) => {
  return (
    <section className="relative bg-[#f6f4f0] border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Editorial Prose */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-600">
              <span>Durga Garments</span>
              <span aria-hidden="true">·</span>
              <span>Est. 1998</span>
              <span aria-hidden="true">·</span>
              <span>Authentic Family Apparel</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Everyday Elegance & Handpicked Fabrics
            </h1>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl">
              From festive Dandiya frocks and boys Bandhani kurta sets to royal Banarasi brocades and everyday cottons—experience honest tailoring designed for lasting comfort.
            </p>

            {/* Functional CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Catalog</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onStoreClick}
                className="px-6 py-3.5 text-sm font-medium text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 hover:border-stone-400 transition-colors cursor-pointer"
              >
                Visit Our Store & Tailoring Studio
              </button>
            </div>

            {/* Brief Editorial Metrics (Adjacency Rule) */}
            <div className="pt-4 border-t border-stone-300/60 flex items-center gap-6 text-xs text-stone-600">
              <div>
                <span className="font-semibold text-stone-900 text-sm font-mono tabular-nums">28+</span> Years
                <div className="text-[11px] text-stone-500">Retail Trust</div>
              </div>
              <span aria-hidden="true" className="h-6 w-px bg-stone-300"></span>
              <div>
                <span className="font-semibold text-stone-900 text-sm font-mono tabular-nums">15,000+</span>
                <div className="text-[11px] text-stone-500">Satisfied Families</div>
              </div>
              <span aria-hidden="true" className="h-6 w-px bg-stone-300"></span>
              <div>
                <span className="font-semibold text-stone-900 text-sm font-mono tabular-nums">100%</span>
                <div className="text-[11px] text-stone-500">Natural Fibers</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Storefront Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-300/80 bg-stone-100 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3]">
              <img
                src={heroImg}
                alt="Durga Garments boutique storefront featuring linen shirts and comfortable cotton collections"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-lg p-3 border border-stone-200/80 text-xs text-stone-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-stone-900">Summer & Festive Arrival</div>
                  <div className="text-stone-500 text-[11px]">Handcrafted cottons · Pre-washed linen weaves</div>
                </div>
                <button
                  onClick={onExploreClick}
                  className="text-xs font-semibold text-stone-900 underline hover:text-stone-600 cursor-pointer"
                >
                  View Items
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Item Proof Bar */}
        <div className="mt-12 pt-8 border-t border-stone-300/70 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-stone-900">100% Pure Cottons</h4>
              <p className="text-xs text-stone-500 mt-0.5">Tested for color-fastness & zero shrinking</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Scissors className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-stone-900">On-Site Tailoring</h4>
              <p className="text-xs text-stone-500 mt-0.5">Complimentary alterations at our store</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-stone-900">Festive & Everyday</h4>
              <p className="text-xs text-stone-500 mt-0.5">Curated sizes for Men, Women & Kids</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-stone-900">Same-Day Dispatch</h4>
              <p className="text-xs text-stone-500 mt-0.5">Safe delivery with cash on delivery option</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
