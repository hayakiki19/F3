import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SessionBooking } from '../../types';
import { InteractiveCalendar } from '../common/InteractiveCalendar';
import { TimeChangeModal } from './TimeChangeModal';
import { CancelSessionModal } from './CancelSessionModal';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  HelpCircle,
  Plus,
  List,
  CalendarDays,
  ArrowRight,
  Shield,
} from 'lucide-react';

export const ClientSchedule: React.FC = () => {
  const { user, bookings, openBookingModal } = useApp();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [calendarSelectedDate, setCalendarSelectedDate] = useState<string>('2026-09-24');
  const [selectedBookingForReschedule, setSelectedBookingForReschedule] = useState<SessionBooking | null>(null);
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<SessionBooking | null>(null);
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<SessionBooking | null>(null);

  if (!user) return null;

  const clientBookings = bookings.filter((b) => b.clientId === user.id);
  const upcomingBookings = clientBookings.filter((b) => b.status === 'confirmed' || b.status === 'reschedule_pending');
  const pastBookings = clientBookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');

  // Metadata for user's interactive calendar
  const userCalendarMeta: Record<string, { badgeText: string; badgeColor: 'green' | 'amber' | 'blue' | 'neutral'; itemsCount: number }> = {};
  clientBookings.forEach((b) => {
    const isPending = b.status === 'reschedule_pending';
    const isCompleted = b.status === 'completed';
    const isConfirmed = b.status === 'confirmed';
    userCalendarMeta[b.date] = {
      badgeText: isPending ? 'Change Req' : isCompleted ? 'Completed' : 'Home Session',
      badgeColor: isPending ? 'amber' : isCompleted ? 'blue' : 'green',
      itemsCount: 1,
    };
  });

  const selectedDateBookings = clientBookings.filter((b) => b.date === calendarSelectedDate);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6A00]">
            HOME SESSIONS
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black tracking-tight">
            Upcoming Schedule
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Manage your booked in-home training dates, request reschedule slots, or review past session feedback.
          </p>
        </div>

        <button
          onClick={() => openBookingModal(user.activePlan?.assignedTrainerId, 'Personal Training')}
          className="bg-[#0A0A0A] hover:bg-[#FF6A00] text-white px-5 py-2.5 text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>BOOK NEW SESSION</span>
        </button>
      </div>

      {/* Tabs & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider transition border-b-2 ${
              activeTab === 'upcoming'
                ? 'border-[#FF6A00] text-black font-black'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            Upcoming Sessions ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider transition border-b-2 ${
              activeTab === 'past'
                ? 'border-[#FF6A00] text-black font-black'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            Past Sessions & Notes ({pastBookings.length})
          </button>
        </div>

        {/* View Mode Toggle for Upcoming */}
        {activeTab === 'upcoming' && (
          <div className="flex items-center gap-1 pb-2 sm:pb-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 mr-1.5">
              VIEW:
            </span>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 ${
                viewMode === 'calendar'
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 ${
                viewMode === 'list'
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>
        )}
      </div>

      {/* UPCOMING SESSIONS */}
      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          {viewMode === 'calendar' ? (
            /* Interactive Calendar View for Client */
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Main Interactive Calendar Grid */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-editorial text-xl font-black uppercase text-black">
                        Interactive Training Calendar
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Green dates indicate your confirmed in-home sessions. Click any date to view or book.
                      </p>
                    </div>
                  </div>

                  <InteractiveCalendar
                    selectedDate={calendarSelectedDate}
                    onSelectDate={(d) => setCalendarSelectedDate(d)}
                    size="standard"
                    dateMetadata={userCalendarMeta}
                  />

                  {/* Legend */}
                  <div className="flex flex-wrap items-center gap-4 p-3 bg-neutral-50 border border-neutral-200 text-xs">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">Legend:</span>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold">
                      <span className="w-2.5 h-2.5 bg-green-600 rounded-none inline-block"></span>
                      <span>Confirmed Home Session</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold">
                      <span className="w-2.5 h-2.5 bg-amber-500 rounded-none inline-block"></span>
                      <span>Reschedule In Review</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold">
                      <span className="w-2.5 h-2.5 bg-[#FF6A00] rounded-none inline-block"></span>
                      <span>Selected Date</span>
                    </div>
                  </div>
                </div>

                {/* Date Inspection / Selected Day Card */}
                <div className="lg:col-span-5 bg-white border-2 border-black p-5 space-y-4">
                  <div className="border-b border-neutral-200 pb-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                        DAY DETAILS
                      </span>
                      <h4 className="font-editorial text-lg font-black uppercase text-black">
                        {new Date(calendarSelectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </h4>
                    </div>
                    {calendarSelectedDate === '2026-09-23' && (
                      <span className="px-2 py-0.5 bg-[#FF6A00] text-white text-[10px] font-black uppercase">
                        TODAY
                      </span>
                    )}
                  </div>

                  {selectedDateBookings.length > 0 ? (
                    <div className="space-y-4">
                      {selectedDateBookings.map((session) => {
                        const isPending = session.status === 'reschedule_pending';
                        return (
                          <div key={session.id} className="p-4 bg-neutral-50 border-2 border-black space-y-3">
                            <div className="flex items-center justify-between">
                              <span
                                className={`px-2 py-0.5 text-[10px] font-black uppercase ${
                                  isPending
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : session.status === 'confirmed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-neutral-200 text-black'
                                }`}
                              >
                                {isPending ? 'Change Pending' : session.status}
                              </span>
                              <span className="font-editorial text-xl font-black text-black">
                                {session.timeSlot}
                              </span>
                            </div>

                            <div className="space-y-1 text-xs">
                              <div className="flex items-center gap-2">
                                <User className="w-3.5 h-3.5 text-[#FF6A00]" />
                                <span className="font-black text-black">Coach {session.trainerName}</span>
                              </div>
                              <div className="flex items-center gap-2 text-neutral-600">
                                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                                <span className="truncate">{session.location}</span>
                              </div>
                            </div>

                            {session.notesFromTrainer && (
                              <div className="p-2 bg-white border border-neutral-200 text-[11px] text-neutral-700 italic">
                                "{session.notesFromTrainer}"
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-200">
                              <button
                                disabled={isPending}
                                onClick={() => setSelectedBookingForReschedule(session)}
                                className="w-full py-1.5 border border-black hover:bg-black hover:text-white text-black text-[11px] font-black uppercase tracking-wider transition disabled:opacity-50"
                              >
                                Reschedule
                              </button>
                              <button
                                onClick={() => setSelectedBookingForDetails(session)}
                                className="w-full py-1.5 bg-neutral-200 hover:bg-neutral-300 text-black text-[11px] font-bold uppercase transition"
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-8 text-center space-y-3 bg-neutral-50 border border-dashed border-neutral-300 p-4">
                      <Calendar className="w-8 h-8 text-neutral-400 mx-auto" />
                      <div>
                        <p className="text-xs font-bold text-neutral-800">
                          No Workout Scheduled on This Day
                        </p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          Want Coach {user.activePlan?.assignedTrainerName || 'your trainer'} to come to your residence?
                        </p>
                      </div>

                      <button
                        onClick={() => openBookingModal(user.activePlan?.assignedTrainerId, 'Personal Training')}
                        className="px-4 py-2 bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs font-black uppercase tracking-wider transition inline-flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Book Workout on This Date</span>
                      </button>
                    </div>
                  )}

                  {/* Summary of Upcoming Appointments */}
                  <div className="pt-3 border-t border-neutral-200">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-2">
                      ALL UPCOMING DATES ({upcomingBookings.length})
                    </span>
                    <div className="space-y-1.5">
                      {upcomingBookings.map((b) => (
                        <div
                          key={b.id}
                          onClick={() => setCalendarSelectedDate(b.date)}
                          className={`p-2 border flex items-center justify-between cursor-pointer transition text-xs ${
                            calendarSelectedDate === b.date
                              ? 'border-black bg-neutral-100 font-bold'
                              : 'border-neutral-200 hover:border-black'
                          }`}
                        >
                          <div>
                            <span className="font-bold text-black">{b.date}</span>
                            <span className="text-neutral-500 ml-1.5">· {b.timeSlot}</span>
                          </div>
                          <span className="text-[10px] font-black uppercase text-[#FF6A00]">
                            {b.trainerName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* Traditional List View for Client */
            <div className="space-y-4">
              {upcomingBookings.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-neutral-300 bg-neutral-50">
                  <Calendar className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-neutral-800">You have no upcoming sessions scheduled.</p>
                  <p className="text-xs text-neutral-500 mt-1">Use your remaining sessions to book your next home workout.</p>
                  <button
                    onClick={() => openBookingModal(user.activePlan?.assignedTrainerId, 'Personal Training')}
                    className="mt-4 px-6 py-2.5 bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider"
                  >
                    BOOK A SESSION NOW
                  </button>
                </div>
              ) : (
                upcomingBookings.map((session) => {
                  const isTomorrow = session.date === '2026-09-24';
                  const isPending = session.status === 'reschedule_pending';

                  return (
                    <div
                      key={session.id}
                      className="bg-white border-2 border-black p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-[#FF6A00] transition"
                    >
                      {/* Left Info */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 bg-[#0A0A0A] text-white text-[10px] font-black uppercase tracking-wider">
                            {isTomorrow ? 'TOMORROW' : session.date}
                          </span>

                          {isPending ? (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider border border-amber-300 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 text-amber-600" />
                              <span>Change Request Pending</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-black uppercase tracking-wider border border-green-300 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span>Confirmed</span>
                            </span>
                          )}

                          <span className="text-xs text-neutral-500 font-bold">
                            · {session.sessionType}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-editorial text-2xl sm:text-3xl font-black uppercase text-black">
                            {session.timeSlot}
                          </h3>
                          <p className="text-xs text-neutral-600 mt-0.5">
                            60 Minutes Personalized Training
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700 pt-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-neutral-400 shrink-0" />
                            <span>Trainer: <strong className="text-black">{session.trainerName}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                            <span className="truncate">{session.location}</span>
                          </div>
                        </div>

                        {isPending && session.changeRequest && (
                          <div className="p-3 bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
                            Requested new slot: <strong>{session.changeRequest.preferredDate} ({session.changeRequest.preferredTime})</strong>. Awaiting coach confirmation.
                          </div>
                        )}
                      </div>

                      {/* Right Actions */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0">
                        <button
                          onClick={() => setSelectedBookingForDetails(session)}
                          className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-black uppercase tracking-wider transition"
                        >
                          VIEW DETAILS
                        </button>

                        <button
                          disabled={isPending}
                          onClick={() => setSelectedBookingForReschedule(session)}
                          className="px-4 py-2.5 border border-black hover:bg-black hover:text-white text-black text-xs font-black uppercase tracking-wider transition disabled:opacity-50"
                        >
                          REQUEST TIME CHANGE
                        </button>

                        <button
                          onClick={() => setSelectedBookingForCancel(session)}
                          className="px-4 py-2.5 text-neutral-500 hover:text-red-600 text-xs font-bold uppercase tracking-wider transition text-center"
                        >
                          CANCEL SESSION
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}

      {/* PAST SESSIONS LIST */}
      {activeTab === 'past' && (
        <div className="space-y-4">
          {pastBookings.length === 0 ? (
            <div className="p-12 text-center text-neutral-400 text-xs">
              No completed sessions recorded yet.
            </div>
          ) : (
            pastBookings.map((session) => (
              <div
                key={session.id}
                className="bg-neutral-50 border border-neutral-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black uppercase text-neutral-500">
                      {session.date} · {session.timeSlot}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 ${
                        session.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {session.status}
                    </span>
                  </div>

                  <h4 className="font-editorial text-lg font-black uppercase text-black">
                    {session.sessionType} with {session.trainerName}
                  </h4>

                  {session.notesFromTrainer && (
                    <div className="mt-2 p-2.5 bg-white border border-neutral-200 text-xs text-neutral-700 italic">
                      "{session.notesFromTrainer}"
                    </div>
                  )}
                </div>

                <div className="text-xs text-neutral-500">
                  <span>Home Session · 60m</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Reschedule Modal */}
      {selectedBookingForReschedule && (
        <TimeChangeModal
          booking={selectedBookingForReschedule}
          onClose={() => setSelectedBookingForReschedule(null)}
        />
      )}

      {/* Cancellation Modal */}
      {selectedBookingForCancel && (
        <CancelSessionModal
          booking={selectedBookingForCancel}
          onClose={() => setSelectedBookingForCancel(null)}
        />
      )}

      {/* Details View Modal */}
      {selectedBookingForDetails && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-editorial text-xl font-black uppercase">Home Session Details</h3>
              <button onClick={() => setSelectedBookingForDetails(null)} className="text-neutral-500 hover:text-black">
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong>Coach:</strong> {selectedBookingForDetails.trainerName}</p>
              <p><strong>Date & Time:</strong> {selectedBookingForDetails.date} · {selectedBookingForDetails.timeSlot}</p>
              <p><strong>Location:</strong> {selectedBookingForDetails.location}</p>
              <p><strong>Equipment Brought by Coach:</strong> Adjustable Dumbbells, TRX, Resistance Loop Bands, Sanitized Mat</p>
              <p><strong>Client Preparation:</strong> Please wear athletic shoes, keep water nearby, and ensure a 2x2 meter floor area is accessible.</p>
            </div>
            <button
              onClick={() => setSelectedBookingForDetails(null)}
              className="w-full py-2.5 bg-black text-white text-xs font-black uppercase"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
