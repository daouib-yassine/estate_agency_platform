import React from 'react';
import { PROPERTY_DETAILS } from '@/constants/landing';
import Navbar from '../../../components/Navbar';

const PropertyDetails = () => {
  const p = PROPERTY_DETAILS;

  return (
    <div className="bg-[#f7f6f3] min-h-screen text-[#0f1f3d]">
      <Navbar />
      {/* ── GALLERY SECTION (Modern Asymmetric Grid) ── */}
      <section className="grid grid-cols-1 md:grid-cols-4 md:h-[600px] gap-2 p-2">
        <div className="md:col-span-2 overflow-hidden rounded-l-lg">
          <img src={p.images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Main" />
        </div>
        <div className="md:col-span-1 grid grid-rows-2 gap-2">
          <img src={p.images[1]} className="w-full h-full object-cover" alt="Interior 1" />
          <img src={p.images[2]} className="w-full h-full object-cover" alt="Interior 2" />
        </div>
        <div className="md:col-span-1 relative overflow-hidden rounded-r-lg group">
          <img src={p.images[0]} className="w-full h-full object-cover brightness-50" alt="More" />
          <button className="absolute inset-0 flex items-center justify-center text-white font-medium uppercase tracking-widest text-sm">
            View All 24 Photos
          </button>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Info */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="inline-block bg-[#0f1f3d] text-white text-[10px] px-3 py-1 uppercase tracking-widest mb-4">Featured Listing</span>
              <h1 className="font-serif text-4xl md:text-5xl font-light mb-2">{p.title}</h1>
              <p className="text-[#8e8b86] flex items-center gap-2">
                <svg className="w-4 h-4 text-[#b89a5a]" fill="currentColor" viewBox="0 0 20 20"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" /></svg>
                {p.location}
              </p>
            </div>
            <div className="text-right">
              <div className="font-serif text-3xl font-semibold text-[#b89a5a]">${p.price}</div>
              <p className="text-[10px] uppercase text-[#8e8b86] tracking-widest">Est. Mortgage: $18,400/mo</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-[#e8e6e2] mb-10">
            <Spec label="Bedrooms" value={p.specs.beds} />
            <Spec label="Bathrooms" value={p.specs.baths} />
            <Spec label="Living Area" value={p.specs.area} />
            <Spec label="Year Built" value={p.specs.year} />
          </div>

          <section className="mb-12">
            <h2 className="font-serif text-2xl mb-4">About This Property</h2>
            <p className="text-[#4a4845] leading-relaxed font-light">{p.description}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-6">Premium Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
              {p.amenities.map(a => (
                <div key={a} className="flex items-center gap-3 text-sm text-[#4a4845]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#b89a5a]" /> {a}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Contact Sidebar */}
        {/* <aside className="lg:col-span-1">
          <div className="sticky top-[100px] bg-white p-8 rounded-lg shadow-sm border border-[#e8e6e2]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#f0eff0] overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=julian" alt="Agent" />
              </div>
              <div>
                <h4 className="font-medium text-[#0f1f3d]">{p.agent.name}</h4>
                <p className="text-[11px] uppercase text-[#8e8b86] tracking-wider">{p.agent.role}</p>
              </div>
            </div>

            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full border border-[#d8d5d0] rounded p-3 text-sm outline-none focus:border-[#0f1f3d]" />
              <input type="email" placeholder="Email Address" className="w-full border border-[#d8d5d0] rounded p-3 text-sm outline-none focus:border-[#0f1f3d]" />
              <textarea placeholder="I'm interested in this property..." rows={4} className="w-full border border-[#d8d5d0] rounded p-3 text-sm outline-none focus:border-[#0f1f3d]" />
              <button className="w-full bg-[#0f1f3d] text-white py-4 rounded font-medium uppercase tracking-widest text-[11px] hover:bg-[#b89a5a] transition-all">
                Request Private Viewing
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#e8e6e2] text-center">
              <a href={`tel:${p.agent.phone}`} className="text-sm font-medium text-[#0f1f3d] hover:text-[#b89a5a]">
                Direct Line: {p.agent.phone}
              </a>
            </div>
          </div>
        </aside> */}
      </main>
    </div>
  );
};

const Spec = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <p className="text-[10px] uppercase text-[#8e8b86] tracking-widest mb-1">{label}</p>
    <p className="text-lg font-medium">{value}</p>
  </div>
);

export default PropertyDetails;