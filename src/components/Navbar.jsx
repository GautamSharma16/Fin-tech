import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import credviaLogo from '../assets/credvia logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 left-0 right-0 w-full z-50 transition-all duration-300">
      {/* Top Utility Bar */}
      {!isScrolled && (
        <div className="hidden md:block bg-surface-container-low border-b border-surface-container/40 text-on-surface-variant text-xs py-1 px-4 md:px-gutter-desktop">
          <div className="max-w-container-max mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="font-bold text-primary tracking-wide text-[11px] sm:text-xs">CREDVIA FINANCIAL SERVICES</span>
              <span className="text-outline-variant hidden sm:inline">•</span>
              <span className="hidden sm:inline">Lucknow (UP)</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a href="tel:+918340421940" className="hover:underline flex items-center gap-1 font-bold text-primary text-[11px] sm:text-xs">
                <span className="material-symbols-outlined text-xs">call</span>
                +91 83404 21940
              </a>
              <span className="text-outline-variant">|</span>
              <Link to="/contact" className="hover:underline font-semibold text-[11px] sm:text-xs">SUPPORT</Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Header Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'w-full rounded-none bg-primary/95 backdrop-blur-md shadow-xl py-2.5 px-4 md:px-gutter-desktop border-b border-white/10'
            : 'max-w-container-max mx-auto px-4 sm:px-6 my-1.5 sm:my-2 rounded-2xl bg-primary text-white shadow-xl border border-white/10 py-2.5 max-sm:w-full max-sm:mx-0 max-sm:my-0 max-sm:rounded-none'
        }`}
      >
        <div className="max-w-container-max mx-auto flex items-center justify-between gap-2 sm:gap-space-md">
          {/* Mobile menu toggle on left for mobile layout (like Tata Capital) */}
          <button
            className="lg:hidden p-1.5 text-white focus:outline-none shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-2xl font-bold">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          {/* Brand Logo directly on header background */}
          <Link to="/" className="flex items-center shrink-0 group py-0.5">
            <img
              src={credviaLogo}
              alt="Credvia Financial Services Logo"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-space-lg">
            <Link
              to="/"
              className={`py-1 text-sm font-semibold transition-colors relative ${
                isActive('/') ? 'text-secondary-fixed font-bold' : 'text-white/90 hover:text-white'
              }`}
            >
              Home
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-fixed rounded-full"></span>
              )}
            </Link>

            <a
              href="/#loans-section"
              className="py-1 text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              Loans
            </a>

            <div className="relative flex items-center">
              <Link
                to="/subscribe"
                className={`py-1 text-sm font-semibold transition-colors ${
                  isActive('/subscribe') ? 'text-secondary-fixed font-bold' : 'text-white/90 hover:text-white'
                }`}
              >
                Financial Assistance
              </Link>
              <span className="ml-1.5 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-extrabold uppercase tracking-wider animate-pulse">
                POPULAR
              </span>
            </div>

            <Link
              to="/about"
              className={`py-1 text-sm font-semibold transition-colors ${
                isActive('/about') ? 'text-secondary-fixed font-bold' : 'text-white/90 hover:text-white'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`py-1 text-sm font-semibold transition-colors ${
                isActive('/contact') ? 'text-secondary-fixed font-bold' : 'text-white/90 hover:text-white'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-space-md shrink-0">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 transition-colors text-white">
              <span className="material-symbols-outlined text-secondary-fixed text-base">support_agent</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-white/70 uppercase font-semibold leading-tight">Toll-Free</span>
                <a className="text-xs font-bold text-white hover:underline leading-tight" href="tel:+918340421940">
                  +91 83404 21940
                </a>
              </div>
            </div>

            <Link
              to="/subscribe"
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-lg text-xs sm:text-sm font-extrabold hover:bg-secondary-fixed-dim active:scale-95 transition-all duration-200 shadow-[0_4px_14px_rgba(190,245,60,0.4)] animate-glow-button"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>

      {/* Sleek Tata Capital style Mobile Floating Card Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-4 max-w-container-max mx-auto animate-fadeIn">
          <div className="bg-white text-on-surface rounded-2xl p-4 shadow-2xl border border-surface-container my-2 flex flex-col gap-1">
            {/* Menu Item 1: Home */}
            <div className="border-b border-surface-container/60 pb-2 pt-1">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-sm font-bold text-primary hover:text-secondary-container transition-colors"
              >
                <span>Home</span>
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </Link>
            </div>

            {/* Menu Item 2: Loans */}
            <div className="border-b border-surface-container/60 py-2">
              <a
                href="/#loans-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-bold text-on-surface hover:text-primary transition-colors"
              >
                <span>Loans</span>
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </a>
            </div>

            {/* Menu Item 3: Financial Assistance */}
            <div className="border-b border-surface-container/60 py-2">
              <Link
                to="/subscribe"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-bold text-on-surface hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>Financial Assistance</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed text-[10px] font-extrabold uppercase">
                    POPULAR
                  </span>
                </div>
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </Link>
            </div>

            {/* Menu Item 4: About Us */}
            <div className="border-b border-surface-container/60 py-2">
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-bold text-on-surface hover:text-primary transition-colors"
              >
                <span>About Us</span>
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </Link>
            </div>

            {/* Menu Item 5: Contact Us */}
            <div className="border-b border-surface-container/60 py-2">
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-bold text-on-surface hover:text-primary transition-colors"
              >
                <span>Contact Us</span>
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </Link>
            </div>

            {/* Apply Button CTA in dropdown */}
            <div className="pt-3">
              <Link
                to="/subscribe"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-bold text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <span>Apply for Loan</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
