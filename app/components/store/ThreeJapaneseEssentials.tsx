"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const essentials = [
  {
    id: 1,
    title: "Beauty & Cosmetics",
    description:
      "Premium skincare and beauty products inspired by Japanese rituals.",
    image: "/images/cosmetics.png",
    
    size: "large",
  },
  {
    id: 2,
    title: "Japanese Spices",
    description:
      "Traditional seasonings that bring Japanese flavors to your kitchen.",
    image: "/images/spices.png",
    
    size: "small",
  },
  {
    id: 3,
    title: "Green Tea",
    description: "Authentic teas sourced for everyday wellness.",
    image: "/images/green-tea.png",
  
    size: "small",
  },
];

// Heading Entrance Animation Variants
const headingVariants = {
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

// Bento Cards Pop-Up Animation Variants
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50, 
    scale: 0.94 
  },
  visible: (customIndex: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.21, 1.11, 0.81, 0.99], // Custom cubic spring curve for a subtle pop effect
      delay: 0.2 + customIndex * 0.15, // Stagger delay after heading appears
    },
  }),
};

export default function ThreeJapaneseEssentials() {
  const large = essentials.find((e) => e.size === "large");
  const smalls = essentials.filter((e) => e.size === "small");

  return (
    <section
      className="relative w-full z-10 -mt-8 sm:-mt-12 md:-mt-20 overflow-hidden"
      style={{ backgroundColor: "#bf8065" }}
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
            fill="#bf8065"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-0 sm:pt-2 md:pb-28">
        {/* Animated Heading */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          variants={headingVariants}
          className="text-center text-3xl md:text-5xl text-white mb-10 md:mb-14 tracking-wide font-[family-name:var(--font-bayon)]"
        >
          Three Japanese Essentials
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:h-[640px]">
          {/* Large Card (Beauty & Cosmetics) */}
          {large && (
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              className="group relative rounded-3xl overflow-hidden border border-white/20
                         shadow-lg transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-2xl
                         h-[320px] md:h-full cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  src={large.image}
                  alt={large.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-transparent" />
              </div>

              <div className="absolute top-0 left-0 right-0 p-5 md:p-6 z-10 flex flex-col items-start">
                <h3 className="text-xl md:text-2xl text-white mb-1 font-[family-name:var(--font-bayon)] flex items-center gap-2 drop-shadow-md">
                  <span>{large.icon}</span> {large.title}
                </h3>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed max-w-xs drop-shadow mb-4">
                  {large.description}
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-stone-900 font-medium text-xs sm:text-sm transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-md"
                >
                  Explore
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
          <div className="grid grid-rows-2 gap-6 h-full">
            {smalls.map((item, idx) => (
              <motion.div
                key={item.id}
                custom={idx + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={cardVariants}
                className="group relative rounded-3xl overflow-hidden border border-white/20
                           shadow-lg transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-2xl
                           h-[340px] md:h-full cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-transparent" />
                </div>

                <div className="absolute top-0 left-0 right-0 p-5 md:p-6 z-10 flex flex-col items-start">
                  <h3 className="text-xl md:text-2xl text-white mb-1 font-[family-name:var(--font-bayon)] flex items-center gap-2 drop-shadow-md">
                    <span>{item.icon}</span> {item.title}
                  </h3>
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed max-w-xs drop-shadow mb-4">
                    {item.description}
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-stone-900 font-medium text-xs sm:text-sm transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-md"
                  >
                    Explore
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
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