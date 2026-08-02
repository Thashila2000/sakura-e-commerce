import HeroCarousel from "../components/store/HeroCarousel";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* 1. Full-Width Hero Carousel Banner Section */}
      <section className="w-full">
        <HeroCarousel />
      </section>

      {/* 2. Page Content Wrapped in Bounded Container */}
      <div className="max-w-7xl mx-auto space-y-12 py-12 px-4 sm:px-6 lg:px-8">
        {/* Additional homepage sections (e.g., Product Lists, Categories, Deals) go here */}
      </div>
    </main>
  );
}