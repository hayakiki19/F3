import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Smartphone,
  QrCode,
  Download,
  Share2,
  Check,
  Copy,
  Send,
  Star,
  ShieldCheck,
  Zap,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const DownloadAppModal: React.FC = () => {
  const { isDownloadAppModalOpen, closeDownloadAppModal } = useApp();

  const [activeTab, setActiveTab] = useState<'qr' | 'sms' | 'install'>('qr');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installProgress, setInstallProgress] = useState<number | null>(null);

  // Capture PWA beforeinstallprompt if available
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDownloadAppModalOpen) {
        closeDownloadAppModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDownloadAppModalOpen, closeDownloadAppModal]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isDownloadAppModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDownloadAppModalOpen]);

  if (!isDownloadAppModalOpen) return null;

  const currentAppUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fitnesspro.app';

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Simulate fast download / install package
      setInstallProgress(10);
      const interval = setInterval(() => {
        setInstallProgress((prev) => {
          if (prev === null || prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsInstalled(true);
              setInstallProgress(null);
            }, 500);
            return 100;
          }
          return prev + 25;
        });
      }, 250);
    }
  };

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) return;
    setIsSent(true);
    setTimeout(() => {
      // Auto reset after 8 seconds
      setIsSent(false);
    }, 8000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentAppUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-app-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150"
      onClick={closeDownloadAppModal}
    >
      <div
        className="relative bg-white border-2 border-black w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-neutral-950 text-white px-5 sm:px-8 py-5 border-b border-neutral-800 flex items-start justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-[#FF6A00] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" />
              <span>Doorstep Mobile Experience</span>
            </div>
            <h2 id="download-app-title" className="font-editorial text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Get the Fitness Pro App
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-medium max-w-md">
              Book doorstep trainers, live GPS tracking, video form analysis, and workout biometrics on iOS & Android.
            </p>
          </div>

          <button
            type="button"
            onClick={closeDownloadAppModal}
            className="relative z-10 w-9 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition active:scale-95 border border-neutral-700"
            aria-label="Close download popup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Decorative subtle background pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-[#FF6A00]/10 to-transparent pointer-events-none" />
        </div>

        {/* Promo Voucher Highlight Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-[#FF6A00]/10 to-amber-500/10 border-b border-amber-200 px-5 sm:px-8 py-2.5 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-900 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse shrink-0"></span>
            <span>
              Exclusive App Perk: Get <strong>₹500 OFF</strong> on first booking with code:
            </span>
          </div>
          <span className="font-mono font-black uppercase text-xs bg-white text-black px-2.5 py-1 rounded-md border border-neutral-300 tracking-wider shadow-2xs shrink-0">
            APPFIT500
          </span>
        </div>

        <div className="p-5 sm:p-8 space-y-6">
          {/* Navigation Tabs for Download Methods */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-100 rounded-xl border border-neutral-200">
            <button
              type="button"
              onClick={() => setActiveTab('qr')}
              className={`py-2 px-3 text-xs font-black uppercase tracking-wider rounded-lg transition flex items-center justify-center gap-1.5 ${
                activeTab === 'qr'
                  ? 'bg-white text-black shadow-xs border border-neutral-200 font-black'
                  : 'text-neutral-600 hover:text-black font-bold'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span>Scan QR</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sms')}
              className={`py-2 px-3 text-xs font-black uppercase tracking-wider rounded-lg transition flex items-center justify-center gap-1.5 ${
                activeTab === 'sms'
                  ? 'bg-white text-black shadow-xs border border-neutral-200 font-black'
                  : 'text-neutral-600 hover:text-black font-bold'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span>SMS Link</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('install')}
              className={`py-2 px-3 text-xs font-black uppercase tracking-wider rounded-lg transition flex items-center justify-center gap-1.5 ${
                activeTab === 'install'
                  ? 'bg-white text-black shadow-xs border border-neutral-200 font-black'
                  : 'text-neutral-600 hover:text-black font-bold'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span>Direct Install</span>
            </button>
          </div>

          {/* TAB 1: SCAN QR CODE */}
          {activeTab === 'qr' && (
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-neutral-50 p-5 rounded-2xl border border-neutral-200 animate-in fade-in">
              {/* QR Code Container */}
              <div className="bg-white p-3 rounded-xl border-2 border-black shadow-md shrink-0 flex flex-col items-center">
                <svg
                  className="w-36 h-36 sm:w-40 sm:h-40"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Fitness Pro Mobile App QR Code"
                >
                  <rect width="100" height="100" fill="white" />
                  {/* Outer Frame Position markers */}
                  <rect x="6" y="6" width="26" height="26" stroke="black" strokeWidth="4" fill="white" rx="3" />
                  <rect x="13" y="13" width="12" height="12" fill="black" rx="2" />

                  <rect x="68" y="6" width="26" height="26" stroke="black" strokeWidth="4" fill="white" rx="3" />
                  <rect x="75" y="13" width="12" height="12" fill="black" rx="2" />

                  <rect x="6" y="68" width="26" height="26" stroke="black" strokeWidth="4" fill="white" rx="3" />
                  <rect x="13" y="75" width="12" height="12" fill="black" rx="2" />

                  {/* QR Pattern Blocks */}
                  <rect x="38" y="10" width="8" height="8" fill="black" rx="1" />
                  <rect x="52" y="10" width="8" height="8" fill="black" rx="1" />
                  <rect x="44" y="24" width="12" height="8" fill="black" rx="1" />
                  <rect x="10" y="38" width="8" height="12" fill="black" rx="1" />
                  <rect x="24" y="38" width="8" height="8" fill="black" rx="1" />
                  <rect x="74" y="38" width="16" height="8" fill="black" rx="1" />
                  <rect x="38" y="52" width="14" height="8" fill="black" rx="1" />
                  <rect x="58" y="52" width="10" height="12" fill="black" rx="1" />
                  <rect x="74" y="52" width="8" height="8" fill="black" rx="1" />
                  <rect x="38" y="68" width="8" height="14" fill="black" rx="1" />
                  <rect x="52" y="70" width="14" height="8" fill="black" rx="1" />
                  <rect x="72" y="68" width="18" height="8" fill="black" rx="1" />
                  <rect x="72" y="82" width="8" height="8" fill="black" rx="1" />
                  <rect x="84" y="82" width="8" height="8" fill="black" rx="1" />

                  {/* Center Brand Badge */}
                  <circle cx="50" cy="50" r="14" fill="#FF6A00" />
                  <path
                    d="M45 44H55M45 50H53M45 56H48"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider mt-1.5">
                  Point Camera Here
                </span>
              </div>

              {/* Instructions & Features */}
              <div className="space-y-3 flex-1 text-left">
                <div>
                  <h3 className="font-editorial text-lg font-black uppercase text-neutral-900">
                    Scan to Open on iPhone or Android
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Open your smartphone camera, aim at this QR code, and tap the yellow banner to launch the app instantly without taking phone storage.
                  </p>
                </div>

                <div className="space-y-2 pt-1 border-t border-neutral-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Works automatically on iOS Safari & Android Chrome</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant offline sync & workout logger enabled</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 rounded-lg text-xs font-black uppercase tracking-wider transition active:scale-95"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Link Copied!' : 'Copy Mobile Link'}</span>
                  </button>
                  <a
                    href={currentAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-neutral-600 hover:text-black text-xs font-black uppercase tracking-wider transition"
                  >
                    <span>Open in new tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SMS / WHATSAPP LINK */}
          {activeTab === 'sms' && (
            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-4 animate-in fade-in">
              <div>
                <h3 className="font-editorial text-lg font-black uppercase text-neutral-900">
                  Send App Download Link to Your Phone
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Enter your 10-digit mobile number and we’ll send a direct installation link and voucher code via SMS.
                </p>
              </div>

              {isSent ? (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-emerald-900">
                      Link Sent Successfully!
                    </h4>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      We’ve sent the direct install link to <strong>+91 {phoneNumber}</strong> along with your <strong>₹500 voucher (APPFIT500)</strong>. Check your messages.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendLink} className="space-y-3">
                  <div className="flex rounded-xl overflow-hidden border-2 border-neutral-300 focus-within:border-black transition bg-white shadow-2xs">
                    <div className="bg-neutral-100 px-3 py-2.5 text-xs font-black text-neutral-700 flex items-center border-r border-neutral-300 shrink-0">
                      🇮🇳 +91
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="98765 43210"
                      className="flex-1 px-3 py-2.5 text-xs sm:text-sm font-bold text-black outline-hidden"
                      required
                    />
                    <button
                      type="submit"
                      disabled={phoneNumber.length < 10}
                      className="bg-black hover:bg-[#FF6A00] disabled:opacity-40 disabled:hover:bg-black text-white px-4 sm:px-6 text-xs font-black uppercase tracking-wider transition active:scale-95 flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Link</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-500 font-medium">
                    Zero spam guaranteed. Only one text message will be sent with your secure install token.
                  </p>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: DIRECT INSTALL / PWA */}
          {activeTab === 'install' && (
            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-4 animate-in fade-in">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-editorial text-lg font-black uppercase text-neutral-900">
                    Direct Web App Installation
                  </h3>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Install Fitness Pro directly to your device desktop or home screen for fullscreen offline experience.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-black uppercase bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified PWA</span>
                </div>
              </div>

              {/* Progress or action button */}
              {isInstalled ? (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-1">
                  <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-xs font-black uppercase text-emerald-900">
                    Fitness Pro is installed on your device!
                  </p>
                  <p className="text-xs text-emerald-700">
                    You can launch it anytime directly from your applications or home screen.
                  </p>
                </div>
              ) : installProgress !== null ? (
                <div className="p-4 bg-white border border-neutral-300 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-black uppercase">
                    <span>Downloading App Shell...</span>
                    <span>{installProgress}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#FF6A00] h-full transition-all duration-200 rounded-full"
                      style={{ width: `${installProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Android / Desktop Chrome Button */}
                  <button
                    type="button"
                    onClick={handleNativeInstall}
                    className="p-3.5 bg-black hover:bg-[#FF6A00] text-white rounded-xl transition active:scale-98 flex items-center justify-between shadow-xs group"
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <Download className="w-5 h-5 text-[#FF6A00] group-hover:text-white transition" />
                      <div>
                        <span className="block text-xs font-black uppercase">Install Web APK</span>
                        <span className="block text-[10px] text-neutral-400 group-hover:text-white/80 transition">
                          Android & Chrome Desktop
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* iOS Safari Guide */}
                  <div className="p-3 bg-white border border-neutral-300 rounded-xl text-left space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-sky-600" />
                      <span className="text-xs font-black uppercase text-black">iPhone / Safari Users</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-tight">
                      Tap the <strong>Share</strong> button <Share2 className="w-3 h-3 inline mx-0.5" /> in Safari, then tap <strong>&quot;Add to Home Screen&quot;</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Key App Advantages Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-center space-y-1">
              <MapPin className="w-4 h-4 text-[#FF6A00] mx-auto" />
              <p className="text-[11px] font-black uppercase text-neutral-900">Doorstep GPS</p>
              <p className="text-[10px] text-neutral-500">Live trainer ETA</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-center space-y-1">
              <Clock className="w-4 h-4 text-[#FF6A00] mx-auto" />
              <p className="text-[11px] font-black uppercase text-neutral-900">1-Tap Reschedule</p>
              <p className="text-[10px] text-neutral-500">Zero cancellation fee</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-center space-y-1">
              <Zap className="w-4 h-4 text-[#FF6A00] mx-auto" />
              <p className="text-[11px] font-black uppercase text-neutral-900">Fast Booking</p>
              <p className="text-[10px] text-neutral-500">60-sec appointment</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-center space-y-1">
              <Star className="w-4 h-4 text-amber-500 mx-auto fill-amber-500" />
              <p className="text-[11px] font-black uppercase text-neutral-900">4.9 ★ Rated</p>
              <p className="text-[10px] text-neutral-500">15,000+ sessions</p>
            </div>
          </div>

          {/* Official Store Badges Row */}
          <div className="pt-2 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* iOS App Store Badge Simulation */}
              <button
                type="button"
                onClick={handleNativeInstall}
                className="bg-black hover:bg-neutral-800 text-white px-3.5 py-1.5 rounded-lg text-left flex items-center gap-2 transition active:scale-95 border border-black shadow-2xs"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.04-2.85 0-.15-.01-.3-.04-.44-.99.04-2.18.66-2.89 1.49-.55.63-.99 1.66-.99 2.7 0 .15.02.3.05.41 1.09.08 2.21-.56 2.83-1.31z" />
                </svg>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-neutral-400 leading-none">Download on the</span>
                  <span className="block text-xs font-black tracking-tight leading-none mt-0.5">App Store</span>
                </div>
              </button>

              {/* Google Play Badge Simulation */}
              <button
                type="button"
                onClick={handleNativeInstall}
                className="bg-black hover:bg-neutral-800 text-white px-3.5 py-1.5 rounded-lg text-left flex items-center gap-2 transition active:scale-95 border border-black shadow-2xs"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M3.61 1.81L13.88 12 3.61 22.19c-.36-.36-.61-.92-.61-1.69V3.5c0-.77.25-1.33.61-1.69z" />
                  <path fill="#FBBC04" d="M17.3 8.58l-3.42 3.42 3.42 3.42 3.88-2.24c.73-.42.73-1.94 0-2.36L17.3 8.58z" />
                  <path fill="#EA4335" d="M3.61 1.81l10.27 10.19 3.42-3.42L5.86 1.45c-.84-.48-1.74-.1-2.25.36z" />
                  <path fill="#34A853" d="M3.61 22.19l2.25.36 11.44-7.14-3.42-3.42L3.61 22.19z" />
                </svg>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-neutral-400 leading-none">Get it on</span>
                  <span className="block text-xs font-black tracking-tight leading-none mt-0.5">Google Play</span>
                </div>
              </button>
            </div>

            <button
              type="button"
              onClick={closeDownloadAppModal}
              className="text-xs font-bold text-neutral-500 hover:text-black uppercase tracking-wider"
            >
              Continue Browsing Web
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
