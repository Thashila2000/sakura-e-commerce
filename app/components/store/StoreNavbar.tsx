'use client';

import LinkNext from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const NAV_LINKS: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  {
    label: 'Categories',
    children: [
      { label: 'Spices', href: '/category/spices' },
      { label: 'Cosmetics', href: '/category/cosmetics' },
      { label: 'Tea', href: '/category/tea' },
    ],
  },
  { href: '/contact', label: 'Contact Us' },
];

const BRAND_COLOR = '#901f3b';

// Pages with dark hero backgrounds — navbar will use dark mode on these
const DARK_BG_PAGES: string[] = [];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkBg, setDarkBg] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Detect if we are over a dark background section
  useEffect(() => {
    const detect = () => {
      if (window.scrollY > 80) {
        setDarkBg(false);
        return;
      }
      setDarkBg(DARK_BG_PAGES.includes(pathname));
    };
    detect();
    window.addEventListener('scroll', detect, { passive: true });
    return () => window.removeEventListener('scroll', detect);
  }, [pathname]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body when mobile/tablet menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // Derived styles
  const isDark = darkBg && !scrolled;

  const navBg = scrolled
    ? 'rgba(255,255,255,0.94)'
    : isDark
      ? 'rgba(11,15,25,0.80)'
      : 'rgba(255,255,255,0.88)';

  const navBorder = scrolled
    ? 'rgba(15,23,42,0.12)'
    : isDark
      ? 'rgba(255,255,255,0.15)'
      : 'rgba(15,23,42,0.08)';

  const navShadow = scrolled
    ? '0 6px 28px -4px rgba(15,23,42,0.10)'
    : '0 2px 14px -2px rgba(15,23,42,0.04)';

  // Link colors
  const linkColor = isDark && !scrolled ? '#E2E8F0' : '#0F172A';
  const linkHover = isDark && !scrolled ? '#FFFFFF' : BRAND_COLOR;

  return (
    <>
      <style>{`
        /* Desktop Navigation Links */
        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          color: inherit;
          transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;
          white-space: nowrap;
          cursor: pointer;
        }
        .nav-link:hover {
          color: var(--link-hover) !important;
          background: var(--link-hover-bg);
          transform: translateY(-1px);
        }
        .nav-link.active {
          font-weight: 700;
          color: #fff !important;
          transform: none;
        }
        .nav-link.active .nav-bubble {
          opacity: 1;
          transform: scale(1);
        }
        .nav-bubble {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: ${BRAND_COLOR};
          opacity: 0;
          transform: scale(0.85);
          transition: opacity 0.25s ease, transform 0.25s ease;
          z-index: 0;
          box-shadow: 0 4px 14px rgba(144, 31, 59, 0.35);
        }
        .nav-link-label {
          position: relative;
          z-index: 1;
        }

        /* Dropdown Desktop Styling */
        .dropdown-container {
          position: relative;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 10px;
          min-width: 220px;
          background: #ffffff;
          border: 1px solid rgba(15,23,42,0.08);
          border-radius: 14px;
          box-shadow: 0 12px 32px -8px rgba(15,23,42,0.15);
          padding: 8px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(8px);
          transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
          z-index: 60;
        }
        
        /* Activate dropdown on hover or focus-within for desktop/large tablets */
        @media (min-width: 1025px) {
          .dropdown-container:hover .dropdown-menu,
          .dropdown-container:focus-within .dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
        }

        .dropdown-item {
          display: block;
          padding: 10px 16px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #1E293B;
          text-decoration: none;
          border-radius: 10px;
          transition: background 0.15s, color 0.15s, transform 0.15s;
        }
        .dropdown-item:hover {
          background: rgba(144, 31, 59, 0.08);
          color: ${BRAND_COLOR};
          transform: translateX(2px);
        }

        /* Hamburger lines */
        .ham-line {
          position: absolute;
          height: 2px;
          width: 24px;
          background: currentColor;
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }

        /* Mobile & Tablet Overlay Drawer */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 40;
          display: flex;
          flex-direction: column;
          transition: opacity 0.3s ease;
        }
        .mobile-overlay.closed { opacity: 0; pointer-events: none; }
        .mobile-overlay.open   { opacity: 1; pointer-events: all;  }

        /* Mobile & Tablet Link Item Styles with Added Spacing */
        .mobile-nav-item {
          margin-bottom: 12px;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 12px;
          border-bottom: 1px solid rgba(15,23,42,0.06);
          font-size: 1.25rem;
          font-weight: 700;
          color: #0F172A;
          text-decoration: none;
          transition: color 0.2s, transform 0.3s, opacity 0.3s;
          background: none;
          border: none;
          border-bottom: 1px solid rgba(15,23,42,0.06);
          width: 100%;
          cursor: pointer;
        }
        .mobile-nav-link.active { color: ${BRAND_COLOR}; }
        .mobile-nav-link:hover  { color: ${BRAND_COLOR}; }

        /* Mobile Sub-Links Container & Items Gap */
        .mobile-sublinks-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-left: 16px;
          padding-top: 10px;
          padding-bottom: 12px;
        }

        .mobile-sublink {
          display: block;
          padding: 12px 18px;
          font-size: 1.05rem;
          font-weight: 600;
          color: #475569;
          text-decoration: none;
          border-radius: 8px;
          background: rgba(15,23,42,0.02);
          border-bottom: 1px dashed rgba(15,23,42,0.05);
          transition: color 0.15s, background 0.15s;
        }
        .mobile-sublink:hover, .mobile-sublink.active {
          color: ${BRAND_COLOR};
          background: rgba(144, 31, 59, 0.06);
        }

        /* Overlay animations */
        .mobile-overlay.open   .mobile-nav-link { transform: translateY(0); opacity: 1; }
        .mobile-overlay.closed .mobile-nav-link { transform: translateY(12px); opacity: 0; }

        /* Responsive Breakpoints for iPad Pro, Nest Hub & Tablet Support (up to 1024px) */
        .desktop-only { display: flex !important; }
        .mobile-tab-only { display: none !important; }

        @media (max-width: 1024px) {
          .desktop-only { display: none !important; }
          .mobile-tab-only { display: flex !important; }
        }
      `}</style>

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '10px 16px', // Reduced header vertical padding
          fontFamily: 'var(--font-space-grotesk), sans-serif',
        }}
      >
        <nav
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 20px', // Reduced navbar padding to decrease total height
            borderRadius: 16,
            border: `1px solid ${navBorder}`,
            background: navBg,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: navShadow,
            transition: 'background 0.35s, border-color 0.35s, box-shadow 0.35s',
          }}
        >
          {/* Logo */}
          <LinkNext href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <div
              style={{
                position: 'relative',
                width: 170, // Optimized width for streamlined navbar height
                height: 46, // Reduced height
              }}
            >
              <Image
                src="/images/logo1.png"
                alt="Sakura Logo"
                fill
                priority
                sizes="170px"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'left center',
                }}
              />
            </div>
          </LinkNext>

          {/* Desktop Nav Links */}
          <ul
            style={{
              alignItems: 'center',
              gap: 8,
              listStyle: 'none',
              margin: 0,
              padding: 0,
              marginLeft: 'auto',
            }}
            className="desktop-only"
          >
            {NAV_LINKS.map((link) => {
              if (link.children) {
                const isChildActive = link.children.some((c) => pathname === c.href);
                return (
                  <li key={link.label} className="dropdown-container">
                    <div
                      className={`nav-link${isChildActive ? ' active' : ''}`}
                      style={{
                        color: isChildActive ? undefined : linkColor,
                        // @ts-ignore css var
                        '--link-hover': linkHover,
                        '--link-hover-bg':
                          isDark && !scrolled
                            ? 'rgba(255,255,255,0.12)'
                            : 'rgba(144,31,59,0.06)',
                      }}
                    >
                      <span className="nav-bubble" />
                      <span className="nav-link-label">{link.label}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ position: 'relative', zIndex: 1 }}
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="dropdown-menu">
                      {link.children.map((child) => (
                        <LinkNext
                          key={child.href}
                          href={child.href}
                          className="dropdown-item"
                        >
                          {child.label}
                        </LinkNext>
                      ))}
                    </div>
                  </li>
                );
              }

              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <LinkNext
                    href={link.href!}
                    className={`nav-link${active ? ' active' : ''}`}
                    style={{
                      color: active ? undefined : linkColor,
                      // @ts-ignore css var
                      '--link-hover': linkHover,
                      '--link-hover-bg':
                        isDark && !scrolled
                          ? 'rgba(255,255,255,0.12)'
                          : 'rgba(144,31,59,0.06)',
                    }}
                  >
                    <span className="nav-bubble" />
                    <span className="nav-link-label">{link.label}</span>
                  </LinkNext>
                </li>
              );
            })}
          </ul>

          {/* Hamburger Menu Toggle (Mobile, Tablet, iPad Pro & Nest Hub) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="mobile-tab-only"
            style={{
              position: 'relative',
              zIndex: 50,
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isDark && !scrolled ? '#fff' : '#0F172A',
              marginLeft: 'auto',
            }}
          >
            <span
              className="ham-line"
              style={{ transform: menuOpen ? 'rotate(45deg)' : 'translateY(-7px)' }}
            />
            <span className="ham-line" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span
              className="ham-line"
              style={{ transform: menuOpen ? 'rotate(-45deg)' : 'translateY(7px)' }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile & Tablet Overlay Drawer */}
      <div
        className={`mobile-overlay ${menuOpen ? 'open' : 'closed'}`}
        style={{
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Close Button Header */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '24px 24px 0' }}>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: '1px solid rgba(15,23,42,0.1)',
              background: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0F172A',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile & Tablet Overlay Navigation List */}
        <nav style={{ padding: '24px 32px', flex: 1, overflowY: 'auto' }}>
          {NAV_LINKS.map((link, i) => {
            if (link.children) {
              return (
                <div key={link.label} className="mobile-nav-item">
                  <button
                    onClick={() => setMobileDropdownOpen((prev) => !prev)}
                    className="mobile-nav-link"
                    style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
                  >
                    <span>{link.label}</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{
                        transform: mobileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                      }}
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {mobileDropdownOpen && (
                    <div className="mobile-sublinks-container">
                      {link.children.map((child) => (
                        <LinkNext
                          key={child.href}
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                          className={`mobile-sublink${pathname === child.href ? ' active' : ''}`}
                        >
                          {child.label}
                        </LinkNext>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={link.href} className="mobile-nav-item">
                <LinkNext
                  href={link.href!}
                  onClick={() => setMenuOpen(false)}
                  className={`mobile-nav-link${pathname === link.href ? ' active' : ''}`}
                  style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
                >
                  {link.label}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </LinkNext>
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}