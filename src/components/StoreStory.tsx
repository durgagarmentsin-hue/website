import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Scissors, Check, Sparkles, Navigation, ExternalLink, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export const StoreStory: React.FC = () => {
  const [directionsCopied, setDirectionsCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${STORE_INFO.name}, ${STORE_INFO.address}, ${STORE_INFO.city} - ${STORE_INFO.pincode}`);
    setDirectionsCopied(true);
    setTimeout(() => setDirectionsCopied(false), 2000);
  };

  return (
    <section id="store-section" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heritage, Services and Tailoring */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-500">
              <span>Secunderabad Store & Tailoring Hub</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 leading-tight">
              Durga Garments · Secunderabad
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Located near Monda Market in Secunderabad, Durga Garments is your trusted destination for premium ethnic wear, everyday cotton apparel, and specialized fancy dress costumes. From school annual day programs and cultural festivities to wedding celebrations, we deliver quality craftsmanship, ready-to-wear collections, and tailored fits for the entire family.
            </p>

            {/* Special Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <Sparkles className="w-5 h-5 text-stone-800 mb-2" />
                <h3 className="text-xs font-bold text-stone-900">Fancy Dress & Costumes</h3>
                <p className="text-[11px] text-stone-500 mt-1">
                  Freedom fighters, mythological characters, school annual day & theme event outfits.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <Scissors className="w-5 h-5 text-stone-800 mb-2" />
                <h3 className="text-xs font-bold text-stone-900">Custom Fitting & Tailoring</h3>
                <p className="text-[11px] text-stone-500 mt-1">
                  On-site master alterations and bespoke fitting for retail and bulk orders.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <Clock className="w-5 h-5 text-stone-800 mb-2" />
                <h3 className="text-xs font-bold text-stone-900">Wholesale & Retail</h3>
                <p className="text-[11px] text-stone-500 mt-1">
                  Special rates for schools, dance academies, institutions, and family shoppers.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Retail Store Details Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#f8f6f2] p-6 sm:p-8 rounded-2xl border border-stone-300/80 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                    Flagship Retail Store
                  </span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                    Durga Garments
                  </h3>
                </div>
                <a
                  href={STORE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 bg-white border border-stone-300 px-3 py-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer shadow-2xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </div>

              <div className="space-y-3.5 text-xs text-stone-700">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-stone-900">{STORE_INFO.address}</div>
                    <div className="text-stone-500">{STORE_INFO.city} - {STORE_INFO.pincode}</div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-stone-900">Store Timings</div>
                    <div className="text-stone-600">Mon - Sat: {STORE_INFO.hours.weekdays}</div>
                    <div className="text-stone-600">Sundays: {STORE_INFO.hours.sunday}</div>
                  </div>
                </div>

                {/* Primary Contact */}
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-stone-900">Phone & WhatsApp Helpline</div>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <a
                        href={`tel:${STORE_INFO.rawPhone}`}
                        className="text-stone-800 font-mono font-medium hover:text-stone-950 underline"
                      >
                        {STORE_INFO.phone}
                      </a>
                      <span aria-hidden="true" className="text-stone-400">·</span>
                      <a
                        href={`tel:9030343446`}
                        className="text-stone-600 font-mono hover:text-stone-950 underline"
                      >
                        {STORE_INFO.altPhone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-stone-900">Official Email</div>
                    <a href={`mailto:${STORE_INFO.email}`} className="text-stone-600 hover:text-stone-950 underline">
                      {STORE_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp 9701350123</span>
                </a>

                <button
                  onClick={handleCopyAddress}
                  className="py-2.5 px-3 text-xs font-semibold text-stone-800 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                >
                  {directionsCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Address Copied</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="w-3.5 h-3.5 text-stone-700" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-stone-500 text-center">
                Monda Market Road · Direct Walk-in Trials & Costume Bookings
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
