"use client";

import CTASection from "@/components/CTASection";
import HeroSection from "@/components/Home features/HeroSection";

import VisionProblemSection from "@/components/Home features/VisionProblemSection";
import ImpactTestimonialsSection from "@/components/Home features/ImpactTestimonialsSection";
import ServicesSection from "@/components/Home features/ServicesSection";

export default function Home() {
  return (
    <main
      className="bg-[#F9FAFB] text-[#1F2937]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <HeroSection />
      <VisionProblemSection />
      <ServicesSection />
      <ImpactTestimonialsSection />
      <CTASection />
    </main>
  );
}
