"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    desktopSrc: "/banners/hero1.png",
    mobileSrc: "/banners/hero-mobile-new.png",
    altText: "Authentic Japanese green tea, premium skincare, and traditional spices",
    title: "Experience the Best of Japan",
    subtext: "Discover authentic Japanese green tea, premium skincare, and traditional spices carefully selected and imported directly from Japan.",
    ctaText: "Explore Collection",
    ctaLink: "/shop",
    category: "Authentic Japanese Products",
  },
  {
    id: 2,
    desktopSrc: "/banners/cosmetics-hero3.png",
    mobileSrc: "/banners/cosmetics-hero-mobile2.png",
    altText: "Premium Japanese Skincare and J-Beauty Cosmetics Made with Natural Botanical Ingredients",
    title: "J-Beauty & Natural Cosmetics",
    subtext: "Experience the art of Japanese skincare crafted with botanical extracts and green tea antioxidants.",
    ctaText: "Discover J-Beauty",
    ctaLink: "/shop/cosmetics",
    category: "Japanese Cosmetics",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isReadyToSlide, setIsReadyToSlide] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const hasSeenLoader = sessionStorage.getItem("sakura_has_visited");
      if (hasSeenLoader) {
        setIsReadyToSlide(true);
        return;
      }
    } catch {
      setIsReadyToSlide(true);
    }

    const handleLoaderComplete = () => {
      setIsReadyToSlide(true);
    };

    window.addEventListener("sakura_loader_complete", handleLoaderComplete);

    const timer = setTimeout(() => {
      setIsReadyToSlide(true);
    }, 2500);

    return () => {
      window.removeEventListener("sakura_loader_complete", handleLoaderComplete);
      clearTimeout(timer);
    };
  }, []);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

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
        className="relative z-0 isolate w-full h-screen min-h-[500px] overflow-hidden bg-[#E8DEC8] group"
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
            className="absolute inset-0 z-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Image
              src={isMobile ? currentSlide.mobileSrc : currentSlide.desktopSrc}
              alt={currentSlide.altText}
              fill
              priority
              sizes="100vw"
              quality={85}
              className="object-cover object-center w-full h-full"
            />

            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Content Overlay (Lowered Positioning for Mobile & Tablet) */}
        <div className="absolute inset-0 z-10 flex items-start justify-start px-6 sm:px-12 md:px-16 lg:px-24 pt-44 sm:pt-48 md:pt-40 lg:pt-36">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSlide.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="max-w-2xl text-white space-y-3 sm:space-y-4 md:space-y-5"
            >
              {/* Heading with Bayon Font */}
              <h2 className="font-[family-name:var(--font-bayon)] text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide uppercase leading-tight drop-shadow-lg">
                {currentSlide.title}
              </h2>

              {/* Subtext */}
              <p className="text-sm sm:text-lg md:text-xl text-gray-100 line-clamp-3 drop-shadow-md max-w-[95%] sm:max-w-none leading-relaxed">
                {currentSlide.subtext}
              </p>

              {/* Compact CTA Button with Hover Effects */}
              <div className="pt-2 sm:pt-3">
                <Link
                  href={currentSlide.ctaLink}
                  title={`Shop ${currentSlide.title}`}
                  className="inline-block bg-white text-slate-950 font-bold px-6 sm:px-8 md:px-9 py-2.5 sm:py-3 md:py-3.5 rounded-full shadow-lg text-sm sm:text-base md:text-lg tracking-wide transition-all duration-300 ease-out hover:bg-slate-50 hover:-translate-y-1 hover:shadow-2xl hover:scale-105 active:translate-y-0 active:scale-95"
                >
                  {currentSlide.ctaText}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}: ${slide.title}`}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 ${i === index
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