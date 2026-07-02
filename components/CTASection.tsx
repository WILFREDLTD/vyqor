"use client";
import React from "react";
import Link from "next/link";
import {
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Zap,
  MessageSquare,
} from "lucide-react";
import { ContactForm } from "./ContactForm";
import SectionBackground from "./SectionBackground";

const perks = [
  "Zero-cost discovery session — no strings attached",
  "Scoped proposals delivered within 48 hours",
  "Dedicated engineer assigned from day one",
  "Round-the-clock support post-deployment",
];

const contactDetails = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+254 793 056 960",
    gradient: ["#4ade80", "#22d3ee"],
  },
  {
    icon: Mail,
    label: "Drop a Line",
    value: "kimaniwilfred95@gmail.com",
    gradient: ["#22d3ee", "#818cf8"],
  },
  {
    icon: MapPin,
    label: "Our Base",
    value: "Kilifi, Kenya",
    gradient: ["#a78bfa", "#f472b6"],
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Daily",
    gradient: ["#fbbf24", "#f97316"],
  },
];

export default function CTASection() {
  return (
    <>
      {/* ══════════════════════════════════════════
          CONTACT SECTION
      ══════════════════════════════════════════ */}
      <section id="contact" className="relative bg-[#050D0A] text-white overflow-hidden py-24 w-full">
        <SectionBackground />

        <div className="relative z-10 px-6 sm:px-10 lg:px-20  mx-auto">

          {/* Section badge + headline */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-500/10 border border-green-500/25 text-green-400 rounded-full text-sm font-medium mb-6 tracking-wide">
              <MessageSquare size={13} />
              Let's Get to Work
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <span className="text-white">Got a Vision?</span>{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
              >
                Let's Engineer It.
              </span>
            </h2>

            <p className="text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Describe what you're building — or what's breaking — and our engineers will map
              out a concrete path forward. No jargon, no pressure.
            </p>

            <div
              className="w-24 h-[3px] rounded-full mx-auto mt-5"
              style={{ background: "linear-gradient(90deg, #4ade80, #22d3ee)" }}
            />
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* LEFT — Info panel */}
            <div className="space-y-6">

              {/* Main pitch card */}
              <div className="relative rounded-2xl border border-green-500/20 bg-white/[0.03] backdrop-blur-sm p-8 overflow-hidden">
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at top left, rgba(74,222,128,0.07), transparent 60%)",
                  }}
                />
                <div className="relative z-10">
                  <h3
                    className="text-xl md:text-2xl font-black text-white mb-3"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Ship Faster. Scale Smarter.
                    <br />
                    <span
                      className="text-transparent bg-clip-text"
                      style={{ backgroundImage: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
                    >
                      Operate With Confidence.
                    </span>
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    Whether you need a POS system live before the weekend, a payment gateway
                    that actually clears, or a full platform rebuild — we scope it, build it, and
                    stand behind it. One team, end to end.
                  </p>

                  <div className="space-y-3">
                    {perks.map((perk, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle
                          size={16}
                          className="shrink-0 mt-0.5"
                          style={{ color: "#4ade80" }}
                        />
                        <span className="text-white text-base">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact details */}
              <div className="grid sm:grid-cols-2 gap-3">
                {contactDetails.map(({ icon: Icon, label, value, gradient }, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-white/[0.03] hover:border-green-500/30 hover:bg-green-500/[0.04] transition-all duration-300"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
                    >
                      <Icon className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{label}</p>
                      <p className="text-white text-sm font-semibold">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof strip */}
              <div className="relative rounded-xl border border-green-500/15 bg-green-500/[0.04] p-5 flex items-center gap-4">
                {/* Avatar stack */}
                <div className="flex -space-x-2 shrink-0">
                  {["K", "A", "M", "Z"].map((letter, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-[#050D0A] flex items-center justify-center text-black text-xs font-black"
                      style={{
                        background: `linear-gradient(135deg, #4ade80, #22d3ee)`,
                        zIndex: 4 - i,
                      }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white text-sm font-bold">80+ businesses trust vico softwares</p>
                  <p className="text-gray-400 text-sm">across retail, fintech, and enterprise</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-amber-400 text-xs">★</span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Contact Form (dark-themed wrapper) */}
            <div className="relative">
              {/* Glow halo */}
              <div
                className="absolute -inset-1 rounded-3xl blur-xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(74,222,128,0.12), transparent 70%)" }}
              />
              <div className="relative">
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BOTTOM CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="relative bg-[#050D0A] pb-16">
        <div className="px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Banner bg */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, #052e16 0%, #064e3b 45%, #052e16 100%)" }}
            />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ boxShadow: "inset 0 0 0 1px rgba(74,222,128,0.2)" }}
            />

            {/* Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-52 h-52 bg-cyan-400/8 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
            <div className="absolute top-0 left-0 w-44 h-44 bg-green-400/6 rounded-full -translate-y-1/2 -translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-400/6 rounded-full translate-y-1/2 translate-x-1/2 blur-2xl" />

            {/* Deco boxes */}
            <div className="absolute top-6 left-14 w-9 h-9 border border-green-500/20 rounded-md rotate-12 opacity-35" />
            <div className="absolute bottom-6 right-20 w-6 h-6 border border-cyan-400/20 rounded-md -rotate-6 opacity-25" />
            <div className="absolute top-8 right-40 w-5 h-5 border border-green-400/15 rounded-sm rotate-45 opacity-20" />

            {/* Content */}
            <div className="relative z-10 text-center px-8 py-14 md:py-18">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/15 border border-green-500/25 text-green-400 rounded-full text-xs font-semibold uppercase tracking-widest mb-5">
                <Zap size={11} className="fill-green-400" />
                No Time to Waste
              </div>

              <h2
                className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Your Competitors Are Already
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
                >
                  Upgrading Their Stack
                </span>
              </h2>

              <p className="text-white text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                African businesses that move fast on technology are outpacing rivals and opening new markets.
                The window for first-mover advantage is open — but not forever.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/schedule-consultation">
                  <button
                    className="group inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-black text-sm transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                      boxShadow: "0 0 28px rgba(74,222,128,0.3)",
                    }}
                  >
                    Claim Your Free Consultation
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>

                <Link href="#services">
                  <button className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-semibold border border-green-500/35 text-green-400 text-sm hover:bg-green-500/10 transition-all duration-300">
                    Browse Our Services
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </>
  );
}