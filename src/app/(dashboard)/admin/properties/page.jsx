"use client";
import { useState } from 'react';
import { 
  Building2, DoorOpen, Home, CreditCard, Users, Search, Plus, MapPin, 
  MoreVertical, X, Map, Layers,  
  LayoutDashboard, ClipboardCheck, FileText, Settings, ChevronRight
} from 'lucide-react';

/* ── INITIAL DATA ── */
const INITIAL_BUILDINGS = [
  {id:'B001',name:'Résidence Andaloussia',address:'Av. Mohammed V, Tanger',city:'Tanger',floors:8,totalUnits:24,year:2018,manager:'Karim Bennani',phone:'+212 661-234567'},
  {id:'B002',name:'Tour Atlas',address:'Bd. Hassan II, Tanger',city:'Tanger',floors:12,totalUnits:36,year:2020,manager:'Fatima Zahra Alaoui',phone:'+212 662-345678'},
  {id:'B003',name:'Immeuble Al Farah',address:'Rue Ibn Batouta, Tétouan',city:'Tétouan',floors:5,totalUnits:16,year:2015,manager:'Hassan Tazi',phone:'+212 663-456789'},
];

const INITIAL_UNITS = [
  {id:'U001',bldId:'B001',ref:'A-01',type:'apartment',floor:1,area:85,beds:2,baths:1,status:'rented',offer:'rent',price:4500,tenant:'Mohamed Idrissi',tenantPhone:'+212 660-111222',leaseStart:'2025-01-01',leaseEnd:'2026-01-01',notes:'Locataire ponctuel'},
  {id:'U002',bldId:'B001',ref:'A-02',type:'apartment',floor:1,area:95,beds:3,baths:1,status:'rented',offer:'rent',price:5200,tenant:'Aicha Benmoussa',tenantPhone:'+212 660-222333',leaseStart:'2024-09-01',leaseEnd:'2026-09-01',notes:'Retard de paiement'},
  {id:'U003',bldId:'B001',ref:'A-03',type:'apartment',floor:2,area:78,beds:2,baths:1,status:'vacant',offer:'rent',price:4200,tenant:'',tenantPhone:'',leaseStart:'',leaseEnd:'',notes:'Récemment repeint'},
];

