import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Dumbbell,
  Menu,
  X,
  Bell,
  User,
  ShieldCheck,
  ChevronDown,
  LayoutDashboard,
  Calendar,
  LogOut,
  Sparkles,
  Home,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    user,
    activeRole,
    currentView,
    setCurrentView,
    setActiveClientTab,
    openBookingModal,
    openAuthModal,
    logout,
    switchRole,
    unreadNotificationsCount,
    setIsNotificationsOpen,
    loginAsClient,
    loginAsTrainer,
    loginAsAdmin,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'public') {
      setCurrentView('public');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      {/* Top desktop micro-bar for quick demo role switcher & announcement */}
      <div className="hidden sm:flex bg-[#0A0A0A] text-white text-xs px-4 py-1.5 flex-wrap items-center justify-between gap-2 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse"></span>
          <span className="font-medium tracking-wide">
            CERTIFIED PERSONAL TRAINERS AT YOUR DOORSTEP · METRO SERVICE ACTIVE
          </span>
        </div>

        {/* Quick Demo Persona Switcher (Desktop) */}
        <div className="relative flex items-center gap-2.5">
          <span className="text-neutral-400 hidden lg:inline text-[11px] uppercase tracking-wider font-bold">
            Demo Persona:
          </span>
          <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-700 rounded px-1.5 py-0.5">
            <button
              onClick={() => {
                setCurrentView('public');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-2 py-0.5 text-[11px] font-bold rounded transition flex items-center gap-1 ${
                currentView === 'public'
                  ? 'bg-white text-black font-black'
                  : 'text-neutral-300 hover:text-white'
              }`}
              title="Home Page for phone app / guest explorer"
            >
              <Home className="w-3 h-3 text-[#FF6A00]" />
              <span>Home Page (Phone App)</span>
            </button>
            <button
              onClick={() => {
                loginAsClient('rahul');
              }}
              className={`px-2 py-0.5 text-[11px] font-bold rounded transition ${
                currentView === 'client-app' && user?.id === 'client-rahul'
                  ? 'bg-[#FF6A00] text-white'
                  : 'text-neutral-300 hover:text-white'
              }`}
              title="Rahul Verma (Active Transform Plan, 3 sessions left)"
            >
              Client (Rahul)
            </button>
            <button
              onClick={() => {
                loginAsClient('anita');
              }}
              className={`px-2 py-0.5 text-[11px] font-bold rounded transition ${
                currentView === 'client-app' && user?.id === 'client-anita'
                  ? 'bg-[#8DD8FF] text-[#0A0A0A]'
                  : 'text-neutral-300 hover:text-white'
              }`}
              title="Anita Roy (New Client, No Plan yet)"
            >
              New Client (Anita)
            </button>
            <button
              onClick={() => {
                loginAsTrainer();
              }}
              className={`px-2 py-0.5 text-[11px] font-bold rounded transition ${
                currentView === 'trainer-dashboard' ? 'bg-white text-black' : 'text-neutral-300 hover:text-white'
              }`}
              title="Arjun Sharma (Trainer View)"
            >
              Trainer
            </button>
            <button
              onClick={() => {
                loginAsAdmin();
              }}
              className={`px-2 py-0.5 text-[11px] font-bold rounded transition ${
                currentView === 'admin-dashboard' ? 'bg-white text-black' : 'text-neutral-300 hover:text-white'
              }`}
              title="Admin Dashboard"
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Demo Persona Quick Strip (Sticky at top of phone for 1-tap testing) */}
      <div className="flex lg:hidden bg-[#0A0A0A] text-white px-2.5 py-1.5 items-center gap-1.5 border-b border-neutral-800 overflow-x-auto no-scrollbar scroll-smooth">
        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 whitespace-nowrap pl-0.5 shrink-0">
          Demo:
        </span>
        <button
          onClick={() => {
            setCurrentView('public');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`min-h-[34px] px-2.5 py-1 text-[11px] font-black uppercase rounded transition shrink-0 flex items-center gap-1 active:scale-95 ${
            currentView === 'public'
              ? 'bg-white text-black font-black ring-1 ring-white'
              : 'bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white'
          }`}
        >
          <Home className="w-3.5 h-3.5 text-[#FF6A00]" />
          <span>Home Page</span>
        </button>
        <button
          onClick={() => loginAsClient('rahul')}
          className={`min-h-[34px] px-2.5 py-1 text-[11px] font-black uppercase rounded transition shrink-0 active:scale-95 ${
            currentView === 'client-app' && user?.id === 'client-rahul'
              ? 'bg-[#FF6A00] text-white font-black shadow-xs ring-1 ring-[#FF6A00]'
              : 'bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white'
          }`}
        >
          Client (Rahul)
        </button>
        <button
          onClick={() => loginAsClient('anita')}
          className={`min-h-[34px] px-2.5 py-1 text-[11px] font-black uppercase rounded transition shrink-0 active:scale-95 ${
            currentView === 'client-app' && user?.id === 'client-anita'
              ? 'bg-[#8DD8FF] text-black font-black ring-1 ring-[#8DD8FF]'
              : 'bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white'
          }`}
        >
          New Client (Anita)
        </button>
        <button
          onClick={() => loginAsTrainer()}
          className={`min-h-[34px] px-2.5 py-1 text-[11px] font-black uppercase rounded transition shrink-0 active:scale-95 ${
            currentView === 'trainer-dashboard'
              ? 'bg-white text-black font-black ring-1 ring-white'
              : 'bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white'
          }`}
        >
          Trainer
        </button>
        <button
          onClick={() => loginAsAdmin()}
          className={`min-h-[34px] px-2.5 py-1 text-[11px] font-black uppercase rounded transition shrink-0 active:scale-95 ${
            currentView === 'admin-dashboard'
              ? 'bg-white text-black font-black ring-1 ring-white'
              : 'bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white'
          }`}
        >
          Admin
        </button>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setCurrentView('public')}
            className="flex items-center gap-2.5 sm:gap-3 group text-left min-h-[44px]"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#0A0A0A] text-white flex items-center justify-center font-black text-lg sm:text-xl tracking-tighter group-hover:bg-[#FF6A00] transition-colors shrink-0">
              FP
            </div>
            <div>
              <span className="font-editorial text-lg sm:text-2xl font-black tracking-tight text-[#0A0A0A] uppercase block leading-none">
                FITNESS PRO
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-bold text-neutral-500 uppercase block mt-0.5">
                ACADEMY
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-sm font-bold uppercase tracking-wider text-neutral-800 hover:text-[#FF6A00] transition"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('trainers')}
              className="text-sm font-bold uppercase tracking-wider text-neutral-800 hover:text-[#FF6A00] transition"
            >
              Trainers
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-bold uppercase tracking-wider text-neutral-800 hover:text-[#FF6A00] transition"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('plans')}
              className="text-sm font-bold uppercase tracking-wider text-neutral-800 hover:text-[#FF6A00] transition"
            >
              Plans
            </button>
            <button
              onClick={() => scrollToSection('supplements')}
              className="text-sm font-bold uppercase tracking-wider text-neutral-800 hover:text-[#FF6A00] transition flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 bg-[#FF6A00] rounded-full inline-block"></span>
              <span>Supplements</span>
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-bold uppercase tracking-wider text-neutral-800 hover:text-[#FF6A00] transition"
            >
              About
            </button>
          </nav>
        </div>

        {/* Right Action Elements */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notifications Button */}
          {user && (
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2.5 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-lg transition"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#FF6A00] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          )}

          {/* Portal Switcher / User state */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 py-1.5 px-3 border border-neutral-300 hover:border-black rounded transition text-xs font-bold uppercase tracking-wider"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover border border-neutral-300"
                />
                <span className="hidden md:inline font-bold">{user.name.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 shadow-xl rounded-none py-2 z-50 animate-in fade-in slide-in-from-top-1"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="text-xs text-neutral-500 font-medium">Logged in as</p>
                    <p className="text-sm font-bold text-neutral-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-[#FF6A00] font-semibold mt-0.5">
                      {user.hasActivePlan
                        ? `${user.activePlan?.planName} Plan · ${user.activePlan?.sessionsRemaining} sessions left`
                        : 'No Active Plan'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentView('client-app');
                      setActiveClientTab('dashboard');
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#FF6A00]" />
                    Client Dashboard
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('client-app');
                      setActiveClientTab('schedule');
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-neutral-500" />
                    My Schedule
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('client-app');
                      setActiveClientTab('profile');
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-neutral-500" />
                    Fitness Profile
                  </button>

                  <div className="border-t border-neutral-100 my-1"></div>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="hidden sm:inline-flex items-center text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 text-neutral-900 hover:text-[#FF6A00] transition"
            >
              Log In
            </button>
          )}

          {/* Current View Switch Shortcut (if in client app, allow switching to public site) */}
          {currentView === 'client-app' ? (
            <button
              onClick={() => setCurrentView('public')}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider border border-black hover:bg-black hover:text-white transition"
            >
              Public Website
            </button>
          ) : (
            user && (
              <button
                onClick={() => {
                  setCurrentView('client-app');
                  setActiveClientTab('dashboard');
                }}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider border border-black hover:bg-black hover:text-white transition"
              >
                App Dashboard
              </button>
            )
          )}

          {/* PRIMARY CTA: BOOK A TRIAL */}
          <button
            onClick={() => openBookingModal(undefined, 'Trial Session')}
            className="bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs sm:text-sm font-black uppercase tracking-wider px-3 sm:px-6 py-2.5 sm:py-3 transition shadow-sm active:translate-y-0.5 flex items-center gap-2 min-h-[44px]"
          >
            <span>BOOK A TRIAL</span>
          </button>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-neutral-800 hover:text-black focus:outline-none rounded transition hover:bg-neutral-100"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left font-black text-lg uppercase tracking-tight text-neutral-900 py-1"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('trainers')}
              className="text-left font-black text-lg uppercase tracking-tight text-neutral-900 py-1"
            >
              Trainers
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left font-black text-lg uppercase tracking-tight text-neutral-900 py-1"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('plans')}
              className="text-left font-black text-lg uppercase tracking-tight text-neutral-900 py-1"
            >
              Plans & Pricing
            </button>
            <button
              onClick={() => scrollToSection('supplements')}
              className="text-left font-black text-lg uppercase tracking-tight text-[#FF6A00] py-1 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#FF6A00]" />
              <span>Supplements & Nutrition</span>
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left font-black text-lg uppercase tracking-tight text-neutral-900 py-1"
            >
              About
            </button>

            {user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentView('client-app');
                  setActiveClientTab('dashboard');
                }}
                className="text-left font-black text-lg uppercase tracking-tight text-[#FF6A00] py-1 flex items-center gap-2"
              >
                <LayoutDashboard className="w-5 h-5" />
                Go To Client Dashboard
              </button>
            )}
          </nav>

          <div className="border-t border-neutral-100 pt-4 flex flex-col gap-3">
            {!user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full text-center py-2.5 font-bold uppercase tracking-wider text-xs border border-neutral-300"
              >
                Sign In / Register
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full text-center py-2.5 font-bold uppercase tracking-wider text-xs text-red-600 border border-red-200"
              >
                Sign Out ({user.name})
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal(undefined, 'Trial Session');
              }}
              className="w-full bg-[#FF6A00] text-white text-center py-3 font-black uppercase tracking-wider text-sm"
            >
              BOOK A TRIAL SESSION
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
