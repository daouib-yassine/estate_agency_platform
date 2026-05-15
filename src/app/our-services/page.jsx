"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Camera, Megaphone, CalendarCheck, Handshake,
  FileText, BarChart3, ShieldCheck, ArrowRight,
  CheckCircle2, ChevronDown, Phone, Star, Quote,
  Home, Building2, Users, TrendingUp
} from 'lucide-react';
import { SiInstagram, SiX } from '@icons-pack/react-simple-icons';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const services = [
  {
    id: 'listing',
    icon: Camera,
    num: '01',
    title: 'Property Listing & Presentation',
    short: 'Professional staging, photography & listing creation that make your property impossible to ignore.',
    desc: 'First impressions close deals. Our in-house team handles professional photography, aerial drone footage, 3D virtual tours, and copywriting crafted to attract serious, qualified buyers — not just browsers.',
    deliverables: [
      'High-resolution photography (interior & exterior)',
      'Aerial drone footage',
      '3D Matterport virtual tour',
      'Premium listing copywriting',
      'Floor plan drafting',
      'Multi-platform listing distribution',
    ],
    forSeller: true,
    forBuyer: false,
    color: '#1b3160',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=85',
  },
  {
    id: 'marketing',
    icon: Megaphone,
    num: '02',
    title: 'Targeted Marketing & Promotion',
    short: 'Reach the right audience through paid ads, social campaigns, and our exclusive buyer network.',
    desc: 'We deploy a full-stack marketing approach — Facebook and Instagram paid campaigns, Google remarketing, email newsletters to our 4,000+ verified buyer database, and featured placement on major real estate portals.',
    deliverables: [
      'Facebook & Instagram ad campaigns',
      'Google Search & Display ads',
      'Email campaigns to qualified buyers',
      'Featured portal listings (Zillow, Realtor.com)',
      'Social media content creation',
      'Weekly performance reporting',
    ],
    forSeller: true,
    forBuyer: false,
    color: '#b89a5a',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&q=85',
  },
  {
    id: 'visits',
    icon: CalendarCheck,
    num: '03',
    title: 'Visit Organisation & Buyer Qualification',
    short: 'We filter, schedule, and manage every visit so you only meet serious, pre-qualified buyers.',
    desc: 'No time-wasters. Every prospective buyer is pre-screened by our agents before a visit is scheduled. We coordinate timing, accompany all visits, and provide structured feedback after each showing.',
    deliverables: [
      'Buyer financial pre-qualification',
      'Coordinated visit scheduling',
      'Agent-accompanied showings',
      'Post-visit buyer feedback reports',
      'Virtual walkthrough option',
      'Visit analytics dashboard',
    ],
    forSeller: true,
    forBuyer: true,
    color: '#2d6a4f',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=85',
  },
  {
    id: 'negotiation',
    icon: Handshake,
    num: '04',
    title: 'Negotiation & Deal Management',
    short: 'Expert negotiators who protect your interests and ensure you get the best possible outcome.',
    desc: 'Our senior advisors have closed thousands of transactions. We manage all offer communications, counter-offer strategy, price negotiation, and ensure both parties reach an agreement that reflects true market value.',
    deliverables: [
      'Offer review and analysis',
      'Counter-offer strategy',
      'Multi-offer management',
      'Market value benchmarking',
      'Confidential communication channel',
      'Deal timeline management',
    ],
    forSeller: true,
    forBuyer: true,
    color: '#0f1f3d',
    img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&q=85',
  },
  {
    id: 'closing',
    icon: FileText,
    num: '05',
    title: 'Deal Closing & Documentation',
    short: 'From first offer to final signature — we handle all paperwork, legal coordination, and handover.',
    desc: 'We coordinate with notaries, lawyers, banks, and government offices to ensure a seamless closing. Every document is reviewed, every deadline tracked, and every obligation fulfilled before keys change hands.',
    deliverables: [
      'Purchase agreement drafting',
      'Notary & legal coordination',
      'Mortgage & financing liaison',
      'Title search & verification',
      'Tax and fee calculation',
      'Final handover & key ceremony',
    ],
    forSeller: true,
    forBuyer: true,
    color: '#1b3160',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=85',
  },
  {
    id: 'valuation',
    icon: BarChart3,
    num: '06',
    title: 'Property Valuation & Market Analysis',
    short: 'Data-driven valuations grounded in real market conditions, not guesswork.',
    desc: 'Before listing or buying, you need to know exactly what a property is worth. Our analysts deliver comprehensive comparative market analyses, rental yield projections, and investment return forecasts.',
    deliverables: [
      'Comparative market analysis (CMA)',
      'Rental yield projections',
      'Investment return forecast',
      'Neighbourhood trend report',
      'Price positioning strategy',
      'Valuation certificate',
    ],
    forSeller: true,
    forBuyer: true,
    color: '#b89a5a',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85',
  },
];

