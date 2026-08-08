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
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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
      className="relative w-full z-10 py-16 sm:py-20 md:py-24 overflow-hidden antialiased"
      style={{ backgroundColor: "#fffafa" }}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Animated Heading & Subtitle */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headingVariants}
          className="text-center mb-8 md:mb-12 max-w-2xl mx-auto space-y-2 antialiased"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-stone-900 tracking-wide font-[family-name:var(--font-bayon)] uppercase antialiased">
            Three Japanese Essentials
          </h2>
          <p className="text-stone-600 text-lg sm:text-xl md:text-lg leading-relaxed antialiased">
            Handpicked elements of everyday Japanese culture crafted for health, flavor, and timeless beauty rituals.
          </p>
        </motion.div>

        {/* Compact Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:h-[520px]">
          {/* Large Card (Beauty & Cosmetics) */}
          {large && (
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="group relative rounded-3xl overflow-hidden border border-stone-200/60
                         shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                         h-[360px] md:h-full cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                   src={large.image}
                   alt={large.title}
                   fill
                   sizes="(max-width: 768px) 100vw, 50vw"
                   className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                 />
                <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-transparent" />
              </div>

              <div className="absolute top-0 left-0 right-0 p-6 md:p-8 z-10 flex flex-col items-start space-y-2">
                <h3 className="text-2xl md:text-3xl text-white font-[family-name:var(--font-bayon)] flex items-center gap-2 drop-shadow-md tracking-wide">
                  <span>{large.icon}</span> {large.title}
                </h3>
                {/* Description size bumped to text-base on mobile */}
                <p className="text-white/90 text-base sm:text-base md:text-base leading-relaxed max-w-sm drop-shadow-md pb-2">
                  {large.description}
                </p>
                {/* Unified button size */}
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-stone-900 font-semibold text-sm transition-all duration-300 hover:bg-stone-100 hover:scale-105 shadow-md"
                >
                  <span>Explore</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="group relative rounded-3xl overflow-hidden border border-stone-200/60
                           shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                           h-[320px] md:h-full cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-transparent" />
                </div>

                <div className="absolute top-0 left-0 right-0 p-5 md:p-6 z-10 flex flex-col items-start space-y-1.5">
                  <h3 className="text-2xl md:text-3xl text-white font-[family-name:var(--font-bayon)] flex items-center gap-2 drop-shadow-md tracking-wide">
                    <span>{item.icon}</span> {item.title}
                  </h3>
                  {/* Description size bumped to text-base on mobile */}
                  <p className="text-white/90 text-base sm:text-base md:text-base leading-relaxed max-w-sm drop-shadow-md pb-2">
                    {item.description}
                  </p>
                  {/* Unified button size */}
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-stone-900 font-semibold text-sm transition-all duration-300 hover:bg-stone-100 hover:scale-105 shadow-md"
                  >
                    <span>Explore</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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