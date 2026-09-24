import React from 'react';
import { useApp } from '../context/AppContext';
import { Dumbbell, Instagram, Youtube, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { openBookingModal, navigateToPage } = useApp();

  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Massive Callout */}
        <div className="border-b border-neutral-800 pb-12 mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00] block mb-2">
              HOME PERSONAL TRAINING REDEFINED
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-none">
              TRAIN SMARTER.<br />MOVE BETTER.<br />LIVE STRONGER.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => openBookingModal(undefined, 'Trial Session')}
              className="bg-[#FF6A00] hover:bg-[#e05d00] text-white font-black text-xs sm:text-sm uppercase tracking-wider px-8 py-4 transition flex items-center justify-center gap-2"
            >
              <span>BOOK A TRIAL FOR ₹499</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white text-black font-black flex items-center justify-center text-sm">
                FP
              </div>
              <span className="font-editorial text-xl font-black uppercase tracking-tight text-white">
                FITNESS PRO ACADEMY
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed mb-6">
              The premier in-home personal training platform. Certified strength coaches, tailored nutrition frameworks, and sanitized equipment delivered directly to your doorstep.
            </p>

            <div className="flex items-center gap-3 text-neutral-400">
              <a href="#instagram" className="w-9 h-9 border border-neutral-700 flex items-center justify-center hover:border-white hover:text-white transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-9 h-9 border border-neutral-700 flex items-center justify-center hover:border-white hover:text-white transition">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-9 h-9 border border-neutral-700 flex items-center justify-center hover:border-white hover:text-white transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-9 h-9 border border-neutral-700 flex items-center justify-center hover:border-white hover:text-white transition">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#8DD8FF] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
              <li>
                <button onClick={() => navigateToPage('home')} className="hover:text-white transition">Home</button>
              </li>
              <li>
                <button onClick={() => navigateToPage('trainers')} className="hover:text-white transition">Trainers & Coaches</button>
              </li>
              <li>
                <button onClick={() => navigateToPage('how-it-works')} className="hover:text-white transition">How It Works</button>
              </li>
              <li>
                <button onClick={() => navigateToPage('plans')} className="hover:text-white transition">Plans & Pricing</button>
              </li>
              <li>
                <button onClick={() => navigateToPage('supplements')} className="hover:text-white transition">Supplements</button>
              </li>
              <li>
                <button onClick={() => navigateToPage('about')} className="hover:text-white transition">About Academy</button>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#8DD8FF] mb-4">
              Specialties
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
              <li><span className="hover:text-white cursor-pointer">Muscle & Hypertrophy</span></li>
              <li><span className="hover:text-white cursor-pointer">Rapid Fat Loss & HIIT</span></li>
              <li><span className="hover:text-white cursor-pointer">Olympic Strength</span></li>
              <li><span className="hover:text-white cursor-pointer">Postural Mobility</span></li>
              <li><span className="hover:text-white cursor-pointer">Pre / Post Natal</span></li>
            </ul>
          </div>

          {/* Legal & Operations */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#8DD8FF] mb-4">
              Policy & Support
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
              <li><span className="hover:text-white cursor-pointer">Cancellation Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Coach Safety Standard</span></li>
              <li><span className="hover:text-white cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Terms & Conditions</span></li>
              <li><span className="hover:text-white cursor-pointer">support@fitnesspro.com</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-medium gap-4">
          <p>© 2026 Fitness Pro Academy Inc. All rights reserved.</p>
          <p className="tracking-widest uppercase text-[11px] text-neutral-400">
            Professional Personal Training · Delivered To Your Home
          </p>
        </div>

      </div>
    </footer>
  );
};
