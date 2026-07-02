"use client";
import React, { useRef, useEffect } from "react";
import {
  Compass,
  Flame,
  WifiOff,
  BarChart2,
  Puzzle,
  Banknote,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import SectionBackground from "../SectionBackground";
import SectionBadge from "../SectionBadge";

const obstacles = [
  {
    icon: WifiOff,
    number: "01",
    title: "Technology Gaps",
    description:
      "Most growing businesses on the continent are locked out of modern software ecosystems that could multiply their output.",
  },
  {
    icon: BarChart2,
    number: "02",
    title: "Growth Bottlenecks",
    description:
      "Legacy infrastructure buckles under expansion pressure — slowing teams, frustrating customers, and capping revenue.",
  },
  {
    icon: Puzzle,
    number: "03",
    title: "Fragmented Systems",
    description:
      "Disconnected tools create invisible friction — data lost between platforms, teams working blind, decisions made too late.",
  },
  {
    icon: Banknote,
    number: "04",
    title: "Affordability Barriers",
    description:
      "Enterprise-grade software has historically priced out local businesses — leaving powerful capabilities out of reach.",
  },
];

export default function VisionProblemSection() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("line-grow");
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="relative bg-[#050D0A] text-white overflow-hidden py-24 w-full"
    >
      <SectionBackground />

      <div className="relative z-10 px-6 sm:px-10 lg:px-20  mx-auto">

        {/* ── Section badge ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <SectionBadge icon={Flame} text="The Engine Behind the Mission" className="mb-6" />

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span className="text-white">Purpose-Driven.</span>{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #4ade80 0%, #22d3ee 60%)",
              }}
            >
              Results-Obsessed.
            </span>
          </h2>

          {/* animated underline */}
          <div
            ref={lineRef}
            className="h-[3px] w-0 rounded-full transition-all duration-1000"
            style={{
              background: "linear-gradient(90deg, #4ade80, #22d3ee)",
            }}
          />
        </div>

        {/* ── Main 2-col grid ── */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT — Vision + Purpose cards */}
          <div className="space-y-5">

            {/* Vision */}
            <div className="group relative rounded-2xl border border-green-500/20 bg-white/[0.03] backdrop-blur-sm p-8 hover:border-green-400/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{
                    background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                  }}
                >
                  <Compass className="w-6 h-6 text-black" />
                </div>
                <div className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-2">
                  Our North Star
                </div>
                <h3
                  className="text-xl md:text-2xl font-black mb-3 text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Where We're Headed
                </h3>
                <p className="text-white text-base md:text-lg leading-relaxed">
                  A continent where every ambitious business — regardless of size or location —
                  wields technology as a competitive edge, not a constraint. We exist to make
                  that future arrive faster.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="group relative rounded-2xl border border-emerald-500/20 bg-white/[0.03] backdrop-blur-sm p-8 hover:border-emerald-400/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{
                    background: "linear-gradient(135deg, #34d399, #4ade80)",
                  }}
                >
                  <Flame className="w-6 h-6 text-black" />
                </div>
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">
                  Our Drive
                </div>
                <h3
                  className="text-xl md:text-2xl font-black mb-3 text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Why We Show Up Daily
                </h3>
                <p className="text-white text-base md:text-lg leading-relaxed">
                  To architect software that doesn't just function — but transforms. We build
                  systems that dissolve friction, unlock capacity, and turn ambitious visions
                  into quantifiable business outcomes across African markets.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Obstacles grid */}
          <div>
            {/* Divider badge */}
            <div className="relative flex justify-center items-center mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <span className="relative z-10 px-5 py-2 bg-[#050D0A] text-sm font-semibold text-white rounded-full border border-white/10 uppercase tracking-widest">
                Obstacles We Eliminate
              </span>
            </div>

            <p className="text-white text-base md:text-lg leading-relaxed mb-8 text-center lg:text-left">
              African enterprises are navigating a digital landscape stacked against them.
              We've built our entire offering around dismantling those barriers — one solution at a time.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {obstacles.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:border-green-500/40 hover:bg-green-500/5 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0">
                        <div
                          className="w-11 h-11 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{
                            background:
                              "linear-gradient(135deg, #4ade80, #22d3ee)",
                          }}
                        >
                          <Icon className="w-5 h-5 text-black" />
                        </div>
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#0a1a10] border border-green-500/30 text-green-400 text-[9px] font-black rounded-full flex items-center justify-center">
                          {item.number}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold mb-1 text-white group-hover:text-green-400 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Solution Banner ── */}
        <div className="mt-16 relative rounded-2xl overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #052e16 0%, #064e3b 40%, #052e16 100%)",
            }}
          />
          {/* Border glow */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(74,222,128,0.25)",
            }}
          />
          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-green-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-cyan-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
          {/* Floating box accents */}
          <div className="absolute top-4 left-8 w-10 h-10 border border-green-500/20 rounded-md rotate-12 opacity-40" />
          <div className="absolute bottom-4 right-12 w-7 h-7 border border-cyan-400/20 rounded-md -rotate-6 opacity-30" />

          <div className="relative z-10 text-center px-8 py-12 md:py-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/15 border border-green-500/25 text-green-400 rounded-full text-xs font-semibold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Our Answer
            </div>
            <h3
              className="text-xl md:text-3xl font-black text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Software That Actually Fits Your Reality
            </h3>
            <p className="text-white text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              We engineer affordable, AI-augmented ERP platforms and modular digital tools
              calibrated for African market conditions — giving local businesses the same
              technological horsepower as global enterprises, without the global price tag.
            </p>
            <Link href="#services">
              <button
                className="group mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-black text-sm transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                  boxShadow: "0 0 24px rgba(74,222,128,0.3)",
                }}
              >
                Explore Our Solutions
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
        .line-grow { width: 120px !important; }
      `}</style>
    </section>
  );
}