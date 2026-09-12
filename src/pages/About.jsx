import React, { useEffect, useState } from 'react';
import aboutHeroImage from '../assets/about hero.webp';
import lastSectionImage from '../assets/last section img.webp';
import imgEntrance from '../assets/entrance.webp';
import imgWorkingZone from '../assets/working zone.webp';
import imgMotivational from '../assets/motivational quote.webp';
import imgReception1 from '../assets/reception.webp';
import imgReception2 from '../assets/reception 2.webp';
import logoBirla   from '../assets/aditya birla.png';
import logoHdb     from '../assets/HBD.webp';
import logoMuthoot from '../assets/muthoot finance.png';
import logoTata    from '../assets/tata.png';
import logoKotak   from '../assets/kotak.svg';
import logoYes     from '../assets/bank logo (2).svg';
import logoIdfc    from '../assets/bank logo (3).svg';
import logoAxis    from '../assets/l & T finance.png';
import logoBajaj   from '../assets/bajaj finance.png';
import logoMahindra from '../assets/mahindra finance.png';
import './About.css';

const images = {
  hero: aboutHeroImage,
};

const gallery = [
  { category: 'lounge',        image: imgReception1,   title: 'Reception - Client Welcome Desk',         label: 'Reception',          place: 'Ground Floor',     description: 'Our welcoming reception area where every client begins their Credvia journey.' },
  { category: 'lounge',        image: imgReception2,   title: 'Reception 2 - Visitor Lounge',            label: 'Reception Lounge',   place: 'Ground Floor',     description: 'A comfortable lounge designed to make every visitor feel at home.' },
  { category: 'workstations',  image: imgEntrance,     title: 'Office Entrance - First Impressions',     label: 'Entrance',           place: 'Main Lobby',       description: "The main entrance to Credvia's corporate office, designed for confidence and trust." },
  { category: 'workstations',  image: imgWorkingZone,  title: 'Working Zone - Where Ideas Become Loans', label: 'Working Zone',       place: 'Operations Floor', description: 'Our open working zone where our advisors help thousands of borrowers every day.' },
  { category: 'suites',        image: imgMotivational, title: 'Motivational Corner - Driven by Purpose', label: 'Motivational Wall',  place: 'Common Area',      description: 'A dedicated inspiration wall reminding our team of the mission that drives us.' },
];

const values = [
  ['01', 'Complete Transparency', 'We clearly disclose partner commissions, annual percentage rates (APR), and loan terms before a borrower submits any document.', 'shield'],
  ['02', 'Customer Advocacy', "We represent the borrower's best interests, negotiating optimal tenure and processing terms across our network of accredited lenders.", 'sentiment_satisfied'],
  ['03', 'Data Privacy Stewardship', 'Customer personal and financial data is encrypted end-to-end and transmitted solely to authorised lenders chosen by the user.', 'lock'],
  ['04', 'Credit Literacy & Care', 'Through our ₹699 Credvia Care initiative, we provide hands-on credit score recovery and debt planning counseling.', 'diversity_3'],
];

function Icon({ children }) { return <span className="material-symbols-outlined">{children}</span>; }

