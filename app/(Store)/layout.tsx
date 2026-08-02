import Navbar from '../components/store/StoreNavbar';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="store-container min-h-screen flex flex-col bg-white text-slate-900 relative">
      {/* Absolute positioning makes the navbar overlay on top of the content */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </header>

      {/* Main content starts directly at the top (0px offset) */}
      <main className="flex-1 w-full pt-0">
        {children}
      </main>
    </div>
  );
}