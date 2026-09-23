import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  CheckCircle,
  CreditCard,
  User,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

export const ClientActivePlan: React.FC = () => {
  const { user, plans, openBookingModal, openCheckoutModal } = useApp();

  if (!user) return null;

  if (!user.hasActivePlan) {
    return (
      <div className="space-y-6 animate-in fade-in duration-150">
        <div className="p-8 bg-neutral-50 border-2 border-black text-center space-y-4">
          <Sparkles className="w-10 h-10 text-[#FF6A00] mx-auto" />
          <h2 className="font-editorial text-3xl font-black uppercase text-black">
            NO ACTIVE SUBSCRIPTION
          </h2>
          <p className="text-sm text-neutral-600 max-w-md mx-auto">
            Choose a training plan to start booking your 1-on-1 home workout sessions.
          </p>
          <button
            onClick={() => openCheckoutModal(plans[2])}
            className="px-8 py-3.5 bg-[#FF6A00] text-white font-black text-xs uppercase tracking-wider transition"
          >
            CHOOSE TRANSFORM PLAN (₹9,999)
          </button>
        </div>
      </div>
    );
  }

  const plan = user.activePlan!;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6A00]">
            MEMBERSHIP & USAGE
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black tracking-tight">
            My Active Plan
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Review remaining session balances, billing renewals, and assigned trainer details.
          </p>
        </div>

        <button
          onClick={() => openBookingModal(plan.assignedTrainerId, 'Personal Training')}
          className="bg-[#FF6A00] hover:bg-[#e05d00] text-white px-6 py-3 text-xs font-black uppercase tracking-wider transition flex items-center gap-2 shadow-sm shrink-0"
        >
          <span>BOOK SESSION</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Active Plan Card */}
      <div className="bg-white border-2 border-black p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-[#0A0A0A] text-white text-[10px] font-black uppercase tracking-wider">
                SUBSCRIPTION
              </span>
              <span className="text-xs font-bold text-green-700 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{plan.paymentStatus}</span>
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl font-black uppercase text-black tracking-tight">
              {plan.planName} PLAN
            </h2>
            <p className="text-xs text-neutral-500 font-semibold mt-1">
              {plan.sessionsTotal} In-Home Sessions / Month · Dedicated Master Coach
            </p>
          </div>

          <div className="bg-neutral-50 p-4 border border-neutral-200 sm:text-right shrink-0">
            <span className="text-[10px] font-bold uppercase text-neutral-400 block">
              Remaining Balance
            </span>
            <span className="font-editorial text-4xl font-black text-black">
              {plan.sessionsRemaining}
            </span>
            <span className="text-xs text-neutral-500 block">/ {plan.sessionsTotal} Sessions</span>
          </div>
        </div>

        {/* Sessions Gauge */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider">
            <span className="text-neutral-600">{plan.sessionsUsed} Sessions Used</span>
            <span className="text-[#FF6A00]">{plan.sessionsRemaining} Sessions Remaining</span>
          </div>
          <div className="w-full h-4 bg-neutral-100 border border-neutral-300 overflow-hidden">
            <div
              className="h-full bg-[#FF6A00] transition-all duration-500"
              style={{ width: `${(plan.sessionsUsed / plan.sessionsTotal) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Detailed Spec Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-neutral-200 text-xs">
          <div className="p-3.5 bg-neutral-50 border border-neutral-200">
            <span className="text-neutral-400 font-bold uppercase text-[10px] block">Start Date:</span>
            <span className="font-black text-black mt-1 block">{plan.startDate}</span>
          </div>

          <div className="p-3.5 bg-neutral-50 border border-neutral-200">
            <span className="text-neutral-400 font-bold uppercase text-[10px] block">Expiry / Renewal:</span>
            <span className="font-black text-black mt-1 block">{plan.expiryDate}</span>
          </div>

          <div className="p-3.5 bg-neutral-50 border border-neutral-200">
            <span className="text-neutral-400 font-bold uppercase text-[10px] block">Assigned Coach:</span>
            <span className="font-black text-black mt-1 block">{plan.assignedTrainerName}</span>
          </div>

          <div className="p-3.5 bg-neutral-50 border border-neutral-200">
            <span className="text-neutral-400 font-bold uppercase text-[10px] block">Session Duration:</span>
            <span className="font-black text-black mt-1 block">{plan.sessionDuration}</span>
          </div>
        </div>

        {/* Plan Inclusions checklist */}
        <div className="pt-4 border-t border-neutral-200">
          <h4 className="text-xs font-black uppercase tracking-wider text-black mb-3">
            Inclusions in Your Subscription:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
              <span>1-on-1 In-Home Sessions at your requested schedule</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
              <span>All weights, kettlebells, TRX, and mats brought by coach</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
              <span>Full macro framework and body recomposition guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
              <span>Flexible 12-hour session rescheduling policy</span>
            </div>
          </div>
        </div>

        {/* Upgrade / Top-up Banner */}
        <div className="p-4 bg-neutral-100 border border-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase text-black">Need Extra Sessions This Month?</span>
            <p className="text-xs text-neutral-600 mt-0.5">
              Add a 4-session top-up pack or upgrade to the 12-session PRO tier anytime.
            </p>
          </div>
          <button
            onClick={() => openCheckoutModal(plans[3])}
            className="px-5 py-2.5 bg-black hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition shrink-0"
          >
            Upgrade to Pro (₹14,499)
          </button>
        </div>

      </div>

    </div>
  );
};
