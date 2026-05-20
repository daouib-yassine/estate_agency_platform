"use client";

import Link from "next/link";
import React from "react";

// ── MULTI-LINGUAL CARD DICTIONARY ──
const cardLocales = {
  fr: {
    beds: "Chambres",
    baths: "Sdb",
    unitM2: "m²"
  },
  en: {
    beds: "Beds",
    baths: "Baths",
    unitM2: "sqm"
  },
  ar: {
    beds: "غرف",
    baths: "حمام",
    unitM2: "متر مربع"
  }
};

export const PropertyCard = ({ property, viewMode, currentLang = "fr" }) => {
  const isList = viewMode === 'list';
  const t = cardLocales[currentLang] || cardLocales.fr;
  const isRTL = currentLang === "ar";

  return (
    <Link href={`/properties/${property.id}`} className="contents">
      <div 
        dir={isRTL ? "rtl" : "ltr"}
        className={`bg-white rounded-md overflow-hidden shadow-[0_2px_16px_rgba(15,31,61,0.07)] hover:shadow-[0_14px_40px_rgba(15,31,61,0.14)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group ${
          isList ? 'flex flex-col md:flex-row' : ''
        } ${property.featured && !isList ? 'md:col-span-2' : ''}`}
      >
        {/* Image Section */}
        <div className={`relative overflow-hidden shrink-0 ${
          isList 
            ? 'w-full md:w-72 h-48 md:h-auto' 
            : property.featured ? 'h-64' : 'h-[210px]'
        }`}>
          <img 
            src={property.image} 
            alt={property.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          
          {/* Status / Feature Badge */}
          {property.badge && (
            <span className={`absolute top-3 bg-[#1a7f5a] text-white text-[9px] font-bold uppercase rounded-sm px-2 py-1 ${
              isRTL ? 'right-3' : 'left-3'
            } ${isRTL ? 'tracking-normal' : 'tracking-widest'}`}>
              {property.badge}
            </span>
          )}
          
          {/* Favorite Button (Stops Link Propagation) */}
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle wishlist addition logic safely here
            }}
            className={`absolute top-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm z-10 ${
              isRTL ? 'left-3' : 'right-3'
            }`}
          >
            <span className="text-sm text-[#0f1f3d] mt-[2px]">♡</span>
          </button>
        </div>

        {/* Body Section */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Price Valuation Layout */}
            <div className={`text-xl font-bold text-[#0f1f3d] flex items-baseline gap-0.5 ${
              isRTL ? 'font-sans flex-row-reverse justify-end' : 'font-serif'
            }`} dir="ltr">
              <span className="text-[12px] font-normal">$</span>
              <span>{property.price}</span>
              {property.period && (
                <span className="text-xs font-light text-[#8e8b86] mx-1">
                  {property.period}
                </span>
              )}
            </div>
            
            <h3 className={`text-[14px] font-semibold text-[#0f1f3d] mt-1.5 truncate ${
              isRTL ? 'text-right' : 'text-left'
            }`}>
              {property.name}
            </h3>

            {/* Location Tag */}
            <div className="flex items-center gap-1.5 text-[#8e8b86] text-[11px] mt-1.5 font-light">
              <svg className="w-3 h-3 text-[#b89a5a] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{property.location}</span>
            </div>
          </div>

          {/* Physical Structural Metrics Row */}
          <div className="mt-5">
            <div className="h-[1px] bg-[#e8e6e2] mb-3" />
            <div className={`flex gap-4 text-[#4a4845] text-[11px] flex-wrap ${
              isRTL ? 'flex-row-reverse' : 'flex-row'
            }`}>
              <span className="flex items-center gap-1" dir={isRTL ? 'rtl' : 'ltr'}>
                <strong className="text-[#b89a5a] text-[13px] leading-none">●</strong>
                <span dir="ltr" className="font-medium">{property.beds}</span>
                <span className="text-gray-400 text-[10px]">{t.beds}</span>
              </span>
              
              <span className="flex items-center gap-1" dir={isRTL ? 'rtl' : 'ltr'}>
                <strong className="text-[#b89a5a] text-[13px] leading-none">●</strong>
                <span dir="ltr" className="font-medium">{property.baths}</span>
                <span className="text-gray-400 text-[10px]">{t.baths}</span>
              </span>
              
              <span className="flex items-center gap-1" dir={isRTL ? 'rtl' : 'ltr'}>
                <strong className="text-[#b89a5a] text-[13px] leading-none">●</strong>
                <span dir="ltr" className="font-medium">{property.area}</span>
                <span className="text-gray-400 text-[10px]">{t.unitM2}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;