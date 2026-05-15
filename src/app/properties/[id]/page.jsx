"use client";
import React from 'react';
import Link from 'next/link';
import { Bed, Bath, Square } from 'lucide-react';
import PropertyHeader from '@/components/propertiesDetails/PropertyHeader'; 
import PropertyGallery from '@/components/propertiesDetails/PropertyGallery';
import PropertyInfo from '@/components/propertiesDetails/PropertyInfo';
import PropertyFeatures from '@/components/propertiesDetails/PropertyFeatures';
import PropertySidebar from '@/components/propertiesDetails/PropertySidebar';
import Footer from '@/components/layout/Footer';
import { PROPERTIES } from '@/constants/properties';

const PropertyDetailsPage = () => {
  const property = PROPERTIES[0];

  // Mock related properties for the bottom section
  const related = PROPERTIES.slice(1, 4); 

  return (
    <div className="min-h-screen bg-white text-[#0f1f3d]">
      <PropertyHeader />
      
      <PropertyGallery 
        images={property.images} 
        propertyName={property.name}
        tag={property.tag} 
        isRent={property.isRent}
      />

      <div className="mx-auto max-w-[1280px] px-6 py-14 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          
          <main className="space-y-10">
            <PropertyInfo property={property} />
            
            <div className="h-px bg-gray-100" />
            
            <section>
              <h2 className="mb-5 font-serif text-2xl font-normal">About This Property</h2>
              <p className="leading-relaxed text-gray-600 whitespace-pre-line">
                {property.description}
              </p>
            </section>

            <div className="h-px bg-gray-100" />

            {/* --- ADDED: PROPERTY DETAILS GRID --- */}
            <section>
              <h2 className="mb-6 font-serif text-2xl font-normal">Property Details</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: 'Property Type', val: property.type || 'Villa' },
                  { label: 'Status', val: property.tag },
                  { label: 'Year Built', val: property.year || '2019' },
                  { label: 'Floors', val: property.floors || '3' },
                  { label: 'Living Area', val: `${property.area} m²` },
                  { label: 'Garage', val: `${property.garage || 0} spaces` },
                ].map(({ label, val }) => (
                  <div key={label} className="rounded-sm border border-gray-100 bg-[#f7f6f3] px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#b89a5a]">{label}</p>
                    <p className="mt-1 text-sm font-medium">{val}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="h-px bg-gray-100" />

            <PropertyFeatures features={property.features || []} />

            <div className="h-px bg-gray-100" />

            {/* --- ADDED: LOCATION MAP --- */}
            <section>
              <h2 className="mb-6 font-serif text-2xl font-normal">Location</h2>
              <div className="relative h-72 overflow-hidden rounded-sm bg-[#e8e5df]">
                <iframe
                  title="map"
                  className="h-full w-full border-0 grayscale"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26430.393553120906!2d-118.43209!3d34.08896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc35cdb5a569%3A0x3c69ff2568b0a45a!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus"
                  loading="lazy"
                />
              </div>
            </section>
          </main>

          <aside>
             <PropertySidebar agent={property.agent} />
          </aside>
        </div>

        {/* --- ADDED: RELATED PROPERTIES SECTION --- */}
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
              <div key={i} className="group cursor-pointer rounded-sm bg-white shadow-sm border border-gray-100 transition-all hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-52 overflow-hidden">
                  <img src={r.images[0]} alt={r.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className={`absolute top-3 left-3 rounded-sm px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white ${r.isRent ? 'bg-[#b89a5a]' : 'bg-[#0f1f3d]'}`}>
                    {r.tag}
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-serif text-xl font-semibold">
                    <sup className="text-xs font-normal">$</sup>{r.price}
                  </div>
                  <h3 className="mt-1 text-sm font-medium">{r.name}</h3>
                  <div className="my-4 h-px bg-gray-100" />
                  <div className="flex gap-4 text-gray-500">
                    <span className="flex items-center gap-1.5 text-[11px]"><Bed size={12} className="text-[#b89a5a]" /> {r.beds}</span>
                    <span className="flex items-center gap-1.5 text-[11px]"><Bath size={12} className="text-[#b89a5a]" /> {r.baths}</span>
                    <span className="flex items-center gap-1.5 text-[11px]"><Square size={12} className="text-[#b89a5a]" /> {r.area} m²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetailsPage;