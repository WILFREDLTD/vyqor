"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { services } from "@/constants";
import { ConsultationFormData } from "./types";
import { User, Mail, Phone, Layers } from "lucide-react";

interface PersonalInfoStepProps {
  form: UseFormReturn<ConsultationFormData>;
  isPending: boolean;
}

const inputCls =
  "h-11 bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-600 rounded-xl text-sm focus:border-green-500/50 focus:ring-0 focus:bg-green-500/[0.04] transition-all duration-200";

const labelCls = "text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 flex items-center gap-1.5";

export function PersonalInfoStep({ form, isPending }: PersonalInfoStepProps) {
  return (
    <div className="space-y-5">
      {/* Name row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>
                <User size={10} className="text-green-400" /> First Name
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Amara"
                    className={inputCls}
                    {...field}
                    disabled={isPending}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-xs mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>
                <User size={10} className="text-green-400" /> Last Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Osei"
                  className={inputCls}
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs mt-1" />
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
              <FormLabel className={labelCls}>
                <Mail size={10} className="text-green-400" /> Work Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  className={inputCls}
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>
                <Phone size={10} className="text-green-400" /> Phone Number
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+254 7__ ___ ___"
                  className={inputCls}
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs mt-1" />
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
            <FormLabel className={labelCls}>
              <Layers size={10} className="text-green-400" /> What Do You Need Built?
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
              <FormControl>
                <SelectTrigger
                  className="h-11 bg-white/[0.04] border border-white/10 text-white rounded-xl text-sm focus:border-green-500/50 focus:ring-0 data-[placeholder]:text-gray-600"
                >
                  <SelectValue placeholder="Select a service area" />
                </SelectTrigger>
              </FormControl>
              <SelectContent
                className="max-h-60 overflow-y-auto rounded-xl border border-green-500/20"
                style={{
                  background: "rgba(6, 16, 10, 0.98)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {services.map((service: string, idx: number) => (
                  <SelectItem
                    key={idx}
                    value={service.toLowerCase().replace(/\s+/g, "-")}
                    className="text-sm text-gray-400 focus:bg-green-500/15 focus:text-white rounded-lg"
                  >
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-red-400 text-xs mt-1" />
          </FormItem>
        )}
      />
    </div>
  );
}