import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Check,
} from 'lucide-react';

export interface CalendarDayInfo {
  dateStr: string; // YYYY-MM-DD
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
}

export interface InteractiveCalendarProps {
  selectedDate: string; // 'YYYY-MM-DD'
  onSelectDate: (dateStr: string) => void;
  minDate?: string; // 'YYYY-MM-DD'
  maxDate?: string; // 'YYYY-MM-DD'
  className?: string;
  size?: 'compact' | 'standard' | 'large';
  /**
   * Custom badge or status indicator per date
   */
  dateMetadata?: Record<
    string,
    {
      badgeText?: string;
      badgeColor?: 'orange' | 'green' | 'blue' | 'amber' | 'neutral' | 'red';
      dotColor?: string;
      isBlocked?: boolean;
      itemsCount?: number;
      tooltip?: string;
    }
  >;
  /**
   * Custom day cell renderer (e.g., for showing full booking pills in large admin calendar)
   */
  renderDayFooter?: (dateStr: string, isCurrentMonth: boolean) => React.ReactNode;
}

export const InteractiveCalendar: React.FC<InteractiveCalendarProps> = ({
  selectedDate,
  onSelectDate,
  minDate,
  maxDate,
  className = '',
  size = 'standard',
  dateMetadata = {},
  renderDayFooter,
}) => {
  // Parse initial view year and month from selectedDate or fallback to 2026-09
  const initialDate = selectedDate ? new Date(selectedDate + 'T00:00:00') : new Date('2026-09-24T00:00:00');
  const [currentYear, setCurrentYear] = useState<number>(
    isNaN(initialDate.getFullYear()) ? 2026 : initialDate.getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    isNaN(initialDate.getMonth()) ? 8 : initialDate.getMonth()
  ); // 0-indexed: 8 is September

  // Reference "Today" for the mock environment: 2026-09-23
  const todayStr = '2026-09-23';

  // Navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleJumpToToday = () => {
    setCurrentYear(2026);
    setCurrentMonth(8); // September
    onSelectDate(todayStr);
  };

  // Month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Helper to format YYYY-MM-DD
  const formatYMD = (year: number, month: number, day: number): string => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  // Generate days for current view
  // First day of current month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  // In JS Date, getDay(): 0 is Sunday, 1 is Monday ... 6 is Saturday
  // We want Monday = 0, Sunday = 6
  let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startingDayOfWeek === -1) startingDayOfWeek = 6;

  // Number of days in current month
  const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Number of days in previous month
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays: CalendarDayInfo[] = [];

  // Previous month trailing days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    const prevMonthIdx = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const dateStr = formatYMD(prevYear, prevMonthIdx, dayNum);
    calendarDays.push({
      dateStr,
      dayNumber: dayNum,
      isCurrentMonth: false,
      isToday: dateStr === todayStr,
      isPast: minDate ? dateStr < minDate : dateStr < todayStr,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const dateStr = formatYMD(currentYear, currentMonth, d);
    calendarDays.push({
      dateStr,
      dayNumber: d,
      isCurrentMonth: true,
      isToday: dateStr === todayStr,
      isPast: minDate ? dateStr < minDate : dateStr < todayStr,
    });
  }

  // Next month leading days to complete 35 or 42 grid cells
  const remainingCells = (7 - (calendarDays.length % 7)) % 7;
  for (let d = 1; d <= remainingCells; d++) {
    const nextMonthIdx = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const dateStr = formatYMD(nextYear, nextMonthIdx, d);
    calendarDays.push({
      dateStr,
      dayNumber: d,
      isCurrentMonth: false,
      isToday: dateStr === todayStr,
      isPast: minDate ? dateStr < minDate : dateStr < todayStr,
    });
  }

  return (
    <div
      className={`bg-white border-2 border-black flex flex-col select-none ${
        size === 'large' ? 'p-4 sm:p-6' : 'p-3 sm:p-4'
      } ${className}`}
    >
      {/* Month Navigation & Controls Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-[#FF6A00]" />
          <div>
            <h4 className="font-editorial text-lg sm:text-xl font-black uppercase text-black tracking-tight flex items-center gap-2">
              <span>{monthNames[currentMonth]}</span>
              <span className="text-[#FF6A00]">{currentYear}</span>
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleJumpToToday}
            className="min-h-[36px] px-2.5 py-1 bg-neutral-100 hover:bg-black hover:text-white text-[10px] font-black uppercase tracking-wider text-black transition border border-neutral-300 mr-1 active:scale-95"
            title="Jump to Today (Sep 23, 2026)"
          >
            Today
          </button>
          <button
            type="button"
            onClick={handlePrevMonth}
            className="w-9 h-9 sm:w-8 sm:h-8 min-w-[36px] min-h-[36px] flex items-center justify-center bg-white hover:bg-neutral-100 border border-neutral-300 text-black transition active:scale-95"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="w-9 h-9 sm:w-8 sm:h-8 min-w-[36px] min-h-[36px] flex items-center justify-center bg-white hover:bg-neutral-100 border border-neutral-300 text-black transition active:scale-95"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {weekdayNames.map((day, idx) => (
          <div
            key={day}
            className={`py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider ${
              idx >= 5 ? 'text-[#FF6A00]' : 'text-neutral-500'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div
        className={`grid grid-cols-7 gap-1 sm:gap-1.5 ${
          size === 'large' ? 'auto-rows-fr' : ''
        }`}
      >
        {calendarDays.map((day) => {
          const isSelected = selectedDate === day.dateStr;
          const meta = dateMetadata[day.dateStr];
          const isDisabled = (minDate && day.dateStr < minDate) || meta?.isBlocked;

          return (
            <button
              key={day.dateStr}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelectDate(day.dateStr)}
              className={`relative flex flex-col items-center justify-start text-left transition border ${
                size === 'large'
                  ? 'min-h-[78px] sm:min-h-[96px] p-1.5 sm:p-2'
                  : size === 'compact'
                  ? 'min-h-[44px] h-11 sm:h-10 p-0.5 justify-center'
                  : 'min-h-[48px] sm:min-h-[60px] p-1'
              } ${
                isSelected
                  ? 'border-2 border-[#FF6A00] bg-[#FF6A00]/10 text-black font-black ring-1 ring-[#FF6A00]'
                  : day.isToday
                  ? 'border-black bg-neutral-100 text-black font-black'
                  : day.isCurrentMonth
                  ? 'border-neutral-200 bg-white text-neutral-800 hover:border-black hover:bg-neutral-50'
                  : 'border-transparent bg-neutral-50 text-neutral-400 hover:border-neutral-300'
              } ${
                isDisabled
                  ? 'opacity-40 cursor-not-allowed bg-neutral-100 line-through'
                  : 'cursor-pointer'
              }`}
            >
              {/* Day Number Row */}
              <div className="w-full flex items-center justify-between">
                <span
                  className={`text-xs sm:text-sm ${
                    isSelected
                      ? 'font-black text-[#FF6A00]'
                      : day.isToday
                      ? 'font-black underline decoration-[#FF6A00] decoration-2'
                      : day.isCurrentMonth
                      ? 'font-bold'
                      : 'font-normal text-neutral-400'
                  }`}
                >
                  {day.dayNumber}
                </span>

                {day.isToday && (
                  <span className="text-[9px] font-black uppercase text-[#FF6A00] px-1 hidden sm:inline-block">
                    TODAY
                  </span>
                )}

                {meta?.itemsCount !== undefined && meta.itemsCount > 0 && size !== 'large' && (
                  <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
                )}
              </div>

              {/* Status / Slot Badge (if metadata exists) */}
              {meta?.badgeText && (
                <div className="w-full mt-1">
                  <span
                    className={`block truncate text-[9px] sm:text-[10px] font-black uppercase px-1 py-0.5 rounded-none text-center ${
                      meta.badgeColor === 'green'
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : meta.badgeColor === 'orange'
                        ? 'bg-[#FF6A00] text-white'
                        : meta.badgeColor === 'blue'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : meta.badgeColor === 'red'
                        ? 'bg-red-100 text-red-800'
                        : meta.badgeColor === 'amber'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {meta.badgeText}
                  </span>
                </div>
              )}

              {/* Optional footer content (e.g. session pills in admin large view) */}
              {renderDayFooter && renderDayFooter(day.dateStr, day.isCurrentMonth)}
            </button>
          );
        })}
      </div>
    </div>
  );
};
