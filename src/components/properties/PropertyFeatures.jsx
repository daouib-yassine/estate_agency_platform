"use client";

import React from 'react';
import { CheckCircle2, Home, Calendar, Layers, Maximize, Car, MapPin } from 'lucide-react';

// ── MULTI-LINGUAL COMPONENT DICTIONARY ──
const featureLocales = {
  fr: {
    aboutTitle: "À propos de cette propriété",
    detailsTitle: "Détails de la propriété",
    amenitiesTitle: "Caractéristiques et équipements",
    fallbackDesc: "Découvrez une vie de luxe à",
    in: "à",
    labels: {
      type: "Type de bien",
      status: "Statut",
      location: "Emplacement",
      beds: "Chambres",
      area: "Surface habitable",
      baths: "Salles de bain",
      year: "Année de construction",
      parking: "Parking"
    },
    values: {
      rent: "À Louer",
      sale: "À Vendre",
      available: "Disponible",
      bedsUnit: "Ch.",
      bathsUnit: "Sdb",
      spacesUnit: "Places"
    }
  },
  en: {
    aboutTitle: "About This Property",
    detailsTitle: "Property Details",
    amenitiesTitle: "Features & Amenities",
    fallbackDesc: "Experience luxury living at",
    in: "in",
    labels: {
      type: "Property Type",
      status: "Status",
      location: "Location",
      beds: "Bedrooms",
      area: "Living Area",
      baths: "Bathrooms",
      year: "Built Year",
      parking: "Parking"
    },
    values: {
      rent: "For Rent",
      sale: "For Sale",
      available: "Available",
      bedsUnit: "Beds",
      bathsUnit: "Baths",
      spacesUnit: "Spaces"
    }
  },
  ar: {
    aboutTitle: "نبذة عن العقار",
    detailsTitle: "تفاصيل العقار",
    amenitiesTitle: "الميزات والمرافق",
    fallbackDesc: "استمتع بتجربة العيش الفاخر في",
    in: "في",
    labels: {
      type: "نوع العقار",
      status: "الحالة",
      location: "الموقع",
      beds: "غرف النوم",
      area: "المساحة الإجمالية",
      baths: "دورات المياه",
      year: "سنة البناء",
      parking: "موقف السيارات"
    },
    values: {
      rent: "للكراء",
      sale: "للبيع",
      available: "متوفر",
      bedsUnit: "غرف",
      bathsUnit: "حمام",
      spacesUnit: "مواقف"
    }
  }
};

const PropertyFeatures = ({ property, currentLang = "fr" }) => {
  if (!property) return null;

  const t = featureLocales[currentLang] || featureLocales.fr;
  const isRTL = currentLang === "ar";

  // Configuration for the Property Details grid
  const details = [
    { 
      label: t.labels.type, 
      val: property.isRent ? t.values.rent : t.values.sale, 
      icon: Home,
      isNumeric: false 
    },
    { 
      label: t.labels.status, 
      val: property.tag || t.values.available, 
      icon: CheckCircle2,
      isNumeric: false 
    },
    { 
      label: t.labels.location, 
      val: property.loc, 
      icon: MapPin,
      isNumeric: false 
    },
    { 
      label: t.labels.beds, 
      val: `${property.beds} ${t.values.bedsUnit}`, 
      icon: Layers,
      isNumeric: true,
      rawNum: property.beds,
      unit: t.values.bedsUnit
    },
    { 
      label: t.labels.area, 
      val: `${property.sqft} m²`, 
      icon: Maximize,
      isNumeric: true,
      rawNum: property.sqft,
      unit: currentLang === "ar" ? "متر مربع" : "m²"
    },
    { 
      label: t.labels.baths, 
      val: `${property.baths} ${t.values.bathsUnit}`, 
      icon: CheckCircle2,
      isNumeric: true,
      rawNum: property.baths,
      unit: t.values.bathsUnit
    },
    { 
      label: t.labels.year, 
      val: property.year, 
      icon: Calendar,
      isNumeric: true,
      rawNum: property.year,
      unit: ""
    },
    { 
      label: t.labels.parking, 
      val: `${property.garage} ${t.values.spacesUnit}`, 
      icon: Car,
      isNumeric: true,
      rawNum: property.garage,
      unit: t.values.spacesUnit
    },
  ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="space-y-10 w-full">
      
      {/* Description Section */}
      <div>
        <h2 className={`mb-5 text-2xl font-normal text-[#0f1f3d] ${isRTL ? "font-sans font-bold text-right" : "font-serif text-left"}`}>
          {t.aboutTitle}
        </h2>
        {property.description ? (
          property.description.split('\n\n').map((para, i) => (
            <p key={i} className={`mb-4 leading-relaxed text-gray-600 text-sm ${isRTL ? "text-right" : "text-left"}`}>
              {para}
            </p>
          ))
        ) : (
          <p className={`leading-relaxed text-gray-500 italic text-sm ${isRTL ? "text-right" : "text-left"}`}>
            {t.fallbackDesc} {property.name} {t.in} {property.loc}.
          </p>
        )}
      </div>

      <div className="h-px bg-gray-100" />

      {/* Details Grid */}
      <div>
        <h2 className={`mb-6 text-2xl font-normal text-[#0f1f3d] ${isRTL ? "font-sans font-bold text-right" : "font-serif text-left"}`}>
          {t.detailsTitle}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {details.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-sm border border-gray-100 bg-[#f7f6f3] px-5 py-4 flex flex-col justify-between">
                <div className={`flex items-center gap-2 mb-1.5 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                  <Icon size={12} className="text-[#b89a5a] shrink-0" />
                  <p className={`text-[10px] font-bold uppercase text-[#b89a5a] ${isRTL ? "tracking-normal text-right" : "tracking-widest text-left"}`}>
                    {item.label}
                  </p>
                </div>
                
                {item.isNumeric ? (
                  <div className={`text-sm font-semibold text-[#0f1f3d] flex gap-1 ${isRTL ? "flex-row-reverse justify-end" : "flex-row"}`}>
                    <span dir="ltr">{item.rawNum}</span>
                    <span className="text-gray-500 font-normal text-[12px]">{item.unit}</span>
                  </div>
                ) : (
                  <p className={`text-sm font-semibold text-[#0f1f3d] ${isRTL ? "text-right" : "text-left"}`}>
                    {item.val}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Features & Amenities */}
      <div>
        <h2 className={`mb-6 text-2xl font-normal text-[#0f1f3d] ${isRTL ? "font-sans font-bold text-right" : "font-serif text-left"}`}>
          {t.amenitiesTitle}
        </h2>
        
        {/* Simple list of features */}
        {property.features && property.features.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-8">
            {property.features.map((f) => (
              <div key={f} className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                <CheckCircle2 size={16} className="flex-shrink-0 text-[#b89a5a]" />
                <span className={`text-sm text-gray-600 ${isRTL ? "text-right" : "text-left"}`}>{f}</span>
              </div>
            ))}
          </div>
        )}

        {/* Visual Amenities Icons */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {property.amenities.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center justify-center gap-2 rounded-sm border border-gray-100 py-5 text-center px-3 bg-white">
                {Icon && <Icon size={22} className="text-[#b89a5a]" strokeWidth={1.5} />}
                <span className={`text-[11px] font-medium uppercase text-gray-600 ${isRTL ? "tracking-normal" : "tracking-wider"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyFeatures;