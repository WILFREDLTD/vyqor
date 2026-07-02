"use client";

import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import { ConsultationFormData } from "./types";
import { User, Mail, Phone, Layers, CalendarCheck, Clock, Video, FileText, CheckCircle2 } from "lucide-react";

interface ReviewStepProps {
  form: UseFormReturn<ConsultationFormData>;
  isPending?: boolean;
}

function ReviewRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div
      className="flex items-center gap-3 py-3 px-4 rounded-xl"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.15), rgba(34,211,238,0.1))" }}
      >
        <Icon size={13} style={{ color: "#4ade80" }} />
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block">{label}</span>
        <span className="text-sm font-semibold text-white truncate block">{value}</span>
      </div>
    </div>
  );
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-1">
        <div className="h-[1px] w-3 rounded-full" style={{ background: "#4ade80" }} />
        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#4ade80" }}>
          {title}
        </span>
        <div className="h-[1px] flex-1 rounded-full" style={{ background: "rgba(74,222,128,0.15)" }} />
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function ReviewStep({ form, isPending }: ReviewStepProps) {
  const firstName = form.getValues("firstName");
  const lastName = form.getValues("lastName");
  const email = form.getValues("email");
  const phone = form.getValues("phone");
  const service = form.getValues("service");
  const selectedDate = form.getValues("selectedDate");
  const selectedTime = form.getValues("selectedTime");
  const additionalNotes = form.getValues("additionalNotes");
  const googleMeetLink = form.getValues("googleMeetLink");

  return (
    <div className="space-y-5">
      {/* Status badge */}
      <div className="flex justify-center">
        {isPending ? (
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
            style={{
              background: "rgba(251,191,36,0.1)",
              border: "1px solid rgba(251,191,36,0.3)",
              color: "#fbbf24",
            }}
          >
            <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Locking in your session…
          </span>
        ) : (
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
            style={{
              background: "rgba(74,222,128,0.1)",
              border: "1px solid rgba(74,222,128,0.25)",
              color: "#4ade80",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Ready to Confirm
          </span>
        )}
      </div>

      {/* Personal info */}
      <SectionBlock title="Your Details">
        <ReviewRow icon={User} label="Full Name" value={`${firstName} ${lastName}`} />
        <ReviewRow icon={Mail} label="Email Address" value={email} />
        <ReviewRow icon={Phone} label="Phone" value={phone} />
      </SectionBlock>

      {/* Service */}
      <SectionBlock title="Requested Service">
        <ReviewRow icon={Layers} label="Service Area" value={service} />
      </SectionBlock>

      {/* Date & Time */}
      <SectionBlock title="Scheduled Slot">
        <ReviewRow
          icon={CalendarCheck}
          label="Date"
          value={format(selectedDate || new Date(), "EEEE, MMMM do, yyyy")}
        />
        <ReviewRow icon={Clock} label="Time (EAT)" value={selectedTime} />
      </SectionBlock>

      {/* Meeting link */}
      <SectionBlock title="Video Session">
        {googleMeetLink ? (
          <div
            className="flex items-center gap-3 py-3 px-4 rounded-xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "rgba(74,222,128,0.15)" }}
            >
              <Video size={13} style={{ color: "#4ade80" }} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block">Meet Link</span>
              <a
                href={googleMeetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-green-400 hover:underline truncate block"
              >
                {googleMeetLink}
              </a>
            </div>
          </div>
        ) : (
          <div
            className="flex items-start gap-2 px-4 py-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <Video size={13} className="mt-0.5 shrink-0 text-gray-500" />
            <p className="text-xs text-gray-500 leading-relaxed">
              We'll generate a Google Meet link and include it in your confirmation email.
            </p>
          </div>
        )}
      </SectionBlock>

      {/* Notes */}
      {additionalNotes && (
        <SectionBlock title="Project Notes">
          <div
            className="px-4 py-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <FileText size={11} style={{ color: "#4ade80" }} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Your Brief</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed italic">{additionalNotes}</p>
          </div>
        </SectionBlock>
      )}

      {/* Confirm callout */}
      <div
        className="flex items-start gap-3 px-4 py-4 rounded-xl"
        style={{
          background: "rgba(74,222,128,0.07)",
          border: "1px solid rgba(74,222,128,0.2)",
        }}
      >
        <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: "#4ade80" }} />
        <div>
          <p className="text-sm font-bold text-white mb-0.5">Everything look right?</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Hit <span className="text-green-400 font-semibold">Confirm Session</span> below and a
            confirmation will be sent to <span className="text-white">{email}</span>.
          </p>
        </div>
      </div>
    </div>
  );
}