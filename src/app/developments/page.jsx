"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  MapPin, ArrowRight, Calendar, Building2,
  Home, TrendingUp, Users, Clock, ChevronDown,
  CheckCircle2, Star
} from 'lucide-react';
import { SiInstagram, SiX } from '@icons-pack/react-simple-icons';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
// type Status = 'Upcoming' | 'Under Construction' | 'Ready to Move';

const statusColor = {
  'Upcoming':           'bg-[#1b3160] text-white',
  'Under Construction': 'bg-[#b89a5a] text-white',
  'Ready to Move':      'bg-emerald-700 text-white',
};

const developments = [
  {
    id: 1,
    name: 'The Meridian Residences',
    tagline: 'Elevated living above the city skyline',
    status: 'Under Construction',
    loc: 'Downtown Los Angeles, CA',
    type: 'Luxury Apartments',
    units: 142,
    completion: 'Q3 2026',
    priceFrom: '680,000',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    features: ['Rooftop pool & lounge', 'Concierge service', 'EV charging', 'Smart home ready'],
    progress: 65,
    featured: true,
  },
  {
    id: 2,
    name: 'Solaris Gardens',
    tagline: 'Sustainable community living reimagined',
    status: 'Upcoming',
    loc: 'Pasadena, CA',
    type: 'Townhouses',
    units: 58,
    completion: 'Q1 2027',
    priceFrom: '1,150,000',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    features: ['Private garden per unit', 'Solar energy system', 'Community clubhouse', 'Gated community'],
    progress: 15,
    featured: false,
  },
  {
    id: 3,
    name: 'Pinnacle Tower',
    tagline: 'The new landmark of modern commerce',
    status: 'Ready to Move',
    loc: 'Beverly Hills, CA',
    type: 'Commercial & Mixed-Use',
    units: 36,
    completion: 'Delivered',
    priceFrom: '2,400,000',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    features: ['Grade-A office spaces', 'Retail ground floor', 'Underground parking', 'LEED certified'],
    progress: 100,
    featured: false,
  },
  {
    id: 4,
    name: 'Azure Shores',
    tagline: 'Beachfront luxury at its purest form',
    status: 'Upcoming',
    loc: 'Malibu, CA',
    type: 'Villas & Penthouses',
    units: 24,
    completion: 'Q4 2027',
    priceFrom: '4,800,000',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
    features: ['Private beach access', 'Infinity edge pool', 'Helipad', 'Butler service'],
    progress: 8,
    featured: false,
  },
  {
    id: 5,
    name: 'The Elm Quarter',
    tagline: 'Urban walkability meets family comfort',
    status: 'Under Construction',
    loc: 'Santa Monica, CA',
    type: 'Apartments',
    units: 210,
    completion: 'Q2 2026',
    priceFrom: '520,000',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    features: ['Gym & wellness center', 'Co-working spaces', 'Children\'s play area', 'Bike storage'],
    progress: 80,
    featured: false,
  },
  {
    id: 6,
    name: 'Verdant Heights',
    tagline: 'Where nature meets architectural excellence',
    status: 'Ready to Move',
    loc: 'Bel Air, CA',
    type: 'Luxury Villas',
    units: 12,
    completion: 'Delivered',
    priceFrom: '6,200,000',
    img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80',
    features: ['3,000m² private estate', 'Infinity pool & spa', 'Cinema & wine cellar', 'Smart estate system'],
    progress: 100,
    featured: false,
  },
];

