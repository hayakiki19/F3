import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingDown,
  Calendar,
  Award,
  Plus,
  Scale,
  Camera,
  Activity,
  CheckCircle,
} from 'lucide-react';

export const ClientProgress: React.FC = () => {
  const { user } = useApp();

  const [weightLogs, setWeightLogs] = useState([
    { date: 'Aug 01', weight: 78.0 },
    { date: 'Aug 15', weight: 77.2 },
    { date: 'Sep 01', weight: 75.8 },
    { date: 'Sep 15', weight: 74.5 },
    { date: 'Sep 23', weight: 74.0 },
  ]);

  const [newWeight, setNewWeight] = useState('73.8');
  const [logSuccess, setLogSuccess] = useState(false);

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight) return;
    setWeightLogs((prev) => [
      ...prev,
      {
        date: 'Today',
        weight: parseFloat(newWeight),
      },
    ]);
    setLogSuccess(true);
    setTimeout(() => setLogSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6A00]">
            METRICS & BIOMETRICS
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black tracking-tight">
            Progress Tracking
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Quantifiable body recomposition results audited by your assigned personal trainer.
          </p>
        </div>
      </div>

      {/* Top 4 Stat Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Weight */}
        <div className="p-5 bg-white border-2 border-black">
          <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
            Body Weight
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-editorial text-4xl font-black text-black">74.0</span>
            <span className="text-xs font-bold text-neutral-500">kg</span>
          </div>
          <p className="text-xs text-green-700 font-bold mt-1 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-4.0 kg from 78.0 kg start</span>
          </p>
        </div>

        {/* Sessions Completed */}
        <div className="p-5 bg-white border-2 border-black">
          <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
            Completed Sessions
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-editorial text-4xl font-black text-black">18</span>
            <span className="text-xs font-bold text-neutral-500">Sessions</span>
          </div>
          <p className="text-xs text-neutral-600 font-medium mt-1">
            100% Home attendance rate
          </p>
        </div>

        {/* Body Fat */}
        <div className="p-5 bg-white border-2 border-black">
          <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
            Body Fat Estimate
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-editorial text-4xl font-black text-black">15.2%</span>
          </div>
          <p className="text-xs text-green-700 font-bold mt-1">
            Down from 18.5%
          </p>
        </div>

        {/* Target Goal */}
        <div className="p-5 bg-neutral-900 text-white border-2 border-black">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6A00] block">
            Current Target
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-editorial text-4xl font-black text-white">72.0</span>
            <span className="text-xs font-bold text-neutral-400">kg</span>
          </div>
          <p className="text-xs text-[#8DD8FF] font-bold mt-1">
            2.0 kg to goal milestone
          </p>
        </div>
      </div>

      {/* Main Grid: Weight Log Graph + Body Measurements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Weight Log Tracker */}
        <div className="lg:col-span-7 bg-white border-2 border-black p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-editorial text-2xl font-black uppercase text-black">
                Weight Journey (78 kg → 74 kg)
              </h3>
              <p className="text-xs text-neutral-500">Recorded during weekly coach check-ins.</p>
            </div>
            <Scale className="w-5 h-5 text-[#FF6A00]" />
          </div>

          {/* Simple Visual Bar Chart */}
          <div className="space-y-3 pt-2">
            {weightLogs.map((log, index) => {
              const baseMin = 70;
              const max = 80;
              const percent = ((log.weight - baseMin) / (max - baseMin)) * 100;

              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-neutral-500 uppercase">{log.date}</span>
                    <span className="text-black font-black">{log.weight} kg</span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 overflow-hidden">
                    <div
                      className="h-full bg-[#0A0A0A] hover:bg-[#FF6A00] transition"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form to log new weight today */}
          <form onSubmit={handleAddWeight} className="pt-4 border-t border-neutral-200 flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Log Weight Check-in Today:
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-xs font-bold text-black focus:outline-none focus:border-black"
                />
                <span className="ml-2 text-xs font-bold text-neutral-500">kg</span>
              </div>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0A0A0A] hover:bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider transition"
            >
              Add Entry
            </button>
          </form>
          {logSuccess && (
            <p className="text-xs text-green-700 font-bold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Weight entry saved and synced with coach!</span>
            </p>
          )}
        </div>

        {/* Right: Tape Measurements */}
        <div className="lg:col-span-5 bg-white border-2 border-black p-6 space-y-4">
          <div>
            <h3 className="font-editorial text-2xl font-black uppercase text-black">
              Tape Measurements
            </h3>
            <p className="text-xs text-neutral-500">Girth tracking performed every 4 weeks.</p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { part: 'Chest', initial: '41.0 in', current: '42.5 in', change: '+1.5 in' },
              { part: 'Waist', initial: '34.0 in', current: '31.5 in', change: '-2.5 in' },
              { part: 'Right Bicep', initial: '14.0 in', current: '15.2 in', change: '+1.2 in' },
              { part: 'Thighs', initial: '23.0 in', current: '23.8 in', change: '+0.8 in' },
            ].map((item, i) => (
              <div
                key={i}
                className="p-3 bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-black text-black uppercase">{item.part}</span>
                  <span className="text-neutral-400 block text-[10px]">Start: {item.initial}</span>
                </div>
                <div className="text-right">
                  <span className="font-editorial text-lg font-black text-black">{item.current}</span>
                  <span className="text-[10px] font-bold text-green-700 block">{item.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-neutral-100 border border-neutral-200 text-xs text-neutral-600">
            Next scheduled tape audit with coach Arjun: <strong>October 05, 2026</strong>.
          </div>
        </div>

      </div>

      {/* Visual Transformation Photo Comparison */}
      <div className="bg-white border-2 border-black p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-editorial text-2xl font-black uppercase text-black">
              Transformation Check-in Photos
            </h3>
            <p className="text-xs text-neutral-500">Confidential photos stored securely between you and your coach.</p>
          </div>
          <button
            onClick={() => alert('Camera access simulated: Select a photo to upload your Week 9 check-in.')}
            className="px-4 py-2 border border-black hover:bg-black hover:text-white text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Upload New Check-in</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="border border-neutral-200 bg-neutral-50 p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-2">
              WEEK 1 (START) · 78.0 KG
            </span>
            <div className="aspect-[4/3] bg-neutral-300 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop"
                alt="Week 1"
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
            </div>
            <p className="text-xs text-neutral-600 mt-2 font-medium">Initial baseline measurement posture.</p>
          </div>

          <div className="border-2 border-[#FF6A00] bg-neutral-50 p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6A00] block mb-2">
              WEEK 8 (CURRENT) · 74.0 KG
            </span>
            <div className="aspect-[4/3] bg-neutral-900 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop"
                alt="Week 8"
                className="w-full h-full object-cover contrast-110"
              />
            </div>
            <p className="text-xs text-neutral-900 mt-2 font-bold">
              Noticeable abdominal definition and posture realignment.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
