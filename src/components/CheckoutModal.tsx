import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Smartphone,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    closeCheckoutModal,
    checkoutSelectedPlan,
    checkoutTrainerId,
    trainers,
    purchasePlan,
    user,
    openAuthModal,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'gpay' | 'upi'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [nameOnCard, setNameOnCard] = useState(user?.name || 'Rahul Verma');
  const [selectedTrainer, setSelectedTrainer] = useState(checkoutTrainerId || 'trainer-1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isCheckoutModalOpen || !checkoutSelectedPlan) return null;
  const plan = checkoutSelectedPlan;
  const trainer = trainers.find((t) => t.id === selectedTrainer) || trainers[0];

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal('signup');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      purchasePlan(plan, trainer.id);
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Secure Checkout"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-150"
    >
      <div className="relative bg-white border-2 border-black w-full max-w-xl shadow-2xl flex flex-col rounded-t-3xl sm:rounded-none max-h-[92vh] sm:max-h-[90vh] overflow-hidden my-0 sm:my-auto">
        
        {/* Mobile grab handle */}
        <div
          className="w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mt-2.5 mb-1 sm:hidden cursor-pointer"
          onClick={closeCheckoutModal}
        />

        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#0A0A0A] text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FF6A00]"></span>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#8DD8FF]">
              SECURE CHECKOUT & PLAN ACTIVATION
            </span>
          </div>
          <button
            onClick={closeCheckoutModal}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center p-1 text-neutral-400 hover:text-white transition rounded"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 max-h-[75vh] sm:max-h-[80vh] overflow-y-auto overscroll-contain">
          {isSuccess ? (
            /* Success State */
            <div className="py-8 text-center space-y-5 animate-in zoom-in-95">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                  PAYMENT SUCCESSFUL
                </span>
                <h3 className="font-editorial text-4xl font-black uppercase text-black mt-1">
                  PLAN ACTIVATED!
                </h3>
                <p className="text-sm text-neutral-600 mt-2 max-w-sm mx-auto">
                  Your <strong className="text-black">{plan.name} Plan</strong> ({plan.sessionsCount} Sessions) has been activated. Your assigned coach is <strong className="text-black">{trainer.name}</strong>.
                </p>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 p-4 text-left text-xs max-w-sm mx-auto space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-neutral-500 font-bold uppercase">Sessions Available:</span>
                  <span className="font-black text-black">{plan.sessionsCount} Sessions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 font-bold uppercase">Billing Cycle:</span>
                  <span className="font-bold text-black">{plan.period}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 font-bold uppercase">Renewal Date:</span>
                  <span className="font-bold text-black">October 24, 2026</span>
                </div>
              </div>

              <button
                onClick={closeCheckoutModal}
                className="bg-[#0A0A0A] hover:bg-[#FF6A00] text-white px-8 py-3.5 text-xs font-black uppercase tracking-wider transition shadow-sm inline-flex items-center gap-2"
              >
                <span>OPEN MY CLIENT DASHBOARD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handlePayNow} className="space-y-6">
              
              {/* Order Summary Box */}
              <div className="bg-neutral-50 border-2 border-black p-5">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6A00]">
                      SELECTED PLAN
                    </span>
                    <h4 className="font-editorial text-2xl font-black uppercase text-black">
                      {plan.name} PLAN
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="font-editorial text-3xl font-black text-black">
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-neutral-500 uppercase block font-bold">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <div className="pt-3 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500 font-bold uppercase text-[10px] block">
                      Sessions Included:
                    </span>
                    <span className="font-black text-black">{plan.sessionsCount} In-Home Sessions</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-bold uppercase text-[10px] block">
                      Session Length:
                    </span>
                    <span className="font-black text-black">{plan.sessionDuration}</span>
                  </div>
                </div>

                {/* Trainer assignment selector */}
                <div className="mt-4 pt-3 border-t border-neutral-200">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    Assign Personal Trainer:
                  </label>
                  <select
                    value={selectedTrainer}
                    onChange={(e) => setSelectedTrainer(e.target.value)}
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-xs font-bold text-black focus:outline-none"
                  >
                    {trainers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} — {t.specializations[0]} ({t.location})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border-2 text-center text-xs font-black uppercase transition ${
                      paymentMethod === 'card'
                        ? 'border-[#FF6A00] bg-[#FF6A00]/5 text-black'
                        : 'border-neutral-200 text-neutral-500 hover:border-black'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1 text-[#FF6A00]" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('gpay')}
                    className={`p-3 border-2 text-center text-xs font-black uppercase transition ${
                      paymentMethod === 'gpay'
                        ? 'border-[#FF6A00] bg-[#FF6A00]/5 text-black'
                        : 'border-neutral-200 text-neutral-500 hover:border-black'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mx-auto mb-1 text-black" />
                    <span>Google Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 border-2 text-center text-xs font-black uppercase transition ${
                      paymentMethod === 'upi'
                        ? 'border-[#FF6A00] bg-[#FF6A00]/5 text-black'
                        : 'border-neutral-200 text-neutral-500 hover:border-black'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 mx-auto mb-1 text-[#8DD8FF]" />
                    <span>Instant UPI</span>
                  </button>
                </div>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' ? (
                <div className="space-y-3 bg-neutral-50 p-4 border border-neutral-200">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                      className="w-full bg-white border border-neutral-300 px-3 py-3 sm:py-2 text-base sm:text-xs font-bold text-black rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5 sm:top-2.5" />
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-9 pr-3 py-3 sm:py-2 bg-white border border-neutral-300 text-base sm:text-xs font-mono font-bold text-black rounded-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-white border border-neutral-300 px-3 py-3 sm:py-2 text-base sm:text-xs font-mono font-bold text-black rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-white border border-neutral-300 px-3 py-3 sm:py-2 text-base sm:text-xs font-mono font-bold text-black rounded-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-neutral-50 border border-neutral-200 text-center text-xs text-neutral-600">
                  1-Click {paymentMethod === 'gpay' ? 'Google Pay' : 'UPI Quick Pay'} enabled. No card entry required.
                </div>
              )}

              {/* Guarantees */}
              <div className="flex items-center gap-2 text-neutral-500 text-[11px] font-medium justify-center">
                <Lock className="w-3.5 h-3.5 text-neutral-400" />
                <span>256-bit encrypted checkout · Full refund guarantee before 1st session</span>
              </div>

              {/* Action */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#FF6A00] hover:bg-[#e05d00] text-white py-4 text-xs font-black uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 min-h-[48px] active:scale-95"
              >
                {isProcessing ? (
                  <span>AUTHORIZING PAYMENT...</span>
                ) : (
                  <>
                    <span>PAY ₹{plan.price.toLocaleString('en-IN')} & ACTIVATE PLAN</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
