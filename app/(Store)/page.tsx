'use client';

import HeroCarousel from "../components/store/HeroCarousel";
import FromJapanWithCare from "../components/store/FromJapanWithCare";
import ThreeJapaneseEssentials from "../components/store/ThreeJapaneseEssentials";
import ThisWeekFromJapan from "../components/store/ThisWeekFromJapan";
import SignatureCollection from "../components/store/SignatureCollection";
import WellnessBannerSection from "../components/store/Banner";

export default function Home() {
  return (
    <div className="relative w-full bg-gray-50/50">
      {/* 1. Fixed Hero Container */}
      <div className="sticky top-0 z-0 h-screen w-full">
        <HeroCarousel />
      </div>

      {/* 2. Overlapping Section */}
      <div className="relative z-10 mt-20">
        <FromJapanWithCare />
        <ThreeJapaneseEssentials />

        {/* Weekly Imports Section */}
        <ThisWeekFromJapan />

        {/* Signature / Featured Collection */}
        <SignatureCollection />

        {/* Wellness Banner Section below Signature Collection */}
        <WellnessBannerSection />
      </div>
    </div>
  );
}