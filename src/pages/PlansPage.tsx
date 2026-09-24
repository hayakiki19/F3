import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Check,
  Zap,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  CreditCard,
  Percent,
  Calendar,
  Layers,
  HeartHandshake,
  DollarSign,
} from 'lucide-react';

export const PlansPage: React.FC = () => {
  const { plans, openCheckoutModal, openBookingModal, navigateToPage } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');
  const [calculatorGoal, setCalculatorGoal] = useState<'fat-loss' | 'muscle-gain' | 'posture'>('fat-loss');
  const [calculatorTime, setCalculatorTime] = useState<'4-weeks' | '8-weeks' | '12-weeks'>('8-weeks');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Calculated recommendation
  const getRecommendation = () => {
    if (calculatorTime === '4-weeks') {
      return {
        plan: 'Starter Pack (4 Sessions)',
        price: '₹5,200',
        sessionsPerWeek: '1 - 2 sessions/week',
        expectedOutcome: 'Establish habit, fix lower-back tightness, lose 1-2 kg water weight/fat.',
      };
    } else if (calculatorTime === '8-weeks') {
      return {
        plan: 'Transform Pack (8 Sessions / Month)',
        price: '₹9,600 / mo',
        sessionsPerWeek: '2 sessions/week + home homework',
        expectedOutcome: 'Noticeable body recomposition, 3-5 kg fat drop or 2 kg lean muscle, improved stamina.',
      };
    } else {
      return {
        plan: 'Pro Athlete Pack (12 Sessions / Month)',
        price: '₹13,500 / mo',
        sessionsPerWeek: '3 sessions/week',
        expectedOutcome: 'Total athletic transformation, deep postural correction, visible abdominal definition.',
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-[#0A0A0A] pb-24">
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
            <span>Plans & Transparent Pricing</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NO JOINING FEES · UNUSED SESSIONS ROLL OVER · CANCEL ANYTIME</span>
              </div>
              <h1 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
                DOORSTEP PLANS<br />& TRANSPARENT PRICING
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 max-w-2xl leading-relaxed">
                Invest in focused 1-on-1 personal training delivered right into your living room. Equipment provided, customized nutrition included, zero gym travel time.
              </p>
            </div>

            {/* Trial callout */}
            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl max-w-md shrink-0">
              <span className="text-[10px] font-black uppercase text-[#FF6A00] block mb-1">
                UNCONDITIONAL 100% SATISFACTION
              </span>
              <h4 className="font-editorial text-xl font-black uppercase text-white">
                Start with a ₹499 In-Home Trial
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Try a full 60-min in-home movement screening before choosing any monthly plan.
              </p>
              <button
                onClick={() => openBookingModal(undefined, 'Trial Session')}
                className="w-full mt-3 py-2.5 bg-[#FF6A00] hover:bg-[#e05d00] text-white font-black text-xs uppercase tracking-wider rounded-xl transition"
              >
                Book ₹499 Trial Session
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pricing Cards Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Tier Cards Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-1">
                SUBSCRIPTION PACKAGES
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black">
                Select Your Doorstep Training Tier
              </h2>
            </div>

            {/* Billing Toggle (Monthly vs 3-Month Commitment with 10% discount) */}
            <div className="flex items-center gap-2 bg-neutral-200/80 p-1.5 rounded-xl border border-neutral-300 shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg transition ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-black shadow-xs font-black'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                Standard (Monthly)
              </button>
              <button
                onClick={() => setBillingCycle('quarterly')}
                className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg transition flex items-center gap-1.5 ${
                  billingCycle === 'quarterly'
                    ? 'bg-[#FF6A00] text-white shadow-xs font-black'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                <span>3-Month Pack</span>
                <span className="bg-black text-white text-[9px] px-1.5 py-0.5 rounded font-black">
                  SAVE 10%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Plan 1: Starter Pack */}
            <div className="bg-white rounded-2xl border-2 border-black p-6 flex flex-col justify-between hover:shadow-xl transition">
              <div>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 border border-neutral-200 inline-block mb-3">
                  For Flexible Schedules
                </span>
                <h3 className="font-editorial text-2xl font-black uppercase text-black">
                  Starter Pack
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Ideal for busy executives needing 1x weekly in-home coaching and form checkups.
                </p>

                <div className="my-5 pb-5 border-b border-neutral-200">
                  <div className="flex items-baseline gap-1">
                    <span className="font-editorial text-4xl font-black text-black">
                      ₹{billingCycle === 'quarterly' ? '4,680' : '5,200'}
                    </span>
                    <span className="text-xs text-neutral-500 font-bold">/ 4 sessions</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    (₹{billingCycle === 'quarterly' ? '1,170' : '1,300'} per doorstep session)
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-neutral-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>4 Doorstep Sessions</strong> (60 mins each)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full Dumbbells & Mat kit brought to your flat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Personalized Warm-up & Posture screening</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Basic Macronutrient & Calorie targets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>30-Day session validity</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100">
                <button
                  onClick={() => openCheckoutModal(plans[0])}
                  className="w-full py-3 rounded-xl border-2 border-black hover:bg-black hover:text-white text-black font-black text-xs uppercase tracking-wider transition"
                >
                  Choose Starter Pack
                </button>
              </div>
            </div>

            {/* Plan 2: Transform Pack (POPULAR) */}
            <div className="bg-[#0A0A0A] text-white rounded-2xl border-2 border-[#FF6A00] p-6 flex flex-col justify-between shadow-2xl relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF6A00] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                MOST POPULAR · 84% OF CLIENTS
              </div>

              <div>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded bg-neutral-800 text-[#FF6A00] border border-neutral-700 inline-block mb-3">
                  Optimal Consistency (2x/Week)
                </span>
                <h3 className="font-editorial text-2xl font-black uppercase text-white">
                  Transform Pack
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Engineered for body recomposition, muscle building, and sustainable fat loss.
                </p>

                <div className="my-5 pb-5 border-b border-neutral-800">
                  <div className="flex items-baseline gap-1">
                    <span className="font-editorial text-4xl font-black text-white">
                      ₹{billingCycle === 'quarterly' ? '8,640' : '9,600'}
                    </span>
                    <span className="text-xs text-neutral-400 font-bold">/ 8 sessions</span>
                  </div>
                  <span className="text-[11px] text-[#FF6A00] mt-1 block font-bold">
                    (₹{billingCycle === 'quarterly' ? '1,080' : '1,200'} per doorstep session)
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF6A00] shrink-0" />
                    <span><strong>8 Doorstep Sessions</strong> (2x/week cadence)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF6A00] shrink-0" />
                    <span>All weights, bands, TRX & sanitized mats included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF6A00] shrink-0" />
                    <span>Bi-weekly Bluetooth body fat & muscle scans</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF6A00] shrink-0" />
                    <span>Tailored home workout routine in your app</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF6A00] shrink-0" />
                    <span>Direct WhatsApp & in-app chat with your coach</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF6A00] shrink-0" />
                    <span>45-day validity with 100% session rollover</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => openCheckoutModal(plans[1] || plans[0])}
                  className="w-full py-3.5 bg-[#FF6A00] hover:bg-[#e05d00] text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-md active:scale-95"
                >
                  Choose Transform Pack
                </button>
              </div>
            </div>

            {/* Plan 3: Pro Athlete Pack */}
            <div className="bg-white rounded-2xl border-2 border-black p-6 flex flex-col justify-between hover:shadow-xl transition">
              <div>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 border border-neutral-200 inline-block mb-3">
                  Maximum Results (3x/Week)
                </span>
                <h3 className="font-editorial text-2xl font-black uppercase text-black">
                  Pro Athlete Pack
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Dedicated head coach, intense transformation protocol, and priority peak slot booking.
                </p>

                <div className="my-5 pb-5 border-b border-neutral-200">
                  <div className="flex items-baseline gap-1">
                    <span className="font-editorial text-4xl font-black text-black">
                      ₹{billingCycle === 'quarterly' ? '12,150' : '13,500'}
                    </span>
                    <span className="text-xs text-neutral-500 font-bold">/ 12 sessions</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    (₹{billingCycle === 'quarterly' ? '1,012' : '1,125'} per doorstep session)
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-neutral-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>12 Doorstep Sessions</strong> (3x/week cadence)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dedicated Master Coach assigned throughout</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full sports nutrition & macro tracking integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Weekly mobility, joint screening & rehab protocols</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Priority peak slot booking (06:30 AM & 07:00 PM)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>60-day validity + unlimited session pauses</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100">
                <button
                  onClick={() => openCheckoutModal(plans[2] || plans[0])}
                  className="w-full py-3 rounded-xl border-2 border-black hover:bg-black hover:text-white text-black font-black text-xs uppercase tracking-wider transition"
                >
                  Choose Pro Athlete Pack
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Plan Recommendation Calculator */}
        <section className="bg-white rounded-2xl border-2 border-black p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-1">
              FITNESS ADVISOR TOOL
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black">
              Which Plan Fits Your Target?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Select your goal and timeline to see the scientifically calibrated session frequency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            <div className="lg:col-span-6 space-y-5">
              <div>
                <label className="text-xs font-black uppercase text-neutral-700 block mb-2">
                  1. What is your primary fitness goal?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'fat-loss', label: 'Fat Loss & HIIT' },
                    { id: 'muscle-gain', label: 'Muscle & Tone' },
                    { id: 'posture', label: 'Posture & Mobility' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setCalculatorGoal(g.id as any)}
                      className={`p-3 rounded-xl border text-xs font-black uppercase tracking-wider text-center transition ${
                        calculatorGoal === g.id
                          ? 'bg-black text-white border-black'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-neutral-700 block mb-2">
                  2. What is your target transformation timeline?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '4-weeks', label: '4 Weeks' },
                    { id: '8-weeks', label: '8 Weeks' },
                    { id: '12-weeks', label: '12 Weeks' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setCalculatorTime(t.id as any)}
                      className={`p-3 rounded-xl border text-xs font-black uppercase tracking-wider text-center transition ${
                        calculatorTime === t.id
                          ? 'bg-[#FF6A00] text-white border-[#FF6A00]'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-neutral-900 text-white border-2 border-black space-y-4">
              <span className="text-[10px] font-black uppercase bg-[#FF6A00] text-white px-2.5 py-1 rounded inline-block">
                RECOMMENDED MATCH
              </span>

              <div>
                <h3 className="font-editorial text-2xl font-black uppercase text-white">
                  {recommendation.plan}
                </h3>
                <span className="text-sm font-bold text-neutral-400 mt-1 block">
                  Frequency: {recommendation.sessionsPerWeek} · Price: <strong className="text-[#FF6A00]">{recommendation.price}</strong>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-neutral-300">
                <span className="font-bold text-white block mb-1">Projected Outcome:</span>
                {recommendation.expectedOutcome}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => openBookingModal(undefined, 'Trial Session')}
                  className="px-6 py-2.5 bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs font-black uppercase tracking-wider rounded-xl transition shadow-xs"
                >
                  Test With ₹499 Trial First
                </button>
                <span className="text-[11px] text-neutral-400">Zero long-term lock-in</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="bg-white rounded-2xl border-2 border-black p-6 sm:p-10 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-1">
              SPECIFICATION MATRIX
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black">
              Side-By-Side Plan Features
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-black bg-neutral-50">
                  <th className="p-3 font-black uppercase text-neutral-500">Plan Feature</th>
                  <th className="p-3 font-black uppercase text-neutral-700">Starter Pack</th>
                  <th className="p-3 font-black uppercase bg-[#FF6A00]/10 text-[#FF6A00] border-x border-[#FF6A00]/20">
                    Transform Pack
                  </th>
                  <th className="p-3 font-black uppercase text-neutral-700">Pro Athlete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {[
                  {
                    feature: 'Doorstep Sessions / Month',
                    starter: '4 Sessions',
                    transform: '8 Sessions (2x/wk)',
                    pro: '12 Sessions (3x/wk)',
                  },
                  {
                    feature: 'Rate Per Session',
                    starter: '₹1,300',
                    transform: '₹1,200',
                    pro: '₹1,125',
                  },
                  {
                    feature: 'Adjustable Dumbbell & Mat Kit',
                    starter: 'Included',
                    transform: 'Included',
                    pro: 'Included + Kettlebells',
                  },
                  {
                    feature: 'Biometric Body Fat Scans',
                    starter: 'At Onboarding',
                    transform: 'Every 2 Weeks',
                    pro: 'Weekly Scans',
                  },
                  {
                    feature: 'Custom Nutrition & Macro Plan',
                    starter: 'General Guide',
                    transform: 'Custom Macro Targets',
                    pro: 'Sports Nutritionist Call',
                  },
                  {
                    feature: 'Session Rollover Window',
                    starter: '30 Days',
                    transform: '45 Days',
                    pro: '60 Days + Unlimited Pause',
                  },
                  {
                    feature: 'Trainer Assignment',
                    starter: 'Certified Coach',
                    transform: 'Senior Coach',
                    pro: 'Dedicated Head Coach',
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50">
                    <td className="p-3.5 font-bold text-neutral-800">{row.feature}</td>
                    <td className="p-3.5 text-neutral-600">{row.starter}</td>
                    <td className="p-3.5 bg-[#FF6A00]/5 border-x border-[#FF6A00]/20 font-black text-black">
                      {row.transform}
                    </td>
                    <td className="p-3.5 font-bold text-neutral-800">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-2xl border-2 border-black p-6 sm:p-10 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-1">
              BILLING & POLICIES
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-black uppercase text-black">
              Frequently Asked Questions About Plans
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: 'What happens if I travel or fall sick during the month?',
                a: 'You can pause your plan for up to 30 consecutive days with 1 click in your client portal. Your unused sessions never expire prematurely and remain credited on your account.',
              },
              {
                q: 'What is the refund policy on monthly packages?',
                a: 'If within your first 2 sessions you are not completely thrilled with the coaching quality, we offer a 100% pro-rated refund on all remaining unused sessions with zero deduction fees.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major UPI apps (Google Pay, PhonePe, Paytm), Credit & Debit cards, NetBanking, and 3-month or 6-month No-Cost EMI options.',
              },
              {
                q: 'Do you offer corporate or couple packages?',
                a: 'Yes! We have Dual / Couple packages where two members of the household train together with one coach for only ₹14,400 for 8 sessions.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border-2 border-neutral-200 rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-black text-sm uppercase flex items-center justify-between bg-neutral-50/50 hover:bg-neutral-100 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform ${
                      expandedFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="p-4 bg-white text-xs text-neutral-600 leading-relaxed border-t border-neutral-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};
