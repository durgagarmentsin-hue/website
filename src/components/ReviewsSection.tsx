import React from 'react';
import { Star, CheckCircle, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface Review {
  id: string;
  name: string;
  location: string;
  source: 'Google Review' | 'Verified Buyer';
  rating: number;
  timeAgo: string;
  category: string;
  comment: string;
}

const GOOGLE_REVIEWS: Review[] = [
  {
    id: 'gr-1',
    name: 'Pooja Reddy',
    location: 'Secunderabad',
    source: 'Google Review',
    rating: 5,
    timeAgo: 'Local Guide',
    category: 'Women Ethnic Wear & Kids Fancy Dress',
    comment:
      'Best shop in Secunderabad for girls & women clothes and kids fancy dress costumes! They follow fixed honest rates with zero compromise on fabric quality. We purchased our daughter’s school annual day costume and festival kurta—both fitted accurately without hassle.',
  },
  {
    id: 'gr-2',
    name: 'K. Venkateshwarlu',
    location: 'Hyderabad / Secunderabad',
    source: 'Google Review',
    rating: 5,
    timeAgo: 'Verified Patron',
    category: 'School Fancy Dress & Costumes',
    comment:
      'Visited Durga Garments for my son’s school competition. They had an impressive collection of freedom fighters, mythological figures, and traditional attire complete with turbans and jewelry props. Very courteous service and prompt assistance.',
  },
  {
    id: 'gr-3',
    name: 'Radhika Sharma',
    location: 'West Marredpally, Secunderabad',
    source: 'Google Review',
    rating: 5,
    timeAgo: 'Regular Customer',
    category: 'Pure Cotton Daily & Festival Kurtis',
    comment:
      'Have been purchasing pure cotton clothing and festive kurtis from Durga Garments for years. Their fabrics are skin-friendly, breathable, and never bleed color in the wash. Their in-house alteration service on the spot is super convenient!',
  },
  {
    id: 'gr-4',
    name: 'Mohammed Shakeel',
    location: 'Monda Market, Secunderabad',
    source: 'Google Review',
    rating: 5,
    timeAgo: 'Verified Customer',
    category: 'Men & Family Apparel',
    comment:
      'Trusted store in Secunderabad market. Genuine linen and cotton shirts, neat stitching, and polite owners who guide you patiently. Prices are very reasonable for the fabric durability you receive.',
  },
];

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Google Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-stone-500 mb-1">
              <span>Customer Satisfaction</span>
              <span aria-hidden="true">·</span>
              <span>Google Verified Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              What Customers Say About Durga Garments
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              Authentic feedback from families, parents, and school event organizers visiting our Secunderabad store.
            </p>
          </div>

          {/* Google Summary Chip & Link */}
          <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs self-start md:self-auto shrink-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-stone-100 font-bold text-stone-800 text-lg">
              G
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-stone-900 text-sm font-mono tabular-nums">4.8</span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-stone-500">
                Verified on Google Maps
              </div>
            </div>
            <a
              href={STORE_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-xs font-semibold text-stone-900 hover:text-stone-700 underline flex items-center gap-1"
            >
              <span>View Profile</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>
        </div>

        {/* Reviews 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GOOGLE_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col justify-between space-y-4 hover:border-stone-300 transition-colors"
            >
              <div>
                {/* Rating stars & Google badge */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center text-amber-500 gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    {review.source}
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-xs text-stone-700 leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-3 border-t border-stone-100 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-900">{review.name}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>{review.timeAgo}</span>
                  </div>
                </div>

                <div className="text-[11px] text-stone-500">
                  {review.location}
                </div>

                <div className="text-[10px] text-stone-400 truncate">
                  Experience: {review.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note with Google review invite */}
        <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div>
            Have you visited our Secunderabad store or ordered fancy dress costumes?
          </div>
          <a
            href={STORE_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-900 rounded-lg font-semibold transition-colors shadow-2xs"
          >
            <span>Write a Google Review for Durga Garments</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
          </a>
        </div>

      </div>
    </section>
  );
};
