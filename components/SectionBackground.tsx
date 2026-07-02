"use client";
import React from "react";

interface SectionBackgroundProps {
  gridSize?: number;
  showGlows?: boolean;
  showDecorativeBoxes?: boolean;
  glowIntensity?: number;
}

export default function SectionBackground({
  gridSize = 56,
  showGlows = true,
  showDecorativeBoxes = true,
  glowIntensity = 1,
}: SectionBackgroundProps) {
  return (
    <>
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)",
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Ambient glows */}
      {showGlows && (
        <>
          <div
            className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[140px] pointer-events-none"
            style={{ opacity: glowIntensity }}
          />
          <div
            className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] bg-emerald-400/8 rounded-full blur-[120px] pointer-events-none"
            style={{ opacity: glowIntensity }}
          />
        </>
      )}

      {/* Floating decorative boxes */}
      {showDecorativeBoxes &&
        [...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-green-500/10 rounded-lg pointer-events-none"
            style={{
              width: `${40 + i * 15}px`,
              height: `${40 + i * 15}px`,
              top: `${10 + i * 11}%`,
              left: i % 2 === 0 ? `${2 + i * 1.5}%` : undefined,
              right: i % 2 !== 0 ? `${2 + i * 1.5}%` : undefined,
              opacity: 0.4 - i * 0.03,
              background: "rgba(74,222,128,0.03)",
            }}
          />
        ))}
    </>
  );
}