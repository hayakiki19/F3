import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Star, ShieldCheck, Dumbbell, Zap } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { openBookingModal } = useApp();

  const scrollToTrainers = () => {
    const el = document.getElementById('trainers');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative bg-white pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-12 md:pb-20 border-b-2 border-black overflow-hidden">
      
      {/* Background Subtle Accent Grids */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold, Minimalist Typography & Direct CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Bold Brand Kicker */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 bg-[#FF6A00]"></span>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#0A0A0A]">
                FITNESS PRO ACADEMY · HOME TRAINING
              </span>
            </div>

            {/* Huge Headline — Oversized Bold Grotesk */}
            <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.2rem] font-black text-[#0A0A0A] uppercase tracking-tight leading-[0.88] mb-5">
              YOUR TRAINER.<br />
              <span className="stroke-headline text-transparent hover:text-black transition-colors duration-300">
                YOUR HOME.
              </span><br />
              <span className="text-[#FF6A00]">YOUR GOAL.</span>
            </h1>

            {/* Minimal Punchy Subtext (Less text as requested) */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-800 font-medium leading-snug max-w-xl mb-6">
              Elite personal trainers at your doorstep. We bring the gear, the coach, and the intensity. Zero commute.
            </p>

            {/* Large Bold Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
              <button
                onClick={() => openBookingModal(undefined, 'Trial Session')}
                className="bg-[#FF6A00] hover:bg-[#e05d00] text-white font-black text-sm sm:text-base uppercase tracking-wider px-8 py-4 flex items-center justify-center gap-3 transition shadow-sm active:translate-y-0.5"
              >
                <span>BOOK A TRIAL — ₹499</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={scrollToTrainers}
                className="bg-transparent hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white border-2 border-[#0A0A0A] font-black text-sm sm:text-base uppercase tracking-wider px-8 py-3.5 flex items-center justify-center gap-2 transition"
              >
                <span>FIND A TRAINER</span>
              </button>
            </div>

            {/* Crisp Proof Points (Zero pills, unboxed clean typographic layout) */}
            <div className="pt-5 border-t border-neutral-200 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-bold text-neutral-700">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-[#FF6A00] text-[#FF6A00]" />
                <span className="text-black font-black">4.9 / 5.0</span>
                <span className="text-neutral-500 font-normal">Rating</span>
              </div>
              <span className="text-neutral-300">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-neutral-900" />
                <span className="text-black font-black">100% Certified</span>
                <span className="text-neutral-500 font-normal">Coaches</span>
              </div>
              <span className="text-neutral-300">·</span>
              <div className="flex items-center gap-1.5">
                <Dumbbell className="w-4 h-4 text-[#FF6A00]" />
                <span className="text-black font-black">All Gear Brought</span>
                <span className="text-neutral-500 font-normal">To You</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Photography Showcase */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative border-4 border-[#0A0A0A] bg-neutral-950 p-2 shadow-2xl">
              
              {/* Main Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80"
                  alt="Certified personal trainer coaching client in living room"
                  className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
                />

                {/* Subtle dark gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                {/* Floating Top Label */}
                <div className="absolute top-4 left-4 bg-white border-2 border-black px-3 py-1.5 shadow-md">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6A00] block">
                    IN-HOME TRAINING
                  </span>
                  <span className="text-xs font-black uppercase text-black">
                    Zero Commute · 1-on-1
                  </span>
                </div>

                {/* Floating Live Slot Indicator */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0A0A0A] border-2 border-neutral-700 p-3.5 flex items-center justify-between text-white shadow-xl">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-green-400">
                        NEXT SLOT OPEN
                      </span>
                    </div>
                    <p className="text-sm font-black uppercase tracking-tight text-white mt-0.5">
                      Tomorrow · 6:30 AM or 7:00 PM
                    </p>
                  </div>

                  <button
                    onClick={() => openBookingModal(undefined, 'Trial Session')}
                    className="bg-[#FF6A00] hover:bg-[#e05d00] text-white px-3 py-2 text-xs font-black uppercase tracking-wider transition shrink-0"
                  >
                    CLAIM
                  </button>
                </div>
              </div>

            </div>

            {/* Geometric High-Contrast Accents */}
            <div className="hidden sm:block absolute -bottom-3 -right-3 w-24 h-24 bg-[#8DD8FF] -z-10"></div>
            <div className="hidden sm:block absolute -top-3 -left-3 w-20 h-20 border-2 border-[#FF6A00] -z-10"></div>
          </div>

        </div>
      </div>

    </section>
  );
};
