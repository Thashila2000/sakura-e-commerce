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

        {/* Portrait banner — mobile & ALL tablets incl. iPad Pro landscape (hidden on xl+) */}
        <div
          className="block xl:hidden relative w-full rounded-2xl overflow-hidden shadow-sm aspect-square"
          style={{ backgroundColor: "#F5EDE0" }}
        >
          <Image
            src="/banners/wellness-banner-portrait.png"
            alt="Wellness Banner"
            fill
            priority
            sizes="(max-width: 1280px) 100vw"
            className="object-contain"
          />
        </div>

        {/* Landscape banner — desktop only (1280px+) */}
        <div className="hidden xl:block relative w-full rounded-2xl overflow-hidden shadow-sm aspect-[21/9]">
          <Image
            src="/banners/wellness-banner.png"
            alt="Wellness Banner"
            fill
            priority
            sizes="(min-width: 1280px) 100vw"
            className="object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
}
