import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, PhoneCall, CheckCircle, ArrowRight, X } from 'lucide-react';

export const ConsultationSection: React.FC = () => {
  const { isConsultationModalOpen, openConsultationModal, closeConsultationModal } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState('Weight Loss');
  const [preferredTime, setPreferredTime] = useState('Morning');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // auto close after brief preview
      setTimeout(() => {
        closeConsultationModal();
        setSubmitted(false);
      }, 2500);
    }, 500);
  };

  return (
    <>
      <section className="py-16 bg-[#8DD8FF]/15 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-[#0A0A0A] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-[#FF6A00]" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0A0A0A]">
                  FREE 15-MINUTE FITNESS ADVICE
                </span>
              </div>
              <h3 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-[#0A0A0A] tracking-tight leading-tight">
                NOT SURE WHERE TO START?
              </h3>
              <p className="mt-2 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Book a complimentary consultation with a senior fitness advisor. We will analyze your routine, recommend the ideal coach, and answer any questions about home workout logistics.
              </p>
            </div>

            <button
              onClick={openConsultationModal}
              className="bg-[#0A0A0A] hover:bg-[#FF6A00] text-white font-black text-xs sm:text-sm uppercase tracking-wider px-8 py-4 transition shrink-0 flex items-center gap-3 shadow-sm"
            >
              <span>BOOK CONSULTATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white border-2 border-black w-full max-w-lg p-6 sm:p-8 shadow-2xl">
            <button
              onClick={closeConsultationModal}
              className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-editorial text-2xl font-black uppercase text-black">
                  CONSULTATION REQUESTED
                </h4>
                <p className="text-sm text-neutral-600 max-w-sm mx-auto">
                  A senior training director will contact you via phone/WhatsApp within 2 business hours to review your home workout goals.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-black uppercase tracking-wider text-[#FF6A00]">
                    Zero Obligation Call
                  </span>
                  <h4 className="font-editorial text-2xl font-black uppercase text-black mt-1">
                    Book Your Fitness Consultation
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    Speak directly with a Master Coach before making any decision.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2.5 text-sm font-medium text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Mobile Number (WhatsApp Preferred)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2.5 text-sm font-medium text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                        Primary Goal
                      </label>
                      <select
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-xs font-bold text-black focus:outline-none"
                      >
                        <option value="Weight Loss">Weight Loss</option>
                        <option value="Muscle Gain">Muscle Gain</option>
                        <option value="Strength">Strength & Power</option>
                        <option value="General Fitness">General Fitness</option>
                        <option value="Flexibility">Flexibility & Rehab</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                        Preferred Call Window
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-xs font-bold text-black focus:outline-none"
                      >
                        <option value="Morning">Morning (9 AM - 12 PM)</option>
                        <option value="Afternoon">Afternoon (1 PM - 5 PM)</option>
                        <option value="Evening">Evening (5 PM - 8 PM)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FF6A00] hover:bg-[#e05d00] text-white font-black text-xs uppercase tracking-wider py-3.5 mt-2 transition"
                  >
                    CONFIRM FREE CONSULTATION
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
