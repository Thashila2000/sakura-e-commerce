"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("sakura_has_visited");

    if (hasVisited) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("sakura_has_visited", "true");
        window.dispatchEvent(new Event("sakura_loader_complete"));
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          id="sakura-loader-wrapper"
          suppressHydrationWarning
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fffafa] overflow-hidden"
          exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.8, ease: "easeOut" } }}
        >
          {/* 
            Runs synchronously during HTML parsing BEFORE the first paint.
            If visited, hides the loader in <1ms so no loader flashes on refresh.
          */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (typeof window !== 'undefined' && sessionStorage.getItem('sakura_has_visited') === 'true') {
                  var el = document.getElementById('sakura-loader-wrapper');
                  if (el) el.style.display = 'none';
                }
              `,
            }}
          />

          {/* Dense Floating Sakura Petals Background (16 Petals) */}
          <div className="absolute inset-0 pointer-events-none opacity-60 overflow-hidden">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${(i * 6) + (i % 3 === 0 ? 2 : -5)}vw`,
                  y: "-15vh",
                  rotate: 0,
                  opacity: 0.2 + (i % 5) * 0.15,
                }}
                animate={{
                  y: "115vh",
                  x: `${(i * 6) + (i % 2 === 0 ? 15 : -15)}vw`,
                  rotate: 360 + i * 45,
                }}
                transition={{
                  duration: 3 + (i % 4) * 0.8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: (i * 0.18) % 2,
                }}
                className={`absolute ${
                  i % 3 === 0
                    ? "w-5 h-5 sm:w-7 sm:h-7"
                    : i % 2 === 0
                    ? "w-3 h-3 sm:w-5 sm:h-5"
                    : "w-2 h-2 sm:w-3 sm:h-3"
                } text-[#8c0032]/40`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C12 2 14.5 7.5 19 9C23.5 10.5 22 15 18 18C14 21 12 22 12 22C12 22 10 21 6 18C2 15 0.5 10.5 5 9C9.5 7.5 12 2 12 2Z" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Centered Logo & Text Container */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
            transition={{
              scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.6 },
            }}
            className="relative flex flex-col items-center justify-center text-center px-4 w-full max-w-sm sm:max-w-md mx-auto z-10"
          >
            {/* Ambient Light Glow */}
            <div className="absolute inset-0 rounded-full bg-white/40 blur-2xl transform scale-125 -z-10" />

            {/* Logo Image Box */}
            <div className="relative w-56 sm:w-80 h-28 sm:h-40 flex items-center justify-center">
              <Image
                src="/images/logo1.png"
                alt="Sakura Logo"
                fill
                priority
                className="object-contain drop-shadow-md mx-auto"
              />
            </div>

            {/* Caption Text */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-3 text-[11px] sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#730026] text-center w-full px-2 leading-relaxed"
            >
              さくら • Pure Elegance, Sourced from Japan
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}