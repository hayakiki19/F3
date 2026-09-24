import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Dumbbell,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Navigation,
  Activity,
  Heart,
  Calendar,
  Layers,
  Award,
  Maximize2,
  Check,
  X,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { openBookingModal, navigateToPage } = useApp();
  const [activeSpaceTab, setActiveSpaceTab] = useState<'living-room' | 'bedroom' | 'balcony'>('living-room');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const steps = [
    {
      num: '01',
      title: 'Book Your Preferred Slot Online',
      desc: 'Select a convenient morning (06:00 AM - 10:00 AM) or evening (05:00 PM - 09:00 PM) time slot. Tell us your address in Mumbai and your primary target (fat loss, hypertrophy, posture correction).',
      badge: 'Takes 60 Seconds',
      icon: Calendar,
    },
    {
      num: '02',
      title: 'Certified Coach Dispatched With Gear',
      desc: 'Our ACE/CSCS-certified trainer is dispatched with our proprietary heavy-duty gear duffel. Track their real-time arrival in the app with live GPS and 5-minute punctuality guarantee.',
      badge: 'Live GPS Tracking',
      icon: Navigation,
    },
    {
      num: '03',
      title: 'Living Room Transformed into Gym',
      desc: 'Coach unrolls sanitized, shock-absorbing non-slip mats to protect hardwood, marble, or tiled floors. Adjustable dumbbells, power loop bands, and TRX door-anchors are set up in under 3 minutes.',
      badge: 'Zero Equipment Needed',
      icon: Dumbbell,
    },
    {
      num: '04',
      title: 'High-Impact 60-Minute Personal Training',
      desc: 'Work through tailored working sets with strict biomechanics guidance. Your coach corrects joint alignment, tracks heart-rate intensity, and ensures progressive overload without gym distractions.',
      badge: '100% Focused 1-on-1',
      icon: Activity,
    },
    {
      num: '05',
      title: 'Biometrics, Nutrition & Home Prescription',
      desc: 'We log your weight and body fat % with our Bluetooth scale, prescribe diet adjustments, and sync your next progression routine directly to your mobile app dashboard.',
      badge: 'Data-Driven Results',
      icon: Award,
    },
  ];

  const spaces = {
    'living-room': {
      title: 'Apartment Living Room',
      minSpace: '6 ft × 6 ft (Just slide coffee table aside)',
      idealFor: 'Full-body hypertrophy, dumbbell compound lifts & kettlebell conditioning.',
      flooring: 'Safe on marble, vitrified tiles, or wooden floors (we use dual shock mats).',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
    },
    'bedroom': {
      title: 'Master Bedroom or Study Room',
      minSpace: '5 ft × 6 ft beside the bed or window',
      idealFor: 'Mobility, core rehabilitation, functional strength & prenatal exercises.',
      flooring: 'Completely quiet workout—no dropping weights on residential floors.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    },
    'balcony': {
      title: 'Covered Balcony or Terrace',
      minSpace: 'Open fresh-air footprint',
      idealFor: 'HIIT fat burning, boxing conditioning, agility drills & sunrise mobility.',
      flooring: 'Weatherproof heavy-duty commercial turf mats provided by coach.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
    },
  };

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
            <span>How Doorstep Training Works</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ZERO-FRICTION IN-HOME FITNESS REVOLUTION</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              HOW DOORSTEP<br />FITNESS WORKS
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
              No traffic jams on Western Express Highway. No waiting for benches in crowded gyms. We pack commercial-grade weights, non-slip floor mats, and an elite personal trainer directly to your flat.
            </p>
          </div>
        </div>
      </section>

      {/* Main 5-Step Process Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Step-by-Step Cards */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-1">
              THE 5-STEP JOURNEY
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black">
              From Booking to Living Room Transformation
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              Everything is handled end-to-end so all you have to do is open your front door in your workout clothes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {steps.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.num}
                  className="bg-white rounded-2xl border-2 border-black p-6 flex flex-col justify-between space-y-4 hover:shadow-xl transition relative group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-editorial text-4xl font-black text-[#FF6A00]">
                        {st.num}
                      </span>
                      <span className="text-[10px] font-black uppercase bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-full border border-neutral-200">
                        {st.badge}
                      </span>
                    </div>

                    <h3 className="font-editorial text-xl font-black uppercase text-black leading-tight">
                      {st.title}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-bold text-neutral-400">
                    <Icon className="w-4 h-4 text-[#FF6A00]" />
                    <span>Academy Standard Protocol</span>
                  </div>
                </div>
              );
            })}

            {/* Trial CTA Card in Grid */}
            <div className="bg-[#0A0A0A] text-white rounded-2xl border-2 border-black p-6 flex flex-col justify-between space-y-4 shadow-xl">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6A00] block mb-2">
                  LIMITED TRIAL PROMO
                </span>
                <h3 className="font-editorial text-2xl font-black uppercase text-white leading-tight">
                  Experience It in Your Living Room for ₹499
                </h3>
                <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                  Book a complete 60-min in-home movement screening & workout. Zero long-term commitment. Coach brings full dumbbell & mat kit.
                </p>
              </div>

              <button
                onClick={() => openBookingModal(undefined, 'Trial Session')}
                className="w-full py-3.5 bg-[#FF6A00] hover:bg-[#e05d00] text-white font-black text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-md active:scale-95"
              >
                <span>Book ₹499 In-Home Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Space Visualizer Interactive Section */}
        <section className="bg-white rounded-2xl border-2 border-black p-6 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-1">
                LIVING ROOM REQUIREMENTS
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black">
                How Much Space Do You Actually Need?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
                Just 6 ft × 6 ft clearance! Push your coffee table aside and you have an Olympic-grade personal training facility.
              </p>
            </div>

            {/* Space Segmented Buttons */}
            <div className="flex items-center gap-2 bg-neutral-100 p-1.5 rounded-xl border border-neutral-200 shrink-0">
              {(['living-room', 'bedroom', 'balcony'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSpaceTab(tab)}
                  className={`px-3.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg transition ${
                    activeSpaceTab === tab
                      ? 'bg-black text-white shadow-xs'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {tab === 'living-room' ? 'Living Room' : tab === 'bedroom' ? 'Bedroom' : 'Balcony'}
                </button>
              ))}
            </div>
          </div>

          {/* Active Space Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            <div className="lg:col-span-7 aspect-[16/10] rounded-2xl overflow-hidden border-2 border-black relative">
              <img
                src={spaces[activeSpaceTab].image}
                alt={spaces[activeSpaceTab].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-[#FF6A00] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-2 inline-block">
                  Verified Setup Space
                </span>
                <h3 className="font-editorial text-2xl font-black uppercase text-white">
                  {spaces[activeSpaceTab].title}
                </h3>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
                <span className="text-[10px] text-neutral-400 font-bold uppercase block">Minimum Footprint</span>
                <strong className="text-black font-editorial text-lg block">
                  {spaces[activeSpaceTab].minSpace}
                </strong>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
                <span className="text-[10px] text-neutral-400 font-bold uppercase block">Ideal Workout Style</span>
                <p className="text-neutral-700 font-medium">
                  {spaces[activeSpaceTab].idealFor}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
                <span className="text-[10px] text-neutral-400 font-bold uppercase block">Floor Protection & Sound</span>
                <p className="text-neutral-700 font-medium">
                  {spaces[activeSpaceTab].flooring}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-bold">
                  Zero floor scratches guaranteed: High-density shock-absorbing rubber mats under all weights.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Gear Kit Unboxed */}
        <section className="bg-neutral-950 text-white rounded-2xl border-2 border-black p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-1">
              THE MOBILE ARSENAL
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-white">
              What Our Coaches Bring to Every Home Visit
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              Every trainer carries an ergonomic heavy-duty rolling duffel bag packed with commercial-grade fitness equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {[
              {
                title: 'Quick-Adjust Hex Dumbbells',
                desc: 'Pair of compact dumbbells adjustable from 2.5kg up to 24kg or 32kg per hand. Perfect for progressive overload chest presses, rows, and goblet squats.',
                badge: 'Heavy Lifting',
              },
              {
                title: 'Thick Shock-Absorbing Mats',
                desc: 'Dual-density closed-cell foam mats that protect expensive Italian marble, tiles, or hardwood floors while providing orthopedic joint cushioning.',
                badge: 'Floor Safe',
              },
              {
                title: 'Power Resistance Loops (3 Tiers)',
                desc: 'Latex power bands providing 15kg to 45kg of variable resistance for glute activation, shoulder mobility, and deltoid hypertrophy.',
                badge: 'Mobility & Hypertrophy',
              },
              {
                title: 'TRX Suspension Door-Anchor',
                desc: 'High-tensile nylon straps that safely anchor to any interior door frame for inverted rows, atomic push-ups, and core stabilization.',
                badge: 'Bodyweight Mastery',
              },
              {
                title: 'Bluetooth Body Composition Scale',
                desc: 'Clinical-grade dual-frequency BIA scale tracking skeletal muscle mass, body fat percentage, visceral fat, and hydration levels.',
                badge: 'Biometrics',
              },
              {
                title: 'Hospital-Grade Disinfectant',
                desc: 'All dumbbells, mats, and handles are sprayed with medical alcohol disinfectant wipes right in front of you before and after every session.',
                badge: '100% Sanitized',
              },
            ].map((gear, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2 hover:border-[#FF6A00] transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase bg-[#FF6A00] text-white px-2 py-0.5 rounded">
                    {gear.badge}
                  </span>
                  <Dumbbell className="w-4 h-4 text-neutral-500" />
                </div>
                <h4 className="font-editorial text-lg font-black uppercase text-white">
                  {gear.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {gear.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Commercial Gym vs Doorstep Comparison Table */}
        <section className="bg-white rounded-2xl border-2 border-black p-6 sm:p-10 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-1">
              THE SMART CHOICE
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black">
              Doorstep Personal Training vs. Commercial Gym
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-black bg-neutral-50">
                  <th className="p-3 font-black uppercase text-neutral-500">Feature / Experience</th>
                  <th className="p-3 font-black uppercase bg-[#FF6A00]/10 text-[#FF6A00] border-x border-[#FF6A00]/20">
                    Fitness Pro Academy (Doorstep)
                  </th>
                  <th className="p-3 font-black uppercase text-neutral-500">Traditional Commercial Gym</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {[
                  {
                    feature: 'Travel & Commute Time',
                    pro: '0 Minutes (Coach comes to you)',
                    gym: '45 - 75 mins in Mumbai traffic',
                  },
                  {
                    feature: 'Equipment Availability',
                    pro: '100% dedicated to you (No waiting)',
                    gym: 'Fight over benches, missing dumbbells',
                  },
                  {
                    feature: 'Hygiene & Germ Exposure',
                    pro: 'Sanitized equipment inside your private flat',
                    gym: '500+ strangers sweating on shared benches',
                  },
                  {
                    feature: 'Consistency & Adherence Rate',
                    pro: '92% adherence over 6 months',
                    gym: 'Under 18% consistency after 90 days',
                  },
                  {
                    feature: 'Trainer Attention',
                    pro: '100% focused 1-on-1 on your form',
                    gym: 'Floor trainers distracted by their phones',
                  },
                  {
                    feature: 'Punctuality Guarantee',
                    pro: 'Arrives on time or session is free',
                    gym: 'Trainers show up late or cancel last minute',
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50">
                    <td className="p-3.5 font-bold text-neutral-800">{row.feature}</td>
                    <td className="p-3.5 bg-[#FF6A00]/5 border-x border-[#FF6A00]/20 font-black text-black">
                      <span className="flex items-center gap-1.5 text-emerald-700">
                        <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                        <span>{row.pro}</span>
                      </span>
                    </td>
                    <td className="p-3.5 text-neutral-500">
                      <span className="flex items-center gap-1.5 text-neutral-500">
                        <X className="w-4 h-4 shrink-0 text-red-500" />
                        <span>{row.gym}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-2xl border-2 border-black p-6 sm:p-10 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-1">
              QUESTIONS ANSWERED
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-black uppercase text-black">
              Frequently Asked Questions About Doorstep Training
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: 'What if my apartment society has strict security rules?',
                a: 'All our coaches carry formal Academy photo ID cards, Aadhaar verification, and pre-authorized visitor entry QR codes. They comply seamlessly with MyGate, NoBrokerHood, and gate security protocols.',
              },
              {
                q: 'Can my spouse or roommate join the workout session?',
                a: 'Yes! We offer a Dual / Couple training tier where two people train together with the same coach. It saves money and provides great accountability.',
              },
              {
                q: 'What happens if I need to cancel or reschedule a session?',
                a: 'You can reschedule any session with 1 click directly in your app dashboard up to 4 hours before the slot. Your session credit remains 100% protected and rolls over.',
              },
              {
                q: 'Will dropping dumbbells create noise for downstairs neighbors?',
                a: 'We use high-density 25mm vibration-absorbing rubber drop pads. Furthermore, our training methodology prioritizes controlled eccentric tempo (3-second lowering) rather than reckless slamming of weights.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border-2 border-neutral-200 rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-black text-sm uppercase flex items-center justify-between bg-neutral-50/50 hover:bg-neutral-100 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform ${
                      expandedFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="p-4 bg-white text-xs text-neutral-600 leading-relaxed border-t border-neutral-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Hero */}
        <section className="bg-neutral-950 text-white rounded-2xl border-2 border-black p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-2">
              READY TO TRY IT?
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-white">
              Transform Your Home Into Your Private Gym
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-lg">
              Book your ₹499 in-home trial. Coach, dumbbells, mats, and movement screen delivered straight to your door.
            </p>
          </div>
          <button
            onClick={() => openBookingModal(undefined, 'Trial Session')}
            className="w-full md:w-auto px-8 py-4 bg-[#FF6A00] hover:bg-[#e05d00] text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg shrink-0 flex items-center justify-center gap-2"
          >
            <span>Book ₹499 In-Home Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </main>
    </div>
  );
};
