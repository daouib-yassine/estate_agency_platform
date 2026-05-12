"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MapPin, ArrowRight, Building2,
  Home, TrendingUp, Users, Star,
  Shield, Target, Heart, Award, Mail, Phone, Globe, Briefcase
} from 'lucide-react';
import { SiInstagram, SiX } from '@icons-pack/react-simple-icons';

/* ─────────────────────────────────────────────
    DATA
───────────────────────────────────────────── */
const milestones = [
  { year: '1998', title: 'Founded in Los Angeles', desc: 'Altis Realty opens its first office in Beverly Hills with a team of 3 and a simple mission: honest, professional real estate brokerage.' },
  { year: '2004', title: 'Expansion to 5 Cities', desc: 'Following rapid growth, we expanded across Southern California — Santa Monica, Malibu, Pasadena, and Downtown LA joined our coverage map.' },
  { year: '2011', title: '500th Deal Closed', desc: 'A landmark moment for the agency. Our 500th successful transaction reinforced our reputation as the region\'s most trusted intermediary.' },
  { year: '2016', title: 'Developments Division Launched', desc: 'We moved beyond brokerage to partner with developers, bringing off-plan and new construction projects to our exclusive buyer network.' },
  { year: '2020', title: 'Digital Platform Launched', desc: 'Altis.com went live — a fully controlled, agency-curated platform replacing fragmented listings with a single trusted source of truth.' },
  { year: '2026', title: '1,800+ Properties & Growing', desc: 'Today, Altis manages over 1,800 listings across 14 cities, with a portfolio exceeding $2.1 billion in value.' },
];

const values = [
  {
    icon: Shield,
    title: 'Trust Above All',
    desc: 'We never compromise transparency. Every listing is verified, every price is grounded in data, and every client receives complete honesty.',
  },
  {
    icon: Target,
    title: 'Precision in Everything',
    desc: 'From pricing strategy to paperwork, we operate with exactitude. We minimize risk through rigorous market analysis and legal oversight.',
  },
  {
    icon: Heart,
    title: 'Client Longevity',
    desc: 'We prioritize long-term partnerships over short-term fees. We have frequently advised against sales that didn\'t serve the client\'s best interest.',
  },
  {
    icon: Award,
    title: 'Premium Standard',
    desc: 'We hold every element to a high standard — from the quality of our cinematography to the professionalism of our advisory network.',
  },
];

const pressLogos = ['Forbes', 'Wall Street Journal', 'Architectural Digest', 'LA Times', 'Bloomberg', 'Robb Report'];

