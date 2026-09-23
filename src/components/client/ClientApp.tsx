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
} from 'lucide-react';

export const ClientApp: React.FC = () => {
  const {
    activeClientTab,
    setActiveClientTab,
    setCurrentView,
    user,
    openTrainerChat,
  } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'plan', label: 'Plan', icon: Layers },
    { id: 'workout', label: 'Workout', icon: Dumbbell },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col pb-20 md:pb-12">
      
      {/* Top Client App Sub-Header / Nav */}
      <header className="bg-white border-b-2 border-black sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Left: Back to website + status */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('public')}
                className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-neutral-600 hover:text-black transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Public Website</span>
              </button>
              <span className="text-neutral-300 hidden sm:inline">|</span>
              <span className="text-xs font-black uppercase tracking-wider text-black">
                Client Workspace
              </span>
            </div>

            {/* Desktop Tabs */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeClientTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveClientTab(item.id as any)}
                    className={`px-3.5 py-1.5 text-xs font-black uppercase tracking-wider transition flex items-center gap-2 border-b-2 ${
                      isActive
                        ? 'border-[#FF6A00] text-black font-black bg-neutral-50'
                        : 'border-transparent text-neutral-500 hover:text-black hover:bg-neutral-50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF6A00]' : 'text-neutral-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right: Message Trainer button & Switch Persona */}
            <div className="flex items-center gap-2">
              {user?.hasActivePlan && (
                <button
                  onClick={openTrainerChat}
                  className="px-3 py-1.5 bg-[#0A0A0A] hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 rounded"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#FF6A00]" />
                  <span className="hidden sm:inline">Message Coach</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Horizontal Sub-Navigation Strip (Visible on mobile/tablet) */}
        <div className="md:hidden border-t border-neutral-200 bg-white px-2 py-1 flex items-center space-x-1 overflow-x-auto no-scrollbar scroll-smooth">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeClientTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveClientTab(item.id as any)}
                className={`min-h-[36px] px-3 py-1 text-[11px] font-black uppercase tracking-wider rounded-lg transition shrink-0 flex items-center gap-1.5 active:scale-95 ${
                  isActive
                    ? 'bg-[#FF6A00] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
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
