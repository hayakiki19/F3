import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCT_RECOMMENDATIONS } from '../data/mockData';
import {
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Star,
  Award,
  ArrowRight,
  Filter,
  Check,
  HeartPulse,
  Flame,
  Zap,
  Package,
  Clock,
  RefreshCw,
} from 'lucide-react';

export const SupplementsPage: React.FC = () => {
  const { navigateToPage, openBookingModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'protein' | 'creatine' | 'hydration' | 'vitamins'>('all');
  const [selectedDiet, setSelectedDiet] = useState<'all' | 'veg' | 'vegan' | 'keto'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Extended catalog of authentic clinical sports supplements
  const supplementCatalog = [
    {
      id: 'supp-1',
      name: 'Pro-Isolate 100% Hydrolyzed Whey',
      category: 'protein',
      flavor: 'Belgian Dark Chocolate',
      weight: '1.0 kg (30 Servings)',
      price: 3499,
      originalPrice: 4299,
      rating: 4.9,
      reviewsCount: 142,
      diet: 'veg',
      macros: '27g Protein · 0g Sugar · 5.8g BCAAs',
      desc: 'Cross-flow micro-filtered whey isolate for rapid muscle protein synthesis. Ultra-pure with zero digestive bloating.',
      certification: 'Informed-Choice & WADA Certified',
      image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=800&q=80',
      badge: 'Best Seller',
    },
    {
      id: 'supp-2',
      name: 'Organic Fermented Plant Protein',
      category: 'protein',
      flavor: 'French Vanilla Pod',
      weight: '900g (28 Servings)',
      price: 2899,
      originalPrice: 3499,
      rating: 4.8,
      reviewsCount: 89,
      diet: 'vegan',
      macros: '25g Organic Pea/Rice Protein · 4.5g Glutamine',
      desc: '100% plant-derived complete amino acid profile with added DigeZyme® digestive enzymes for flawless gut absorption.',
      certification: 'Certified Vegan & Heavy-Metal Tested',
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80',
      badge: 'Vegan Choice',
    },
    {
      id: 'supp-3',
      name: 'Creapure® Micronized Creatine (200 Mesh)',
      category: 'creatine',
      flavor: 'Unflavored (100% Pure)',
      weight: '250g (83 Servings)',
      price: 1299,
      originalPrice: 1699,
      rating: 4.95,
      reviewsCount: 230,
      diet: 'vegan',
      macros: '5000mg Creapure® Monohydrate / scoop',
      desc: 'Manufactured in Germany under strict pharmaceutical GMP standards. Boosts intracellular ATP, power output, and muscle cell volumization.',
      certification: 'Pure Creapure® German Patent',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      badge: 'Gold Standard',
    },
    {
      id: 'supp-4',
      name: 'Hydra-Electrolyte Living Room Intra-Drink',
      category: 'hydration',
      flavor: 'Pink Himalayan Lemon Fizz',
      weight: '30 Sachets Box',
      price: 999,
      originalPrice: 1299,
      rating: 4.85,
      reviewsCount: 110,
      diet: 'vegan',
      macros: 'Sodium 500mg · Potassium 200mg · Magnesium 60mg',
      desc: 'Formulated specifically to replace electrolytes lost in warm Indian living room workouts without sugary maltodextrin.',
      certification: 'Zero Sugar · Keto Friendly',
      image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80',
      badge: 'Cramp Prevention',
    },
    {
      id: 'supp-5',
      name: 'Ultra-Pure Omega-3 Wild Alaskan Fish Oil',
      category: 'vitamins',
      flavor: 'Burp-Free Lemon Enteric',
      weight: '60 Softgels (2 Months)',
      price: 1499,
      originalPrice: 1999,
      rating: 4.9,
      reviewsCount: 96,
      diet: 'keto',
      macros: '1000mg EPA · 400mg DHA Triple Strength',
      desc: 'Molecularly distilled to eliminate mercury and PCBs. Supports joint lubrication, cardiovascular health, and post-workout inflammation.',
      certification: 'IFOS 5-Star Certified Purity',
      image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=800&q=80',
      badge: 'Joint Longevity',
    },
    {
      id: 'supp-6',
      name: 'Daily Athletic Performance Multi-Nutrient',
      category: 'vitamins',
      flavor: '60 Vegetarian Capsules',
      weight: '30 Day Supply',
      price: 1199,
      originalPrice: 1499,
      rating: 4.75,
      reviewsCount: 75,
      diet: 'veg',
      macros: 'Chelated Zinc · Vitamin D3 (2000IU) · K2-MK7 · Ashwagandha',
      desc: 'Active chelated vitamins and KSM-66® organic ashwagandha to support cortisol recovery, deep sleep, and natural hormone balance.',
      certification: 'Non-GMO · Clinical Doses',
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80',
      badge: 'Daily Essential',
    },
  ];

  const handleOrder = (product: typeof supplementCatalog[0]) => {
    setToastMessage(`✓ Order reserved for "${product.name}"! Your assigned coach will hand-deliver it during your next scheduled doorstep visit.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const filteredProducts = supplementCatalog.filter((prod) => {
    if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false;
    if (selectedDiet !== 'all') {
      if (selectedDiet === 'veg' && prod.diet !== 'veg' && prod.diet !== 'vegan') return false;
      if (selectedDiet === 'vegan' && prod.diet !== 'vegan') return false;
      if (selectedDiet === 'keto' && prod.diet !== 'keto') return false;
    }
    return true;
  });

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-[#0A0A0A] pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-50 bg-[#0A0A0A] text-white p-4 rounded-xl border-2 border-[#FF6A00] shadow-2xl max-w-md animate-fade-in flex items-start gap-3">
          <Package className="w-5 h-5 text-[#FF6A00] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold leading-relaxed">{toastMessage}</p>
            <span className="text-[10px] text-neutral-400 mt-1 block">Free delivery · Payment on delivery via UPI/Card</span>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <section className="bg-[#0A0A0A] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF6A00] mb-3">
            <button
              onClick={() => navigateToPage('home')}
              className="hover:underline text-neutral-400 hover:text-white"
            >
              Home
            </button>
            <span className="text-neutral-600">/</span>
            <span>Sports Nutrition & Supplements</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% TESTED AUTHENTIC · HAND-DELIVERED BY YOUR COACH</span>
              </div>
              <h1 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
                CLINICAL SPORTS<br />SUPPLEMENTS
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 max-w-2xl leading-relaxed">
                Zero counterfeit products. No dodgy warehouse shipping delays. We stock lab-tested clinical nutrition and deliver it straight to your hands during your home workout sessions.
              </p>
            </div>

            {/* Delivery Perk */}
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF6A00]/20 text-[#FF6A00] flex items-center justify-center font-black">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase block">Trainer Hand Delivery</span>
                <span className="font-editorial text-xl font-black text-white">Zero Shipping Fees</span>
                <span className="text-[10px] text-neutral-500 block">Arrives with your next session</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-30 bg-white border-b border-neutral-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: 'All Supplements' },
                { id: 'protein', label: 'Whey & Plant Protein' },
                { id: 'creatine', label: 'Creapure® Creatine' },
                { id: 'hydration', label: 'Electrolyte Hydration' },
                { id: 'vitamins', label: 'Vitamins & Joint Care' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl whitespace-nowrap transition shrink-0 border ${
                    selectedCategory === cat.id
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Diet Filter */}
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-200 shrink-0">
              <span className="text-[10px] font-black uppercase text-neutral-400 px-2">Diet:</span>
              {[
                { id: 'all', label: 'All' },
                { id: 'veg', label: 'Vegetarian' },
                { id: 'vegan', label: 'Vegan' },
                { id: 'keto', label: 'Keto' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDiet(d.id as any)}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-lg transition ${
                    selectedDiet === d.id
                      ? 'bg-white text-black font-black shadow-xs'
                      : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Results Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-neutral-500">
            Showing <strong className="text-black">{filteredProducts.length}</strong> Clinical Sports Supplements
          </span>
          <span className="text-xs text-neutral-500">
            🔒 100% Authentic · Third-Party Heavy Metal Screened
          </span>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border-2 border-black overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition group"
            >
              <div>
                {/* Image Header with Badge */}
                <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden p-6 flex items-center justify-center">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                  />

                  <div className="absolute top-3 left-3">
                    <span className="bg-[#0A0A0A] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded tracking-wider">
                      {prod.badge}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-black px-2 py-0.5 rounded text-[11px] font-black flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 fill-[#FF6A00] text-[#FF6A00]" />
                    <span>{prod.rating}</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-bold uppercase">
                    <span>{prod.weight}</span>
                    <span>{prod.flavor}</span>
                  </div>

                  <h3 className="font-editorial text-xl font-black uppercase text-black leading-snug">
                    {prod.name}
                  </h3>

                  {/* Macros Strip */}
                  <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-bold text-neutral-900">
                    {prod.macros}
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                    {prod.desc}
                  </p>

                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{prod.certification}</span>
                  </div>
                </div>
              </div>

              {/* Price & Add to Order Button */}
              <div className="p-5 pt-0 border-t border-neutral-100 mt-2 space-y-3">
                <div className="flex items-baseline justify-between pt-3">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-bold block">Delivery Price</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-editorial text-2xl font-black text-black">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-neutral-400 line-through">
                        ₹{prod.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Free Home Delivery
                  </span>
                </div>

                <button
                  onClick={() => handleOrder(prod)}
                  className="w-full py-3 rounded-xl bg-black hover:bg-[#FF6A00] text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Reserve with Next Session</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quality & Safety Commitments */}
        <section className="bg-neutral-950 text-white rounded-2xl border-2 border-black p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-1">
              THE PURITY GUARANTEE
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-white">
              Why Buy Nutrition Through Fitness Pro Academy?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-[#FF6A00] text-white flex items-center justify-center font-black text-xs">
                01
              </span>
              <h4 className="font-editorial text-lg font-black uppercase text-white">
                Guaranteed 100% Genuine
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Direct procurement from certified European and American raw material manufacturers. Every container features an uncompromised holographic security seal.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-black text-xs border border-neutral-700">
                02
              </span>
              <h4 className="font-editorial text-lg font-black uppercase text-white">
                Batch Lab Analysis
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We independently test random batches at NABL-accredited third-party laboratories to verify label accuracy for protein percentage and heavy metals (lead, arsenic, cadmium).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                03
              </span>
              <h4 className="font-editorial text-lg font-black uppercase text-white">
                Hand-Delivered by Coach
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                No courier delays or heat degradation in delivery vans. Your trainer brings the fresh batch directly into your home during your scheduled workout session.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};
