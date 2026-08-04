"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface Product {
  id: number;
  title: string;
  
  price: string;
  description: string;
  image: string;
  category: "Tea" | "Spices" | "J-Beauty";
  badge?: string;
  badgeColor?: string;
  isNew?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    title: "Ceremonial Matcha",
    
    price: "$28.00",
    description: "First harvest ceremonial grade matcha, stone-ground in Uji. Vivid colour, umami rich flavour.",
    image: "/signature/matcha.png",
    category: "Tea",
    badge: "Bestseller",
    badgeColor: "bg-emerald-900/80 text-emerald-100 border-emerald-700/50",
  },
  {
    id: 2,
    title: "Sencha Green Tea",
   
    price: "$18.00",
    description: "Hand picked Sencha from Shizuoka. Bright, grassy notes with a clean, refreshing finish.",
    image: "/signature/sencha.png",
    category: "Tea",
    badge: "Limited",
    badgeColor: "bg-stone-900/80 text-stone-100 border-stone-700/50",
  },
  {
    id: 3,
    title: "Japanese Chili Blend",
   
    price: "$12.00",
    description: "Smoky dried chilies blended with roasted sesame and yuzu peel for bold umami heat.",
    image: "/signature/chili.svg",
    category: "Spices",
    isNew: true,
    badgeColor: "bg-rose-900/80 text-rose-100 border-rose-700/50",
  },
  {
    id: 4,
    title: "Shichimi Togarashi",
  
    price: "$14.00",
    description: "Osaka's iconic seven spice blend red pepper, sansho, nori, ginger & citrus in every pinch.",
    image: "/signature/shichimi.svg",
    category: "Spices",
    badge: "Artisan",
    badgeColor: "bg-amber-900/80 text-amber-100 border-amber-700/50",
  },
  {
    id: 5,
    title: "Botanical Cleanser",
    
    price: "$32.00",
    description: "Gentle rice bran & green tea foam cleanser. Deeply purifies while preserving the skin barrier.",
    image: "/signature/cleanser.svg",
    category: "J-Beauty",
    badge: "J-Beauty",
    badgeColor: "bg-pink-900/80 text-pink-100 border-pink-700/50",
  },
  {
    id: 6,
    title: "Sakura Sunscreen",
 
    price: "$38.00",
    description: "SPF 50+ PA++++ lightweight fluid. Invisible finish with cherry blossom extract & hyaluronic acid.",
    image: "/signature/sunscreen.svg",
    category: "J-Beauty",
    isNew: true,
    badgeColor: "bg-yellow-700/80 text-yellow-100 border-yellow-600/50",
  },
  {
    id: 7,
    title: "Hydration Cream",
    
    price: "$45.00",
    description: "Deep hydration moisturizer enriched with fermented rice water and bio cellulose from Japan.",
    image: "/signature/moisturizer.svg",
    category: "J-Beauty",
    badge: "Bestseller",
    badgeColor: "bg-teal-900/80 text-teal-100 border-teal-700/50",
  },
];

const categories = ["All", "Tea", "Spices", "J-Beauty"] as const;
type Category = (typeof categories)[number];

const headerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};
const headerChildVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
};
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.96, y: -10, transition: { duration: 0.25 } },
};

export default function SignatureCollection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section
      className="relative w-full z-10 py-16 sm:py-20 md:py-24 overflow-hidden antialiased"
      style={{ backgroundColor: "#fdfaf3" }}
    >
      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='%23292524'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto space-y-3 antialiased"
        >
        

          <motion.h2
            variants={headerChildVariants}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-stone-900 font-[family-name:var(--font-bayon)] uppercase tracking-wide antialiased"
          >
            Our Signature Collection
          </motion.h2>

          <motion.p
            variants={headerChildVariants}
            className="text-stone-700 text-base sm:text-lg md:text-lg leading-relaxed antialiased"
          >
            Hand selected bestsellers from rare teas and bold spices to award winning J-Beauty rituals.
          </motion.p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-stone-900 text-white border-stone-900 shadow-md"
                  : "bg-white/70 text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
          >
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                layout
                className="group relative bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-[box-shadow,transform] duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                {/* Product Image */}
                <div className="relative w-full h-[200px] sm:h-[210px] overflow-hidden bg-stone-50">
                  {product.image.endsWith(".svg") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  )}

                  {/* Badge */}
                  {(product.badge || product.isNew) && (
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide border shadow-sm ${product.badgeColor}`}
                      >
                        {product.isNew ? "New" : product.badge}
                      </span>
                    </div>
                  )}

                  {/* Category Tag */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="text-[10px] uppercase tracking-wider text-stone-700 font-semibold bg-white/90 px-2 py-0.5 rounded-md shadow-sm">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                   
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg sm:text-xl text-stone-900 font-[family-name:var(--font-bayon)] leading-tight tracking-wide">
                        {product.title}
                      </h3>
                      <span className="text-base font-bold text-stone-900 font-mono shrink-0">
                        {product.price}
                      </span>
                    </div>
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    className="w-full py-2.5 px-6 rounded-full bg-stone-900 text-white font-semibold text-sm transition-all duration-300 hover:bg-rose-800 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Add to Cart</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <button
            type="button"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-stone-900 text-stone-900 font-semibold text-sm tracking-wide hover:bg-stone-900 hover:text-white transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            View Full Collection
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
