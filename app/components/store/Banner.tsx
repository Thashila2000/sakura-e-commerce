"use client";

import Image from "next/image";

export default function WellnessBannerSection() {
  return (
    <section 
      className="relative w-full overflow-hidden py-6 sm:py-10 md:py-16"
      style={{
        background: "linear-gradient(135deg, #FCFBF8 0%, #F9F5EE 30%, #F5EFE5 65%, #F2E8DA 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-sm aspect-[16/9] md:aspect-[21/9]">
          <Image
            src="/banners/wellness-banner.png"
            alt="Wellness Banner"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-contain md:object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}