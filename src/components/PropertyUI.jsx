import React from 'react';

export const FilterSection = ({ label, children }) => (
  <div className="mb-8 pb-8 border-b border-[#e8e6e2] last:border-0 last:pb-0">
    <label className="block text-[10px] font-bold tracking-widest uppercase text-[#b89a5a] mb-4">
      {label}
    </label>
    {children}
  </div>
);

export const ViewButton = ({ active, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded transition-colors ${
      active ? 'bg-[#b89a5a] text-white' : 'bg-white text-[#5c5c5c] hover:bg-[#f5f3ef]'
    }`}
  >
    {icon}
  </button>
);