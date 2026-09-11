import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import hero1 from '../assets/Hero1 (1).webp';
import hero2 from '../assets/Hero1 (2).webp';
import hero3 from '../assets/Hero1 (3).webp';
import hero4 from '../assets/Hero1 (4).webp';
import bannerDesktop from '../assets/banner_desktop.png';
import mobileBanner1 from '../assets/mobile_banner (1).webp';
import mobileBanner2 from '../assets/mobile_banner (2).webp';
import mobileBanner4 from '../assets/mobile_banner (4).webp';
import mobileBanner5 from '../assets/mobile_banner (5).webp';
import contactImg from '../assets/contact.png';
import logoBirla   from '../assets/aditya birla.png';
import logoHdb     from '../assets/HBD.webp';
import logoMuthoot from '../assets/muthoot finance.png';
import logoTata    from '../assets/tata.png';
import logoMahindra from '../assets/mahindra finance.png';
import logoBajaj   from '../assets/bajaj finance.png';
import logoIndus   from '../assets/bank logo (1).webp';
import logoBank1s  from '../assets/kotak.svg';
import logoBank2   from '../assets/bank logo (2).svg';
import logoBank3   from '../assets/bank logo (3).svg';
import logoPoonawalla from '../assets/POONAWALLA.NS_BIG.png';
import logoLTFinance from '../assets/l & T finance.png';
import logoIcici from '../assets/icici bank.png';
import logoHeroFincorp from '../assets/hero-fincorp.png';
import logoChola from '../assets/Chola Logo Unit - Black.jpg';
import logoAxisFinance from '../assets/Axis Finance bank.webp';
import logoAxisBank from '../assets/axis bank.png';

const bankPartners = [
  { code: 'BIRLA',   name: 'Aditya Birla',         logo: logoBirla,   dark: false },
  { code: 'HDB',     name: 'HDB Financial',         logo: logoHdb,     dark: false },
  { code: 'MUTHOOT', name: 'Muthoot Finance',       logo: logoMuthoot, dark: false },
  { code: 'TATA',    name: 'Tata Capital',          logo: logoTata,    dark: false },
  { code: 'MAHINDRA', name: 'Mahindra Finance',     logo: logoMahindra, dark: false },
  { code: 'BAJAJ',   name: 'Bajaj Finance',         logo: logoBajaj,   dark: false },
  { code: 'KOTAK',   name: 'Kotak Mahindra Bank',   logo: logoBank1s,  dark: false },
  { code: 'YES',     name: 'YES Bank',              logo: logoBank2,   dark: false },
  { code: 'IDFC',    name: 'IDFC FIRST Bank',       logo: logoBank3,   dark: false },
  { code: 'INDUS',   name: 'IndusInd Bank',         logo: logoIndus,   dark: false },
  { code: 'POONAWALLA', name: 'Poonawalla Fincorp', logo: logoPoonawalla, dark: false },
  { code: 'LT',      name: 'L&T Finance',           logo: logoLTFinance, dark: false },
  { code: 'ICICI',   name: 'ICICI Bank',            logo: logoIcici,   dark: false },
  { code: 'HERO',    name: 'Hero Fincorp',          logo: logoHeroFincorp, dark: false },
  { code: 'CHOLA',   name: 'Chola Finance',         logo: logoChola,   dark: false },
  { code: 'AXIS_FINANCE', name: 'Axis Finance',      logo: logoAxisFinance, dark: false },
  { code: 'AXIS',    name: 'Axis Bank',             logo: logoAxisBank, dark: false },
];

