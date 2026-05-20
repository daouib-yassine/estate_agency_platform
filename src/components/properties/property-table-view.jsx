"use client";

import React from "react";
import { 
  MapPin, Star, Maximize2, BedDouble, Bath, Eye, Edit2, Copy, Trash2 
} from "lucide-react";
import { statusConfig, typeConfig } from "@/constants/properties";

// ── MULTI-LINGUAL TABLE DICTIONARY ──
const tableLocales = {
  fr: {
    headers: {
      property: "Propriété",
      location: "Emplacement",
      type: "Type",
      price: "Prix",
      specs: "Superficie / Ch.",
      status: "Statut",
      agent: "Agent",
      actions: ""
    },
    emptyTitle: "Aucune propriété trouvée",
    emptySub: "Essayez d'ajuster les seuils de votre matrice de filtrage.",
    unitM2: "m²",
    actions: { view: "Visionnage de", edit: "Modification de", copy: "copié dans le presse-papiers.", delete: "Suppression de" }
  },
  en: {
    headers: {
      property: "Property",
      location: "Location",
      type: "Type",
      price: "Price",
      specs: "Area / Beds",
      status: "Status",
      agent: "Agent",
      actions: ""
    },
    emptyTitle: "No properties found",
    emptySub: "Try adjusting your filter matrix thresholds.",
    unitM2: "sqm",
    actions: { view: "Viewing", edit: "Editing", copy: "copied to clipboard.", delete: "Deleting" }
  },
  ar: {
    headers: {
      property: "العقار",
      location: "الموقع",
      type: "النوع",
      price: "السعر",
      specs: "المساحة / الغرف",
      status: "الحالة",
      agent: "الوكيل",
      actions: ""
    },
    emptyTitle: "لم يتم العثور على أي عقارات",
    emptySub: "جرّب تعديل خيارات التصفية أو معايير البحث الحالية.",
    unitM2: "متر مربع",
    actions: { view: "عرض", edit: "تعديل", copy: "تم نسخ الرقم المرجعي", delete: "جاري حذف" }
  }
};

// Clean layout fallback state when list arrays are empty
function EmptyState({ t, isRTL }) {
  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="flex flex-col items-center justify-center rounded-sm border border-dashed border-[#e2ddd6] bg-white p-12 text-center">
      <p className={`text-base text-[#0f1f3d] ${isRTL ? "font-sans font-bold" : "font-serif"}`}>{t.emptyTitle}</p>
      <p className="mt-1 text-[12px] text-gray-400">{t.emptySub}</p>
    </div>
  );
}

