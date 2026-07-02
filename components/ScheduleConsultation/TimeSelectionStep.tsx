"use client";

import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import { Clock, CalendarCheck } from "lucide-react";
import { ConsultationFormData, AVAILABLE_HOURS } from "./types";
import { useEffect, useState } from "react";

interface TimeSelectionStepProps {
  form: UseFormReturn<ConsultationFormData>;
  isPending: boolean;
}

export function TimeSelectionStep({ form, isPending }: TimeSelectionStepProps) {
  const selectedDate = form.watch("selectedDate");
  const selectedTime = form.watch("selectedTime");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingBooked, setLoadingBooked] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchBooked() {
      if (!selectedDate) { setBookedSlots([]); return; }
      setLoadingBooked(true);
      try {
        const yyyy = selectedDate.getFullYear();
        const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const dd = String(selectedDate.getDate()).padStart(2, "0");
        const res = await fetch(`/api/consultations/booked?date=${yyyy}-${mm}-${dd}`);
        if (res.ok) {
          const json = await res.json();
          if (mounted && Array.isArray(json.bookedTimes)) {
            setBookedSlots(json.bookedTimes);
            if (json.bookedTimes.includes(selectedTime)) form.setValue("selectedTime", "");
          }
        }
      } catch { setBookedSlots([]); }
      finally { if (mounted) setLoadingBooked(false); }
    }
    fetchBooked();
    return () => { mounted = false; };
  }, [selectedDate]);

  return (
    <div className="space-y-5">
      {/* Selected date recap */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{
          background: "rgba(74,222,128,0.06)",
          border: "1px solid rgba(74,222,128,0.15)",
        }}
      >
        <CalendarCheck size={15} style={{ color: "#4ade80" }} />
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">Booking For</span>
          <span className="text-sm font-bold text-white">
            {format(selectedDate || new Date(), "EEEE, MMMM do, yyyy")}
          </span>
        </div>
      </div>

      {/* Slot label */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock size={13} style={{ color: "#4ade80" }} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Available Slots (EAT)
          </span>
          {loadingBooked && (
            <span className="text-[10px] text-gray-600 ml-auto">Checking availability…</span>
          )}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {AVAILABLE_HOURS.map((hour) => {
            const booked = bookedSlots.includes(hour);
            const selected = selectedTime === hour;
            return (
              <button
                key={hour}
                type="button"
                onClick={() => !booked && form.setValue("selectedTime", hour)}
                disabled={isPending || booked}
                title={booked ? "Already taken" : undefined}
                className="relative py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95"
                style={{
                  background: selected
                    ? "linear-gradient(135deg, #4ade80, #22d3ee)"
                    : booked
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,255,255,0.04)",
                  border: selected
                    ? "none"
                    : booked
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "1px solid rgba(255,255,255,0.09)",
                  color: selected ? "#000" : booked ? "#333" : "#999",
                  cursor: booked ? "not-allowed" : "pointer",
                  boxShadow: selected ? "0 4px 16px rgba(74,222,128,0.25)" : "none",
                  transform: selected ? "scale(1.04)" : "scale(1)",
                  textDecoration: booked ? "line-through" : "none",
                }}
              >
                {hour}
                {booked && (
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[8px] font-black uppercase tracking-widest rounded-xl"
                    style={{ color: "#3a3a3a", background: "rgba(0,0,0,0.2)" }}
                  >
                    Taken
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected time pill */}
      {selectedTime && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl slide-in"
          style={{
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.25)",
          }}
        >
          <Clock size={15} style={{ color: "#4ade80" }} />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
              Selected Time
            </span>
            <span className="text-sm font-black text-white">{selectedTime}</span>
          </div>
        </div>
      )}
    </div>
  );
}