import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, MapPin, CheckCircle, Save, Dumbbell, Clock } from 'lucide-react';

export const ClientProfile: React.FC = () => {
  const { user, updateClientProfile } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState(user?.fitnessProfile?.age || 32);
  const [height, setHeight] = useState(user?.fitnessProfile?.height || `5'10"`);
  const [weight, setWeight] = useState(user?.fitnessProfile?.weight || '74 kg');
  const [fitnessLevel, setFitnessLevel] = useState(user?.fitnessProfile?.fitnessLevel || 'Intermediate');
  const [fitnessGoal, setFitnessGoal] = useState(user?.fitnessProfile?.fitnessGoal || 'Muscle Gain & Fat Loss');
  const [experience, setExperience] = useState(user?.fitnessProfile?.workoutExperience || '3 years intermittent lifting');
  const [preferredTime, setPreferredTime] = useState(user?.fitnessProfile?.preferredWorkoutTime || 'Evening (6:30 PM - 8:30 PM)');
  const [address, setAddress] = useState(user?.fitnessProfile?.serviceAddress || '42 Parkview Ave, Apt 4B, Central District');
  const [diet, setDiet] = useState(user?.fitnessProfile?.dietaryPreferences || 'High Protein Non-Vegetarian, Low Sugar');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateClientProfile({
      age,
      height,
      weight,
      fitnessLevel,
      fitnessGoal,
      workoutExperience: experience,
      preferredWorkoutTime: preferredTime,
      serviceAddress: address,
      dietaryPreferences: diet,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6A00]">
            ACCOUNT & BODY PROFILE
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black tracking-tight">
            Client Profile
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Personal biomechanical information used by coaches to program your sessions safely.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white border-2 border-black p-6 sm:p-8 space-y-6">
        
        {/* Personal Details */}
        <div>
          <h3 className="font-editorial text-xl font-black uppercase text-black mb-4 pb-2 border-b border-neutral-200">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Full Name
              </label>
              <input
                type="text"
                disabled
                value={name}
                className="w-full bg-neutral-100 border border-neutral-300 px-3 py-2 text-xs font-bold text-neutral-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-xs font-bold text-black focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Height
              </label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-xs font-bold text-black focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Current Weight
              </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-xs font-bold text-black focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* Fitness Background */}
        <div>
          <h3 className="font-editorial text-xl font-black uppercase text-black mb-4 pb-2 border-b border-neutral-200">
            Fitness Goals & Experience
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Fitness Level
              </label>
              <select
                value={fitnessLevel}
                onChange={(e) => setFitnessLevel(e.target.value as 'Beginner' | 'Intermediate' | 'Advanced')}
                className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2.5 text-xs font-bold text-black focus:outline-none focus:border-black"
              >
                <option value="Beginner">Beginner (New to structured lifting)</option>
                <option value="Intermediate">Intermediate (1-3 years regular training)</option>
                <option value="Advanced">Advanced (Athlete / competitive background)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Primary Fitness Goal
              </label>
              <input
                type="text"
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2.5 text-xs font-bold text-black focus:outline-none focus:border-black"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Workout Experience & Past Injuries
              </label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2.5 text-xs font-bold text-black focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* Logistics & Location */}
        <div>
          <h3 className="font-editorial text-xl font-black uppercase text-black mb-4 pb-2 border-b border-neutral-200">
            Home Training Logistics
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Home Training Address (Trainer Destination)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-300 text-xs font-bold text-black focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Preferred Session Time
                </label>
                <input
                  type="text"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2.5 text-xs font-bold text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Dietary Preferences & Allergies
                </label>
                <input
                  type="text"
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2.5 text-xs font-bold text-black focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
          <div>
            {savedSuccess && (
              <span className="text-xs text-green-700 font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Fitness profile updated successfully!</span>
              </span>
            )}
          </div>

          <button
            type="submit"
            className="px-8 py-3.5 bg-[#0A0A0A] hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE PROFILE CHANGES</span>
          </button>
        </div>

      </form>

    </div>
  );
};
