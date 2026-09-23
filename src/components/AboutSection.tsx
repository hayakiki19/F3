import React from 'react';
import { ShieldCheck, Dumbbell, Clock, Compass, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutSection: React.FC = () => {
  const { openBookingModal } = useApp();

  return (
    <section id="about" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial split: Large statement + details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-[#FF6A00]"></span>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0A0A0A]">
                ABOUT FITNESS PRO ACADEMY
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black text-[#0A0A0A] uppercase tracking-tight leading-[0.95] mb-6">
              THE GYM COMMUTE IS DEAD. YOUR LIVING ROOM IS THE ARENA.
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal mb-6">
              Founded on a simple realization: 82% of gym memberships go unused because travel, traffic, and crowded weight rooms kill consistency.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              Fitness Pro Academy connects ambitious individuals directly with vetted, certified personal trainers who bring commercial-grade resistance gear straight to your door. We remove every excuse between you and your peak physical form.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-6 bg-neutral-50 border-2 border-black">
              <span className="font-editorial text-4xl font-black text-[#0A0A0A]">3.4x</span>
              <p className="text-xs font-black uppercase tracking-wider text-[#FF6A00] mt-1">
                Higher Consistency
              </p>
              <p className="text-xs text-neutral-600 mt-2">
                Home clients complete 92% of their scheduled training sessions compared to 27% at commercial gyms.
              </p>
            </div>

            <div className="p-6 bg-neutral-50 border-2 border-black">
              <span className="font-editorial text-4xl font-black text-[#0A0A0A]">100%</span>
              <p className="text-xs font-black uppercase tracking-wider text-[#8DD8FF]">
                Background Checked
              </p>
              <p className="text-xs text-neutral-600 mt-2">
                Every trainer completes criminal background checks, CPR/AED validation, and hands-on movement audits.
              </p>
            </div>

            <div className="p-6 bg-neutral-50 border-2 border-black">
              <span className="font-editorial text-4xl font-black text-[#0A0A0A]">1,200+</span>
              <p className="text-xs font-black uppercase tracking-wider text-[#0A0A0A]">
                Home Sessions / Mo
              </p>
              <p className="text-xs text-neutral-600 mt-2">
                Delivering personalized hypertrophy, fat loss, and mobility programs across metropolitan homes.
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0A] text-white p-6 border-2 border-black flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase text-[#FF6A00] tracking-wider block">
                  READY TO START?
                </span>
                <p className="text-sm font-bold mt-1 text-white uppercase">
                  Book a trial today.
                </p>
              </div>
              <button
                onClick={() => openBookingModal(undefined, 'Trial Session')}
                className="mt-4 text-xs font-black uppercase tracking-wider text-white underline text-left hover:text-[#8DD8FF]"
              >
                Schedule First Session →
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="border-t border-neutral-200 pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Clock className="w-6 h-6 text-[#FF6A00]" />
            <h4 className="font-editorial text-lg font-black uppercase text-black">Built Around Your Life</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Early morning before the kids wake up, lunch break, or late evening after work. Your coach conforms to your calendar.
            </p>
          </div>

          <div className="space-y-2">
            <Dumbbell className="w-6 h-6 text-[#FF6A00]" />
            <h4 className="font-editorial text-lg font-black uppercase text-black">All Gear Supplied</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              No need to buy thousands in equipment. Coaches arrive with adjustable dumbbells, kettlebells, TRX, and sanitized mats.
            </p>
          </div>

          <div className="space-y-2">
            <Compass className="w-6 h-6 text-[#FF6A00]" />
            <h4 className="font-editorial text-lg font-black uppercase text-black">Precision Tailored</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Never a generic cookie-cutter routine. Every workout adapts to your posture, biomechanics, and daily energy levels.
            </p>
          </div>

          <div className="space-y-2">
            <Award className="w-6 h-6 text-[#FF6A00]" />
            <h4 className="font-editorial text-lg font-black uppercase text-black">Elite Coaches Only</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Only the top 4% of coach applicants pass our practical exam, background check, and client communication vetting.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
