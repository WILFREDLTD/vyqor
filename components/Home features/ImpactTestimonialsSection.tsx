"use client";
import React, { useState, useEffect, useRef } from "react";
import { Briefcase, Globe, Users, ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { testimonials } from "@/constants";
import SectionBackground from "../SectionBackground";

// ── Static demo testimonials if @/constants is unavailable ──
const demoTestimonials = [
  { name: "Amara Osei", project: "Retail POS Rollout", date: "Jan 2025", rating: 5, testimonial: "Our checkout speed tripled overnight. The POS system they built handles our peak hours without breaking a sweat — something our old solution never managed." },
  { name: "Fatima Mwangi", project: "E-commerce Platform", date: "Feb 2025", rating: 5, testimonial: "We went from a basic website to a fully automated storefront with payments and inventory sync. Revenue jumped 40% in the first quarter post-launch." },
  { name: "Kwame Asante", project: "Cloud Migration", date: "Mar 2025", rating: 5, testimonial: "Migrating 6 years of data to the cloud sounded terrifying. Their team made it seamless. Zero downtime, zero data loss — just a faster, more reliable operation." },
  { name: "Zara Diallo", project: "Mobile Banking App", date: "Dec 2024", rating: 5, testimonial: "The app they built handles 10,000 daily transactions flawlessly. Our users love it and our support tickets dropped by 60%. That's the real measure of good engineering." },
  { name: "Emeka Nwosu", project: "ERP Implementation", date: "Nov 2024", rating: 5, testimonial: "For the first time, our finance, HR, and ops teams are all working from the same data. The efficiency gains alone paid for the project in under four months." },
  { name: "Aisha Kamara", project: "Notification System", date: "Oct 2024", rating: 5, testimonial: "Our customer engagement rate went from 12% to 67% after deploying their omnichannel notification system. The ROI was immediate and undeniable." },
  { name: "Chidi Eze", project: "Payment Gateway", date: "Sep 2024", rating: 4, testimonial: "We now accept 14 payment methods across 6 countries. What used to take weeks of custom dev work was live in 72 hours. Absolutely world-class execution." },
  { name: "Nadia Hassan", project: "Analytics Dashboard", date: "Aug 2024", rating: 5, testimonial: "I used to wait two weeks for monthly reports. Now I check my KPIs over morning coffee. The dashboard they built changed how our entire leadership team operates." },
];

const pillars = [
  {
    icon: Briefcase,
    label: "For Enterprises",
    title: "Competes Without the Overhead",
    description:
      "We strip away the enterprise tax — giving ambitious businesses access to Fortune-500-grade software at a fraction of the traditional cost. Grow faster, operate leaner.",
    gradient: ["#4ade80", "#22d3ee"],
    glow: "#4ade80",
  },
  {
    icon: Globe,
    label: "For the Continent",
    title: "Wires Africa Into the Digital Economy",
    description:
      "Every platform we ship creates skilled jobs, enables cross-border commerce, and seeds the infrastructure a thriving digital Africa needs. We build with legacy in mind.",
    gradient: ["#22d3ee", "#818cf8"],
    glow: "#22d3ee",
  },
  {
    icon: Users,
    label: "For Partners",
    title: "Relationships Built on Real Results",
    description:
      "No vanity metrics. No scope creep. We measure success the same way you do — revenue moved, costs cut, systems that hold. Integrity isn't a promise; it's our operating model.",
    gradient: ["#a78bfa", "#f472b6"],
    glow: "#a78bfa",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-700 fill-gray-700"}
        />
      ))}
    </div>
  );
}