export default function ImmoManager() {
  const [activePage, setActivePage] = useState('buildings');
  const [buildings] = useState(INITIAL_BUILDINGS);
  const [units] = useState(INITIAL_UNITS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'developments', label: 'Developments', icon: Layers },
    { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#f5f0e8] text-[#0c1a35] font-sans overflow-hidden">
      
      {/* ── SIDEBAR ── */}
      {/* <aside className={`${sidebarOpen ? 'w-[240px]' : 'w-[70px]'} bg-[#0c1a35] flex flex-col transition-all duration-300 z-30 shrink-0`}>
        <div className="h-16 flex items-center px-4 border-b border-white/10 overflow-hidden shrink-0">
          <div className="w-8 h-8 bg-[#b8966a] rounded flex-shrink-0 flex items-center justify-center font-serif font-bold text-[#0c1a35]">I</div>
          {sidebarOpen && <span className="ml-3 text-white font-serif text-lg tracking-tight whitespace-nowrap">ImmoManager</span>}
        </div>

        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto custom-scrollbar">
          {navItems.map(({ icon: Icon, label, id }) => {
            const isActive = id === 'properties';
            return (
              <button
                key={id}
                onClick={() => { 
                  if (id === 'dashboard') window.location.href = '/admin/dashboard';
                  else if (id === 'attendance') window.location.href = '/admin/attendance_dashboard';
                  else if (id === 'properties') setActivePage('buildings'); 
                  else if (id === 'developments') window.location.href = '/admin/development_dashboard';
                  else if (id === 'clients') window.location.href = '/admin/client_dashboard';
                  // else if (id === 'reports') window.location.href = '/admin/reports_dashboard';
                  else if (id === 'settings') window.location.href = '/admin/settings_dashboard';
                }}
                className={`flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-all ${isActive ? 'bg-[#b89a5a] text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/80'}`}
              >
                <Icon size={16} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-[12px] font-medium tracking-wide whitespace-nowrap">{label}</span>}
                {sidebarOpen && isActive && <ChevronRight size={12} className="ml-auto" />}
              </button>
            );
          })}
        </nav>

        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 text-white/30 hover:text-white border-t border-white/10 flex justify-center shrink-0"
        >
          {sidebarOpen ? <X size={18} /> : <ChevronRight size={18} />}
        </button>
      </aside> */}

      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP HEADER (Restored Navigation) */}
        <header className="h-16 bg-white border-b border-[#e0d8cc] px-6 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-8">
            <h1 className="font-serif text-xl hidden lg:block">Gestion Immobilière</h1>
            
            {/* RESTORED TOP NAV TABS */}
            <nav className="flex items-center gap-1 bg-[#f5f0e8] p-1 rounded-xl border border-[#e0d8cc]">
              <TabItem 
                icon={Building2} 
                label="Immeubles" 
                active={activePage === 'buildings'} 
                onClick={() => setActivePage('buildings')} 
              />
              <TabItem 
                icon={DoorOpen} 
                label="Unités" 
                active={activePage === 'units'} 
                onClick={() => setActivePage('units')} 
              />
              <TabItem 
                icon={CreditCard} 
                label="Paiements" 
                active={activePage === 'payments'} 
                onClick={() => setActivePage('payments')} 
              />
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="bg-[#f5f0e8] border border-[#e0d8cc] rounded-full pl-9 pr-4 py-1.5 text-xs w-48 lg:w-64 focus:outline-none focus:ring-1 focus:ring-[#b8966a]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right hidden md:block">
                <p className="text-[11px] font-bold leading-none">Jonathan Altis</p>
                <p className="text-[9px] text-[#b8966a] uppercase tracking-tighter">Administrateur</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#0c1a35] text-[#b8966a] flex items-center justify-center text-xs font-bold border-2 border-[#b8966a]/20">JA</div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#f5f0e8]/50">
          <div className="max-w-[1600px] mx-auto">
            
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-serif capitalize">{activePage}</h2>
                <p className="text-[#7a8aaa] text-xs">Gérez vos actifs immobiliers et locataires</p>
              </div>

             <button 
                onClick={() => setShowAddForm(true)}
                className="bg-[#0c1a35] text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-[#b8966a] transition-colors"
              >
                <Plus size={16} /> Ajouter {activePage === 'buildings' ? 'un Immeuble' : 'une Unité'}
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                {activePage === 'buildings' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {buildings.map(bld => (
                      <BuildingCard key={bld.id} building={bld} onSelect={() => setSelectedItem({ type: 'building', data: bld })} />
                    ))}
                  </div>
                ) : (
                  <UnitTable units={units} onSelect={(u) => setSelectedItem({ type: 'unit', data: u })} />
                )}
              </div>

              {selectedItem && (
                <DetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}

            {showAddForm && (
                <PropertyForm 
                    type={activePage} 
                    onClose={() => setShowAddForm(false)} 
                />
            )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ── COMPONENTS ── */

function TabItem({ icon: Icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
        active 
          ? 'bg-white text-[#0c1a35] shadow-sm' 
          : 'text-[#7a8aaa] hover:text-[#0c1a35] hover:bg-white/50'
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

/* ── ADDITIONAL COMPONENTS ── */
function PropertyForm({ onClose }) {
  const [propertyStructure, setPropertyStructure] = useState('building-part'); 
  const [propertyCategory, setPropertyCategory] = useState('apartment'); 
  const [subType, setSubType] = useState('studio'); 
  const [transactionType, setTransactionType] = useState('rent');
  const [immobilierName, setImmobilierName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <aside className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#0c1a35]">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#b89a5a]">Nouveau Dossier</p>
            <h2 className="mt-1 font-serif text-xl text-white">Ajouter un Bien</h2>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white transition-colors">
            <X size={15} />
          </button>
        </div>

        <form className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* 1. STRUCTURE SELECTION */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Structure du Bien</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setPropertyStructure('building-part'); setPropertyCategory('apartment'); }}
                className={`flex-1 py-3 px-2 rounded-lg border text-[10px] font-bold uppercase transition-all ${
                  propertyStructure === 'building-part' ? 'bg-[#0c1a35] text-white border-[#0c1a35]' : 'bg-white text-gray-500 border-gray-100'
                }`}
              >
                Partie d'Immeuble
              </button>
              <button
                type="button"
                onClick={() => { setPropertyStructure('standalone'); setPropertyCategory('house'); }}
                className={`flex-1 py-3 px-2 rounded-lg border text-[10px] font-bold uppercase transition-all ${
                  propertyStructure === 'standalone' ? 'bg-[#0c1a35] text-white border-[#0c1a35]' : 'bg-white text-gray-500 border-gray-100'
                }`}
              >
                Propriété Unique
              </button>
            </div>
          </div>

          {/* 2. IMMOBILIER NAME */}
          <div className="space-y-3 animate-in fade-in duration-500">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {propertyStructure === 'building-part' ? "Nom de l'Immeuble" : "Nom du Complexe / Site"}
            </h3>
            <div className="relative">
               <Building2 className="absolute left-3 top-3.5 text-gray-400" size={16} />
               <input 
                type="text"
                value={immobilierName}
                onChange={(e) => setImmobilierName(e.target.value)}
                placeholder={propertyStructure === 'building-part' ? "Ex: Résidence Atlas" : "Ex: Domaine des Oliviers"}
                className="w-full bg-[#f7f6f3] border-none rounded-lg p-3 pl-10 text-sm focus:ring-1 focus:ring-[#b89a5a]"
               />
            </div>
          </div>

          {/* 3. CATEGORY SELECTION */}
{/* 3. CATEGORY SELECTION */}
<div className="space-y-3">
  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Type Principal</h3>
  <div className="flex flex-wrap gap-2">
    
    {/* Always show Apartment and Garage for both structures */}
    <button type="button" onClick={() => setPropertyCategory('apartment')} className={`flex-1 min-w-[80px] p-3 rounded-xl border flex flex-col items-center gap-2 ${propertyCategory === 'apartment' ? 'border-[#b89a5a] bg-[#fdfaf5] text-[#b89a5a]' : 'border-gray-50 text-gray-400'}`}>
      <DoorOpen size={18} />
      <span className="text-[9px] font-bold uppercase">Appartement</span>
    </button>

    {/* Show House and Land ONLY if it's "Propriété Unique" */}
    {propertyStructure === 'standalone' && (
      <>
        <button type="button" onClick={() => setPropertyCategory('house')} className={`flex-1 min-w-[80px] p-3 rounded-xl border flex flex-col items-center gap-2 ${propertyCategory === 'house' ? 'border-[#b89a5a] bg-[#fdfaf5] text-[#b89a5a]' : 'border-gray-50 text-gray-400'}`}>
          <Home size={18} />
          <span className="text-[9px] font-bold uppercase">Maison</span>
        </button>
        <button type="button" onClick={() => setPropertyCategory('land')} className={`flex-1 min-w-[80px] p-3 rounded-xl border flex flex-col items-center gap-2 ${propertyCategory === 'land' ? 'border-[#b89a5a] bg-[#fdfaf5] text-[#b89a5a]' : 'border-gray-50 text-gray-400'}`}>
          <Map size={18} />
          <span className="text-[9px] font-bold uppercase">Terrain</span>
        </button>
      </>
    )}

    {/* Always show Garage */}
    <button type="button" onClick={() => setPropertyCategory('garage')} className={`flex-1 min-w-[80px] p-3 rounded-xl border flex flex-col items-center gap-2 ${propertyCategory === 'garage' ? 'border-[#b89a5a] bg-[#fdfaf5] text-[#b89a5a]' : 'border-gray-50 text-gray-400'}`}>
      <Building2 size={18} />
      <span className="text-[9px] font-bold uppercase">Garage</span>
    </button>
    
  </div>
</div>

          {/* 4. TRANSACTION TYPE */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Transaction</h3>
            <div className="flex p-1 bg-[#f7f6f3] rounded-lg">
              {['rent', 'sell'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTransactionType(t)}
                  className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-md transition-all ${
                    transactionType === t ? 'bg-white text-[#0c1a35] shadow-sm' : 'text-gray-400'
                  }`}
                >
                  {t === 'rent' ? 'À Louer' : 'À Vendre'}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-[#f5f0e8]" />

          {/* Specific Details */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Détails spécifiques</h3>
            
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-600 uppercase">
                {propertyStructure === 'building-part' ? "N° de l'unité / Appt" : "Référence / Titre"}
              </label>
              <input type="text" placeholder={propertyStructure === 'building-part' ? "Ex: Appt 14" : "Ex: Villa 5"} className="w-full bg-[#f7f6f3] border-none rounded-sm p-3 text-sm focus:ring-1 focus:ring-[#b89a5a]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-600 uppercase">Surface (m²)</label>
                <input type="number" className="w-full bg-[#f7f6f3] border-none rounded-sm p-3 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-600 uppercase">
                  {transactionType === 'rent' ? 'Loyer (MAD)' : 'Prix (MAD)'}
                </label>
                <input type="text" placeholder="0.00" className="w-full bg-[#f7f6f3] border-none rounded-sm p-3 text-sm font-serif" />
              </div>
            </div>

            {/* NEW: DESCRIPTION FIELD */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-600 uppercase">Description & Notes</label>
              <textarea 
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Précisions supplémentaires (étage, orientation, balcon...)"
                className="w-full bg-[#f7f6f3] border-none rounded-sm p-3 text-sm focus:ring-1 focus:ring-[#b89a5a] resize-none"
              />
            </div>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="border-t border-[#e2ddd6] p-4 bg-gray-50 flex gap-3 mt-auto">
          <button onClick={onClose} type="button" className="flex-1 rounded-sm bg-white border border-[#e2ddd6] py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">Annuler</button>
          <button type="submit" className="flex-[2] rounded-sm bg-[#0c1a35] py-3 text-[10px] font-bold uppercase tracking-widest text-white shadow-md">Enregistrer</button>
        </div>
      </aside>
    </>
  );
}
function BuildingCard({ building, onSelect }) {
  return (
    <div onClick={onSelect} className="bg-white p-5 rounded-2xl border border-[#e0d8cc] cursor-pointer hover:shadow-lg transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-[#f5f0e8] rounded-lg text-[#0c1a35] group-hover:bg-[#0c1a35] group-hover:text-white transition-colors">
          <Building2 size={20} />
        </div>
        <MoreVertical size={16} className="text-[#e0d8cc]" />
      </div>
      <h3 className="font-serif text-lg mb-1">{building.name}</h3>
      <p className="text-[11px] text-[#7a8aaa] mb-4 flex items-center gap-1"><MapPin size={12}/> {building.address}</p>
      <div className="flex gap-6 border-t border-[#f5f0e8] pt-4">
        <div><div className="font-bold text-sm">{building.totalUnits}</div><div className="text-[9px] text-[#7a8aaa] uppercase">Unités</div></div>
        <div><div className="font-bold text-sm">{building.floors}</div><div className="text-[9px] text-[#7a8aaa] uppercase">Étages</div></div>
      </div>
    </div>
  );
}

function UnitTable({ units, onSelect }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e0d8cc] overflow-hidden shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#0c1a35] text-white/70 uppercase text-[10px] tracking-widest">
          <tr>
            <th className="px-6 py-4">Référence</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Loyer</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f5f0e8]">
          {units.map(u => (
            <tr key={u.id} onClick={() => onSelect(u)} className="hover:bg-[#f5f0e8]/50 cursor-pointer transition-colors">
              <td className="px-6 py-4 font-bold">{u.ref}</td>
              <td className="px-6 py-4 text-[#7a8aaa]">{u.type}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${u.status === 'rented' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                  {u.status === 'rented' ? 'LOUÉ' : 'VACANT'}
                </span>
              </td>
              <td className="px-6 py-4 text-right font-serif font-bold">{u.price.toLocaleString()} MAD</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DetailPanel({ item, onClose }) {
  const data = item.data;
  const isUnit = item.type === 'unit';

  // Config for the status badge based on data
  const getStatusCfg = () => {
    if (isUnit) {
      return data.status === 'rented' 
        ? { label: 'Loué', bg: 'bg-blue-50', border: 'border-blue-100', color: 'text-blue-700', icon: DoorOpen }
        : { label: 'Vacant', bg: 'bg-emerald-50', border: 'border-emerald-100', color: 'text-emerald-700', icon: Plus };
    }
    return { label: 'Actif', bg: 'bg-emerald-50', border: 'border-emerald-100', color: 'text-emerald-700', icon: Building2 };
  };

  const cfg = getStatusCfg();
  const StatusIcon = cfg.icon;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      {/* Slide-out Panel */}
      <aside className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#0c1a35]">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#b89a5a]">
              {isUnit ? 'Unité' : 'Immeuble'} · {data.id}
            </p>
            <h2 className="mt-1 font-serif text-xl text-white">
              {isUnit ? `Réf: ${data.ref}` : data.name}
            </h2>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white transition-colors">
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Status Section */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">État Actuel</h3>
            <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color} ${cfg.border}`}>
              <StatusIcon size={10} /> {cfg.label}
            </div>
          </div>

          {/* Property / Building Info */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Localisation</h3>
            <div className="rounded-sm bg-[#f7f6f3] p-4">
              <p className="font-medium text-[13px]">{isUnit ? `Immeuble ID: ${data.bldId}` : data.name}</p>
              <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-1">
                <MapPin size={10} className="text-[#b89a5a]" />
                {data.address || 'Tanger, Maroc'}
              </p>
              <p className="text-[12px] font-medium text-[#b89a5a] mt-2">
                {data.price ? `${data.price.toLocaleString()} MAD / mois` : `${data.totalUnits} Unités totales`}
              </p>
            </div>
          </div>

          {/* Technical Details */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Caractéristiques</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 uppercase">Surface / Taille</p>
                <p className="text-[12px] font-medium flex items-center gap-2">
                  <Layers size={12} className="text-[#b89a5a]" />
                  {data.area ? `${data.area} m²` : `${data.floors} Étages`}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 uppercase">Configuration</p>
                <p className="text-[12px] font-medium flex items-center gap-2">
                  <DoorOpen size={12} className="text-[#b89a5a]" />
                  {isUnit ? `${data.beds} Ch. / ${data.baths} SDB` : `Construit en ${data.year}`}
                </p>
              </div>
            </div>
          </div>

          {/* Contact / Manager */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Contact Responsable</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#f5f0e8] flex items-center justify-center text-[#b89a5a] font-bold text-[10px]">
                  {isUnit ? (data.tenant ? data.tenant[0] : '?') : (data.manager ? data.manager[0] : 'A')}
                </div>
                <div>
                  <p className="font-medium text-[12px]">{isUnit ? (data.tenant || 'Pas de locataire') : data.manager}</p>
                  <p className="text-[10px] text-gray-400">{isUnit ? 'Locataire actuel' : 'Gérant d\'immeuble'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {(data.notes || isUnit) && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Notes Internes</h3>
              <p className="text-[12px] text-gray-600 leading-relaxed italic">
                {data.notes || "Aucune note spécifique pour cet actif immobilier."}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-[#e2ddd6] p-4 space-y-2 bg-gray-50">
          <button className="w-full rounded-sm bg-[#0c1a35] py-3 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-all">
            Modifier la fiche
          </button>
          <div className="flex gap-2">
            <button className="flex-1 rounded-sm bg-white border border-[#e2ddd6] py-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:border-[#b89a5a] transition-all">
              Exporter PDF
            </button>
            <button className="flex-1 rounded-sm bg-rose-50 border border-rose-200 py-2 text-[10px] font-bold uppercase tracking-widest text-rose-700 hover:bg-rose-100 transition-colors">
              Supprimer
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-[#f5f0e8] last:border-0">
      <span className="text-[#7a8aaa] text-xs font-medium">{label}</span>
      <span className="text-xs font-bold text-[#0c1a35]">{value}</span>
    </div>
  );
}