import React from 'react';
import { LogOut, ChevronRight, ChevronDown } from 'lucide-react';
import { NAV_ITEMS } from '@/constants/dashboard';

const Sidebar = ({ isOpen, setIsOpen, activeTab = 'dashboard' }) => (
  <aside className={`relative flex flex-col bg-[#0f1f3d] transition-all duration-300 ${isOpen ? 'w-60' : 'w-16'} flex-shrink-0 z-20`}>
    <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm bg-[#b89a5a]">
        <span className="font-serif text-sm font-bold text-white">A</span>
      </div>
      {isOpen && (
        <span className="font-serif text-lg text-white tracking-wider">Altis<span className="text-[#d4b87a]">.</span></span>
      )}
    </div>

    <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
      {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
        <button
          key={id}
          className={`flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-all ${id === activeTab ? 'bg-[#b89a5a] text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/80'}`}
        >
          <Icon size={16} className="flex-shrink-0" />
          {isOpen && <span className="text-[12px] font-medium tracking-wide">{label}</span>}
          {isOpen && id === activeTab && <ChevronRight size={12} className="ml-auto" />}
        </button>
      ))}
    </nav>

    <div className="border-t border-white/10 p-3">
      <button className={`flex w-full items-center gap-3 rounded-sm px-3 py-2 text-white/40 hover:text-rose-400 transition-colors ${!isOpen ? 'justify-center' : ''}`}>
        <LogOut size={14} />
        {isOpen && <span className="text-[11px]">Sign Out</span>}
      </button>
    </div>

    <button
      onClick={() => setIsOpen(!isOpen)}
      className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-[#b89a5a] text-white shadow-lg"
    >
      <ChevronDown size={10} className={isOpen ? "-rotate-90" : "rotate-90"} />
    </button>
  </aside>
);

export default Sidebar;