import React from 'react';
import { useApp } from '../context/AppContext';
import { TrainingPlan } from '../types';
import { Check, Zap, Sparkles, ArrowRight } from 'lucide-react';

export const PlansSection: React.FC = () => {
  const { plans, openCheckoutModal } = useApp();

  return (
    <section id="plans" className="py-20 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 bg-[#FF6A00]"></span>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#8DD8FF]">
              TRANSPARENT PRICING · NO CONTRACT LOCK-IN
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] text-white">
            CHOOSE YOUR TRAINING PLAN
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            Professional 1-on-1 home training built around your schedule. Upgrade, downgrade, or cancel anytime. All equipment included.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => {
            const isTransform = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between border-2 transition-transform duration-200 ${
                  isTransform
                    ? 'bg-[#0A0A0A] border-[#FF6A00] shadow-2xl scale-102 lg:-translate-y-2'
                    : 'bg-black/60 border-neutral-800 hover:border-neutral-600'
                }`}
              >
                {/* Popular Ribbon */}
                {isTransform && (
                  <div className="bg-[#FF6A00] text-white text-[11px] font-black uppercase tracking-widest text-center py-1.5 flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                    <span>MOST POPULAR CHOICE</span>
                  </div>
                )}

                <div className="p-6 sm:p-7">
                  {/* Plan Name */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-editorial text-3xl font-black uppercase tracking-tight text-white">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-400 font-medium mb-6 min-h-[32px]">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-neutral-800">
                    <div className="flex items-baseline gap-1">
                      <span className="font-editorial text-5xl font-black text-white">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      {plan.originalPrice && (
                        <span className="text-sm text-neutral-500 line-through font-bold ml-2">
                          ₹{plan.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <span className="text-xs uppercase font-bold text-neutral-400 block mt-1 tracking-wider">
                      {plan.period}
                    </span>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-2.5 text-xs text-neutral-300 font-medium mb-8">
                    <div className="flex items-center gap-2 text-white font-bold pb-2 border-b border-neutral-800/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8DD8FF]"></span>
                      <span>{plan.sessionsCount} In-Home Sessions Included</span>
                    </div>

                    <div className="flex items-center gap-2 text-white font-bold pb-2 border-b border-neutral-800/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8DD8FF]"></span>
                      <span>{plan.sessionDuration} Per Session</span>
                    </div>

                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 pt-1">
                        <Check className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => openCheckoutModal(plan)}
                    className={`w-full py-4 text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                      isTransform
                        ? 'bg-[#FF6A00] hover:bg-[#e05d00] text-white shadow-lg'
                        : 'bg-white text-black hover:bg-neutral-200'
                    }`}
                  >
                    <span>CHOOSE PLAN</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-neutral-500 text-center uppercase tracking-wider mt-2.5">
                    Cancel or reschedule with 12h notice
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate / Custom Notice */}
        <div className="mt-14 p-6 bg-neutral-800/60 border border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#8DD8FF]">Need Couple or Family Sessions?</span>
            <p className="text-sm text-neutral-300 mt-0.5">
              We offer dual-client home training sessions for partners and friends at a discounted 1.5x session rate.
            </p>
          </div>
          <button
            onClick={() => openCheckoutModal(plans[2])}
            className="border border-white hover:bg-white hover:text-black text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 shrink-0 transition"
          >
            Inquire Dual Training
          </button>
        </div>

      </div>
    </section>
  );
};
