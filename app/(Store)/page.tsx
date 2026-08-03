'use client';

import HeroCarousel from "../components/store/HeroCarousel";
import ThreeJapaneseEssentials from "../components/store/ThreeJapaneseEssentials";

export default function Home() {
  return (
    <div className="relative w-full bg-gray-50/50">
      {/* 1. Fixed Hero Container */}
      <div className="sticky top-0 z-0 h-screen w-full">
        <HeroCarousel />
      </div>

      {/* 2. Overlapping Essentials Section */}
      <div className="relative z-10 mt-20">
        <ThreeJapaneseEssentials />
      </div>
    </div>
  );
}