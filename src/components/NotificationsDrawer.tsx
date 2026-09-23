import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Bell, Check, Calendar, Dumbbell, AlertCircle, Sparkles } from 'lucide-react';

export const NotificationsDrawer: React.FC = () => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markNotificationRead,
    clearAllNotifications,
  } = useApp();

  if (!isNotificationsOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="w-4 h-4 text-green-600" />;
      case 'workout':
        return <Dumbbell className="w-4 h-4 text-[#FF6A00]" />;
      case 'reminder':
        return <AlertCircle className="w-4 h-4 text-[#8DD8FF]" />;
      case 'plan':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      default:
        return <Bell className="w-4 h-4 text-neutral-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l-2 border-black animate-in slide-in-from-right duration-200">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#0A0A0A] text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#FF6A00]" />
            <h3 className="font-editorial text-lg font-black uppercase text-white tracking-tight">
              Activity & Notifications
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearAllNotifications}
              className="text-[11px] font-bold text-neutral-400 hover:text-white uppercase tracking-wider underline mr-2"
            >
              Mark all read
            </button>
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1 text-neutral-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 text-xs">
              No notifications yet.
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => markNotificationRead(item.id)}
                className={`p-3.5 border transition cursor-pointer ${
                  item.read
                    ? 'bg-neutral-50 border-neutral-200 opacity-75'
                    : 'bg-white border-black border-l-4 border-l-[#FF6A00] shadow-xs'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 bg-neutral-100 border border-neutral-200 shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase text-black leading-tight">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-neutral-400 font-medium">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-100 border-t border-neutral-200 text-center">
          <p className="text-[11px] text-neutral-500 font-medium">
            Automated session reminders are also sent to your registered phone via SMS & WhatsApp.
          </p>
        </div>

      </div>
    </div>
  );
};
