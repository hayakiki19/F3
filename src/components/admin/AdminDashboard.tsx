import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClientUser, SessionBooking, Trainer } from '../../types';
import { InteractiveCalendar } from '../common/InteractiveCalendar';
import {
  Users,
  Dumbbell,
  Calendar,
  DollarSign,
  ShieldCheck,
  TrendingUp,
  ArrowLeft,
  CheckCircle,
  Plus,
  Search,
  Clock,
  MapPin,
  Phone,
  Mail,
  Filter,
  AlertCircle,
  Ban,
  Check,
  RefreshCw,
  Eye,
  UserCheck,
  PackageCheck,
  Truck,
  ChevronRight,
  X,
  Lock,
  Unlock,
  SlidersHorizontal,
  Flame,
  UserPlus,
  CalendarDays,
  List,
  ChevronDown,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    trainers,
    bookings,
    clients,
    plans,
    consultationLeads,
    equipmentKits,
    trainerEarnings,
    setCurrentView,
    loginAsClient,
    loginAsTrainer,
    loginAsAdmin,
    addClientSessions,
    assignClientTrainer,
    updateClientStatus,
    upgradeClientPlan,
    adminUpdateBookingStatus,
    adminRescheduleBooking,
    adminReassignTrainer,
    adminCreateManualBooking,
    adminBlockSlot,
    adminUnblockSlot,
    adminAddCustomSlot,
    adminBlockFullDay,
    updateLeadStatus,
    updateEquipmentStatus,
  } = useApp();

  // Navigation tabs
  const [activeTab, setActiveTab] = useState<
    'overview' | 'clients' | 'bookings' | 'schedules' | 'leads' | 'equipment' | 'revenue'
  >('overview');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Client Management Filters & State
  const [clientFilter, setClientFilter] = useState<'all' | 'with-plan' | 'no-plan' | 'trial' | 'expired'>('all');
  const [clientSearch, setClientSearch] = useState('');
  const [selectedClientForView, setSelectedClientForView] = useState<ClientUser | null>(null);
  const [sessionsToAddCount, setSessionsToAddCount] = useState<number>(4);

  // Bookings Filters & State
  const [bookingViewMode, setBookingViewMode] = useState<'calendar' | 'table'>('calendar');
  const [bookingCalendarDate, setBookingCalendarDate] = useState<string>('2026-09-24');
  const [bookingCalendarCoachFilter, setBookingCalendarCoachFilter] = useState<string>('all');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<'all' | 'confirmed' | 'completed' | 'reschedule_pending' | 'cancelled'>('all');
  const [bookingSearch, setBookingSearch] = useState('');
  const [selectedBookingForAction, setSelectedBookingForAction] = useState<SessionBooking | null>(null);
  const [rescheduleDateInput, setRescheduleDateInput] = useState('2026-09-25');
  const [rescheduleSlotInput, setRescheduleSlotInput] = useState('06:00 PM – 07:00 PM');
  const [reassignTrainerIdInput, setReassignTrainerIdInput] = useState(trainers[0]?.id || '');
  const [isManualBookingModalOpen, setIsManualBookingModalOpen] = useState(false);

  // Manual Booking Form State
  const [manualBookingForm, setManualBookingForm] = useState({
    clientId: clients[0]?.id || '',
    trainerId: trainers[0]?.id || '',
    sessionType: 'Personal Training' as SessionBooking['sessionType'],
    date: '2026-09-25',
    timeSlot: '07:00 AM – 08:00 AM',
    durationMinutes: 60,
    location: clients[0]?.fitnessProfile?.serviceAddress || 'Client Residence',
    notesFromTrainer: 'Equipment suite dispatched from HQ.',
  });

  // Schedule & Timing Blackout Management State
  const [selectedScheduleTrainerId, setSelectedScheduleTrainerId] = useState<string>(trainers[0]?.id || '');
  const [selectedScheduleDate, setSelectedScheduleDate] = useState<string>('2026-09-24');
  const [newCustomTimeSlot, setNewCustomTimeSlot] = useState('02:00 PM');
  const [blockReasonInput, setBlockReasonInput] = useState('Trainer Scheduled Rest / Commute Buffer');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Calculations
  const totalRevenue = 1485000;
  const clientsWithPlan = (clients || []).filter((c) => c.hasActivePlan);
  const clientsWithoutPlan = (clients || []).filter((c) => !c.hasActivePlan);

  // Filtered Clients List
  const filteredClients = (clients || []).filter((c) => {
    // Search match
    const searchLower = clientSearch.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(searchLower) ||
      c.email.toLowerCase().includes(searchLower) ||
      c.phone.includes(searchLower) ||
      (c.fitnessProfile?.serviceAddress || '').toLowerCase().includes(searchLower) ||
      (c.activePlan?.planName || '').toLowerCase().includes(searchLower);

    if (!matchesSearch) return false;

    // Filter match
    if (clientFilter === 'with-plan') return c.hasActivePlan;
    if (clientFilter === 'no-plan') return !c.hasActivePlan;
    if (clientFilter === 'trial') return c.status === 'trial';
    if (clientFilter === 'expired') return c.status === 'expired';
    return true;
  });

  // Filtered Bookings List
  const filteredBookings = bookings.filter((b) => {
    const searchLower = bookingSearch.toLowerCase();
    const matchesSearch =
      b.clientName.toLowerCase().includes(searchLower) ||
      b.trainerName.toLowerCase().includes(searchLower) ||
      b.location.toLowerCase().includes(searchLower) ||
      b.date.includes(searchLower);

    if (!matchesSearch) return false;
    if (bookingStatusFilter === 'all') return true;
    return b.status === bookingStatusFilter;
  });

  // Active trainer for schedule view
  const currentScheduleTrainer = trainers.find((t) => t.id === selectedScheduleTrainerId) || trainers[0];
  const trainerDateSlots = currentScheduleTrainer?.slots?.[selectedScheduleDate] || [];

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col pb-20 text-[#0A0A0A]">
      
      {/* Action Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A0A0A] text-white border-2 border-[#FF6A00] p-4 shadow-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-5 h-5 text-[#FF6A00]" />
          <span className="text-xs font-black uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="bg-white border-b border-neutral-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-2.5 gap-2 border-b border-neutral-100">
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setCurrentView('public')}
                className="inline-flex items-center gap-1 font-bold text-neutral-500 hover:text-black transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Website</span>
              </button>
              <span className="text-neutral-300">/</span>
              <span className="font-bold text-neutral-500">HQ Operations</span>
              <span className="text-neutral-300">/</span>
              <span className="font-black text-black">Director Console</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-neutral-600">
                Dispatch System Live · Mumbai Hub
              </span>
            </div>
          </div>

          {/* Admin Tabs (Desktop) */}
          <div className="hidden lg:flex items-center overflow-x-auto space-x-1.5 py-2 scrollbar-none">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'clients', label: `Clients (${clients.length})`, icon: Users },
              { id: 'bookings', label: `Bookings (${bookings.length})`, icon: Calendar },
              { id: 'schedules', label: 'Blackouts & Slots', icon: Clock },
              { id: 'leads', label: `Leads (${consultationLeads.length})`, icon: Phone },
              { id: 'equipment', label: `Gear Kits (${equipmentKits.length})`, icon: Dumbbell },
              { id: 'revenue', label: 'Financials', icon: DollarSign },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 text-xs font-black uppercase tracking-wider whitespace-nowrap rounded-xl transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-black text-white shadow-xs'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF6A00]' : 'text-neutral-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Navigation (NO Horizontal Slide Scroll: Clean, User-Friendly Section Switcher) */}
        <div className="lg:hidden border-t border-neutral-200 bg-white px-3 py-2 space-y-1.5">
          {/* Active Section Banner with Dropdown Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="w-full flex items-center justify-between p-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl transition active:scale-98"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 shrink-0">
                Section:
              </span>
              <div className="flex items-center gap-1.5 min-w-0 font-black text-xs text-black">
                {activeTab === 'overview' && <TrendingUp className="w-4 h-4 text-[#FF6A00] shrink-0" />}
                {activeTab === 'clients' && <Users className="w-4 h-4 text-[#FF6A00] shrink-0" />}
                {activeTab === 'bookings' && <Calendar className="w-4 h-4 text-[#FF6A00] shrink-0" />}
                {activeTab === 'schedules' && <Clock className="w-4 h-4 text-[#FF6A00] shrink-0" />}
                {activeTab === 'leads' && <Phone className="w-4 h-4 text-[#FF6A00] shrink-0" />}
                {activeTab === 'equipment' && <Dumbbell className="w-4 h-4 text-[#FF6A00] shrink-0" />}
                {activeTab === 'revenue' && <DollarSign className="w-4 h-4 text-[#FF6A00] shrink-0" />}
                <span className="truncate uppercase font-black">
                  {activeTab === 'overview' && 'Overview'}
                  {activeTab === 'clients' && `Clients (${clients.length})`}
                  {activeTab === 'bookings' && `Bookings (${bookings.length})`}
                  {activeTab === 'schedules' && 'Slots & Blackouts'}
                  {activeTab === 'leads' && `Leads (${consultationLeads.length})`}
                  {activeTab === 'equipment' && `Gear Kits (${equipmentKits.length})`}
                  {activeTab === 'revenue' && 'Financials & Revenue'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-black uppercase text-neutral-700 bg-white px-2 py-1 rounded-lg border border-neutral-200 shadow-2xs shrink-0 ml-2">
              <span>{isMobileNavOpen ? 'Hide' : 'All Sections'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMobileNavOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {/* Quick-Access 4-Button Grid (Fits 100% on screen, Zero Sliding) */}
          <div className="grid grid-cols-4 gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'clients', label: `Clients`, icon: Users },
              { id: 'bookings', label: `Bookings`, icon: Calendar },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setIsMobileNavOpen(false);
                  }}
                  className={`min-h-[38px] px-1 py-1.5 text-[10px] font-black uppercase tracking-tight rounded-xl flex items-center justify-center gap-1 transition active:scale-95 ${
                    isActive
                      ? 'bg-black text-white shadow-xs font-black'
                      : 'bg-neutral-100 text-neutral-700 hover:text-black hover:bg-neutral-200 font-bold'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#FF6A00]' : 'text-neutral-500'}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}

            {/* More Sections Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className={`min-h-[38px] px-1 py-1.5 text-[10px] font-black uppercase tracking-tight rounded-xl flex items-center justify-center gap-1 transition active:scale-95 ${
                isMobileNavOpen || !['overview', 'clients', 'bookings'].includes(activeTab)
                  ? 'bg-[#FF6A00] text-white shadow-xs font-black'
                  : 'bg-neutral-100 text-neutral-700 hover:text-black hover:bg-neutral-200 font-bold'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
              <span>More (4)</span>
            </button>
          </div>

          {/* Expanded Drawer: All 7 Sections in a Clean, Comfortable Vertical List */}
          {isMobileNavOpen && (
            <div className="pt-2 pb-1 border-t border-neutral-100 grid grid-cols-1 gap-1 animate-in fade-in slide-in-from-top-1">
              {[
                { id: 'overview', label: 'Overview & Metrics', desc: 'Dispatch volume, active sessions & top KPIs', icon: TrendingUp },
                { id: 'clients', label: `Clients Directory (${clients.length})`, desc: 'Active memberships, trials & expired plans', icon: Users },
                { id: 'bookings', label: `Session Bookings (${bookings.length})`, desc: 'Calendar dispatcher & live trainer assignments', icon: Calendar },
                { id: 'schedules', label: 'Trainer Blackouts & Slots', desc: 'Manage rest hours, buffers & available slots', icon: Clock },
                { id: 'leads', label: `Doorstep Inquiries (${consultationLeads.length})`, desc: 'Incoming trial consultation requests', icon: Phone },
                { id: 'equipment', label: `Gear & Suites (${equipmentKits.length})`, desc: 'Mobile equipment kits, mats & sanitization', icon: Dumbbell },
                { id: 'revenue', label: 'Financials & Revenue', desc: 'Earnings, payouts & plan transactions', icon: DollarSign },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setIsMobileNavOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between border transition active:scale-98 ${
                      isActive
                        ? 'bg-black text-white border-black shadow-xs font-black'
                        : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-800 font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-[#FF6A00] text-white' : 'bg-white text-neutral-700 border border-neutral-200'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-black uppercase tracking-tight">{tab.label}</span>
                        <span className={`block text-[10px] ${isActive ? 'text-neutral-300' : 'text-neutral-500'} font-medium`}>
                          {tab.desc}
                        </span>
                      </div>
                    </div>
                    {isActive && <Check className="w-4 h-4 text-[#FF6A00] shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Quick Role Switcher Strip */}
        <div className="bg-neutral-900 text-white p-3 rounded-xl border border-neutral-800 flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-wider text-neutral-300">
              Active Persona: <strong className="text-white">Vikram Malhotra (Academy Director)</strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[10px] text-neutral-400 font-bold uppercase hidden sm:inline">Switch To:</span>
            <button
              onClick={() => loginAsClient('rahul')}
              className="px-2.5 py-1 text-[11px] font-black uppercase rounded bg-neutral-800 hover:bg-[#FF6A00] text-white transition active:scale-95 border border-neutral-700"
            >
              Rahul (Client)
            </button>
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
              onClick={() => setCurrentView('public')}
              className="px-2.5 py-1 text-[11px] font-black uppercase rounded bg-neutral-800 hover:bg-emerald-500 text-white transition active:scale-95 border border-neutral-700"
            >
              Home Page
            </button>
          </div>
        </div>
        
        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white border-2 border-black p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
              Registered Clients
            </span>
            <div className="font-editorial text-3xl sm:text-4xl font-black text-black mt-1">
              {clients.length}
            </div>
            <div className="text-[11px] font-bold text-neutral-600 mt-1 flex items-center gap-1.5">
              <span className="text-[#FF6A00] font-black">{clientsWithPlan.length} with plan</span>
              <span>·</span>
              <span>{clientsWithoutPlan.length} no plan</span>
            </div>
          </div>

          <div className="bg-white border-2 border-black p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
              Scheduled Bookings
            </span>
            <div className="font-editorial text-3xl sm:text-4xl font-black text-black mt-1">
              {bookings.length}
            </div>
            <p className="text-[11px] text-green-700 font-bold mt-1">
              {bookings.filter((b) => b.status === 'confirmed').length} confirmed upcoming
            </p>
          </div>

          <div className="bg-white border-2 border-black p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
              Active Coaches
            </span>
            <div className="font-editorial text-3xl sm:text-4xl font-black text-black mt-1">
              {trainers.length}
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-1">
              100% In-Home Certified
            </p>
          </div>

          <div className="bg-white border-2 border-black p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
              Consultation Leads
            </span>
            <div className="font-editorial text-3xl sm:text-4xl font-black text-[#FF6A00] mt-1">
              {consultationLeads.filter((l) => l.status === 'new').length} New
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-1">
              {consultationLeads.length} total inquiries
            </p>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-white border-2 border-black p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
              Monthly GMV
            </span>
            <div className="font-editorial text-3xl sm:text-4xl font-black text-black mt-1">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-green-700 font-bold mt-1">
              +18.4% MoM Platform
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: OVERVIEW */}
        {/* ============================================================ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Actions Row */}
            <div className="bg-black text-white p-5 border-2 border-black flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-editorial text-xl font-black uppercase tracking-tight">
                  Dispatches & Quick Actions
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Direct management tools for home trainer dispatches and client accounts.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setIsManualBookingModalOpen(true)}
                  className="bg-[#FF6A00] hover:bg-[#e05d00] text-white px-4 py-2 text-xs font-black uppercase tracking-wider transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Manual In-Home Booking</span>
                </button>
                <button
                  onClick={() => setActiveTab('schedules')}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 text-xs font-black uppercase tracking-wider transition flex items-center gap-2 border border-neutral-700"
                >
                  <Ban className="w-4 h-4 text-[#8DD8FF]" />
                  <span>Block Coach Timings</span>
                </button>
                <button
                  onClick={() => setActiveTab('clients')}
                  className="bg-white hover:bg-neutral-200 text-black px-4 py-2 text-xs font-black uppercase tracking-wider transition flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Manage All Clients</span>
                </button>
              </div>
            </div>

            {/* Upcoming Home Bookings Stream */}
            <div className="bg-white border-2 border-black p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-2xl font-black uppercase text-black">
                    Live Session Dispatch Queue
                  </h3>
                  <p className="text-xs text-neutral-500">Upcoming home training appointments across metro areas.</p>
                </div>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-black uppercase tracking-wider text-[#FF6A00] hover:underline"
                >
                  View All Bookings →
                </button>
              </div>

              <div className="divide-y divide-neutral-200">
                {bookings.slice(0, 5).map((b) => (
                  <div key={b.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-black text-sm">{b.clientName}</span>
                        <span className="text-neutral-400">·</span>
                        <span className="font-bold text-[#FF6A00]">Coach {b.trainerName}</span>
                      </div>
                      <p className="text-neutral-600 font-medium">
                        {b.date} · {b.timeSlot} · <span className="text-black font-semibold">{b.sessionType}</span>
                      </p>
                      <p className="text-[11px] text-neutral-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{b.location}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 text-[10px] font-black uppercase ${
                          b.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : b.status === 'reschedule_pending'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : b.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        {b.status}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedBookingForAction(b);
                          setActiveTab('bookings');
                        }}
                        className="px-3 py-1 border border-neutral-300 hover:border-black text-[11px] font-bold uppercase transition"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality & Lead Snapshot */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-black p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-xl font-black uppercase text-black">
                    New Phone Consultation Leads
                  </h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-black uppercase text-[#FF6A00] hover:underline"
                  >
                    Manage ({consultationLeads.length})
                  </button>
                </div>
                <div className="space-y-2.5 text-xs">
                  {consultationLeads.slice(0, 3).map((lead) => (
                    <div key={lead.id} className="p-3 bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                      <div>
                        <p className="font-black text-black">{lead.name}</p>
                        <p className="text-[11px] text-neutral-500">{lead.phone} · {lead.fitnessGoal}</p>
                      </div>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-neutral-200 text-black">
                        {lead.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border-2 border-black p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-xl font-black uppercase text-black">
                    Mobile Equipment Deployment
                  </h3>
                  <button
                    onClick={() => setActiveTab('equipment')}
                    className="text-xs font-black uppercase text-[#FF6A00] hover:underline"
                  >
                    Inventory ({equipmentKits.length})
                  </button>
                </div>
                <div className="space-y-2.5 text-xs">
                  {equipmentKits.slice(0, 3).map((kit) => (
                    <div key={kit.id} className="p-3 bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                      <div>
                        <p className="font-black text-black">{kit.kitName}</p>
                        <p className="text-[11px] text-neutral-500">Coach: {kit.trainerName} · SN: {kit.serialNumber}</p>
                      </div>
                      <span className="text-[10px] font-black uppercase text-green-700 font-bold">
                        {kit.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: CLIENTS DIRECTORY (WITH / WITHOUT PLAN) */}
        {/* ============================================================ */}
        {activeTab === 'clients' && (
          <div className="bg-white border-2 border-black p-6 space-y-6">
            
            {/* Header & Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
              <div>
                <h3 className="font-editorial text-2xl font-black uppercase text-black">
                  Clients Master Directory ({clients.length})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Manage registered users, inspect active subscription plans, gift sessions, and assign coaches.
                </p>
              </div>

              {/* Search input */}
              <div className="flex items-center gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone, location..."
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-300 text-xs font-medium focus:border-black focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Filter Tabs (All, With Plan, No Plan, Trial, Expired) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-neutral-400 mr-2">
                FILTER CLIENTS:
              </span>
              {[
                { id: 'all', label: `All Clients (${clients.length})` },
                { id: 'with-plan', label: `With Active Plan (${clientsWithPlan.length})` },
                { id: 'no-plan', label: `Without Plan (${clientsWithoutPlan.length})` },
                { id: 'trial', label: `Trial / Leads (${clients.filter((c) => c.status === 'trial' || c.status === 'lead').length})` },
                { id: 'expired', label: `Expired / Paused (${clients.filter((c) => c.status === 'expired').length})` },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setClientFilter(f.id as any)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase transition ${
                    clientFilter === f.id
                      ? 'bg-black text-white'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Clients Table / Cards List */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-100 uppercase text-[10px] font-black text-neutral-600 border-b border-neutral-300">
                  <tr>
                    <th className="p-3">Client Profile</th>
                    <th className="p-3">Subscription Status</th>
                    <th className="p-3">Assigned Coach</th>
                    <th className="p-3">Location / Address</th>
                    <th className="p-3">Fitness Goal</th>
                    <th className="p-3 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredClients.map((client) => {
                    const hasPlan = client.hasActivePlan && client.activePlan;
                    return (
                      <tr key={client.id} className="hover:bg-neutral-50 transition">
                        {/* Client Info */}
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={client.avatar}
                              alt={client.name}
                              className="w-10 h-10 object-cover border border-black shrink-0"
                            />
                            <div>
                              <p className="font-black text-black text-sm">{client.name}</p>
                              <p className="text-neutral-500 text-[11px]">{client.email}</p>
                              <p className="text-neutral-400 text-[10px]">{client.phone}</p>
                            </div>
                          </div>
                        </td>

                        {/* Subscription Status */}
                        <td className="p-3">
                          {hasPlan ? (
                            <div className="space-y-1">
                              <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-black uppercase">
                                {client.activePlan?.planName} PLAN
                              </span>
                              <p className="text-[11px] font-bold text-neutral-700">
                                {client.activePlan?.sessionsRemaining} / {client.activePlan?.sessionsTotal} sessions left
                              </p>
                              <p className="text-[10px] text-neutral-400">
                                Exp: {client.activePlan?.expiryDate}
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <span className="px-2 py-0.5 bg-neutral-200 text-neutral-700 text-[10px] font-black uppercase">
                                NO ACTIVE PLAN
                              </span>
                              <p className="text-[10px] text-neutral-500 font-medium">
                                Status: {client.status || 'lead'}
                              </p>
                            </div>
                          )}
                        </td>

                        {/* Assigned Coach */}
                        <td className="p-3">
                          {client.activePlan?.assignedTrainerName ? (
                            <div className="font-bold text-black flex items-center gap-1.5">
                              <span className="w-2 h-2 bg-[#FF6A00] rounded-full"></span>
                              <span>{client.activePlan.assignedTrainerName}</span>
                            </div>
                          ) : (
                            <span className="text-neutral-400 italic">Unassigned</span>
                          )}
                        </td>

                        {/* Location */}
                        <td className="p-3 text-neutral-600 max-w-[200px] truncate">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <span className="truncate">{client.fitnessProfile?.serviceAddress || 'Address on file'}</span>
                          </span>
                        </td>

                        {/* Fitness Goal */}
                        <td className="p-3">
                          <span className="font-bold text-black uppercase text-[11px]">
                            {client.fitnessProfile?.primaryGoal || 'General Fitness'}
                          </span>
                          <p className="text-[10px] text-neutral-500">
                            {client.fitnessProfile?.fitnessLevel || 'Beginner'}
                          </p>
                        </td>

                        {/* Actions */}
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedClientForView(client)}
                              className="px-2.5 py-1.5 bg-black hover:bg-[#FF6A00] text-white text-[11px] font-bold uppercase transition flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Manage</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredClients.length === 0 && (
                <div className="py-12 text-center text-neutral-500">
                  <p className="font-bold uppercase text-xs">No clients match your filter criteria.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: BOOKINGS & DISPATCH */}
        {/* ============================================================ */}
        {activeTab === 'bookings' && (
          <div className="bg-white border-2 border-black p-6 space-y-6">
            
            {/* Header, View Mode Switcher & New Booking Button */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
              <div>
                <h3 className="font-editorial text-2xl font-black uppercase text-black">
                  All Home Workout Bookings ({bookings.length})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Monthly dispatch calendar, client reschedule management, coach reassignments, and concierge booking.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* View Mode Toggle: Calendar vs Table */}
                <div className="flex items-center gap-1 bg-neutral-100 p-1 border border-neutral-300">
                  <button
                    type="button"
                    onClick={() => setBookingViewMode('calendar')}
                    className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 ${
                      bookingViewMode === 'calendar'
                        ? 'bg-black text-white shadow-xs'
                        : 'text-neutral-700 hover:text-black'
                    }`}
                  >
                    <CalendarDays className="w-3.5 h-3.5 text-[#FF6A00]" />
                    <span>Calendar Dispatch</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingViewMode('table')}
                    className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 ${
                      bookingViewMode === 'table'
                        ? 'bg-black text-white shadow-xs'
                        : 'text-neutral-700 hover:text-black'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Table View</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setManualBookingForm((prev) => ({
                      ...prev,
                      date: bookingCalendarDate || '2026-09-24',
                    }));
                    setIsManualBookingModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create In-Home Booking</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs, Coach Filter & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: `All (${bookings.length})` },
                  { id: 'confirmed', label: `Confirmed (${bookings.filter((b) => b.status === 'confirmed').length})` },
                  { id: 'reschedule_pending', label: `Reschedule Requests (${bookings.filter((b) => b.status === 'reschedule_pending').length})` },
                  { id: 'completed', label: `Completed (${bookings.filter((b) => b.status === 'completed').length})` },
                  { id: 'cancelled', label: `Cancelled (${bookings.filter((b) => b.status === 'cancelled').length})` },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setBookingStatusFilter(st.id as any)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase transition ${
                      bookingStatusFilter === st.id
                        ? 'bg-black text-white'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {/* Coach Filter */}
                <select
                  value={bookingCalendarCoachFilter}
                  onChange={(e) => setBookingCalendarCoachFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-neutral-50 border border-neutral-300 text-xs font-bold uppercase focus:border-black focus:outline-none"
                >
                  <option value="all">All Coaches ({trainers.length})</option>
                  {trainers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>

                {/* Search */}
                <div className="relative w-full sm:w-48">
                  <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search client/coach..."
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-neutral-50 border border-neutral-300 text-xs font-medium focus:border-black focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* VIEW MODE 1: MONTHLY CALENDAR DISPATCH */}
            {bookingViewMode === 'calendar' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Calendar Grid (Large) */}
                  <div className="lg:col-span-8 space-y-3">
                    <InteractiveCalendar
                      selectedDate={bookingCalendarDate}
                      onSelectDate={(d) => setBookingCalendarDate(d)}
                      size="large"
                      dateMetadata={(() => {
                        const meta: Record<string, { badgeText: string; badgeColor: 'green' | 'amber' | 'blue' | 'neutral'; itemsCount: number }> = {};
                        bookings.forEach((b) => {
                          if (bookingCalendarCoachFilter !== 'all' && b.trainerId !== bookingCalendarCoachFilter) return;
                          if (bookingStatusFilter !== 'all' && b.status !== bookingStatusFilter) return;
                          
                          if (!meta[b.date]) {
                            meta[b.date] = { itemsCount: 0, badgeText: '', badgeColor: 'green' };
                          }
                          meta[b.date].itemsCount += 1;
                          if (b.status === 'reschedule_pending') {
                            meta[b.date].badgeColor = 'amber';
                          }
                        });
                        Object.keys(meta).forEach((d) => {
                          const count = meta[d].itemsCount;
                          meta[d].badgeText = `${count} ${count === 1 ? 'Dispatch' : 'Dispatches'}`;
                        });
                        return meta;
                      })()}
                      renderDayFooter={(dateStr) => {
                        const daySessions = bookings.filter((b) => {
                          if (b.date !== dateStr) return false;
                          if (bookingCalendarCoachFilter !== 'all' && b.trainerId !== bookingCalendarCoachFilter) return false;
                          if (bookingStatusFilter !== 'all' && b.status !== bookingStatusFilter) return false;
                          if (bookingSearch) {
                            const s = bookingSearch.toLowerCase();
                            if (!b.clientName.toLowerCase().includes(s) && !b.trainerName.toLowerCase().includes(s)) return false;
                          }
                          return true;
                        });

                        if (daySessions.length === 0) return null;

                        return (
                          <div className="w-full mt-1 space-y-1">
                            {daySessions.slice(0, 2).map((s) => (
                              <div
                                key={s.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedBookingForAction(s);
                                }}
                                className={`w-full text-left truncate px-1 py-0.5 text-[9px] font-bold border transition ${
                                  s.status === 'reschedule_pending'
                                    ? 'bg-amber-100 border-amber-400 text-amber-950 font-black'
                                    : s.status === 'confirmed'
                                    ? 'bg-green-100 border-green-400 text-green-950'
                                    : s.status === 'completed'
                                    ? 'bg-blue-100 border-blue-400 text-blue-950'
                                    : 'bg-neutral-100 border-neutral-300 text-neutral-800'
                                } hover:scale-102 hover:shadow-xs`}
                                title={`${s.timeSlot}: ${s.clientName} (${s.trainerName}) - Click to Manage`}
                              >
                                {s.timeSlot.split(' ')[0]} {s.clientName.split(' ')[0]} ({s.trainerName.split(' ')[0]})
                              </div>
                            ))}
                            {daySessions.length > 2 && (
                              <div className="text-[9px] text-[#FF6A00] font-black text-center">
                                +{daySessions.length - 2} more
                              </div>
                            )}
                          </div>
                        );
                      }}
                    />

                    {/* Dispatch Legend */}
                    <div className="flex flex-wrap items-center gap-4 p-3 bg-neutral-50 border border-neutral-200 text-xs">
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">Legend:</span>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold">
                        <span className="w-2.5 h-2.5 bg-green-600 rounded-none inline-block"></span>
                        <span>Confirmed Dispatch</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold">
                        <span className="w-2.5 h-2.5 bg-amber-500 rounded-none inline-block"></span>
                        <span>Reschedule Request Pending</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold">
                        <span className="w-2.5 h-2.5 bg-blue-600 rounded-none inline-block"></span>
                        <span>Completed</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold">
                        <span className="w-2.5 h-2.5 bg-[#FF6A00] rounded-none inline-block"></span>
                        <span>Selected Calendar Date</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Day Dossier & Quick Actions Panel */}
                  <div className="lg:col-span-4 bg-white border-2 border-black p-5 space-y-4">
                    <div className="border-b border-neutral-200 pb-3 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                          SELECTED DATE DOSSIER
                        </span>
                        <h4 className="font-editorial text-lg font-black uppercase text-black">
                          {new Date(bookingCalendarDate + 'T00:00:00').toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </h4>
                      </div>

                      <button
                        onClick={() => {
                          setManualBookingForm((prev) => ({
                            ...prev,
                            date: bookingCalendarDate,
                          }));
                          setIsManualBookingModalOpen(true);
                        }}
                        className="px-2.5 py-1 bg-[#FF6A00] hover:bg-[#e05d00] text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Book On This Day</span>
                      </button>
                    </div>

                    {/* Bookings for the selected day */}
                    {(() => {
                      const dayBookings = bookings.filter((b) => {
                        if (b.date !== bookingCalendarDate) return false;
                        if (bookingCalendarCoachFilter !== 'all' && b.trainerId !== bookingCalendarCoachFilter) return false;
                        if (bookingStatusFilter !== 'all' && b.status !== bookingStatusFilter) return false;
                        return true;
                      });

                      if (dayBookings.length === 0) {
                        return (
                          <div className="py-8 text-center space-y-2 bg-neutral-50 border border-dashed border-neutral-300 p-4">
                            <Calendar className="w-8 h-8 text-neutral-400 mx-auto" />
                            <p className="text-xs font-bold text-neutral-800">
                              No dispatches scheduled on this day.
                            </p>
                            <p className="text-[11px] text-neutral-500">
                              Coaches are available for custom concierge dispatch or blackout.
                            </p>
                            <div className="pt-2 flex flex-col gap-2">
                              <button
                                onClick={() => {
                                  setManualBookingForm((prev) => ({
                                    ...prev,
                                    date: bookingCalendarDate,
                                  }));
                                  setIsManualBookingModalOpen(true);
                                }}
                                className="w-full py-1.5 bg-black text-white text-xs font-black uppercase tracking-wider"
                              >
                                Book Client on {bookingCalendarDate}
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedScheduleDate(bookingCalendarDate);
                                  setActiveTab('schedules');
                                }}
                                className="w-full py-1.5 border border-neutral-300 hover:border-black text-neutral-700 text-xs font-bold uppercase tracking-wider"
                              >
                                Manage Coach Slot Blackouts →
                              </button>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div className="space-y-3">
                          <span className="text-[10px] font-black uppercase text-neutral-500 block">
                            SCHEDULED SESSIONS ({dayBookings.length}):
                          </span>
                          {dayBookings.map((b) => (
                            <div
                              key={b.id}
                              className="p-3.5 bg-neutral-50 border-2 border-black space-y-2 hover:border-[#FF6A00] transition"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-editorial text-base font-black text-black">
                                  {b.timeSlot}
                                </span>
                                <span
                                  className={`px-2 py-0.5 text-[9px] font-black uppercase ${
                                    b.status === 'confirmed'
                                      ? 'bg-green-100 text-green-800'
                                      : b.status === 'reschedule_pending'
                                      ? 'bg-amber-100 text-amber-900 font-black'
                                      : b.status === 'completed'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-neutral-200 text-neutral-700'
                                  }`}
                                >
                                  {b.status}
                                </span>
                              </div>

                              <div className="space-y-1 text-xs">
                                <p className="font-bold text-black">
                                  Client: <strong className="text-[#FF6A00]">{b.clientName}</strong>
                                </p>
                                <p className="text-neutral-700">
                                  Assigned Coach: <strong>{b.trainerName}</strong>
                                </p>
                                <p className="text-neutral-500 text-[11px] truncate flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                                  <span>{b.location}</span>
                                </p>
                              </div>

                              {b.changeRequest && (
                                <div className="p-2 bg-amber-50 border border-amber-300 text-[10px] text-amber-900">
                                  <strong>Client Requests:</strong> {b.changeRequest.preferredDate} ({b.changeRequest.preferredTime})
                                </div>
                              )}

                              <div className="pt-2 border-t border-neutral-200 flex items-center justify-end">
                                <button
                                  onClick={() => setSelectedBookingForAction(b)}
                                  className="w-full py-1.5 bg-black hover:bg-[#FF6A00] text-white text-[11px] font-black uppercase tracking-wider transition"
                                >
                                  Manage Dispatch
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}

                  </div>

                </div>
              </div>
            ) : (
              /* VIEW MODE 2: TRADITIONAL DETAILED TABLE */
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-100 uppercase text-[10px] font-black text-neutral-600 border-b border-neutral-300">
                    <tr>
                      <th className="p-3">Client</th>
                      <th className="p-3">Assigned Coach</th>
                      <th className="p-3">Date & Slot</th>
                      <th className="p-3">Type & Address</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Dispatch Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 font-medium">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-neutral-50 transition">
                        <td className="p-3">
                          <span className="font-black text-black text-sm block">{b.clientName}</span>
                          <span className="text-[10px] text-neutral-400">ID: {b.id}</span>
                        </td>

                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={b.trainerPhoto}
                              alt={b.trainerName}
                              className="w-7 h-7 object-cover border border-black"
                            />
                            <span className="font-bold text-neutral-800">{b.trainerName}</span>
                          </div>
                        </td>

                        <td className="p-3">
                          <span className="font-black text-black block">{b.date}</span>
                          <span className="text-neutral-500 font-bold">{b.timeSlot}</span>
                          {b.changeRequest && (
                            <div className="mt-1 p-1.5 bg-amber-50 border border-amber-300 text-[10px] text-amber-900">
                              <strong>Requested:</strong> {b.changeRequest.preferredDate} · {b.changeRequest.preferredTime}
                            </div>
                          )}
                        </td>

                        <td className="p-3 text-neutral-600">
                          <span className="font-bold text-black uppercase text-[11px] block">{b.sessionType}</span>
                          <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-neutral-400" />
                            <span className="truncate max-w-[200px]">{b.location}</span>
                          </span>
                        </td>

                        <td className="p-3">
                          <span
                            className={`px-2.5 py-1 text-[10px] font-black uppercase ${
                              b.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : b.status === 'reschedule_pending'
                                ? 'bg-amber-100 text-amber-900 font-black'
                                : b.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-neutral-100 text-neutral-800'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>

                        <td className="p-3 text-right">
                          <button
                            onClick={() => setSelectedBookingForAction(b)}
                            className="px-3 py-1.5 border border-neutral-300 hover:border-black text-[11px] font-bold uppercase transition"
                          >
                            Manage Dispatch
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredBookings.length === 0 && (
                  <div className="py-12 text-center text-neutral-500">
                    <p className="font-bold uppercase text-xs">No bookings match your filter criteria.</p>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: SCHEDULE & TIMING BLACKOUT MANAGEMENT */}
        {/* ============================================================ */}
        {activeTab === 'schedules' && (
          <div className="bg-white border-2 border-black p-6 space-y-6">
            
            <div className="border-b border-neutral-200 pb-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-editorial text-2xl font-black uppercase text-black">
                    Trainer Timing & Slot Blackout Management
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Ability to manually block, blackout, open, or customize trainer operating hours and travel buffers.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-black uppercase text-neutral-500">SELECT COACH:</span>
                  <select
                    value={selectedScheduleTrainerId}
                    onChange={(e) => setSelectedScheduleTrainerId(e.target.value)}
                    className="px-3 py-2 bg-neutral-50 border-2 border-black text-xs font-black uppercase focus:outline-none"
                  >
                    {trainers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.location})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Coach Profile Card & Calendar Date Inspector */}
            <div className="bg-neutral-50 border-2 border-neutral-300 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={currentScheduleTrainer.photo}
                  alt={currentScheduleTrainer.name}
                  className="w-14 h-14 object-cover border-2 border-black shrink-0"
                />
                <div>
                  <h4 className="font-editorial text-lg font-black uppercase text-black">
                    {currentScheduleTrainer.name}
                  </h4>
                  <p className="text-xs text-neutral-600 font-medium">
                    {currentScheduleTrainer.availabilityDays} · {currentScheduleTrainer.availabilityHours}
                  </p>
                  <p className="text-[11px] text-[#FF6A00] font-bold">
                    Base: ${currentScheduleTrainer.startingPrice}/session · Radius: {currentScheduleTrainer.serviceArea}
                  </p>
                </div>
              </div>

              {/* Quick Date Selector Shortcuts */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase text-neutral-500 block">
                  QUICK DATE JUMP:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { label: 'Tomorrow', date: '2026-09-24' },
                    { label: 'Fri Sep 25', date: '2026-09-25' },
                    { label: 'Sat Sep 26', date: '2026-09-26' },
                    { label: 'Sun Sep 27', date: '2026-09-27' },
                    { label: 'Mon Sep 28', date: '2026-09-28' },
                  ].map((d) => (
                    <button
                      key={d.date}
                      type="button"
                      onClick={() => setSelectedScheduleDate(d.date)}
                      className={`px-2.5 py-1 text-xs font-black uppercase transition ${
                        selectedScheduleDate === d.date
                          ? 'bg-black text-white'
                          : 'bg-white border border-neutral-300 text-neutral-700 hover:border-black'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Schedule Calendar for Blackouts */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-editorial text-lg font-black uppercase text-black">
                    Coach Operating Calendar · {currentScheduleTrainer.name}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Click any calendar day to inspect slots, blackout hours, or open emergency slots.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-neutral-500">
                    Selected: <strong className="text-black">{selectedScheduleDate}</strong>
                  </span>
                </div>
              </div>

              <InteractiveCalendar
                selectedDate={selectedScheduleDate}
                onSelectDate={(d) => setSelectedScheduleDate(d)}
                size="standard"
                dateMetadata={(() => {
                  const meta: Record<string, { badgeText: string; badgeColor: 'green' | 'amber' | 'red'; isBlocked?: boolean }> = {};
                  if (currentScheduleTrainer?.slots) {
                    Object.entries(currentScheduleTrainer.slots).forEach(([dateStr, slots]) => {
                      const blockedCount = slots.filter((s) => s.blockedByAdmin).length;
                      const availCount = slots.filter((s) => s.available && !s.blockedByAdmin).length;
                      if (blockedCount > 0 && availCount === 0) {
                        meta[dateStr] = { badgeText: 'Blocked', badgeColor: 'red' };
                      } else if (blockedCount > 0) {
                        meta[dateStr] = { badgeText: `${availCount} Open · ${blockedCount} Blk`, badgeColor: 'amber' };
                      } else if (availCount > 0) {
                        meta[dateStr] = { badgeText: `${availCount} Open`, badgeColor: 'green' };
                      }
                    });
                  }
                  return meta;
                })()}
              />
            </div>

            {/* Quick Full Day Action */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-amber-50 border-2 border-amber-300">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                <div>
                  <h5 className="font-bold text-xs uppercase text-amber-900">
                    Bulk Day Blackout: {currentScheduleTrainer.name} on {selectedScheduleDate}
                  </h5>
                  <p className="text-[11px] text-amber-800">
                    Need to take this coach offline for medical leave, transit delays, or scheduled vacation?
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  adminBlockFullDay(currentScheduleTrainer.id, selectedScheduleDate, 'Full Day Offline / Leave');
                  showToast(`Blocked all slots for ${currentScheduleTrainer.name} on ${selectedScheduleDate}.`);
                }}
                className="px-4 py-2 bg-amber-800 hover:bg-black text-white text-xs font-black uppercase tracking-wider transition flex items-center gap-2"
              >
                <Ban className="w-4 h-4" />
                <span>Block Entire Day</span>
              </button>
            </div>

            {/* Timings & Slots Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-editorial text-lg font-black uppercase text-black">
                  Configured Time Slots for {selectedScheduleDate}
                </h4>

                {/* Add Custom Slot Input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newCustomTimeSlot}
                    onChange={(e) => setNewCustomTimeSlot(e.target.value)}
                    placeholder="e.g. 02:30 PM"
                    className="w-28 px-2.5 py-1.5 bg-neutral-50 border border-neutral-300 text-xs font-bold uppercase focus:border-black focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      if (newCustomTimeSlot) {
                        adminAddCustomSlot(currentScheduleTrainer.id, selectedScheduleDate, newCustomTimeSlot);
                        showToast(`Added new slot ${newCustomTimeSlot} for ${currentScheduleTrainer.name}`);
                      }
                    }}
                    className="px-3 py-1.5 bg-black hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Slot</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {trainerDateSlots.map((slot) => {
                  const isBlocked = slot.blockedByAdmin || !slot.available;
                  return (
                    <div
                      key={slot.time}
                      className={`p-4 border-2 transition relative flex flex-col justify-between ${
                        isBlocked
                          ? 'border-neutral-300 bg-neutral-100 text-neutral-500'
                          : 'border-black bg-white text-black'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-editorial text-lg font-black">{slot.time}</span>
                        {slot.blockedByAdmin ? (
                          <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-black uppercase flex items-center gap-1">
                            <Ban className="w-3 h-3" />
                            <span>BLOCKED</span>
                          </span>
                        ) : slot.available ? (
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-black uppercase">
                            OPEN / BOOKABLE
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-black uppercase">
                            BOOKED BY CLIENT
                          </span>
                        )}
                      </div>

                      {slot.blockReason && (
                        <p className="text-[11px] text-red-700 italic mb-3">
                          Reason: {slot.blockReason}
                        </p>
                      )}

                      <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                        {slot.blockedByAdmin ? (
                          <button
                            onClick={() => {
                              adminUnblockSlot(currentScheduleTrainer.id, selectedScheduleDate, slot.time);
                              showToast(`Unblocked ${slot.time} for ${currentScheduleTrainer.name}`);
                            }}
                            className="w-full py-1.5 bg-black hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-1.5"
                          >
                            <Unlock className="w-3.5 h-3.5" />
                            <span>Unblock / Open Slot</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              adminBlockSlot(currentScheduleTrainer.id, selectedScheduleDate, slot.time, blockReasonInput);
                              showToast(`Blocked ${slot.time} for ${currentScheduleTrainer.name}`);
                            }}
                            className="w-full py-1.5 bg-neutral-200 hover:bg-red-600 hover:text-white text-neutral-800 text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-1.5"
                          >
                            <Ban className="w-3.5 h-3.5" />
                            <span>Block Timing</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {trainerDateSlots.length === 0 && (
                  <div className="col-span-3 py-8 text-center bg-neutral-50 border border-neutral-300">
                    <p className="text-xs text-neutral-500 uppercase font-bold">
                      No slots generated for {selectedScheduleDate} yet. Use "Add Slot" above to set timings.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: CONSULTATION LEADS */}
        {/* ============================================================ */}
        {activeTab === 'leads' && (
          <div className="bg-white border-2 border-black p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
              <div>
                <h3 className="font-editorial text-2xl font-black uppercase text-black">
                  Incoming Consultation Requests ({consultationLeads.length})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Prospective clients requesting free 15-min assessment calls to find the right in-home personal trainer.
                </p>
              </div>
            </div>

            <div className="divide-y divide-neutral-200">
              {consultationLeads.map((lead) => (
                <div key={lead.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-black text-black text-sm">{lead.name}</span>
                      <span className="text-neutral-400">·</span>
                      <span className="text-neutral-500">{lead.createdAt}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-neutral-600">
                      <span className="flex items-center gap-1 font-bold text-black">
                        <Phone className="w-3.5 h-3.5 text-[#FF6A00]" />
                        {lead.phone}
                      </span>
                      <span>·</span>
                      <span>{lead.email}</span>
                      <span>·</span>
                      <span>Target: <strong className="text-black">{lead.fitnessGoal}</strong></span>
                      <span>·</span>
                      <span>Location: <strong className="text-black">{lead.location}</strong></span>
                    </div>

                    {lead.notes && (
                      <p className="text-[11px] text-neutral-500 italic bg-neutral-50 p-2 border border-neutral-200 mt-1 max-w-xl">
                        "{lead.notes}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={lead.status}
                      onChange={(e) => {
                        updateLeadStatus(lead.id, e.target.value as any);
                        showToast(`Updated ${lead.name} status to ${e.target.value}`);
                      }}
                      className="px-2.5 py-1.5 bg-neutral-50 border border-black text-xs font-black uppercase focus:outline-none"
                    >
                      <option value="new">Status: New Lead</option>
                      <option value="contacted">Status: Contacted</option>
                      <option value="converted">Status: Converted ($)</option>
                      <option value="archived">Status: Archived</option>
                    </select>

                    <button
                      onClick={() => {
                        updateLeadStatus(lead.id, 'converted', trainers[0].id);
                        showToast(`Converted lead ${lead.name} to active client trial!`);
                      }}
                      className="px-3 py-1.5 bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs font-black uppercase tracking-wider transition"
                    >
                      Convert to Trial
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 6: EQUIPMENT KITS */}
        {/* ============================================================ */}
        {activeTab === 'equipment' && (
          <div className="bg-white border-2 border-black p-6 space-y-6">
            <div className="border-b border-neutral-200 pb-5">
              <h3 className="font-editorial text-2xl font-black uppercase text-black">
                Mobile Equipment Inventory & Coach Kits
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Every Fitness Pro Academy trainer brings specialized resistance gear directly into customer living rooms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {equipmentKits.map((kit) => (
                <div key={kit.id} className="p-5 border-2 border-black bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-neutral-400 block">
                        SERIAL: {kit.serialNumber}
                      </span>
                      <h4 className="font-editorial text-lg font-black uppercase text-black mt-0.5">
                        {kit.kitName}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 bg-green-100 text-green-800 text-[10px] font-black uppercase">
                      {kit.status}
                    </span>
                  </div>

                  <div className="text-xs text-neutral-700 space-y-1">
                    <p>
                      <strong>Assigned Coach:</strong> {kit.trainerName || 'Central Warehouse'}
                    </p>
                    <p>
                      <strong>Last Sanitization Audit:</strong> {kit.lastAuditDate}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-200">
                    <span className="text-[10px] font-black uppercase text-neutral-500 block mb-1">
                      Included Gear Items:
                    </span>
                    <ul className="text-xs text-neutral-600 space-y-0.5 list-disc list-inside">
                      {kit.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <select
                      value={kit.status}
                      onChange={(e) => {
                        updateEquipmentStatus(kit.id, e.target.value as any);
                        showToast(`Updated kit ${kit.serialNumber} to ${e.target.value}`);
                      }}
                      className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-xs font-bold uppercase focus:outline-none"
                    >
                      <option value="Deployed with Coach">Deployed with Coach</option>
                      <option value="Maintenance">Maintenance Required</option>
                      <option value="Warehouse Backup">Warehouse Backup</option>
                    </select>

                    <button
                      onClick={() => {
                        updateEquipmentStatus(kit.id, 'Deployed with Coach');
                        showToast(`Audited and sanitized kit ${kit.serialNumber}`);
                      }}
                      className="px-3 py-1 bg-black hover:bg-[#FF6A00] text-white text-xs font-bold uppercase transition"
                    >
                      Pass Sanitization
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 7: REVENUE & PAYOUTS */}
        {/* ============================================================ */}
        {activeTab === 'revenue' && (
          <div className="bg-white border-2 border-black p-6 space-y-6">
            <h3 className="font-editorial text-2xl font-black uppercase text-black">
              Platform Financials & Coach Payout Authorizations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-neutral-50 border border-neutral-300">
                <span className="text-xs text-neutral-500 uppercase font-bold">Gross Platform Bookings</span>
                <p className="text-3xl font-black text-black mt-1">₹38,80,000</p>
                <p className="text-[11px] text-neutral-500 mt-1">Total revenue collected via Razorpay / UPI</p>
              </div>

              <div className="p-4 bg-neutral-50 border border-neutral-300">
                <span className="text-xs text-neutral-500 uppercase font-bold">Trainer Commission Payouts</span>
                <p className="text-3xl font-black text-black mt-1">₹29,10,000</p>
                <p className="text-[11px] text-neutral-500 mt-1">75% direct coach take-home rate</p>
              </div>

              <div className="p-4 bg-neutral-50 border border-neutral-300">
                <span className="text-xs text-neutral-500 uppercase font-bold">Platform Gross Margin</span>
                <p className="text-3xl font-black text-[#FF6A00] mt-1">₹9,70,000</p>
                <p className="text-[11px] text-green-700 font-bold mt-1">25% net platform retention</p>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm uppercase text-black">Direct Deposit Batch Approval</h4>
                <p className="text-xs text-neutral-500">Upcoming Friday payout: ₹3,88,000 across 6 active coaches.</p>
              </div>

              <button
                onClick={() => showToast('Batch direct deposit payout scheduled for Friday 09:00 AM.')}
                className="px-5 py-2.5 bg-black hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition"
              >
                Authorize Payout Batch
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ============================================================ */}
      {/* MODAL 1: CLIENT DETAILS & MANAGEMENT DRAWER */}
      {/* ============================================================ */}
      {selectedClientForView && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border-4 border-black max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedClientForView.avatar}
                  alt={selectedClientForView.name}
                  className="w-12 h-12 object-cover border-2 border-black"
                />
                <div>
                  <h3 className="font-editorial text-2xl font-black uppercase text-black">
                    {selectedClientForView.name}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {selectedClientForView.email} · {selectedClientForView.phone}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedClientForView(null)}
                className="p-1 hover:bg-neutral-100 text-neutral-600 hover:text-black transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Current Active Plan Status */}
            <div className="p-4 bg-neutral-50 border-2 border-neutral-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-500">
                  CURRENT MEMBERSHIP STATUS
                </span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-black uppercase ${
                    selectedClientForView.hasActivePlan
                      ? 'bg-green-100 text-green-800'
                      : 'bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {selectedClientForView.hasActivePlan
                    ? `${selectedClientForView.activePlan?.planName} PLAN`
                    : 'NO ACTIVE SUBSCRIPTION'}
                </span>
              </div>

              {selectedClientForView.hasActivePlan && selectedClientForView.activePlan ? (
                <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-neutral-500 block">Remaining Sessions</span>
                    <strong className="text-lg font-black text-black">
                      {selectedClientForView.activePlan.sessionsRemaining} / {selectedClientForView.activePlan.sessionsTotal}
                    </strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Assigned Trainer</span>
                    <strong className="text-sm font-black text-[#FF6A00]">
                      {selectedClientForView.activePlan.assignedTrainerName}
                    </strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Plan Expiry</span>
                    <strong className="text-sm font-bold text-neutral-800">
                      {selectedClientForView.activePlan.expiryDate}
                    </strong>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-neutral-600">
                  Client has completed registration and is currently browsing coaches or awaiting trial session.
                </p>
              )}
            </div>

            {/* Admin Power Controls for this Client */}
            <div className="space-y-4">
              <h4 className="font-editorial text-lg font-black uppercase text-black">
                Admin Plan Adjustments
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                {/* Add / Gift Sessions */}
                <div className="p-3 border border-neutral-300 space-y-2">
                  <span className="font-bold text-black uppercase block">Gift / Add Sessions</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={sessionsToAddCount}
                      onChange={(e) => setSessionsToAddCount(parseInt(e.target.value) || 1)}
                      className="w-16 px-2 py-1.5 border border-neutral-300 font-bold"
                    />
                    <button
                      onClick={() => {
                        addClientSessions(selectedClientForView.id, sessionsToAddCount);
                        showToast(`Granted +${sessionsToAddCount} sessions to ${selectedClientForView.name}`);
                        setSelectedClientForView(null);
                      }}
                      className="px-3 py-1.5 bg-[#FF6A00] hover:bg-[#e05d00] text-white font-bold uppercase transition"
                    >
                      Credit Sessions
                    </button>
                  </div>
                </div>

                {/* Reassign Trainer */}
                <div className="p-3 border border-neutral-300 space-y-2">
                  <span className="font-bold text-black uppercase block">Assign / Change Coach</span>
                  <div className="flex items-center gap-2">
                    <select
                      id="coach-assign-select"
                      className="w-full px-2 py-1.5 border border-neutral-300 font-bold bg-white"
                      onChange={(e) => {
                        assignClientTrainer(selectedClientForView.id, e.target.value);
                        showToast(`Reassigned coach to ${selectedClientForView.name}`);
                        setSelectedClientForView(null);
                      }}
                      defaultValue={selectedClientForView.activePlan?.assignedTrainerId || ''}
                    >
                      <option value="" disabled>Select Coach...</option>
                      {trainers.map((t) => (
                        <option key={t.id} value={t.id}>{t.name} ({t.location})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Upgrade / Set Plan */}
                <div className="p-3 border border-neutral-300 space-y-2 sm:col-span-2">
                  <span className="font-bold text-black uppercase block">Activate / Upgrade Subscription</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {plans.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          upgradeClientPlan(selectedClientForView.id, p.id);
                          showToast(`Activated ${p.name} plan for ${selectedClientForView.name}`);
                          setSelectedClientForView(null);
                        }}
                        className="px-3 py-1.5 bg-neutral-100 hover:bg-black hover:text-white border border-neutral-300 font-bold uppercase transition text-[11px]"
                      >
                        Set to {p.name} ({p.sessionsCount} sessions)
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Client Biometrics & Fitness Details */}
            <div className="space-y-2 pt-3 border-t border-neutral-200 text-xs">
              <span className="text-xs font-black uppercase text-neutral-400 block">
                CLIENT DOSSIER & SERVICE ADDRESS
              </span>
              <div className="grid grid-cols-2 gap-2 text-neutral-700">
                <p><strong>Goal:</strong> {selectedClientForView.fitnessProfile?.primaryGoal}</p>
                <p><strong>Level:</strong> {selectedClientForView.fitnessProfile?.fitnessLevel}</p>
                <p><strong>Age:</strong> {selectedClientForView.fitnessProfile?.age || '29'} yrs</p>
                <p><strong>Weight:</strong> {selectedClientForView.fitnessProfile?.weightKg || '72'} kg</p>
                <p className="col-span-2">
                  <strong>Service Address:</strong> {selectedClientForView.fitnessProfile?.serviceAddress}
                </p>
                {selectedClientForView.fitnessProfile?.medicalNotes && (
                  <p className="col-span-2 text-amber-800 bg-amber-50 p-2 border border-amber-200">
                    <strong>Medical Note:</strong> {selectedClientForView.fitnessProfile.medicalNotes}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedClientForView(null)}
                className="px-5 py-2 bg-neutral-200 hover:bg-black hover:text-white text-xs font-black uppercase tracking-wider transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: DISPATCH & RESCHEDULE BOOKING */}
      {/* ============================================================ */}
      {selectedBookingForAction && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border-4 border-black max-w-lg w-full p-6 space-y-5">
            
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-neutral-400">
                  BOOKING DISPATCH CONTROL
                </span>
                <h3 className="font-editorial text-xl font-black uppercase text-black mt-0.5">
                  Manage {selectedBookingForAction.clientName}'s Session
                </h3>
              </div>

              <button
                onClick={() => setSelectedBookingForAction(null)}
                className="p-1 text-neutral-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-neutral-50 border border-neutral-300 text-xs space-y-1">
              <p><strong>Current Coach:</strong> {selectedBookingForAction.trainerName}</p>
              <p><strong>Current Slot:</strong> {selectedBookingForAction.date} · {selectedBookingForAction.timeSlot}</p>
              <p><strong>Address:</strong> {selectedBookingForAction.location}</p>
              <p><strong>Status:</strong> <span className="uppercase font-bold text-[#FF6A00]">{selectedBookingForAction.status}</span></p>
            </div>

            {/* Force Reschedule */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-editorial text-sm font-black uppercase text-black">
                  Force Reschedule Slot
                </h4>
                <div className="flex items-center gap-1">
                  {[
                    { label: 'Tomorrow', date: '2026-09-24' },
                    { label: 'Fri 25', date: '2026-09-25' },
                    { label: 'Sat 26', date: '2026-09-26' },
                  ].map((d) => (
                    <button
                      key={d.date}
                      type="button"
                      onClick={() => setRescheduleDateInput(d.date)}
                      className={`px-2 py-0.5 text-[9px] font-black uppercase transition border ${
                        rescheduleDateInput === d.date
                          ? 'bg-[#FF6A00] text-white border-[#FF6A00]'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="font-bold text-neutral-600 block mb-1">New Date</label>
                  <input
                    type="date"
                    value={rescheduleDateInput}
                    onChange={(e) => setRescheduleDateInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-neutral-300 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-600 block mb-1">New Time Slot</label>
                  <input
                    type="text"
                    value={rescheduleSlotInput}
                    onChange={(e) => setRescheduleSlotInput(e.target.value)}
                    placeholder="e.g. 06:00 PM – 07:00 PM"
                    className="w-full px-2.5 py-1.5 border border-neutral-300 font-bold"
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  adminRescheduleBooking(selectedBookingForAction.id, rescheduleDateInput, rescheduleSlotInput);
                  showToast(`Rescheduled session to ${rescheduleDateInput} · ${rescheduleSlotInput}`);
                  setSelectedBookingForAction(null);
                }}
                className="w-full py-2 bg-black hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition"
              >
                Apply New Schedule
              </button>
            </div>

            {/* Reassign Coach */}
            <div className="space-y-2 pt-2 border-t border-neutral-200">
              <h4 className="font-editorial text-sm font-black uppercase text-black">
                Reassign Session to Different Coach
              </h4>
              <div className="flex items-center gap-2">
                <select
                  value={reassignTrainerIdInput}
                  onChange={(e) => setReassignTrainerIdInput(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-neutral-300 text-xs font-bold uppercase bg-white"
                >
                  {trainers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.location})
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    adminReassignTrainer(selectedBookingForAction.id, reassignTrainerIdInput);
                    showToast(`Reassigned booking to new trainer.`);
                    setSelectedBookingForAction(null);
                  }}
                  className="px-4 py-1.5 bg-[#FF6A00] text-white text-xs font-bold uppercase shrink-0"
                >
                  Transfer
                </button>
              </div>
            </div>

            {/* Status Quick Buttons */}
            <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  adminUpdateBookingStatus(selectedBookingForAction.id, 'completed');
                  showToast(`Marked session as Completed.`);
                  setSelectedBookingForAction(null);
                }}
                className="px-3 py-1.5 bg-green-700 text-white font-bold uppercase"
              >
                Mark Completed
              </button>

              <button
                onClick={() => {
                  adminUpdateBookingStatus(selectedBookingForAction.id, 'cancelled');
                  showToast(`Cancelled session and refunded credit.`);
                  setSelectedBookingForAction(null);
                }}
                className="px-3 py-1.5 bg-red-600 text-white font-bold uppercase"
              >
                Cancel Session
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: CREATE MANUAL IN-HOME BOOKING */}
      {/* ============================================================ */}
      {isManualBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border-4 border-black max-w-lg w-full p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-[#FF6A00]">
                  CONCIERGE DISPATCH
                </span>
                <h3 className="font-editorial text-xl font-black uppercase text-black mt-0.5">
                  Book In-Home Session for Client
                </h3>
              </div>

              <button
                onClick={() => setIsManualBookingModalOpen(false)}
                className="p-1 text-neutral-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-neutral-700 block mb-1">Select Client</label>
                <select
                  value={manualBookingForm.clientId}
                  onChange={(e) => {
                    const c = clients.find((client) => client.id === e.target.value);
                    setManualBookingForm({
                      ...manualBookingForm,
                      clientId: e.target.value,
                      location: c?.fitnessProfile?.serviceAddress || manualBookingForm.location,
                    });
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 font-bold bg-white"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Select Coach</label>
                <select
                  value={manualBookingForm.trainerId}
                  onChange={(e) => setManualBookingForm({ ...manualBookingForm, trainerId: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 font-bold bg-white"
                >
                  {trainers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.location})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-neutral-700 block">Date & Timing</label>
                  <div className="flex items-center gap-1">
                    {[
                      { label: 'Tomorrow', date: '2026-09-24' },
                      { label: 'Fri 25', date: '2026-09-25' },
                      { label: 'Sat 26', date: '2026-09-26' },
                      { label: 'Sun 27', date: '2026-09-27' },
                    ].map((d) => (
                      <button
                        key={d.date}
                        type="button"
                        onClick={() => setManualBookingForm({ ...manualBookingForm, date: d.date })}
                        className={`px-1.5 py-0.5 text-[9px] font-black uppercase transition border ${
                          manualBookingForm.date === d.date
                            ? 'bg-[#FF6A00] text-white border-[#FF6A00]'
                            : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="date"
                      value={manualBookingForm.date}
                      onChange={(e) => setManualBookingForm({ ...manualBookingForm, date: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 font-bold"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={manualBookingForm.timeSlot}
                      onChange={(e) => setManualBookingForm({ ...manualBookingForm, timeSlot: e.target.value })}
                      placeholder="e.g. 07:00 AM – 08:00 AM"
                      className="w-full px-3 py-2 border border-neutral-300 font-bold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Service Address</label>
                <input
                  type="text"
                  value={manualBookingForm.location}
                  onChange={(e) => setManualBookingForm({ ...manualBookingForm, location: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Session Type</label>
                <select
                  value={manualBookingForm.sessionType}
                  onChange={(e) => setManualBookingForm({ ...manualBookingForm, sessionType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-neutral-300 font-bold bg-white"
                >
                  <option value="Personal Training">Personal Training (Home)</option>
                  <option value="Trial Session">Trial Session (₹499)</option>
                  <option value="Consultation">In-Person Consultation</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsManualBookingModalOpen(false)}
                className="px-4 py-2 bg-neutral-200 text-xs font-bold uppercase"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const targetClient = clients.find((c) => c.id === manualBookingForm.clientId) || clients[0];
                  const targetTrainer = trainers.find((t) => t.id === manualBookingForm.trainerId) || trainers[0];

                  adminCreateManualBooking({
                    clientId: targetClient.id,
                    clientName: targetClient.name,
                    trainerId: targetTrainer.id,
                    trainerName: targetTrainer.name,
                    trainerPhoto: targetTrainer.photo,
                    sessionType: manualBookingForm.sessionType,
                    date: manualBookingForm.date,
                    timeSlot: manualBookingForm.timeSlot,
                    durationMinutes: manualBookingForm.durationMinutes,
                    location: manualBookingForm.location,
                    status: 'confirmed',
                    notesFromTrainer: manualBookingForm.notesFromTrainer,
                  });

                  showToast(`Booked in-home session for ${targetClient.name} with ${targetTrainer.name}!`);
                  setIsManualBookingModalOpen(false);
                }}
                className="px-5 py-2 bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs font-black uppercase tracking-wider"
              >
                Confirm & Dispatch
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
