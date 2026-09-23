import React, { useState } from 'react';
import { PRODUCT_RECOMMENDATIONS } from '../data/mockData';
import { Star, ShoppingBag, Check, Zap } from 'lucide-react';

export const ProductRecommendations: React.FC = () => {
  const [requestedId, setRequestedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRecommend = (prodName: string, id: string) => {
    setRequestedId(id);
    setToastMessage(`"${prodName}" added to your coach review! Your trainer will discuss this during your next home session.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <section className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#FF6A00]"></span>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0A0A0A]">
                PERFORMANCE NUTRITION
              </span>
            </div>
            <h3 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-[#0A0A0A] tracking-tight">
              CURATED SUPPLEMENTS & RECOVERY
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
              While our trainers bring complete equipment sets to every session, these lab-tested, coach-approved supplements accelerate muscle recovery and sustain high energy levels.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
            <Zap className="w-4 h-4 text-[#FF6A00]" />
            <span>Curated by Sports Nutritionists</span>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="mb-6 p-3 bg-neutral-900 text-white border-l-4 border-[#FF6A00] flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200 text-xs font-bold uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#FF6A00]" />
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-neutral-400 hover:text-white text-[11px] underline ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCT_RECOMMENDATIONS.map((prod) => {
            const isAdded = requestedId === prod.id;
            return (
              <div
                key={prod.id}
                className="bg-neutral-50 border border-neutral-200 p-4 flex flex-col justify-between hover:border-black transition"
              >
                <div>
                  <div className="aspect-square bg-neutral-200 overflow-hidden mb-3 border border-neutral-200 relative group">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-2 right-2 bg-black/85 text-white text-[9px] font-black uppercase px-2 py-0.5 tracking-wider">
                      Tested Pure
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500 uppercase mb-1">
                    <span className="text-[#FF6A00] font-black">{prod.category}</span>
                    <div className="flex items-center text-black">
                      <Star className="w-3 h-3 fill-[#FF6A00] text-[#FF6A00] mr-0.5" />
                      <span>{prod.rating}</span>
                    </div>
                  </div>

                  <h4 className="font-editorial text-base font-black uppercase text-black leading-snug">
                    {prod.name}
                  </h4>

                  <p className="text-xs text-neutral-600 mt-1.5 line-clamp-2">
                    {prod.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between">
                  <span className="font-black text-base text-black">
                    ₹{prod.price.toLocaleString('en-IN')}
                  </span>

                  <button
                    onClick={() => handleRecommend(prod.name, prod.id)}
                    className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition flex items-center gap-1.5 ${
                      isAdded
                        ? 'bg-green-700 text-white'
                        : 'bg-black hover:bg-[#FF6A00] text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add via Coach</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
