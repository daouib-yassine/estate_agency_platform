"use client";

import React from 'react';
import Link from 'next/link';

// ── MULTI-LINGUAL HEADER DICTIONARY ──
const headerLocales = {
  fr: {
    home: "Accueil",
    properties: "Propriétés",
    defaultTitle: "Toutes les Propriétés",
    description: "Parcourez notre portefeuille exclusif de biens immobiliers résidentiels et commerciaux haut de gamme.",
    found: "biens trouvés"
  },
  en: {
    home: "Home",
    properties: "Properties",
    defaultTitle: "All Properties",
    description: "Browse our curated portfolio of premium residential and commercial properties.",
    found: "properties found"
  },
  ar: {
    home: "الرئيسية",
    properties: "العقارات",
    defaultTitle: "جميع العقارات",
    description: "تصفح مجموعتنا المختارة من العقارات السكنية والتجارية الفاخرة.",
    found: "عقار متاح"
  }
};

const PropertyHeader = ({ title, count = 0, currentLang = "fr" }) => {
  const t = headerLocales[currentLang] || headerLocales.fr;
  const isRTL = currentLang === "ar";
  
  // Use custom title if provided, otherwise default to translated portfolio title
  const displayTitle = title || t.defaultTitle;

  return (
    <header 
      dir={isRTL ? "rtl" : "ltr"}
      className="relative bg-[#0f1f3d] pt-12 pb-12 px-6 md:px-14 overflow-hidden z-10 w-full"
    >
      {/* Dynamic Gold Ring — Alternates positioning based on language direction */}
      <div className={`absolute -top-16 w-[340px] h-[340px] rounded-full border-[60px] border-[#b89a5a]/10 pointer-events-none ${
        isRTL ? "-left-16" : "-right-16"
      }`} />
      
      <div className="relative z-20">
        {/* Breadcrumb row */}
        <div className={`flex items-center gap-2 text-[10px] uppercase mb-4 ${
          isRTL ? "tracking-normal justify-start" : "tracking-widest justify-start"
        }`}>
          <Link href="/" className="text-white/45 hover:text-white/80 transition-colors">
            {t.home}
          </Link>
          <span className="text-white/20" dir="ltr">›</span>
          <span className="text-[#d4b87a]">{t.properties}</span>
        </div>
        
        {/* Dynamic Title and Portfolio Counter */}
        <div className={`flex flex-col md:flex-row md:items-baseline gap-2 mb-3 ${
          isRTL ? "md:flex-row-reverse justify-end" : "justify-start"
        }`}>
          <h1 className={`text-4xl md:text-5xl text-white font-light ${
            isRTL ? "font-sans font-bold text-right" : "font-serif text-left"
          }`}>
            {displayTitle}
          </h1>
          
          {count > 0 && (
            <div className={`text-xs text-[#d4b87a]/70 flex gap-1 ${
              isRTL ? "flex-row-reverse" : "flex-row"
            }`}>
              <span>(</span>
              <span dir="ltr" className="font-mono font-medium">{count}</span>
              <span>{t.found})</span>
            </div>
          )}
        </div>
        
        {/* Subtitle Description */}
        <p className={`text-white/55 text-sm max-w-md font-light leading-relaxed ${
          isRTL ? "text-right" : "text-left"
        }`}>
          {t.description}
        </p>
      </div>
    </header>
  );
};

export default PropertyHeader;