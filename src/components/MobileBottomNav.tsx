import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Users,
  CreditCard,
  Zap,
  User,
  X,
  CheckCircle,
  LayoutDashboard,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  LogOut,
  Bell,
  Home,
  Layers,
  Dumbbell,
  Clock,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Navigation,
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    activePublicPage,
    navigateToPage,
    activeClientTab,
    setActiveClientTab,
    user,
    activeRole,
    loginAsClient,
    loginAsTrainer,
    loginAsAdmin,
    logout,
    openBookingModal,
    openAuthModal,
    openTrainerChat,
    unreadNotificationsCount,
    setIsNotificationsOpen,
  } = useApp();

  const [isRoleSheetOpen, setIsRoleSheetOpen] = useState(false);

  const scrollTo = (id: string) => {
    if (currentView !== 'public') {
      setCurrentView('public');
      setTimeout(() => {
        const el = document.getElementById(`mobile-${id}`) || document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(`mobile-${id}`) || document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Fixed Ergonomic Bottom Tab Bar (iOS / Android thumb-zone friendly) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-300 shadow-[0_-4px_24px_rgba(0,0,0,0.09)] pb-[env(safe-area-inset-bottom,0px)]"
      >
        <div className="grid grid-cols-5 items-stretch h-16">
          {currentView === 'client-app' ? (
            <>
              {/* Client App Tab 1: Home */}
              <button
                type="button"
                onClick={() => setActiveClientTab('dashboard')}
                className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-all active:scale-95 ${
                  activeClientTab === 'dashboard'
                    ? 'text-[#FF6A00] font-black'
                    : 'text-neutral-500 hover:text-black'
                }`}
                aria-label="Client Dashboard"
              >
                <Home className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-black">
                  Home
                </span>
              </button>

              {/* Client App Tab 2: Schedule */}
              <button
                type="button"
                onClick={() => setActiveClientTab('schedule')}
                className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-all active:scale-95 ${
                  activeClientTab === 'schedule'
                    ? 'text-[#FF6A00] font-black'
                    : 'text-neutral-500 hover:text-black'
                }`}
                aria-label="Client Schedule"
              >
                <Calendar className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-black">
                  Schedule
                </span>
              </button>

              {/* Client App Tab 3: Plan */}
              <button
                type="button"
                onClick={() => setActiveClientTab('plan')}
                className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-all active:scale-95 ${
                  activeClientTab === 'plan'
                    ? 'text-[#FF6A00] font-black'
                    : 'text-neutral-500 hover:text-black'
                }`}
                aria-label="Active Membership Plan"
              >
                <Layers className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-black">
                  Plan
                </span>
              </button>

              {/* Client App Tab 4: Workout */}
              <button
                type="button"
                onClick={() => setActiveClientTab('workout')}
                className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-all active:scale-95 ${
                  activeClientTab === 'workout'
                    ? 'text-[#FF6A00] font-black'
                    : 'text-neutral-500 hover:text-black'
                }`}
                aria-label="Log Workout"
              >
                <Dumbbell className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-black">
                  Workout
                </span>
              </button>

              {/* Client App Tab 5: Profile / Switcher */}
              <button
                type="button"
                onClick={() => setIsRoleSheetOpen(true)}
                className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-all active:scale-95 relative ${
                  activeClientTab === 'profile'
                    ? 'text-[#FF6A00]'
                    : 'text-neutral-700 hover:text-black'
                }`}
                aria-label="Client Profile and Workspace Menu"
              >
                {user ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover border border-neutral-400"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
                <span className="text-[10px] font-black uppercase tracking-tight mt-0.5">
                  Menu
                </span>
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-3 w-2 h-2 bg-[#FF6A00] rounded-full ring-2 ring-white"></span>
                )}
              </button>
            </>
          ) : currentView === 'trainer-dashboard' ? (
            <>
              {/* Trainer Tab 1: Live Dispatch */}
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  // If on trainer dashboard, trigger live dispatch
                  window.dispatchEvent(new CustomEvent('trainer-tab-change', { detail: 'live-dispatch' }));
                }}
                className="flex flex-col items-center justify-center min-h-[44px] py-1 text-[#FF6A00] transition-all active:scale-95 font-black"
                aria-label="Live Dispatch"
              >
                <Navigation className="w-5 h-5 text-[#FF6A00]" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-black">
                  Dispatch
                </span>
              </button>

              {/* Trainer Tab 2: Today's Stops */}
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('trainer-tab-change', { detail: 'itinerary' }));
                }}
                className="flex flex-col items-center justify-center min-h-[44px] py-1 text-neutral-500 hover:text-black transition-all active:scale-95"
                aria-label="Today's Stops"
              >
                <Calendar className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-bold">
                  Stops
                </span>
              </button>

              {/* Trainer Tab 3: Gear Kit */}
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('trainer-tab-change', { detail: 'gear-checklist' }));
                }}
                className="flex flex-col items-center justify-center min-h-[44px] py-1 text-neutral-500 hover:text-black transition-all active:scale-95"
                aria-label="Gear Kit"
              >
                <Dumbbell className="w-5 h-5 text-neutral-600" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-bold">
                  Gear Kit
                </span>
              </button>

              {/* Trainer Tab 4: Earnings */}
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('trainer-tab-change', { detail: 'earnings' }));
                }}
                className="flex flex-col items-center justify-center min-h-[44px] py-1 text-neutral-500 hover:text-black transition-all active:scale-95"
                aria-label="Trainer Earnings"
              >
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-bold">
                  Payouts
                </span>
              </button>

              {/* Trainer Tab 5: Persona Switcher */}
              <button
                type="button"
                onClick={() => setIsRoleSheetOpen(true)}
                className="flex flex-col items-center justify-center min-h-[44px] py-1 text-neutral-700 hover:text-black transition-all active:scale-95 relative"
                aria-label="Switch Persona"
              >
                <User className="w-5 h-5 text-black" />
                <span className="text-[10px] font-black uppercase tracking-tight mt-0.5">
                  Switch
                </span>
              </button>
            </>
          ) : currentView === 'admin-dashboard' ? (
            <>
              {/* Admin Tab 1: Overview */}
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex flex-col items-center justify-center min-h-[44px] py-1 text-[#FF6A00] transition-all active:scale-95 font-black"
                aria-label="Admin Overview"
              >
                <TrendingUp className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-black">
                  Overview
                </span>
              </button>

              {/* Admin Tab 2: Dispatch / Bookings */}
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
                className="flex flex-col items-center justify-center min-h-[44px] py-1 text-neutral-500 hover:text-black transition-all active:scale-95"
                aria-label="Bookings Dispatch"
              >
                <Calendar className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-bold">
                  Bookings
                </span>
              </button>

              {/* Admin Tab 3: Clients */}
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                className="flex flex-col items-center justify-center min-h-[44px] py-1 text-neutral-500 hover:text-black transition-all active:scale-95"
                aria-label="Client Memberships"
              >
                <Users className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-bold">
                  Clients
                </span>
              </button>

              {/* Admin Tab 4: Public View */}
              <button
                type="button"
                onClick={() => setCurrentView('public')}
                className="flex flex-col items-center justify-center min-h-[44px] py-1 text-neutral-500 hover:text-[#FF6A00] transition-all active:scale-95"
                aria-label="Home Website"
              >
                <Compass className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-bold">
                  Store
                </span>
              </button>

              {/* Admin Tab 5: Persona Switcher */}
              <button
                type="button"
                onClick={() => setIsRoleSheetOpen(true)}
                className="flex flex-col items-center justify-center min-h-[44px] py-1 text-neutral-700 hover:text-black transition-all active:scale-95 relative"
                aria-label="Switch Persona"
              >
                <ShieldCheck className="w-5 h-5 text-black" />
                <span className="text-[10px] font-black uppercase tracking-tight mt-0.5">
                  Switch
                </span>
              </button>
            </>
          ) : (
            <>
              {/* Tab 1: Explore / Home */}
              <button
                type="button"
                onClick={() => navigateToPage('home')}
                className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-all active:scale-95 ${
                  currentView === 'public' && activePublicPage === 'home'
                    ? 'text-[#FF6A00] font-black'
                    : 'text-neutral-500 hover:text-black'
                }`}
                aria-label="Home and Explore"
              >
                <Compass className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-bold">
                  Home
                </span>
              </button>

              {/* Tab 2: Coaches */}
              <button
                type="button"
                onClick={() => navigateToPage('trainers')}
                className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-all active:scale-95 ${
                  currentView === 'public' && activePublicPage === 'trainers'
                    ? 'text-[#FF6A00] font-black'
                    : 'text-neutral-500 hover:text-black'
                }`}
                aria-label="Browse Coaches"
              >
                <Users className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-bold">
                  Coaches
                </span>
              </button>

              {/* Tab 3: Plans */}
              <button
                type="button"
                onClick={() => navigateToPage('plans')}
                className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-all active:scale-95 ${
                  currentView === 'public' && activePublicPage === 'plans'
                    ? 'text-[#FF6A00] font-black'
                    : 'text-neutral-500 hover:text-black'
                }`}
                aria-label="Membership Plans"
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-bold">
                  Plans
                </span>
              </button>

              {/* Tab 4: Supplements */}
              <button
                type="button"
                onClick={() => navigateToPage('supplements')}
                className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-all active:scale-95 relative ${
                  currentView === 'public' && activePublicPage === 'supplements'
                    ? 'text-[#FF6A00] font-black'
                    : 'text-neutral-500 hover:text-[#FF6A00]'
                }`}
                aria-label="Supplements and Nutrition"
              >
                <Zap className="w-5 h-5 text-[#FF6A00]" />
                <span className="text-[10px] uppercase tracking-tight mt-0.5 font-bold">
                  Nutrition
                </span>
              </button>

              {/* Tab 5: Account / Workspace / Role Switcher */}
              <button
                type="button"
                onClick={() => setIsRoleSheetOpen(true)}
                className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-all active:scale-95 relative ${
                  currentView !== 'public'
                    ? 'text-[#FF6A00]'
                    : 'text-neutral-700 hover:text-black'
                }`}
                aria-label="My Account and Role Switcher"
              >
                {user ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover border border-neutral-400"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
                <span className="text-[10px] font-black uppercase tracking-tight mt-0.5">
                  Account
                </span>
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-3 w-2 h-2 bg-[#FF6A00] rounded-full ring-2 ring-white"></span>
                )}
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Role Switcher & Account Bottom Sheet */}
      {isRoleSheetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Account and View Switcher"
          className="lg:hidden fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end justify-center animate-in fade-in duration-150"
          onClick={() => setIsRoleSheetOpen(false)}
        >
          <div
            className="bg-white border-t-2 border-black w-full rounded-t-3xl max-h-[85vh] overflow-y-auto overscroll-contain shadow-2xl p-5 pb-8 animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab handle indicator */}
            <div
              className="w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mb-4 cursor-pointer"
              onClick={() => setIsRoleSheetOpen(false)}
            />

            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6A00]">
                  MOBILE PORTAL NAVIGATOR
                </span>
                <h3 className="font-editorial text-xl font-black uppercase text-black">
                  Account & Workspaces
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsRoleSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:text-black transition"
                aria-label="Close sheet"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* User Profile Card or Sign In Prompt */}
            {user ? (
              <div className="mt-4 p-3.5 bg-neutral-50 border border-neutral-300 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-400"
                  />
                  <div>
                    <p className="text-xs font-black uppercase text-black">{user.name}</p>
                    <p className="text-[11px] text-neutral-500 truncate max-w-[180px]">{user.email}</p>
                    <p className="text-[10px] text-[#FF6A00] font-black mt-0.5">
                      {user.hasActivePlan
                        ? `${user.activePlan?.planName} Plan · ${user.activePlan?.sessionsRemaining} sessions left`
                        : 'No Active Plan'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsNotificationsOpen(true);
                    setIsRoleSheetOpen(false);
                  }}
                  className="relative p-2 bg-white border border-neutral-300 rounded hover:border-black transition"
                  aria-label="View notifications"
                >
                  <Bell className="w-4 h-4 text-neutral-700" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF6A00] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <div className="mt-4 p-4 bg-neutral-50 border border-neutral-300 text-center space-y-3">
                <p className="text-xs font-bold text-neutral-600">
                  Sign in or book your ₹499 in-home trial session to unlock personalized coaching.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRoleSheetOpen(false);
                      openAuthModal('login');
                    }}
                    className="flex-1 py-2.5 bg-white border border-neutral-300 hover:border-black text-xs font-black uppercase tracking-wider text-black transition"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRoleSheetOpen(false);
                      openAuthModal('signup');
                    }}
                    className="flex-1 py-2.5 bg-[#0A0A0A] hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition"
                  >
                    Join FP
                  </button>
                </div>
              </div>
            )}

            {/* Quick 1-Tap Persona & Portal Selectors */}
            <div className="mt-5 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block px-1">
                SWITCH DASHBOARD OR ROLE
              </span>

              {/* Option 1: Mobile App Home Page */}
              <button
                type="button"
                onClick={() => {
                  setCurrentView('public');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsRoleSheetOpen(false);
                }}
                className={`w-full p-3 flex items-center justify-between border-2 transition active:scale-98 ${
                  currentView === 'public'
                    ? 'border-black bg-neutral-100 font-black text-black'
                    : 'border-neutral-200 hover:border-black text-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-[#FF6A00]" />
                  <div className="text-left">
                    <p className="text-xs font-black uppercase">Home Page (Phone View)</p>
                    <p className="text-[11px] text-neutral-500">Coaches, ₹499 trial, plans & supplements</p>
                  </div>
                </div>
                {currentView === 'public' && <CheckCircle className="w-4 h-4 text-[#FF6A00]" />}
              </button>

              {/* Option 2: Client Workspace (Rahul) */}
              <button
                type="button"
                onClick={() => {
                  loginAsClient('rahul');
                  setCurrentView('client-app');
                  setActiveClientTab('dashboard');
                  setIsRoleSheetOpen(false);
                }}
                className={`w-full p-3 flex items-center justify-between border-2 transition active:scale-98 ${
                  currentView === 'client-app' && user?.id === 'client-rahul'
                    ? 'border-[#FF6A00] bg-[#FF6A00]/5 font-black text-black'
                    : 'border-neutral-200 hover:border-black text-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-5 h-5 text-[#FF6A00]" />
                  <div className="text-left">
                    <p className="text-xs font-black uppercase">Client (Rahul Verma)</p>
                    <p className="text-[11px] text-neutral-500">Active Transform Plan · 3 sessions left</p>
                  </div>
                </div>
                {currentView === 'client-app' && user?.id === 'client-rahul' && (
                  <CheckCircle className="w-4 h-4 text-[#FF6A00]" />
                )}
              </button>

              {/* Option 3: New Client (Anita) */}
              <button
                type="button"
                onClick={() => {
                  loginAsClient('anita');
                  setCurrentView('client-app');
                  setActiveClientTab('dashboard');
                  setIsRoleSheetOpen(false);
                }}
                className={`w-full p-3 flex items-center justify-between border-2 transition active:scale-98 ${
                  currentView === 'client-app' && user?.id === 'client-anita'
                    ? 'border-[#8DD8FF] bg-[#8DD8FF]/10 font-black text-black'
                    : 'border-neutral-200 hover:border-black text-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-sky-500" />
                  <div className="text-left">
                    <p className="text-xs font-black uppercase">New Client (Anita Roy)</p>
                    <p className="text-[11px] text-neutral-500">New client onboarding · No plan yet</p>
                  </div>
                </div>
                {currentView === 'client-app' && user?.id === 'client-anita' && (
                  <CheckCircle className="w-4 h-4 text-sky-600" />
                )}
              </button>

              {/* Option 4: Trainer Portal */}
              <button
                type="button"
                onClick={() => {
                  loginAsTrainer();
                  setCurrentView('trainer-dashboard');
                  setIsRoleSheetOpen(false);
                }}
                className={`w-full p-3 flex items-center justify-between border-2 transition active:scale-98 ${
                  currentView === 'trainer-dashboard'
                    ? 'border-[#FF6A00] bg-[#FF6A00]/5 font-black text-black'
                    : 'border-neutral-200 hover:border-black text-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#FF6A00]" />
                  <div className="text-left">
                    <p className="text-xs font-black uppercase">Trainer (Arjun Sharma)</p>
                    <p className="text-[11px] text-neutral-500">Client bookings, schedule & ledger</p>
                  </div>
                </div>
                {currentView === 'trainer-dashboard' && <CheckCircle className="w-4 h-4 text-[#FF6A00]" />}
              </button>

              {/* Option 5: Admin HQ Console */}
              <button
                type="button"
                onClick={() => {
                  loginAsAdmin();
                  setCurrentView('admin-dashboard');
                  setIsRoleSheetOpen(false);
                }}
                className={`w-full p-3 flex items-center justify-between border-2 transition active:scale-98 ${
                  currentView === 'admin-dashboard'
                    ? 'border-[#FF6A00] bg-[#FF6A00]/5 font-black text-black'
                    : 'border-neutral-200 hover:border-black text-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#FF6A00]" />
                  <div className="text-left">
                    <p className="text-xs font-black uppercase">Admin (Vikram Malhotra)</p>
                    <p className="text-[11px] text-neutral-500">Academy stats, bookings & trainers</p>
                  </div>
                </div>
                {currentView === 'admin-dashboard' && <CheckCircle className="w-4 h-4 text-[#FF6A00]" />}
              </button>
            </div>

            {/* High-Impact Primary CTA: Book Trial */}
            <div className="mt-5 pt-4 border-t border-neutral-200 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsRoleSheetOpen(false);
                  openBookingModal(undefined, 'Trial Session');
                }}
                className="w-full py-3.5 bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md min-h-[48px]"
              >
                <span>BOOK IN-HOME TRIAL — ₹499</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {user && (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsRoleSheetOpen(false);
                  }}
                  className="w-full py-2.5 text-neutral-500 hover:text-red-600 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out of Account</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
