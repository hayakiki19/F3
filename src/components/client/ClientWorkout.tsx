import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Dumbbell,
  CheckCircle2,
  Clock,
  User,
  Sparkles,
  Check,
  Flame,
  RotateCcw,
} from 'lucide-react';

export const ClientWorkout: React.FC = () => {
  const { workoutRoutine, markExerciseComplete, markWholeWorkoutComplete } = useApp();

  const completedCount = workoutRoutine.exercises.filter((e) => e.completed).length;
  const progressPercent = Math.round((completedCount / workoutRoutine.exercises.length) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6A00]">
            TRAINER-ASSIGNED PROGRAM
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-black tracking-tight">
            Workout Plan
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Assigned by Coach {workoutRoutine.assignedBy} · {workoutRoutine.category}
          </p>
        </div>

        <button
          onClick={markWholeWorkoutComplete}
          disabled={workoutRoutine.isCompleted}
          className={`px-6 py-3 text-xs font-black uppercase tracking-wider transition flex items-center gap-2 shadow-sm ${
            workoutRoutine.isCompleted
              ? 'bg-green-600 text-white cursor-default'
              : 'bg-[#FF6A00] hover:bg-[#e05d00] text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{workoutRoutine.isCompleted ? 'WORKOUT COMPLETED! 🎉' : 'MARK ALL COMPLETE'}</span>
        </button>
      </div>

      {/* Routine Banner */}
      <div className="bg-[#0A0A0A] text-white border-2 border-black p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8DD8FF] uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 text-[#FF6A00]" />
            <span>TODAY'S WORKOUT PROTOCOL</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            {workoutRoutine.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-neutral-300">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Est. {workoutRoutine.estimatedMinutes} Minutes</span>
            </span>
            <span>·</span>
            <span>{workoutRoutine.exercises.length} Progressive Overload Exercises</span>
            <span>·</span>
            <span>Equipment Provided by Coach</span>
          </div>
        </div>

        {/* Progress tracker */}
        <div className="bg-neutral-900 border border-neutral-800 p-4 shrink-0 sm:text-right min-w-[200px]">
          <span className="text-[10px] font-bold uppercase text-neutral-400 block">
            Routine Progress
          </span>
          <span className="font-editorial text-3xl font-black text-white">
            {completedCount} / {workoutRoutine.exercises.length}
          </span>
          <div className="w-full h-2 bg-neutral-800 mt-2 overflow-hidden">
            <div
              className="h-full bg-[#FF6A00] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="space-y-4">
        {workoutRoutine.exercises.map((exercise, index) => (
          <div
            key={exercise.id}
            className={`bg-white border-2 p-5 sm:p-6 transition flex flex-col md:flex-row md:items-center justify-between gap-6 ${
              exercise.completed
                ? 'border-green-600 bg-green-50/20'
                : 'border-black hover:border-[#FF6A00]'
            }`}
          >
            {/* Left: Exercise Image & Information */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-900 border border-neutral-300 shrink-0 overflow-hidden relative">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 left-1 bg-black text-white text-[10px] font-black px-1.5 py-0.5">
                  #{index + 1}
                </span>
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-[#FF6A00] tracking-wider">
                    {exercise.target}
                  </span>
                  {exercise.completed && (
                    <span className="text-[10px] font-black uppercase bg-green-600 text-white px-2 py-0.2">
                      Done
                    </span>
                  )}
                </div>

                <h3 className="font-editorial text-xl sm:text-2xl font-black uppercase text-black">
                  {exercise.name}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-neutral-700">
                  <span className="bg-neutral-100 px-2 py-0.5 border border-neutral-200">
                    {exercise.sets} Sets
                  </span>
                  <span className="bg-neutral-100 px-2 py-0.5 border border-neutral-200">
                    {exercise.reps}
                  </span>
                  <span className="text-neutral-500 font-normal">
                    {exercise.rest}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 pt-1 leading-relaxed max-w-xl">
                  {exercise.notes}
                </p>
              </div>
            </div>

            {/* Right: Completion Toggle */}
            <div className="shrink-0 flex items-center justify-end border-t md:border-t-0 pt-3 md:pt-0">
              <button
                onClick={() => markExerciseComplete(exercise.id)}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider transition flex items-center gap-2 border-2 ${
                  exercise.completed
                    ? 'border-green-600 bg-green-600 text-white'
                    : 'border-black hover:bg-black hover:text-white text-black'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>{exercise.completed ? 'COMPLETED' : 'MARK COMPLETE'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
