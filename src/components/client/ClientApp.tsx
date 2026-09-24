import React from 'react';
import { useApp } from '../../context/AppContext';
import { ClientDashboard } from './ClientDashboard';
import { ClientSchedule } from './ClientSchedule';
import { ClientActivePlan } from './ClientActivePlan';
import { ClientWorkout } from './ClientWorkout';
import { ClientProgress } from './ClientProgress';
import { ClientProfile } from './ClientProfile';
import {
  Home,
  Calendar,
  Layers,
  Dumbbell,
  TrendingUp,
  User,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Flame,
} from 'lucide-react';

export const ClientApp: React.FC = () => {
  const {
    activeClientTab,
    setActiveClientTab,
    setCurrentView,
    navigateToPage,
    user,
    openTrainerChat,
    loginAsClient,
    bookings,
  } = useApp();

  const upcomingCount = bookings.filter(
    (b) => b.clientId === user?.id && b.status === 'confirmed'
  ).length;

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: Home, badge: null },
    { id: 'schedule', label: 'Schedule', icon: Calendar, badge: upcomingCount > 0 ? `${upcomingCount}` : null },
    { id: 'plan', label: 'Plan', icon: Layers, badge: user?.hasActivePlan ? 'Active' : null },
    { id: 'workout', label: 'Workout', icon: Dumbbell, badge: null },
    { id: 'progress', label: 'Biometrics', icon: TrendingUp, badge: null },
    { id: 'profile', label: 'Profile', icon: User, badge: null },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex flex-col pb-20 md:pb-12 text-neutral-900">
      
      {/* Modern Client App Sub-Header / Workspace Bar */}
      <header className="bg-white border-b border-neutral-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Line: Breadcrumb & User Summary */}
          <div className="flex flex-wrap items-center justify-between py-2.5 border-b border-neutral-100 gap-2">
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => {
                  setCurrentView('public');
                  navigateToPage('home');
                }}
                className="inline-flex items-center gap-1 font-bold text-neutral-500 hover:text-black transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Website</span>
              </button>
              <span className="text-neutral-300">/</span>
              <span className="font-bold text-neutral-500">Client Workspace</span>
              <span className="text-neutral-300">/</span>
              <span className="font-black text-black">{user?.name || 'Member'}</span>
            </div>

            {/* Quick Persona Toggle & Plan Status */}
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-[11px] font-bold">
                <Flame className="w-3 h-3 text-[#FF6A00]" />
                <span>
                  {user?.hasActivePlan ? 'Transform Pack · 3 Sessions Left' : 'New Client · No Plan Yet'}
                </span>
              </div>

              {/* Persona fast-switch between Rahul and Anita */}
              <button
                onClick={() => {
                  if (user?.id === 'client-rahul') {
                    loginAsClient('anita');
                  } else {
                    loginAsClient('rahul');
                  }
                }}
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-neutral-500 hover:text-black underline underline-offset-2 transition"
                title="Switch client profile for testing"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Switch to {user?.id === 'client-rahul' ? 'Anita (New)' : 'Rahul (Active)'}</span>
              </button>
            </div>
          </div>

          {/* Bottom Line: Desktop Navigation Tabs */}
          <div className="hidden md:flex items-center justify-between py-1">
            <nav className="flex items-center space-x-2 py-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeClientTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveClientTab(item.id as any)}
                    className={`px-3.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all shrink-0 flex items-center gap-1.5 active:scale-95 ${
                      isActive
                        ? 'bg-black text-white shadow-xs'
                        : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF6A00]' : 'text-neutral-500'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                          isActive
                            ? 'bg-[#FF6A00] text-white'
                            : 'bg-neutral-200 text-neutral-800'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right: Message Coach button */}
            <div className="flex items-center gap-2 pl-3">
              {user?.hasActivePlan && (
                <button
                  onClick={openTrainerChat}
                  className="px-3 py-1.5 bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 rounded-xl shadow-xs active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat With Coach</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Navigation: Clean 3x2 Grid (100% Screen Fit, Zero Horizontal Scrolling) */}
          <div className="md:hidden py-2 space-y-1.5">
            <div className="grid grid-cols-3 gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeClientTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveClientTab(item.id as any)}
                    className={`min-h-[42px] px-1.5 py-1.5 rounded-xl text-center flex flex-col items-center justify-center gap-0.5 transition active:scale-95 border ${
                      isActive
                        ? 'bg-black text-white border-black shadow-xs font-black'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-black font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF6A00]' : 'text-neutral-500'}`} />
                      {item.badge && (
                        <span
                          className={`text-[8px] px-1 py-0 rounded-full font-black ${
                            isActive ? 'bg-[#FF6A00] text-white' : 'bg-neutral-200 text-neutral-700'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] uppercase tracking-tight leading-none truncate w-full">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Coach Chat Fast Action */}
            {user?.hasActivePlan && (
              <button
                onClick={openTrainerChat}
                className="w-full min-h-[36px] py-1.5 px-3 bg-neutral-900 hover:bg-black text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 active:scale-98 shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <MessageSquare className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span>Message Doorstep Coach (Online)</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeClientTab === 'dashboard' && <ClientDashboard />}
        {activeClientTab === 'schedule' && <ClientSchedule />}
        {activeClientTab === 'plan' && <ClientActivePlan />}
        {activeClientTab === 'workout' && <ClientWorkout />}
        {activeClientTab === 'progress' && <ClientProgress />}
        {activeClientTab === 'profile' && <ClientProfile />}
      </main>

    </div>
  );
};