const allStatuses = ['Upcoming', 'Under Construction', 'Ready to Move'];
const allTypes = ['All Types', 'Apartments', 'Villas & Penthouses', 'Townhouses', 'Commercial & Mixed-Use', 'Luxury Villas', 'Luxury Apartments'];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
const DevelopmentsPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeStatus, setActiveStatus] = useState('All');
  const [activeType, setActiveType] = useState('All Types');
  const [expanded, setExpanded] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const featured = developments.find(d => d.featured);
  const filtered = developments.filter(d => {
    const matchStatus = activeStatus === 'All' || d.status === activeStatus;
    const matchType = activeType === 'All Types' || d.type === activeType;
    return matchStatus && matchType;
  });

  return (
    <div className="min-h-screen bg-[#f7f6f3] font-sans text-[#0f1f3d] selection:bg-[#b89a5a] selection:text-white">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-300 lg:px-16 ${isScrolled ? 'bg-[#0f1f3d] py-4 shadow-xl' : 'bg-transparent'}`}>
        <Link href="/" className="font-serif text-2xl font-medium tracking-wider text-white">
          Altis<span className="text-[#d4b87a]">.</span>
        </Link>
        <ul className="hidden gap-10 lg:flex">
          {[
            { label: 'Properties', href: '/properties' },
            { label: 'Developments', href: '/developments' },
            { label: 'Services', href: '/our-services' },
            { label: 'About', href: '/about' },
          ].map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className={`text-[11px] font-normal uppercase tracking-[0.15em] transition-colors ${label === 'Developments' ? 'text-[#d4b87a]' : 'text-white/80 hover:text-[#d4b87a]'}`}>
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
      <div ref={heroRef} className="relative h-[55vh] min-h-[460px] overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(135deg, rgba(8,15,31,0.85) 0%, rgba(15,31,61,0.6) 50%, rgba(184,154,90,0.25) 100%), url('${featured.img}')` }}
        />
        {/* Diagonal accent */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#f7f6f3]" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
²²
        <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-20 lg:px-16">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#d4b87a]">Our Developments</p>
          <h1 className="font-serif text-5xl font-light leading-[1.1] text-white md:text-6xl">
            Projects Built<br />for <em className="not-italic text-[#d4b87a]">Tomorrow</em>
          </h1>
          <p className="mt-5 max-w-lg text-base font-light text-white/70">
            Curated developments across California — from intimate boutique residences to landmark towers, each delivered with precision and vision.
          </p>
        </div>

        {/* Stats strip floating over hero bottom */}
        <div className="absolute bottom-0 right-0 hidden lg:flex">
          {[
            { icon: Building2, num: '6', label: 'Active Projects' },
            { icon: Home, num: '482', label: 'Total Units' },
            { icon: TrendingUp, num: '$2.1B', label: 'Portfolio Value' },
            { icon: Users, num: '1,200+', label: 'Families Housed' },
          ].map(({ icon: Icon, num, label }, i) => (
            <div key={i} className="flex flex-col items-center border-l border-white/10 bg-[#0f1f3d]/90 backdrop-blur-sm px-8 py-5 text-center">
              <Icon size={18} className="mb-2 text-[#d4b87a]" />
              <span className="font-serif text-2xl text-white">{num}</span>
              <span className="mt-0.5 text-[9px] uppercase tracking-widest text-white/40">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURED PROJECT ── */}
      <section className="px-8 py-20 lg:px-16">
        <div className="mb-6 flex items-center gap-3">
          <Star size={14} className="text-[#b89a5a]" fill="#b89a5a" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b89a5a]">Featured Development</span>
        </div>

        <div className="group relative grid overflow-hidden rounded-sm bg-[#0f1f3d] lg:grid-cols-[1fr_420px]">
          {/* Image */}
          <div className="relative h-72 overflow-hidden lg:h-auto">
            <img src={featured.img} alt={featured.name} className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f3d]/50 to-transparent" />
            {/* Progress overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Construction Progress</span>
                <span className="font-serif text-xl text-[#d4b87a]">{featured.progress}%</span>
              </div>
              <div className="h-1 w-full rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#d4b87a] transition-all duration-1000" style={{ width: `${featured.progress}%` }} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between p-10">
            <div>
              <span className={`inline-block rounded-sm px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${statusColor[featured.status]}`}>
                {featured.status}
              </span>
              <h2 className="mt-4 font-serif text-3xl font-light text-white">{featured.name}</h2>
              <p className="mt-2 text-sm font-light text-white/50 italic">"{featured.tagline}"</p>

              <div className="mt-6 flex items-center gap-2 text-sm text-white/50">
                <MapPin size={13} className="text-[#b89a5a]" /> {featured.loc}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { label: 'Type', val: featured.type },
                  { label: 'Units', val: featured.units },
                  { label: 'Completion', val: featured.completion },
                  { label: 'Starting From', val: `$${featured.priceFrom}` },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#b89a5a]">{label}</p>
                    <p className="mt-1 text-sm font-medium text-white">{val}</p>
                  </div>
                ))}
              </div>

              <ul className="mt-8 space-y-2">
                {featured.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/60">
                    <CheckCircle2 size={13} className="flex-shrink-0 text-[#b89a5a]" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex gap-3">
              <Link href={`/developments/${featured.id}`} className="flex items-center gap-2 rounded-sm bg-[#b89a5a] px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#d4b87a] transition-colors">
                Explore Project <ArrowRight size={13} />
              </Link>
              <a href="#contact" className="flex items-center gap-2 rounded-sm border border-white/20 px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-white/70 hover:border-white/50 hover:text-white transition-all">
                Register Interest
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="sticky top-[72px] z-30 border-y border-gray-200 bg-white/90 backdrop-blur-md px-8 py-4 lg:px-16">
        <div className="flex flex-wrap items-center gap-3">
          {/* Status filters */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveStatus('All')}
              className={`rounded-sm px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeStatus === 'All' ? 'bg-[#0f1f3d] text-white' : 'border border-gray-200 text-gray-500 hover:border-gray-400'}`}
            >
              All
            </button>
            {allStatuses.map(s => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`rounded-sm px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeStatus === s ? statusColor[s] : 'border border-gray-200 text-gray-500 hover:border-gray-400'}`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden h-6 w-px bg-gray-200 md:block" />

          {/* Type select */}
          <div className="relative">
            <select
              value={activeType}
              onChange={e => setActiveType(e.target.value)}
              className="appearance-none rounded-sm border border-gray-200 bg-white py-2 pl-4 pr-8 text-[10px] font-bold uppercase tracking-widest text-gray-600 outline-none hover:border-gray-400 cursor-pointer"
            >
              {allTypes.map(t => <option key={t}>{t}</option>)}
            </select>
            <ChevronDown size={11} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <span className="ml-auto text-[10px] uppercase tracking-widest text-gray-400">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="px-8 py-16 lg:px-16">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <Building2 size={40} className="mb-4 text-gray-300" />
            <p className="font-serif text-2xl text-gray-400">No projects match your filters</p>
            <button onClick={() => { setActiveStatus('All'); setActiveType('All Types'); }} className="mt-6 border-b border-[#b89a5a] pb-1 text-[11px] font-bold uppercase tracking-widest text-[#b89a5a]">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((dev) => (
              <div key={dev.id} className="group flex flex-col overflow-hidden rounded-sm bg-white shadow-sm border border-gray-100 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img src={dev.thumb} alt={dev.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3d]/50 to-transparent" />

                  {/* Status badge */}
                  <span className={`absolute top-4 left-4 rounded-sm px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${statusColor[dev.status]}`}>
                    {dev.status}
                  </span>

                  {/* Completion */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-white/70">
                        <Clock size={10} /> {dev.completion}
                      </div>
                      <span className="text-[10px] font-bold text-[#d4b87a]">{dev.progress}%</span>
                    </div>
                    <div className="h-0.5 w-full rounded-full bg-white/20">
                      <div className="h-full rounded-full bg-[#d4b87a]" style={{ width: `${dev.progress}%` }} />
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-1 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#b89a5a]">
                    <Building2 size={10} /> {dev.type}
                  </div>
                  <h3 className="font-serif text-xl font-normal">{dev.name}</h3>
                  <p className="mt-1 text-xs font-light italic text-gray-400">"{dev.tagline}"</p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                    <MapPin size={11} className="text-[#b89a5a]" /> {dev.loc}
                  </div>

                  {/* Quick facts */}
                  <div className="my-5 grid grid-cols-2 gap-3">
                    <div className="rounded-sm bg-[#f7f6f3] px-3 py-2.5">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#b89a5a]">Units</p>
                      <p className="mt-0.5 font-serif text-lg">{dev.units}</p>
                    </div>
                    <div className="rounded-sm bg-[#f7f6f3] px-3 py-2.5">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#b89a5a]">Starting From</p>
                      <p className="mt-0.5 font-serif text-lg"><sup className="text-xs">$</sup>{dev.priceFrom}</p>
                    </div>
                  </div>

                  {/* Expandable features */}
                  <button
                    onClick={() => setExpanded(expanded === dev.id ? null : dev.id)}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#1b3160] hover:text-[#b89a5a] transition-colors mb-3"
                  >
                    <ChevronDown size={13} className={`transition-transform ${expanded === dev.id ? 'rotate-180' : ''}`} />
                    {expanded === dev.id ? 'Hide' : 'Show'} Features
                  </button>

                  {expanded === dev.id && (
                    <ul className="mb-4 space-y-1.5">
                      {dev.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                          <CheckCircle2 size={12} className="flex-shrink-0 text-[#b89a5a]" /> {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <div className="mt-auto flex gap-2.5 pt-2">
                    <Link href={`/developments/${dev.id}`} className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-[#0f1f3d] py-3 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors">
                      View Details <ArrowRight size={11} />
                    </Link>
                    <button className="rounded-sm border border-gray-200 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:border-[#b89a5a] hover:text-[#b89a5a] transition-all">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── PROCESS SECTION ── */}
      <section className="bg-[#0f1f3d] px-8 py-24 lg:px-16">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d4b87a]">How It Works</p>
          <h2 className="font-serif text-4xl font-light text-white">Your Journey with Altis</h2>
        </div>

        <div className="relative grid gap-8 md:grid-cols-4">
          {/* Connecting line */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] hidden h-px bg-white/10 md:block" />

          {[
            { step: '01', title: 'Browse Developments', desc: 'Explore our curated pipeline of upcoming, ongoing, and completed projects.' },
            { step: '02', title: 'Register Interest', desc: 'Submit your interest and our team contacts you within 24 hours with full details.' },
            { step: '03', title: 'Site Visit & Walkthrough', desc: 'We arrange a private tour or virtual walkthrough with your dedicated advisor.' },
            { step: '04', title: 'Secure Your Unit', desc: 'We guide you through reservation, financing, and all paperwork until handover.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex flex-col items-center text-center">
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#b89a5a]/40 bg-[#0f1f3d] font-serif text-2xl text-[#d4b87a]">
                {step}
              </div>
              <h3 className="mb-3 font-serif text-lg font-light text-white">{title}</h3>
              <p className="text-sm font-light leading-relaxed text-white/40">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── REGISTER INTEREST FORM ── */}
      <section id="contact" className="bg-[#f7f6f3] px-8 py-24 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#b89a5a]">Be First in Line</p>
          <h2 className="mb-4 font-serif text-4xl font-light">Register Your Interest</h2>
          <p className="mb-12 text-gray-500">Get priority access to new launches, exclusive pricing, and early-bird floor plan selection before public release.</p>

          <RegisterForm />
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
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-[#d4b87a]">Developments</h4>
            <ul className="space-y-3 text-sm font-light text-white/50">
              {['Upcoming', 'Under Construction', 'Ready to Move', 'Completed'].map(item => (
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
};

/* ─────────────────────────────────────────────
   REGISTER FORM COMPONENT
───────────────────────────────────────────── */
const RegisterForm = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', project: '', budget: '' });

  const handle = (e) => { e.preventDefault(); setSent(true); };

  if (sent) return (
    <div className="flex flex-col items-center gap-4 py-10">
      <CheckCircle2 size={48} className="text-[#b89a5a]" />
      <p className="font-serif text-2xl">You're on the list!</p>
      <p className="text-gray-500">Our team will reach out within 24 hours with priority access details.</p>
    </div>
  );

  return (
    <form onSubmit={handle} className="space-y-4 text-left">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#b89a5a]">Full Name</label>
          <input required type="text" placeholder="John Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full rounded-sm border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#b89a5a] transition-colors placeholder:text-gray-400" />
        </div>
        <div>
          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#b89a5a]">Phone</label>
          <input required type="tel" placeholder="+1 (310) 000-0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="w-full rounded-sm border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#b89a5a] transition-colors placeholder:text-gray-400" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#b89a5a]">Email</label>
        <input required type="email" placeholder="john@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full rounded-sm border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#b89a5a] transition-colors placeholder:text-gray-400" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#b89a5a]">Project of Interest</label>
          <select required value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))}
            className="w-full rounded-sm border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#b89a5a] transition-colors text-gray-600">
            <option value="">Select a project...</option>
            {developments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            <option value="Any">Open to any project</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#b89a5a]">Budget Range</label>
          <select value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
            className="w-full rounded-sm border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#b89a5a] transition-colors text-gray-600">
            <option value="">Select budget...</option>
            <option>Under $500K</option>
            <option>$500K – $1M</option>
            <option>$1M – $3M</option>
            <option>$3M – $6M</option>
            <option>$6M+</option>
          </select>
        </div>
      </div>
      <button type="submit" className="mt-2 flex w-full items-center justify-center gap-2 rounded-sm bg-[#0f1f3d] py-4 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors">
        <Calendar size={14} /> Register My Interest
      </button>
      <p className="text-center text-[10px] text-gray-400">Your information is private and will never be shared with third parties.</p>
    </form>
  );
};

export default DevelopmentsPage;