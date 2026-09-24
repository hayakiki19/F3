import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  MapPin,
  Clock,
  Dumbbell,
  ShieldCheck,
  CheckCircle,
  Award,
  Search,
  Filter,
  ArrowRight,
  MessageSquare,
  Sparkles,
  ChevronDown,
  User,
  Heart,
  Zap,
  Phone,
  SlidersHorizontal,
} from 'lucide-react';

export const TrainersPage: React.FC = () => {
  const {
    trainers,
    openBookingModal,
    openTrainerModal,
    openTrainerChat,
    navigateToPage,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedGender, setSelectedGender] = useState<'all' | 'Male' | 'Female'>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const localities = [
    { id: 'all', label: 'All Mumbai Suburbs' },
    { id: 'Bandra', label: 'Bandra & Khar West' },
    { id: 'Juhu', label: 'Juhu & Santacruz' },
    { id: 'South Mumbai', label: 'South Mumbai & Worli' },
    { id: 'Andheri', label: 'Andheri & BKC' },
  ];

  const specialties = [
    { id: 'all', label: 'All Specializations' },
    { id: 'Strength', label: 'Strength & Hypertrophy' },
    { id: 'Fat Loss', label: 'Fat Loss & Conditioning' },
    { id: 'Rehab', label: 'Posture & Injury Rehab' },
    { id: 'Conditioning', label: 'Athletic Conditioning' },
  ];

  const filteredTrainers = trainers.filter((trainer) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = trainer.name.toLowerCase().includes(q);
      const matchHeadline = trainer.headline.toLowerCase().includes(q);
      const matchSpec = trainer.specializations.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchHeadline && !matchSpec) return false;
    }

    // Locality
    if (selectedLocality !== 'all') {
      const matchLoc =
        trainer.location.toLowerCase().includes(selectedLocality.toLowerCase()) ||
        trainer.serviceArea.toLowerCase().includes(selectedLocality.toLowerCase());
      if (!matchLoc) return false;
    }

    // Specialty
    if (selectedSpecialty !== 'all') {
      const matchSpec = trainer.specializations.some((s) =>
        s.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
      if (!matchSpec) return false;
    }

    // Gender
    if (selectedGender !== 'all' && trainer.gender !== selectedGender) {
      return false;
    }

    return true;
  });

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-[#0A0A0A] pb-24">
      {/* Top Breadcrumb & Page Banner */}
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
            <span>Certified Doorstep Coaches</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>TOP 4% ACCEPTANCE RATE · 100% BACKGROUND VERIFIED</span>
              </div>
              <h1 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
                OUR DOORSTEP<br />PERSONAL TRAINERS
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 max-w-2xl leading-relaxed">
                Every coach on our roster is an ACE, ACSM, or CSCS-certified professional who has passed our 120-hour living room biomechanics screening. We bring the equipment, knowledge, and accountability straight into your home.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-4 bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl">
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase block">Verified Coaches</span>
                <span className="font-editorial text-2xl font-black text-white">48+ Active</span>
              </div>
              <div className="w-px h-8 bg-neutral-800"></div>
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase block">Avg Rating</span>
                <span className="font-editorial text-2xl font-black text-[#FF6A00]">★ 4.93 / 5.0</span>
              </div>
              <div className="w-px h-8 bg-neutral-800"></div>
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase block">Doorstep Trial</span>
                <span className="font-editorial text-2xl font-black text-emerald-400">₹499 All-In</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-16 z-30 bg-white border-b border-neutral-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coach by name, specialty (e.g. Hypertrophy, Bandra)..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] bg-neutral-50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Locality Pill Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {localities.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocality(loc.id)}
                  className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl whitespace-nowrap transition shrink-0 border ${
                    selectedLocality === loc.id
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>

            {/* Gender Toggle */}
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-200 shrink-0">
              {(['all', 'Male', 'Female'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-2.5 py-1 text-[11px] font-black uppercase rounded-lg transition ${
                    selectedGender === g
                      ? 'bg-white text-black shadow-xs font-black'
                      : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  {g === 'all' ? 'All' : g}
                </button>
              ))}
            </div>
          </div>

          {/* Specialty Sub-Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-neutral-100 mt-2">
            <span className="text-[10px] font-black uppercase text-neutral-400 shrink-0">Specialty:</span>
            {specialties.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialty(spec.id)}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-lg whitespace-nowrap transition shrink-0 ${
                  selectedSpecialty === spec.id
                    ? 'bg-[#FF6A00] text-white font-black'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {spec.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Trainers Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Results Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-neutral-500">
            Showing <strong className="text-black">{filteredTrainers.length}</strong> Certified Doorstep Coaches
          </span>
          <span className="text-xs text-neutral-500">
            ⚡ All coaches bring 24kg dumbbells, resistance bands & mats
          </span>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainers.map((coach) => (
            <div
              key={coach.id}
              className="bg-white rounded-2xl border-2 border-black overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition duration-200 group"
            >
              <div>
                {/* Image & Experience Badge Header */}
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
                  <img
                    src={coach.photo}
                    alt={coach.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

                  {/* Top Floating Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-[#0A0A0A] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider border border-neutral-700">
                      {coach.experience}
                    </span>
                    <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-wider">
                      Verified Pro
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-black px-2.5 py-1 rounded-md text-xs font-black flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-[#FF6A00] text-[#FF6A00]" />
                    <span>{coach.rating}</span>
                    <span className="text-[10px] text-neutral-500">({coach.reviewsCount})</span>
                  </div>

                  {/* Bottom Coach Name on Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-editorial text-2xl font-black uppercase tracking-tight text-white leading-tight">
                      {coach.name}
                    </h3>
                    <p className="text-xs text-[#FF6A00] font-bold truncate">
                      {coach.headline}
                    </p>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-4">
                  {/* Location & Service Corridor */}
                  <div className="flex items-center gap-2 text-xs text-neutral-600">
                    <MapPin className="w-4 h-4 text-[#FF6A00] shrink-0" />
                    <span className="font-bold text-neutral-900">{coach.location}</span>
                    <span className="text-neutral-400">· {coach.serviceArea}</span>
                  </div>

                  {/* Certifications Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {coach.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="bg-neutral-100 text-neutral-800 text-[10px] font-black uppercase px-2 py-0.5 rounded border border-neutral-200"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {coach.about}
                  </p>

                  {/* What coach brings */}
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-neutral-500 block flex items-center gap-1">
                      <Dumbbell className="w-3 h-3 text-[#FF6A00]" />
                      <span>Gear Dispatched to Your Door:</span>
                    </span>
                    <p className="text-[11px] text-neutral-800 font-medium line-clamp-2">
                      {coach.equipmentProvided.slice(0, 3).join(' • ')}
                    </p>
                  </div>

                  {/* Pricing line */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div>
                      <span className="text-[10px] text-neutral-400 font-bold uppercase block">Monthly Session Rate</span>
                      <strong className="text-black font-editorial text-lg">₹{coach.startingPrice}/session</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 font-bold uppercase block">Trial Price</span>
                      <strong className="text-[#FF6A00] font-editorial text-lg">₹499 Trial</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => openTrainerModal(coach)}
                  className="py-2.5 px-3 rounded-xl border border-neutral-300 hover:border-black text-black text-xs font-black uppercase tracking-wider transition text-center"
                >
                  View Full Bio
                </button>
                <button
                  onClick={() => openBookingModal(coach.id, 'Trial Session')}
                  className="py-2.5 px-3 rounded-xl bg-[#FF6A00] hover:bg-[#e05d00] text-white text-xs font-black uppercase tracking-wider transition text-center shadow-xs"
                >
                  Book Trial (₹499)
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quality & Safety Standards */}
        <section className="bg-white rounded-2xl border-2 border-black p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-wider text-[#FF6A00] block mb-1">
              THE ACADEMY RIGOR
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black">
              How We Vet & Certify In-Home Personal Trainers
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              Unlike ordinary gym marketplaces that list anyone with a basic certificate, Fitness Pro Academy enforces strict clinical standards for doorstep privacy, punctuality, and injury-free progressive overload.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-black text-xs">
                01
              </span>
              <h4 className="font-editorial text-lg font-black uppercase text-black">
                Background & Police Clearance
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                100% Aadhaar identity check, permanent residential verification, and clean police record check before stepping into any client residence.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-[#FF6A00] text-white flex items-center justify-center font-black text-xs">
                02
              </span>
              <h4 className="font-editorial text-lg font-black uppercase text-black">
                120-Hr Biomechanics Exam
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Coaches must demonstrate movement screening, postural regression, and space-constrained exercise execution in a simulated 6x6 ft living room.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-black text-xs">
                03
              </span>
              <h4 className="font-editorial text-lg font-black uppercase text-black">
                CPR & First-Aid Certified
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Every doorstep coach carries a pulse oximeter, blood pressure cuff, and is recertified annually in adult CPR and emergency response.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                04
              </span>
              <h4 className="font-editorial text-lg font-black uppercase text-black">
                Punctuality Guarantee
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Your trainer arrives within a 5-minute window or your session is credited for free. We respect your busy professional schedule.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="bg-white rounded-2xl border-2 border-black p-6 sm:p-10 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-1">
              GOT QUESTIONS?
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-black uppercase text-black">
              Frequently Asked Questions About Trainers
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: 'Can I switch trainers if my schedule or preferred workout time changes?',
                a: 'Yes, 100%. Your subscription is with the Academy. If you move from morning to evening slots or want a trainer with a different specialty (e.g., switching from strength to postnatal), you can reassign with 1 click in your client portal.',
              },
              {
                q: 'What if I have a pre-existing knee or lower back injury?',
                a: 'All our coaches are trained in functional movement assessments. During your first trial session, the trainer performs a 15-minute mobility screen to identify restricted joints and modifies all exercises to avoid spinal compression.',
              },
              {
                q: 'Do female clients have access to verified female personal trainers?',
                a: 'Yes, we have senior female strength and conditioning coaches available across all major Mumbai corridors. You can filter specifically for female coaches using the filter above.',
              },
              {
                q: 'What equipment does the trainer bring into my living room?',
                a: 'The coach brings a commercial-grade mobile duffel containing adjustable dumbbells (up to 32kg pair), elastic loop bands, TRX suspension straps, and sanitized non-slip shock-absorbing floor mats.',
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

        {/* Bottom Booking Callout */}
        <section className="bg-neutral-950 text-white rounded-2xl border-2 border-black p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6A00] block mb-2">
              ZERO RISK · COMPLETE PRIVACY
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-white">
              Try Your First Doorstep Session For ₹499
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-lg">
              Experience 60 minutes of focused 1-on-1 personal training in your own living room. All weights, mats, and movement screen included.
            </p>
          </div>
          <button
            onClick={() => openBookingModal(undefined, 'Trial Session')}
            className="w-full md:w-auto px-8 py-4 bg-[#FF6A00] hover:bg-[#e05d00] text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg shrink-0 flex items-center justify-center gap-2"
          >
            <span>Claim ₹499 Trial Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </main>
    </div>
  );
};
