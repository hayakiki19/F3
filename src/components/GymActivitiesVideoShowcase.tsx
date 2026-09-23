import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Flame,
  ArrowRight,
  Sparkles,
  Maximize2,
} from 'lucide-react';

interface GymActivity {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  targetMuscles: string;
  equipmentBrought: string;
  intensity: 'HIGH' | 'MAXIMUM' | 'ELITE';
}

const ACTIVITIES: GymActivity[] = [
  {
    id: 'battle-ropes',
    number: '01',
    title: 'BATTLE ROPES & HIGH-OCTANE CONDITIONING',
    category: 'Explosive Power & Cardio',
    description: 'Maximal anaerobic power output, core stabilization, and rapid caloric expenditure.',
    videoUrl: 'https://assets.mixkit.co/videos/40766/40766-720.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80',
    targetMuscles: 'Shoulders, Core, Forearms & Lats',
    equipmentBrought: 'Heavy 50ft Poly Dacron Battle Ropes',
    intensity: 'MAXIMUM',
  },
  {
    id: 'dumbbell-pushups',
    number: '02',
    title: 'DUMBBELL DEFICIT PUSH-UPS & CHEST HYPERTROPHY',
    category: 'Hypertrophy & Upper Body',
    description: 'Deep eccentric pec stretch combined with neutral grip dumbbell presses for sculpted chest activation.',
    videoUrl: 'https://assets.mixkit.co/videos/40248/40248-720.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1600&q=80',
    targetMuscles: 'Pectoralis Major, Triceps & Anterior Deltoids',
    equipmentBrought: 'Rubber Hex Dumbbells (5kg - 30kg)',
    intensity: 'HIGH',
  },
  {
    id: 'strength-pulls',
    number: '03',
    title: 'COMPOUND STRENGTH & POSTURAL REALIGNMENT',
    category: 'Maximum Strength',
    description: 'Posterior chain recruitment to eradicate sedentary desk posture and build raw athletic power.',
    videoUrl: 'https://assets.mixkit.co/videos/40765/40765-720.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
    targetMuscles: 'Hamstrings, Glutes, Rhomboids & Erectors',
    equipmentBrought: 'Adjustable Barbell Kit & High-Grip Plates',
    intensity: 'ELITE',
  },
  {
    id: 'athletic-agility',
    number: '04',
    title: 'PLYOMETRIC AGILITY & EXPLOSIVE MOBILITY',
    category: 'Agility & Functional Fitness',
    description: 'Multidirectional speed ladders, hurdle hops, and dynamic kinetic deceleration control.',
    videoUrl: 'https://assets.mixkit.co/videos/40767/40767-720.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=1600&q=80',
    targetMuscles: 'Calves, Quadriceps, Core & Hip Flexors',
    equipmentBrought: 'Agility Ladders, Cones & Resistance Loops',
    intensity: 'HIGH',
  },
  {
    id: 'power-endurance',
    number: '05',
    title: 'ROTATIONAL POWER & METABOLIC FLOW',
    category: 'Full-Body MetCon',
    description: 'Functional biomechanics training that translates directly into athletic dominance and everyday vitality.',
    videoUrl: 'https://assets.mixkit.co/videos/40768/40768-720.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1600&q=80',
    targetMuscles: 'Full Body Kinetic Chain',
    equipmentBrought: 'Competition Kettlebells & Slam Balls',
    intensity: 'MAXIMUM',
  },
];

const SLIDE_DURATION_MS = 8000;

