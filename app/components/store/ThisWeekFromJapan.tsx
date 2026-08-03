"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";

// Dynamically import ModelViewer with SSR disabled for WebGL stability
const DynamicModelViewer = dynamic(() => import("./ModelViewer"), {
  ssr: false,
});

interface Product {
  id: number;
  title: string;
  badge: "Imported from Osaka" | "Limited Arrival" | "Bestseller";
  price: string;
  description: string;
  modelPath: string;
  scale?: number;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Osaka Ceremonial Matcha",
    badge: "Imported from Osaka",
    price: "$28.00",
    description: "First harvest ceremonial grade matcha ground in traditional stone mills.",
    modelPath: "/model/tea.glb",
    scale: 1.2,
    category: "Green Tea",
  },
  {
    id: 2,
    title: "Botanical Radiance Serum",
    badge: "Bestseller",
    price: "$45.00",
    description: "Infused with green tea antioxidants and rice extract for luminous skin.",
    modelPath: "/model/serum3.glb",
    scale: 1.2,
    category: "J-Beauty",
  },
  {
    id: 3,
    title: "Artisan Shichimi Togarashi",
    badge: "Limited Arrival",
    price: "$14.00",
    description: "Seven-spice blend sourced directly from Osaka spice masters.",
    modelPath: "/model/serum3.glb",
    scale: 1.2,
    category: "Spices",
  },
];

// Header Container Variant (Staggers Title & Paragraph)
const headerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

// Header Item Variants
const headerChildVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -25, 
    filter: "blur(6px)" 
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ThisWeekFromJapan() {
  const getBadgeStyle = (badge: Product["badge"]) => {
    switch (badge) {
      case "Imported from Osaka":
        return "bg-amber-900/80 text-amber-100 border-amber-700/50";
      case "Bestseller":
        return "bg-rose-950/80 text-rose-100 border-rose-800/50";
      case "Limited Arrival":
        return "bg-stone-900/80 text-stone-100 border-stone-700/50";
      default:
        return "bg-stone-900/80 text-white";
    }
  };

  return (
    <section
      className="relative w-full z-10 py-16 sm:py-20 md:py-24 overflow-hidden antialiased"
      style={{ backgroundColor: "#fcddf2" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Animated Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto space-y-3 antialiased"
        >
          <motion.h2 
            variants={headerChildVariants}
            className="text-4xl sm:text-6xl md:text-7xl text-stone-900 font-[family-name:var(--font-bayon)] uppercase tracking-wide antialiased"
          >
            This Week From Japan
          </motion.h2>

          <motion.p 
            variants={headerChildVariants}
            className="text-stone-700 text-sm sm:text-base md:text-lg leading-relaxed antialiased"
          >
            Exclusive weekly import batches sourced directly from artisan producers in Japan.
          </motion.p>
        </motion.div>

        {/* Product Cards Grid with 3D Models */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className="group relative bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* 3D Canvas Header Container */}
              <div className="relative w-full h-[240px] sm:h-[260px] bg-gradient-to-b from-stone-100 to-stone-50 overflow-hidden cursor-grab active:cursor-grabbing">
                <DynamicModelViewer 
                  modelPath={product.modelPath} 
                  scale={product.scale || 1} 
                />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span
                    className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide backdrop-blur-md border shadow-md ${getBadgeStyle(
                      product.badge
                    )}`}
                  >
                    {product.badge}
                  </span>
                </div>

                {/* Category Tag */}
                <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                  <span className="text-xs uppercase tracking-wider text-stone-700 font-semibold bg-white/90 px-2.5 py-1 rounded-md shadow-xs backdrop-blur-xs">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-2xl sm:text-3xl text-stone-900 font-[family-name:var(--font-bayon)] leading-tight tracking-wide">
                      {product.title}
                    </h3>
                    <span className="text-lg sm:text-xl font-bold text-stone-900 font-mono">
                      {product.price}
                    </span>
                  </div>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* CTA Button with expanded width & padding */}
                <div className="w-full px-2 pt-1">
                  <button
                    type="button"
                    className="w-full py-3.5 px-8 rounded-full bg-stone-900 text-white font-semibold text-sm transition-all duration-300 hover:bg-stone-800 hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Quick Add</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}