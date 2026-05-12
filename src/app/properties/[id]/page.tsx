"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MapPin, Bed, Bath, Square, Heart, Share2, Phone, Mail,
  Calendar, ChevronLeft, ChevronRight, CheckCircle2, ArrowLeft,
  Eye, Maximize2, Car, Wind, Wifi, ShieldCheck
} from 'lucide-react';
import { SiInstagram, SiX } from '@icons-pack/react-simple-icons';

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const property = {
  id: 1,
  name: 'Elysian Heights Villa',
  tag: 'For Sale',
  isRent: false,
  price: '2,450,000',
  loc: 'Beverly Hills, CA 90210',
  beds: 5,
  baths: 4,
  sqft: 620,
  floors: 3,
  year: 2019,
  garage: 2,
  description: `Nestled in the prestigious hills of Beverly Hills, Elysian Heights is a masterpiece of contemporary architecture blended with timeless elegance. Expansive floor-to-ceiling windows frame breathtaking panoramic views of the city, flooding every room with natural light.

The open-plan living area flows seamlessly onto a spacious terrace, while the chef's kitchen — outfitted with professional-grade appliances and custom cabinetry — is designed for both daily living and grand entertaining. The primary suite is a sanctuary unto itself, complete with a spa-inspired bathroom and walk-in wardrobe.`,
  features: [
    'Heated infinity pool',
    'Smart home automation',
    'Private cinema room',
    'Wine cellar',
    'Staff quarters',
    'Landscaped garden',
    'Security system',
    'Electric vehicle charging',
  ],
  amenities: [
    { icon: Wind, label: 'Central A/C' },
    { icon: Car, label: '2-Car Garage' },
    { icon: Wifi, label: 'Fiber Internet' },
    { icon: ShieldCheck, label: '24/7 Security' },
  ],
  images: [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
    'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=85',
  ],
  agent: {
    name: 'Sophia Laurent',
    title: 'Senior Property Advisor',
    phone: '+1 (310) 555-0190',
    email: 'sophia@altisrealty.com',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    listings: 48,
    years: 12,
  },
};

