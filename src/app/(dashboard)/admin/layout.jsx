"use client"; 

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, LogOut, LayoutDashboard, ChevronDown, Users, Home, Settings, Calendar } from 'lucide-react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Unified data source for paths and labels
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', href: '/admin' },
    { icon: Calendar, label: 'Attendance', id: 'attendance', href: '/admin/attendance' }, 
    { icon: Users, label: 'Clients', id: 'clients', href: '/admin/clients' },
    { icon: Home, label: 'Properties', id: 'properties', href: '/admin/properties' },
    { icon: Settings, label: 'Settings', id: 'settings', href: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans text-[#0f1f3d]">
      {/* ── SIDEBAR ── */}
      <aside className={`relative flex flex-col bg-[#0f1f3d] transition-all duration-300 ${sidebarOpen ? 'w-60' : 'w-16'} flex-shrink-0 z-20`}>
        {/* Branding Area */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm bg-[#b89a5a]">
            <span className="font-serif text-sm font-bold text-white">A</span>
          </div>
          {sidebarOpen && <span className="font-serif text-lg text-white tracking-wider">Altis<span className="text-[#d4b87a]">.</span></span>}
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, id, href }) => {
            // Dynamically checks if the current address url strictly matches the item path
            const isActive = pathname === href;

            return (
              <Link
                key={id}
                href={href}
                className={`flex items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-all ${
                  isActive 
                    ? 'bg-[#b89a5a] text-white font-semibold' 
                    : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                }`}
              >
                <Icon size={16} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-[12px] font-medium tracking-wide">{label}</span>}
                {sidebarOpen && isActive && <ChevronRight size={12} className="ml-auto animate-in fade-in duration-200" />}
              </Link>
            );
          })}
        </nav>

        {/* Profile Card Section */}
        <div className="border-t border-white/10 p-3 space-y-1">
          <div className={`flex items-center gap-3 px-3 py-2.5 ${sidebarOpen ? '' : 'justify-center'}`}>
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&q=80" 
              alt="Admin" 
              className="h-7 w-7 flex-shrink-0 rounded-full object-cover object-top" 
            />
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium text-white">Jonathan Altis</p>
                <p className="text-[9px] text-white/40">Administrator</p>
              </div>
            )}
          </div>
          <button className={`flex w-full items-center gap-3 rounded-sm px-3 py-2 text-white/40 hover:text-rose-400 transition-colors ${!sidebarOpen ? 'justify-center' : ''}`}>
            <LogOut size={14} />
            {sidebarOpen && <span className="text-[11px]">Sign Out</span>}
          </button>
        </div>

        {/* Toggle Shrink Trigger Pin Button */}
        <button 
          onClick={() => setSidebarOpen(s => !s)}
          className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-[#b89a5a] text-white shadow-lg z-30"
        >
          {sidebarOpen ? <ChevronDown size={10} className="-rotate-90" /> : <ChevronDown size={10} className="rotate-90" />}
        </button>
      </aside>

      {/* ── MAIN CONTENT LAYER ── */}
      <main className="flex-1 overflow-y-auto min-w-0">
        {children}
      </main>
    </div>
  );
}