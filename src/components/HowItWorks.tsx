import React from 'react';
import { Target, Users, Home, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HowItWorks: React.FC = () => {
  const { openBookingModal } = useApp();

  return (
    <section id="how-it-works" className="py-20 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 bg-[#FF6A00]"></span>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0A0A0A]">
              THE PROCESS
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black text-[#0A0A0A] uppercase tracking-tight leading-[0.95] max-w-3xl">
            GET FIT WITHOUT GOING TO THE GYM.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl font-normal">
            We eliminated gym commutes, waiting for machines, and crowded locker rooms. Professional personal training delivered straight to your home.
          </p>
        </div>

        {/* 3 Step Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 01 */}
          <div className="bg-white border-2 border-[#0A0A0A] p-8 flex flex-col justify-between relative group hover:border-[#FF6A00] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-editorial text-5xl font-black text-neutral-300 group-hover:text-[#FF6A00] transition-colors">
                  01
                </span>
                <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center border border-neutral-200">
                  <Target className="w-6 h-6 text-[#0A0A0A]" />
                </div>
              </div>
              <h3 className="font-editorial text-2xl font-black uppercase tracking-tight text-[#0A0A0A] mb-3">
                Tell us your goal
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Tell us your fitness goals, preferences and availability. Whether weight loss, muscle hypertrophy, athletic conditioning, or rehab, we tailor the blueprint to your body.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 group-hover:text-[#0A0A0A] transition">
              <span>Goal Assessment</span>
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-white border-2 border-[#0A0A0A] p-8 flex flex-col justify-between relative group hover:border-[#FF6A00] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-editorial text-5xl font-black text-neutral-300 group-hover:text-[#FF6A00] transition-colors">
                  02
                </span>
                <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center border border-neutral-200">
                  <Users className="w-6 h-6 text-[#0A0A0A]" />
                </div>
              </div>
              <h3 className="font-editorial text-2xl font-black uppercase tracking-tight text-[#0A0A0A] mb-3">
                Choose your trainer
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Find a trainer based on your goals, location, availability and preferences. Review certifications, client reviews, and training approaches to find your perfect match.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 group-hover:text-[#0A0A0A] transition">
              <span>Verified Certified Coaches</span>
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-white border-2 border-[#0A0A0A] p-8 flex flex-col justify-between relative group hover:border-[#FF6A00] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-editorial text-5xl font-black text-neutral-300 group-hover:text-[#FF6A00] transition-colors">
                  03
                </span>
                <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center border border-neutral-200">
                  <Home className="w-6 h-6 text-[#0A0A0A]" />
                </div>
              </div>
              <h3 className="font-editorial text-2xl font-black uppercase tracking-tight text-[#0A0A0A] mb-3">
                Train at home
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Book your sessions and train with your professional trainer at home. Your coach brings all sanitized equipment needed. You only need a 2x2 meter space.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 group-hover:text-[#0A0A0A] transition">
              <span>All Equipment Provided</span>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-[#0A0A0A] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-l-8 border-[#FF6A00]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8DD8FF]">
              ZERO COMMITMENT FIRST STEP
            </p>
            <h4 className="font-editorial text-2xl sm:text-3xl font-black uppercase text-white mt-1">
              Start with a ₹499 Trial Session at your home
            </h4>
          </div>
          <button
            onClick={() => openBookingModal(undefined, 'Trial Session')}
            className="bg-[#FF6A00] hover:bg-[#e05d00] text-white font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 flex items-center gap-2 shrink-0 transition"
          >
            <span>BOOK TRIAL NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
