"use client";

import React from "react";
import { 
  Star, MapPin, Maximize2, BedDouble, Bath, Eye, Edit2, Trash2 
} from "lucide-react";
import { statusConfig, typeConfig } from "@/constants/properties";

// ── MULTI-LINGUAL CARD DICTIONARY ──
const propertyLocales = {
  fr: {
    emptyTitle: "Aucune propriété trouvée",
    emptySub: "Essayez d'ajuster les seuils de votre matrice de filtrage.",
    viewBtn: "Voir",
    editBtn: "Modifier",
    unitM2: "m²",
    unitBed: "ch.",
    unitBath: "sdb.",
    actions: { view: "Visionnage de", edit: "Modification de", delete: "supprimé." }
  },
  en: {
    emptyTitle: "No properties found",
    emptySub: "Try adjusting your filter matrix thresholds.",
    viewBtn: "View",
    editBtn: "Edit",
    unitM2: "sqm",
    unitBed: "bed",
    unitBath: "bath",
    actions: { view: "Viewing", edit: "Editing", delete: "deleted." }
  },
  ar: {
    emptyTitle: "لم يتم العثور على أي عقارات",
    emptySub: "جرّب تعديل خيارات التصفية أو معايير البحث الحالية.",
    viewBtn: "عرض",
    editBtn: "تعديل",
    unitM2: "متر مربع",
    unitBed: "غرف",
    unitBath: "حمام",
    actions: { view: "عرض", edit: "تعديل", delete: "تم حذفه بنجاح." }
  }
};

// Graceful Empty Fallback View UI
function EmptyState({ t, isRTL }) {
  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="flex flex-col items-center justify-center rounded-sm border border-dashed border-[#e2ddd6] bg-white p-12 text-center">
      <p className={`text-base text-[#0f1f3d] ${isRTL ? "font-sans font-bold" : "font-serif"}`}>{t.emptyTitle}</p>
      <p className="mt-1 text-[12px] text-gray-400">{t.emptySub}</p>
    </div>
  );
}

