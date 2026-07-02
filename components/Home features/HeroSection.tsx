"use client";
import React, { useEffect, useRef } from "react";
import { ArrowRight, Zap, ShoppingCart, Globe, Code2, Database, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const boxes: { x: number; y: number; size: number; opacity: number; speed: number }[] = [];
    for (let i = 0; i < 18; i++) {
      boxes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 80 + 30,
        opacity: Math.random() * 0.12 + 0.03,
        speed: Math.random() * 0.4 + 0.1,
      });
    }

    let animFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      boxes.forEach((b) => {
        ctx.save();
        ctx.strokeStyle = `rgba(74, 222, 128, ${b.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.x, b.y, b.size, b.size);
        ctx.fillStyle = `rgba(74, 222, 128, ${b.opacity * 0.3})`;
        ctx.fillRect(b.x, b.y, b.size, b.size);
        ctx.restore();
        b.y -= b.speed;
        if (b.y + b.size < 0) {
          b.y = canvas.height + b.size;
          b.x = Math.random() * canvas.width;
        }
      });
      animFrame = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const services = [
    { icon: ShoppingCart, label: "E-commerce Platforms" },
    { icon: Globe, label: "Web Applications" },
    { icon: Database, label: "Cloud Infrastructure" },
    { icon: Shield, label: "Cybersecurity" },
  ];

  return (
    <section
      id="home"
      className="relative bg-[#050D0A] text-white overflow-hidden flex items-center w-full"
      style={{ minHeight: "calc(100vh - 72px)" }}
    >
      {/* Animated canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.9 }}
      />

      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-400/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Main content — tight vertical padding, no extra top gap ── */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 py-8 lg:py-6 pb-20 lg:pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* LEFT */}
          <div className="flex-1 space-y-6 text-center lg:text-left">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full text-sm font-medium tracking-wide">
              <Zap size={14} className="fill-green-400" />
              Next-Generation Software Engineering
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <span className="text-white">Transforming Ideas Into</span>{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #4ade80 0%, #22d3ee 60%, #86efac 100%)" }}
              >
                Powerful Digital Products
              </span>
            </h1>

            <p className="text-white text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We craft high-performance software solutions — from robust e-commerce engines and enterprise platforms
              to intelligent APIs and cloud-native systems — designed to accelerate your business growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full sm:w-auto">
              <button
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-black transition-all duration-300 w-full sm:w-auto min-w-[200px] sm:min-w-[220px]"
                style={{
                  background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                  boxShadow: "0 0 30px rgba(74,222,128,0.35)",
                }}
              >
                View Our Services
                <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => router.push('/schedule-consultation')}
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base border border-green-500/40 text-green-400 hover:bg-green-500/10 transition-all duration-300 w-full sm:w-auto min-w-[200px] sm:min-w-[220px]"
                title="Book a free consultation session to discuss your project"
              >
                <Code2 size={16} className="sm:w-[18px] sm:h-[18px] w-4 h-4" />
                Quick Service Order
              </button>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start pt-1">
              {services.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs sm:text-sm hover:bg-white/10 transition-colors duration-200"
                >
                  <Icon size={12} className="sm:w-[13px] sm:h-[13px] w-3 h-3 text-green-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Developer photo */}
          <div className="flex-1 flex justify-center items-center w-full max-w-sm lg:max-w-none">
            <div className="relative w-full max-w-[460px]">

              {/* Outer glow halo */}
              <div
                className="absolute -inset-4 rounded-3xl blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)" }}
              />

              {/* Image card */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  border: "1px solid rgba(74,222,128,0.2)",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                {/* Developer with glasses — free Unsplash photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=700&q=85&fit=crop&crop=top"
                  alt="Developer with glasses working on code"
                  className="w-full object-cover object-top"
                  style={{
                    height: "clamp(320px, 48vw, 500px)",
                    filter: "brightness(0.82) contrast(1.06) saturate(0.9)",
                  }}
                />

                {/* Bottom gradient fade */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, transparent 45%, rgba(5,13,10,0.92) 100%)",
                  }}
                />

                {/* Subtle green screen-glow on upper half */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 40% 30%, rgba(74,222,128,0.07) 0%, transparent 55%)",
                  }}
                />
</div>
              {/* Floating top-right tag */}
              <div
                className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs sm:text-xs font-bold text-black z-10"
                style={{ background: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
              >
                <span className="hidden sm:inline">TypeScript • React • AWS</span>
                <span className="sm:hidden">TS • React • AWS</span>
              </div>

              {/* Left side badge */}
              <div
                className="absolute -left-4 top-1/3 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white z-10"
                style={{
                  background: "rgba(5,13,10,0.9)",
                  border: "1px solid rgba(74,222,128,0.22)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <Code2 size={12} className="text-green-400 shrink-0" />
                Full-Stack Engineers
              </div>
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