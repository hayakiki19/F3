import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Smartphone, Sparkles, X, ArrowRight } from 'lucide-react';

export const DownloadAppFloatingPrompt: React.FC = () => {
  const { currentView, openDownloadAppModal, isDownloadAppModalOpen } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('fp_app_prompt_dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show floating pill after 3.5 seconds on public site
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('fp_app_prompt_dismissed', 'true');
  };

  // Only display on public view when modal is not already open and not dismissed
  if (currentView !== 'public' || isDismissed || !isVisible || isDownloadAppModalOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-3 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div
        onClick={openDownloadAppModal}
        className="cursor-pointer bg-neutral-950 text-white rounded-2xl p-3 sm:p-3.5 shadow-2xl border-2 border-black flex items-center gap-3 hover:bg-black transition-all hover:scale-102 active:scale-98 max-w-[340px] sm:max-w-sm group"
        role="button"
        tabIndex={0}
        aria-label="Download Fitness Pro Mobile App"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            openDownloadAppModal();
          }
        }}
      >
        {/* App Icon with pulse ring */}
        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#e05d00] text-white flex items-center justify-center shrink-0 shadow-sm">
          <Smartphone className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6A00] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Get Mobile App</span>
            </span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.2 rounded">
              ₹500 OFF
            </span>
          </div>
          <p className="text-xs font-black uppercase tracking-tight text-white truncate">
            Install Fitness Pro App
          </p>
          <p className="text-[10px] text-neutral-400 truncate">
            Live GPS tracking &amp; doorstep workouts
          </p>
        </div>

        {/* Action arrow */}
        <div className="w-7 h-7 rounded-lg bg-neutral-800 group-hover:bg-[#FF6A00] flex items-center justify-center text-neutral-300 group-hover:text-white transition shrink-0">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="w-6 h-6 -mr-1 rounded-full text-neutral-400 hover:text-white flex items-center justify-center transition"
          aria-label="Dismiss app download prompt"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
