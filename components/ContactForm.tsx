"use client";

import type React from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { IoIosSend } from "react-icons/io";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { formSchema } from "@/schema/schema";
import { getFormattedDateTime } from "@/lib/formattedDateTime";
import { sendContactEmail } from "@/actions/email";
import { services } from "@/constants";

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await sendContactEmail(values);
        form.reset();
        toast.success("Message received!", {
          description: `Sent on ${getFormattedDateTime()}. We'll respond within 24 hours.`,
        });
      } catch (error: any) {
        toast.error("Couldn't send your message", {
          description: error?.message || "Something went wrong — please try again.",
        });
      }
    });
  }

  const inputClass =
    "h-11 bg-white/[0.05] border border-white/10 text-white placeholder:text-gray-600 focus:border-green-500/50 focus:ring-0 focus:bg-white/[0.07] rounded-lg text-sm transition-all duration-200";

  const labelClass = "text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1.5";

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8">
      {/* Form header */}
      <div className="mb-7">
        <h3
          className="text-xl font-black text-white mb-1"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Send Us a Brief
        </h3>
        <p className="text-gray-500 text-sm">
          Tell us about your project — we'll get back to you within 24 hours.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

          {/* Name row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className={inputClass}
                      placeholder="Amara"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className={inputClass}
                      placeholder="Osei"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Contact row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Work Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      className={inputClass}
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+2547________"
                      className={inputClass}
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Service select */}
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>What Do You Need Built?</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
                  <FormControl>
                    <SelectTrigger
                      className="w-full h-11 bg-white/[0.05] border border-white/10 text-white rounded-lg focus:border-green-500/50 focus:ring-0 text-sm"
                    >
                      <SelectValue placeholder="Select a service area" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#0a1a10] border border-green-500/20 text-white max-h-60 overflow-y-auto">
                    {services.map((service: string, index: number) => (
                      <SelectItem
                        key={index}
                        value={service.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}
                        className="text-sm text-gray-300 focus:bg-green-500/15 focus:text-white"
                      >
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Project Brief</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe what you're building, the problem you're solving, or what's currently broken. The more detail, the faster we can scope a solution."
                    className={`${inputClass} min-h-[110px] resize-none h-auto`}
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full h-12 rounded-xl font-bold text-black text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: isPending
                ? "rgba(74,222,128,0.5)"
                : "linear-gradient(135deg, #4ade80, #22d3ee)",
              boxShadow: isPending ? "none" : "0 0 24px rgba(74,222,128,0.3)",
            }}
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Dispatching Your Brief…
              </>
            ) : (
              <>
                Fire Off My Message
                <IoIosSend size={16} />
              </>
            )}
          </button>
        </form>
      </Form>

      <p className="mt-5 text-xs text-center text-gray-600 leading-relaxed">
        Your information is kept strictly confidential. We respond within 24 hours — usually sooner.
      </p>
    </div>
  );
}