"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { scheduleConsultation } from "@/actions/consultation";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { DateSelectionStep } from "./DateSelectionStep";
import { TimeSelectionStep } from "./TimeSelectionStep";
import { NotesAndLinkStep } from "./NotesAndLinkStep";
import { ReviewStep } from "./ReviewStep";
import { consultationSchema, ConsultationFormData, FormStep } from "./types";
import { ArrowRight, ArrowLeft, CheckCircle, Zap, Shield, Mail } from "lucide-react";

const STEPS = [
  { label: "Your Details", short: "Info" },
  { label: "Pick a Date", short: "Date" },
  { label: "Choose a Time", short: "Time" },
  { label: "Add Context", short: "Notes" },
  { label: "Confirm", short: "Review" },
];

const STEP_SUBTITLES = [
  "Tell us who you are and what you need",
  "Find a day that works for you",
  "Lock in an available slot",
  "Help us prepare — the more context, the better",
  "Double-check and lock it in",
];

export function ScheduleConsultationForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.PERSONAL_INFO);
  const [isPending, startTransition] = useTransition();
  const [isValidating, setIsValidating] = useState(false);
  const [isMarkedPending, setIsMarkedPending] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ConsultationFormData | null>(null);
  const router = useRouter();

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      selectedDate: undefined,
      selectedTime: "",
      additionalNotes: "",
      googleMeetLink: "",
    },
  });

  const validateCurrentStep = async () => {
    const fieldsToValidate: Record<FormStep, (keyof ConsultationFormData)[]> = {
      [FormStep.PERSONAL_INFO]: ["firstName", "lastName", "email", "phone", "service"],
      [FormStep.DATE_SELECTION]: ["selectedDate"],
      [FormStep.TIME_SELECTION]: ["selectedTime"],
      [FormStep.NOTES_AND_LINK]: ["googleMeetLink"],
      [FormStep.REVIEW]: [],
    };
    return form.trigger(fieldsToValidate[currentStep]);
  };

  const handleNextStep = async () => {
    setIsValidating(true);
    try {
      const isValid = await validateCurrentStep();
      if (isValid) {
        const next = currentStep + 1;
        setCurrentStep(next);
        if (next === FormStep.REVIEW) setIsMarkedPending(true);
      }
    } finally {
      setIsValidating(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      if (currentStep === FormStep.REVIEW) setIsMarkedPending(false);
    }
  };

  const handleResetBooking = () => {
    setBookingConfirmed(false);
    setConfirmedBooking(null);
    form.reset();
    setCurrentStep(FormStep.PERSONAL_INFO);
    setIsMarkedPending(false);
  };

  const handleConfirm = async () => {
    if (!isMarkedPending) {
      toast.error("Please review your booking before confirming.");
      return;
    }
    const values = form.getValues();
    startTransition(async () => {
      try {
        const result = await scheduleConsultation({ ...values, selectedDate: values.selectedDate });
        if (result.success) {
          toast.success("Consultation confirmed!", {
            description: "We sent a confirmation email to your inbox and phone.",
          });
          setConfirmedBooking(values);
          setBookingConfirmed(true);
          form.reset();
          setCurrentStep(FormStep.PERSONAL_INFO);
          setIsMarkedPending(false);
        } else {
          toast.error("Booking failed", { description: result.error || "Please try again" });
        }
      } catch (error: any) {
        toast.error("Something went wrong", { description: error.message });
      }
    });
  };

  const progressPercent = (currentStep / (STEPS.length - 1)) * 100;

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmerBar {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .step-content { animation: fadeUp 0.35s cubic-bezier(0.32,0.72,0,1) both; }
        .slide-in     { animation: fadeSlideIn 0.3s ease both; }

        .progress-bar {
          background: linear-gradient(90deg, #4ade80 0%, #22d3ee 50%, #4ade80 100%);
          background-size: 200% auto;
          animation: shimmerBar 2.5s linear infinite;
        }

        .form-input-dark {
          background: rgba(255,255,255,0.04) !important;
          border-color: rgba(255,255,255,0.1) !important;
          color: white !important;
          transition: all 0.2s ease;
        }
        .form-input-dark:focus {
          border-color: rgba(74,222,128,0.5) !important;
          background: rgba(74,222,128,0.04) !important;
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(74,222,128,0.08) !important;
        }
        .form-input-dark::placeholder { color: rgba(255,255,255,0.3) !important; }
      `}</style>

      <div
        className="min-h-screen flex flex-col"
        style={{ background: "#050D0A" }}
      >
        {/* Background effects */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="fixed top-0 left-1/3 w-[500px] h-[300px] bg-green-500/8 rounded-full blur-[130px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/3 w-[400px] h-[250px] bg-cyan-500/5 rounded-full blur-[110px] pointer-events-none" />

        {/* Floating deco boxes */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="fixed border border-green-500/8 rounded-lg pointer-events-none"
            style={{
              width: `${28 + i * 14}px`,
              height: `${28 + i * 14}px`,
              top: `${10 + i * 18}%`,
              left: i % 2 === 0 ? `${1 + i}%` : undefined,
              right: i % 2 !== 0 ? `${1 + i}%` : undefined,
              opacity: 0.35 - i * 0.05,
              background: "rgba(74,222,128,0.02)",
            }}
          />
        ))}

        <div className="relative z-10 flex-1 py-10 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl mx-auto">
            {bookingConfirmed && confirmedBooking && (
              <div className="mb-6 rounded-3xl border border-green-500/20 bg-green-500/8 p-6 text-white">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-green-200">Confirmed</p>
                    <h2 className="mt-2 text-2xl font-bold text-white">Your consultation is booked.</h2>
                    <p className="mt-2 text-sm text-green-100 max-w-2xl">
                      A confirmation email was sent to your inbox and phone. We’ll see you on{' '}
                      <strong>{confirmedBooking.selectedDate instanceof Date ? confirmedBooking.selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : String(confirmedBooking.selectedDate)}</strong>{' '}
                      at <strong>{confirmedBooking.selectedTime}</strong>.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => router.push("/")}
                      className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-100"
                    >
                      Go Home
                    </button>
                    <button
                      type="button"
                      onClick={handleResetBooking}
                      className="rounded-2xl border border-green-200 bg-transparent px-5 py-3 text-sm font-semibold text-green-100 transition hover:bg-green-500/10"
                    >
                      Book Another
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Header ── */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/25 text-green-400 rounded-full text-xs font-semibold uppercase tracking-widest mb-5">
                <Zap size={10} className="fill-green-400" />
                Free Consultation
              </div>
              <h1
                className="text-3xl sm:text-4xl font-black text-white mb-2"
                style={{ fontFamily: "var(--font-display), var(--font-primary), system-ui, sans-serif" }}
              >
                Book Your{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
                >
                  Strategy Session
                </span>
              </h1>
              <p className="text-gray-500 text-sm">
                {STEP_SUBTITLES[currentStep]}
              </p>
            </div>

            {/* ── Progress ── */}
            <div className="mb-8">
              {/* Step pills */}
              <div className="flex items-center justify-between mb-3 gap-1">
                {STEPS.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-1 flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black mb-1 transition-all duration-400"
                        style={{
                          background:
                            idx < currentStep
                              ? "linear-gradient(135deg, #4ade80, #22d3ee)"
                              : idx === currentStep
                              ? "rgba(74,222,128,0.15)"
                              : "rgba(255,255,255,0.05)",
                          border:
                            idx < currentStep
                              ? "none"
                              : idx === currentStep
                              ? "1px solid rgba(74,222,128,0.4)"
                              : "1px solid rgba(255,255,255,0.08)",
                          color:
                            idx < currentStep
                              ? "#000"
                              : idx === currentStep
                              ? "#4ade80"
                              : "#555",
                          transform: idx === currentStep ? "scale(1.1)" : "scale(1)",
                        }}
                      >
                        {idx < currentStep ? <CheckCircle size={14} /> : idx + 1}
                      </div>
                      <span
                        className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider hidden sm:block"
                        style={{
                          color: idx <= currentStep ? "#4ade80" : "#444",
                        }}
                      >
                        {step.short}
                      </span>
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div
                        className="h-[1px] flex-1 mx-1 rounded-full transition-all duration-500"
                        style={{
                          background:
                            idx < currentStep
                              ? "linear-gradient(90deg, #4ade80, #22d3ee)"
                              : "rgba(255,255,255,0.08)",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div
                  className="h-full rounded-full progress-bar transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-600">Step {currentStep + 1} of {STEPS.length}</span>
                <span className="text-xs" style={{ color: "#4ade80" }}>
                  {STEPS[currentStep].label}
                </span>
              </div>
            </div>

            {/* ── Form Card ── */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(74,222,128,0.12)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, transparent, #4ade80, #22d3ee, transparent)" }}
              />

              <div className="p-6 sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">

                    <div className="step-content" key={currentStep}>
                      {currentStep === FormStep.PERSONAL_INFO && <PersonalInfoStep form={form} isPending={isPending} />}
                      {currentStep === FormStep.DATE_SELECTION && <DateSelectionStep form={form} isPending={isPending} />}
                      {currentStep === FormStep.TIME_SELECTION && <TimeSelectionStep form={form} isPending={isPending} />}
                      {currentStep === FormStep.NOTES_AND_LINK && <NotesAndLinkStep form={form} isPending={isPending} />}
                      {currentStep === FormStep.REVIEW && <ReviewStep form={form} isPending={isPending} />}
                    </div>

                    {/* ── Nav buttons ── */}
                    <div
                      className="flex items-center gap-3 pt-5"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      {currentStep > FormStep.PERSONAL_INFO && (
                        <button
                          type="button"
                          onClick={handlePreviousStep}
                          disabled={isPending}
                          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-gray-400 transition-all duration-200 hover:text-white"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          <ArrowLeft size={15} />
                          Back
                        </button>
                      )}

                      <div className="flex-1" />

                      {currentStep < FormStep.REVIEW ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          disabled={isValidating || isPending}
                          className="group flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-black transition-all duration-300 disabled:opacity-60"
                          style={{
                            background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                            boxShadow: "0 0 24px rgba(74,222,128,0.3)",
                          }}
                        >
                          {isValidating ? (
                            <>
                              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                              </svg>
                              Validating…
                            </>
                          ) : (
                            <>
                              Continue
                              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleConfirm}
                          disabled={isPending || bookingConfirmed}
                          className="group flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-black transition-all duration-300 disabled:opacity-60"
                          style={{
                            background: isPending || bookingConfirmed
                              ? "rgba(74,222,128,0.4)"
                              : "linear-gradient(135deg, #4ade80, #22d3ee)",
                            boxShadow: isPending || bookingConfirmed ? "none" : "0 0 24px rgba(74,222,128,0.35)",
                          }}
                        >
                          {isPending ? (
                            <>
                              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                              </svg>
                              Locking You In…
                            </>
                          ) : (
                            <>
                              <CheckCircle size={15} />
                              Confirm Session
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </form>
                </Form>
              </div>
            </div>

            {/* ── Trust strip ── */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Zap, text: "Reply in 24hrs" },
                { icon: Shield, text: "100% Confidential" },
                { icon: Mail, text: "Instant Confirmation" },
              ].map(({ icon: Icon, text }, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-center"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Icon size={14} style={{ color: "#4ade80" }} />
                  <span className="text-xs text-gray-600">{text}</span>
                </div>
              ))}
            </div>

            {/* Legal */}
            <p className="text-center text-xs text-gray-700 mt-5">
              By booking, you agree to our{" "}
              <a href="#" className="text-green-400 hover:underline">privacy policy</a>
              {" "}and{" "}
              <a href="#" className="text-green-400 hover:underline">terms of service</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}