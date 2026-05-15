"use client";
import { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import PropertyHeader from '@/components/properties/PropertyHeader';
import PropertyToolbar from '@/components/properties/PropertyToolbar';
import PropertySidebar from '@/components/properties/PropertySidebar'; 
import PropertyCard from '@/components/properties/PropertyCard';
import { PROPERTIES } from '@/constants/properties';

const PropertiesPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [status, setStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(prop => {
      const matchesStatus = status === 'All' || 
        (status === 'For Sale' && prop.type === 'sale') || 
        (status === 'For Rent' && prop.type === 'rent');
      const matchesSearch = prop.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [status, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      <Navbar />
      <PropertyHeader count={filteredProperties.length} /> 
      
      <div className="grid grid-cols-1 lg:grid-cols-[286px_1fr]">
        {/* Pass the state and setters as props */}
        <PropertySidebar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          status={status} 
          setStatus={setStatus} 
        />

        <main className="p-6 md:p-10">
          <PropertyToolbar 
            count={filteredProperties.length} 
            viewMode={viewMode} 
            setViewMode={setViewMode} 
          />

          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-8' : 'flex flex-col gap-6'}>
            {filteredProperties.map(prop => (
              <PropertyCard key={prop.id} property={prop} viewMode={viewMode} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PropertiesPage;