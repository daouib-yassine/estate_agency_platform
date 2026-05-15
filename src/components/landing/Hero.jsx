import React from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden text-center">
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
          We connect property owners with serious buyers, managing the entire process with precision and care.
        </p>

        {/* Search Bar */}
        <div className="mx-auto flex flex-col overflow-hidden rounded-md bg-white shadow-2xl md:max-w-3xl md:flex-row">
          <div className="flex-1 border-b border-gray-200 p-4 text-left hover:bg-gray-50 md:border-b-0 md:border-r">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#b89a5a]">Location</label>
            <input type="text" placeholder="City or Area..." className="w-full bg-transparent text-sm outline-none" />
          </div>
          <div className="flex-1 border-b border-gray-200 p-4 text-left hover:bg-gray-50 md:border-b-0 md:border-r">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#b89a5a]">Property Type</label>
            <select className="w-full bg-transparent text-sm outline-none">
              <option>Any Type</option>
              <option>Apartment</option>
              <option>Villa</option>
            </select>
          </div>
          <button className="flex items-center justify-center gap-2 bg-[#0f1f3d] px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#b89a5a]">
            <Search size={16} /> Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;