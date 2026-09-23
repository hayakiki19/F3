import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SessionBooking } from '../../types';
import { X, Clock, Calendar, AlertCircle, ArrowRight, Check } from 'lucide-react';

interface Props {
  booking: SessionBooking | null;
  onClose: () => void;
}

export const TimeChangeModal: React.FC<Props> = ({ booking, onClose }) => {
  const { requestTimeChange } = useApp();

  const [newDate, setNewDate] = useState('2026-09-25');
  const [newSlot, setNewSlot] = useState('06:00 PM – 07:00 PM');
  const [note, setNote] = useState('Work schedule shifted, requesting evening slot.');

  if (!booking) return null;

  const alternativeSlots = [
    { date: '2026-09-24', day: 'Thursday', time: '06:00 PM – 07:00 PM' },
    { date: '2026-09-24', day: 'Thursday', time: '08:00 PM – 09:00 PM' },
    { date: '2026-09-25', day: 'Friday', time: '06:30 AM – 07:30 AM' },
    { date: '2026-09-25', day: 'Friday', time: '06:00 PM – 07:00 PM' },
    { date: '2026-09-25', day: 'Friday', time: '07:30 PM – 08:30 PM' },
    { date: '2026-09-26', day: 'Saturday', time: '08:30 AM – 09:30 AM' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestTimeChange(booking.id, newDate, newSlot, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative bg-white border-2 border-black w-full max-w-lg shadow-2xl flex flex-col my-auto overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0A0A0A] text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FF6A00]" />
            <h3 className="font-editorial text-lg font-black uppercase text-white tracking-tight">
              REQUEST TIME CHANGE
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
          
          {/* Current Booking Overview */}
          <div className="bg-neutral-50 border border-neutral-300 p-4 text-xs space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
              CURRENT RESERVATION
            </span>
            <div className="flex justify-between font-bold text-neutral-900">
              <span>{booking.date} · {booking.timeSlot}</span>
              <span className="text-[#FF6A00] font-black">{booking.trainerName}</span>
            </div>
          </div>

          {/* Select Alternative Slot */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
              Select Preferred Alternative Slot:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {alternativeSlots.map((slot, idx) => {
                const isSelected = newDate === slot.date && newSlot === slot.time;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setNewDate(slot.date);
                      setNewSlot(slot.time);
                    }}
                    className={`p-3 border-2 cursor-pointer transition text-xs ${
                      isSelected
                        ? 'border-[#FF6A00] bg-[#FF6A00]/5 font-black text-black'
                        : 'border-neutral-200 hover:border-black text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black uppercase">{slot.day}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#FF6A00]" />}
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{slot.date}</p>
                    <p className="text-xs font-bold text-black mt-1">{slot.time}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Note to coach */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
              Reason / Message for Trainer (Optional)
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2.5 bg-neutral-50 border border-neutral-300 text-xs font-medium text-black focus:outline-none focus:border-black"
            />
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 text-[11px] text-blue-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Reschedule requests are sent directly to {booking.trainerName} for confirmation. Your original time slot remains held until confirmed.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-neutral-300 text-xs font-bold uppercase tracking-wider text-neutral-700 hover:border-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs font-black uppercase tracking-wider transition shadow-sm flex items-center gap-1.5"
            >
              <span>SUBMIT REQUEST</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
