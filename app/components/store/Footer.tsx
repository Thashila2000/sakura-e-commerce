"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa6";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
    color: "hover:text-[#E4405F] hover:border-[#E4405F]/40",
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
    color: "hover:text-[#1877F2] hover:border-[#1877F2]/40",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: FaTiktok,
    color: "hover:text-[#000000] hover:border-[#000000]/40",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: FaYoutube,
    color: "hover:text-[#FF0000] hover:border-[#FF0000]/40",
  },
];

export default function Footer() {
  return (
    <footer 
      className="w-full text-stone-900 pt-16 pb-12 antialiased"
      style={{ backgroundColor: "rgba(251,183,221, 0.85)" }} // Transparent #ffdbdb
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Intro Section */}
        <div className="border-b border-stone-900/15 pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span 
              className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold block"
              style={{ color: "#C0003A" }}
            >
              さくら • Gateway to Japan
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-950 tracking-wide font-[family-name:var(--font-bayon)]">
              Your Gateway to Japan
            </h3>
            <p className="text-stone-800 text-base sm:text-lg leading-relaxed pt-1">
              Bringing authentic Japanese products to homes around the world one carefully selected item at a time.
            </p>
          </div>

          {/* Social Media Icons with Brand Hover Colors */}
          <div className="flex items-center gap-3 sm:gap-4 pt-4 md:pt-0">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl bg-white/60 border border-white/80 shadow-sm backdrop-blur-sm transition-all text-stone-800 ${social.color}`}
                  title={social.name}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12 pb-12">
          
          {/* Column 1: Shop */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-950">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-800 font-medium">
              <li>
                <Link href="/shop" className="transition-colors hover:text-[#C0003A]">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections" className="transition-colors hover:text-[#C0003A]">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="transition-colors hover:text-[#C0003A]">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/gift-sets" className="transition-colors hover:text-[#C0003A]">
                  Gift Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Discover */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-950">
              Discover
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-800 font-medium">
              <li>
                <Link href="/journal" className="transition-colors hover:text-[#C0003A]">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-[#C0003A]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-[#C0003A]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-950">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-800 font-medium">
              <li>
                <Link href="/faqs" className="transition-colors hover:text-[#C0003A]">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="transition-colors hover:text-[#C0003A]">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="transition-colors hover:text-[#C0003A]">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-900/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-700 font-medium">
          <p>© {new Date().getFullYear()} Sakura Japan. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-[#C0003A]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[#C0003A]">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}