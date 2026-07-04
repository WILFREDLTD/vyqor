"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ArrowRight, X, Menu, Zap } from "lucide-react";
import Image from "next/image";
import { servicesOffered } from "@/constants";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services", hasDropdown: true },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState("");
  const [isNavigatingCTA, setIsNavigatingCTA] = React.useState(false);
  const [hasMounted, setHasMounted] = React.useState(false);
  const servicesRef = React.useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const servicesList = (servicesOffered || []).slice(0, 8).map((s: any) => ({
    label: s.title,
    icon: s.icon,
    href: "/#services",
  }));

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  // Scroll detection for sticky glass effect
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click outside to close dropdown
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && e.target instanceof Node && !servicesRef.current.contains(e.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Body scroll lock
  React.useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  if (!hasMounted) {
    return (
      <>
        <div className="h-16 md:h-[72px]" aria-hidden="true" />
      </>
    );
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "linear-gradient(135deg, rgba(5, 13, 10, 0.95) 0%, rgba(10, 25, 18, 0.92) 50%, rgba(5, 13, 10, 0.95) 100%)"
            : "linear-gradient(135deg, rgba(5, 13, 10, 0.85) 0%, rgba(10, 25, 18, 0.82) 50%, rgba(5, 13, 10, 0.85) 100%)",
          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(25px)",
          borderBottom: scrolled
            ? "1px solid rgba(74,222,128,0.2)"
            : "1px solid rgba(74,222,128,0.1)",
          boxShadow: scrolled ? "0 8px 40px rgba(74,222,128,0.15), 0 0 1px rgba(34,211,238,0.2)" : "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        {/* Subtle top border glow */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.4), rgba(34,211,238,0.3), transparent)",
            opacity: scrolled ? 1 : 0,
            transition: "opacity 0.5s",
          }}
        />

        <div className="px-5 sm:px-8 lg:px-16 xl:px-20 w-full max-w-none">
          <div className="flex items-center justify-between h-16 md:h-[72px]">

            {/* ── Logo ── */}
            <div className="flex items-center h-16 md:h-[72px] pr-3">
              <div
                className="relative flex items-center justify-center rounded-full overflow-hidden transition-all duration-300"
                style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, #071617, #05200e)" }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(135deg, #4ade80, #22d3ee)", opacity: 0.06, filter: "blur(8px)" }}
                />
                <Image
                  src="/logo_vyqor.png"
                  alt="VYQOR LABS"
                  width={200}
                  height={200}
                  className="relative h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span
                className="brand-name hidden sm:block ml-3"
                style={{ fontFamily: "var(--font-ui), var(--font-primary), system-ui, sans-serif" }}
              >
                VYQOR LABS
              </span>
            </div>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label} className="relative" ref={servicesRef}>
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className={`nav-link-underline flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                        ${isServicesOpen ? "text-green-400" : "text-gray-300 hover:text-white"}`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-300"
                        style={{ transform: isServicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>

                    {/* Dropdown */}
                    {isServicesOpen && (
                      <div
                        className="absolute left-1/2 mt-3 w-72 rounded-2xl overflow-hidden z-50"
                        style={{
                          transform: "translateX(-50%)",
                          animation: "fadeSlideDown 0.22s ease both",
                          background: "rgba(8, 18, 12, 0.97)",
                          border: "1px solid rgba(74,222,128,0.18)",
                          boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(74,222,128,0.08) inset",
                          backdropFilter: "blur(20px)",
                        }}
                      >
                        {/* Dropdown header */}
                        <div className="px-4 pt-4 pb-2 border-b border-white/5">
                          <div className="flex items-center gap-2">
                            <Zap size={11} className="fill-green-400 text-green-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
                              What We Build
                            </span>
                          </div>
                        </div>

                        <div className="py-2 max-h-72 overflow-y-auto">
                          {servicesList.map((service, i) => (
                            <Link
                              key={service.label}
                              href={service.href}
                              onClick={() => setIsServicesOpen(false)}
                              className="dropdown-item flex items-center gap-3 px-4 py-2.5"
                              style={{ animationDelay: `${i * 0.03}s` }}
                            >
                              <div
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ background: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
                              />
                              <span className="text-sm text-gray-400 hover:text-white transition-colors truncate">
                                {service.label}
                              </span>
                            </Link>
                          ))}
                        </div>

                        {/* View all */}
                        <div className="border-t border-white/5 p-3">
                          <Link
                            href="/#services"
                            onClick={() => setIsServicesOpen(false)}
                            className="group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-green-400 hover:bg-green-500/10 transition-all"
                          >
                            Browse All Services
                            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setActiveLink(link.label)}
                    className={`nav-link-underline px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                      ${activeLink === link.label ? "text-white active" : "text-gray-300 hover:text-white"}`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* ── CTA ── */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                type="button"
                onClick={async () => {
                  setIsNavigatingCTA(true);
                  await router.push('/schedule-consultation');
                }}
                disabled={isNavigatingCTA}
                className="cta-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-black"
                style={{
                  background: "linear-gradient(135deg, #4ade80 0%, #22d3ee 50%, #4ade80 100%)",
                  backgroundSize: "200% auto",
                }}
              >
                {isNavigatingCTA ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="3" strokeOpacity="0.15" />
                      <path d="M22 12a10 10 0 0 1-10 10" stroke="black" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    Get a Free Scope
                    <ArrowRight size={13} />
                  </>
                )}
              </button>
            </div>

            {/* ── Mobile burger ── */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: isMobileMenuOpen ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${isMobileMenuOpen ? "rgba(74,222,128,0.35)" : "rgba(255,255,255,0.1)"}`,
              }}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center gap-[5px]">
                <span
                  className="block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center"
                  style={{
                    width: isMobileMenuOpen ? "18px" : "18px",
                    transform: isMobileMenuOpen ? "rotate(45deg) translate(4.5px, 4.5px)" : "none",
                  }}
                />
                <span
                  className="block h-[1.5px] bg-white rounded-full transition-all duration-300"
                  style={{
                    width: "14px",
                    opacity: isMobileMenuOpen ? 0 : 1,
                    transform: isMobileMenuOpen ? "scaleX(0)" : "scaleX(1)",
                  }}
                />
                <span
                  className="block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center"
                  style={{
                    width: isMobileMenuOpen ? "18px" : "18px",
                    transform: isMobileMenuOpen ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none",
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 lg:hidden"
            style={{ animation: "fadeIn 0.25s ease both", background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Panel */}
          <div
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[300px] lg:hidden flex flex-col"
            style={{
              animation: "slideInRight 0.3s cubic-bezier(0.32, 0.72, 0, 1) both",
              background: "rgba(6, 14, 10, 0.98)",
              backdropFilter: "blur(24px)",
              borderLeft: "1px solid rgba(74,222,128,0.15)",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Panel header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: "rgba(74,222,128,0.1)" }}
            >
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src="/vyqor.png" alt="VYQOR LABS" width={100} height={100} className="w-8 h-8 rounded-full" />
                <span
                  className="text-xl font-black text-white"
                  style={{ fontFamily: "var(--font-display), var(--font-primary), system-ui, sans-serif" }}
                >
                  VYQOR LABS
                </span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
              {navLinks.map((link, idx) =>
                link.hasDropdown ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="mobile-link w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-300 font-medium text-sm"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className="text-gray-500 transition-transform duration-300"
                        style={{ transform: isServicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>

                    {isServicesOpen && (
                      <div
                        className="ml-4 mt-1 space-y-0.5 border-l-2 pl-3"
                        style={{
                          borderColor: "rgba(74,222,128,0.3)",
                          animation: "fadeSlideDown 0.2s ease both",
                        }}
                      >
                        {servicesList.map((s) => (
                          <Link
                            key={s.label}
                            href={s.href}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500 hover:text-green-400 rounded-lg hover:bg-green-500/5 transition-all"
                            onClick={() => { setIsMobileMenuOpen(false); setIsServicesOpen(false); }}
                          >
                            <span
                              className="w-1 h-1 rounded-full shrink-0"
                              style={{ background: "#4ade80" }}
                            />
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="mobile-link block px-4 py-3 rounded-xl text-gray-300 font-medium text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* Panel footer CTA */}
            <div
              className="p-5 border-t"
              style={{ borderColor: "rgba(74,222,128,0.1)" }}
            >
              <button
                type="button"
                onClick={async () => {
                  setIsNavigatingCTA(true);
                  await router.push('/schedule-consultation');
                }}
                disabled={isNavigatingCTA}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-black text-sm transition-all"
                style={{
                  background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                  boxShadow: "0 0 24px rgba(74,222,128,0.3)",
                }}
              >
                {isNavigatingCTA ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="3" strokeOpacity="0.15" />
                      <path d="M22 12a10 10 0 0 1-10 10" stroke="black" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    Get a Free Scope
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-600 mt-3">
                No commitment · Reply within 24 hrs
              </p>
            </div>
          </div>
        </>
      )}

      {/* Navbar height spacer */}
      <div className="h-16 md:h-[72px]" />
    </>
  );
}