export default function ImpactTestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [embla, setEmbla] = useState<any>(null);
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  const safeTestimonials = testimonials?.length ? testimonials : demoTestimonials;

  const plugin = useRef(Autoplay({ delay: 4500, stopOnInteraction: false }));

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setCurrentSlide(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    return () => embla.off("select", onSelect);
  }, [embla]);

  return (
    <section className="relative bg-[#050D0A] text-white overflow-hidden py-24 w-full">
      <SectionBackground />

      <div className="relative z-10 px-6 sm:px-10 lg:px-20  mx-auto">

        {/* ══════════════════════════════
            SECTION 1 — Why We Matter
        ══════════════════════════════ */}
        <div className="mb-20">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-500/10 border border-green-500/25 text-green-400 rounded-full text-sm font-medium mb-6 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              The Ripple Effect
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <span className="text-white">What We Build</span>{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
              >
                Outlasts the Contract
              </span>
            </h2>

            <p className="text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Every line of code we ship creates a chain reaction — inside your business, across industries, across borders.
            </p>

            <div
              className="w-24 h-[3px] rounded-full mx-auto mt-5"
              style={{ background: "linear-gradient(90deg, #4ade80, #22d3ee)" }}
            />
          </div>

          {/* Pillar cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              const isHov = hoveredPillar === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredPillar(i)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  className="group relative rounded-2xl border bg-white/[0.03] backdrop-blur-sm p-8 flex flex-col gap-5 transition-all duration-300 overflow-hidden cursor-default"
                  style={{
                    borderColor: isHov ? `${p.glow}45` : "rgba(255,255,255,0.08)",
                    transform: isHov ? "translateY(-5px)" : "translateY(0)",
                    boxShadow: isHov ? `0 16px 48px ${p.glow}15` : "none",
                  }}
                >
                  {/* Hover sweep */}
                  <div
                    className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at top left, ${p.glow}10, transparent 60%)`,
                      opacity: isHov ? 1 : 0,
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="relative w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})`,
                      transform: isHov ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    <Icon className="w-6 h-6 text-black" />
                  </div>

                  {/* Label */}
                  <div
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: p.glow }}
                  >
                    {p.label}
                  </div>

                  {/* Text */}
                  <div>
                    <h3
                      className="text-lg md:text-xl font-black text-white mb-3 leading-snug"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed">{p.description}</p>
                  </div>

                  {/* Bottom bar */}
                  <div
                    className="absolute bottom-0 left-0 h-[2px] rounded-b-2xl transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${p.gradient[0]}, ${p.gradient[1]})`,
                      width: isHov ? "100%" : "0%",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════
            SECTION 2 — Testimonials
        ══════════════════════════════ */}
        <div className="mb-20">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-500/10 border border-green-500/25 text-green-400 rounded-full text-sm font-medium mb-6 tracking-wide">
              <Star size={13} className="fill-green-400" />
              Straight From the Source
            </div>

            <h2
              className="text-3xl sm:text-4xl font-black text-white mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Stories From the{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
              >
                Teams We've Shipped With
              </span>
            </h2>

            <p className="text-white text-base md:text-lg max-w-xl mx-auto">
              Real operators. Real outcomes. No fluff.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <Carousel
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              setApi={setEmbla}
              opts={{ loop: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-3 md:-ml-4">
                {safeTestimonials.map((t: any, i: number) => (
                  <CarouselItem
                    key={i}
                    className="pl-3 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <div className="h-full rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-5 flex flex-col gap-4 hover:border-green-500/30 hover:bg-green-500/[0.04] transition-all duration-300 group">
                      {/* Quote mark */}
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-black"
                        style={{ background: "linear-gradient(135deg, #4ade80, #22d3ee)", color: "#000" }}
                      >
                        "
                      </div>

                      {/* Text */}
                      <p className="text-gray-300 text-base leading-relaxed grow group-hover:text-white transition-colors">
                        {t.testimonial}
                      </p>

                      {/* Author */}
                      <div className="border-t border-white/8 pt-4 flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-black font-black text-base shrink-0"
                          style={{ background: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
                        >
                          {t.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-white truncate">{t.name}</p>
                          <p className="text-gray-400 text-sm truncate">{t.project}</p>
                        </div>
                      </div>

                      {/* Stars + date */}
                      <div className="flex items-center justify-between">
                        <StarRating rating={t.rating} />
                        <span className="text-gray-500 text-xs">{t.date}</span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Desktop nav arrows */}
              <div className="hidden md:block">
                <CarouselPrevious className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white/5 border-white/10 text-white hover:bg-green-500/20 hover:border-green-500/40" />
                <CarouselNext className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white/5 border-white/10 text-white hover:bg-green-500/20 hover:border-green-500/40" />
              </div>
            </Carousel>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(safeTestimonials.length / 4) }).map((_, pi) => (
                <button
                  key={pi}
                  onClick={() => embla?.scrollTo(pi * 4)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: currentSlide === pi ? "24px" : "8px",
                    background: currentSlide === pi
                      ? "linear-gradient(90deg, #4ade80, #22d3ee)"
                      : "rgba(255,255,255,0.15)",
                  }}
                  aria-label={`Page ${pi + 1}`}
                />
              ))}
            </div>

            {/* Mobile nav */}
            <div className="flex md:hidden justify-center gap-4 mt-5">
              <button
                onClick={() => embla?.scrollPrev()}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-green-500/20 hover:border-green-500/30 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => embla?.scrollNext()}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-green-500/20 hover:border-green-500/30 transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            CTA Banner
        ══════════════════════════════ */}
        <div className="relative rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #052e16 0%, #064e3b 45%, #052e16 100%)" }}
          />
          <div
            className="absolute inset-0 rounded-2xl"
            style={{ boxShadow: "inset 0 0 0 1px rgba(74,222,128,0.2)" }}
          />
          {/* Orbs */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-green-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-44 h-44 bg-cyan-400/8 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
          {/* Deco boxes */}
          <div className="absolute top-5 left-10 w-9 h-9 border border-green-500/20 rounded-md rotate-12 opacity-35" />
          <div className="absolute bottom-5 right-16 w-6 h-6 border border-cyan-400/20 rounded-md -rotate-6 opacity-25" />

          <div className="relative z-10 text-center px-8 py-12 md:py-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/15 border border-green-500/25 text-green-400 rounded-full text-xs font-semibold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Your Move
            </div>

            <h3
              className="text-2xl md:text-4xl font-black text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Your Next Breakthrough
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
              >
                Starts With a Conversation
              </span>
            </h3>

            <p className="text-white text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Whether you're scaling a startup or modernizing a legacy enterprise, our engineers are ready to map
              out a solution that fits your reality — not a template.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="group inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-black text-sm transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                  boxShadow: "0 0 28px rgba(74,222,128,0.3)",
                }}
              >
                Book a Free Strategy Call
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-semibold border border-green-500/35 text-green-400 text-sm hover:bg-green-500/10 transition-all duration-300">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </section>
  );
}