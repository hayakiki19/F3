import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  Calendar,
  Shield,
  MessageSquare,
  Package,
  ArrowRight,
} from 'lucide-react';

export const TrainerModal: React.FC = () => {
  const {
    selectedTrainerForProfile,
    closeTrainerModal,
    openBookingModal,
    reviews,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'about' | 'specializations' | 'experience' | 'reviews' | 'slots'>('about');

  if (!selectedTrainerForProfile) return null;
  const trainer = selectedTrainerForProfile;

  const trainerReviews = reviews.filter((r) => r.trainerId === trainer.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Trainer Profile"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-150"
    >
      <div className="relative bg-white border-2 border-black w-full max-w-4xl shadow-2xl max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-none overflow-hidden my-0 sm:my-auto">
        
        {/* Mobile grab handle */}
        <div
          className="w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mt-2.5 mb-1 sm:hidden cursor-pointer"
          onClick={closeTrainerModal}
        />

        {/* Top bar with close button */}
        <div className="p-4 sm:p-6 bg-[#0A0A0A] text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FF6A00]"></span>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#8DD8FF]">
              CERTIFIED PROFESSIONAL TRAINER PROFILE
            </span>
          </div>
          <button
            onClick={closeTrainerModal}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center p-1 text-neutral-400 hover:text-white transition rounded"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="overflow-y-auto overscroll-contain flex-1 p-4 sm:p-8">
          
          {/* Header Section: Photo + Vital Info */}
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start pb-6 sm:pb-8 border-b border-neutral-200">
            <div className="w-24 h-24 sm:w-36 sm:h-36 shrink-0 bg-neutral-900 border-2 border-black overflow-hidden relative">
              <img
                src={trainer.photo}
                alt={trainer.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#FF6A00]">
                  {trainer.experience}
                </span>
                <span className="text-neutral-300">·</span>
                <span className="text-xs text-neutral-500 font-bold uppercase">
                  {trainer.gender} Coach
                </span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-4xl font-black uppercase text-black tracking-tight leading-none">
                {trainer.name}
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-neutral-700 mt-1">
                {trainer.headline}
              </p>

              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 sm:mt-4 text-xs font-bold text-neutral-600">
                <div className="flex items-center gap-1.5 bg-neutral-100 px-2.5 py-1">
                  <Star className="w-4 h-4 fill-[#FF6A00] text-[#FF6A00]" />
                  <span className="text-black font-black">{trainer.rating.toFixed(1)}</span>
                  <span>({trainer.reviewsCount} reviews)</span>
                </div>

                <div className="flex items-center gap-1.5 bg-neutral-100 px-2.5 py-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{trainer.location}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-neutral-100 px-2.5 py-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{trainer.availabilityDays}</span>
                </div>
              </div>
            </div>

            {/* Price Snapshot */}
            <div className="sm:text-right bg-neutral-50 p-3 sm:p-4 border border-neutral-200 shrink-0 w-full sm:w-auto">
              <span className="text-[11px] font-bold uppercase text-neutral-500 block">
                Session Starting Rate
              </span>
              <span className="font-editorial text-2xl sm:text-3xl font-black text-black">
                ₹{trainer.startingPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-neutral-500 block">/ 60-min home session</span>
            </div>
          </div>

          {/* Navigation Tabs for Profile (Swipeable on phone with min-h-[44px]) */}
          <div className="flex overflow-x-auto gap-1 border-b border-neutral-200 mt-4 sm:mt-6 pb-2 scrollbar-none">
            {[
              { id: 'about', label: 'About Trainer' },
              { id: 'specializations', label: 'Specializations' },
              { id: 'experience', label: 'Experience & Certs' },
              { id: 'reviews', label: `Reviews (${trainerReviews.length})` },
              { id: 'slots', label: 'Available Slots' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`min-h-[44px] px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider whitespace-nowrap transition flex items-center justify-center ${
                  activeTab === tab.id
                    ? 'bg-[#0A0A0A] text-white'
                    : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: About Trainer */}
          {activeTab === 'about' && (
            <div className="py-6 space-y-6 animate-in fade-in duration-100">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                  Trainer Philosophy
                </h4>
                <p className="text-sm text-neutral-800 leading-relaxed font-normal">
                  {trainer.about}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                  Home Training Approach
                </h4>
                <p className="text-sm text-neutral-800 leading-relaxed font-normal bg-neutral-50 p-4 border-l-4 border-[#FF6A00]">
                  {trainer.trainingApproach}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                  Equipment Brought to Your Home
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                  {trainer.equipmentProvided.map((eq, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-neutral-700 bg-neutral-50 p-2.5 border border-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6A00] shrink-0" />
                      <span>{eq}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                <div>
                  <span className="text-xs font-bold uppercase text-neutral-400 block">Service Radius:</span>
                  <p className="text-sm font-bold text-neutral-800 mt-0.5">{trainer.serviceArea}</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-neutral-400 block">Languages Spoken:</span>
                  <p className="text-sm font-bold text-neutral-800 mt-0.5">{trainer.languages.join(', ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Specializations */}
          {activeTab === 'specializations' && (
            <div className="py-6 space-y-6 animate-in fade-in duration-100">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3">
                  Primary Specializations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {trainer.specializations.map((spec, i) => (
                    <div key={i} className="p-4 border-2 border-neutral-900 bg-neutral-50">
                      <p className="text-sm font-black uppercase text-black">{spec}</p>
                      <p className="text-xs text-neutral-600 mt-1">
                        Tailored progression frameworks designed specifically for home floor plans with zero machine dependence.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                  Targeted Fitness Goals
                </h4>
                <div className="flex flex-wrap gap-2">
                  {trainer.goals.map((g) => (
                    <span key={g} className="px-3 py-1.5 bg-[#8DD8FF]/20 text-[#0A0A0A] font-bold text-xs uppercase border border-[#8DD8FF]">
                      ✓ {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Experience & Certifications */}
          {activeTab === 'experience' && (
            <div className="py-6 space-y-6 animate-in fade-in duration-100">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3">
                  Accredited Certifications
                </h4>
                <div className="space-y-3">
                  {trainer.certifications.map((cert, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200">
                      <Award className="w-5 h-5 text-[#FF6A00] shrink-0" />
                      <div>
                        <span className="text-sm font-black uppercase text-black">{cert}</span>
                        <p className="text-[11px] text-neutral-500">Verified & Active Accreditation · Background Checked</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-50 p-4 border border-neutral-200">
                <span className="text-xs font-bold uppercase text-neutral-500 block">Total Career Experience</span>
                <p className="text-lg font-black text-black mt-1">{trainer.experience} in 1-on-1 In-Home & Athletic Coaching</p>
                <p className="text-xs text-neutral-600 mt-1">
                  Over 1,200 home workout sessions successfully delivered across the metropolitan region.
                </p>
              </div>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="py-6 space-y-4 animate-in fade-in duration-100">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-[#FF6A00] text-[#FF6A00]" />
                  <span className="text-xl font-black text-black">{trainer.rating.toFixed(1)} Out of 5.0</span>
                </div>
                <span className="text-xs font-bold text-neutral-500 uppercase">{trainerReviews.length} Verified Home Client Reviews</span>
              </div>

              {trainerReviews.length === 0 ? (
                <p className="text-sm text-neutral-500">No written reviews yet for this coach.</p>
              ) : (
                trainerReviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-neutral-50 border border-neutral-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-black">{rev.clientName}</span>
                        <span className="text-xs text-neutral-400">· {rev.clientLocation}</span>
                      </div>
                      <div className="flex items-center text-[#FF6A00]">
                        {'★'.repeat(rev.rating)}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-700 leading-relaxed font-normal italic">
                      "{rev.comment}"
                    </p>
                    <span className="text-[10px] text-neutral-400 block mt-2">{rev.date}</span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 5: Available Slots */}
          {activeTab === 'slots' && (
            <div className="py-6 space-y-4 animate-in fade-in duration-100">
              <p className="text-xs text-neutral-600">
                Standard Weekly Availability: <strong className="text-black">{trainer.availabilityDays}</strong> ({trainer.availabilityHours})
              </p>

              <div className="space-y-4">
                {Object.entries(trainer.slots).map(([date, slots]) => (
                  <div key={date} className="border border-neutral-200 p-4 bg-neutral-50">
                    <div className="flex items-center gap-2 mb-3 text-xs font-black uppercase text-black">
                      <Calendar className="w-4 h-4 text-[#FF6A00]" />
                      <span>{date}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {slots.map((s, idx) => (
                        <div
                          key={idx}
                          className={`p-2.5 text-center text-xs font-bold border transition ${
                            s.available
                              ? 'bg-white border-neutral-300 text-neutral-900 hover:border-black cursor-pointer'
                              : 'bg-neutral-200 border-neutral-200 text-neutral-400 line-through'
                          }`}
                          onClick={() => {
                            if (s.available) {
                              closeTrainerModal();
                              openBookingModal(trainer.id, 'Personal Training');
                            }
                          }}
                        >
                          {s.time}
                          <span className="block text-[10px] font-normal mt-0.5">
                            {s.available ? 'Available' : 'Booked'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Sticky Bottom CTA Bar */}
        <div className="p-4 sm:p-6 bg-neutral-100 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-10 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <div>
            <span className="text-xs text-neutral-500 font-bold uppercase block">Ready to train with {trainer.name}?</span>
            <span className="text-xs sm:text-sm font-black text-black">First in-home trial backed by 100% money-back guarantee.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                closeTrainerModal();
                openBookingModal(trainer.id, 'Personal Training');
              }}
              className="flex-1 sm:flex-none border-2 border-black text-black hover:bg-black hover:text-white px-4 sm:px-5 py-3 text-xs font-black uppercase tracking-wider transition min-h-[48px] active:scale-95 flex items-center justify-center"
            >
              BOOK SESSION
            </button>

            <button
              onClick={() => {
                closeTrainerModal();
                openBookingModal(trainer.id, 'Trial Session');
              }}
              className="flex-1 sm:flex-none bg-[#FF6A00] hover:bg-[#e05d00] text-white px-5 sm:px-6 py-3 text-xs font-black uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 min-h-[48px] active:scale-95"
            >
              <span>BOOK TRIAL — ₹499</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
