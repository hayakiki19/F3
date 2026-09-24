import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  DollarSign,
  CheckCircle,
  XCircle,
  FileText,
  AlertCircle,
  TrendingUp,
  ArrowLeft,
  ChevronRight,
  Users,
  Sparkles,
  Home,
  ShieldCheck,
  Dumbbell,
  Navigation,
  Phone,
  MessageSquare,
  Play,
  Pause,
  RotateCcw,
  CheckSquare,
  Square,
  CheckCircle2,
  Heart,
  Activity,
  Award,
  Zap,
  Lock,
  Share2,
} from 'lucide-react';

export const TrainerDashboard: React.FC = () => {
  const {
    trainers,
    bookings,
    clients,
    trainerEarnings,
    confirmTimeChange,
    declineTimeChange,
    completeSessionByTrainer,
    setCurrentView,
    loginAsClient,
    loginAsAdmin,
    loginAsTrainer,
    openTrainerChat,
  } = useApp();

  const trainer = trainers[0]; // Arjun Sharma
  const trainerBookings = bookings.filter((b) => b.trainerId === trainer.id);

  const pendingChanges = trainerBookings.filter((b) => b.status === 'reschedule_pending');
  const upcoming = trainerBookings.filter((b) => b.status === 'confirmed');
  const completed = trainerBookings.filter((b) => b.status === 'completed');

  // Urban Company Partner Tabs (Compact, less scroll)
  const [activeTab, setActiveTab] = useState<
    'live-dispatch' | 'itinerary' | 'gear-checklist' | 'clients' | 'earnings' | 'availability'
  >('live-dispatch');

  // Partner Duty Status (Urban Company style: Online / Offline)
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // Live Dispatch Simulation State (Active Doorstep Job)
  const activeSession = upcoming[0] || {
    id: 'demo-live-1',
    clientName: 'Rahul Verma',
    clientId: 'client-1',
    date: 'Today',
    timeSlot: '07:00 PM - 08:00 PM',
    sessionType: 'Personal Training (Hypertrophy)',
    location: 'Flat 402, Sea Green Apts, Bandra West, Mumbai',
    status: 'confirmed',
    notes: 'Prioritize shoulder warm-up; recovering from right rotator cuff tightness.',
  };

  // Dispatch progress steps:
  // 1: Dispatched / Gear Packed
  // 2: On The Way (Live GPS route)
  // 3: Arrived at Doorstep
  // 4: Session In Progress (Timer running)
  // 5: Session Completed (OTP / Verified)
  const [dispatchStep, setDispatchStep] = useState<number>(2);
  const [otpInput, setOtpInput] = useState<string>('4821');
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  // Live Workout Timer State
  const [workoutSeconds, setWorkoutSeconds] = useState<number>(3600); // 60 mins countdown
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [completedExercises, setCompletedExercises] = useState<{ [key: string]: boolean }>({
    ex1: true,
    ex2: true,
    ex3: false,
    ex4: false,
  });

  // Doorstep Gear Checklist State (Urban Company standard)
  const [gearChecklist, setGearChecklist] = useState([
    { id: 'g1', name: '2x 24kg Quick-Adjust Dumbbells (Tested lock-pins)', packed: true, category: 'Weights' },
    { id: 'g2', name: '3x High-Resistance Elastic Loop Bands', packed: true, category: 'Mobility' },
    { id: 'g3', name: '2x Thick Sanitized Living Room Foam Mats', packed: true, category: 'Sanitation' },
    { id: 'g4', name: 'TRX Door-Anchor Suspension Straps', packed: true, category: 'Accessories' },
    { id: 'g5', name: 'Hospital-Grade Equipment Disinfectant Spray & Clean Towels', packed: true, category: 'Sanitation' },
    { id: 'g6', name: 'First Aid Kit, Blood Pressure Cuff & Pulse Oximeter', packed: true, category: 'Safety' },
    { id: 'g7', name: 'Bluetooth Body Fat & Weight Composition Scale', packed: false, category: 'Biometrics' },
  ]);

  // Client Details Modal / Biometrics Drawer
  const [selectedClientForPrescription, setSelectedClientForPrescription] = useState<any | null>(null);
  const [trainerNotesInput, setTrainerNotesInput] = useState<string>('');
  const [sessionCompletedSuccess, setSessionCompletedSuccess] = useState<boolean>(false);

  // Instant Payout Modal Simulation
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState<boolean>(false);
  const [payoutSuccess, setPayoutSuccess] = useState<boolean>(false);

  // Timer Countdown Effect
  useEffect(() => {
    const handleTrainerTab = (e: any) => {
      if (e.detail) {
        setActiveTab(e.detail);
      }
    };
    window.addEventListener('trainer-tab-change', handleTrainerTab);
    return () => window.removeEventListener('trainer-tab-change', handleTrainerTab);
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && workoutSeconds > 0) {
      interval = setInterval(() => {
        setWorkoutSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    } else if (workoutSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, workoutSeconds]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyOtp = () => {
    if (otpInput === '4821') {
      setIsOtpVerified(true);
      setOtpError(null);
      setDispatchStep(4);
      setIsTimerRunning(true);
    } else {
      setOtpError('Invalid OTP. Please ask client for the 4-digit code in their app.');
    }
  };

  const handleFinishLiveSession = () => {
    setIsTimerRunning(false);
    setDispatchStep(5);
    setSessionCompletedSuccess(true);
    completeSessionByTrainer(
      activeSession.id,
      trainerNotesInput || 'Full chest & core home workout completed. Excellent progressive overload on 18kg DB press.'
    );
  };

  const toggleGear = (id: string) => {
    setGearChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item))
    );
  };

  const packedCount = gearChecklist.filter((g) => g.packed).length;

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex flex-col pb-24 text-neutral-900">
      
      {/* Top Urban Company Partner Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Upper Partner Bar */}
          <div className="flex flex-wrap items-center justify-between py-2.5 border-b border-neutral-100 gap-2">
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setCurrentView('public')}
                className="inline-flex items-center gap-1 font-bold text-neutral-500 hover:text-black transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Website</span>
              </button>
              <span className="text-neutral-300">/</span>
              <span className="font-bold text-neutral-500">Trainer Console</span>
              <span className="text-neutral-300">/</span>
              <span className="font-black text-black">{trainer.name}</span>
              <span className="hidden md:inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-amber-200">
                ★ {trainer.rating} Elite Partner
              </span>
            </div>

            {/* Duty Status Toggle (Online / Offline) */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-full border border-neutral-200">
                <button
                  onClick={() => setIsOnline(true)}
                  className={`px-3 py-1 text-[11px] font-black uppercase tracking-wider rounded-full transition flex items-center gap-1.5 ${
                    isOnline ? 'bg-emerald-600 text-white shadow-xs' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  <span>Online</span>
                </button>
                <button
                  onClick={() => setIsOnline(false)}
                  className={`px-3 py-1 text-[11px] font-black uppercase tracking-wider rounded-full transition ${
                    !isOnline ? 'bg-neutral-800 text-white shadow-xs' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  Break
                </button>
              </div>

              <button
                onClick={() => setIsPayoutModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 bg-[#FF6A00] hover:bg-[#e05d00] text-white px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition active:scale-95 shadow-xs"
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>Payout: ₹{trainerEarnings.pendingPayout.toLocaleString('en-IN')}</span>
              </button>
            </div>
          </div>

          {/* Desktop Navigation Segmented Pills */}
          <div className="hidden lg:flex items-center justify-between py-2.5 space-x-1.5">
            {[
              { id: 'live-dispatch', label: 'Live Doorstep Job', icon: Navigation, badge: isOnline ? 'ACTIVE' : null },
              { id: 'itinerary', label: `Today's Stops (${upcoming.length})`, icon: Calendar, badge: pendingChanges.length > 0 ? `${pendingChanges.length} Req` : null },
              { id: 'gear-checklist', label: `Gear Kit (${packedCount}/7)`, icon: Dumbbell, badge: packedCount === 7 ? 'READY' : 'CHECK' },
              { id: 'clients', label: `Clients (${clients.length})`, icon: Users, badge: null },
              { id: 'earnings', label: 'Payout & Trips', icon: DollarSign, badge: '₹3,200 today' },
              { id: 'availability', label: 'Availability', icon: Clock, badge: null },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`min-h-[38px] px-3.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl whitespace-nowrap transition shrink-0 flex items-center gap-2 active:scale-95 border ${
                    isActive
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:text-black hover:border-neutral-300'
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

          {/* Mobile Navigation (NO Horizontal Slide Scroll: Clean 3x2 Grid) */}
          <div className="lg:hidden py-2">
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'live-dispatch', label: 'Live Job', icon: Navigation, badge: isOnline ? 'LIVE' : null },
                { id: 'itinerary', label: `Stops (${upcoming.length})`, icon: Calendar, badge: null },
                { id: 'gear-checklist', label: `Gear (${packedCount}/7)`, icon: Dumbbell, badge: packedCount === 7 ? 'OK' : null },
                { id: 'clients', label: 'Clients', icon: Users, badge: null },
                { id: 'earnings', label: 'Payouts', icon: DollarSign, badge: '₹3.2k' },
                { id: 'availability', label: 'Schedule', icon: Clock, badge: null },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`min-h-[42px] px-1.5 py-1.5 rounded-xl text-center flex flex-col items-center justify-center gap-0.5 transition active:scale-95 border ${
                      isActive
                        ? 'bg-black text-white border-black shadow-xs font-black'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-black font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF6A00]' : 'text-neutral-500'}`} />
                      {tab.badge && (
                        <span
                          className={`text-[8px] px-1 py-0 rounded-full font-black ${
                            isActive ? 'bg-[#FF6A00] text-white' : 'bg-neutral-200 text-neutral-700'
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] uppercase tracking-tight leading-none truncate w-full">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        
        {/* Quick Demo Persona Switcher Strip */}
        <div className="bg-neutral-900 text-white p-3 rounded-xl border border-neutral-800 flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-wider text-neutral-300">
              Active Persona: <strong className="text-white">Arjun Sharma (Senior Doorstep Trainer)</strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[10px] text-neutral-400 font-bold uppercase hidden sm:inline">Switch To:</span>
            <button
              onClick={() => loginAsClient('rahul')}
              className="px-2.5 py-1 text-[11px] font-black uppercase rounded bg-neutral-800 hover:bg-[#FF6A00] text-white transition active:scale-95 border border-neutral-700"
            >
              Rahul (Active Client)
            </button>
            <button
              onClick={() => loginAsClient('anita')}
              className="px-2.5 py-1 text-[11px] font-black uppercase rounded bg-neutral-800 hover:bg-[#8DD8FF] hover:text-black text-white transition active:scale-95 border border-neutral-700"
            >
              Anita (New Client)
            </button>
            <button
              onClick={loginAsAdmin}
              className="px-2.5 py-1 text-[11px] font-black uppercase rounded bg-neutral-800 hover:bg-white hover:text-black text-white transition active:scale-95 border border-neutral-700"
            >
              Admin (HQ)
            </button>
            <button
              onClick={() => setCurrentView('public')}
              className="px-2.5 py-1 text-[11px] font-black uppercase rounded bg-neutral-800 hover:bg-emerald-500 text-white transition active:scale-95 border border-neutral-700"
            >
              Home Page
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: LIVE DOORSTEP JOB (UBER / URBAN COMPANY DISPATCH)  */}
        {/* ======================================================== */}
        {activeTab === 'live-dispatch' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            
            {/* Top Live Job Dispatch Status Banner */}
            <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#FF6A00] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider animate-pulse">
                      ● LIVE IN-HOME JOB
                    </span>
                    <span className="text-xs font-bold text-neutral-500">
                      Trip ID #TRIP-{activeSession.id.toUpperCase().slice(0, 6)}
                    </span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-black uppercase text-black tracking-tight">
                    {activeSession.clientName} · {activeSession.sessionType}
                  </h2>
                </div>

                {/* Urban Company Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="tel:+919820111223"
                    className="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 border border-neutral-300"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Call Client</span>
                  </a>
                  <button
                    onClick={openTrainerChat}
                    className="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 border border-neutral-300"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#FF6A00]" />
                    <span>In-App Chat</span>
                  </button>
                  <button
                    onClick={() => {
                      alert('Navigating to ' + activeSession.location + ' via Google Maps');
                    }}
                    className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#FF6A00]" />
                    <span>Open Maps (ETA 12m)</span>
                  </button>
                </div>
              </div>

              {/* Urban Company 5-Step Visual State Machine */}
              <div className="pt-5 pb-3">
                <div className="grid grid-cols-5 gap-2 text-center">
                  {[
                    { step: 1, title: 'Gear Ready', desc: 'Dumbbells Sanitized' },
                    { step: 2, title: 'On The Way', desc: 'GPS Commute (12m)' },
                    { step: 3, title: 'At Doorstep', desc: 'Doorbell Rang' },
                    { step: 4, title: 'In Session', desc: '60 Min Workout' },
                    { step: 5, title: 'Completed', desc: 'OTP Verified' },
                  ].map((s) => {
                    const isDone = dispatchStep > s.step;
                    const isCurrent = dispatchStep === s.step;
                    return (
                      <button
                        key={s.step}
                        onClick={() => setDispatchStep(s.step)}
                        className={`flex flex-col items-center group transition text-left sm:text-center ${
                          isCurrent
                            ? 'scale-105 font-black'
                            : 'opacity-85 hover:opacity-100'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs mb-1.5 border-2 transition ${
                            isDone
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : isCurrent
                              ? 'bg-[#FF6A00] border-black text-white shadow-md'
                              : 'bg-neutral-100 border-neutral-300 text-neutral-400'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                        </div>
                        <span className="text-[11px] font-black uppercase text-black line-clamp-1">
                          {s.title}
                        </span>
                        <span className="text-[10px] text-neutral-500 hidden sm:block">
                          {s.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-[#FF6A00] h-full transition-all duration-300"
                    style={{ width: `${(dispatchStep / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Address & Living Room Access Note */}
              <div className="mt-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black font-black uppercase block">Service Location:</strong>
                    <span className="text-neutral-700">{activeSession.location}</span>
                    <p className="text-neutral-500 text-[11px] mt-0.5">
                      Doorstep Note: <em>"Buzzer 402, 4th floor, elevator working. Living room has hardwood floor."</em>
                    </p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <span className="bg-white border border-neutral-300 px-3 py-1.5 rounded-lg text-neutral-700 font-bold">
                    Slot: {activeSession.timeSlot}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Step Details Card (Based on dispatchStep) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* Left 2 Cols: Step Specific Actions */}
              <div className="lg:col-span-2 space-y-5">
                
                {/* Step 2 or 3: OTP Check-in Verification (Urban Company Standard) */}
                {dispatchStep <= 3 && (
                  <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-[#FF6A00]" />
                        <h3 className="font-editorial text-xl font-black uppercase text-black">
                          Doorstep Security Check-In (4-Digit OTP)
                        </h3>
                      </div>
                      <span className="text-xs bg-neutral-100 text-neutral-700 font-bold px-2.5 py-1 rounded-md">
                        Urban Company Safety Protocol
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600">
                      When you reach the client's home, ask {activeSession.clientName} for the 4-digit start OTP shown on their app screen to begin the session.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          maxLength={4}
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value)}
                          placeholder="4821"
                          className="w-32 text-center tracking-[0.4em] font-editorial text-2xl font-black p-2 rounded-xl border-2 border-black bg-neutral-50 focus:bg-white focus:outline-[#FF6A00]"
                        />
                        <button
                          onClick={handleVerifyOtp}
                          className="px-5 py-3 rounded-xl bg-[#FF6A00] hover:bg-[#e05d00] text-white font-black text-xs uppercase tracking-wider transition active:scale-95 shadow-sm"
                        >
                          Verify & Start Session →
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          setDispatchStep(3);
                          alert('Notification sent to client: Trainer Arjun has arrived at your door!');
                        }}
                        className="px-4 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider transition border border-neutral-300"
                      >
                        I've Arrived (Ring Doorbell)
                      </button>
                    </div>

                    {otpError && (
                      <p className="text-xs font-bold text-red-600 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{otpError}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Step 4: Live 60-Minute Workout In Progress */}
                {dispatchStep >= 4 && (
                  <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 space-y-5">
                    
                    {/* Timer & Heart Rate Bar */}
                    <div className="bg-neutral-950 text-white rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6A00] block mb-1">
                          LIVE IN-HOME WORKOUT TIMER
                        </span>
                        <div className="font-editorial text-5xl font-black tracking-tight text-white flex items-center gap-2">
                          <span>{formatTimer(workoutSeconds)}</span>
                          <span className="text-xs font-mono font-bold text-neutral-400">/ 60:00</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsTimerRunning(!isTimerRunning)}
                          className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition flex items-center gap-1.5 ${
                            isTimerRunning
                              ? 'bg-amber-500 hover:bg-amber-600 text-black'
                              : 'bg-emerald-500 hover:bg-emerald-600 text-black'
                          }`}
                        >
                          {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          <span>{isTimerRunning ? 'Pause' : 'Resume'}</span>
                        </button>
                        <button
                          onClick={() => setWorkoutSeconds(3600)}
                          className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
                          title="Reset Timer"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="border-t sm:border-t-0 sm:border-l border-neutral-800 pt-3 sm:pt-0 sm:pl-4 flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-2 text-rose-400">
                          <Heart className="w-4 h-4 animate-pulse" />
                          <div>
                            <span className="text-[10px] uppercase text-neutral-400 block font-bold">Client Heart Rate</span>
                            <span className="font-editorial text-lg font-black text-white">138 BPM</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Today's Prescribed Living Room Exercise Plan */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-editorial text-lg font-black uppercase text-black">
                          Prescribed Routine (Log Completed Sets)
                        </h4>
                        <span className="text-xs text-neutral-500 font-bold">
                          Gear: 24kg DBs + Floor Mat
                        </span>
                      </div>

                      <div className="space-y-2">
                        {[
                          { id: 'ex1', name: 'Goblet Squat (DB)', sets: '4 Sets × 12 Reps', load: '18 kg DB', note: 'Depth below parallel' },
                          { id: 'ex2', name: 'Floor Dumbbell Chest Press', sets: '4 Sets × 10 Reps', load: '2x 16 kg DBs', note: 'Pause at bottom' },
                          { id: 'ex3', name: 'Single-Arm Dumbbell Row', sets: '3 Sets × 12 Reps', load: '18 kg DB', note: 'Neutral spine, elbow tight' },
                          { id: 'ex4', name: 'Plank with Shoulder Tap', sets: '3 Sets × 45 Sec', load: 'Bodyweight', note: 'Core bracing' },
                        ].map((ex) => (
                          <div
                            key={ex.id}
                            onClick={() =>
                              setCompletedExercises((prev) => ({ ...prev, [ex.id]: !prev[ex.id] }))
                            }
                            className={`p-3.5 rounded-xl border-2 transition cursor-pointer flex items-center justify-between ${
                              completedExercises[ex.id]
                                ? 'bg-emerald-50/70 border-emerald-500'
                                : 'bg-white border-neutral-200 hover:border-black'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-6 h-6 rounded-md flex items-center justify-center border transition ${
                                  completedExercises[ex.id]
                                    ? 'bg-emerald-600 border-emerald-600 text-white'
                                    : 'border-neutral-300 bg-neutral-100'
                                }`}
                              >
                                {completedExercises[ex.id] && <CheckCircle2 className="w-4 h-4" />}
                              </div>
                              <div>
                                <span className="font-black text-xs uppercase text-black block">{ex.name}</span>
                                <span className="text-[11px] text-neutral-500">
                                  {ex.sets} · <strong className="text-neutral-800">{ex.load}</strong> ({ex.note})
                                </span>
                              </div>
                            </div>
                            <span className="text-[10px] font-black uppercase text-neutral-500">
                              {completedExercises[ex.id] ? 'Done ✓' : 'Tap to Log'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trainer Notes & Session Completion */}
                    <div className="pt-2 border-t border-neutral-100 space-y-3">
                      <div>
                        <label className="text-xs font-black uppercase text-neutral-700 block mb-1">
                          Coach Feedback & Next Progression Note for {activeSession.clientName}
                        </label>
                        <textarea
                          rows={2}
                          value={trainerNotesInput}
                          onChange={(e) => setTrainerNotesInput(e.target.value)}
                          placeholder="e.g. Rahul handled 18kg comfortably today. Next Tuesday we will progress to 20kg dumbbells for Romanian Deadlifts."
                          className="w-full text-xs p-3 rounded-xl border border-neutral-300 focus:outline-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]"
                        ></textarea>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <span className="text-xs font-bold text-neutral-500">
                          Direct Credit: <strong className="text-emerald-700">₹1,125 + ₹50 Fuel Allowance</strong>
                        </span>
                        <button
                          onClick={handleFinishLiveSession}
                          className="px-6 py-3 rounded-xl bg-black hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition active:scale-95 shadow-md flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Complete Session & Sign Off</span>
                        </button>
                      </div>

                      {sessionCompletedSuccess && (
                        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-400 text-emerald-900 text-xs flex items-center gap-2 font-bold animate-in fade-in">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            Session marked complete! ₹1,125 credited to your pending payout balance and biometrics updated.
                          </span>
                        </div>
                      )}
                    </div>

                  </div>
                )}

              </div>

              {/* Right Col: Client Biometrics & Safety Snapshot */}
              <div className="space-y-4">
                
                {/* Client Profile Snapshot Card */}
                <div className="bg-white rounded-2xl border-2 border-black p-5 space-y-4 shadow-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                      alt={activeSession.clientName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-black"
                    />
                    <div>
                      <h4 className="font-editorial text-lg font-black uppercase text-black">
                        {activeSession.clientName}
                      </h4>
                      <p className="text-xs text-neutral-500 font-bold">
                        Transform Plan · Session 6 of 8
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                      <span className="text-[10px] text-neutral-400 font-bold uppercase block">Current Weight</span>
                      <strong className="text-black font-editorial text-base">78.5 kg</strong>
                      <span className="text-[10px] text-emerald-600 font-bold block">-3.5 kg lost</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                      <span className="text-[10px] text-neutral-400 font-bold uppercase block">Body Fat %</span>
                      <strong className="text-black font-editorial text-base">18.2%</strong>
                      <span className="text-[10px] text-neutral-500 font-bold block">Target: 15%</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs space-y-1">
                    <span className="text-[10px] font-black uppercase text-neutral-500 block">Medical & Injuries</span>
                    <p className="text-neutral-700 font-medium">
                      ⚠️ Mild right shoulder impingement when overhead pressing. Avoid behind-neck presses.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-neutral-500 font-bold">Home Equipment Available:</span>
                    <span className="font-black text-black">None (We supply all gear)</span>
                  </div>
                </div>

                {/* Urban Company SOS & Safety Protocol Card */}
                <div className="bg-amber-50 rounded-2xl border border-amber-300 p-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-amber-900 font-black uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>Urban Company Partner Safety</span>
                  </div>
                  <p className="text-amber-800 text-[11px] leading-relaxed">
                    Live GPS is active. If client is unresponsive at the door or you experience an emergency, tap SOS for immediate support.
                  </p>
                  <button
                    onClick={() => alert('Academy Safety Officer dispatched: Calling you on +91 98201 11223 now.')}
                    className="w-full py-2 bg-amber-200 hover:bg-amber-300 text-amber-950 font-black text-xs uppercase tracking-wider rounded-lg transition"
                  >
                    🚨 Partner SOS Hotline
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: TODAY'S ITINERARY (HOME STOPS)                    */}
        {/* ======================================================== */}
        {activeTab === 'itinerary' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            
            {/* PENDING RESCHEDULE REQUESTS (High Priority) */}
            {pendingChanges.length > 0 && (
              <div className="bg-amber-50 rounded-2xl border-2 border-amber-400 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-700" />
                  <h3 className="font-editorial text-xl font-black uppercase text-amber-950">
                    Action Required: Reschedule Requests ({pendingChanges.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {pendingChanges.map((req) => (
                    <div
                      key={req.id}
                      className="bg-white rounded-xl border border-amber-300 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-black text-sm uppercase">{req.clientName}</span>
                          <span className="text-xs text-neutral-500">· {req.sessionType}</span>
                        </div>
                        <p className="text-xs text-neutral-600">
                          Original: <strong className="text-neutral-800">{req.date} at {req.timeSlot}</strong>
                        </p>
                        <p className="text-xs text-[#FF6A00] font-black mt-0.5">
                          Requested Slot: {req.changeRequest?.preferredDate} ({req.changeRequest?.preferredTime})
                        </p>
                        {req.changeRequest?.note && (
                          <p className="text-xs text-neutral-500 italic mt-1">"{req.changeRequest.note}"</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => confirmTimeChange(req.id)}
                          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 shadow-xs"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Accept & Update Route</span>
                        </button>
                        <button
                          onClick={() => declineTimeChange(req.id)}
                          className="px-3.5 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-black uppercase tracking-wider transition border border-neutral-300"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chronological Stop List */}
            <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-2xl font-black uppercase text-black">
                    Scheduled Doorstep Visits ({upcoming.length})
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Organized by commute distance and timing across Bandra & Khar West.
                  </p>
                </div>
                <span className="text-xs font-black uppercase bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
                  Total Commute: ~6.4 km
                </span>
              </div>

              <div className="space-y-3">
                {upcoming.map((session, idx) => (
                  <div
                    key={session.id}
                    className="p-4 rounded-xl border border-neutral-300 hover:border-black transition flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-50/50 hover:bg-white"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-[#FF6A00] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                            {session.date}
                          </span>
                          <span className="text-xs font-bold text-neutral-800">
                            {session.timeSlot}
                          </span>
                          <span className="text-xs font-bold text-emerald-600">· Confirmed</span>
                        </div>

                        <h4 className="font-editorial text-xl font-black uppercase text-black">
                          {session.clientName}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-neutral-600 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{session.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setActiveTab('live-dispatch');
                          setDispatchStep(2);
                        }}
                        className="px-4 py-2 rounded-xl bg-black hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition active:scale-95 shadow-xs flex items-center gap-1.5"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Start Trip</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Trips History */}
            <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 space-y-4">
              <h3 className="font-editorial text-xl font-black uppercase text-black">
                Recent Completed Home Visits ({completed.length})
              </h3>

              <div className="space-y-2">
                {completed.map((sess) => (
                  <div
                    key={sess.id}
                    className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs flex justify-between items-center"
                  >
                    <div>
                      <span className="font-black text-black">{sess.clientName}</span> · {sess.date} ({sess.timeSlot})
                      {sess.notesFromTrainer && (
                        <p className="text-neutral-500 italic mt-0.5">"{sess.notesFromTrainer}"</p>
                      )}
                    </div>
                    <span className="font-bold text-emerald-700 uppercase text-[11px] bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      Paid (₹1,125 + Tip)
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: DOORSTEP GEAR KIT CHECKLIST (URBAN COMPANY SPEC)   */}
        {/* ======================================================== */}
        {activeTab === 'gear-checklist' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                      HQ SANITATION & QUALITY AUDIT
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl font-black uppercase text-black">
                    Doorstep Equipment Bag Checklist ({packedCount} of 7 Packed)
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Urban Company standard: All weights and mats must be disinfected between home sessions.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setGearChecklist((prev) => prev.map((item) => ({ ...item, packed: true })))
                    }
                    className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider transition"
                  >
                    Pack All ✓
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {gearChecklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleGear(item.id)}
                    className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-center justify-between ${
                      item.packed
                        ? 'bg-neutral-50 border-neutral-300'
                        : 'bg-amber-50/50 border-amber-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center border transition ${
                          item.packed
                            ? 'bg-black border-black text-white'
                            : 'border-neutral-400 bg-white'
                        }`}
                      >
                        {item.packed && <CheckCircle2 className="w-4 h-4 text-[#FF6A00]" />}
                      </div>
                      <div>
                        <span className="font-black text-xs uppercase text-black block">{item.name}</span>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase">{item.category}</span>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        item.packed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.packed ? 'Packed' : 'Needs Pack'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Academy Bag Spec */}
              <div className="p-4 rounded-xl bg-neutral-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-[#FF6A00] shrink-0" />
                  <div>
                    <strong className="font-editorial text-sm uppercase block text-white">
                      Academy Standard Heavy-Duty Rolling Duffel #KIT-882
                    </strong>
                    <span className="text-neutral-400 text-[11px]">
                      Equipped with stair-climbing wheels for easy apartment elevator & lobby transport.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => alert('New disinfectant spray & sanitizing towel replacement order placed with HQ Dispatch.')}
                  className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs uppercase shrink-0"
                >
                  Order Refill Supplies
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CLIENTS & PRESCRIPTIONS                           */}
        {/* ======================================================== */}
        {activeTab === 'clients' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-2xl font-black uppercase text-black">
                    Assigned Home Clients ({clients.length})
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Track client biometric history, injury logs, and session balances.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clients.map((c: any) => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl border-2 border-neutral-200 hover:border-black transition bg-white shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-10 h-10 rounded-full object-cover border border-neutral-300"
                        />
                        <div>
                          <h4 className="font-editorial text-lg font-black uppercase text-black">
                            {c.name}
                          </h4>
                          <span className="text-[11px] text-neutral-500">{c.phone}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase bg-[#FF6A00] text-white px-2.5 py-1 rounded-md">
                        {c.activePlan?.planName || 'Trial'}
                      </span>
                    </div>

                    <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs space-y-1 text-neutral-700">
                      <p><strong>Goal:</strong> {c.fitnessProfile?.fitnessGoal || 'Hypertrophy & Fat Loss'}</p>
                      <p><strong>Level:</strong> {c.fitnessProfile?.fitnessLevel || 'Intermediate'}</p>
                      <p><strong>Address:</strong> {c.fitnessProfile?.serviceAddress || 'Bandra West, Mumbai'}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-neutral-100">
                      <span>Sessions Remaining: <strong className="text-black">{c.activePlan?.sessionsRemaining ?? 3}</strong></span>
                      <button
                        onClick={() => setSelectedClientForPrescription(c)}
                        className="text-[#FF6A00] uppercase hover:underline font-black"
                      >
                        Prescribe Workout →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Prescription Modal Simulation */}
              {selectedClientForPrescription && (
                <div className="p-5 rounded-2xl bg-neutral-950 text-white border-2 border-[#FF6A00] space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-editorial text-xl font-black uppercase text-white">
                      Workout Prescription for {selectedClientForPrescription.name}
                    </h4>
                    <button
                      onClick={() => setSelectedClientForPrescription(null)}
                      className="px-3 py-1 bg-white text-black font-bold text-xs uppercase rounded-md"
                    >
                      Close
                    </button>
                  </div>
                  <p className="text-xs text-neutral-300">
                    Assign next home session routine (exercises will sync to client's dashboard immediately).
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                      <strong className="block text-[#FF6A00] mb-1 uppercase">Warm-Up (10 min)</strong>
                      <span>Cat-Cow, World's Greatest Stretch, Band Pull-Aparts</span>
                    </div>
                    <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                      <strong className="block text-[#FF6A00] mb-1 uppercase">Main Working Sets</strong>
                      <span>DB Bulgarian Split Squats 4x10, DB Incline Bench Press 4x10</span>
                    </div>
                    <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                      <strong className="block text-[#FF6A00] mb-1 uppercase">Core & Finisher</strong>
                      <span>Hanging/Lying Leg Raises 3x15, Farmer Walk 3x60s</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      alert(`Routine assigned to ${selectedClientForPrescription.name}!`);
                      setSelectedClientForPrescription(null);
                    }}
                    className="px-4 py-2 bg-[#FF6A00] hover:bg-[#e05d00] text-white font-black text-xs uppercase tracking-wider rounded-lg"
                  >
                    Save & Push to Client App
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: PARTNER EARNINGS & PAYOUT (URBAN COMPANY MODEL)   */}
        {/* ======================================================== */}
        {activeTab === 'earnings' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border-2 border-black p-5 shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                  Today's Earnings
                </span>
                <div className="font-editorial text-4xl font-black text-black mt-1">
                  ₹3,200
                </div>
                <p className="text-xs text-emerald-700 font-bold mt-1">
                  2 Home Sessions + ₹200 Fuel
                </p>
              </div>

              <div className="bg-white rounded-2xl border-2 border-black p-5 shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                  This Month (Sep 2026)
                </span>
                <div className="font-editorial text-4xl font-black text-black mt-1">
                  ₹{trainerEarnings.thisMonth.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-emerald-700 font-bold mt-1">
                  {trainerEarnings.sessionsCompleted} Sessions Delivered
                </p>
              </div>

              <div className="bg-white rounded-2xl border-2 border-black p-5 shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                  Pending Payout
                </span>
                <div className="font-editorial text-4xl font-black text-[#FF6A00] mt-1">
                  ₹{trainerEarnings.pendingPayout.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-neutral-500 font-medium mt-1">
                  Direct transfer every Monday
                </p>
              </div>

              <div className="bg-white rounded-2xl border-2 border-black p-5 shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                  Partner Tier & Split
                </span>
                <div className="font-editorial text-4xl font-black text-black mt-1">
                  75% Cut
                </div>
                <p className="text-xs text-amber-700 font-bold mt-1">
                  Elite Pro (+5% Tier Bonus)
                </p>
              </div>
            </div>

            {/* Payout Actions & Bank Account */}
            <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                <div>
                  <h3 className="font-editorial text-xl font-black uppercase text-black">
                    Direct Bank Account & Instant Payout
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Linked to HDFC Bank (A/C: ****4102 · IFSC: HDFC0000128)
                  </p>
                </div>
                <button
                  onClick={() => setIsPayoutModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider transition active:scale-95 shadow-sm"
                >
                  Withdraw ₹{trainerEarnings.pendingPayout.toLocaleString('en-IN')} Instantly
                </button>
              </div>

              {/* Earnings Breakdown */}
              <div className="space-y-2 text-xs">
                <h4 className="font-black uppercase text-neutral-400 text-[10px]">Recent Direct Transfers</h4>
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex justify-between items-center">
                  <div>
                    <strong className="text-black font-black block">Weekly Payout #PAY-9902</strong>
                    <span className="text-neutral-500 text-[11px]">Sep 18, 2026 · HDFC Bank Transfer</span>
                  </div>
                  <span className="font-black text-black text-sm">₹22,500 (Cleared)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex justify-between items-center">
                  <div>
                    <strong className="text-black font-black block">Weekly Payout #PAY-9844</strong>
                    <span className="text-neutral-500 text-[11px]">Sep 11, 2026 · HDFC Bank Transfer</span>
                  </div>
                  <span className="font-black text-black text-sm">₹24,750 (Cleared)</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: AVAILABILITY & BLACKOUT SLOTS                     */}
        {/* ======================================================== */}
        {activeTab === 'availability' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-2xl font-black uppercase text-black">
                    Doorstep Operating Slots & Availability
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Set your preferred morning and evening travel windows across Mumbai suburbs.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { time: '06:00 AM - 07:00 AM', status: 'available', label: 'Early Morning Bandra' },
                  { time: '07:15 AM - 08:15 AM', status: 'booked', label: 'Rahul Verma (Booked)' },
                  { time: '08:30 AM - 09:30 AM', status: 'available', label: 'Khar West Slot' },
                  { time: '05:00 PM - 06:00 PM', status: 'available', label: 'Evening Shift Start' },
                  { time: '06:30 PM - 07:30 PM', status: 'booked', label: 'Priya Patel (Booked)' },
                  { time: '08:00 PM - 09:00 PM', status: 'blackout', label: 'Commute / Rest Block' },
                ].map((slot, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border-2 flex items-center justify-between text-xs ${
                      slot.status === 'booked'
                        ? 'bg-neutral-50 border-neutral-300'
                        : slot.status === 'blackout'
                        ? 'bg-neutral-100 border-neutral-200 text-neutral-400'
                        : 'bg-emerald-50/50 border-emerald-400'
                    }`}
                  >
                    <div>
                      <strong className="block text-black font-black">{slot.time}</strong>
                      <span className="text-[11px] text-neutral-500">{slot.label}</span>
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        slot.status === 'booked'
                          ? 'bg-black text-white'
                          : slot.status === 'blackout'
                          ? 'bg-neutral-200 text-neutral-700'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {slot.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Instant Payout Modal Simulation */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border-2 border-black max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-2xl font-black uppercase text-black">
                Instant Partner Payout
              </h3>
              <button
                onClick={() => {
                  setIsPayoutModalOpen(false);
                  setPayoutSuccess(false);
                }}
                className="text-neutral-400 hover:text-black font-black text-sm"
              >
                ✕
              </button>
            </div>

            {!payoutSuccess ? (
              <>
                <p className="text-xs text-neutral-600">
                  Transfer your verified balance of <strong className="text-black font-black">₹{trainerEarnings.pendingPayout.toLocaleString('en-IN')}</strong> directly to your linked bank account via IMPS instant rails.
                </p>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1">
                  <p><strong>Bank:</strong> HDFC Bank Ltd</p>
                  <p><strong>Account:</strong> **** **** 4102</p>
                  <p><strong>IFSC:</strong> HDFC0000128</p>
                  <p><strong>Fee:</strong> ₹0 (Free for Elite Tier)</p>
                </div>
                <button
                  onClick={() => setPayoutSuccess(true)}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider transition active:scale-95 shadow-md"
                >
                  Confirm Instant Transfer (₹{trainerEarnings.pendingPayout.toLocaleString('en-IN')})
                </button>
              </>
            ) : (
              <div className="text-center py-4 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-editorial text-xl font-black uppercase text-black">
                  Transfer Successful!
                </h4>
                <p className="text-xs text-neutral-600">
                  ₹{trainerEarnings.pendingPayout.toLocaleString('en-IN')} has been sent to your HDFC account. Reference: IMPS/20260923/88219.
                </p>
                <button
                  onClick={() => {
                    setIsPayoutModalOpen(false);
                    setPayoutSuccess(false);
                  }}
                  className="px-6 py-2 rounded-xl bg-black text-white font-black text-xs uppercase tracking-wider"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