function About() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 4;

  const filtered = filter === 'all' ? gallery : gallery.filter((item) => item.category === filter);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  // Reset to page 0 when filter changes
  const handleFilter = (key) => { setFilter(key); setPage(0); };

  useEffect(() => {
    const close = (event) => event.key === 'Escape' && setSelected(null);
    document.addEventListener('keydown', close);
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.removeEventListener('keydown', close); document.body.style.overflow = ''; };
  }, [selected]);

  return <div className="about-page">
    <section className="about-hero"><div className="about-wrap">
      <div className="about-hero-copy">
        <h1>Bridging Aspirations with India&apos;s Top Lending Institutions.</h1>
        <p>Credvia Financial Services is an <strong>Authorised Corporate Channel Partner &amp; Direct Selling Associate (DSA)</strong> for India&apos;s leading RBI-registered Banks and Non-Banking Financial Companies (NBFCs). We make credit discovery seamless, unbiased, and transparent&mdash;without direct balance sheet risk or predatory fees.</p>
      </div>
      <div className="about-feature"><img src={images.hero} alt="Credvia leadership and institutional banking boardroom" /></div>
    </div></section>

    <section className="about-section about-white" id="corporate-gallery"><div className="about-wrap"><div className="about-section-head"><div><span className="about-kicker"><Icon>apartment</Icon> Our Workspaces &amp; Culture</span><h2>Inside the Credvia Office</h2><p>A glimpse into our workspace — where every desk, wall, and corner reflects our commitment to serving Indian borrowers with transparency and purpose.</p></div><div className="about-tabs">{[['all','All Spaces'],['suites','Inspiration'],['workstations','Work Areas'],['lounge','Reception']].map(([key, label]) => <button key={key} className={filter === key ? 'active' : ''} onClick={() => handleFilter(key)}>{label}</button>)}</div></div><div className="about-gallery-grid">{visible.map((item) => <button type="button" className="about-gallery-card" key={item.title} onClick={() => setSelected(item)}><img src={item.image} alt={item.title} /><div><small>{item.label}</small><strong>{item.title}</strong><span><Icon>fullscreen</Icon> View Fullscreen &nbsp; &bull; {item.place}</span></div></button>)}</div>{totalPages > 1 && (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}><button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} style={{ display: 'flex', alignItems: 'center', gap: '.3rem', padding: '.5rem 1.1rem', borderRadius: '2rem', border: '1px solid #d1d5db', background: page === 0 ? '#f3f4f6' : '#001849', color: page === 0 ? '#9ca3af' : '#fff', fontWeight: 700, fontSize: '.8rem', cursor: page === 0 ? 'not-allowed' : 'pointer' }}><Icon>chevron_left</Icon> Prev</button><span style={{ fontSize: '.8rem', color: '#6b7280', fontWeight: 600 }}>{page + 1} / {totalPages}</span><button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} style={{ display: 'flex', alignItems: 'center', gap: '.3rem', padding: '.5rem 1.1rem', borderRadius: '2rem', border: '1px solid #d1d5db', background: page === totalPages - 1 ? '#f3f4f6' : '#001849', color: page === totalPages - 1 ? '#9ca3af' : '#fff', fontWeight: 700, fontSize: '.8rem', cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer' }}>Next <Icon>chevron_right</Icon></button></div>)}</div></section>

    <section className="about-section about-gallery"><div className="about-wrap about-two-col"><div>
      <span className="about-kicker"><Icon>account_balance</Icon> Authorised Lending Distribution Network</span><h2>Empowering Indian Borrowers Through Transparent Financial Distribution</h2>
      <p><strong>Credvia Financial Services</strong> is India&apos;s premier loan facilitation platform and direct lending distributor. We operate as an <em>Authorised Channel Partner</em> bridging credit-seeking retail customers, SMEs, and MSMEs with India&apos;s most respected <strong>RBI-regulated Commercial Banks and licensed NBFCs</strong>.</p>
      <div className="about-notice"><b><Icon>info</Icon> Regulatory &amp; Statutory Transparency</b><p><strong>Important Notice:</strong> Credvia Financial Services is <em>not</em> an NBFC, banking company, or RBI direct balance sheet lender. We do not accept public deposits, nor do we issue loans directly from our own balance sheet. All underwriting criteria, risk assessments, loan approvals, interest rates, disbursals, and loan collections are governed exclusively by our affiliated RBI-licensed banking and NBFC partners under RBI guidelines.</p></div>
    </div><div className="about-partners-grid"><img src={logoBirla} alt="Aditya Birla" /><img src={logoHdb} alt="HDB Financial" /><img src={logoMuthoot} alt="Muthoot Finance" /><img src={logoTata} alt="Tata Capital" /><img src={logoYes} alt="YES Bank" /><img src={logoIdfc} alt="IDFC FIRST Bank" /><img src={logoAxis} alt="L&T Finance" /><img src={logoBajaj} alt="Bajaj Finance" /><img src={logoMahindra} alt="Mahindra Finance" /></div></div></section>

    <section className="about-section about-white"><div className="about-wrap"><div className="about-centered"><span className="about-kicker">Foundational Purpose</span><h2>Ethical Channel Distribution For Every Indian</h2></div><div className="about-mission-grid"><article className="about-mission"><Icon>rocket_launch</Icon><span>Our Distribution Mission</span><h3>To democratize access to credit across Bharat by partnering exclusively with responsible, RBI-regulated institutions&mdash;ensuring every consumer receives unbiased loan offers, transparent rates, and zero hidden costs.</h3><small><Icon>verified</Icon> Connecting over 1,20,000+ borrowers to institutional credit</small></article><article className="about-vision"><Icon>visibility</Icon><span>Our Long-Term Vision</span><h3>To stand as India&apos;s most trusted credit facilitator and financial wellness catalyst, recognized for eradicating predatory lending practices through consumer education and institutional integrity.</h3><small><Icon>flag</Icon> Advocating consumer-first lending ethics across 350+ towns</small></article></div></div></section>

    <section className="about-section"><div className="about-wrap"><div className="about-section-head simple"><div><span className="about-kicker">Why Credvia</span><h2>Why Indian Borrowers Partner With Us</h2></div><p>We eliminate the confusion of dealing with multiple banks by offering single-window comparison and transparent facilitation.</p></div><div className="about-card-grid">{[['rule','Zero Hidden Fees','We believe in total fee transparency. No surprise deductions, upfront broker charges, or misleading loan terms.','Standardised KFS'],['handshake','45+ Partner Banks & NBFCs','Compare pre-approved loan options from leading national banks and licensed NBFCs with one single credit review.','Direct Sourcing Partner'],['bolt','Rapid Paperless Ingestion','DigiLocker verification, paperless Aadhaar e-KYC, and automated bank statement analysis speed up approval cycles.','Same-Day Partner Review'],['support_agent','Dedicated Loan Advisors','Real people stationed in our BKC headquarters and regional offices ready to guide you in your regional tongue.','+91 83404 21940 Helpline']].map(([icon, title, text, foot]) => <article key={title}><Icon>{icon}</Icon><h3>{title}</h3><p>{text}</p><b>{foot} <Icon>arrow_forward</Icon></b></article>)}</div></div></section>

    <section className="about-section about-soft"><div className="about-wrap"><div className="about-centered"><span className="about-kicker">Ethical Foundation</span><h2>Our Core Operating Values</h2><p>Principles that govern our team, technology partners, and relationship with regulated lending institutions.</p></div><div className="about-values">{values.map(([number, title, text, icon]) => <article key={number}><header><b>{number}</b><Icon>{icon}</Icon></header><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="about-section about-governance"><div className="about-wrap"><div className="about-governance-grid about-governance-single"><div><span className="about-kicker">Statutory Transparency</span><h2>Corporate Accountability &amp; Ethical Distribution</h2><p>Credvia operates strictly within the framework prescribed for loan facilitators and distribution channel partners. We work collaboratively with regulated banks, maintain a dedicated grievance cell, and uphold complete data hygiene.</p></div><div className="about-governance-image-wrap"><img className="about-governance-image" src={lastSectionImage} alt="Credvia financial services and institutional lending" /></div></div></div></section>

    {selected && <div className="about-modal" onClick={() => setSelected(null)}><div onClick={(event) => event.stopPropagation()}><button onClick={() => setSelected(null)} aria-label="Close"><Icon>close</Icon></button><img src={selected.image} alt={selected.title} /><section><span>{selected.label}</span><h3>{selected.title}</h3><p>{selected.description}</p></section></div></div>}
  </div>;
}

export default About;
