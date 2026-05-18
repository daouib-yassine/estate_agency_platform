"use client";

import React from "react";
import { 
  Star, MapPin, Maximize2, BedDouble, Bath, Eye, Edit2, Trash2 
} from "lucide-react";
import { statusConfig, typeConfig } from "@/constants/properties";

// Graceful Empty Fallback View UI
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-[#e2ddd6] bg-white p-12 text-center">
      <p className="font-serif text-base text-[#0f1f3d]">No properties found</p>
      <p className="mt-1 text-[12px] text-gray-400">Try adjusting your filter matrix thresholds.</p>
    </div>
  );
}

export default function PropertyCardView({ properties, onAction }) {
  if (!properties || properties.length === 0) return <EmptyState />;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map(p => {
        const cfg = statusConfig[p.status] || { label: p.status, bg: "bg-gray-50", color: "text-gray-500", border: "border-gray-200" };
        const assetCfg = typeConfig[p.type];
        const TypeIcon = assetCfg ? assetCfg.icon : null;

        return (
          <div
            key={p.id}
            className="group rounded-sm bg-white border border-[#e2ddd6] shadow-sm overflow-hidden hover:border-[#b89a5a] hover:shadow-md transition-all duration-200"
          >
            {/* Image Section Wrapper */}
            <div className="relative overflow-hidden aspect-[4/3] bg-[#f0ede8]">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay shadow gradient depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3d]/60 via-transparent to-transparent" />

              {/* Status badge — top left */}
              <div className={`absolute top-3 left-3 flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                {cfg.label}
              </div>

              {/* VIP badge indicator if flagged */}
              {p.isVIP && (
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-sm bg-[#b89a5a] px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-white">
                  <Star size={8} fill="currentColor" /> VIP
                </div>
              )}

              {/* Price & Ref Badge Row — bottom of image box */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <p className="font-serif text-white text-lg leading-tight drop-shadow-lg">{p.price}</p>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/70 bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm px-2 py-1">{p.ref}</span>
              </div>
            </div>

            {/* Content Meta Details Body */}
            <div className="p-4 space-y-3">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-[14px] leading-snug text-[#0f1f3d] line-clamp-2 flex-1">{p.title}</h3>
                  {assetCfg && (
                    <div className="flex-shrink-0 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#b89a5a] border border-[#e2ddd6] rounded-sm px-2 py-1">
                      {TypeIcon && <TypeIcon size={9} />}
                      {assetCfg.label}
                    </div>
                  )}
                </div>
                <div className="mt-1.5 flex items-center gap-1 text-[11px] text-gray-400">
                  <MapPin size={10} className="text-[#b89a5a] flex-shrink-0" />
                  <span className="truncate">{p.location}, {p.city}</span>
                </div>
              </div>

              {/* Structural Dimension Specs row */}
              <div className="flex items-center gap-4 pt-2 border-t border-[#f0ede8]">
                <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <Maximize2 size={11} className="text-gray-400" />
                  {p.area} m²
                </span>
                {p.bedrooms !== null && (
                  <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <BedDouble size={11} className="text-gray-400" />
                    {p.bedrooms} ch.
                  </span>
                )}
                {p.bathrooms !== null && (
                  <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <Bath size={11} className="text-gray-400" />
                    {p.bathrooms} sdb.
                  </span>
                )}
                {p.project && p.project !== 'None' && (
                  <span className="ml-auto flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#b89a5a] bg-[#faf7f0] border border-[#e8ddc8] rounded-sm px-2 py-0.5 truncate max-w-[100px]">
                    {p.project}
                  </span>
                )}
              </div>

              {/* Administrative Pipeline Actions Context Clicks */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => onAction(`Viewing ${p.title}…`)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-[#e2ddd6] py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:border-[#0f1f3d] hover:text-[#0f1f3d] transition-all"
                >
                  <Eye size={11} /> View
                </button>
                <button
                  onClick={() => onAction(`Editing ${p.title}…`)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-[#e2ddd6] py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:border-[#b89a5a] hover:text-[#b89a5a] transition-all"
                >
                  <Edit2 size={11} /> Edit
                </button>
                <button
                  onClick={() => onAction(`${p.title} deleted.`)}
                  className="flex items-center justify-center gap-1.5 rounded-sm border border-[#e2ddd6] px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:border-rose-300 hover:text-rose-500 transition-all"
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