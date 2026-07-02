"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone, MapPin, Zap } from "lucide-react";
import { PiMapPinArea, PiPhoneDuotone } from "react-icons/pi";
import { TbMail } from "react-icons/tb";
import { footerLinks, socialLinks } from "@/constants";
import { copyRightNotice } from "@/lib/copyRightYear";

type FooterLinkProps = {
  title: string;
  items: { name: string; href: string }[];
};

function FooterLink({ title, items }: FooterLinkProps) {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {items.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              target="_blank"
              className="group flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-white transition-all duration-200"
            >
              <span className="w-0 group-hover:w-2 h-[1px] bg-green-400 transition-all duration-200 overflow-hidden" />
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      className="relative text-white overflow-hidden"
      style={{ background: "#080F0C" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top gradient separator */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, #4ade8040, #22d3ee40, transparent)" }}
      />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-[400px] h-[200px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[300px] h-[150px] bg-cyan-500/4 rounded-full blur-[80px] pointer-events-none" />

      {/* Floating deco boxes */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute border border-green-500/8 rounded-md pointer-events-none"
          style={{
            width: `${24 + i * 12}px`,
            height: `${24 + i * 12}px`,
            top: `${10 + i * 20}%`,
            left: i % 2 === 0 ? `${1 + i * 0.5}%` : undefined,
            right: i % 2 !== 0 ? `${1 + i * 0.5}%` : undefined,
            opacity: 0.4 - i * 0.07,
          }}
        />
      ))}

      {/* ── Newsletter Band ── */}
      <div
        className="relative border-b"
        style={{ borderColor: "rgba(74,222,128,0.1)" }}
      >
        <div className="relative z-10 px-6 sm:px-10 lg:px-20 py-12  mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* Copy */}
            <div className="text-center lg:text-left max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs font-medium mb-3 tracking-wide">
                <Zap size={10} className="fill-green-400" />
                Stay in the Loop
              </div>
              <h3
                className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Insights Straight to{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
                >
                  Your Inbox
                </span>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tech deep-dives, product drops, and African market intelligence — no noise, no spam.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubscribe}
              className="w-full max-w-md flex flex-col sm:flex-row gap-3"
            >
              {subscribed ? (
                <div
                  className="w-full py-3 px-5 rounded-xl text-center text-sm font-semibold text-black"
                  style={{ background: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
                >
                  ✓ You're on the list — welcome aboard!
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 h-11 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-green-500/40 transition-all"
                  />
                  <button
                    type="submit"
                    className="group h-11 px-6 rounded-xl font-bold text-black text-sm flex items-center gap-2 whitespace-nowrap transition-all duration-300 shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                      boxShadow: "0 0 20px rgba(74,222,128,0.25)",
                    }}
                  >
                    Subscribe
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </>
              )}
            </form>

          </div>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-20 py-14  mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-6">

            {/* Logo + name */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full blur-md opacity-50"
                  style={{ background: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
                />
                <Image
                  src="/vico.png"
                  alt="vico softwares"
                  width={500}
                  height={500}
                  className="relative w-11 h-11 rounded-full border border-green-500/30"
                />
              </div>
              <span
                className="text-xl font-black text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                vico softwares
              </span>
            </div>

            {/* Tagline */}
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              We architect software that doesn't just run businesses — it
              transforms them. Built for African markets, engineered for global scale.
            </p>

            {/* Contact details */}
            <div className="space-y-3">
              {[
                { icon: TbMail, value: "kimaniwilfred95@gmail.com" },
                { icon: PiPhoneDuotone, value: "+254 793 056 960" },
                { icon: PiMapPinArea, value: "Kilifi, Kenya" },
              ].map(({ icon: Icon, value }, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}
                  >
                    <Icon size={13} style={{ color: "#4ade80" }} />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((social: any, index: number) => (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.name}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "linear-gradient(135deg, rgba(74,222,128,0.2), rgba(34,211,238,0.2))";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,128,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  <social.icon size={14} className="text-gray-400 hover:text-white transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="sm:col-span-2 lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {Object.entries(footerLinks).map(([section, items]) => (
                <FooterLink
                  key={section}
                  title={section
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (s) => s.toUpperCase())}
                  items={items as { name: string; href: string }[]}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div
        className="relative z-10 border-t px-6 sm:px-10 lg:px-20 py-5"
        style={{ borderColor: "rgba(74,222,128,0.08)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-xs text-gray-600 order-2 md:order-1 text-center md:text-left">
            {copyRightNotice()}{" "}
            <span
              className="font-bold text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
            >
              vico softwares
            </span>
            {" "}· All rights reserved · Engineered in Africa.
          </p>

          {/* Legal links */}
          <nav className="flex items-center gap-5 order-1 md:order-2" aria-label="Legal links">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs text-gray-600 hover:text-green-400 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </footer>
  );
}