import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Trainer, FitnessGoal } from '../types';
import { Star, MapPin, Clock, DollarSign, Filter, Check, ArrowRight } from 'lucide-react';

export const TrainersSection: React.FC = () => {
  const { trainers, openTrainerModal, openBookingModal } = useApp();

  // Filters state
  const [selectedGoal, setSelectedGoal] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedPriceMax, setSelectedPriceMax] = useState<number>(2500);
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [mobileFiltersExpanded, setMobileFiltersExpanded] = useState<boolean>(false);

  const goalsList: ('All' | FitnessGoal)[] = [
    'All',
    'Weight Loss',
    'Muscle Gain',
    'Strength',
    'General Fitness',
    'Flexibility',
  ];

  const locationsList = ['All', 'Central & West Suburbs', 'Downtown & South District', 'East Side & Northern Hills', 'West Suburbs & Tech Corridor'];

  const filteredTrainers = useMemo(() => {
    return trainers.filter((t) => {
      if (selectedGoal !== 'All' && !t.goals.includes(selectedGoal as FitnessGoal)) {
        return false;
      }
      if (selectedLocation !== 'All' && !t.location.includes(selectedLocation)) {
        return false;
      }
      if (selectedGender !== 'All' && t.gender !== selectedGender) {
        return false;
      }
      if (t.startingPrice > selectedPriceMax) {
        return false;
      }
      if (selectedAvailability === 'Morning' && !t.availabilityHours.includes('AM')) {
        return false;
      }
      if (selectedAvailability === 'Evening' && !t.availabilityHours.includes('PM')) {
        return false;
      }
      return true;
    });
  }, [trainers, selectedGoal, selectedLocation, selectedGender, selectedPriceMax, selectedAvailability]);

  return (
    <section id="trainers" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-[#FF6A00]"></span>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0A0A0A]">
                CERTIFIED EXPERTS
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black text-[#0A0A0A] uppercase tracking-tight leading-[0.95]">
              FIND YOUR TRAINER
            </h2>
            <p className="mt-3 text-base text-neutral-600 max-w-xl">
              Every trainer is rigorously vetted, background-checked, insured, and certified by elite global strength & conditioning bodies.
            </p>
          </div>

          <div className="text-sm font-bold uppercase tracking-wider text-neutral-500">
            Showing <span className="text-black font-black">{filteredTrainers.length}</span> Verified Coaches
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-6 mb-12">
          {/* Mobile Filter Toggle Button */}
          <div className="sm:hidden mb-3">
            <button
              type="button"
              onClick={() => setMobileFiltersExpanded(!mobileFiltersExpanded)}
              className="min-h-[44px] px-4 py-2.5 bg-white border-2 border-black text-xs font-black uppercase tracking-wider text-black flex items-center justify-between w-full shadow-xs active:scale-98 transition"
              aria-expanded={mobileFiltersExpanded}
            >
              <span className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#FF6A00]" />
                <span>{mobileFiltersExpanded ? 'Hide Detailed Filters' : 'Filter by Area, Time & Rate'}</span>
              </span>
              <span className="text-[11px] text-[#FF6A00] font-black underline">
                {mobileFiltersExpanded ? 'Close ▲' : 'Open ▼'}
              </span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 mb-4 text-xs font-black uppercase tracking-wider text-neutral-700">
            <Filter className="w-4 h-4 text-[#FF6A00]" />
            <span>Filter Coaches By:</span>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 ${mobileFiltersExpanded ? 'grid' : 'hidden sm:grid'}`}>
            
            {/* Goal Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                Fitness Goal
              </label>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full bg-white border border-neutral-300 px-3 py-3 sm:py-2 text-base sm:text-xs font-bold text-neutral-900 focus:outline-none focus:border-black min-h-[44px] rounded-none"
              >
                {goalsList.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                Service Area
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-white border border-neutral-300 px-3 py-3 sm:py-2 text-base sm:text-xs font-bold text-neutral-900 focus:outline-none focus:border-black min-h-[44px] rounded-none"
              >
                {locationsList.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                Time Preference
              </label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full bg-white border border-neutral-300 px-3 py-3 sm:py-2 text-base sm:text-xs font-bold text-neutral-900 focus:outline-none focus:border-black min-h-[44px] rounded-none"
              >
                <option value="All">Any Time Slot</option>
                <option value="Morning">Mornings (6 AM – 11 AM)</option>
                <option value="Evening">Evenings (4 PM – 9 PM)</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                Trainer Gender
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full bg-white border border-neutral-300 px-3 py-3 sm:py-2 text-base sm:text-xs font-bold text-neutral-900 focus:outline-none focus:border-black min-h-[44px] rounded-none"
              >
                <option value="All">All Trainers</option>
                <option value="Male">Male Trainers</option>
                <option value="Female">Female Trainers</option>
              </select>
            </div>

            {/* Max Price Filter */}
            <div>
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                <span>Max Price:</span>
                <span className="text-black font-black">₹{selectedPriceMax.toLocaleString('en-IN')}/session</span>
              </div>
              <input
                type="range"
                min="1000"
                max="2500"
                step="100"
                value={selectedPriceMax}
                onChange={(e) => setSelectedPriceMax(Number(e.target.value))}
                className="w-full accent-[#FF6A00] cursor-pointer mt-2 h-2"
              />
            </div>

          </div>

          {/* Quick Filter Tag Buttons (Swipeable on mobile) */}
          <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center overflow-x-auto scrollbar-none gap-2 py-1">
            <span className="text-[11px] font-bold uppercase text-neutral-400 shrink-0 mr-1">Quick Goals:</span>
            {['Weight Loss', 'Muscle Gain', 'Strength', 'General Fitness', 'Flexibility'].map((goal) => (
              <button
                key={goal}
                onClick={() => setSelectedGoal(selectedGoal === goal ? 'All' : goal)}
                className={`text-xs px-3.5 py-2 font-bold tracking-wide uppercase transition border whitespace-nowrap min-h-[40px] flex items-center shrink-0 ${
                  selectedGoal === goal
                    ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                }`}
              >
                {goal}
              </button>
            ))}
            {(selectedGoal !== 'All' || selectedLocation !== 'All' || selectedGender !== 'All' || selectedAvailability !== 'All' || selectedPriceMax < 2500) && (
              <button
                onClick={() => {
                  setSelectedGoal('All');
                  setSelectedLocation('All');
                  setSelectedGender('All');
                  setSelectedPriceMax(2500);
                  setSelectedAvailability('All');
                }}
                className="text-xs text-[#FF6A00] font-bold uppercase underline shrink-0 ml-auto whitespace-nowrap min-h-[40px] flex items-center px-2"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Trainer Cards Grid */}
        {filteredTrainers.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-neutral-300 bg-neutral-50">
            <p className="text-lg font-bold text-neutral-800">No trainers matched your exact filter combination.</p>
            <p className="text-sm text-neutral-500 mt-1">Try expanding your price range or selecting all locations.</p>
            <button
              onClick={() => {
                setSelectedGoal('All');
                setSelectedLocation('All');
                setSelectedGender('All');
                setSelectedPriceMax(100);
                setSelectedAvailability('All');
              }}
              className="mt-4 px-6 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrainers.map((trainer) => (
              <div
                key={trainer.id}
                className="group bg-white border-2 border-[#0A0A0A] flex flex-col justify-between hover:border-[#FF6A00] transition duration-200"
              >
                {/* Photo & Badges */}
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
                  <img
                    src={trainer.photo}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-black/85 text-white px-2.5 py-1 text-xs font-bold flex items-center gap-1 border border-neutral-700">
                    <Star className="w-3.5 h-3.5 fill-[#FF6A00] text-[#FF6A00]" />
                    <span>{trainer.rating.toFixed(1)}</span>
                    <span className="text-neutral-400 font-normal">({trainer.reviewsCount})</span>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-white/95 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-black border border-black">
                    {trainer.experience}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Specialization kicker */}
                    <p className="text-xs font-black uppercase tracking-wider text-[#FF6A00] mb-1">
                      {trainer.specializations[0]}
                    </p>

                    {/* Name */}
                    <h3 className="font-editorial text-2xl font-black uppercase text-[#0A0A0A] tracking-tight group-hover:text-[#FF6A00] transition-colors">
                      {trainer.name}
                    </h3>

                    {/* Headline */}
                    <p className="text-xs text-neutral-600 line-clamp-1 mt-1 font-medium">
                      {trainer.headline}
                    </p>

                    {/* Metadata lines */}
                    <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span className="truncate">{trainer.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span className="truncate">{trainer.availabilityHours}</span>
                      </div>
                    </div>

                    {/* Goals / Specs */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {trainer.goals.slice(0, 3).map((g) => (
                        <span
                          key={g}
                          className="text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700 px-2 py-0.5"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Starting Price & CTAs */}
                  <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-neutral-400 block">
                        Starting From
                      </span>
                      <span className="text-lg font-black text-black">
                        ₹{trainer.startingPrice.toLocaleString('en-IN')}
                        <span className="text-xs font-normal text-neutral-500"> / session</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openTrainerModal(trainer)}
                        className="min-h-[44px] px-3.5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-black uppercase tracking-wider transition border border-neutral-300 active:scale-95"
                      >
                        PROFILE
                      </button>
                      <button
                        onClick={() => openBookingModal(trainer.id, 'Personal Training')}
                        className="min-h-[44px] px-4 py-2.5 bg-[#0A0A0A] hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition shadow-sm active:scale-95 flex items-center gap-1"
                      >
                        <span>BOOK</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
