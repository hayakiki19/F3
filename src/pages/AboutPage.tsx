import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Award,
  Users,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Building,
  Heart,
  Activity,
  Phone,
  Mail,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateToPage, openBookingModal } = useApp();

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-[#0A0A0A] pb-24">
      {/* Top Banner */}
      <section className="bg-[#0A0A0A] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF6A00] mb-3">
            <button
              onClick={() => navigateToPage('home')}
              className="hover:underline text-neutral-400 hover:text-white"
            >
              Home
            </button>
            <span className="text-neutral-600">/</span>
            <span>About Fitness Pro Academy</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>FOUNDED IN MUMBAI · THE IN-HOME FITNESS STANDARD</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              REDEFINING HOW<br />URBAN INDIA TRAINS
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
              We started with a simple belief: The most effective gym is the one you don’t have to drive through Mumbai traffic to reach. We bring elite coaching, commercial-grade weights, and customized biomechanics directly into your flat.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Why We Exist / The Story */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block">
              OUR ORIGIN STORY
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black leading-tight">
              Why Commercial Gyms Fail 80% of Busy Urbanites
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              In 2021, our founders noticed a recurring pattern among corporate professionals, entrepreneurs, and young parents across Mumbai: everyone bought annual gym memberships in January, yet by March, attendance dropped below 15%.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              The problem wasn’t a lack of motivation—it was friction. A 45-minute commute on the Western Express Highway, endless battles for parking, and waiting in line for a sweat-drenched bench during peak 7 PM hours made consistency impossible.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We engineered a frictionless alternative: An elite, background-verified personal trainer who arrives at your doorstep with 24kg quick-adjust dumbbells, sanitized shock-absorbing mats, and an individualized workout prescription. Zero commute. 100% focused attention.
            </p>

            <div className="pt-2 grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border-2 border-black">
                <span className="font-editorial text-3xl font-black text-[#FF6A00]">92%</span>
                <span className="text-[10px] text-neutral-600 font-bold uppercase block mt-1">6-Month Adherence</span>
              </div>
              <div className="p-4 rounded-xl bg-white border-2 border-black">
                <span className="font-editorial text-3xl font-black text-black">14,200+</span>
                <span className="text-[10px] text-neutral-600 font-bold uppercase block mt-1">Doorstep Sessions</span>
              </div>
              <div className="p-4 rounded-xl bg-white border-2 border-black">
                <span className="font-editorial text-3xl font-black text-emerald-600">4.93★</span>
                <span className="text-[10px] text-neutral-600 font-bold uppercase block mt-1">Avg Client Rating</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-black relative shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
              alt="Fitness Pro Academy coaching session"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-black uppercase bg-[#FF6A00] text-white px-2 py-0.5 rounded inline-block mb-1">
                The Living Room Standard
              </span>
              <h4 className="font-editorial text-xl font-black uppercase text-white">
                Clinical Rigor in Private Residences
              </h4>
            </div>
          </div>
        </section>

        {/* 3 Pillars */}
        <section className="bg-white rounded-2xl border-2 border-black p-6 sm:p-10 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-1">
              THE THREE PILLARS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black">
              Built on Trust, Science & Punctuality
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
              <span className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black text-sm">
                01
              </span>
              <h3 className="font-editorial text-xl font-black uppercase text-black">
                Top 4% Acceptance Standard
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Out of every 100 trainers who apply to the Academy, only 4 pass our theoretical biomechanics exam, living room simulation test, and communication vetting.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
              <span className="w-10 h-10 rounded-xl bg-[#FF6A00] text-white flex items-center justify-center font-black text-sm">
                02
              </span>
              <h3 className="font-editorial text-xl font-black uppercase text-black">
                Apartment Security & Vetting
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                We respect your home sanctuary. Every coach undergoes formal background screening, permanent residential verification, Aadhaar KYC, and clean police clearance.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                03
              </span>
              <h3 className="font-editorial text-xl font-black uppercase text-black">
                5-Minute Punctuality Pledge
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Urban life is demanding. If your coach arrives more than 5 minutes late to your scheduled doorstep appointment, your entire session is credited for free.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership & Master Advisory Board */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-1">
              THE MINDS BEHIND THE ACADEMY
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black">
              Leadership & Master Faculty
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Vikram Malhotra',
                role: 'Academy Director & Founder',
                credentials: 'Ex-National Decathlete · MSc Sports Science (Loughborough)',
                bio: '14+ years coaching Olympic hopefuls and executive athletes. Architect of our proprietary space-constrained progressive overload curriculum.',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
              },
              {
                name: 'Dr. Radhika Sen',
                role: 'Head of Physical Therapy',
                credentials: 'MPT Orthopedics & Sports Rehab · CSCS Specialist',
                bio: 'Specializes in spine biomechanics, postural restoration, and post-operative joint strengthening. Directs coach movement screening audits.',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
              },
              {
                name: 'Kabir Mehta',
                role: 'Chief Sports Dietitian',
                credentials: 'ISSA Master Nutritionist · Clinical Sports Dietetics',
                bio: 'Pioneered our metabolic flexibility nutrition framework. Helps clients achieve sustainable fat loss while dining at Indian households.',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
              },
            ].map((leader, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border-2 border-black overflow-hidden flex flex-col justify-between hover:shadow-xl transition"
              >
                <div>
                  <div className="aspect-[4/3] bg-neutral-900 overflow-hidden">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-editorial text-xl font-black uppercase text-black">
                      {leader.name}
                    </h3>
                    <span className="text-xs font-black uppercase text-[#FF6A00] block">
                      {leader.role}
                    </span>
                    <p className="text-[11px] font-bold text-neutral-500">
                      {leader.credentials}
                    </p>
                    <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Operational Corridors */}
        <section className="bg-neutral-950 text-white rounded-2xl border-2 border-black p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-1">
              CURRENT DISPATCH COVERAGE
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-white">
              Serving Mumbai's Prime Residential Corridors
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              Our mobile coach hubs ensure rapid 15-minute dispatch times across Western and South Mumbai corridors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              'Bandra West & Pali Hill',
              'Khar & Santacruz West',
              'Juhu & Vile Parle West',
              'Andheri West & Lokhandwala',
              'Bandra Kurla Complex (BKC)',
              'Worli & Prabhadevi',
              'Lower Parel & Mahalaxmi',
              'Colaba & South Mumbai',
            ].map((loc, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-white flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FF6A00] shrink-0" />
                <span>{loc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Hero */}
        <section className="bg-white rounded-2xl border-2 border-black p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-2">
              BECOME PART OF THE MOVEMENT
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black">
              Ready to Experience Doorstep Training?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-lg">
              Book your ₹499 in-home trial session today. We bring the certified coach, weights, and sanitized mats straight to your door.
            </p>
          </div>
          <button
            onClick={() => openBookingModal(undefined, 'Trial Session')}
            className="w-full md:w-auto px-8 py-4 bg-[#FF6A00] hover:bg-[#e05d00] text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg shrink-0 flex items-center justify-center gap-2"
          >
            <span>Book In-Home Trial (₹499)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </main>
    </div>
  );
};
