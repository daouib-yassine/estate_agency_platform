"use client";
import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Home, MapPin, 
  Bed, Bath, Square, MoreVertical, 
  Eye, Edit, Trash2, CheckCircle, 
  Clock, XCircle, TrendingUp, DollarSign,
  LayoutDashboard, Building2, Users, CalendarCheck,
  Bell, Settings, LogOut, ChevronDown,
  ChevronRight, Menu, X, BarChart2, PieChart,
  Layers
} from 'lucide-react';

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const INITIAL_PROPERTIES = [
  {
    id: 'PROP-001',
    title: 'Elysian Heights Villa',
    location: 'Malabata, Tangier',
    price: '4,200,000 MAD',
    type: 'Sale',
    status: 'Active',
    beds: 5,
    baths: 4,
    size: '450m²',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80',
    owner: 'Hassan Alami'
  },
  {
    id: 'PROP-002',
    title: 'Modern Loft #14',
    location: 'City Center, Tangier',
    price: '8,500 MAD/mo',
    type: 'Rent',
    status: 'Pending',
    beds: 2,
    baths: 1,
    size: '95m²',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
    owner: 'Sarah Mansouri'
  },
  {
    id: 'PROP-003',
    title: 'Azure Shores Apartment',
    location: 'California, Tangier',
    price: '1,850,000 MAD',
    type: 'Sale',
    status: 'Sold',
    beds: 3,
    baths: 2,
    size: '120m²',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
    owner: 'Driss Bennani'
  }
];

/* ─────────────────────────────────────────────
   SIDEBAR NAV
───────────────────────────────────────────── */
const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',   id: 'dashboard' },
  { icon: Home,            label: 'Properties',  id: 'properties' },
  { icon: Building2,       label: 'Developments',id: 'developments' },
  { icon: CalendarCheck,   label: 'Attendance',  id: 'attendance' },
  { icon: Users,           label: 'Clients',     id: 'clients' },
  { icon: BarChart2,       label: 'Reports',     id: 'reports' },
  { icon: Settings,        label: 'Settings',    id: 'settings' },
];

export default function PropertiesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#f0ede8] font-sans text-[#0f1f3d] overflow-hidden">

      {/* ── SIDEBAR ── */}
      <aside className={`relative flex flex-col bg-[#0f1f3d] transition-all duration-300 ${sidebarOpen ? 'w-60' : 'w-16'} flex-shrink-0 z-20`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm bg-[#b89a5a]">
            <span className="font-serif text-sm font-bold text-white">A</span>
          </div>
          {sidebarOpen && (
            <span className="font-serif text-lg text-white tracking-wider">Altis<span className="text-[#d4b87a]">.</span></span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, id }) => {
            const isActive = id === 'properties';
            return (
              <button
                key={id}
                onClick={() => { 
                  if (id === 'dashboard') window.location.href = '/admin/dashboard';
                  else if (id === 'attendance') window.location.href = '/admin/attendance_dashboard';
                  else if (id === 'properties') window.location.href = '/admin/properties_management';
                  else if (id === 'developments') window.location.href = '/admin/development_dashboard';
                  else if (id === 'clients') window.location.href = '/admin/client_dashboard';
                  else if (id === 'reports') window.location.href = '/admin/reports_dashboard';
                  else if (id === 'settings') window.location.href = '/admin/settings_dashboard';
                }}
                className={`flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-all ${isActive ? 'bg-[#b89a5a] text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/80'}`}
              >
                <Icon size={16} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-[12px] font-medium tracking-wide">{label}</span>}
                {sidebarOpen && isActive && <ChevronRight size={12} className="ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 p-3 space-y-1">
          <div className={`flex items-center gap-3 px-3 py-2.5 ${sidebarOpen ? '' : 'justify-center'}`}>
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&q=80" alt="Admin" className="h-7 w-7 flex-shrink-0 rounded-full object-cover object-top" />
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

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(s => !s)}
          className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-[#b89a5a] text-white shadow-lg"
        >
          {sidebarOpen ? <ChevronDown size={10} className="-rotate-90" /> : <ChevronDown size={10} className="rotate-90" />}
        </button>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
      
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 p-6 bg-white border-b border-[#e2ddd6]">
        <div>
          <h1 className="text-3xl font-serif italic text-[#0f1f3d]">Property Inventory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor your agency's listed assets.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0f1f3d] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#b89a5a] transition-all shadow-lg shadow-[#0f1f3d]/10">
          <Plus size={16} /> Add New Property
        </button>
      </div>

      {/* ── STATS BAR ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Listings</p>
              <h3 className="text-2xl font-serif mt-1">{properties.length}</h3>
            </div>
            <div className="p-2 bg-[#fcfaf7] text-[#b89a5a] rounded-lg"><Home size={20}/></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Sales</p>
              <h3 className="text-2xl font-serif mt-1">{properties.filter(p => p.type === 'Sale').length}</h3>
            </div>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><TrendingUp size={20}/></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Revenue Managed</p>
              <h3 className="text-2xl font-serif mt-1">12.8M <span className="text-sm font-sans italic text-gray-400">MAD</span></h3>
            </div>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><DollarSign size={20}/></div>
          </div>
        </div>
      </div>

      {/* ── FILTERS & SEARCH ── */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by name, location, or owner..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent focus:border-[#b89a5a] rounded-xl outline-none text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* ── PROPERTY GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS (JS ONLY)
───────────────────────────────────────────── */

function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-500">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white ${property.type === 'Sale' ? 'bg-[#0f1f3d]' : 'bg-[#b89a5a]'}`}>
            {property.type}
          </span>
          <StatusBadge status={property.status} />
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-serif text-xl italic group-hover:text-[#b89a5a] transition-colors">{property.title}</h3>
            <p className="flex items-center gap-1 text-xs text-gray-400 mt-1">
              <MapPin size={12} className="text-[#b89a5a]" /> {property.location}
            </p>
          </div>
          <button className="p-2 text-gray-400 hover:text-[#0f1f3d]"><MoreVertical size={18}/></button>
        </div>

        <p className="text-lg font-bold text-[#0f1f3d] my-4">{property.price}</p>

        <div className="flex items-center justify-between py-4 border-t border-gray-50 text-gray-500">
          <div className="flex items-center gap-1.5">
            <Bed size={14} className="text-[#b89a5a]" />
            <span className="text-xs font-bold">{property.beds}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={14} className="text-[#b89a5a]" />
            <span className="text-xs font-bold">{property.baths}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square size={14} className="text-[#b89a5a]" />
            <span className="text-xs font-bold">{property.size}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <button className="flex items-center justify-center p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:bg-[#0f1f3d] hover:text-white transition-all"><Eye size={16}/></button>
          <button className="flex items-center justify-center p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:bg-[#b89a5a] hover:text-white transition-all"><Edit size={16}/></button>
          <button className="flex items-center justify-center p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition-all"><Trash2 size={16}/></button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Pending: 'bg-amber-50 text-amber-600 border-amber-100',
    Sold: 'bg-gray-100 text-gray-600 border-gray-200'
  };

  const Icons = {
    Active: CheckCircle,
    Pending: Clock,
    Sold: XCircle
  };

  const Icon = Icons[status] || CheckCircle;

  return (
    <span className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest flex items-center gap-1 ${styles[status]}`}>
      <Icon size={10} /> {status}
    </span>
  );
}