const related = [
  {
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    price: '1,870,000', name: 'Solstice Manor', loc: 'Bel Air, CA', beds: 4, baths: 3, sqft: 490, isRent: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
    price: '3,100,000', name: 'Pinnacle Estate', loc: 'Malibu, CA', beds: 6, baths: 5, sqft: 780, isRent: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80',
    price: '9,200', name: 'Azure Penthouse', loc: 'Santa Monica, CA', beds: 3, baths: 2, sqft: 210, isRent: true,
  },
];

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const PropertyDetails = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: 'I am interested in this property and would like to schedule a visit.' });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const prev = () => setActiveImg(i => (i - 1 + property.images.length) % property.images.length);
  const next = () => setActiveImg(i => (i + 1) % property.images.length);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#0f1f3d] selection:bg-[#b89a5a] selection:text-white">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-300 lg:px-16 ${isScrolled ? 'bg-[#0f1f3d] py-4 shadow-xl' : 'bg-transparent'}`}>
        <a href="#" className="font-serif text-2xl font-medium tracking-wider text-white">
          Altis<span className="text-[#d4b87a]">.</span>
        </a>
        <ul className="hidden gap-10 lg:flex">
          {[{ label: 'Properties', href: '/properties' }, { label: 'Developments', href: '/developments' }, { label: 'Services', href: '#' }, { label: 'About', href: '#' }].map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className="text-[11px] font-normal uppercase tracking-[0.15em] text-white/80 transition-colors hover:text-[#d4b87a]">{label}</Link>
            </li>
          ))}
        </ul>
        <a href="/contact" className="rounded-sm border border-white/40 px-6 py-2.5 text-[11px] font-medium uppercase tracking-widest text-white transition-all hover:bg-[#b89a5a] hover:border-[#b89a5a]">Contact Us</a>
      </nav>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95" onClick={() => setLightbox(false)}>
          <button onClick={e => { e.stopPropagation(); prev(); }} className="absolute left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10">
            <ChevronLeft size={20} />
          </button>
          <img src={property.images[activeImg]} alt="" className="max-h-[85vh] max-w-[90vw] object-contain" onClick={e => e.stopPropagation()} />
          <button onClick={e => { e.stopPropagation(); next(); }} className="absolute right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10">
            <ChevronRight size={20} />
          </button>
          <button onClick={() => setLightbox(false)} className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl">✕</button>
          <div className="absolute bottom-6 text-white/40 text-sm tracking-widest">{activeImg + 1} / {property.images.length}</div>
        </div>
      )}

      {/* ── IMAGE GALLERY ── */}
      <div className="relative h-[60vh] min-h-[480px] overflow-hidden bg-[#0f1f3d] pt-0">
        {/* Main image */}
        <img
          src={property.images[activeImg]}
          alt={property.name}
          className="h-full w-full object-cover opacity-90 transition-all duration-700 cursor-zoom-in"
          onClick={() => setLightbox(true)}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3d]/60 via-transparent to-[#0f1f3d]/30 pointer-events-none" />

        {/* Nav arrows */}
        <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all">
          <ChevronLeft size={18} />
        </button>
        <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all">
          <ChevronRight size={18} />
        </button>

        {/* Top-left: back + tag */}
        <div className="absolute top-24 left-8 flex items-center gap-4 lg:left-16">
          <Link href="/properties" className="flex items-center gap-2 rounded-sm bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-white/20 transition-all">
            <ArrowLeft size={13} /> Back
          </Link>
          <span className={`rounded-sm px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white ${property.isRent ? 'bg-[#b89a5a]' : 'bg-[#0f1f3d] border border-white/30'}`}>
            {property.tag}
          </span>
        </div>

        {/* Top-right: actions */}
        <div className="absolute top-24 right-8 flex gap-3 lg:right-16">
          <button onClick={() => setSaved(s => !s)} className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-all ${saved ? 'bg-[#b89a5a] border-[#b89a5a] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            <Heart size={15} fill={saved ? 'white' : 'none'} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all">
            <Share2 size={15} />
          </button>
          <button onClick={() => setLightbox(true)} className="flex items-center gap-2 rounded-sm border border-white/20 bg-white/10 backdrop-blur-sm px-4 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-white/20 transition-all">
            <Maximize2 size={13} /> <span className="hidden sm:inline">View All</span> {property.images.length}
          </button>
        </div>

        {/* Bottom thumbnail strip */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5">
          {property.images.map((src, i) => (
            <button key={i} onClick={() => setActiveImg(i)} className={`h-14 w-20 overflow-hidden rounded-sm border-2 transition-all duration-300 ${i === activeImg ? 'border-[#d4b87a] opacity-100' : 'border-white/20 opacity-50 hover:opacity-80'}`}>
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="mx-auto max-w-[1280px] px-6 py-14 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

          {/* LEFT COLUMN */}
          <div>

            {/* Title & Price */}
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#b89a5a]">Ref: ALT-{property.id.toString().padStart(4, '0')}</p>
                <h1 className="font-serif text-4xl font-normal leading-tight">{property.name}</h1>
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={14} className="text-[#b89a5a]" /> {property.loc}
                </div>
              </div>
              <div className="text-right">
                <div className="font-serif text-4xl font-semibold text-[#0f1f3d]">
                  <sup className="text-xl font-normal">$</sup>{property.price}
                  {property.isRent && <span className="text-base font-light text-gray-400">/mo</span>}
                </div>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-gray-400">Negotiable</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-gray-100 bg-gray-100 sm:grid-cols-4">
              {[
                { icon: Bed, val: `${property.beds} Beds`, sub: 'Bedrooms' },
                { icon: Bath, val: `${property.baths} Baths`, sub: 'Bathrooms' },
                { icon: Square, val: `${property.sqft} m²`, sub: 'Living Area' },
                { icon: Car, val: `${property.garage} Cars`, sub: 'Garage' },
              ].map(({ icon: Icon, val, sub }) => (
                <div key={sub} className="flex flex-col items-center bg-white py-6 px-4 text-center">
                  <Icon size={20} className="mb-2 text-[#b89a5a]" />
                  <span className="font-serif text-xl font-medium">{val}</span>
                  <span className="mt-0.5 text-[10px] uppercase tracking-widest text-gray-400">{sub}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-10 h-px bg-gray-100" />

            {/* Description */}
            <div>
              <h2 className="mb-5 font-serif text-2xl font-normal">About This Property</h2>
              {property.description.split('\n\n').map((para, i) => (
                <p key={i} className="mb-4 leading-relaxed text-gray-600">{para}</p>
              ))}
            </div>

            {/* Divider */}
            <div className="my-10 h-px bg-gray-100" />

            {/* Details Grid */}
            <div>
              <h2 className="mb-6 font-serif text-2xl font-normal">Property Details</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: 'Property Type', val: 'Villa' },
                  { label: 'Status', val: property.tag },
                  { label: 'Year Built', val: property.year },
                  { label: 'Floors', val: property.floors },
                  { label: 'Living Area', val: `${property.sqft} m²` },
                  { label: 'Garage', val: `${property.garage} spaces` },
                ].map(({ label, val }) => (
                  <div key={label} className="rounded-sm border border-gray-100 bg-[#f7f6f3] px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#b89a5a]">{label}</p>
                    <p className="mt-1 text-sm font-medium text-[#0f1f3d]">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="my-10 h-px bg-gray-100" />

            {/* Features */}
            <div>
              <h2 className="mb-6 font-serif text-2xl font-normal">Features & Amenities</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                {property.features.map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="flex-shrink-0 text-[#b89a5a]" />
                    <span className="text-sm text-gray-600">{f}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {property.amenities.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 rounded-sm border border-gray-100 py-5 text-center">
                    <Icon size={22} className="text-[#b89a5a]" />
                    <span className="text-[11px] font-medium uppercase tracking-wider text-gray-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="my-10 h-px bg-gray-100" />

            {/* Map placeholder */}
            <div>
              <h2 className="mb-6 font-serif text-2xl font-normal">Location</h2>
              <div className="relative h-72 overflow-hidden rounded-sm bg-[#e8e5df]">
                <iframe
                  title="map"
                  className="h-full w-full border-0 grayscale"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26430.393553120906!2d-118.43209!3d34.08896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc35cdb5a569%3A0x3c69ff2568b0a45a!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 rounded-sm bg-white px-4 py-2 shadow-lg text-[11px] font-bold uppercase tracking-widest text-[#0f1f3d]">
                  Beverly Hills, CA
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">

            {/* Agent Card */}
            <div className="sticky top-28">
              <div className="rounded-sm border border-gray-100 bg-white shadow-xl overflow-hidden">

                {/* Agent header */}
                <div className="bg-[#0f1f3d] px-6 py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4b87a]">Your Dedicated Agent</p>
                </div>

                <div className="px-6 py-6">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={property.agent.img} alt={property.agent.name} className="h-16 w-16 rounded-full object-cover object-top border-2 border-[#b89a5a]/30" />
                    <div>
                      <p className="font-serif text-lg font-medium">{property.agent.name}</p>
                      <p className="text-[11px] text-[#b89a5a] uppercase tracking-wider">{property.agent.title}</p>
                      <div className="mt-1.5 flex gap-4 text-[10px] text-gray-400 uppercase tracking-widest">
                        <span>{property.agent.listings} listings</span>
                        <span>{property.agent.years} yrs exp.</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <a href={`tel:${property.agent.phone}`} className="flex items-center gap-3 rounded-sm border border-gray-100 bg-[#f7f6f3] px-4 py-3 text-sm font-medium text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white hover:border-[#0f1f3d] transition-all">
                      <Phone size={14} className="text-[#b89a5a]" /> {property.agent.phone}
                    </a>
                    <a href={`mailto:${property.agent.email}`} className="flex items-center gap-3 rounded-sm border border-gray-100 bg-[#f7f6f3] px-4 py-3 text-sm font-medium text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white hover:border-[#0f1f3d] transition-all">
                      <Mail size={14} className="text-[#b89a5a]" /> {property.agent.email}
                    </a>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 mb-6" />

                  {/* Contact Form */}
                  {formSent ? (
                    <div className="flex flex-col items-center gap-3 py-6 text-center">
                      <CheckCircle2 size={36} className="text-[#b89a5a]" />
                      <p className="font-serif text-lg">Request Sent!</p>
                      <p className="text-sm text-gray-500">Our agent will contact you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b89a5a] mb-4">Schedule a Visit</p>
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        required
                        value={formData.name}
                        onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                        className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-4 py-3 text-sm outline-none focus:border-[#b89a5a] transition-colors placeholder:text-gray-400"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={e => setFormData(d => ({ ...d, phone: e.target.value }))}
                        className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-4 py-3 text-sm outline-none focus:border-[#b89a5a] transition-colors placeholder:text-gray-400"
                      />
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                        className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-4 py-3 text-sm outline-none focus:border-[#b89a5a] transition-colors resize-none"
                      />
                      <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#0f1f3d] px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#b89a5a]">
                        <Calendar size={14} /> Request a Visit
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Views indicator */}
              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-400">
                <Eye size={13} /> <span>187 people viewed this property</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RELATED PROPERTIES ── */}
        <div className="mt-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b89a5a]">You May Also Like</p>
              <h2 className="font-serif text-3xl font-normal">Similar Properties</h2>
            </div>
            <Link href="/properties" className="border-b border-[#b89a5a] pb-1 text-[11px] font-bold uppercase tracking-widest text-[#1b3160] hover:text-[#b89a5a] transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((r, i) => (
              <div key={i} className="group cursor-pointer rounded-sm bg-white shadow-sm border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-52 overflow-hidden">
                  <img src={r.img} alt={r.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className={`absolute top-3 left-3 rounded-sm px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white ${r.isRent ? 'bg-[#b89a5a]' : 'bg-[#0f1f3d]'}`}>
                    {r.isRent ? 'For Rent' : 'For Sale'}
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-serif text-xl font-semibold">
                    <sup className="text-xs font-normal">$</sup>{r.price}
                    {r.isRent && <span className="text-xs font-light text-gray-400">/mo</span>}
                  </div>
                  <h3 className="mt-1 text-sm font-medium">{r.name}</h3>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-400">
                    <MapPin size={11} className="text-[#b89a5a]" /> {r.loc}
                  </div>
                  <div className="my-4 h-px bg-gray-100" />
                  <div className="flex gap-4 text-gray-500">
                    <span className="flex items-center gap-1.5 text-[11px]"><Bed size={12} className="text-[#b89a5a]" /> {r.beds} Beds</span>
                    <span className="flex items-center gap-1.5 text-[11px]"><Bath size={12} className="text-[#b89a5a]" /> {r.baths} Baths</span>
                    <span className="flex items-center gap-1.5 text-[11px]"><Square size={12} className="text-[#b89a5a]" /> {r.sqft} m²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="mt-24 bg-[#080f1f] px-8 pt-20 pb-10 text-white lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#" className="font-serif text-2xl font-medium tracking-wider">Altis<span className="text-[#d4b87a]">.</span></a>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-white/40">Your trusted partner in premium real estate across the United States and beyond.</p>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-[#d4b87a]">Properties</h4>
            <ul className="space-y-3 text-sm font-light text-white/50">
              {['For Sale', 'For Rent', 'Developments', 'Commercial'].map(item => (
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

export default PropertyDetails;