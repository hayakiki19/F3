import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCT_RECOMMENDATIONS } from '../../data/mockData';
import {
  Zap,
  Users,
  CreditCard,
  ShoppingBag,
  Star,
  ShieldCheck,
  Dumbbell,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  Flame,
  Award,
  ChevronRight,
  HeartPulse,
  Activity,
  UserCheck,
  Check,
  SlidersHorizontal,
  Search,
} from 'lucide-react';

export const MobileAppHomeView: React.FC = () => {
  const {
    trainers,
    plans,
    openBookingModal,
    openTrainerModal,
    openCheckoutModal,
    loginAsClient,
    loginAsTrainer,
    loginAsAdmin,
    user,
    currentView,
    setCurrentView,
    navigateToPage,
    setActiveClientTab,
  } = useApp();

  // State for Service and Product category filtering
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<'all' | 'strength' | 'fat-loss' | 'mobility' | 'boxing'>('all');
  const [selectedProductCategory, setSelectedProductCategory] = useState<'all' | 'protein' | 'creatine' | 'hydration' | 'vitamins'>('all');
  const [trainerSpecialtyFilter, setTrainerSpecialtyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [productToast, setProductToast] = useState<string | null>(null);

  const handleProductOrder = (productName: string, price: number) => {
    setProductToast(`Order reserved for "${productName}" (₹${price.toLocaleString('en-IN')})! Coach will deliver during your next home session.`);
    setTimeout(() => {
      setProductToast(null);
    }, 4000);
  };

  // Filter coaches
  const filteredTrainers = trainers.filter((t) => {
    if (trainerSpecialtyFilter !== 'all') {
      const match = t.specializations.some((s: string) => s.toLowerCase().includes(trainerSpecialtyFilter.toLowerCase()));
      if (!match) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.specializations.some((s: string) => s.toLowerCase().includes(q)) ||
        t.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Services Catalog for Mobile
  const servicesList = [
    {
      id: 'srv-1',
      title: '1-on-1 Hypertrophy & Muscle Gain',
      category: 'strength',
      duration: '60 Min',
      level: 'All Levels',
      tag: 'Most Popular',
      desc: 'Coach brings cast-iron dumbbells, adjustable bench & kettlebells to your flat. Strict biomechanics coaching.',
      target: 'Chest, Back, Arms & Legs',
      accentColor: 'border-orange-500 bg-orange-500/10 text-orange-500',
    },
    {
      id: 'srv-2',
      title: 'High-Calorie Fat Loss & Conditioning',
      category: 'fat-loss',
      duration: '50 Min',
      level: 'Beginner to Advanced',
      tag: 'High Burn',
      desc: 'Tabata & explosive metabolic conditioning designed for living rooms. Burns 400-650 kcal per session.',
      target: 'Full Body & Core',
      accentColor: 'border-red-500 bg-red-500/10 text-red-500',
    },
    {
      id: 'srv-3',
      title: 'Spinal Decompression & Posture Rehab',
      category: 'mobility',
      duration: '60 Min',
      level: 'Restorative',
      tag: 'Desk Workers',
      desc: 'Targeted myofascial release, hip opening & thoracic mobility to eliminate lower back & neck stiffness.',
      target: 'Spine, Hips & Shoulders',
      accentColor: 'border-emerald-500 bg-emerald-500/10 text-emerald-500',
    },
    {
      id: 'srv-4',
      title: 'Combat Boxing & Footwork Training',
      category: 'boxing',
      duration: '55 Min',
      level: 'Intermediate',
      tag: 'Stamina & Agility',
      desc: 'Focus mitt pad work, combination drills & rotational power. Gloves and wraps sanitized & provided.',
      target: 'Speed, Reflexes & Core',
      accentColor: 'border-sky-500 bg-sky-500/10 text-sky-500',
    },
  ];

  const filteredServices = servicesList.filter((s) => {
    if (selectedServiceCategory === 'all') return true;
    return s.category === selectedServiceCategory;
  });

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen pb-24 selection:bg-[#FF6A00] selection:text-white">

      {/* 1. Mobile App Top Status Bar */}
      <div className="sticky top-0 z-30 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-neutral-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF6A00] flex items-center justify-center font-black text-black text-base shadow-sm">
              FP
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black tracking-wider uppercase text-white">
                  FITNESS PRO APP
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[10px] text-neutral-400 font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#FF6A00]" />
                <span>Doorstep Service · 45m Dispatch</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openBookingModal(undefined, 'Trial Session')}
            className="bg-[#FF6A00] hover:bg-[#e05d00] text-white px-3 py-1.5 rounded text-[11px] font-black uppercase tracking-wider transition active:scale-95 shadow-xs"
          >
            Trial ₹499
          </button>
        </div>

        {/* Search & Filter Trigger */}
        <div className="mt-2.5 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trainers, services, supplements..."
            className="w-full bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 rounded-lg pl-9 pr-4 py-2 text-xs font-medium focus:outline-hidden focus:border-[#FF6A00] transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2. Quick Demo Persona Banner: Explains Signed-in App Dashboards */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-[#FF6A00]/10 border-b border-neutral-800 px-4 py-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6A00] flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>SWITCH SIGNED-IN APP ROLES</span>
          </span>
          <span className="text-[10px] font-medium text-neutral-400">1-Tap Switch</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          <button
            type="button"
            onClick={() => {
              loginAsClient('rahul');
              setCurrentView('client-app');
              setActiveClientTab('dashboard');
            }}
            className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 p-1.5 rounded text-center transition active:scale-95"
          >
            <p className="text-[10px] font-black text-white truncate">Rahul</p>
            <p className="text-[9px] text-[#FF6A00] font-bold">Client (Plan)</p>
          </button>
          <button
            type="button"
            onClick={() => {
              loginAsClient('anita');
              setCurrentView('client-app');
              setActiveClientTab('dashboard');
            }}
            className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 p-1.5 rounded text-center transition active:scale-95"
          >
            <p className="text-[10px] font-black text-white truncate">Anita</p>
            <p className="text-[9px] text-[#8DD8FF] font-bold">New Client</p>
          </button>
          <button
            type="button"
            onClick={() => {
              loginAsTrainer();
              setCurrentView('trainer-dashboard');
            }}
            className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 p-1.5 rounded text-center transition active:scale-95"
          >
            <p className="text-[10px] font-black text-white truncate">Arjun</p>
            <p className="text-[9px] text-emerald-400 font-bold">Trainer View</p>
          </button>
          <button
            type="button"
            onClick={() => {
              loginAsAdmin();
              setCurrentView('admin-dashboard');
            }}
            className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 p-1.5 rounded text-center transition active:scale-95"
          >
            <p className="text-[10px] font-black text-white truncate">Admin</p>
            <p className="text-[9px] text-amber-400 font-bold">Director HQ</p>
          </button>
        </div>
      </div>

      {/* 3. Hero Mobile App Card */}
      <div className="p-4 space-y-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 to-black border border-neutral-800 p-5 shadow-xl">
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#FF6A00]/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 bg-[#FF6A00]/15 border border-[#FF6A00]/30 px-2.5 py-1 rounded-full">
              <Flame className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6A00]">
                DOORSTEP HOME TRAINING
              </span>
            </div>

            <h1 className="text-2xl font-black uppercase tracking-tight text-white leading-tight">
              A CERTIFIED COACH AT YOUR DOORSTEP.
            </h1>

            <p className="text-xs text-neutral-300 leading-relaxed">
              No traffic. No crowded gyms. Your certified personal trainer arrives at your home with dumbbells, kettlebells, mats & custom workout plan.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => openBookingModal(undefined, 'Trial Session')}
                className="w-full bg-[#FF6A00] hover:bg-[#e05d00] text-white py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition active:scale-98 shadow-lg shadow-[#FF6A00]/20 min-h-[48px]"
              >
                <span>BOOK 1-ON-1 TRIAL — ₹499 ONLY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 px-1 pt-1">
                <span className="flex items-center gap-1 text-white">
                  <Star className="w-3.5 h-3.5 fill-[#FF6A00] text-[#FF6A00]" /> 4.95 Rating (840+ sessions)
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Refund Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Instant Action Phone Grid (Routes directly to Dedicated Pages) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={() => navigateToPage('trainers')}
            className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 p-3.5 rounded-xl text-left transition active:scale-95 flex flex-col justify-between min-h-[96px] group"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-[#FF6A00] flex items-center justify-center group-hover:scale-110 transition">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-black uppercase text-white flex items-center justify-between">
                <span>Coaches</span>
                <span className="text-[10px] text-[#FF6A00]">View Page →</span>
              </p>
              <p className="text-[10px] text-neutral-400 font-medium">ACE & CSCS Doorstep Pros</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigateToPage('how-it-works')}
            className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 p-3.5 rounded-xl text-left transition active:scale-95 flex flex-col justify-between min-h-[96px] group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-[#8DD8FF] flex items-center justify-center group-hover:scale-110 transition">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-black uppercase text-white flex items-center justify-between">
                <span>How It Works</span>
                <span className="text-[10px] text-[#8DD8FF]">View Page →</span>
              </p>
              <p className="text-[10px] text-neutral-400 font-medium">6x6 ft Living Room Setup</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigateToPage('plans')}
            className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 p-3.5 rounded-xl text-left transition active:scale-95 flex flex-col justify-between min-h-[96px] group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-black uppercase text-white flex items-center justify-between">
                <span>Plans & Pricing</span>
                <span className="text-[10px] text-emerald-400">View Page →</span>
              </p>
              <p className="text-[10px] text-neutral-400 font-medium">Starter, Transform, Pro Packs</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigateToPage('supplements')}
            className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 p-3.5 rounded-xl text-left transition active:scale-95 flex flex-col justify-between min-h-[96px] group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-black uppercase text-white flex items-center justify-between">
                <span>Supplements</span>
                <span className="text-[10px] text-amber-400">View Page →</span>
              </p>
              <p className="text-[10px] text-neutral-400 font-medium">Whey, Creatine & Hydration</p>
            </div>
          </button>
        </div>

        {/* 5. EXPLORE SERVICES SECTION */}
        <section id="mobile-services" className="pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6A00] block">
                TRAINING PROGRAMS
              </span>
              <h2 className="text-lg font-black uppercase text-white">
                EXPLORE IN-HOME SERVICES
              </h2>
            </div>
            <span className="text-[10px] font-bold text-neutral-400 bg-neutral-900 px-2 py-1 rounded">
              All Equipment Brought
            </span>
          </div>

          {/* Service Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'strength', label: 'Strength' },
              { id: 'fat-loss', label: 'Fat Loss' },
              { id: 'mobility', label: 'Mobility & Rehab' },
              { id: 'boxing', label: 'Combat Boxing' },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setSelectedServiceCategory(chip.id as any)}
                className={`min-h-[34px] px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap transition active:scale-95 ${
                  selectedServiceCategory === chip.id
                    ? 'bg-[#FF6A00] text-white font-black'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Service Cards List */}
          <div className="space-y-2.5">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 space-y-2 hover:border-neutral-700 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${service.accentColor}`}>
                      {service.tag}
                    </span>
                    <h3 className="text-sm font-black text-white uppercase mt-1">
                      {service.title}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-black text-[#FF6A00] block">{service.duration}</span>
                    <span className="text-[10px] text-neutral-400">{service.level}</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {service.desc}
                </p>

                <div className="pt-1 flex items-center justify-between border-t border-neutral-800/80">
                  <span className="text-[10px] text-neutral-400 font-medium">
                    Target: <strong className="text-white">{service.target}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => openBookingModal(undefined, service.title)}
                    className="text-xs font-black uppercase text-[#FF6A00] hover:text-[#ff8533] flex items-center gap-1 transition active:scale-95 py-1 px-2 -mr-2"
                  >
                    <span>Book Session</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. VERIFIED COACHES SECTION */}
        <section id="mobile-trainers" className="pt-6 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6A00] block">
                VERIFIED COACHES
              </span>
              <h2 className="text-lg font-black uppercase text-white">
                MEET YOUR IN-HOME TRAINERS
              </h2>
            </div>
            <span className="text-[10px] font-bold text-neutral-400">
              {filteredTrainers.length} Available
            </span>
          </div>

          {/* Specialty Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'all', label: 'All Trainers' },
              { id: 'Strength', label: 'Strength' },
              { id: 'HIIT', label: 'HIIT & Fat Loss' },
              { id: 'Rehabilitation', label: 'Rehab & Mobility' },
              { id: 'Calisthenics', label: 'Calisthenics' },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setTrainerSpecialtyFilter(chip.id)}
                className={`min-h-[34px] px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap transition active:scale-95 ${
                  trainerSpecialtyFilter === chip.id
                    ? 'bg-white text-black font-black'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Trainers Cards List */}
          <div className="space-y-3">
            {filteredTrainers.map((coach) => (
              <div
                key={coach.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 space-y-3 hover:border-neutral-700 transition"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={coach.photo}
                    alt={coach.name}
                    className="w-16 h-16 rounded-lg object-cover border border-neutral-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black uppercase text-white truncate">
                        {coach.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-white bg-neutral-800 px-1.5 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-[#FF6A00] text-[#FF6A00]" />
                        <span>{coach.rating}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#8DD8FF] font-bold mt-0.5 truncate">
                      {coach.specializations.join(' · ')}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-1">
                      <span>{coach.experience}</span>
                      <span>•</span>
                      <span>{coach.reviewsCount}+ reviews</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold">Active in Metro</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                  {coach.about}
                </p>

                {/* Price & Action Buttons */}
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-bold block">Rate / Session</span>
                    <span className="text-sm font-black text-white">
                      ₹{coach.startingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openTrainerModal(coach)}
                      className="min-h-[40px] px-3 py-1.5 rounded-lg border border-neutral-700 text-neutral-300 hover:text-white text-xs font-bold uppercase transition active:scale-95"
                    >
                      Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => openBookingModal(coach.id, 'Trial Session')}
                      className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs font-black uppercase tracking-wider transition active:scale-95 shadow-sm"
                    >
                      Book Trial (₹499)
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. TRAINING PLANS SECTION */}
        <section id="mobile-plans" className="pt-6 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6A00] block">
                MONTHLY COMMITMENT
              </span>
              <h2 className="text-lg font-black uppercase text-white">
                PERSONAL TRAINING PLANS
              </h2>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
              ₹0 Equipment Fee
            </span>
          </div>

          <div className="space-y-3">
            {plans.map((plan) => {
              const isPopular = plan.isPopular;
              const isTrial = plan.id === 'plan-trial';
              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-4 border transition relative ${
                    isPopular
                      ? 'bg-neutral-900 border-[#FF6A00] shadow-lg shadow-[#FF6A00]/10'
                      : 'bg-neutral-900 border-neutral-800'
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-2.5 right-4 bg-[#FF6A00] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-xs">
                      MOST POPULAR
                    </span>
                  )}

                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-black uppercase tracking-wide text-white">
                        {plan.name} PLAN
                      </h3>
                      <p className="text-[11px] text-neutral-400 font-medium mt-0.5">
                        {plan.tagline}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-neutral-400 bg-neutral-800 px-2 py-1 rounded shrink-0">
                      {plan.sessionsCount} {plan.sessionsCount === 1 ? 'Session' : 'Sessions'}
                    </span>
                  </div>

                  {/* Pricing Row */}
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-xs text-neutral-500 line-through">
                        ₹{plan.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="text-[11px] text-neutral-400 font-medium ml-auto">
                      {plan.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="mt-3 space-y-1.5 border-t border-neutral-800/80 pt-3">
                    {plan.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-[#FF6A00] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (isTrial) {
                        openBookingModal(undefined, 'Trial Session');
                      } else {
                        openCheckoutModal(plan);
                      }
                    }}
                    className={`w-full mt-4 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider transition active:scale-98 min-h-[46px] flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-[#FF6A00] hover:bg-[#e05d00] text-white shadow-md'
                        : 'bg-white hover:bg-neutral-200 text-black'
                    }`}
                  >
                    <span>{isTrial ? 'BOOK TRIAL SESSION — ₹499' : `SELECT ${plan.name} PLAN`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. SUPPLEMENTS & PRODUCTS STORE */}
        <section id="mobile-supplements" className="pt-6 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6A00] block">
                PERFORMANCE NUTRITION
              </span>
              <h2 className="text-lg font-black uppercase text-white">
                CURATED SUPPLEMENTS
              </h2>
            </div>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/30">
              Lab-Tested
            </span>
          </div>

          <p className="text-xs text-neutral-400">
            Certified authentic sports nutrition delivered directly to your doorstep by your trainer.
          </p>

          {/* Toast Alert */}
          {productToast && (
            <div className="p-3 bg-neutral-900 text-white border-l-4 border-[#FF6A00] rounded-r-lg flex items-center justify-between animate-in fade-in duration-200 text-xs font-bold">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF6A00] shrink-0" />
                <span className="leading-tight">{productToast}</span>
              </div>
              <button
                onClick={() => setProductToast(null)}
                className="text-neutral-400 hover:text-white text-[11px] underline ml-2 shrink-0"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRODUCT_RECOMMENDATIONS.map((product) => (
              <div
                key={product.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 flex flex-col justify-between space-y-3 hover:border-neutral-700 transition"
              >
                <div className="flex gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover border border-neutral-700 shrink-0 bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-black uppercase text-[#8DD8FF] block truncate">
                      {product.category}
                    </span>
                    <h3 className="text-xs font-black uppercase text-white line-clamp-2 mt-0.5">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold mt-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-neutral-500">• 100% Genuine</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-neutral-400 uppercase font-bold block">App Price</span>
                    <span className="text-sm font-black text-white">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleProductOrder(product.name, product.price)}
                    className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-[#FF6A00] hover:text-white text-neutral-200 text-xs font-black uppercase tracking-wider transition active:scale-95 flex items-center gap-1.5 border border-neutral-700 hover:border-[#FF6A00]"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. WHAT WE BRING TO YOUR DOORSTEP (EQUIPMENT CAROUSEL) */}
        <section className="pt-6 space-y-3">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FF6A00] rounded-full"></span>
              <h3 className="text-xs font-black uppercase tracking-widest text-white">
                EQUIPMENT WE BRING TO YOUR LIVING ROOM
              </h3>
            </div>
            <p className="text-xs text-neutral-300">
              You do not need to purchase any gear. Our trainers arrive in our service van with commercial-grade workout gear:
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-[#FF6A00] shrink-0" />
                <span className="text-xs font-bold text-neutral-200">5kg - 25kg Dumbbells</span>
              </div>
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FF6A00] shrink-0" />
                <span className="text-xs font-bold text-neutral-200">Kettlebells & Mats</span>
              </div>
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#FF6A00] shrink-0" />
                <span className="text-xs font-bold text-neutral-200">Suspension Straps</span>
              </div>
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-[#FF6A00] shrink-0" />
                <span className="text-xs font-bold text-neutral-200">Heart Rate Monitors</span>
              </div>
            </div>
          </div>
        </section>

        {/* 10. BOTTOM TRIAL CALL-TO-ACTION CARD */}
        <div className="pt-4 pb-2">
          <div className="bg-gradient-to-r from-[#FF6A00] to-[#e05d00] rounded-2xl p-5 text-white space-y-3 shadow-xl">
            <span className="text-[10px] font-black uppercase tracking-widest bg-black/20 px-2 py-0.5 rounded">
              LIMITED SLOTS TODAY
            </span>
            <h3 className="text-xl font-black uppercase leading-tight">
              READY FOR YOUR FIRST IN-HOME SESSION?
            </h3>
            <p className="text-xs text-white/90">
              Schedule your full 60-minute trial session with posture screen and customized goal roadmap.
            </p>
            <button
              type="button"
              onClick={() => openBookingModal(undefined, 'Trial Session')}
              className="w-full bg-black text-white hover:bg-neutral-900 py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition active:scale-98 shadow-md min-h-[46px]"
            >
              <span>CLAIM ₹499 TRIAL SESSION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