const heroSlides = [
  {
    id: 1,
    title: 'Instant Personal Loans',
    subtitle: 'Quick approvals & minimal documentation designed around your life goals.',
    desktopImg: bannerDesktop,
    mobileImg: mobileBanner2,
    link: '/subscribe',
    btnText: 'Apply Now',
  },
  {
    id: 2,
    title: 'Business & MSME Capital',
    subtitle: 'Collateral-free working capital credit up to ₹50 Lakhs.',
    desktopImg: hero2,
    mobileImg: mobileBanner5,
    link: '#loans-section',
    btnText: 'Explore Business Loans',
  },
  {
    id: 3,
    title: 'Credvia Financial Advisory',
    subtitle: 'Professional credit assistance & 1-on-1 expert guidance.',
    desktopImg: hero3,
    mobileImg: mobileBanner1,
    link: '/subscribe',
    btnText: 'Get Financial Care',
  },
  {
    id: 4,
    title: 'Home & LAP Solutions',
    subtitle: 'Long-tenure, large-ticket financing at competitive interest rates.',
    desktopImg: hero4,
    mobileImg: mobileBanner4,
    link: '#loans-section',
    btnText: 'Know More',
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const carouselRef = React.useRef(null);
  const TOTAL_LOAN_CARDS = 8;

  const renderPartnerLogo = (partner) => (
    <div
      key={partner.code}
      className="partner-logo-cell flex items-center justify-center px-8 py-5 cursor-pointer"
    >
      {partner.logo ? (
        partner.dark ? (
          <div className="bg-[#1a1a2e] rounded-xl px-4 py-2">
            <img src={partner.logo} alt={partner.name} className="max-h-12 max-w-[180px] w-auto object-contain" />
          </div>
        ) : (
          <div className={partner.code === 'KOTAK' ? 'bg-white rounded-xl px-4 py-2 shadow-sm border border-surface-container' : ''}>
            <img
              src={partner.logo}
              alt={partner.name}
              className={partner.code === 'AXIS' ? 'h-16 max-w-[220px] w-auto object-contain scale-125' : 'h-12 max-w-[180px] w-auto object-contain'}
            />
          </div>
        )
      ) : (
        <span className="font-title-sm text-title-sm font-extrabold text-on-surface-variant group-hover:text-primary transition-colors tracking-wide select-none whitespace-nowrap">
          {partner.name}
        </span>
      )}
    </div>
  );

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const nextSlide = (e) => {
    if (e) e.preventDefault();
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = (e) => {
    if (e) e.preventDefault();
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const statElements = document.querySelectorAll('.stat-counter');
    let animated = false;

    const animateCounters = () => {
      if (animated) return;
      animated = true;

      statElements.forEach((el) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1600;
        const startTime = performance.now();

        const formatNumber = (val) => {
          if (val >= 1000) return val.toLocaleString('en-IN');
          return val.toFixed(0);
        };

        const updateCount = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easeOutQuad = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.round(easeOutQuad * target);
          el.textContent = `${prefix}${formatNumber(currentVal)}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = `${prefix}${formatNumber(target)}${suffix}`;
          }
        };

        requestAnimationFrame(updateCount);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
          }
        });
      },
      { threshold: 0.35 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      if (statsSection) observer.unobserve(statsSection);
    };
  }, []);

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* SECTION 1: HERO SLIDER CAROUSEL (TATA CAPITAL STYLE) */}
      <section className="relative overflow-hidden bg-surface pt-1 pb-0 md:py-6">
        <div className="max-w-container-max mx-auto px-gutter-mobile md:px-gutter-desktop">
          <div
            className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl group bg-surface-container-low"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Banner Slider Aspect Frame */}
            <div className="relative w-full aspect-[1/2] sm:aspect-auto sm:h-[400px] md:h-[480px] lg:h-[520px]">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                    index === currentSlide
                      ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                      : 'opacity-0 scale-95 z-0 pointer-events-none'
                  }`}
                >
                  <Link to={slide.link} className="block w-full h-full relative group/slide">
                    <picture className="w-full h-full block">
                      {slide.mobileImg && (
                        <source media="(max-width: 767px)" srcSet={slide.mobileImg} />
                      )}
                      <img
                        src={slide.desktopImg}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/slide:scale-105"
                      />
                    </picture>


                  </Link>
                </div>
              ))}
            </div>

            {/* Left & Right Arrow Navigation Controls */}
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 shadow-lg"
            >
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 shadow-lg"
            >
              <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </button>

            {/* Bottom Left Navigation Dots & T&C Disclaimer (Tata Capital Style) */}
            <div className="absolute bottom-4 left-6 md:left-10 z-20 flex items-center gap-4">
              <div className="flex items-center gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-8 bg-secondary-fixed shadow-md'
                        : 'w-2.5 bg-white/50 hover:bg-white/90'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-white/80 font-label-sm hidden sm:inline drop-shadow">
                *Terms &amp; Conditions Apply
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY CHOOSE CREDVIA */}
      <section className="py-space-3xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="flex flex-col items-center text-center mb-space-2xl">
            <span className="px-space-md py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-widest font-extrabold mb-space-xs">
              The Credvia Advantage
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Why Indian Borrowers Trust Credvia Financial Services
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-space-2xs">
              Built from the ground up to replace outdated banking bureaucracy with rapid digital convenience, complete transparency, and human empathy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-md">
            {/* Card 1 */}
            <div className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-secondary-fixed transition-all duration-300 group cursor-default">
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary mb-space-md group-hover:bg-secondary-fixed group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl transition-transform duration-300">speed</span>
                </div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface mb-space-xs group-hover:text-primary transition-colors">
                  Quick &amp; Simple
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Seamless paperless digital onboarding with instant digital eligibility and 10-minute automated approval checks.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs flex items-center gap-space-2xs text-primary font-label-sm text-label-sm font-bold">
                <span>Instant Digital KYC</span>
                <span className="material-symbols-outlined text-xs transition-transform duration-200 group-hover:translate-x-1.5">
                  arrow_forward
                </span>
              </div>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-secondary-fixed transition-all duration-300 group cursor-default">
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary mb-space-md group-hover:bg-secondary-fixed group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl transition-transform duration-300">visibility</span>
                </div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface mb-space-xs group-hover:text-primary transition-colors">
                  Transparent Terms
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Zero hidden administrative charges, upfront annualized percentage rate (APR) calculations, and honest fee breakdowns.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs flex items-center gap-space-2xs text-primary font-label-sm text-label-sm font-bold">
                <span>Zero Hidden Costs</span>
                <span className="material-symbols-outlined text-xs transition-transform duration-200 group-hover:translate-x-1.5">
                  arrow_forward
                </span>
              </div>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-secondary-fixed transition-all duration-300 group cursor-default">
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary mb-space-md group-hover:bg-secondary-fixed group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl transition-transform duration-300">tune</span>
                </div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface mb-space-xs group-hover:text-primary transition-colors">
                  Flexible Solutions
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Tailored repayment tenures from 12 to 84 months with penalty-free part-prepayment opportunities.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs flex items-center gap-space-2xs text-primary font-label-sm text-label-sm font-bold">
                <span>Adaptive Tenures</span>
                <span className="material-symbols-outlined text-xs transition-transform duration-200 group-hover:translate-x-1.5">
                  arrow_forward
                </span>
              </div>
            </div>
            {/* Card 4 */}
            <div className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-secondary-fixed transition-all duration-300 group cursor-default">
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary mb-space-md group-hover:bg-secondary-fixed group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl transition-transform duration-300">support_agent</span>
                </div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface mb-space-xs group-hover:text-primary transition-colors">
                  Trusted Support
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Dedicated loan officers and responsive customer support teams providing hand-held guidance at each milestone.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs flex items-center gap-space-2xs text-primary font-label-sm text-label-sm font-bold">
                <span>Dedicated Advisor</span>
                <span className="material-symbols-outlined text-xs transition-transform duration-200 group-hover:translate-x-1.5">
                  arrow_forward
                </span>
              </div>
            </div>
            {/* Card 5 */}
            <div className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-secondary-fixed transition-all duration-300 group cursor-default">
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary mb-space-md group-hover:bg-secondary-fixed group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl transition-transform duration-300">volunteer_activism</span>
                </div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface mb-space-xs group-hover:text-primary transition-colors">
                  Customer First
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Convenient customizable EMI dates, restructuring assistance in distress, and fair grievance redressal.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs flex items-center gap-space-2xs text-primary font-label-sm text-label-sm font-bold">
                <span>Proactive Care</span>
                <span className="material-symbols-outlined text-xs transition-transform duration-200 group-hover:translate-x-1.5">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR PARTNERS (LOGO GRID) */}
      <section className="py-space-2xl bg-surface-container-lowest border-y border-surface-container/60">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="text-center mb-space-xl">
            <span className="px-space-md py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-widest font-extrabold mb-space-2xs inline-block">
              Trusted Alliances
            </span>
            <h2 className="font-title-lg text-title-lg md:text-headline-sm text-on-surface font-bold tracking-tight mt-space-2xs">
              Our Banking &amp; Financial Partners
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Partnered with leading Indian banks &amp; financial institutions for quick approvals and best interest rates.
            </p>
          </div>

          {/* Desktop logo marquee — text is used only when a partner has no image asset. */}
          <div className="hidden md:flex partner-marquee-viewport flex-col gap-2">
            <div className="partner-marquee-track partner-marquee-track-left">
              {[...bankPartners.slice(0, 6), ...bankPartners.slice(0, 6)].map(renderPartnerLogo)}
            </div>
            <div className="partner-marquee-track partner-marquee-track-right">
              {[...bankPartners.slice(6, 12), ...bankPartners.slice(6, 12)].map(renderPartnerLogo)}
            </div>
            <div className="partner-marquee-track partner-marquee-track-left">
              {[...bankPartners.slice(12), ...bankPartners.slice(12)].map(renderPartnerLogo)}
            </div>
          </div>

          <div className="md:hidden partner-marquee-viewport flex flex-col gap-2">
            <div className="partner-marquee-track partner-marquee-track-left">
              {[...bankPartners.slice(0, 6), ...bankPartners.slice(0, 6)].map(renderPartnerLogo)}
            </div>
            <div className="partner-marquee-track partner-marquee-track-right">
              {[...bankPartners.slice(6, 12), ...bankPartners.slice(6, 12)].map(renderPartnerLogo)}
            </div>
            <div className="partner-marquee-track partner-marquee-track-left">
              {[...bankPartners.slice(12), ...bankPartners.slice(12)].map(renderPartnerLogo)}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR LOAN SOLUTIONS */}
      <section className="py-space-3xl bg-surface" id="loans-section">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md items-start text-left">
            <div className="flex flex-col items-start text-left max-w-2xl">
              <span className="px-space-md py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-widest font-extrabold mb-space-xs inline-block text-left">
                Tailored Capital
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight text-left">
                Explore Our Loan Solutions
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs text-left">
                Financing crafted for every stage of your life, enterprise growth, and ambitious personal milestones.
              </p>
            </div>
            <div className="flex items-center gap-space-xs shrink-0 self-start md:self-auto">
              <Link
                to="/subscribe"
                className="px-space-md py-space-xs rounded-full bg-surface-container text-primary font-label-md text-label-md font-semibold hover:bg-surface-container-high active:scale-95 transition-all"
              >
                All Products
              </Link>
              <a
                href="#assistance-section"
                className="px-space-md py-space-xs rounded-full bg-surface text-on-surface-variant font-label-md text-label-md font-semibold hover:bg-surface-container active:scale-95 transition-all border border-surface-container/60"
              >
                Calculate EMI
              </a>
            </div>
          </div>
          {/* Horizontal scroll carousel — single row, 8 cards */}
          <div className="relative">
            {/* Right fade only — no left fade so first card isn't clipped */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-8 w-16 bg-gradient-to-l from-surface to-transparent z-10"></div>

            <div
              ref={carouselRef}
              className="loans-carousel flex gap-space-lg overflow-x-auto pb-4 pt-3 scroll-smooth snap-x snap-mandatory px-px"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onScroll={() => {
                const el = carouselRef.current;
                if (!el) return;
                const cardWidth = el.scrollWidth / TOTAL_LOAN_CARDS;
                setActiveCard(Math.round(el.scrollLeft / cardWidth));
              }}
            >
              {/* Personal Loan Card */}
              <div className="flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-primary/20 transition-all duration-300 relative overflow-hidden group shrink-0 w-72 snap-start">
                <div className="absolute top-0 right-0 w-24 h-24 bg-surface-container rounded-bl-full -z-0 group-hover:scale-125 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="px-space-sm py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-extrabold uppercase tracking-wide group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      From 10.49% p.a.
                    </span>
                    <span className="material-symbols-outlined text-primary text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      person
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-2xs group-hover:text-primary transition-colors">
                    Personal Loan
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                    Instant unsecured funds up to ₹25 Lakhs for weddings, emergency medical care, travel, or consolidation.
                  </p>
                  <div className="space-y-space-xs mb-space-xl">
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Tenures up to 5 Years</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-75">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Zero collateral requirement</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-150">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Same-day account credit</span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 pt-space-md">
                  <Link
                    to="/subscribe"
                    className="w-full py-space-sm rounded-xl bg-surface-container-low text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-space-2xs hover:bg-primary hover:text-on-primary active:scale-95 transition-all duration-200 group/btn"
                  >
                    <span>Apply Now</span>
                    <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover/btn:translate-x-1.5">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>

              {/* Business Loan Card */}
              <div className="flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-primary/20 transition-all duration-300 relative overflow-hidden group shrink-0 w-72 snap-start">
                <div className="absolute top-0 right-0 w-24 h-24 bg-surface-container rounded-bl-full -z-0 group-hover:scale-125 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="px-space-sm py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-extrabold uppercase tracking-wide group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      From 12.99% p.a.
                    </span>
                    <span className="material-symbols-outlined text-primary text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      storefront
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-2xs group-hover:text-primary transition-colors">
                    Business Loan
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                    Collateral-free working capital and growth credit up to ₹50 Lakhs for MSMEs, inventory, and scale.
                  </p>
                  <div className="space-y-space-xs mb-space-xl">
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Up to ₹50 Lakhs limit</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-75">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Flexible cash flow EMIs</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-150">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Minimal GST &amp; ITR filing</span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 pt-space-md">
                  <Link
                    to="/subscribe"
                    className="w-full py-space-sm rounded-xl bg-surface-container-low text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-space-2xs hover:bg-primary hover:text-on-primary active:scale-95 transition-all duration-200 group/btn"
                  >
                    <span>Apply Now</span>
                    <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover/btn:translate-x-1.5">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>

              {/* Auto Loan Card */}
              <div className="flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-secondary-fixed transition-all duration-300 relative overflow-hidden group shrink-0 w-72 snap-start">
                <div className="absolute top-0 right-0 w-24 h-24 bg-surface-container rounded-bl-full -z-0 group-hover:scale-125 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-extrabold uppercase tracking-wide group-hover:bg-secondary group-hover:text-white transition-colors">
                      UP TO 90% FINANCE
                    </span>
                    <span className="material-symbols-outlined text-primary text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      directions_car
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-2xs group-hover:text-primary transition-colors">
                    Auto Loan
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                    Drive your dream car home with hassle-free financing and easy EMI options.
                  </p>
                  <div className="space-y-space-xs mb-space-xl">
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Finance up to 90% of car value</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-75">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>All makes &amp; models covered</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-150">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Quick approval within 24 hours</span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 pt-space-md">
                  <Link
                    to="/subscribe"
                    className="w-full py-space-sm rounded-xl bg-surface-container-low text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-space-2xs hover:bg-primary hover:text-on-primary active:scale-95 transition-all duration-200 group/btn"
                  >
                    <span>Apply Now</span>
                    <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover/btn:translate-x-1.5">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>

              {/* Home & LAP Card */}
              <div className="flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-primary/20 transition-all duration-300 relative overflow-hidden group shrink-0 w-72 snap-start">
                <div className="absolute top-0 right-0 w-24 h-24 bg-surface-container rounded-bl-full -z-0 group-hover:scale-125 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="px-space-sm py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-extrabold uppercase tracking-wide group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      Up to ₹5 Crores
                    </span>
                    <span className="material-symbols-outlined text-primary text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      real_estate_agent
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-2xs group-hover:text-primary transition-colors">
                    Home
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                    Long-tenure, large-ticket financing secured against residential or commercial properties for landmark projects.
                  </p>
                  <div className="space-y-space-xs mb-space-xl">
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Tenures extended to 15 Years</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-75">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Lowest interest brackets</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-150">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Doorstep legal verification</span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 pt-space-md">
                  <Link
                    to="/subscribe"
                    className="w-full py-space-sm rounded-xl bg-surface-container-low text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-space-2xs hover:bg-primary hover:text-on-primary active:scale-95 transition-all duration-200 group/btn"
                  >
                    <span>Apply Now</span>
                    <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover/btn:translate-x-1.5">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>

              {/* Loan Against Property Card */}
              <div className="flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-primary/20 transition-all duration-300 relative overflow-hidden group shrink-0 w-72 snap-start">
                <div className="absolute top-0 right-0 w-24 h-24 bg-surface-container rounded-bl-full -z-0 group-hover:scale-125 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="px-space-sm py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-extrabold uppercase tracking-wide group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      Up to ₹10 Crores
                    </span>
                    <span className="material-symbols-outlined text-primary text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      domain
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-2xs group-hover:text-primary transition-colors">
                    Loan Against Property
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                    Leverage the equity in your property to unlock large-ticket funds at competitive interest rates.
                  </p>
                  <div className="space-y-space-xs mb-space-xl">
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Avail loan up to ₹10 Crores</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-75">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Residential &amp; commercial property</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-150">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Flexible repayment up to 20 Years</span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 pt-space-md">
                  <Link
                    to="/subscribe"
                    className="w-full py-space-sm rounded-xl bg-surface-container-low text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-space-2xs hover:bg-primary hover:text-on-primary active:scale-95 transition-all duration-200 group/btn"
                  >
                    <span>Apply Now</span>
                    <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover/btn:translate-x-1.5">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>

              {/* Used Car Loan Card */}
              <div className="flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-primary/20 transition-all duration-300 relative overflow-hidden group shrink-0 w-72 snap-start">
                <div className="absolute top-0 right-0 w-24 h-24 bg-surface-container rounded-bl-full -z-0 group-hover:scale-125 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="px-space-sm py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-extrabold uppercase tracking-wide group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      Up to 90% Finance
                    </span>
                    <span className="material-symbols-outlined text-primary text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      directions_car
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-2xs group-hover:text-primary transition-colors">
                    Used Car Loan
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                    Get up to 90% of your car value and book your dream car with easy EMI options.
                  </p>
                  <div className="space-y-space-xs mb-space-xl">
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Finance up to 90% of car value</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-75">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>All makes &amp; models covered</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-150">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Quick approval within 24 hours</span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 pt-space-md">
                  <Link
                    to="/subscribe"
                    className="w-full py-space-sm rounded-xl bg-surface-container-low text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-space-2xs hover:bg-primary hover:text-on-primary active:scale-95 transition-all duration-200 group/btn"
                  >
                    <span>Apply Now</span>
                    <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover/btn:translate-x-1.5">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>

              {/* Two Wheeler Loan Card */}
              <div className="flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-primary/20 transition-all duration-300 relative overflow-hidden group shrink-0 w-72 snap-start">
                <div className="absolute top-0 right-0 w-24 h-24 bg-surface-container rounded-bl-full -z-0 group-hover:scale-125 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="px-space-sm py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-extrabold uppercase tracking-wide group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      From 8.99% p.a.
                    </span>
                    <span className="material-symbols-outlined text-primary text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      two_wheeler
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-2xs group-hover:text-primary transition-colors">
                    Two Wheeler Loan
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                    Ride the bike of your dreams with ease — fast approvals and minimal documentation required.
                  </p>
                  <div className="space-y-space-xs mb-space-xl">
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Finance up to 100% on-road price</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-75">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Tenure up to 84 months</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-150">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Instant dealer disbursement</span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 pt-space-md">
                  <Link
                    to="/subscribe"
                    className="w-full py-space-sm rounded-xl bg-surface-container-low text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-space-2xs hover:bg-primary hover:text-on-primary active:scale-95 transition-all duration-200 group/btn"
                  >
                    <span>Apply Now</span>
                    <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover/btn:translate-x-1.5">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>

              {/* Flexi Loan Card */}
              <div className="flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-secondary-fixed transition-all duration-300 relative overflow-hidden group shrink-0 w-72 snap-start">
                <div className="absolute top-0 right-0 w-24 h-24 bg-surface-container rounded-bl-full -z-0 group-hover:scale-125 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-extrabold uppercase tracking-wide group-hover:bg-secondary group-hover:text-white transition-colors">
                      ROI: 11.75% p.a.
                    </span>
                    <span className="material-symbols-outlined text-primary text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      account_balance_wallet
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-2xs group-hover:text-primary transition-colors">
                    Flexi Loan
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                    Flexible credit with convenient withdrawals and repayments for your financial needs.
                  </p>
                  <div className="space-y-space-xs mb-space-xl">
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Tenure up to 9 Years</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-75">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>OD / Overdraft facility</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-150">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Hybrid Flexi repayments</span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 pt-space-md">
                  <Link
                    to="/subscribe"
                    className="w-full py-space-sm rounded-xl bg-surface-container-low text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-space-2xs hover:bg-primary hover:text-on-primary active:scale-95 transition-all duration-200 group/btn"
                  >
                    <span>Apply Now</span>
                    <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover/btn:translate-x-1.5">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>

              {/* Loan Against Security Card */}
              <div className="flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-primary/20 transition-all duration-300 relative overflow-hidden group shrink-0 w-72 snap-start">
                <div className="absolute top-0 right-0 w-24 h-24 bg-surface-container rounded-bl-full -z-0 group-hover:scale-125 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="px-space-sm py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-extrabold uppercase tracking-wide group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      Up to ₹60 Crores
                    </span>
                    <span className="material-symbols-outlined text-primary text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      savings
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-2xs group-hover:text-primary transition-colors">
                    Loan Against Security
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                    Avail loan up to ₹60 crores by pledging your stocks, mutual funds, or bonds as collateral.
                  </p>
                  <div className="space-y-space-xs mb-space-xl">
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Pledge stocks, MFs &amp; bonds</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-75">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Overdraft facility available</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface group-hover:translate-x-1 transition-transform duration-200 delay-150">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>Interest only on amount used</span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 pt-space-md">
                  <Link
                    to="/subscribe"
                    className="w-full py-space-sm rounded-xl bg-surface-container-low text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-space-2xs hover:bg-primary hover:text-on-primary active:scale-95 transition-all duration-200 group/btn"
                  >
                    <span>Apply Now</span>
                    <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover/btn:translate-x-1.5">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {Array.from({ length: TOTAL_LOAN_CARDS }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to card ${i + 1}`}
                  onClick={() => {
                    const el = carouselRef.current;
                    if (!el) return;
                    const cardWidth = el.scrollWidth / TOTAL_LOAN_CARDS;
                    el.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
                    setActiveCard(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeCard
                      ? 'w-6 h-2.5 bg-primary'
                      : 'w-2.5 h-2.5 bg-surface-container-high hover:bg-primary/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SIGNATURE PRODUCT — ₹699 FINANCIAL ASSISTANCE (CREDVIA CARE) */}
      <section className="py-space-3xl bg-surface-container-low relative" id="assistance-section">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="banner-shimmer relative rounded-3xl bg-gradient-to-br from-primary via-primary-container to-tertiary text-on-primary overflow-hidden shadow-2xl p-space-xl lg:p-space-3xl border border-primary-fixed/20 hover:border-secondary-fixed/40 transition-colors duration-500">
            {/* Background Ambient Geometry */}
            <div
              className="absolute -right-20 -top-20 w-96 h-96 bg-secondary-fixed/10 rounded-full blur-3xl pointer-events-none animate-pulse"
              style={{ animationDuration: '6s' }}
            ></div>
            <div
              className="absolute left-10 -bottom-20 w-80 h-80 bg-primary-fixed/10 rounded-full blur-2xl pointer-events-none animate-pulse"
              style={{ animationDuration: '5s' }}
            ></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
              {/* Left side: Value proposition */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex items-center gap-space-xs mb-space-md">
                  <span className="px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-extrabold uppercase tracking-wider shadow-sm transition-transform hover:scale-105">
                    Most Popular Consultation
                  </span>
                  <span className="text-secondary-fixed flex items-center animate-pulse">
                    <span className="material-symbols-outlined text-base">verified</span>
                  </span>
                </div>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-primary tracking-tight mb-space-xs">
                  Credvia Care – Complete Financial Assistance at Just ₹699
                </h2>
                <p className="font-body-md text-body-md text-on-primary-container mb-space-xl leading-relaxed">
                  Get comprehensive professional guidance to understand, evaluate, and optimize your credit profile. Avoid unnecessary rejections and navigate India's formal lending ecosystem with total confidence.
                </p>
                {/* Feature Checkmarks Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mb-space-xl">
                  <div className="flex items-start gap-space-xs p-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 group cursor-default">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-200">
                      check_circle
                    </span>
                    <span className="font-body-sm text-body-sm text-on-primary group-hover:text-secondary-fixed transition-colors">
                      Credit &amp; CIBIL profile diagnostic guidance
                    </span>
                  </div>
                  <div className="flex items-start gap-space-xs p-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 group cursor-default">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-200">
                      check_circle
                    </span>
                    <span className="font-body-sm text-body-sm text-on-primary group-hover:text-secondary-fixed transition-colors">
                      Credit score improvement roadmap
                    </span>
                  </div>
                  <div className="flex items-start gap-space-xs p-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 group cursor-default">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-200">
                      check_circle
                    </span>
                    <span className="font-body-sm text-body-sm text-on-primary group-hover:text-secondary-fixed transition-colors">
                      Loan eligibility &amp; borrowing capacity check
                    </span>
                  </div>
                  <div className="flex items-start gap-space-xs p-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 group cursor-default">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-200">
                      check_circle
                    </span>
                    <span className="font-body-sm text-body-sm text-on-primary group-hover:text-secondary-fixed transition-colors">
                      End-to-end loan application guidance
                    </span>
                  </div>
                  <div className="flex items-start gap-space-xs p-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 group cursor-default">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-200">
                      check_circle
                    </span>
                    <span className="font-body-sm text-body-sm text-on-primary group-hover:text-secondary-fixed transition-colors">
                      Complete documentation check &amp; verification
                    </span>
                  </div>
                  <div className="flex items-start gap-space-xs p-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 group cursor-default">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-200">
                      check_circle
                    </span>
                    <span className="font-body-sm text-body-sm text-on-primary group-hover:text-secondary-fixed transition-colors">
                      1-on-1 personal financial advisor session
                    </span>
                  </div>
                  <div className="flex items-start gap-space-xs sm:col-span-2 p-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 group cursor-default">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-200">
                      check_circle
                    </span>
                    <span className="font-body-sm text-body-sm text-on-primary group-hover:text-secondary-fixed transition-colors">
                      Curated recommendations for competitive interest rate options
                    </span>
                  </div>
                </div>
                <p className="font-label-sm text-label-sm text-on-primary-container italic">
                  *Note: Nominal service fees apply for consultation. Loan approval remains subject to individual lender underwriting norms and formal verification.
                </p>
              </div>
              {/* Right side: Offer Box */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-md bg-surface-container-lowest text-on-surface rounded-2xl p-space-xl shadow-2xl flex flex-col items-center text-center relative hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 transition-all duration-300">
                  <div className="absolute -top-3.5 bg-secondary-fixed text-on-secondary-fixed px-space-md py-1 rounded-full font-label-sm text-label-sm font-extrabold uppercase tracking-wide shadow-md animate-pulse">
                    Limited Time Fee Reduction
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-space-xs">
                    One-Time Onboarding Package
                  </span>
                  <div className="flex items-baseline gap-space-xs my-space-md">
                    <span className="font-metric-display text-metric-display font-extrabold text-primary">₹699</span>
                    <span className="font-body-md text-body-md text-outline line-through">₹2,499</span>
                    <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm font-bold">
                      72% OFF
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                    Includes full financial report audit, dedicated counselor assignment, and priority lender submission file.
                  </p>
                  <Link
                    to="/subscribe"
                    className="w-full py-space-sm rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-lg text-label-lg font-bold hover:bg-secondary-fixed-dim hover:scale-[1.03] active:scale-95 transition-all duration-200 shadow-[0_4px_14px_rgba(190,245,60,0.45)] mb-space-md animate-glow-button flex items-center justify-center gap-2"
                  >
                    <span>Get Started for ₹699</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                  <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-secondary text-sm">lock</span>
                    <span>100% Encrypted &amp; Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section className="py-space-3xl bg-surface">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="flex flex-col items-center text-center mb-space-2xl">
            <span className="px-space-md py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-widest font-extrabold mb-space-xs">
              Zero Complications
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Simple 4-Step Path to Financial Freedom
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-space-2xs">
              Experience a structured, prompt loan lifecycle engineered to eliminate branch visits and physical paperwork.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg relative">
            {/* Step 1 */}
            <div className="flex flex-col bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-surface-variant transition-all duration-300 relative group cursor-default">
              <div className="flex items-center justify-between mb-space-lg">
                <span className="font-metric-display text-metric-display font-black text-surface-variant group-hover:text-primary transition-colors duration-300 leading-none group-hover:scale-110 origin-left">
                  01
                </span>
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:scale-110">
                    touch_app
                  </span>
                </div>
              </div>
              <h3 className="font-title-md text-title-md font-bold text-on-surface mb-space-2xs group-hover:text-primary transition-colors">
                Apply Online
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Fill out a quick 2-minute digital profile questionnaire with your personal and financial requirements.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-surface-variant transition-all duration-300 relative group cursor-default">
              <div className="flex items-center justify-between mb-space-lg">
                <span className="font-metric-display text-metric-display font-black text-surface-variant group-hover:text-primary transition-colors duration-300 leading-none group-hover:scale-110 origin-left">
                  02
                </span>
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:scale-110">
                    upload_file
                  </span>
                </div>
              </div>
              <h3 className="font-title-md text-title-md font-bold text-on-surface mb-space-2xs group-hover:text-primary transition-colors">
                Share Details
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Upload basic KYC identity documents and bank statements securely via DigiLocker or net banking.
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-surface-variant transition-all duration-300 relative group cursor-default">
              <div className="flex items-center justify-between mb-space-lg">
                <span className="font-metric-display text-metric-display font-black text-surface-variant group-hover:text-primary transition-colors duration-300 leading-none group-hover:scale-110 origin-left">
                  03
                </span>
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:scale-110">
                    support_agent
                  </span>
                </div>
              </div>
              <h3 className="font-title-md text-title-md font-bold text-on-surface mb-space-2xs group-hover:text-primary transition-colors">
                Get Expert Assistance
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Instant evaluation by our algorithm and a quick confirmation call from your dedicated loan officer.
              </p>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-secondary-fixed transition-all duration-300 relative group cursor-default">
              <div className="flex items-center justify-between mb-space-lg">
                <span className="font-metric-display text-metric-display font-black text-surface-variant group-hover:text-secondary-container transition-colors duration-300 leading-none group-hover:scale-110 origin-left">
                  04
                </span>
                <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:scale-110">
                    account_balance
                  </span>
                </div>
              </div>
              <h3 className="font-title-md text-title-md font-bold text-on-surface mb-space-2xs group-hover:text-primary transition-colors">
                Move Forward
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Accept clear digital loan terms and receive instant fund transfer directly into your registered bank account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: REACH US */}
      <section className="py-space-3xl bg-surface overflow-hidden">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-fixed/30 via-surface to-secondary-fixed/20 border border-surface-container/60 shadow-lg flex flex-col md:flex-row items-stretch min-h-[320px]">

            {/* Left — Person image */}
            <div className="md:w-5/12 shrink-0 relative flex items-end justify-center">
              <img
                src={contactImg}
                alt="Credvia support advisor"
                className="w-full h-full object-cover object-top max-h-[420px] md:max-h-none"
              />
              {/* subtle left-to-right fade so image bleeds into content */}
              <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-surface/80"></div>
            </div>

            {/* Right — Contact details */}
            <div className="flex-1 flex flex-col justify-center px-space-2xl py-space-2xl md:py-space-3xl gap-space-lg">
              <div>
                <span className="px-space-md py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-widest font-extrabold mb-space-sm inline-block">
                  Get In Touch
                </span>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight mt-space-xs">
                  Here's how to reach us
                </h2>
              </div>

              <div className="flex flex-col gap-space-md">
                {/* Email */}
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5 shrink-0">mail</span>
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">Email</p>
                    <a
                      href="mailto:support@credviafinancial.com"
                      className="font-body-md text-body-md text-primary hover:underline underline-offset-2 transition-colors"
                    >
                      support@credviafinancial.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5 shrink-0">call</span>
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">Phone</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      We are available on{' '}
                      <a href="tel:+918340421940" className="text-primary font-semibold hover:underline underline-offset-2">
                        +91 83404 21940
                      </a>
                    </p>
                  </div>
                </div>

                {/* Working hours */}
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5 shrink-0">schedule</span>
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">Working Hours</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">Mon – Sat, 9:00 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>

              {/* CTA button — QR will replace this later */}
              <div className="mt-space-xs">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-space-xs px-space-xl py-space-sm rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-lg text-label-lg font-bold hover:bg-secondary-fixed-dim hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_4px_14px_rgba(190,245,60,0.35)]"
                >
                  <span className="material-symbols-outlined text-base">waving_hand</span>
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TRUST, CREDIBILITY & STATS */}
      <section className="py-space-3xl bg-surface-container-low" id="stats-section">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="flex flex-col items-center text-center mb-space-2xl">
            <span className="px-space-md py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-widest font-extrabold mb-space-xs">
              Proven Impact
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Finance Made Simple. Support You Can Trust.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-space-2xs">
              Empowering dreams across 28 states and 350+ cities with ethical, transparent, and prompt financial backing.
            </p>
          </div>
          {/* Stat Cards Bento */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-2xl">
            <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group cursor-default">
              <span
                className="stat-counter font-metric-display text-metric-display font-extrabold text-primary mb-space-2xs group-hover:scale-110 transition-transform duration-300"
                data-prefix=""
                data-suffix="K+"
                data-target="10"
              >
                2 Lac+
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant">Customers Assisted</span>
            </div>
            <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group cursor-default">
              <span
                className="stat-counter font-metric-display text-metric-display font-extrabold text-primary mb-space-2xs group-hover:scale-110 transition-transform duration-300"
                data-prefix="₹"
                data-suffix=" Cr+"
                data-target="2500"
              >
                ₹2,500 Cr+
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant">Loans Facilitated</span>
            </div>
            <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group cursor-default">
              <span
                className="stat-counter font-metric-display text-metric-display font-extrabold text-primary mb-space-2xs group-hover:scale-110 transition-transform duration-300"
                data-prefix=""
                data-suffix="+"
                data-target="15"
              >
                15+
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant">Years Financial Expertise</span>
            </div>
            <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group cursor-default">
              <span
                className="stat-counter font-metric-display text-metric-display font-extrabold text-secondary mb-space-2xs group-hover:scale-110 transition-transform duration-300"
                data-prefix=""
                data-suffix="%"
                data-target="98"
              >
                98%
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant">Satisfaction Rate</span>
            </div>
          </div>

          {/* Testimonials — Infinite Auto-Sliding Marquee */}
          <div className="relative w-full overflow-hidden mb-space-2xl py-space-xs">
            {/* Side fades */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-r from-surface-container-low to-transparent z-10"></div>
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-l from-surface-container-low to-transparent z-10"></div>

            <div className="animate-infinite-marquee-slow flex items-stretch gap-space-lg">
              {[
                { initials: 'RK', bg: 'bg-primary-fixed', text: 'text-primary', name: 'Rajesh Kumar', role: 'Senior Tech Lead, Lucknow', quote: '"The ₹699 Credvia Care service completely cleared my doubts about credit score improvement. Within 3 weeks, my home loan process was smooth without a hitch."' },
                { initials: 'PS', bg: 'bg-secondary-fixed', text: 'text-on-secondary-fixed', name: 'Pooja Sharma', role: 'Retail Owner, Kanpur', quote: '"Running a business requires urgent liquidity. Credvia Financial Services assisted our MSME expansion loan in under 24 hours with zero unnecessary visits."' },
                { initials: 'VM', bg: 'bg-surface-container-high', text: 'text-primary', name: 'Vikram Mehta', role: 'Architect, Varanasi', quote: '"Complete transparency. No surprise processing deductions at disbursal, and their customer care team is polite, prompt, and knowledgeable."' },
                { initials: 'AP', bg: 'bg-primary-fixed', text: 'text-primary', name: 'Anita Patel', role: 'School Principal, Agra', quote: '"I was nervous about my first loan application. Credvia\'s advisor walked me through every step and I got approved within 2 days — truly hassle-free."' },
                { initials: 'SK', bg: 'bg-secondary-fixed', text: 'text-on-secondary-fixed', name: 'Suresh Khanna', role: 'Factory Owner, Meerut', quote: '"Got a ₹40 Lakh business loan with minimal documentation. The team was proactive, the rate was competitive, and disbursal happened faster than expected."' },
                { initials: 'NJ', bg: 'bg-surface-container-high', text: 'text-primary', name: 'Neha Joshi', role: 'Freelance Designer, Pune', quote: '"As a freelancer, banks always turned me down. Credvia understood my income pattern and got me a personal loan without ITR hassle. Highly recommend!"' },
                { initials: 'DV', bg: 'bg-primary-fixed', text: 'text-primary', name: 'Deepak Verma', role: 'Government Employee, Bhopal', quote: '"The two-wheeler loan process was incredibly smooth. Approved on the same day, bike financed 100% on-road price. No hidden charges at all."' },
              ].concat([
                { initials: 'RK', bg: 'bg-primary-fixed', text: 'text-primary', name: 'Rajesh Kumar', role: 'Senior Tech Lead, Lucknow', quote: '"The ₹699 Credvia Care service completely cleared my doubts about credit score improvement. Within 3 weeks, my home loan process was smooth without a hitch."' },
                { initials: 'PS', bg: 'bg-secondary-fixed', text: 'text-on-secondary-fixed', name: 'Pooja Sharma', role: 'Retail Owner, Kanpur', quote: '"Running a business requires urgent liquidity. Credvia Financial Services assisted our MSME expansion loan in under 24 hours with zero unnecessary visits."' },
                { initials: 'VM', bg: 'bg-surface-container-high', text: 'text-primary', name: 'Vikram Mehta', role: 'Architect, Varanasi', quote: '"Complete transparency. No surprise processing deductions at disbursal, and their customer care team is polite, prompt, and knowledgeable."' },
                { initials: 'AP', bg: 'bg-primary-fixed', text: 'text-primary', name: 'Anita Patel', role: 'School Principal, Agra', quote: '"I was nervous about my first loan application. Credvia\'s advisor walked me through every step and I got approved within 2 days — truly hassle-free."' },
                { initials: 'SK', bg: 'bg-secondary-fixed', text: 'text-on-secondary-fixed', name: 'Suresh Khanna', role: 'Factory Owner, Meerut', quote: '"Got a ₹40 Lakh business loan with minimal documentation. The team was proactive, the rate was competitive, and disbursal happened faster than expected."' },
                { initials: 'NJ', bg: 'bg-surface-container-high', text: 'text-primary', name: 'Neha Joshi', role: 'Freelance Designer, Pune', quote: '"As a freelancer, banks always turned me down. Credvia understood my income pattern and got me a personal loan without ITR hassle. Highly recommend!"' },
                { initials: 'DV', bg: 'bg-primary-fixed', text: 'text-primary', name: 'Deepak Verma', role: 'Government Employee, Bhopal', quote: '"The two-wheeler loan process was incredibly smooth. Approved on the same day, bike financed 100% on-road price. No hidden charges at all."' },
              ]).map((t, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm hover:shadow-xl border border-transparent hover:border-surface-variant transition-all duration-300 flex flex-col justify-between group cursor-default shrink-0 w-80"
                >
                  <div>
                    <div className="flex items-center text-secondary-fixed-variant mb-space-sm">
                      {[...Array(5)].map((_, s) => (
                        <span key={s} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                    <p className="font-body-md text-body-md text-on-surface italic mb-space-lg leading-relaxed">
                      {t.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-space-sm pt-space-sm border-t border-surface-container">
                    <div className={`w-10 h-10 rounded-full ${t.bg} flex items-center justify-center ${t.text} font-bold text-sm group-hover:rotate-12 transition-transform duration-300`}>
                      {t.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold text-on-surface">{t.name}</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Banner */}
          <div className="rounded-2xl bg-surface-container-lowest p-space-xl md:p-space-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-space-lg hover:shadow-xl transition-shadow duration-300 border border-surface-container/60">
            <div className="flex flex-col text-center md:text-left">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-space-2xs">
                Ready to take the next step toward your goals?
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                Speak directly with our senior loan specialists or submit an instant application today.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-space-sm shrink-0">
              <Link
                to="/subscribe"
                className="px-space-xl py-space-sm rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-lg text-label-lg font-bold hover:bg-secondary-fixed-dim hover:scale-105 active:scale-95 transition-all duration-200 shadow-md animate-glow-button"
              >
                Apply Now
              </Link>
              <a
                href="tel:+918340421940"
                className="inline-flex items-center gap-space-xs px-space-xl py-space-sm rounded-full bg-surface-container text-primary font-label-lg text-label-lg font-bold hover:bg-surface-container-high hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span className="material-symbols-outlined text-lg">call</span>
                <span>+91 83404 21940</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
