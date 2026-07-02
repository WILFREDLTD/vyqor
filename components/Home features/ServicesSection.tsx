"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  Globe,
  CreditCard,
  Bell,
  BarChart3,
  Smartphone,
  Cloud,
  Shield,
  Code2,
  Database,
  Zap,
  MessageSquare,
  ArrowRight,
  Layers,
} from "lucide-react";
import SectionBackground from "../SectionBackground";

const services = [
  {
    icon: ShoppingCart,
    category: "Commerce",
    title: "Point-of-Sale Systems",
    description:
      "Blazing-fast POS terminals built for retail, hospitality, and enterprise — inventory sync, receipts, and real-time reporting baked in.",
    tag: "Hardware + Software",
    gradient: ["#4ade80", "#22d3ee"],
    accent: "#4ade80",
  },
  {
    icon: Globe,
    category: "Web",
    title: "Website & Web App Development",
    description:
      "From marketing sites that convert to full-stack web platforms — we architect, design, and ship with production-grade quality.",
    tag: "Full Stack",
    gradient: ["#22d3ee", "#818cf8"],
    accent: "#22d3ee",
  },
  {
    icon: CreditCard,
    category: "Payments",
    title: "Payment Gateway Integration",
    description:
      "Embed multi-currency, multi-rail payment flows into any product. M-Pesa, card, bank transfer, BNPL — one unified API.",
    tag: "Fintech",
    gradient: ["#fbbf24", "#f97316"],
    accent: "#fbbf24",
  },
  {
    icon: Bell,
    category: "Engagement",
    title: "Smart Notification Systems",
    description:
      "Deliver contextual alerts across SMS, email, push, and WhatsApp. Trigger-based, scheduled, or real-time — your users stay informed.",
    tag: "Omnichannel",
    gradient: ["#f472b6", "#e879f9"],
    accent: "#f472b6",
  },
  {
    icon: Smartphone,
    category: "Mobile",
    title: "Mobile App Development",
    description:
      "Native iOS and Android apps, or cross-platform React Native builds — performance-first, pixel-perfect, and built to scale.",
    tag: "iOS · Android",
    gradient: ["#34d399", "#4ade80"],
    accent: "#34d399",
  },
  {
    icon: BarChart3,
    category: "Analytics",
    title: "Business Intelligence Dashboards",
    description:
      "Turn raw data into decision-making power. Real-time dashboards, custom KPI reports, and predictive analytics for operators who mean business.",
    tag: "Data & AI",
    gradient: ["#a78bfa", "#818cf8"],
    accent: "#a78bfa",
  },
  {
    icon: Cloud,
    category: "Infrastructure",
    title: "Cloud & DevOps Engineering",
    description:
      "AWS, GCP, Azure — we architect and manage cloud infrastructure with CI/CD pipelines, container orchestration, and 99.9% uptime guarantees.",
    tag: "Kubernetes · Docker",
    gradient: ["#22d3ee", "#4ade80"],
    accent: "#22d3ee",
  },
  {
    icon: Database,
    category: "ERP",
    title: "ERP & Business Automation",
    description:
      "End-to-end enterprise resource platforms — HR, procurement, finance, and ops — unified in one intelligent system built for African markets.",
    tag: "Enterprise",
    gradient: ["#fb923c", "#fbbf24"],
    accent: "#fb923c",
  },
  {
    icon: Shield,
    category: "Security",
    title: "Cybersecurity & Compliance",
    description:
      "Penetration testing, vulnerability assessments, ISO 27001 readiness, and ongoing threat monitoring to keep your systems airtight.",
    tag: "InfoSec",
    gradient: ["#f87171", "#fb923c"],
    accent: "#f87171",
  },
  {
    icon: Code2,
    category: "API",
    title: "API Design & Integration",
    description:
      "RESTful and GraphQL APIs engineered for speed and reliability. We also connect your existing tools — CRMs, ERPs, third-party platforms.",
    tag: "REST · GraphQL",
    gradient: ["#4ade80", "#818cf8"],
    accent: "#4ade80",
  },
  {
    icon: MessageSquare,
    category: "Communication",
    title: "CRM & Customer Messaging",
    description:
      "Build lasting relationships with a custom CRM, live chat integration, AI chatbots, and automated communication sequences across every channel.",
    tag: "CX Platform",
    gradient: ["#e879f9", "#f472b6"],
    accent: "#e879f9",
  },
  {
    icon: Layers,
    category: "E-commerce",
    title: "Online Store & Marketplace Builds",
    description:
      "High-converting e-commerce storefronts and multi-vendor marketplaces — complete with cart, checkout, payments, and order management.",
    tag: "Shopify · Custom",
    gradient: ["#22d3ee", "#fbbf24"],
    accent: "#22d3ee",
  },
];

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative bg-[#050D0A] text-white overflow-hidden py-24 w-full"
    >
      <SectionBackground />

      <div className="relative z-10 px-6 sm:px-10 lg:px-20  mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-500/10 border border-green-500/25 text-green-400 rounded-full text-sm font-medium mb-6 tracking-wide">
            <Zap size={13} className="fill-green-400" />
            Full-Spectrum Software Services
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight mb-5"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span className="text-white">Everything Your Business Needs</span>
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #4ade80 0%, #22d3ee 60%)",
              }}
            >
              Built Under One Roof
            </span>
          </h2>

          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From your first sale to your thousandth employee — we engineer the software layer
            that runs your business end-to-end.
          </p>

          {/* Gradient divider */}
          <div
            className="w-24 h-[3px] rounded-full mx-auto mt-6"
            style={{ background: "linear-gradient(90deg, #4ade80, #22d3ee)" }}
          />
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hovered === index;

            return (
              <div
                key={service.title}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className="group relative rounded-2xl border bg-white/[0.03] backdrop-blur-sm p-6 flex flex-col gap-4 cursor-pointer transition-all duration-300 overflow-hidden"
                style={{
                  borderColor: isHovered
                    ? `${service.accent}50`
                    : "rgba(255,255,255,0.08)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? `0 12px 40px ${service.accent}18`
                    : "none",
                }}
              >
                {/* Hover glow bg */}
                <div
                  className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top left, ${service.accent}12, transparent 60%)`,
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* Top row: icon + tag */}
                <div className="relative z-10 flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${service.gradient[0]}, ${service.gradient[1]})`,
                      transform: isHovered ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    <Icon className="w-6 h-6 text-black" />
                  </div>

                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border"
                    style={{
                      color: service.accent,
                      borderColor: `${service.accent}30`,
                      background: `${service.accent}10`,
                    }}
                  >
                    {service.tag}
                  </span>
                </div>

                {/* Text */}
                <div className="relative z-10 flex flex-col gap-2 grow">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: service.accent }}
                  >
                    {service.category}
                  </span>

                  <h3
                    className="text-base font-black text-white leading-snug"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {service.title}
                  </h3>

                  <p className="text-gray-300 text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="relative z-10">
                  <button
                    className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-300"
                    style={{ color: service.accent }}
                  >
                    Learn More
                    <ArrowRight
                      size={14}
                      style={{
                        transform: isHovered ? "translateX(4px)" : "translateX(0)",
                        transition: "transform 0.3s",
                      }}
                    />
                  </button>
                </div>

                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] rounded-b-2xl transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${service.gradient[0]}, ${service.gradient[1]})`,
                    width: isHovered ? "100%" : "0%",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-16 text-center">
          <p className="text-gray-300 text-base mb-5">
            Don't see exactly what you need? We scope custom solutions too.
          </p>
          <button
            className="group inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-black text-sm transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #4ade80, #22d3ee)",
              boxShadow: "0 0 28px rgba(74,222,128,0.3)",
            }}
          >
            Talk to Our Engineers
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </section>
  );
}