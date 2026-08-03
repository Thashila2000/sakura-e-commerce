"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const essentials = [
  {
    id: 1,
    title: "Beauty & Cosmetics",
    description:
      "Premium skincare and beauty products inspired by Japanese rituals.",
    image: "/images/cosmetics.png",
    icon: "✨",
    size: "large",
  },
  {
    id: 2,
    title: "Japanese Spices",
    description:
      "Traditional seasonings that bring Japanese flavors to your kitchen.",
    image: "/images/spices.png",
    icon: "🌶",
    size: "small",
  },
  {
    id: 3,
    title: "Green Tea",
    description: "Authentic teas sourced for everyday wellness.",
    image: "/images/green-tea.png",
    icon: "🍵",
    size: "small",
  },
];

const headingVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -30, 
    filter: "blur(4px)" 
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    scale: 0.95 
  },
  visible: (customIndex: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.21, 1.11, 0.81, 0.99],
      delay: 0.15 + customIndex * 0.12,
    },
  }),
};

export default function ThreeJapaneseEssentials() {
  const large = essentials.find((e) => e.size === "large");
  const smalls = essentials.filter((e) => e.size === "small");

  return (
    <section
      className="relative w-full z-10 -mt-8 sm:-mt-12 md:-mt-20 overflow-hidden"
      style={{ backgroundColor: "#fffafa" }}
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
            fill="#fffafa"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-2 md:pb-20">
        {/* Animated Heading & Subtitle */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          variants={headingVariants}
          className="text-center mb-8 md:mb-12 max-w-2xl mx-auto space-y-2"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl text-stone-900 tracking-wide font-[family-name:var(--font-bayon)] uppercase">
            Three Japanese Essentials
          </h2>
          <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed">
            Handpicked elements of everyday Japanese culture crafted for health, flavor, and timeless beauty rituals.
          </p>
        </motion.div>

        {/* Compact Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:h-[480px]">
          {/* Large Card (Beauty & Cosmetics) */}
          {large && (
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden border border-stone-200/60
                         shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                         h-[260px] md:h-full cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  src={large.image}
                  alt={large.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-transparent" />
              </div>

              <div className="absolute top-0 left-0 right-0 p-4 md:p-5 z-10 flex flex-col items-start">
                <h3 className="text-lg md:text-xl text-white mb-1 font-[family-name:var(--font-bayon)] flex items-center gap-1.5 drop-shadow">
                  <span>{large.icon}</span> {large.title}
                </h3>
                <p className="text-white/90 text-xs sm:text-sm leading-snug max-w-xs drop-shadow mb-3">
                  {large.description}
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white text-stone-900 font-semibold text-xs transition-all duration-300 hover:bg-stone-100 hover:scale-105 shadow-sm"
                >
                  Explore
                  <svg
                    className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {/* Stacked Small Cards (Spices & Green Tea) */}
          <div className="grid grid-rows-2 gap-5 h-full">
            {smalls.map((item, idx) => (
              <motion.div
                key={item.id}
                custom={idx + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={cardVariants}
                className="group relative rounded-2xl overflow-hidden border border-stone-200/60
                           shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                           h-[220px] md:h-full cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-transparent" />
                </div>

                <div className="absolute top-0 left-0 right-0 p-4 md:p-5 z-10 flex flex-col items-start">
                  <h3 className="text-lg md:text-xl text-white mb-1 font-[family-name:var(--font-bayon)] flex items-center gap-1.5 drop-shadow">
                    <span>{item.icon}</span> {item.title}
                  </h3>
                  <p className="text-white/90 text-xs sm:text-sm leading-snug max-w-xs drop-shadow mb-3">
                    {item.description}
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white text-stone-900 font-semibold text-xs transition-all duration-300 hover:bg-stone-100 hover:scale-105 shadow-sm"
                  >
                    Explore
                    <svg
                      className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}