"use client";
import React from "react";
import { LucideIcon } from "lucide-react";

interface SectionBadgeProps {
  icon: LucideIcon;
  text: string;
  className?: string;
}

export default function SectionBadge({ icon: Icon, text, className = "" }: SectionBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full text-sm font-medium tracking-wide ${className}`}>
      <Icon size={14} className="fill-green-400" />
      {text}
    </div>
  );
}