export const GymActivitiesVideoShowcase: React.FC = () => {
  const { openBookingModal } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentActivity = ACTIVITIES[currentIndex];

  // Progress timer for auto-slide
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 100;
    const step = (intervalTime / SLIDE_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Slide to next video
          setCurrentIndex((idx) => (idx + 1) % ACTIVITIES.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  // When index changes, reset progress and load new video
  useEffect(() => {
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted if unmuted
        setIsPlaying(false);
      });
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ACTIVITIES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ACTIVITIES.length) % ACTIVITIES.length);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  return (
    <section className="bg-[#0A0A0A] text-white py-12 sm:py-16 md:py-20 border-b-4 border-black relative overflow-hidden">
      
      {/* Editorial Section Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 bg-[#FF6A00]"></span>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                LIVE MOTION SHOWCASE · IN-HOME ENERGY
              </span>
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.92]">
              REAL GYM POWER.<br />
              <span className="text-[#8DD8FF]">BROUGHT TO YOUR FLOOR.</span>
            </h2>
          </div>

          <div className="max-w-md space-y-4">
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              No crowded gyms. No queuing for machines. Our master coaches bring professional-grade barbells, battle ropes, dumbbells, and athletic programming directly into your living room.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openBookingModal(undefined, 'Trial Session')}
                className="bg-[#FF6A00] hover:bg-[#e05d00] text-white px-5 py-2.5 text-xs font-black uppercase tracking-wider transition flex items-center gap-2"
              >
                <span>BOOK IN-HOME TRIAL (₹499)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">
                0{currentIndex + 1} / 0{ACTIVITIES.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Massive Video Stage Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="relative bg-black border-4 border-neutral-800 overflow-hidden shadow-2xl group"
        >
          {/* Main Huge Video Player */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/8] w-full bg-neutral-950 overflow-hidden">
            <video
              ref={videoRef}
              key={currentActivity.videoUrl}
              src={currentActivity.videoUrl}
              poster={currentActivity.posterUrl}
              preload="auto"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover object-center filter contrast-110 brightness-95 transition-all duration-700"
              onEnded={handleNext}
            />

            {/* Subtle Gymbox high-contrast Vignette / Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/70 pointer-events-none"></div>

            {/* Top Bar Overlay on Video */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-20 pointer-events-auto">
              <div className="flex items-center gap-3 bg-black/85 backdrop-blur-md px-3.5 py-1.5 border border-neutral-700">
                <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></span>
                <span className="text-[11px] font-black uppercase tracking-widest text-white">
                  GYM ACTIVITY #{currentActivity.number}
                </span>
                <span className="text-neutral-500">|</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6A00]">
                  {currentActivity.intensity} INTENSITY
                </span>
              </div>

              {/* Top Right Quick Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                  className="p-2.5 bg-black/85 hover:bg-[#FF6A00] text-white border border-neutral-700 transition"
                  title={isMuted ? 'Click to Unmute' : 'Click to Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#8DD8FF]" />}
                </button>

                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video slide' : 'Play video slide'}
                  className="p-2.5 bg-black/85 hover:bg-[#FF6A00] text-white border border-neutral-700 transition"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={toggleFullscreen}
                  aria-label="Toggle fullscreen view"
                  className="hidden sm:flex p-2.5 bg-black/85 hover:bg-[#FF6A00] text-white border border-neutral-700 transition"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center Editorial Activity Information Overlay */}
            <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 max-w-2xl z-20 pointer-events-none">
              <div className="space-y-2 pointer-events-auto">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8DD8FF] uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-[#FF6A00]" />
                  <span>{currentActivity.category}</span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-[0.95] drop-shadow-md">
                  {currentActivity.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium max-w-xl hidden sm:block">
                  {currentActivity.description}
                </p>

                {/* Specs Pill-free Row */}
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 pt-1 text-[11px] font-bold text-neutral-400">
                  <div>
                    <span className="text-neutral-500 uppercase">Target: </span>
                    <span className="text-white">{currentActivity.targetMuscles}</span>
                  </div>
                  <span>·</span>
                  <div>
                    <span className="text-neutral-500 uppercase">Gear Brought: </span>
                    <span className="text-[#FF6A00]">{currentActivity.equipmentBrought}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Slide Navigation Arrows */}
            <button
              onClick={handlePrev}
              aria-label="Previous gym activity video"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 hover:bg-[#FF6A00] text-white border-2 border-neutral-700 hover:border-black flex items-center justify-center transition z-20 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next gym activity video"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 hover:bg-[#FF6A00] text-white border-2 border-neutral-700 hover:border-black flex items-center justify-center transition z-20 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom Linear Progress Bar for Auto-Slide */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-900 z-30">
              <div
                className="h-full bg-[#FF6A00] transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

          </div>

          {/* Activity Thumbnails / Slide Selector Strip Below Huge Video */}
          <div className="bg-[#111111] border-t-2 border-neutral-800 p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {ACTIVITIES.map((act, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={act.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`text-left p-3 border-2 transition relative flex flex-col justify-between ${
                    isActive
                      ? 'border-[#FF6A00] bg-neutral-900 text-white'
                      : 'border-neutral-800 bg-black/50 text-neutral-400 hover:text-white hover:border-neutral-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-[#FF6A00]' : 'text-neutral-500'}`}>
                      #{act.number}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 bg-[#FF6A00] rounded-full animate-ping"></span>
                    )}
                  </div>

                  <h4 className="font-editorial text-xs sm:text-sm font-black uppercase line-clamp-1">
                    {act.title.split('&')[0]}
                  </h4>

                  <span className="text-[10px] text-neutral-500 font-medium truncate mt-1">
                    {act.category}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Gymbox-style High-Energy Ticker Bar */}
      <div className="mt-8 border-y border-neutral-800 bg-neutral-950 py-3 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee gap-8 text-xs font-black uppercase tracking-[0.25em] text-neutral-400">
          <span>ALL EQUIPMENT BROUGHT BY COACH</span>
          <span className="text-[#FF6A00]">★</span>
          <span>STRENGTH & HYPERTROPHY</span>
          <span className="text-[#8DD8FF]">★</span>
          <span>100% PRIVATE HOME SESSIONS</span>
          <span className="text-[#FF6A00]">★</span>
          <span>FAT LOSS & METABOLIC FLOW</span>
          <span className="text-[#8DD8FF]">★</span>
          <span>CERTIFIED CSCS / NASM TRAINERS</span>
          <span className="text-[#FF6A00]">★</span>
          <span>NO COMMUTE · NO GYM CROWDS</span>
          <span className="text-[#8DD8FF]">★</span>
          <span>ALL EQUIPMENT BROUGHT BY COACH</span>
          <span className="text-[#FF6A00]">★</span>
          <span>STRENGTH & HYPERTROPHY</span>
        </div>
      </div>

    </section>
  );
};