/* ─────────────────────────────────────────────
    PAGE
───────────────────────────────────────────── */
export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeYear, setActiveYear] = useState(0);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#0f1f3d] selection:bg-[#b89a5a] selection:text-white">

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-300 lg:px-16 ${isScrolled ? 'bg-[#0f1f3d] py-4 shadow-xl' : 'bg-transparent'}`}>
        <Link href="/" className="font-serif text-2xl font-medium tracking-wider text-white">
          Altis<span className="text-[#d4b87a]">.</span>
        </Link>
       <ul className="hidden gap-10 lg:flex">
                 {[
                   { label: 'Properties', href: '/properties' },
                   { label: 'Developments', href: '/developments' },
                   { label: 'Services', href: '/services_page' },
                   { label: 'About', href: '/about_page' },
                 ].map(({ label, href }) => (
                   <li key={label}>
                     <Link href={href} className={`text-[11px] font-normal uppercase tracking-[0.15em] transition-colors ${label === 'Developments' ? 'text-[#d4b87a]' : 'text-white/80 hover:text-[#d4b87a]'}`}>
                       {label}
                     </Link>
                   </li>
                 ))}
       </ul>
        <Link href="/contact" className="rounded-sm border border-white/40 px-6 py-2.5 text-[11px] font-medium uppercase tracking-widest text-white transition-all hover:bg-[#b89a5a] hover:border-[#b89a5a]">
          Contact Us
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen grid lg:grid-cols-2">
        <div className="relative flex flex-col justify-end bg-[#0f1f3d] px-10 pb-20 pt-40 lg:px-16 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="absolute left-0 right-0 h-px bg-white" style={{ top: `${(i + 1) * 5.5}%` }} />
            ))}
          </div>

          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[#d4b87a]">The Institution</p>
          <h1 className="font-serif text-5xl font-light leading-[1.05] text-white md:text-6xl lg:text-7xl">
            A Legacy of<br /><em className="not-italic text-[#d4b87a]">Integrity.</em><br />Defined by<br /><em className="not-italic text-[#d4b87a]">Excellence.</em>
          </h1>

          <p className="mt-8 max-w-md text-base font-light leading-relaxed text-white/55">
            Founded on the principle of the "Controlled Intermediary," Altis has spent three decades redefining the standards of luxury real estate advisory.
          </p>

          <div className="mt-14 flex gap-10 border-t border-white/10 pt-10">
            {[
              { num: '28', label: 'Years Active' },
              { num: '$2.1B', label: 'Portfolio' },
              { num: '14', label: 'Market Hubs' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="font-serif text-4xl text-[#d4b87a]">{num}</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block h-screen">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85"
            alt="Altis Corporate HQ"
            className="h-full w-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-[#0f1f3d]/10" />
        </div>
      </section>

      {/* ── THE PHILOSOPHY ── */}
      <section className="px-8 py-24 lg:px-16 bg-[#f7f6f3]">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-16 lg:grid-cols-2 items-start">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#b89a5a]">The Altis Model</p>
              <h2 className="mb-8 font-serif text-4xl font-light leading-tight">
                Beyond Brokerage:<br />A Professional Standard
              </h2>
              <div className="space-y-6 text-sm leading-relaxed text-gray-600">
                <p>
                  Most real estate firms operate as marketing funnels, prioritizing the volume of listings over the quality of the transaction. Altis was established to challenge this model.
                </p>
                <p>
                  We operate as a <strong className="text-[#0f1f3d] font-medium">high-fidelity intermediary</strong>. This means we do not simply "list" properties; we curate them. Every asset in our portfolio undergoes a rigorous verification process, ensuring that data, pricing, and legal standing are beyond reproach before they reach our network.
                </p>
                <p>
                  Our methodology combines the analytical depth of a management consultancy with the bespoke service of a private bank. Whether representing a first-time seller or a global developer, our objective remains the same: the mitigation of risk and the maximization of value.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white p-8 border border-gray-200">
                  <Globe className="text-[#b89a5a] mb-4" size={24} />
                  <h4 className="font-serif text-lg mb-2">Global Access</h4>
                  <p className="text-[12px] text-gray-500 leading-normal">Connecting local assets to a worldwide network of qualified institutional and private investors.</p>
               </div>
               <div className="bg-[#0f1f3d] p-8 text-white">
                  <Briefcase className="text-[#d4b87a] mb-4" size={24} />
                  <h4 className="font-serif text-lg mb-2">Advisory</h4>
                  <p className="text-[12px] text-white/50 leading-normal">Strategic counsel on portfolio diversification, asset management, and market timing.</p>
               </div>
               <div className="col-span-2 bg-[#b89a5a] p-8 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                        <h4 className="font-serif text-2xl">98%</h4>
                        <p className="text-[10px] uppercase tracking-widest opacity-80">Retention Rate</p>
                    </div>
                    <div className="h-10 w-px bg-white/20" />
                    <div>
                        <h4 className="font-serif text-2xl">1,800+</h4>
                        <p className="text-[10px] uppercase tracking-widest opacity-80">Closed Mandates</p>
                    </div>
                    <div className="h-10 w-px bg-white/20" />
                    <Star size={20} fill="white" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="px-8 py-24 lg:px-16 bg-white">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#b89a5a]">Operational Pillars</p>
          <h2 className="font-serif text-4xl font-light">Our Commitment</h2>
        </div>

        <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-4 border border-gray-100 rounded-sm overflow-hidden">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="group relative flex flex-col p-10 border-r border-b border-gray-100 last:border-r-0 hover:bg-[#0f1f3d] transition-all duration-500">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-sm bg-[#f7f6f3] group-hover:bg-[#b89a5a]/20 transition-colors">
                <Icon size={20} className="text-[#b89a5a]" />
              </div>
              <h3 className="mb-4 font-serif text-xl font-normal group-hover:text-white transition-colors">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-500 group-hover:text-white/60 transition-colors">{desc}</p>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#d4b87a] group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="px-8 py-24 lg:px-16 bg-[#0f1f3d] relative">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d4b87a]">Historical Timeline</p>
          <h2 className="font-serif text-4xl font-light text-white">Three Decades of Growth</h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mb-14 flex flex-wrap justify-center gap-2">
            {milestones.map((m, i) => (
              <button
                key={m.year}
                onClick={() => setActiveYear(i)}
                className={`rounded-sm px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all ${activeYear === i ? 'bg-[#b89a5a] text-white' : 'border border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'}`}
              >
                {m.year}
              </button>
            ))}
          </div>

          <div className="text-center min-h-[200px]">
            <div className="mb-2 font-serif text-7xl text-[#d4b87a]/20 leading-none">{milestones[activeYear].year}</div>
            <h3 className="mt-2 font-serif text-2xl text-white">{milestones[activeYear].title}</h3>
            <p className="mx-auto mt-4 max-w-lg text-sm font-light leading-relaxed text-white/50">{milestones[activeYear].desc}</p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden px-8 py-32 lg:px-16 bg-white text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 font-serif text-4xl font-light leading-tight">Partner with a Trusted Authority</h2>
          <p className="mb-10 text-sm text-gray-500 leading-relaxed">
            From individual acquisitions to large-scale portfolio management, our advisory team is prepared to deliver results grounded in data and integrity.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/contact" className="bg-[#0f1f3d] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[#b89a5a] transition-colors">
                Contact Our Offices
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#080f1f] px-8 pt-20 pb-10 text-white lg:px-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <span className="font-serif text-2xl font-medium tracking-wider">Altis<span className="text-[#d4b87a]">.</span></span>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-white/40">The standard in professional real estate advisory. Licensed across 14 major metropolitan hubs.</p>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-[#d4b87a]">Corporate</h4>
            <ul className="space-y-3 text-sm font-light text-white/50">
              {['Services', 'Portfolio', 'Privacy Policy', 'Terms of Mandate'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex gap-4">
              {[SiInstagram, SiX].map((Icon, i) => (
                <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-[#b89a5a] hover:text-[#d4b87a] transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="mt-8 text-[10px] text-white/20 uppercase tracking-[0.2em]">© 2026 Altis Realty Group</p>
          </div>
        </div>
      </footer>
    </div>
  );
}