"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Video, Info } from "lucide-react";
import { ConsultationFormData } from "./types";

interface NotesAndLinkStepProps {
  form: UseFormReturn<ConsultationFormData>;
  isPending: boolean;
}

const labelCls = "text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 flex items-center gap-1.5";
const inputCls =
  "bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-600 rounded-xl text-sm focus:border-green-500/50 focus:ring-0 focus:bg-green-500/[0.04] transition-all duration-200";

export function NotesAndLinkStep({ form, isPending }: NotesAndLinkStepProps) {
  return (
    <div className="space-y-5">
      {/* Notes */}
      <FormField
        control={form.control}
        name="additionalNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={labelCls}>
              <FileText size={10} className="text-green-400" />
              Project Context
              <span className="text-gray-600 font-normal normal-case tracking-normal ml-1">(optional)</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe what you're building, the problem you're solving, or what's currently broken. The more context, the faster we can tailor the session."
                className={`${inputCls} min-h-[120px] resize-none`}
                {...field}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage className="text-red-400 text-xs mt-1" />
          </FormItem>
        )}
      />

      {/* Meet link */}
      <FormField
        control={form.control}
        name="googleMeetLink"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={labelCls}>
              <Video size={10} className="text-green-400" />
              Google Meet Link
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Video
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#4ade80" }}
                />
                <Input
                  type="url"
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                  className={`${inputCls} pl-9`}
                  {...field}
                  disabled={isPending}
                />
              </div>
            </FormControl>
            <FormMessage className="text-red-400 text-xs mt-1" />

            {/* Helper hint */}
            <div
              className="flex items-start gap-2 mt-2 px-3 py-2.5 rounded-lg"
              style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.12)" }}
            >
              <Info size={11} className="mt-0.5 shrink-0" style={{ color: "#4ade80" }} />
              <p className="text-xs text-gray-600 leading-relaxed">
                If you don't have a link ready, we'll generate one from our end and include it in your confirmation email.
              </p>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}