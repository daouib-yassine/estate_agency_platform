"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Bed, Bath, Square } from 'lucide-react';
import { SiInstagram, SiX } from '@icons-pack/react-simple-icons';
const AltisLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#0f1f3d] selection:bg-[#b89a5a] selection:text-white">
      
      {/* --- NAVIGATION --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-300 lg:px-16 ${isScrolled ? 'bg-[#0f1f3d] py-4 shadow-xl' : 'bg-transparent'}`}>
        <a href="#" className="font-serif text-2xl font-medium tracking-wider text-white">
          Altis<span className="text-[#d4b87a]">.</span>
        </a>
        
        <ul className="hidden gap-10 lg:flex">
          {[
            { label: 'Properties', href: '/properties' },
            { label: 'Developments', href: '/developments' },
            { label: 'Services', href: '/services_page' },
            { label: 'About', href: '/about' },
          ].map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className="text-[11px] font-normal uppercase tracking-[0.15em] text-white/80 transition-colors hover:text-[#d4b87a]">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <a href="/contact" className="rounded-sm border border-white/40 px-6 py-2.5 text-[11px] font-medium uppercase tracking-widest text-white transition-all hover:bg-[#b89a5a] hover:border-[#b89a5a]">
          Contact Us
        </a>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden text-center">
        {/* Background with Zoom Animation */}
        <div 
          className="absolute inset-0 z-0 scale-105 animate-[subtleZoom_15s_ease-out_forwards] bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(10,20,45,0.65), rgba(10,20,45,0.4), rgba(10,20,45,0.75)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85')` 
          }}
        />

        <div className="relative z-10 max-w-4xl px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#d4b87a]">
            Premium Real Estate Since 1998
          </p>
          <h1 className="mb-6 font-serif text-5xl font-light leading-[1.1] text-white md:text-7xl">
            Your Trusted Partner<br />in <em className="not-italic text-[#d4b87a]">Real Estate</em>
          </h1>
          <p className="mx-auto mb-12 max-w-xl text-lg font-light leading-relaxed text-white/80">
            We connect property owners with serious buyers, managing the entire process from listing to closing with precision and care.
          </p>

          {/* Search Bar */}
          <div className="mx-auto flex flex-col overflow-hidden rounded-md bg-white shadow-2xl md:max-w-3xl md:flex-row">
            <div className="flex-1 border-b border-gray-200 p-4 text-left transition-colors hover:bg-gray-50 md:border-b-0 md:border-r">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#b89a5a]">Location</label>
              <input type="text" placeholder="City or Area..." className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400" />
            </div>
            <div className="flex-1 border-b border-gray-200 p-4 text-left transition-colors hover:bg-gray-50 md:border-b-0 md:border-r">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#b89a5a]">Property Type</label>
              <select className="w-full bg-transparent text-sm outline-none">
                <option>Any Type</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Office</option>
              </select>
            </div>
            <button className="flex items-center justify-center gap-2 bg-[#0f1f3d] px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#b89a5a]">
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* --- STATS --- */}
      <section className="grid grid-cols-2 bg-[#0f1f3d] md:grid-cols-4">
        {[
          { num: '1,800+', label: 'Properties Listed' },
          { num: '98%', label: 'Client Satisfaction' },
          { num: '25 yrs', label: 'Market Experience' },
          { num: '14', label: 'Cities Covered' },
        ].map((stat, i) => (
          <div key={i} className="border-r border-white/10 py-10 text-center last:border-r-0">
            <div className="font-serif text-4xl text-[#d4b87a]">{stat.num}</div>
            <div className="mt-2 text-[10px] uppercase tracking-widest text-white/50">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* --- FEATURED PROPERTIES --- */}
      <section className="bg-[#f7f6f3] px-8 py-24 lg:px-16">
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#b89a5a]">Handpicked Selection</p>
            <h2 className="font-serif text-4xl font-normal">Our Featured Properties</h2>
          </div>
          <Link href="/properties" className="border-b border-[#b89a5a] pb-1 text-[11px] font-bold uppercase tracking-widest text-[#1b3160] transition-colors hover:text-[#b89a5a]">
            View All Listings →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <PropertyCard 
            img="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
            price="2,450,000"
            name="Elysian Heights Villa"
            loc="Beverly Hills, CA"
            beds="5" baths="4" sqft="620"
            tag="For Sale"
            isRent={false}
          />
          <PropertyCard 
            img="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
            price="8,500"
            name="Meridian Sky Apartments"
            loc="Manhattan, New York"
            beds="3" baths="2" sqft="185"
            tag="For Rent"
            isRent={true}
          />
          <PropertyCard 
            img="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
            price="4,200,000"
            name="Nexus Tower — Office"
            loc="Downtown Miami, FL"
            beds="12" baths="3" sqft="840"
            tag="For Sale"
            isRent={false}
          />
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#080f1f] px-8 pt-20 pb-10 text-white lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-1">
            <a href="#" className="font-serif text-2xl font-medium tracking-wider">Altis<span className="text-[#d4b87a]">.</span></a>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-white/40">
              Your trusted partner in premium real estate across the United States and beyond.
            </p>
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

interface PropertyCardProps {
  img: string;
  price: string;
  name: string;
  loc: string;
  beds: string;
  baths: string;
  sqft: string;
  tag: string;
  isRent: boolean;
}

const PropertyCard = ({ img, price, name, loc, beds, baths, sqft, tag, isRent }: PropertyCardProps) => (
  <div className="group cursor-pointer rounded-sm bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
    <div className="relative h-64 overflow-hidden">
      <img src={img} alt={name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <span className={`absolute top-4 left-4 rounded-px px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white ${isRent ? 'bg-[#b89a5a]' : 'bg-[#0f1f3d]'}`}>
        {tag} 
      </span>
      <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm shadow-sm transition-colors hover:bg-white">
        ♡
      </div>
    </div>
    <div className="p-6">
      <div className="font-serif text-2xl font-semibold">
        <sup className="text-sm font-normal">$</sup>{price}{isRent && <span className="text-sm font-light text-gray-400">/mo</span>}
      </div>
      <h3 className="mt-1 text-[15px] font-medium">{name}</h3>
      <div className="mt-2 flex items-center gap-1.5 text-sm font-light text-gray-400">
        <MapPin size={12} className="text-[#b89a5a]" /> {loc}
      </div>
      <div className="my-5 h-px bg-gray-100" />
      <div className="flex gap-5 text-gray-600">
        <div className="flex items-center gap-2 text-[12px]"><Bed size={14} className="text-[#b89a5a]" /> {beds} Beds</div>
        <div className="flex items-center gap-2 text-[12px]"><Bath size={14} className="text-[#b89a5a]" /> {baths} Baths</div>
        <div className="flex items-center gap-2 text-[12px]"><Square size={14} className="text-[#b89a5a]" /> {sqft} m²</div>
      </div>
    </div>
  </div>
);

export default AltisLanding;