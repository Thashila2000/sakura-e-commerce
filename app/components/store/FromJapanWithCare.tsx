"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";

interface Pillar {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const pillars: Pillar[] = [
  {
    id: 1,
    title: "Authentic Sourcing",
    subtitle: "直接調達",
    description: "We bypass standard middlemen to establish direct partnerships with heritage tea estates in Uji, organic farms, and beauty distillers across Japan.",
    icon: (
      <svg className="w-7 h-7 text-rose-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25c0-4.142 3.358-7.5 7.5-7.5 4.142 0 7.5 3.358 7.5 7.5z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Quality Selection",
    subtitle: "厳選品質",
    description: "Every single harvest of matcha, blend of spice, and botanical J-Beauty serum undergoes strict testing to meet our premium grade standards.",
    icon: (
      <svg className="w-7 h-7 text-rose-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Trusted Suppliers",
    subtitle: "信頼の絆",
    description: "We work exclusively with multi-generational family businesses and certified master producers who preserve traditional crafting methods.",
    icon: (
      <svg className="w-7 h-7 text-rose-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Carefully Imported",
    subtitle: "丁寧な輸送",
    description: "Every shipment travels under strictly monitored, climate-controlled environments and is hand-wrapped carefully to protect quality.",
    icon: (
      <svg className="w-7 h-7 text-rose-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25M9 4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V12h-4.5V4.875z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6h16.5M3.75 9h16.5M3.75 12h16.5m-13.5 3h13.5" />
      </svg>
    ),
  },
];

// ─── Card ranges: [fadeIn-start, fadeIn-end, hold-end, fadeOut-end] ─────────
const CARD_RANGES = [
  [0.12, 0.20, 0.32, 0.40],
  [0.32, 0.40, 0.52, 0.60],
  [0.52, 0.60, 0.72, 0.80],
  [0.72, 0.80, 0.95, 1.00],
];

function useCardMotion(scrollYProgress: MotionValue<number>, idx: number) {
  const [s0, s1, s2, s3] = CARD_RANGES[idx];
  const isLast = idx === 3;

  const opacity = useTransform(
    scrollYProgress,
    [s0, s1, s2, s3],
    [0, 1, 1, isLast ? 1 : 0]
  );
  const y = useTransform(
    scrollYProgress,
    [s0, s1, s2, s3],
    [36, 0, 0, isLast ? 0 : -36]
  );
  const scale = useTransform(
    scrollYProgress,
    [s0, s1, s2, s3],
    [0.94, 1, 1, isLast ? 1 : 0.94]
  );

  return { opacity, y, scale };
}

// Dot width: pure MotionValue → no setState, zero re-renders on scroll
function useDotWidth(scrollYProgress: MotionValue<number>, idx: number) {
  const [, s1, s2] = CARD_RANGES[idx];
  const mid = (s1 + s2) / 2;
  return useTransform(scrollYProgress, [s1 - 0.04, s1, mid, s2, s2 + 0.04], [8, 24, 24, 24, 8]);
}

export default function FromJapanWithCare() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Desktop-only slide: LHS slides from center to left column
  const desktopX = useTransform(scrollYProgress, [0, 0.15], ["55%", "0%"]);
  const desktopScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  // Pre-compute card & dot motion values (hooks must be unconditional)
  const card0 = useCardMotion(scrollYProgress, 0);
  const card1 = useCardMotion(scrollYProgress, 1);
  const card2 = useCardMotion(scrollYProgress, 2);
  const card3 = useCardMotion(scrollYProgress, 3);
  const cards = [card0, card1, card2, card3];

  const dot0Width = useDotWidth(scrollYProgress, 0);
  const dot1Width = useDotWidth(scrollYProgress, 1);
  const dot2Width = useDotWidth(scrollYProgress, 2);
  const dot3Width = useDotWidth(scrollYProgress, 3);
  const dotWidths = [dot0Width, dot1Width, dot2Width, dot3Width];

  return (
    <section
      ref={containerRef}
      className="relative w-full z-10 -mt-8 sm:-mt-12 md:-mt-20 overflow-visible antialiased"
      style={{ backgroundColor: "#ffebeb" }}
    >
      {/* Wave Curve Top */}
      <div className="w-full overflow-hidden leading-none pointer-events-none select-none">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-[40px] sm:h-[70px] md:h-[110px] block"
        >
          <path
            d="M0,64 C240,150 480,0 720,32 C960,64 1200,150 1440,64 L1440,120 L0,120 Z"
            fill="#ffebeb"
          />
        </svg>
      </div>

      {/* Scroll track */}
      <div className="relative w-full h-[280vh] md:h-[450vh]">
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div className="relative z-10 mx-auto max-w-7xl w-full px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

            {/* LHS Description — desktop gets scroll-driven x/scale, mobile stays static */}
            <motion.div
              style={{
                x: desktopX,
                scale: desktopScale,
                willChange: "transform",
              }}
              className="w-full md:w-7/12 flex flex-col justify-center space-y-5 md:space-y-7 text-stone-900"
            >
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-stone-900 font-[family-name:var(--font-bayon)] uppercase tracking-wide leading-[1.05]">
                From Japan <br className="hidden md:inline" /> With Care
              </h2>

              <div className="space-y-5 md:space-y-6">
                <p className="text-stone-700 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed">
                  Every product in our collection is curated, inspected, and delivered directly to your doorstep with pristine attention to detail.
                </p>
                <p className="text-stone-900 text-base sm:text-lg md:text-xl lg:text-2xl font-medium font-serif leading-relaxed border-l-4 border-rose-500/80 pl-5 italic drop-shadow-sm">
                  At Sakura, we bring the heart of Japanese craftsmanship to your home. We partner directly with heritage tea estates, organic farms, and multi-generational artisans to share authentic products made with deep respect for tradition.
                </p>
              </div>
            </motion.div>

            {/* RHS Cards Stack */}
            <div className="relative w-full md:w-5/12 h-[260px] sm:h-[300px] md:h-[380px] flex items-center justify-center">
              {pillars.map((pillar, idx) => {
                const { opacity, y, scale } = cards[idx];

                return (
                  <motion.div
                    key={pillar.id}
                    style={{
                      opacity,
                      y,
                      scale,
                      willChange: "transform, opacity",
                      translateZ: 0,
                      pointerEvents: "none",
                    }}
                    className="absolute inset-0 w-full h-full bg-white/90 border border-white/70 rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col justify-between shadow-xl group"
                  >
                    <div className="space-y-3 sm:space-y-4 md:space-y-5">
                      {/* Icon — solid fill, no blur */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl bg-rose-50 flex items-center justify-center border border-rose-100 shadow-sm">
                        {pillar.icon}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.2em] text-rose-900/90">
                          {pillar.subtitle}
                        </span>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-900 leading-tight">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-stone-700 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-stone-900/10 h-1 rounded-full overflow-hidden mt-2">
                      <div
                        className="bg-rose-700 h-full"
                        style={{ width: `${((idx + 1) / pillars.length) * 100}%` }}
                      />
                    </div>
                  </motion.div>
                );
              })}

              {/* Pagination dots — pure MotionValue width, zero React re-renders */}
              <div className="absolute -bottom-7 flex justify-center gap-2 items-center">
                {pillars.map((_, i) => (
                  <motion.div
                    key={i}
                    style={{ width: dotWidths[i] }}
                    className="h-2 rounded-full bg-rose-800"
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}