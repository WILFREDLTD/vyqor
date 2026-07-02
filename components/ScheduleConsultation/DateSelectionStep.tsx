"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { ChevronLeft, ChevronRight, CalendarCheck } from "lucide-react";
import { ConsultationFormData } from "./types";

interface DateSelectionStepProps {
  form: UseFormReturn<ConsultationFormData>;
  isPending: boolean;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DateSelectionStep({ form, isPending }: DateSelectionStepProps) {
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const selectedDate = form.watch("selectedDate");
  const today = startOfDay(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDayOfWeek = new Date(year, month, 1).getDay();
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(calendarMonth);

  const calendarDays: (Date | null)[] = [
    ...Array(startingDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const isSelected = (day: Date) =>
    selectedDate && format(selectedDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");

  const isPast = (day: Date) => isBefore(day, today);

  return (
    <div className="space-y-5">

      {/* Month navigator */}
      <div
        className="flex items-center justify-between px-4 py-3 rounded-xl"
        style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)" }}
      >
        <button
          type="button"
          onClick={() => setCalendarMonth(addDays(calendarMonth, -32))}
          disabled={isPending}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <ChevronLeft size={16} />
        </button>

        <h3
          className="text-sm font-black text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {format(calendarMonth, "MMMM yyyy")}
        </h3>

        <button
          type="button"
          onClick={() => setCalendarMonth(addDays(calendarMonth, 32))}
          disabled={isPending}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {/* Weekday headers */}
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-bold uppercase tracking-widest py-2"
            style={{ color: "#4ade80" }}
          >
            {d}
          </div>
        ))}

        {/* Day cells */}
        {calendarDays.map((day, idx) => {
          if (!day) return <div key={idx} />;
          const past = isPast(day);
          const selected = isSelected(day);
          const isToday = format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");

          return (
            <button
              key={idx}
              type="button"
              onClick={() => !past && form.setValue("selectedDate", day)}
              disabled={past || isPending}
              className="relative aspect-square rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
              style={{
                background: selected
                  ? "linear-gradient(135deg, #4ade80, #22d3ee)"
                  : isToday
                  ? "rgba(74,222,128,0.1)"
                  : "rgba(255,255,255,0.03)",
                border: selected
                  ? "none"
                  : isToday
                  ? "1px solid rgba(74,222,128,0.4)"
                  : "1px solid rgba(255,255,255,0.06)",
                color: selected ? "#000" : past ? "#2a2a2a" : "#ccc",
                cursor: past ? "not-allowed" : "pointer",
                transform: selected ? "scale(1.05)" : "scale(1)",
                boxShadow: selected ? "0 4px 16px rgba(74,222,128,0.3)" : "none",
              }}
            >
              {day.getDate()}
              {isToday && !selected && (
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: "#4ade80" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected date pill */}
      {selectedDate && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl slide-in"
          style={{
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.25)",
          }}
        >
          <CalendarCheck size={16} style={{ color: "#4ade80" }} />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
              Selected Date
            </span>
            <span className="text-sm font-bold text-white">
              {format(selectedDate, "EEEE, MMMM do, yyyy")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}