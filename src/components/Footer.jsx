import React from 'react';
import { Link } from 'react-router-dom';
import credviaLogo from '../assets/credvia logo.png';

const Footer = () => {
  return (
    <footer className="w-full bg-tertiary text-on-tertiary">
      <div className="max-w-container-max mx-auto px-gutter-desktop pt-space-3xl pb-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-2xl border-b border-tertiary-container">
          {/* Brand Info */}
          <div className="flex flex-col gap-space-md">
            <div className="inline-flex items-center w-fit transition-transform hover:scale-105">
              <img
                src={credviaLogo}
                alt="Credvia Financial Services Logo"
                className="h-12 md:h-14 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="font-body-md text-body-md text-on-tertiary-container leading-relaxed">
              CREDVIA FINANCIAL SERVICES — A trusted financial partner making credit simple, transparent, and accessible across India.
            </p>
            <div className="flex flex-col gap-1 text-on-tertiary-container font-label-sm text-xs">
              <div className="flex items-center gap-space-2xs text-secondary-fixed font-semibold">
                <span className="material-symbols-outlined text-base">verified_user</span>
                <span>Registered Financial Entity</span>
              </div>
              <div className="mt-1 font-bold text-tertiary-fixed-dim">
                GSTIN: <span className="text-secondary-fixed font-mono">09DPOPA9703N1ZA</span>
              </div>
            </div>
          </div>

          {/* Loan Solutions */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-title-md text-title-md font-bold text-on-tertiary">Loan Solutions</h4>
            <ul className="flex flex-col gap-space-xs">
              <li className="font-body-md text-body-md text-on-tertiary-container hover:text-on-tertiary hover:translate-x-1 transition-all duration-150">
                <Link to="/#loans-section">Personal Loan</Link>
              </li>
              <li className="font-body-md text-body-md text-on-tertiary-container hover:text-on-tertiary hover:translate-x-1 transition-all duration-150">
                <Link to="/#loans-section">Business Loan</Link>
              </li>
              <li className="font-body-md text-body-md text-on-tertiary-container hover:text-on-tertiary hover:translate-x-1 transition-all duration-150">
                <Link to="/#loans-section">Consumer Loan</Link>
              </li>
              <li className="font-body-md text-body-md text-on-tertiary-container hover:text-on-tertiary hover:translate-x-1 transition-all duration-150">
                <Link to="/#loans-section">Home Loan & LAP</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-title-md text-title-md font-bold text-on-tertiary">Quick Links</h4>
            <ul className="flex flex-col gap-space-xs">
              <li className="font-body-md text-body-md text-on-tertiary-container hover:text-on-tertiary hover:translate-x-1 transition-all duration-150 flex items-center gap-space-2xs">
                <Link to="/subscribe">Financial Assistance</Link>
                <span className="px-1.5 py-0.5 text-[10px] rounded bg-secondary-fixed text-on-secondary-fixed font-bold leading-none uppercase animate-pulse">
                  HOT
                </span>
              </li>
              <li className="font-body-md text-body-md text-on-tertiary-container hover:text-on-tertiary hover:translate-x-1 transition-all duration-150">
                <Link to="/about">About Credvia</Link>
              </li>
              <li className="font-body-md text-body-md text-on-tertiary-container hover:text-on-tertiary hover:translate-x-1 transition-all duration-150">
                <Link to="/contact">Contact Us</Link>
              </li>
              <li className="font-body-md text-body-md text-on-tertiary-container hover:text-on-tertiary hover:translate-x-1 transition-all duration-150">
                <Link to="#">Grievance Redressal</Link>
              </li>
              <li className="font-body-md text-body-md text-on-tertiary-container hover:text-on-tertiary hover:translate-x-1 transition-all duration-150">
                <Link to="#">Fair Practice Code</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Registered Office Address */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-title-md text-title-md font-bold text-on-tertiary">Contact & Address</h4>
            <div className="flex flex-col gap-space-xs text-on-tertiary-container font-body-md text-body-md">
              <div className="flex items-start gap-space-xs group">
                <span className="material-symbols-outlined text-secondary-fixed text-base mt-1 shrink-0 group-hover:scale-110 transition-transform">
                  call
                </span>
                <div>
                  <span className="block font-label-sm text-label-sm text-tertiary-fixed-dim">Toll Free Support</span>
                  <a className="text-on-tertiary font-bold hover:underline" href="tel:+918340421940">
                    +91 83404 21940
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-space-xs group">
                <span className="material-symbols-outlined text-secondary-fixed text-base mt-1 shrink-0 group-hover:scale-110 transition-transform">
                  mail
                </span>
                <div>
                  <span className="block font-label-sm text-label-sm text-tertiary-fixed-dim">Customer Support</span>
                  <a className="text-on-tertiary hover:underline break-all" href="mailto:support@credviafinancial.com">
                    support@credviafinancial.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-space-xs group mt-1">
                <span className="material-symbols-outlined text-secondary-fixed text-base mt-1 shrink-0 group-hover:scale-110 transition-transform">
                  location_on
                </span>
                <div>
                  <span className="block font-label-sm text-label-sm text-tertiary-fixed-dim font-semibold">Registered Office Address</span>
                  <p className="text-xs text-on-tertiary leading-relaxed mt-0.5">
                    <strong className="text-white block">CREDVIA FINANCIAL SERVICES</strong>
                    Building No./Flat No.: G/A-1<br/>
                    Dwarika Bhawan, Babu Raj Kumar Shriwastav Marg<br/>
                    Aliganj, Lucknow, Uttar Pradesh - 226024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-space-lg flex flex-col lg:flex-row items-center justify-between gap-space-md text-on-tertiary-container font-body-sm text-body-sm">
          <div className="flex flex-col gap-1 text-center lg:text-left">
            <span>© {new Date().getFullYear()} CREDVIA FINANCIAL SERVICES. All rights reserved.</span>
            <span className="font-label-sm text-xs text-tertiary-fixed-dim">
              Registered Office: G/A-1, Dwarika Bhawan, Babu Raj Kumar Shriwastav Marg, Aliganj, Lucknow, UP 226024 | GSTIN: 09DPOPA9703N1ZA
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-space-md font-label-sm text-label-sm">
            <Link to="#" className="hover:text-on-tertiary hover:underline transition-colors">
              Privacy Policy
            </Link>
            <span className="text-tertiary-container">•</span>
            <Link to="#" className="hover:text-on-tertiary hover:underline transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-tertiary-container">•</span>
            <Link to="#" className="hover:text-on-tertiary hover:underline transition-colors">
              Statutory Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
