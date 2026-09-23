import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SessionBooking } from '../../types';
import { X, AlertTriangle, CheckCircle, ShieldAlert, ArrowLeft } from 'lucide-react';

interface Props {
  booking: SessionBooking | null;
  onClose: () => void;
}

export const CancelSessionModal: React.FC<Props> = ({ booking, onClose }) => {
  const { cancelBooking } = useApp();
  const [cancelled, setCancelled] = useState(false);
  const [resultMsg, setResultMsg] = useState('');

  if (!booking) return null;

  const handleConfirmCancel = () => {
    const res = cancelBooking(booking.id);
    if (res.success) {
      setCancelled(true);
      setResultMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative bg-white border-2 border-black w-full max-w-md shadow-2xl flex flex-col my-auto overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#0A0A0A] text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h3 className="font-editorial text-lg font-black uppercase text-white tracking-tight">
              CANCEL UPCOMING TRAINING
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7">
          {cancelled ? (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95">
              <div className="w-14 h-14 bg-neutral-100 text-black border border-black rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-[#FF6A00]" />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6A00]">
                  CANCELLATION CONFIRMED
                </span>
                <h4 className="font-editorial text-2xl font-black uppercase text-black mt-1">
                  Session Cancelled
                </h4>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  {resultMsg}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-[#0A0A0A] hover:bg-black text-white text-xs font-black uppercase tracking-wider transition"
                >
                  RETURN TO SCHEDULE
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Session summary */}
              <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs">
                <span className="text-[10px] text-neutral-400 font-bold uppercase block">
                  Session to Cancel:
                </span>
                <p className="font-black text-black mt-0.5">
                  {booking.sessionType} with {booking.trainerName}
                </p>
                <p className="text-neutral-600 mt-0.5">
                  {booking.date} · {booking.timeSlot}
                </p>
              </div>

              {/* Cancellation Policy Box */}
              <div className="p-4 bg-amber-50/70 border-2 border-amber-300 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Cancellation Policy</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed font-normal">
                  Cancellations requested <strong>12+ hours prior</strong> to the scheduled start time will immediately restore <strong>1 session credit</strong> back to your active training plan balance.
                </p>
                <p className="text-[11px] text-amber-800/80">
                  Your trainer ({booking.trainerName}) will be notified and this time slot will be opened for other clients.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 border border-neutral-300 text-xs font-black uppercase tracking-wider text-neutral-700 hover:border-black transition"
                >
                  KEEP SESSION
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition shadow-sm"
                >
                  CONFIRM CANCELLATION
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