const testimonials = [
  {
    name: 'Marcus Webb',
    role: 'Property Seller',
    text: 'Altis sold my Beverly Hills home in 11 days at 4% above asking price. Their marketing was unlike anything I\'d seen — the photography alone was worth it.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    name: 'Isabelle Fontaine',
    role: 'First-Time Buyer',
    text: 'As a buyer, I never felt lost. The team guided every step, filtered out unsuitable properties, and negotiated a price I couldn\'t have achieved alone.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80',
  },
  {
    name: 'David & Karen Osei',
    role: 'Property Investors',
    text: 'The valuation report they provided was incredibly detailed. We invested based on their analysis and saw a 22% return in 18 months.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=100&q=80',
  },
];

const faqs = [
  { q: 'How does Altis make money?', a: 'We charge a commission only upon successful deal closing — typically a percentage of the final transaction price agreed upon with the property owner at the start of our engagement. There are no upfront listing fees.' },
  { q: 'Can buyers contact sellers directly through the platform?', a: 'No. All communications are managed exclusively through our agency. This protects both parties, ensures professionalism, and prevents misunderstandings or pressure tactics.' },
  { q: 'How long does it typically take to sell a property?', a: 'Our average time-to-offer is 23 days from listing. Premium properties in high-demand areas often receive offers within the first week. Market conditions and pricing strategy are the primary factors.' },
  { q: 'Are your listings verified?', a: 'Yes. Every property is personally inspected and validated by our team before it goes live. We do not publish unverified listings, which is why our database remains smaller but far more trustworthy than open platforms.' },
  { q: 'Do you offer services for renters as well?', a: 'Absolutely. Our rental services cover property search, visit organisation, lease negotiation, and move-in coordination for tenants — and full tenant sourcing and management for landlords.' },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ServicesPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);
  const [activeService, setActiveService] = useState(services[0]);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const filtered = services.filter(s =>
    activeTab === 'all' ||
    (activeTab === 'sellers' && s.forSeller) ||
    (activeTab === 'buyers' && s.forBuyer)
  );

  return (
    <div className="min-h-screen bg-white font-sans text-[#0f1f3d] selection:bg-[#b89a5a] selection:text-white">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-300 lg:px-16 ${isScrolled ? 'bg-[#0f1f3d] py-4 shadow-xl' : 'bg-transparent'}`}>
        <Link href="/" className="font-serif text-2xl font-medium tracking-wider text-white">
          Altis<span className="text-[#d4b87a]">.</span>
        </Link>
        <ul className="hidden gap-10 lg:flex">
          {[
            { label: 'Properties', href: '/properties' },
            { label: 'Developments', href: '/developments' },
            { label: 'Services', href: '/services_page' },
            { label: 'About', href: '/about' },
          ].map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className={`text-[11px] font-normal uppercase tracking-[0.15em] transition-colors ${label === 'Services' ? 'text-[#d4b87a]' : 'text-white/80 hover:text-[#d4b87a]'}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <a href="/contact" className="rounded-sm border border-white/40 px-6 py-2.5 text-[11px] font-medium uppercase tracking-widest text-white transition-all hover:bg-[#b89a5a] hover:border-[#b89a5a]">
          Contact Us
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex min-h-[580px] items-end overflow-hidden pb-0">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(120deg, rgba(8,15,31,0.96) 0%, rgba(15,31,61,0.82) 45%, rgba(184,154,90,0.18) 100%), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=85')` }}
        />

        {/* Geometric accent lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 right-[8%] h-[340px] w-px bg-gradient-to-b from-transparent via-[#b89a5a]/30 to-transparent" />
          <div className="absolute top-32 right-[18%] h-[200px] w-px bg-gradient-to-b from-transparent via-[#b89a5a]/15 to-transparent" />
        </div>

        <div className="relative z-10 w-full px-8 pb-0 pt-40 lg:px-16">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[#d4b87a]">What We Offer</p>
            <h1 className="font-serif text-5xl font-light leading-[1.08] text-white md:text-6xl lg:text-7xl">
              Full-Spectrum<br />Real Estate <em className="not-italic text-[#d4b87a]">Services</em>
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/60">
              From first listing to final signature, we manage every touchpoint with precision — so you never have to navigate the process alone.
            </p>

            {/* Pill stats */}
            <div className="mt-10 flex flex-wrap gap-3 pb-14">
              {[
                { icon: Home, val: '1,800+', label: 'Properties Sold' },
                { icon: Users, val: '98%', label: 'Client Satisfaction' },
                { icon: TrendingUp, val: '23 days', label: 'Avg. Time to Offer' },
                { icon: Building2, val: '25 yrs', label: 'Experience' },
              ].map(({ icon: Icon, val, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-sm border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-3">
                  <Icon size={14} className="text-[#d4b87a]" />
                  <span className="font-serif text-lg text-white">{val}</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diagonal bottom cut */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* ── INTERACTIVE SERVICE EXPLORER ── */}
      <section className="px-8 py-20 lg:px-16 bg-white">
        {/* Tab filter */}
        <div className="mb-12 flex flex-col items-center gap-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b89a5a]">Our Services</p>
          <h2 className="font-serif text-4xl font-light">Everything Handled, End to End</h2>
          <div className="flex gap-1 rounded-sm border border-gray-200 p-1">
            {['all', 'sellers', 'buyers'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-sm px-6 py-2 text-[11px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#0f1f3d] text-white' : 'text-gray-500 hover:text-[#0f1f3d]'}`}
              >
                {tab === 'all' ? 'All Services' : tab === 'sellers' ? 'For Sellers' : 'For Buyers'}
              </button>
            ))}
          </div>
        </div>

        {/* Split panel explorer */}
        <div className="grid gap-0 overflow-hidden rounded-sm border border-gray-100 shadow-xl lg:grid-cols-[320px_1fr]">
          {/* Left: service list */}
          <div className="border-r border-gray-100 bg-[#f7f6f3]">
            {filtered.map(s => {
              const Icon = s.icon;
              const isActive = activeService.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveService(s)}
                  className={`flex w-full items-start gap-4 border-b border-gray-100 px-6 py-5 text-left transition-all last:border-b-0 ${isActive ? 'bg-[#0f1f3d]' : 'hover:bg-white'}`}
                >
                  <div className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm ${isActive ? 'bg-[#b89a5a]/20' : 'bg-white'}`}>
                    <Icon size={15} className={isActive ? 'text-[#d4b87a]' : 'text-[#b89a5a]'} />
                  </div>
                  <div>
                    <p className={`text-[9px] font-bold uppercase tracking-widest ${isActive ? 'text-[#b89a5a]' : 'text-gray-400'}`}>{s.num}</p>
                    <p className={`mt-0.5 text-sm font-medium leading-snug ${isActive ? 'text-white' : 'text-[#0f1f3d]'}`}>{s.title}</p>
                    <div className={`mt-2 flex gap-1.5 ${isActive ? '' : ''}`}>
                      {s.forSeller && (
                        <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest ${isActive ? 'bg-white/10 text-white/60' : 'bg-[#1b3160]/10 text-[#1b3160]'}`}>Seller</span>
                      )}
                      {s.forBuyer && (
                        <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest ${isActive ? 'bg-white/10 text-white/60' : 'bg-[#b89a5a]/10 text-[#b89a5a]'}`}>Buyer</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          <div className="bg-white">
            <div className="relative h-56 overflow-hidden">
              <img src={activeService.img} alt={activeService.title} className="h-full w-full object-cover transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f3d]/30 to-transparent" />
              <div className="absolute bottom-6 left-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-[#0f1f3d]">
                  {React.createElement(activeService.icon, { size: 20, className: 'text-[#d4b87a]' })}
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#d4b87a]">{activeService.num}</p>
                  <h3 className="font-serif text-xl text-white">{activeService.title}</h3>
                </div>
              </div>
            </div>

            <div className="p-8">
              <p className="mb-4 text-base font-light italic text-[#b89a5a]">"{activeService.short}"</p>
              <p className="text-sm leading-relaxed text-gray-600">{activeService.desc}</p>

              <div className="mt-8">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#0f1f3d]">What's Included</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {activeService.deliverables.map(d => (
                    <div key={d} className="flex items-start gap-2.5">
                      <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0 text-[#b89a5a]" />
                      <span className="text-sm text-gray-600">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <a href="#consult" className="flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors">
                  Request This Service <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY ALTIS ── */}
      <section className="bg-[#f7f6f3] px-8 py-24 lg:px-16">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#b89a5a]">Our Difference</p>
          <h2 className="font-serif text-4xl font-light">Why Clients Choose Altis</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: 'Controlled & Verified',
              desc: 'Every listing is personally inspected and validated before going live. No fake properties, no ghost listings — just verified, accurate data you can trust.',
            },
            {
              icon: Users,
              title: 'You Never Deal Alone',
              desc: 'A dedicated senior advisor guides you from first enquiry to final handover. One point of contact, full accountability, total transparency.',
            },
            {
              icon: Handshake,
              title: 'Interests Fully Protected',
              desc: 'Buyer and seller never communicate directly. We act as your professional buffer — ensuring no pressure, no manipulation, and no information leakage.',
            },
            {
              icon: BarChart3,
              title: 'Data-Led Decisions',
              desc: 'We price using real market data, not intuition. Our valuations are built on comparative analysis, area trends, and yield projections.',
            },
            {
              icon: Megaphone,
              title: 'Marketing That Moves Properties',
              desc: 'Our paid media team runs targeted campaigns that reach verified, financially qualified buyers — not just passive browsers.',
            },
            {
              icon: FileText,
              title: 'Zero Paperwork Stress',
              desc: 'We handle all documentation, legal coordination, and closing administration so you can focus on what comes next.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group rounded-sm border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#b89a5a]/30 hover:shadow-xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm bg-[#0f1f3d] transition-colors group-hover:bg-[#b89a5a]">
                <Icon size={20} className="text-[#d4b87a]" />
              </div>
              <h3 className="mb-3 font-serif text-lg font-normal">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS (TIMELINE) ── */}
      <section className="bg-[#0f1f3d] px-8 py-24 lg:px-16 overflow-hidden relative">
        {/* decorative lines */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5 hidden lg:block" />

        <div className="mb-16 text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d4b87a]">The Process</p>
          <h2 className="font-serif text-4xl font-light text-white">From First Call to Final Key</h2>
        </div>

        <div className="relative mx-auto max-w-4xl space-y-0">
          {[
            { step: '01', side: 'left', title: 'Initial Consultation', desc: 'We meet — in person or virtually — to understand your goals, timeline, and requirements. Zero pressure, full clarity.' },
            { step: '02', side: 'right', title: 'Valuation & Strategy', desc: 'We conduct a market analysis and agree on a pricing strategy, marketing plan, and service scope tailored to your property.' },
            { step: '03', side: 'left', title: 'Listing & Launch', desc: 'Professional photography, tour creation, copywriting, and a coordinated multi-channel launch to our buyer network and portals.' },
            { step: '04', side: 'right', title: 'Visits & Offers', desc: 'We qualify buyers, arrange visits, collect offers, and guide negotiation — always acting in your best interest.' },
            { step: '05', side: 'left', title: 'Deal Closed', desc: 'We manage all documentation, legal steps, and handover logistics. You receive your keys — or your payment — with no surprises.' },
          ].map(({ step, side, title, desc }, i) => (
            <div key={step} className={`relative flex items-start gap-8 py-10 ${side === 'right' ? 'flex-row-reverse lg:ml-[50%]' : 'lg:mr-[50%]'}`}>
              {/* Step number */}
              <div className={`relative flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#b89a5a]/40 bg-[#0f1f3d] font-serif text-2xl text-[#d4b87a] ${side === 'right' ? 'lg:-mr-7' : 'lg:-ml-7'} hidden lg:flex`} />
              <div className="flex lg:hidden flex-shrink-0 h-10 w-10 items-center justify-center rounded-full border border-[#b89a5a]/40 font-serif text-lg text-[#d4b87a]">{step}</div>
              <div className={`${side === 'right' ? 'text-right' : ''} max-w-sm`}>
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#b89a5a] mb-1">{step}</p>
                <h3 className="font-serif text-xl text-white mb-2">{title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/50">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-white px-8 py-24 lg:px-16">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#b89a5a]">Client Stories</p>
          <h2 className="font-serif text-4xl font-light">Words from Those We've Served</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col justify-between rounded-sm border border-gray-100 bg-[#f7f6f3] p-8 transition-all hover:border-[#b89a5a]/30 hover:shadow-lg">
              <div>
                <Quote size={28} className="mb-6 text-[#b89a5a]/40" />
                <p className="text-sm leading-relaxed text-gray-600 italic">"{t.text}"</p>
              </div>
              <div className="mt-8 flex items-center gap-4 border-t border-gray-200 pt-6">
                <img src={t.img} alt={t.name} className="h-12 w-12 rounded-full object-cover object-top" />
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#b89a5a]">{t.role}</p>
                  <div className="mt-1 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={10} className="text-[#d4b87a]" fill="#d4b87a" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#f7f6f3] px-8 py-24 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#b89a5a]">Common Questions</p>
            <h2 className="font-serif text-4xl font-light">Frequently Asked</h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className={`overflow-hidden rounded-sm border transition-all duration-300 ${openFaq === i ? 'border-[#b89a5a]/40 bg-white shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-7 py-5 text-left"
                >
                  <span className="pr-4 text-sm font-medium">{faq.q}</span>
                  <ChevronDown size={16} className={`flex-shrink-0 text-[#b89a5a] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-gray-100 px-7 pb-6 pt-4">
                    <p className="text-sm leading-relaxed text-gray-500">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULT CTA ── */}
      <section id="consult" className="relative overflow-hidden bg-[#0f1f3d] px-8 py-24 lg:px-16">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=60')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f3d] via-[#0f1f3d]/95 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d4b87a]">Get Started</p>
              <h2 className="mb-5 font-serif text-4xl font-light text-white leading-tight">
                Ready to Work<br />With <em className="not-italic text-[#d4b87a]">Altis?</em>
              </h2>
              <p className="mb-8 max-w-sm text-sm font-light leading-relaxed text-white/50">
                Book a free, no-obligation consultation with one of our senior advisors. We'll assess your needs and build a tailored service plan.
              </p>
              <div className="flex items-center gap-4">
                <a href="tel:+13105550190" className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
                    <Phone size={15} className="text-[#d4b87a]" />
                  </div>
                  +1 (310) 555-0190
                </a>
              </div>
            </div>

            {/* Quick consult form */}
            <ConsultForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#080f1f] px-8 pt-20 pb-10 text-white lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#" className="font-serif text-2xl font-medium tracking-wider">Altis<span className="text-[#d4b87a]">.</span></a>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-white/40">Your trusted partner in premium real estate across the United States and beyond.</p>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-[#d4b87a]">Services</h4>
            <ul className="space-y-3 text-sm font-light text-white/50">
              {['Property Listing', 'Marketing', 'Visit Organisation', 'Negotiation', 'Deal Closing', 'Valuation'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-[#d4b87a]">Contact</h4>
            <ul className="space-y-3 text-sm font-light text-white/50">
              <li>hello@altisrealty.com</li>
              <li>+1 (310) 555-0190</li>
              <li>Book a Consultation</li>
            </ul>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex gap-4">
              {[SiInstagram, SiX].map((Icon, i) => (
                <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-[#b89a5a] hover:text-[#d4b87a]">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-20 border-t border-white/5 pt-8 text-center text-[10px] font-light uppercase tracking-widest text-white/20">
          © 2026 Altis Realty. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONSULT FORM
───────────────────────────────────────────── */
const ConsultForm = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', service: '', role: '' });

  const handle = (e) => { e.preventDefault(); setSent(true); };

  if (sent) return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-sm border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm">
      <CheckCircle2 size={40} className="text-[#b89a5a]" />
      <p className="font-serif text-2xl text-white">Consultation Booked!</p>
      <p className="text-sm text-white/50">We'll call you within 24 hours to confirm your appointment.</p>
    </div>
  );

  return (
    <form onSubmit={handle} className="rounded-sm border border-white/10 bg-white/5 p-8 backdrop-blur-sm space-y-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4b87a] mb-6">Book a Free Consultation</p>
      <input required type="text" placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#b89a5a] transition-colors placeholder:text-white/30" />
      <input required type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
        className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#b89a5a] transition-colors placeholder:text-white/30" />
      <select required value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
        className="w-full rounded-sm border border-white/10 bg-[#0f1f3d] px-4 py-3 text-sm text-white/70 outline-none focus:border-[#b89a5a] transition-colors">
        <option value="">I am a...</option>
        <option>Property Seller</option>
        <option>Property Buyer</option>
        <option>Renter</option>
        <option>Landlord</option>
        <option>Investor</option>
      </select>
      <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
        className="w-full rounded-sm border border-white/10 bg-[#0f1f3d] px-4 py-3 text-sm text-white/70 outline-none focus:border-[#b89a5a] transition-colors">
        <option value="">Service of interest (optional)</option>
        {services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
      </select>
      <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#b89a5a] py-4 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#d4b87a] transition-colors mt-2">
        <CalendarCheck size={14} /> Schedule My Consultation
      </button>
    </form>
  );
};