export default function PropertyTableView({ properties, onAction, currentLang = "fr" }) {
  const t = tableLocales[currentLang] || tableLocales.fr;
  const isRTL = currentLang === "ar";

  if (!properties || properties.length === 0) {
    return <EmptyState t={t} isRTL={isRTL} />;
  }

  return (
    <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm overflow-hidden w-full">
      <div className="overflow-x-auto">
        <table dir={isRTL ? "rtl" : "ltr"} className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#f0ede8] bg-[#faf9f7]">
              <th className={`px-5 py-3 text-start text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {t.headers.property}
              </th>
              <th className={`px-5 py-3 text-start text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {t.headers.location}
              </th>
              <th className={`px-5 py-3 text-start text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {t.headers.type}
              </th>
              <th className={`px-5 py-3 text-start text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {t.headers.price}
              </th>
              <th className={`px-5 py-3 text-start text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {t.headers.specs}
              </th>
              <th className={`px-5 py-3 text-start text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {t.headers.status}
              </th>
              <th className={`px-5 py-3 text-start text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {t.headers.agent}
              </th>
              <th className="px-5 py-3 text-end text-[9px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">
                {t.headers.actions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f7f5f2]">
            {properties.map(p => {
              const cfg = statusConfig[p.status] || { label: p.status, bg: "bg-gray-50", color: "text-gray-500", border: "border-gray-200" };
              const assetCfg = typeConfig[p.type];
              const TypeIcon = assetCfg ? assetCfg.icon : null;

              return (
                <tr key={p.id} className="hover:bg-[#faf9f7] transition-colors group">
                  {/* Property Meta Thumbnail Info */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 flex-shrink-0 rounded-sm overflow-hidden bg-[#f0ede8]">
                        <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-[12px] font-medium text-[#0f1f3d] line-clamp-1 max-w-[180px] ${isRTL ? "text-right" : "text-left"}`}>
                          {p.title}
                        </p>
                        <p dir="ltr" className={`text-[10px] text-[#b89a5a] font-mono mt-0.5 ${isRTL ? "text-right" : "text-left"}`}>
                          {p.ref}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Location Metrics */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 text-[12px] text-gray-600">
                      <MapPin size={10} className="text-[#b89a5a] flex-shrink-0" />
                      <span className="truncate max-w-[120px]">{p.city}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5 truncate max-w-[140px]">{p.location}</p>
                  </td>

                  {/* Asset Typology & Project Clusters */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-600">
                      {TypeIcon && <TypeIcon size={12} className="text-[#b89a5a]" />}
                      <span>{assetCfg ? assetCfg.label : p.type}</span>
                    </div>
                    {p.project && p.project !== 'None' && (
                      <p className={`text-[9px] text-[#b89a5a] mt-0.5 truncate max-w-[120px] ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                        {p.project}
                      </p>
                    )}
                  </td>

                  {/* Price Valuation */}
                  <td className="px-5 py-3.5">
                    <p className={`text-[14px] text-[#0f1f3d] whitespace-nowrap ${isRTL ? "font-sans font-bold" : "font-serif"}`} dir="ltr">
                      {p.price}
                    </p>
                    {p.isVIP && (
                      <div className="mt-0.5">
                        <span className={`inline-flex items-center gap-0.5 text-[8px] font-bold uppercase text-[#b89a5a] ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                          <Star size={8} fill="currentColor" /> VIP
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Physical Dimensions Structural Rows */}
                  <td className="px-5 py-3.5">
                    <div className="flex flex-col gap-1" dir="ltr">
                      <span className={`flex items-center gap-1 text-[11px] text-gray-500 ${isRTL ? "justify-end" : "justify-start"}`}>
                        <Maximize2 size={10} className="flex-shrink-0" />
                        <span>{p.area} {t.unitM2}</span>
                      </span>
                      {p.bedrooms !== null && (
                        <span className={`flex items-center gap-1 text-[11px] text-gray-500 ${isRTL ? "justify-end" : "justify-start"}`}>
                          <BedDouble size={10} className="flex-shrink-0" />
                          <span>{p.bedrooms}</span>
                          <span className="text-gray-300 mx-0.5">·</span>
                          <Bath size={10} className="flex-shrink-0" />
                          <span>{p.bathrooms}</span>
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Pipelines State Badge */}
                  <td className="px-5 py-3.5">
                    <div className={`inline-flex items-center rounded-sm border px-2.5 py-1 text-[9px] font-bold uppercase whitespace-nowrap ${cfg.bg} ${cfg.color} ${cfg.border} ${
                      isRTL ? "tracking-normal" : "tracking-widest"
                    }`}>
                      {cfg.label}
                    </div>
                  </td>

                  {/* Internal Responsible Agent */}
                  <td className="px-5 py-3.5">
                    <p className="text-[12px] text-gray-600 whitespace-nowrap">
                      {p.agent ? p.agent.split(' ')[0] : 'N/A'}
                    </p>
                  </td>

                  {/* Admin Row Operation Buttons Context */}
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-1.5">
                      <button 
                        onClick={() => onAction(`${t.actions.view} ${p.title}…`)} 
                        className="rounded-sm border border-[#e2ddd6] p-1.5 text-gray-400 hover:border-[#0f1f3d] hover:text-[#0f1f3d] transition-all"
                      >
                        <Eye size={12} />
                      </button>
                      <button 
                        onClick={() => onAction(`${t.actions.edit} ${p.title}…`)} 
                        className="rounded-sm border border-[#e2ddd6] p-1.5 text-gray-400 hover:border-[#b89a5a] hover:text-[#b89a5a] transition-all"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button 
                        onClick={() => onAction(isRTL ? `${t.actions.copy} : ${p.ref}` : `${p.ref} ${t.actions.copy}`)} 
                        className="rounded-sm border border-[#e2ddd6] p-1.5 text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-all"
                      >
                        <Copy size={12} />
                      </button>
                      <button 
                        onClick={() => onAction(isRTL ? `${t.actions.delete} ${p.title}…` : `${t.actions.delete} ${p.title}…`)} 
                        className="rounded-sm border border-[#e2ddd6] p-1.5 text-gray-400 hover:border-rose-300 hover:text-rose-500 transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}