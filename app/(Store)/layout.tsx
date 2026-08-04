import { Bayon } from 'next/font/google';
import Navbar from '../components/store/StoreNavbar';
import Footer from '../components/store/Footer';
import LoadingScreen from '../components/store/LoadingScreen'; // Adjust path if needed

const bayon = Bayon({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bayon',
});

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`store-container min-h-screen flex flex-col bg-white text-slate-900 relative ${bayon.variable}`}
    >
      {/* Fast & Unique Loading Screen with #fbb7dd background */}
      <LoadingScreen />

      {/* Absolute positioning overlays the navbar on top of the hero section */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </header>

      {/* Main content starts directly at the top (0px offset) */}
      <main className="flex-1 w-full pt-0">
        {children}
      </main>

      {/* Store Footer */}
      <Footer />
    </div>
  );
}