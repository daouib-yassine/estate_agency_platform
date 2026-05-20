"use client";

import React from 'react';
import { FilterSection } from '@/components/PropertyUI';

// ── MULTI-LINGUAL SIDEBAR DICTIONARY ──
const sidebarLocales = {
  fr: {
    labels: {
      search: "Recherche",
      status: "Statut",
      amenities: "Équipements"
    },
    placeholders: {
      search: "Ville, quartier..."
    },
    statusOpts: {
      all: "Tous",
      sale: "À Vendre",
      rent: "À Louer"
    },
    amenitiesOpts: {
      pool: "Piscine",
      gym: "Salle de sport",
      parking: "Parking",
      seaView: "Vue sur mer"
    },
    applyBtn: "Appliquer les Filtres"
  },
  en: {
    labels: {
      search: "Search",
      status: "Status",
      amenities: "Amenities"
    },
    placeholders: {
      search: "City, neighborhood..."
    },
    statusOpts: {
      all: "All",
      sale: "For Sale",
      rent: "For Rent"
    },
    amenitiesOpts: {
      pool: "Pool",
      gym: "Gym",
      parking: "Parking",
      seaView: "Sea View"
    },
    applyBtn: "Apply Filters"
  },
  ar: {
    labels: {
      search: "البحث",
      status: "حالة العقار",
      amenities: "التجهيزات والراحة"
    },
    placeholders: {
      search: "المدينة، الحي..."
    },
    statusOpts: {
      all: "الكل",
      sale: "للبيع",
      rent: "للكراء"
    },
    amenitiesOpts: {
      pool: "مسبح",
      gym: "قاعة رياضة",
      parking: "مرآب السيارات",
      seaView: "إطلالة على البحر"
    },
    applyBtn: "تطبيق الفلاتر"
  }
};

const PropertySidebar = ({ searchQuery, setSearchQuery, status, setStatus, currentLang = "fr" }) => {
  const t = sidebarLocales[currentLang] || sidebarLocales.fr;
  const isRTL = currentLang === "ar";

  // Maps display keys to core backend lookup values 
  const statusItems = [
    { key: 'All', label: t.statusOpts.all },
    { key: 'For Sale', label: t.statusOpts.sale },
    { key: 'For Rent', label: t.statusOpts.rent },
  ];

  const amenityItems = [
    t.amenitiesOpts.pool,
    t.amenitiesOpts.gym,
    t.amenitiesOpts.parking,
    t.amenitiesOpts.seaView
  ];

  return (
    <aside 
      dir={isRTL ? "rtl" : "ltr"}
      className={`bg-white p-8 lg:sticky lg:top-[66px] lg:h-[calc(100vh-66px)] overflow-y-auto space-y-6 w-full ${
        isRTL ? "border-l border-[#e8e6e2]" : "border-r border-[#e8e6e2]"
      }`}
    >
      {/* Search Input Section */}
      <FilterSection label={t.labels.search}>
        <input 
          type="text" 
          value={searchQuery || ""}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.placeholders.search} 
          className={`w-full border border-[#d8d5d0] rounded p-2.5 bg-[#f7f6f3] text-sm focus:border-[#0f1f3d] outline-none transition-all ${
            isRTL ? "text-right" : "text-left"
          }`}
        />
      </FilterSection>

      {/* Segmented Transaction Status Section */}
      <FilterSection label={t.labels.status}>
        <div className="flex border border-[#d8d5d0] rounded overflow-hidden">
          {statusItems.map((opt) => (
            <button 
              key={opt.key}
              type="button"
              onClick={() => setStatus(opt.key)}
              className={`flex-1 py-2 text-[11px] font-medium uppercase transition-colors duration-200 ${
                isRTL 
                  ? "border-l border-[#d8d5d0] last:border-l-0 tracking-normal" 
                  : "border-r border-[#d8d5d0] last:border-r-0 tracking-wider"
              } ${
                status === opt.key 
                  ? 'bg-[#0f1f3d] text-white' 
                  : 'bg-[#f7f6f3] text-[#4a4845] hover:bg-[#f0eff0]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Amenities Badge Section */}
      <FilterSection label={t.labels.amenities}>
        <div className={`flex flex-wrap gap-2 ${isRTL ? "justify-start flex-row-reverse" : "justify-start"}`}>
          {amenityItems.map((item) => (
            <button 
              key={item} 
              type="button"
              className="px-3 py-1.5 rounded-full border border-[#d8d5d0] text-[11px] bg-[#f7f6f3] text-[#4a4845] hover:border-[#0f1f3d] hover:bg-white transition-all duration-200"
            >
              {item}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Main Action Button */}
      <button 
        type="button"
        className={`w-full bg-[#0f1f3d] text-white py-3 rounded text-[11px] font-bold mt-4 hover:bg-[#b89a5a] transition-all duration-300 ${
          isRTL ? "tracking-normal" : "tracking-widest uppercase"
        }`}
      >
        {t.applyBtn}
      </button>
    </aside>
  );
};

export default PropertySidebar;