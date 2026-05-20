"use client";

import React from 'react';
import { ViewButton } from '@/components/PropertyUI';

// ── MULTI-LINGUAL TOOLBAR DICTIONARY ──
const toolbarLocales = {
  fr: {
    foundPre: "",
    foundPost: "biens trouvés",
    sortOpts: {
      newest: "Plus récents en premier",
      lowToHigh: "Prix : Du moins cher au plus cher",
      highToLow: "Prix : Du plus cher au moins cher"
    }
  },
  en: {
    foundPre: "",
    foundPost: "properties found",
    sortOpts: {
      newest: "Newest First",
      lowToHigh: "Price: Low to High",
      highToLow: "Price: High to Low"
    }
  },
  ar: {
    foundPre: "تم العثور على",
    foundPost: "عقار متاح",
    sortOpts: {
      newest: "الأحدث أولاً",
      lowToHigh: "السعر: من الأقل إلى الأعلى",
      highToLow: "السعر: من الأعلى إلى الأقل"
    }
  }
};

const PropertyToolbar = ({ count, viewMode, setViewMode, currentLang = "fr" }) => {
  const t = toolbarLocales[currentLang] || toolbarLocales.fr;
  const isRTL = currentLang === "ar";

  return (
    <div 
      dir={isRTL ? "rtl" : "ltr"}
      className="flex flex-wrap items-center justify-between gap-4 mb-6 w-full"
    >
      {/* Portfolio Result Metrics Counter */}
      <div className={`text-sm text-[#8e8b86] flex items-center gap-1.5 ${
        isRTL ? "font-sans font-medium" : "font-sans"
      }`}>
        {t.foundPre && <span>{t.foundPre}</span>}
        <strong dir="ltr" className="text-[#0f1f3d] font-mono font-bold">
          {count}
        </strong>
        <span>{t.foundPost}</span>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Sort Selection Box Component */}
        <div className="relative">
          <select 
            className={`border border-[#d8d5d0] rounded py-2 text-[12px] bg-white appearance-none cursor-pointer focus:border-[#b89a5a] outline-none transition-colors ${
              isRTL ? "pl-8 pr-4 text-right" : "pr-8 pl-4 text-left"
            }`}
          >
            <option>{t.sortOpts.newest}</option>
            <option>{t.sortOpts.lowToHigh}</option>
            <option>{t.sortOpts.highToLow}</option>
          </select>
          
          {/* Custom Arrow Accent (Flips Position dynamically based on direction) */}
          <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-[#8e8b86] ${
            isRTL ? "left-3" : "right-3"
          }`}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1L5 5L9 1" />
            </svg>
          </div>
        </div>
        
        {/* Grid / List Toggler Wrapper */}
        <div className="flex border border-[#d8d5d0] rounded overflow-hidden">
          <ViewButton 
            active={viewMode === 'grid'} 
            onClick={() => setViewMode('grid')} 
            icon="grid" 
          />
          <ViewButton 
            active={viewMode === 'list'} 
            onClick={() => setViewMode('list')} 
            icon="list" 
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyToolbar;