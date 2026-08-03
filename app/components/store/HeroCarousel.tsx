"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    desktopSrc: "/banners/green-tea-hero2.png",
    mobileSrc: "/banners/green-tea-hero-mobile2.png",
    altText: "Authentic Japanese Loose Leaf Green Tea, Matcha, and Sencha from Shizuoka & Uji",
    title: "Authentic Japanese Green Tea",
    subtext: "Sourced directly from Japan. Discover ceremonial matcha, organic sencha, and gyokuro.",
    ctaText: "Shop Green Tea",
    ctaLink: "/shop/green-tea",
    category: "Japanese Green Tea",
  },
  {
    id: 2,
    desktopSrc: "/banners/cosmetics-hero1.png",
    mobileSrc: "/banners/cosmetics-hero-mobile1.png",
    altText: "Premium Japanese Skincare and J-Beauty Cosmetics Made with Natural Botanical Ingredients",
    title: "J-Beauty & Natural Cosmetics",
    subtext: "Experience the art of Japanese skincare crafted with botanical extracts and green tea antioxidants.",
    ctaText: "Discover J-Beauty",
    ctaLink: "/shop/cosmetics",
    category: "Japanese Cosmetics",
  },
  {
    id: 3,
    desktopSrc: "/banners/spices-hero2.png",
    mobileSrc: "/banners/spices-hero-mobile3.png",
    altText: "Traditional Japanese Spices, Artisan Shichimi Togarashi, and Pure Wasabi",
    title: "Artisan Japanese Spices",
    subtext: "Elevate your dishes with authentic shichimi, yuzu kosho, and traditional Japanese condiments.",
    ctaText: "Explore Spices",
    ctaLink: "/shop/spices",
    category: "Japanese Spices",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isReadyToSlide, setIsReadyToSlide] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Synchronize carousel auto-play directly with loading screen completion
  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem("sakura_has_visited");

    if (hasSeenLoader) {
      const timer = setTimeout(() => {
        setIsReadyToSlide(true);
      }, 0);
      return () => clearTimeout(timer);
    } else {
      const handleLoaderComplete = () => {
        setIsReadyToSlide(true);
      };

      window.addEventListener("sakura_loader_complete", handleLoaderComplete);

      const timer = setTimeout(() => {
        setIsReadyToSlide(true);
      }, 4300);

      return () => {
        window.removeEventListener("sakura_loader_complete", handleLoaderComplete);
        clearTimeout(timer);
      };
    }
  }, []);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  // Timer continuously runs once `isReadyToSlide` becomes true
  useEffect(() => {
    if (!isReadyToSlide) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, isReadyToSlide, index]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  const currentSlide = slides[index];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Featured Japanese Green Tea, Spices & Cosmetics Collections",
    "itemListElement": slides.map((slide, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "WebPage",
        "name": slide.title,
        "description": slide.subtext,
        "url": `${baseUrl}${slide.ctaLink}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        aria-roledescription="carousel"
        aria-label="Authentic Japanese Green Tea, Spices, and Cosmetics"
        className="relative z-0 isolate w-full h-full min-h-screen overflow-hidden bg-[#E8DEC8] group"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <h1 className="sr-only">
          Authentic Japanese Green Tea, Artisan Spices &amp; J-Beauty Cosmetics
        </h1>

        {/* Animated Slide Backgrounds */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${currentSlide.id}`}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Mobile & Tablet Image (Up to lg screens - 1024px, and portrait orientation) */}
            <div className="block lg:landscape:hidden relative w-full h-full">
              <Image
                src={currentSlide.mobileSrc}
                alt={currentSlide.altText}
                fill
                sizes="100vw"
                quality={95}
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                className="object-cover object-center sm:object-center"
              />
            </div>

            {/* Desktop Widescreen Image (lg screens and above, landscape orientation only) */}
            <div className="hidden lg:landscape:block relative w-full h-full">
              <Image
                src={currentSlide.desktopSrc}
                alt={currentSlide.altText}
                fill
                sizes="100vw"
                quality={90}
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                className="object-cover object-bottom"
              />
            </div>

            {/* Top & Side Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Content Overlay */}
        <div className="absolute inset-0 z-10 flex items-center portrait:items-start px-6 sm:px-12 md:px-20 lg:px-28 portrait:pt-36 sm:portrait:pt-44 md:portrait:pt-56 lg:landscape:items-center lg:landscape:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSlide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-xl md:max-w-2xl text-white space-y-3 sm:space-y-4 pt-12 md:pt-0 portrait:pt-0"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight sm:leading-snug drop-shadow-md">
                {currentSlide.title}
              </h2>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 line-clamp-2 drop-shadow max-w-[90%] sm:max-w-none">
                {currentSlide.subtext}
              </p>

              <div className="pt-2">
                <Link
                  href={currentSlide.ctaLink}
                  title={`Shop ${currentSlide.title}`}
                  className="inline-block bg-white text-slate-950 font-semibold px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full hover:bg-slate-100 transition-colors duration-200 shadow-lg text-sm sm:text-base md:text-lg"
                >
                  {currentSlide.ctaText}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}: ${slide.title}`}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 ${
                i === index
                  ? "w-8 sm:w-10 bg-white"
                  : "w-2 sm:w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
}