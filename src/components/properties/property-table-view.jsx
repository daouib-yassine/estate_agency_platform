"use client";

import React from "react";
import { 
  MapPin, Star, Maximize2, BedDouble, Bath, Eye, Edit2, Copy, Trash2 
} from "lucide-react";
import { statusConfig, typeConfig } from "@/constants/properties";

// Clean layout fallback state when list arrays are empty
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-[#e2ddd6] bg-white p-12 text-center">
      <p className="font-serif text-base text-[#0f1f3d]">No properties found</p>
      <p className="mt-1 text-[12px] text-gray-400">Try adjusting your filter matrix thresholds.</p>
    </div>
  );
}

export default function PropertyTableView({ properties, onAction }) {
  if (!properties || properties.length === 0) return <EmptyState />;

  return (
    <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#f0ede8] bg-[#faf9f7]">
              {['Property', 'Location', 'Type', 'Price', 'Area / Beds', 'Status', 'Agent', 'Actions'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[9px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">{h}</th>
              ))}
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
                        <p className="text-[12px] font-medium text-[#0f1f3d] line-clamp-1 max-w-[180px]">{p.title}</p>
                        <p className="text-[10px] text-[#b89a5a] font-mono mt-0.5">{p.ref}</p>
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
                      {assetCfg ? assetCfg.label : p.type}
                    </div>
                    {p.project && p.project !== 'None' && (
                      <p className="text-[9px] text-[#b89a5a] mt-0.5 truncate max-w-[120px]">{p.project}</p>
                    )}
                  </td>

                  {/* Price Valuation */}
                  <td className="px-5 py-3.5">
                    <p className="font-serif text-[14px] text-[#0f1f3d] whitespace-nowrap">{p.price}</p>
                    {p.isVIP && (
                      <span className="inline-flex items-center gap-0.5 text-[8px] font-bold uppercase tracking-widest text-[#b89a5a] mt-0.5">
                        <Star size={8} fill="currentColor" /> VIP
                      </span>
                    )}
                  </td>

                  {/* Physical Dimensions Structural Rows */}
                  <td className="px-5 py-3.5">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1 text-[11px] text-gray-500"><Maximize2 size={10} />{p.area} m²</span>
                      {p.bedrooms !== null && (
                        <span className="flex items-center gap-1 text-[11px] text-gray-500"><BedDouble size={10} />{p.bedrooms} · <Bath size={10} />{p.bathrooms}</span>
                      )}
                    </div>
                  </td>

                  {/* Pipelines State Badge */}
                  <td className="px-5 py-3.5">
                    <div className={`inline-flex items-center rounded-sm border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                      {cfg.label}
                    </div>
                  </td>

                  {/* Internal Responsible Agent */}
                  <td className="px-5 py-3.5">
                    <p className="text-[12px] text-gray-600 whitespace-nowrap">{p.agent ? p.agent.split(' ')[0] : 'N/A'}</p>
                  </td>

                  {/* Admin Row Operation Buttons Context */}
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1.5">
                      <button onClick={() => onAction(`Viewing ${p.title}…`)} className="rounded-sm border border-[#e2ddd6] p-1.5 text-gray-400 hover:border-[#0f1f3d] hover:text-[#0f1f3d] transition-all">
                        <Eye size={12} />
                      </button>
                      <button onClick={() => onAction(`Editing ${p.title}…`)} className="rounded-sm border border-[#e2ddd6] p-1.5 text-gray-400 hover:border-[#b89a5a] hover:text-[#b89a5a] transition-all">
                        <Edit2 size={12} />
                      </button>
                      <button onClick={() => onAction(`${p.ref} copied to clipboard.`)} className="rounded-sm border border-[#e2ddd6] p-1.5 text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-all">
                        <Copy size={12} />
                      </button>
                      <button onClick={() => onAction(`Deleting ${p.title}…`)} className="rounded-sm border border-[#e2ddd6] p-1.5 text-gray-400 hover:border-rose-300 hover:text-rose-500 transition-all">
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