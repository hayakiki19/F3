import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { InteractiveCalendar } from './common/InteractiveCalendar';
import {
  X,
  Calendar,
  Clock,
  CheckCircle,
  MapPin,
  ArrowRight,
  ArrowLeft,
  User,
  Shield,
  CreditCard,
  Sparkles,
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    bookingModalTrainerId,
    bookingModalSessionType,
    trainers,
    user,
    bookSession,
    openAuthModal,
    openCheckoutModal,
    plans,
    setCurrentView,
    setActiveClientTab,
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-24');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedSessionType, setSelectedSessionType] = useState<'Trial Session' | 'Personal Training' | 'Consultation'>('Trial Session');
  const [address, setAddress] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (isBookingModalOpen) {
      setStep(1);
      setBookingSuccess(false);
      setErrorMessage('');
      const defaultTrainer = bookingModalTrainerId || (trainers[0]?.id ?? '');
      setSelectedTrainerId(defaultTrainer);
      setSelectedSessionType(
        (bookingModalSessionType as any) ||
          (user?.hasActivePlan ? 'Personal Training' : 'Trial Session')
      );
      setAddress(user?.fitnessProfile?.serviceAddress || '42 Parkview Ave, Apt 4B, Central District');
      setSelectedDate('2026-09-24');
      setSelectedSlot('');
    }
  }, [isBookingModalOpen, bookingModalTrainerId, bookingModalSessionType, trainers, user]);

  if (!isBookingModalOpen) return null;

  const currentTrainer = trainers.find((t) => t.id === selectedTrainerId) || trainers[0];

  // Available slots for the selected date
  const dateSlots = currentTrainer?.slots[selectedDate] || [
    { time: '06:30 AM', available: true },
    { time: '07:30 AM', available: true },
    { time: '08:30 AM', available: true },
    { time: '05:30 PM', available: true },
    { time: '07:00 PM', available: true },
    { time: '08:00 PM', available: true },
  ];

  const handleNext = () => {
    setErrorMessage('');
    if (step === 1 && !selectedTrainerId) {
      setErrorMessage('Please select a trainer');
      return;
    }
    if (step === 2 && !selectedDate) {
      setErrorMessage('Please choose a date');
      return;
    }
    if (step === 3 && !selectedSlot) {
      setErrorMessage('Please select a time slot');
      return;
    }
    if (step === 4 && !selectedSessionType) {
      setErrorMessage('Please choose session type');
      return;
    }
    setStep(step + 1);
  };

  const handleConfirmBooking = () => {
    if (!user) {
      openAuthModal('signup');
      return;
    }

    if (!address.trim()) {
      setErrorMessage('Please provide your home training address');
      return;
    }

    const result = bookSession({
      trainerId: selectedTrainerId,
      date: selectedDate,
      timeSlot: selectedSlot,
      sessionType: selectedSessionType,
      location: address,
    });

    if (result.success) {
      setBookingSuccess(true);
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Home Workout Booking"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-150"
    >
      <div className="relative bg-white border-2 border-black w-full max-w-2xl shadow-2xl flex flex-col rounded-t-3xl sm:rounded-none max-h-[92vh] sm:max-h-[90vh] overflow-hidden my-0 sm:my-auto">
        
        {/* Mobile grab handle */}
        <div
          className="w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mt-2.5 mb-1 sm:hidden cursor-pointer"
          onClick={closeBookingModal}
        />

        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#0A0A0A] text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FF6A00]"></span>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#8DD8FF]">
              HOME WORKOUT BOOKING SYSTEM
            </span>
          </div>
          <button
            onClick={closeBookingModal}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center p-1 text-neutral-400 hover:text-white transition rounded"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator (Responsive: compact on mobile, full steps on desktop) */}
        {!bookingSuccess && (
          <>
            {/* Mobile Stepper */}
            <div className="bg-neutral-100 border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between sm:hidden">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-black text-white text-[11px] font-black flex items-center justify-center shrink-0">
                  {step}
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-black">
                  {step === 1
                    ? '1. Select Coach'
                    : step === 2
                    ? '2. Select Date'
                    : step === 3
                    ? '3. Select Slot'
                    : step === 4
                    ? '4. Session Type'
                    : '5. Confirm Address'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all ${
                      s === step
                        ? 'w-4 bg-[#FF6A00]'
                        : s < step
                        ? 'w-2 bg-black'
                        : 'w-2 bg-neutral-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Stepper */}
            <div className="hidden sm:flex bg-neutral-100 border-b border-neutral-200 px-6 py-3 items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 ${step === 1 ? 'bg-black text-white' : 'bg-neutral-300 text-black'}`}>1</span>
                <span className={step === 1 ? 'text-black font-black' : ''}>Trainer</span>
              </div>
              <span>→</span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 ${step === 2 ? 'bg-black text-white' : 'bg-neutral-300 text-black'}`}>2</span>
                <span className={step === 2 ? 'text-black font-black' : ''}>Date</span>
              </div>
              <span>→</span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 ${step === 3 ? 'bg-black text-white' : 'bg-neutral-300 text-black'}`}>3</span>
                <span className={step === 3 ? 'text-black font-black' : ''}>Slot</span>
              </div>
              <span>→</span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 ${step === 4 ? 'bg-black text-white' : 'bg-neutral-300 text-black'}`}>4</span>
                <span className={step === 4 ? 'text-black font-black' : ''}>Type</span>
              </div>
              <span>→</span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 ${step === 5 ? 'bg-black text-white' : 'bg-neutral-300 text-black'}`}>5</span>
                <span className={step === 5 ? 'text-black font-black' : ''}>Confirm</span>
              </div>
            </div>
          </>
        )}

        {/* Modal Content */}
        <div className="p-4 sm:p-8 max-h-[68vh] sm:max-h-[70vh] overflow-y-auto overscroll-contain">
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 text-xs font-bold text-red-700">
              {errorMessage}
            </div>
          )}

          {bookingSuccess ? (
            /* Success State */
            <div className="py-6 text-center space-y-5 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6A00]">
                  SESSION RESERVED
                </span>
                <h3 className="font-editorial text-3xl font-black uppercase text-black mt-1">
                  Home Session Confirmed!
                </h3>
                <p className="text-sm text-neutral-600 mt-2 max-w-md mx-auto">
                  {currentTrainer.name} will arrive at your residence on{' '}
                  <strong className="text-black">{selectedDate}</strong> at{' '}
                  <strong className="text-black">{selectedSlot}</strong>.
                </p>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-500 font-bold uppercase">Session Type:</span>
                  <span className="font-black text-black">{selectedSessionType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 font-bold uppercase">Trainer:</span>
                  <span className="font-black text-black">{currentTrainer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 font-bold uppercase">Location:</span>
                  <span className="font-black text-black truncate max-w-[220px]">{address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 font-bold uppercase">Gear:</span>
                  <span className="font-bold text-green-700">Provided by Trainer</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => {
                    closeBookingModal();
                    setCurrentView('client-app');
                    setActiveClientTab('schedule');
                  }}
                  className="bg-[#0A0A0A] hover:bg-[#FF6A00] text-white px-6 py-3 text-xs font-black uppercase tracking-wider transition"
                >
                  VIEW IN MY SCHEDULE
                </button>
                <button
                  onClick={closeBookingModal}
                  className="border border-neutral-300 px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-700 hover:border-black"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: CHOOSE TRAINER */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-editorial text-2xl font-black uppercase text-black">
                      Step 1: Choose Your Coach
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Select the certified trainer you wish to book for your home workout.
                    </p>
                  </div>

                  <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                    {trainers.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTrainerId(t.id)}
                        className={`p-3.5 border-2 flex items-center justify-between cursor-pointer transition ${
                          selectedTrainerId === t.id
                            ? 'border-[#FF6A00] bg-[#FF6A00]/5'
                            : 'border-neutral-200 hover:border-black'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={t.photo}
                            alt={t.name}
                            className="w-12 h-12 rounded-none object-cover border border-black shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-black text-sm uppercase text-black">{t.name}</h4>
                              <span className="text-[11px] font-bold text-neutral-500">★ {t.rating.toFixed(1)}</span>
                            </div>
                            <p className="text-xs text-neutral-600 line-clamp-1">{t.specializations[0]}</p>
                            <p className="text-[11px] text-neutral-400 mt-0.5">{t.location}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-black text-black">₹{t.startingPrice.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-neutral-400 block">/ session</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: CHOOSE DATE */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-editorial text-2xl font-black uppercase text-black">
                        Step 2: Choose Session Date
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Selected Coach: <strong className="text-black">{currentTrainer.name}</strong> · Tap any calendar date below
                      </p>
                    </div>

                    {/* Quick shortcut tags */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                      <span className="text-[10px] font-black uppercase text-neutral-400 shrink-0">Quick:</span>
                      {[
                        { label: 'Tomorrow', date: '2026-09-24' },
                        { label: 'Fri Sep 25', date: '2026-09-25' },
                        { label: 'Sat Sep 26', date: '2026-09-26' },
                        { label: 'Sun Sep 27', date: '2026-09-27' },
                      ].map((quick) => (
                        <button
                          key={quick.date}
                          type="button"
                          onClick={() => {
                            setSelectedDate(quick.date);
                            setSelectedSlot('');
                          }}
                          className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider transition whitespace-nowrap border ${
                            selectedDate === quick.date
                              ? 'bg-[#FF6A00] text-white border-[#FF6A00]'
                              : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                          }`}
                        >
                          {quick.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Calendar with Trainer Availability */}
                  <InteractiveCalendar
                    selectedDate={selectedDate}
                    onSelectDate={(d) => {
                      setSelectedDate(d);
                      setSelectedSlot('');
                    }}
                    minDate="2026-09-24"
                    size="standard"
                    dateMetadata={(() => {
                      const meta: Record<string, { badgeText: string; badgeColor: 'green' | 'amber' | 'red'; isBlocked?: boolean }> = {};
                      if (currentTrainer?.slots) {
                        Object.entries(currentTrainer.slots).forEach(([dateStr, slots]) => {
                          const availCount = slots.filter((s) => s.available && !s.blockedByAdmin).length;
                          const isAllBlocked = slots.length > 0 && slots.every((s) => !s.available || s.blockedByAdmin);
                          if (isAllBlocked) {
                            meta[dateStr] = { badgeText: 'Blocked', badgeColor: 'red', isBlocked: true };
                          } else if (availCount > 0) {
                            meta[dateStr] = { badgeText: `${availCount} open`, badgeColor: 'green' };
                          }
                        });
                      }
                      return meta;
                    })()}
                  />

                  {/* Selected Date Summary & Availability Note */}
                  <div className="p-3.5 bg-neutral-50 border-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-black text-white flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-[#FF6A00]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                          Selected Appointment Date
                        </span>
                        <p className="font-editorial text-base font-black text-black">
                          {selectedDate ? (
                            new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          ) : (
                            'None selected'
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-neutral-600">
                        Hours: <strong className="text-black">{currentTrainer.availabilityHours}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-4 py-2 bg-black hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5"
                      >
                        <span>Choose Slot</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: CHOOSE TIME SLOT */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-editorial text-2xl font-black uppercase text-black">
                      Step 3: Select Time Slot
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Available slots for <strong className="text-black">{selectedDate}</strong> with {currentTrainer.name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {dateSlots.map((slot, i) => (
                      <button
                        key={i}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.time)}
                        className={`p-3.5 border-2 text-center text-xs font-black uppercase transition ${
                          !slot.available
                            ? 'bg-neutral-100 text-neutral-400 border-neutral-200 line-through cursor-not-allowed'
                            : selectedSlot === slot.time
                            ? 'border-[#FF6A00] bg-[#FF6A00] text-white shadow-sm'
                            : 'border-neutral-300 text-black hover:border-black'
                        }`}
                      >
                        {slot.time}
                        <span className="block text-[10px] font-normal mt-0.5">
                          {slot.available ? 'Available' : 'Booked'}
                        </span>
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] text-neutral-500">
                    Sessions last 60 minutes. Trainer arrives 5-10 minutes early to unpack equipment.
                  </p>
                </div>
              )}

              {/* STEP 4: CHOOSE SESSION TYPE */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-editorial text-2xl font-black uppercase text-black">
                      Step 4: Choose Session Type
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Choose between a trial, standard personal training, or quick consultation.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Trial Option */}
                    <div
                      onClick={() => setSelectedSessionType('Trial Session')}
                      className={`p-4 border-2 cursor-pointer transition ${
                        selectedSessionType === 'Trial Session'
                          ? 'border-[#FF6A00] bg-[#FF6A00]/5'
                          : 'border-neutral-200 hover:border-black'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black text-sm uppercase text-black">
                           Trial Session (First Time Only)
                        </span>
                        <span className="text-sm font-black text-[#FF6A00]">₹499 Special</span>
                      </div>
                      <p className="text-xs text-neutral-600">
                        Full 60-min home training session + complete posture and biomechanical movement screen.
                      </p>
                    </div>

                    {/* Personal Training */}
                    <div
                      onClick={() => setSelectedSessionType('Personal Training')}
                      className={`p-4 border-2 cursor-pointer transition ${
                        selectedSessionType === 'Personal Training'
                          ? 'border-[#FF6A00] bg-[#FF6A00]/5'
                          : 'border-neutral-200 hover:border-black'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black text-sm uppercase text-black">
                          Personal Training Session
                        </span>
                        <span className="text-sm font-black text-black">
                          {user?.hasActivePlan
                            ? `${user.activePlan?.sessionsRemaining} Plan Sessions Left`
                            : `₹${currentTrainer.startingPrice.toLocaleString('en-IN')}`}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600">
                        {user?.hasActivePlan
                          ? 'Deducts 1 session credit from your active Transform plan balance.'
                          : 'Standard 1-on-1 home training session with customized exercise progression.'}
                      </p>
                    </div>

                    {/* Consultation */}
                    <div
                      onClick={() => setSelectedSessionType('Consultation')}
                      className={`p-4 border-2 cursor-pointer transition ${
                        selectedSessionType === 'Consultation'
                          ? 'border-[#FF6A00] bg-[#FF6A00]/5'
                          : 'border-neutral-200 hover:border-black'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black text-sm uppercase text-black">
                          In-Home Fitness Consultation
                        </span>
                        <span className="text-sm font-black text-green-700">FREE</span>
                      </div>
                      <p className="text-xs text-neutral-600">
                        20-minute movement audit and goal review to plan your ideal training schedule.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: CONFIRM BOOKING & LOCATION */}
              {step === 5 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-editorial text-2xl font-black uppercase text-black">
                      Step 5: Confirm Home Session
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Review details and verify your home address for trainer arrival.
                    </p>
                  </div>

                  <div className="bg-neutral-50 border border-neutral-300 p-4 space-y-2 text-xs">
                    <div className="flex justify-between pb-2 border-b border-neutral-200">
                      <span className="text-neutral-500 font-bold uppercase">Trainer:</span>
                      <span className="font-black text-black">{currentTrainer.name}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-neutral-200">
                      <span className="text-neutral-500 font-bold uppercase">Date & Time:</span>
                      <span className="font-black text-black">{selectedDate} · {selectedSlot}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-neutral-200">
                      <span className="text-neutral-500 font-bold uppercase">Session Type:</span>
                      <span className="font-black text-black">{selectedSessionType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-bold uppercase">Cost:</span>
                      <span className="font-black text-black">
                        {user?.hasActivePlan && selectedSessionType === 'Personal Training'
                          ? '1 Session Credit'
                          : selectedSessionType === 'Trial Session'
                          ? '₹499'
                          : selectedSessionType === 'Consultation'
                          ? '₹0 (Free)'
                          : `₹${currentTrainer.startingPrice.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                  </div>

                  {/* Home address input */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                      Your Home Address (Where trainer should arrive):
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street Address, Apt/Suite #, Neighborhood"
                        className="w-full pl-9 pr-3 py-3 bg-white border border-neutral-300 text-base sm:text-xs font-bold text-black focus:outline-none focus:border-black rounded-none"
                      />
                    </div>
                  </div>

                  {/* User auth check notice */}
                  {!user && (
                    <div className="p-3 bg-amber-50 border border-amber-300 text-xs text-amber-900 font-medium">
                      Note: You are currently not signed in. Clicking confirm will prompt you to create an account or sign in to complete your booking.
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Controls (Sticky thumb zone on mobile) */}
        {!bookingSuccess && (
          <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3 sticky bottom-0 z-10 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="min-h-[48px] px-5 py-3 border border-neutral-300 text-xs font-black uppercase tracking-wider text-neutral-700 hover:border-black flex items-center justify-center gap-1.5 active:scale-95 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div></div>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="min-h-[48px] px-6 sm:px-8 py-3 bg-[#0A0A0A] hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 flex-1 sm:flex-initial active:scale-95"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="min-h-[48px] px-6 sm:px-8 py-3 bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs font-black uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 flex-1 sm:flex-initial active:scale-95"
              >
                <span>CONFIRM BOOKING</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
