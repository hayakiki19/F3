import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  Dumbbell,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Sparkles,
  CheckCircle,
  User,
  MapPin,
  ChevronRight,
  AlertCircle,
  ShieldCheck,
  Lock,
  Phone,
  Navigation,
  CheckCircle2,
  Activity,
  Award,
  Zap,
  RotateCcw,
} from 'lucide-react';

export const ClientDashboard: React.FC = () => {
  const {
    user,
    setActiveClientTab,
    openBookingModal,
    openTrainerChat,
    openTrainerModal,
    openCheckoutModal,
    loginAsClient,
    loginAsTrainer,
    loginAsAdmin,
    setCurrentView,
    trainers,
    plans,
    bookings,
    workoutRoutine,
  } = useApp();

  // Internal tab state for less-scroll, Uber/Urban Company feel
  const [consumerTab, setConsumerTab] = useState<
    'live-status' | 'schedule' | 'workout' | 'progress' | 'plan'
  >('live-status');

  // Doorstep note state
  const [doorstepNote, setDoorstepNote] = useState<string>(
    'Buzzer 402, Sea Green Apt, 4th floor (lift functional). Living room space cleared.'
  );
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  const [copiedOtp, setCopiedOtp] = useState<boolean>(false);

  // New Client Booking Widget State (for Anita)
  const [selectedPincode, setSelectedPincode] = useState<string>('400050 (Bandra West)');
  const [selectedGoal, setSelectedGoal] = useState<string>('Fat Loss & Tone');
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>('Tomorrow · 07:00 AM');
  const [selectedTrialCoachId, setSelectedTrialCoachId] = useState<string>('trainer-1');

  if (!user) return null;

  const assignedTrainer =
    trainers.find((t) => t.id === user.activePlan?.assignedTrainerId) || trainers[0];

  // Next upcoming confirmed session
  const nextSession =
    bookings
      .filter((b) => b.clientId === user.id && b.status === 'confirmed')
      .sort((a, b) => (a.date > b.date ? 1 : -1))[0] || {
      id: 'demo-next-1',
      date: 'Tomorrow',
      timeSlot: '07:00 PM',
      sessionType: 'Personal Training (Living Room Hypertrophy)',
      location: 'Flat 402, Sea Green Apts, Bandra West, Mumbai',
      status: 'confirmed',
    };

  // ========================================================
  // VIEW A: NEW CLIENT (ANITA ROY) - URBAN COMPANY ONBOARDING
  // ========================================================
  if (!user.hasActivePlan) {
    return (
      <div className="space-y-5 animate-in fade-in duration-150">
        
        {/* Quick Role Switcher Strip */}
        <div className="bg-neutral-900 text-white p-3 rounded-xl border border-neutral-800 flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8DD8FF] animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-wider text-neutral-300">
              Active Persona: <strong className="text-white">Anita Roy (New Client)</strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[10px] text-neutral-400 font-bold uppercase hidden sm:inline">Switch To:</span>
            <button
              onClick={() => loginAsClient('rahul')}
              className="px-2.5 py-1 text-[11px] font-black uppercase rounded bg-neutral-800 hover:bg-[#FF6A00] text-white transition active:scale-95 border border-neutral-700"
            >
              Rahul (Active Plan)
            </button>
            <button
              onClick={loginAsTrainer}
              className="px-2.5 py-1 text-[11px] font-black uppercase rounded bg-neutral-800 hover:bg-white hover:text-black text-white transition active:scale-95 border border-neutral-700"
            >
              Trainer
            </button>
            <button
              onClick={loginAsAdmin}
              className="px-2.5 py-1 text-[11px] font-black uppercase rounded bg-neutral-800 hover:bg-white hover:text-black text-white transition active:scale-95 border border-neutral-700"
            >
              Admin
            </button>
            <button
              onClick={() => setCurrentView('public')}
              className="px-2.5 py-1 text-[11px] font-black uppercase rounded bg-neutral-800 hover:bg-emerald-500 text-white transition active:scale-95 border border-neutral-700"
            >
              Home Page
            </button>
          </div>
        </div>

        {/* Urban Company Hero Banner for Doorstep Fitness */}
        <div className="bg-[#0A0A0A] text-white p-6 sm:p-8 rounded-2xl border-2 border-black flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#8DD8FF]/10 text-[#8DD8FF] border border-[#8DD8FF]/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DOORSTEP PERSONAL FITNESS AT HOME</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-black uppercase text-white mt-1">
              Welcome, {user.name.split(' ')[0]} 👋
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-xl leading-relaxed">
              We bring certified coaches, sanitized hex weights, and high-density floor mats directly into your living room. Book your first trial session for just ₹499.
            </p>
          </div>

          <button
            onClick={() => openBookingModal(undefined, 'Trial Session')}
            className="relative z-10 w-full md:w-auto bg-[#FF6A00] hover:bg-[#e05d00] text-white font-black text-xs uppercase tracking-wider px-6 py-4 rounded-xl transition flex items-center justify-center gap-2 shrink-0 shadow-lg min-h-[48px] active:scale-98"
          >
            <span>BOOK ₹499 IN-HOME TRIAL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Urban Company 3-Step Instant Booking Widget (Compact & Interactive) */}
        <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6A00] block">
                INSTANT DOORSTEP DISPATCH
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-black uppercase text-black">
                Configure Your In-Home Trial Session
              </h3>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
              Living Room Kit Included
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Step 1: Area */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <span className="font-black uppercase text-black text-[11px] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span>1. Service Address Area</span>
              </span>
              <select
                value={selectedPincode}
                onChange={(e) => setSelectedPincode(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-neutral-300 font-bold text-neutral-800 bg-white"
              >
                <option value="400050 (Bandra West)">Bandra West (400050) - 12 Coaches</option>
                <option value="400052 (Khar West)">Khar West (400052) - 8 Coaches</option>
                <option value="400049 (Juhu)">Juhu (400049) - 10 Coaches</option>
                <option value="400053 (Andheri West)">Andheri West (400053) - 15 Coaches</option>
              </select>
              <p className="text-[10px] text-neutral-500">
                Doorstep trainers are dispatched from nearby local hubs.
              </p>
            </div>

            {/* Step 2: Goal */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <span className="font-black uppercase text-black text-[11px] flex items-center gap-1.5">
                <TargetIcon className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span>2. Living Room Fitness Target</span>
              </span>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-neutral-300 font-bold text-neutral-800 bg-white"
              >
                <option value="Fat Loss & Tone">Fat Loss & Calorie Burn (HIIT + Weights)</option>
                <option value="Strength & Muscle">Strength & Muscle Tone (Dumbbells)</option>
                <option value="Posture & Mobility">Posture & Back-Pain Relief (Mobility)</option>
                <option value="Prenatal & Postnatal">Prenatal / Postnatal Fitness</option>
              </select>
              <p className="text-[10px] text-neutral-500">
                Coach customizes exercises to your living room space and floor type.
              </p>
            </div>

            {/* Step 3: Slot */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <span className="font-black uppercase text-black text-[11px] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span>3. Preferred Doorstep Time</span>
              </span>
              <select
                value={selectedSlotTime}
                onChange={(e) => setSelectedSlotTime(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-neutral-300 font-bold text-neutral-800 bg-white"
              >
                <option value="Tomorrow · 07:00 AM">Tomorrow · 07:00 AM (Early Bird)</option>
                <option value="Tomorrow · 08:30 AM">Tomorrow · 08:30 AM</option>
                <option value="Tomorrow · 05:30 PM">Tomorrow · 05:30 PM (Evening)</option>
                <option value="Tomorrow · 07:00 PM">Tomorrow · 07:00 PM (Popular)</option>
              </select>
              <p className="text-[10px] text-neutral-500">
                Guaranteed on-time arrival within 5 minutes of slot.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-neutral-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs text-neutral-700">
                Background-checked & certified doorstep coach · Sanitized gear brought every visit
              </span>
            </div>
            <button
              onClick={() => openBookingModal(selectedTrialCoachId, 'Trial Session')}
              className="px-6 py-3 rounded-xl bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs font-black uppercase tracking-wider transition active:scale-95 shadow-md flex items-center justify-center gap-2 shrink-0"
            >
              <span>Confirm & Dispatch Trial (₹499)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Verified In-Home Coaches for Anita */}
        <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#FF6A00] block">
                COACH MATCHING
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-black uppercase text-black">
                Available In Bandra & Khar West
              </h3>
            </div>
            <span className="text-xs font-bold text-neutral-500 hidden sm:inline">
              100% Doorstep Visits
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainers.slice(0, 3).map((coach) => (
              <div
                key={coach.id}
                className="border-2 border-neutral-200 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-black transition bg-neutral-50/50 hover:bg-white"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={coach.photo}
                    alt={coach.name}
                    className="w-14 h-14 rounded-lg object-cover border border-neutral-300 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black uppercase text-black truncate">{coach.name}</h4>
                    <p className="text-[11px] text-[#FF6A00] font-bold truncate">{coach.specializations[0]}</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">{coach.experience} · ⭐ {coach.rating}</p>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {coach.about}
                </p>

                <div className="pt-2 border-t border-neutral-200 flex items-center justify-between gap-2">
                  <span className="text-xs font-black text-black">₹{coach.startingPrice}/session</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openTrainerModal(coach)}
                      className="px-2.5 py-1 text-[11px] font-bold uppercase rounded border border-neutral-300 hover:border-black text-black transition"
                    >
                      Bio
                    </button>
                    <button
                      onClick={() => openBookingModal(coach.id, 'Trial Session')}
                      className="px-3 py-1 text-[11px] font-black uppercase rounded bg-[#FF6A00] hover:bg-[#e05d00] text-white transition shadow-xs"
                    >
                      Book Trial (₹499)
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // ========================================================
  // VIEW B: ACTIVE CLIENT (RAHUL VERMA) - UBER / URBAN COMPANY
  // ========================================================
  const activePlan = user.activePlan!;

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      
      {/* Quick Demo Persona Switcher Strip */}
      <div className="bg-neutral-900 text-white p-3 rounded-xl border border-neutral-800 flex flex-wrap items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse"></span>
          <span className="text-xs font-black uppercase tracking-wider text-neutral-300">
            Active Persona: <strong className="text-white">Rahul Verma (Active Client)</strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[10px] text-neutral-400 font-bold uppercase hidden sm:inline">Switch To:</span>
          <button
            onClick={() => loginAsClient('anita')}
            className="px-2.5 py-1 text-[11px] font-black uppercase rounded bg-neutral-800 hover:bg-[#8DD8FF] hover:text-black text-white transition active:scale-95 border border-neutral-700"
          >
            Anita (New Client)
          </button>
          <button
            onClick={loginAsTrainer}
            className="px-2.5 py-1 text-[11px] font-black uppercase rounded bg-neutral-800 hover:bg-white hover:text-black text-white transition active:scale-95 border border-neutral-700"
          >
            Trainer
          </button>
          <button
            onClick={loginAsAdmin}
            className="px-2.5 py-1 text-[11px] font-black uppercase rounded bg-neutral-800 hover:bg-white hover:text-black text-white transition active:scale-95 border border-neutral-700"
          >
            Admin
          </button>
          <button
            onClick={() => setCurrentView('public')}
            className="px-2.5 py-1 text-[11px] font-black uppercase rounded bg-neutral-800 hover:bg-emerald-500 text-white transition active:scale-95 border border-neutral-700"
          >
            Home Page
          </button>
        </div>
      </div>

      {/* Top Urban Company Segmented Pill Controls (Less Scroll, Compact View) */}
      <div className="bg-white p-2 rounded-2xl border-2 border-black flex items-center justify-between overflow-x-auto gap-1 no-scrollbar shadow-xs">
        {[
          { id: 'live-status', label: 'Doorstep Tracker', icon: Navigation, badge: 'NEXT TRIP' },
          { id: 'schedule', label: `My Bookings (${bookings.length})`, icon: Calendar, badge: null },
          { id: 'workout', label: "Today's Routine", icon: Dumbbell, badge: '5 Exercises' },
          { id: 'progress', label: 'Progress & Biometrics', icon: Activity, badge: '-3.5 kg' },
          { id: 'plan', label: `${activePlan.planName} (${activePlan.sessionsRemaining} left)`, icon: Award, badge: null },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = consumerTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setConsumerTab(tab.id as any)}
              className={`min-h-[40px] px-3.5 py-2 text-xs font-black uppercase tracking-wider rounded-xl whitespace-nowrap transition shrink-0 flex items-center gap-2 active:scale-95 border ${
                isActive
                  ? 'bg-black text-white border-black shadow-sm'
                  : 'bg-white text-neutral-600 border-transparent hover:bg-neutral-100 hover:text-black'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF6A00]' : 'text-neutral-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#FF6A00] text-white' : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* TAB 1: LIVE DOORSTEP TRACKER (UBER / URBAN COMPANY FEEL) */}
      {/* ======================================================== */}
      {consumerTab === 'live-status' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          
          {/* Main Urban Company Doorstep Job Hero Card */}
          <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 shadow-sm space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                    DOORSTEP SESSION CONFIRMED
                  </span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-black uppercase text-black tracking-tight">
                  {nextSession.date} · {nextSession.timeSlot}
                </h2>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Coach brings 24kg dumbbells, resistance bands & living room floor mats.
                </p>
              </div>

              {/* Security OTP Card (Urban Company Standard) */}
              <div className="p-3.5 rounded-xl bg-neutral-950 text-white border border-neutral-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] font-black uppercase text-[#FF6A00] block tracking-widest">
                    DOORSTEP CHECK-IN OTP
                  </span>
                  <div className="font-editorial text-2xl font-black tracking-widest text-white mt-0.5">
                    4 8 2 1
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText('4821');
                    setCopiedOtp(true);
                    setTimeout(() => setCopiedOtp(false), 2000);
                  }}
                  className="px-2.5 py-1 text-[10px] font-bold uppercase rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition"
                >
                  {copiedOtp ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Visual 4-Step Doorstep Progress Meter */}
            <div className="py-2">
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { step: 1, title: 'Confirmed', desc: 'Coach Assigned', status: 'done' },
                  { step: 2, title: 'Gear Dispatched', desc: 'Weights & Mat Packed', status: 'done' },
                  { step: 3, title: 'En Route', desc: 'Bandra West (12 min ETA)', status: 'current' },
                  { step: 4, title: 'At Doorstep', desc: 'OTP Check-in', status: 'pending' },
                ].map((s) => (
                  <div key={s.step} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs mb-1.5 border-2 ${
                        s.status === 'done'
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : s.status === 'current'
                          ? 'bg-[#FF6A00] border-black text-white shadow-md animate-pulse'
                          : 'bg-neutral-100 border-neutral-300 text-neutral-400'
                      }`}
                    >
                      {s.status === 'done' ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                    </div>
                    <span className="text-[11px] font-black uppercase text-black line-clamp-1">{s.title}</span>
                    <span className="text-[10px] text-neutral-500 hidden sm:block">{s.desc}</span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#FF6A00] h-full w-[65%]"></div>
              </div>
            </div>

            {/* Doorstep Trainer Card & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              {/* Trainer Info */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={assignedTrainer.photo}
                    alt={assignedTrainer.name}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-black"
                  />
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#FF6A00] block">Assigned Coach</span>
                    <h4 className="font-editorial text-lg font-black uppercase text-black">
                      {assignedTrainer.name}
                    </h4>
                    <span className="text-[11px] text-neutral-500 font-bold">
                      ★ {assignedTrainer.rating} · 1,240+ Doorstep Hours
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:+919820111223"
                    className="p-2.5 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-100 text-black transition"
                    title="Call Coach"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                  </a>
                  <button
                    onClick={openTrainerChat}
                    className="p-2.5 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-100 text-black transition"
                    title="Message Coach"
                  >
                    <MessageSquare className="w-4 h-4 text-[#FF6A00]" />
                  </button>
                </div>
              </div>

              {/* Service Address & Doorbell Instructions */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-black uppercase text-black text-[11px] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6A00]" />
                    <span>Your Living Room Address:</span>
                  </span>
                  <button
                    onClick={() => setIsEditingNote(!isEditingNote)}
                    className="text-[#FF6A00] uppercase font-bold text-[10px] hover:underline"
                  >
                    {isEditingNote ? 'Save Note' : 'Edit Note'}
                  </button>
                </div>
                <strong className="block text-black">{nextSession.location}</strong>
                {isEditingNote ? (
                  <textarea
                    rows={2}
                    value={doorstepNote}
                    onChange={(e) => setDoorstepNote(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-neutral-300 bg-white"
                  />
                ) : (
                  <p className="text-neutral-500 text-[11px]">
                    <em>"{doorstepNote}"</em>
                  </p>
                )}
              </div>

            </div>

            {/* Fast Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-100">
              <div className="flex items-center gap-2 text-xs text-neutral-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero equipment needed. Coach handles all set-up and disinfection.</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openBookingModal(assignedTrainer.id, 'Personal Training')}
                  className="px-4 py-2 rounded-xl bg-black hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition active:scale-95 shadow-xs"
                >
                  Book Next Session
                </button>
              </div>
            </div>

          </div>

          {/* Quick Snapshot 3-Col Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border-2 border-black p-4 flex items-center gap-3 shadow-xs">
              <Award className="w-8 h-8 text-[#FF6A00] shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase text-neutral-400 block">Active Subscription</span>
                <strong className="text-black font-editorial text-lg block">{activePlan.planName}</strong>
                <span className="text-[11px] text-neutral-500">{activePlan.sessionsRemaining} of {activePlan.sessionsTotal} sessions left</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-black p-4 flex items-center gap-3 shadow-xs">
              <Zap className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase text-neutral-400 block">Consistency Streak</span>
                <strong className="text-black font-editorial text-lg block">14 Days Active</strong>
                <span className="text-[11px] text-emerald-600 font-bold">Top 5% in Bandra</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-black p-4 flex items-center gap-3 shadow-xs">
              <Activity className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase text-neutral-400 block">Weight Progress</span>
                <strong className="text-black font-editorial text-lg block">78.5 kg (-3.5 kg)</strong>
                <span className="text-[11px] text-neutral-500">Goal: 75.0 kg</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: MY BOOKINGS & SCHEDULE                            */}
      {/* ======================================================== */}
      {consumerTab === 'schedule' && (
        <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <div>
              <h3 className="font-editorial text-2xl font-black uppercase text-black">
                Upcoming Doorstep Sessions ({bookings.length})
              </h3>
              <p className="text-xs text-neutral-500">
                Cancel or reschedule anytime up to 4 hours before your session.
              </p>
            </div>
            <button
              onClick={() => openBookingModal(assignedTrainer.id, 'Personal Training')}
              className="px-4 py-2 rounded-xl bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs font-black uppercase tracking-wider transition active:scale-95 shadow-xs"
            >
              + Book Slot
            </button>
          </div>

          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 rounded-xl border border-neutral-300 hover:border-black transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-50/50 hover:bg-white"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                      {booking.date}
                    </span>
                    <span className="text-xs font-bold text-neutral-800">{booking.timeSlot}</span>
                    <span className="text-xs font-bold text-emerald-600">· {booking.status}</span>
                  </div>
                  <h4 className="font-editorial text-lg font-black uppercase text-black">
                    {booking.sessionType}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{booking.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveClientTab('schedule')}
                    className="px-3.5 py-1.5 rounded-lg border border-neutral-300 hover:border-black text-neutral-800 text-xs font-bold uppercase transition"
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: TODAY'S HOME ROUTINE                              */}
      {/* ======================================================== */}
      {consumerTab === 'workout' && (
        <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#FF6A00] block">
                PRESCRIBED LIVING ROOM PROGRAM
              </span>
              <h3 className="font-editorial text-2xl font-black uppercase text-black">
                {workoutRoutine.title}
              </h3>
            </div>
            <button
              onClick={() => setActiveClientTab('workout')}
              className="px-4 py-2 rounded-xl bg-black hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition"
            >
              Open Full Logger →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {workoutRoutine.exercises.map((ex) => (
              <div
                key={ex.id}
                className="p-4 rounded-xl border border-neutral-300 hover:border-black transition bg-neutral-50/50 hover:bg-white flex items-center justify-between"
              >
                <div>
                  <h4 className="font-black text-xs uppercase text-black">{ex.name}</h4>
                  <p className="text-[11px] text-neutral-600 mt-0.5">
                    {ex.sets} Sets × {ex.reps} · <strong className="text-neutral-800">{ex.rest} rest</strong>
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{ex.notes}</p>
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                  {ex.target}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: BIOMETRICS & PROGRESS                             */}
      {/* ======================================================== */}
      {consumerTab === 'progress' && (
        <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <div>
              <h3 className="font-editorial text-2xl font-black uppercase text-black">
                Biometrics & Body Composition
              </h3>
              <p className="text-xs text-neutral-500">
                Measured using Coach Arjun's Bluetooth body composition scale at your flat.
              </p>
            </div>
            <button
              onClick={() => setActiveClientTab('progress')}
              className="px-4 py-2 rounded-xl bg-black text-white text-xs font-black uppercase tracking-wider"
            >
              Full History →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Starting Weight</span>
              <strong className="text-black font-editorial text-2xl">82.0 kg</strong>
              <span className="text-[10px] text-neutral-500 block">Aug 1, 2026</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Current Weight</span>
              <strong className="text-emerald-950 font-editorial text-2xl">78.5 kg</strong>
              <span className="text-[10px] text-emerald-700 font-bold block">-3.5 kg lost</span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Body Fat %</span>
              <strong className="text-black font-editorial text-2xl">18.2%</strong>
              <span className="text-[10px] text-emerald-700 font-bold block">-2.4% reduction</span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Muscle Mass</span>
              <strong className="text-black font-editorial text-2xl">34.1 kg</strong>
              <span className="text-[10px] text-emerald-700 font-bold block">+0.8 kg gained</span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: MEMBERSHIP PLAN & ADD-ONS                         */}
      {/* ======================================================== */}
      {consumerTab === 'plan' && (
        <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 space-y-5 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6A00] block">
                MONTHLY SUBSCRIPTION
              </span>
              <h3 className="font-editorial text-3xl font-black uppercase text-black">
                {activePlan.planName}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Renews automatically on {activePlan.expiryDate} via auto-debit.
              </p>
            </div>
            <button
              onClick={() => openCheckoutModal(plans[1])}
              className="px-5 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs font-black uppercase tracking-wider transition active:scale-95 shadow-sm"
            >
              Add 4 Sessions (₹5,200)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <span className="text-[10px] font-bold uppercase text-neutral-400 block">Sessions Used</span>
              <strong className="font-editorial text-2xl text-black">{activePlan.sessionsUsed} / {activePlan.sessionsTotal}</strong>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <span className="text-[10px] font-bold uppercase text-neutral-400 block">Sessions Remaining</span>
              <strong className="font-editorial text-2xl text-[#FF6A00]">{activePlan.sessionsRemaining} Sessions</strong>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <span className="text-[10px] font-bold uppercase text-neutral-400 block">Plan Expiry</span>
              <strong className="font-editorial text-2xl text-black">{activePlan.expiryDate}</strong>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <circle cx={12} cy={12} r={10} />
      <circle cx={12} cy={12} r={6} />
      <circle cx={12} cy={12} r={2} />
    </svg>
  );
}
