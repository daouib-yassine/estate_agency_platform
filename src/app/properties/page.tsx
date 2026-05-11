"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FilterSection, ViewButton } from '../../components/PropertyUI';
import { PropertyCard } from '../../components/PropertyCard';
import Navbar from '../../components/Navbar';

// Mock Data
const PROPERTIES = [
  { id: 1, name: "Skyline Penthouse — Tower One", price: "3,850,000", location: "Midtown, Manhattan NY", beds: 4, baths: 3, area: 420, type: "sale", badge: "New", featured: true, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80" },
  { id: 2, name: "Elysian Heights Villa", price: "2,450,000", location: "Beverly Hills, CA", beds: 5, baths: 4, area: 620, type: "sale", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&auto=format&fit=crop&q=80" },
  { id: 3, name: "Meridian Sky Apartments", price: "8,500", period: "/mo", location: "Manhattan, New York", beds: 3, baths: 2, area: 185, type: "rent", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&auto=format&fit=crop&q=80" },
  // ... add other items as needed
];

const PropertiesPage = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [status, setStatus] = useState('All');

  return (
    <div className="min-h-screen bg-[#f7f6f3] text-[#0f1f3d] font-sans">
      <Navbar />

      {/* Header */}
      <header className="bg-[#0f1f3d] py-12 px-6 md:px-14 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-[340px] h-[340px] rounded-full border-[60px] border-[#b89a5a]/10 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest mb-4">
            <Link href="/" className="text-white/45 hover:text-white/80 transition-colors">Home</Link>
            <span className="text-white/20">›</span>
            <span className="text-[#d4b87a]">Properties</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-light mb-3">All Properties</h1>
          <p className="text-white/55 text-sm max-w-md font-light">
            Browse our curated portfolio of premium residential and commercial properties.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[286px_1fr]">
        {/* Sidebar Filters */}
        <aside className="bg-white border-r border-[#e8e6e2] p-8 lg:sticky lg:top-[66px] lg:h-[calc(100vh-66px)] overflow-y-auto">
          <FilterSection label="Search">
            <input type="text" placeholder="City, neighborhood..." className="w-full border border-[#d8d5d0] rounded p-2.5 bg-[#f7f6f3] text-sm focus:border-[#0f1f3d] outline-none" />
          </FilterSection>

          <FilterSection label="Status">
            <div className="flex border border-[#d8d5d0] rounded overflow-hidden">
              {['All', 'For Sale', 'For Rent'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => setStatus(opt)}
                  className={`flex-1 py-2 text-[11px] uppercase tracking-wider border-r border-[#d8d5d0] last:border-0 transition-colors ${status === opt ? 'bg-[#0f1f3d] text-white' : 'bg-[#f7f6f3] text-[#4a4845] hover:bg-[#f0eff0]'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection label="Amenities">
            <div className="flex flex-wrap gap-2">
              {['Pool', 'Gym', 'Parking', 'Sea View'].map(item => (
                <button key={item} className="px-3 py-1.5 rounded-full border border-[#d8d5d0] text-[11px] bg-[#f7f6f3] hover:border-[#0f1f3d] transition-all">
                  {item}
                </button>
              ))}
            </div>
          </FilterSection>

          <button className="w-full bg-[#0f1f3d] text-white py-3 rounded text-[11px] font-medium tracking-widest uppercase mt-4 hover:bg-[#b89a5a] transition-all">
            Apply Filters
          </button>
        </aside>

        {/* Main Content */}
        <main className="p-6 md:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="text-sm text-[#8e8b86]"><strong>85</strong> properties found</div>
            
            <div className="flex items-center gap-4">
              <select className="border border-[#d8d5d0] rounded px-4 py-2 text-[12px] bg-white appearance-none cursor-pointer">
                <option>Newest First</option>
                <option>Price: Low to High</option>
              </select>
              
              <div className="flex border border-[#d8d5d0] rounded overflow-hidden">
                <ViewButton active={viewMode === 'grid'} onClick={() => setViewMode('grid')} icon="grid" />
                <ViewButton active={viewMode === 'list'} onClick={() => setViewMode('list')} icon="list" />
              </div>
            </div>
          </div>

          <div className={`grid gap-6 transition-all duration-500 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
            {PROPERTIES.map(prop => (
              <PropertyCard key={prop.id} property={prop} viewMode={viewMode} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PropertiesPage;