export default function PropertyCardView({ properties, onAction, currentLang = "fr" }) {
  const t = propertyLocales[currentLang] || propertyLocales.fr;
  const isRTL = currentLang === "ar";

  if (!properties || properties.length === 0) {
    return <EmptyState t={t} isRTL={isRTL} />;
  }

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map(p => {
        const cfg = statusConfig[p.status] || { label: p.status, bg: "bg-gray-50", color: "text-gray-500", border: "border-gray-200" };
        const assetCfg = typeConfig[p.type];
        const TypeIcon = assetCfg ? assetCfg.icon : null;

        return (
          <div
            key={p.id}
            className="group rounded-sm bg-white border border-[#e2ddd6] shadow-sm overflow-hidden hover:border-[#b89a5a] hover:shadow-md transition-all duration-200 flex flex-col"
          >
            {/* Image Section Wrapper */}
            <div className="relative overflow-hidden aspect-[4/3] bg-[#f0ede8] shrink-0">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay shadow gradient depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3d]/60 via-transparent to-transparent" />

              {/* Status badge */}
              <div className={`absolute top-3 flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-[9px] font-bold uppercase backdrop-blur-sm ${cfg.bg} ${cfg.color} ${cfg.border} ${
                isRTL ? "right-3" : "left-3"
              } ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {cfg.label}
              </div>

              {/* VIP badge indicator if flagged */}
              {p.isVIP && (
                <div className={`absolute top-3 flex items-center gap-1 rounded-sm bg-[#b89a5a] px-2 py-1 text-[8px] font-bold uppercase text-white ${
                  isRTL ? "left-3" : "right-3"
                } ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                  <Star size={8} fill="currentColor" /> VIP
                </div>
              )}

              {/* Price & Ref Badge Row — bottom of image box */}
              <div className={`absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                <p className="font-serif text-white text-lg leading-tight drop-shadow-lg" dir="ltr">
                  {p.price}
                </p>
                <span dir="ltr" className="text-[9px] font-bold uppercase tracking-widest text-white/70 bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm px-2 py-1">
                  {p.ref}
                </span>
              </div>
            </div>

            {/* Content Meta Details Body */}
            <div className="p-4 space-y-3 flex flex-col flex-1 justify-between">
              <div className="space-y-2">
                <div className={`flex items-start justify-between gap-4 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                  <h3 className={`text-[14px] leading-snug text-[#0f1f3d] line-clamp-2 flex-1 ${isRTL ? "font-sans font-semibold text-right" : "font-serif text-left"}`}>
                    {p.title}
                  </h3>
                  {assetCfg && (
                    <div className={`flex-shrink-0 flex items-center gap-1 text-[9px] font-bold uppercase border border-[#e2ddd6] rounded-sm px-2 py-1 text-[#b89a5a] ${
                      isRTL ? "tracking-normal" : "tracking-widest"
                    }`}>
                      {TypeIcon && <TypeIcon size={9} />}
                      <span>{assetCfg.label}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                  <MapPin size={10} className="text-[#b89a5a] flex-shrink-0" />
                  <span className="truncate">{p.location}, {p.city}</span>
                </div>
              </div>

              {/* Structural Dimension Specs row */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#f0ede8] flex-wrap">
                <span className="flex items-center gap-1 text-[11px] text-gray-500 whitespace-nowrap">
                  <Maximize2 size={11} className="text-gray-400 flex-shrink-0" />
                  <span dir="ltr" className="font-medium">{p.area}</span>
                  <span className="text-gray-400 text-[10px]">{t.unitM2}</span>
                </span>
                
                {p.bedrooms !== null && (
                  <span className="flex items-center gap-1 text-[11px] text-gray-500 whitespace-nowrap">
                    <BedDouble size={11} className="text-gray-400 flex-shrink-0" />
                    <span dir="ltr" className="font-medium">{p.bedrooms}</span>
                    <span className="text-gray-400 text-[10px]">{t.unitBed}</span>
                  </span>
                )}
                
                {p.bathrooms !== null && (
                  <span className="flex items-center gap-1 text-[11px] text-gray-500 whitespace-nowrap">
                    <Bath size={11} className="text-gray-400 flex-shrink-0" />
                    <span dir="ltr" className="font-medium">{p.bathrooms}</span>
                    <span className="text-gray-400 text-[10px]">{t.unitBath}</span>
                  </span>
                )}
                
                {p.project && p.project !== 'None' && (
                  <span className={`flex items-center gap-1 text-[9px] font-bold uppercase text-[#b89a5a] bg-[#faf7f0] border border-[#e8ddc8] rounded-sm px-2 py-0.5 truncate max-w-[110px] ${
                    isRTL ? "mr-auto ml-0" : "ml-auto mr-0"
                  } ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                    {p.project}
                  </span>
                )}
              </div>

              {/* Administrative Pipeline Actions Context Clicks */}
              <div className="flex gap-2 pt-2 shrink-0">
                <button
                  onClick={() => onAction(isRTL ? `${t.actions.view} ${p.title}…` : `${t.actions.view} ${p.title}…`)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-[#e2ddd6] py-2 text-[10px] font-bold uppercase text-gray-500 hover:border-[#0f1f3d] hover:text-[#0f1f3d] transition-all ${
                    isRTL ? "tracking-normal" : "tracking-widest"
                  }`}
                >
                  <Eye size={11} /> <span>{t.viewBtn}</span>
                </button>
                <button
                  onClick={() => onAction(isRTL ? `${t.actions.edit} ${p.title}…` : `${t.actions.edit} ${p.title}…`)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-[#e2ddd6] py-2 text-[10px] font-bold uppercase text-gray-500 hover:border-[#b89a5a] hover:text-[#b89a5a] transition-all ${
                    isRTL ? "tracking-normal" : "tracking-widest"
                  }`}
                >
                  <Edit2 size={11} /> <span>{t.editBtn}</span>
                </button>
                <button
                  onClick={() => onAction(isRTL ? ` تم مسح ${p.title} ${t.actions.delete}` : `${p.title} ${t.actions.delete}`)}
                  className="flex items-center justify-center gap-1.5 rounded-sm border border-[#e2ddd6] px-3 py-2 text-[10px] font-bold uppercase text-gray-400 hover:border-rose-300 hover:text-rose-500 transition-all shrink-0"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}