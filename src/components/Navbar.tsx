import React, { useState, useRef, useEffect } from 'react';
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
  ArrowRight,
  ExternalLink,
  Check,
  Zap,
  MapPin,
  ArrowLeft,
  ShoppingBag,
  Sliders,
  Smartphone,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    user,
    activeRole,
    currentView,
    setCurrentView,
    activePublicPage,
    navigateToPage,
    setActiveClientTab,
    openBookingModal,
    openAuthModal,
    logout,
    unreadNotificationsCount,
    setIsNotificationsOpen,
    loginAsClient,
    loginAsTrainer,
    loginAsAdmin,
    openDownloadAppModal,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);
  const personaRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (personaRef.current && !personaRef.current.contains(event.target as Node)) {
        setPersonaDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'trainers', label: 'Coaches & Trainers' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'plans', label: 'Plans & Pricing' },
    { id: 'supplements', label: 'Supplements' },
    { id: 'about', label: 'About' },
  ] as const;

  // Compute current display role/persona
  const getCurrentPersonaLabel = () => {
    if (currentView === 'client-app') {
      return user?.id === 'client-anita' ? 'Anita (New Client)' : 'Rahul (Client)';
    }
    if (currentView === 'trainer-dashboard') {
      return 'Arjun (Trainer)';
    }
    if (currentView === 'admin-dashboard') {
      return 'Admin HQ';
    }
    return 'Guest Explorer';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all">
      {/* Top Micro Utility Bar (Clean Announcement + Quick Persona Switcher) */}
      <div className="bg-[#0A0A0A] text-white text-xs px-4 sm:px-8 py-1.5 flex items-center justify-between border-b border-neutral-900">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse"></span>
          <span className="font-medium text-[11px] sm:text-xs text-neutral-300">
            Mumbai Doorstep Service Active · 1-on-1 Certified Coaches Delivered to Your Flat
          </span>
        </div>

        {/* Persona Switcher Quick Dropdown */}
        <div className="relative" ref={personaRef}>
          <button
            onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-[11px] font-bold text-neutral-300 hover:text-white border border-neutral-800 transition active:scale-95"
          >
            <span className="text-[10px] text-[#FF6A00] font-black uppercase">Role:</span>
            <span>{getCurrentPersonaLabel()}</span>
            <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform ${personaDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Polished Persona Dropdown Menu */}
          {personaDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-72 bg-white text-neutral-900 rounded-2xl border-2 border-black shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-neutral-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                  Switch Active Persona / View
                </span>
                <p className="text-xs text-neutral-600 mt-0.5 font-medium">
                  Test the platform as different users:
                </p>
              </div>

              <div className="py-1 space-y-0.5">
                {/* 1. Public Explorer */}
                <button
                  onClick={() => {
                    setCurrentView('public');
                    navigateToPage('home');
                    setPersonaDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                    currentView === 'public'
                      ? 'bg-neutral-100 text-black font-black'
                      : 'text-neutral-700 hover:bg-neutral-50 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-black text-xs">
                      <Home className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block text-xs font-black">Public Website</span>
                      <span className="block text-[10px] text-neutral-400 font-medium">Browse services & book trial</span>
                    </div>
                  </div>
                  {currentView === 'public' && <Check className="w-4 h-4 text-[#FF6A00]" />}
                </button>

                {/* 2. Rahul (Active Client) */}
                <button
                  onClick={() => {
                    loginAsClient('rahul');
                    setPersonaDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                    currentView === 'client-app' && user?.id === 'client-rahul'
                      ? 'bg-orange-50 text-orange-950 font-black'
                      : 'text-neutral-700 hover:bg-neutral-50 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#FF6A00] text-white flex items-center justify-center font-black text-xs">
                      RV
                    </div>
                    <div>
                      <span className="block text-xs font-black">Rahul Verma (Client)</span>
                      <span className="block text-[10px] text-neutral-400 font-medium">Active Transform Pack (3 left)</span>
                    </div>
                  </div>
                  {currentView === 'client-app' && user?.id === 'client-rahul' && (
                    <Check className="w-4 h-4 text-[#FF6A00]" />
                  )}
                </button>

                {/* 3. Anita (New Client) */}
                <button
                  onClick={() => {
                    loginAsClient('anita');
                    setPersonaDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                    currentView === 'client-app' && user?.id === 'client-anita'
                      ? 'bg-sky-50 text-sky-950 font-black'
                      : 'text-neutral-700 hover:bg-neutral-50 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#8DD8FF] text-black flex items-center justify-center font-black text-xs">
                      AR
                    </div>
                    <div>
                      <span className="block text-xs font-black">Anita Roy (New Client)</span>
                      <span className="block text-[10px] text-neutral-400 font-medium">Onboarding · Trial pending</span>
                    </div>
                  </div>
                  {currentView === 'client-app' && user?.id === 'client-anita' && (
                    <Check className="w-4 h-4 text-[#FF6A00]" />
                  )}
                </button>

                {/* 4. Arjun (Trainer) */}
                <button
                  onClick={() => {
                    loginAsTrainer();
                    setPersonaDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                    currentView === 'trainer-dashboard'
                      ? 'bg-emerald-50 text-emerald-950 font-black'
                      : 'text-neutral-700 hover:bg-neutral-50 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                      AS
                    </div>
                    <div>
                      <span className="block text-xs font-black">Arjun Sharma (Coach)</span>
                      <span className="block text-[10px] text-neutral-400 font-medium">Live dispatch & OTP verify</span>
                    </div>
                  </div>
                  {currentView === 'trainer-dashboard' && (
                    <Check className="w-4 h-4 text-emerald-600" />
                  )}
                </button>

                {/* 5. Admin */}
                <button
                  onClick={() => {
                    loginAsAdmin();
                    setPersonaDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                    currentView === 'admin-dashboard'
                      ? 'bg-purple-50 text-purple-950 font-black'
                      : 'text-neutral-700 hover:bg-neutral-50 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black text-xs">
                      HQ
                    </div>
                    <div>
                      <span className="block text-xs font-black">Academy Operations HQ</span>
                      <span className="block text-[10px] text-neutral-400 font-medium">Dispatch center & revenue</span>
                    </div>
                  </div>
                  {currentView === 'admin-dashboard' && (
                    <Check className="w-4 h-4 text-purple-600" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => {
                setCurrentView('public');
                navigateToPage('home');
              }}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-10 h-10 bg-[#0A0A0A] text-white flex items-center justify-center font-black text-xl rounded-xl group-hover:bg-[#FF6A00] transition-colors shadow-sm shrink-0">
                FP
              </div>
              <div>
                <span className="font-editorial text-xl sm:text-2xl font-black tracking-tight text-[#0A0A0A] uppercase block leading-none">
                  FITNESS PRO
                </span>
                <span className="text-[10px] tracking-[0.2em] font-bold text-neutral-500 uppercase block mt-1">
                  DOORSTEP ATHLETICS
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = currentView === 'public' && activePublicPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => navigateToPage(link.id)}
                    className={`px-3 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all relative ${
                      isActive
                        ? 'text-black bg-neutral-100 font-black'
                        : 'text-neutral-600 hover:text-black hover:bg-neutral-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#FF6A00] rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Elements */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* If in dashboard, show quick Back to Website pill */}
            {currentView !== 'public' && (
              <button
                onClick={() => {
                  setCurrentView('public');
                  navigateToPage('home');
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-black uppercase tracking-wider text-neutral-700 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Website</span>
              </button>
            )}

            {/* Notifications Button */}
            {user && (
              <button
                onClick={() => setIsNotificationsOpen(true)}
                className="relative p-2.5 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100 transition min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#FF6A00] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
            )}

            {/* Workspace Dashboard Direct Link */}
            {user && (
              <button
                onClick={() => {
                  if (activeRole === 'trainer') {
                    setCurrentView('trainer-dashboard');
                  } else if (activeRole === 'admin') {
                    setCurrentView('admin-dashboard');
                  } else {
                    setCurrentView('client-app');
                    setActiveClientTab('dashboard');
                  }
                }}
                className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition border ${
                  currentView !== 'public'
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span>
                  {activeRole === 'trainer' ? 'Partner Hub' : activeRole === 'admin' ? 'Admin Hub' : 'My Hub'}
                </span>
              </button>
            )}

            {/* Book Trial Session Primary CTA */}
            <button
              onClick={() => openBookingModal(undefined, 'Trial Session')}
              className="bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs font-black uppercase tracking-wider px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition shadow-sm active:scale-95 flex items-center gap-2"
            >
              <span>Book Trial</span>
              <span className="hidden sm:inline bg-black/20 text-white text-[10px] px-1.5 py-0.5 rounded font-black">
                ₹499
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-neutral-800 hover:text-black hover:bg-neutral-100 transition min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (Modern & Categorized) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-black px-4 pt-4 pb-6 space-y-5 animate-in slide-in-from-top-2 shadow-2xl">
          
          {/* Navigation Links */}
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block px-2 mb-1">
              Explore Fitness Pro
            </span>
            {navLinks.map((link) => {
              const isActive = currentView === 'public' && activePublicPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateToPage(link.id);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-between transition ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-neutral-800 hover:bg-neutral-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive ? (
                    <span className="text-[10px] font-bold text-[#FF6A00]">Active</span>
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Hub Access */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6A00] block">
              Workspace Dashboards
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  loginAsClient('rahul');
                }}
                className="p-2.5 rounded-xl bg-white border border-neutral-200 text-left hover:border-black transition"
              >
                <span className="text-xs font-black text-black block">Rahul (Client)</span>
                <span className="text-[10px] text-neutral-500 font-medium">Active Member</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  loginAsTrainer();
                }}
                className="p-2.5 rounded-xl bg-white border border-neutral-200 text-left hover:border-black transition"
              >
                <span className="text-xs font-black text-black block">Arjun (Coach)</span>
                <span className="text-[10px] text-emerald-600 font-medium">Live Partner</span>
              </button>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal(undefined, 'Trial Session');
              }}
              className="w-full bg-[#FF6A00] text-white py-3.5 rounded-xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <span>Book In-Home Trial (₹499)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
