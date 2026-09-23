import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User, Shield, Check, ArrowRight, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalInitialTab,
    loginAsClient,
    loginAsTrainer,
    loginAsAdmin,
  } = useApp();

  const [tab, setTab] = useState<'login' | 'signup'>(authModalInitialTab);
  const [email, setEmail] = useState('rahul.verma@example.com');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Rahul Verma');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'login') {
      loginAsClient('rahul');
    } else {
      loginAsClient('custom', { name, email });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Account Access"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-150"
    >
      <div className="relative bg-white border-2 border-black w-full max-w-md shadow-2xl flex flex-col rounded-t-3xl sm:rounded-none max-h-[92vh] sm:max-h-[90vh] overflow-hidden my-0 sm:my-auto">
        
        {/* Mobile grab handle */}
        <div
          className="w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mt-2.5 mb-1 sm:hidden cursor-pointer"
          onClick={closeAuthModal}
        />

        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#0A0A0A] text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FF6A00]"></span>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#8DD8FF]">
              FITNESS PRO ACADEMY ACCESS
            </span>
          </div>
          <button
            onClick={closeAuthModal}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center p-1 text-neutral-400 hover:text-white transition rounded"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="grid grid-cols-2 border-b border-neutral-200">
          <button
            onClick={() => setTab('login')}
            className={`min-h-[44px] py-3 text-xs font-black uppercase tracking-wider transition ${
              tab === 'login'
                ? 'bg-white text-black border-b-2 border-[#FF6A00]'
                : 'bg-neutral-100 text-neutral-500 hover:text-black'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`min-h-[44px] py-3 text-xs font-black uppercase tracking-wider transition ${
              tab === 'signup'
                ? 'bg-white text-black border-b-2 border-[#FF6A00]'
                : 'bg-neutral-100 text-neutral-500 hover:text-black'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-8 overflow-y-auto overscroll-contain pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
          
          {/* Quick Demo Personas Bar */}
          <div className="mb-5 p-3 bg-neutral-50 border border-neutral-300">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 block mb-2">
              ⚡ Instant 1-Click Demo Login
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => loginAsClient('rahul')}
                className="p-2.5 bg-white border border-neutral-300 hover:border-black text-left text-xs font-bold text-black min-h-[44px] active:scale-95 transition"
              >
                <div className="font-black text-xs text-black">Rahul Verma</div>
                <div className="text-[10px] text-[#FF6A00] font-semibold">Active Plan Client</div>
              </button>

              <button
                type="button"
                onClick={() => loginAsClient('anita')}
                className="p-2.5 bg-white border border-neutral-300 hover:border-black text-left text-xs font-bold text-black min-h-[44px] active:scale-95 transition"
              >
                <div className="font-black text-xs text-black">Anita Roy</div>
                <div className="text-[10px] text-neutral-500 font-semibold">New Client</div>
              </button>

              <button
                type="button"
                onClick={() => loginAsTrainer()}
                className="p-2.5 bg-white border border-neutral-300 hover:border-black text-left text-xs font-bold text-black min-h-[44px] active:scale-95 transition"
              >
                <div className="font-black text-xs text-black">Arjun Sharma</div>
                <div className="text-[10px] text-neutral-500 font-semibold">Trainer Portal</div>
              </button>

              <button
                type="button"
                onClick={() => loginAsAdmin()}
                className="p-2.5 bg-white border border-neutral-300 hover:border-black text-left text-xs font-bold text-black min-h-[44px] active:scale-95 transition"
              >
                <div className="font-black text-xs text-black">Sarah Director</div>
                <div className="text-[10px] text-neutral-500 font-semibold">Admin Panel</div>
              </button>
            </div>
          </div>

          {/* Google 1-Click */}
          <button
            type="button"
            onClick={() => loginAsClient('rahul')}
            className="w-full py-3 px-4 border border-neutral-300 hover:border-black font-bold text-xs uppercase tracking-wider text-black flex items-center justify-center gap-2 mb-4 bg-white transition min-h-[44px] active:scale-95"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-2 text-neutral-400 font-bold">Or with Email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {tab === 'signup' && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5 sm:top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 sm:py-2 bg-neutral-50 border border-neutral-300 text-base sm:text-xs font-bold text-black focus:outline-none focus:border-black rounded-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5 sm:top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 sm:py-2 bg-neutral-50 border border-neutral-300 text-base sm:text-xs font-bold text-black focus:outline-none focus:border-black rounded-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5 sm:top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 sm:py-2 bg-neutral-50 border border-neutral-300 text-base sm:text-xs font-mono font-bold text-black focus:outline-none focus:border-black rounded-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF6A00] hover:bg-[#e05d00] text-white py-3.5 text-xs font-black uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 mt-4 min-h-[48px] active:scale-95"
            >
              <span>{tab === 'login' ? 'SIGN IN TO CLIENT DASHBOARD' : 'REGISTER & START TRAINING'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
