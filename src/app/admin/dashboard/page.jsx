import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#f7f6f3] text-[#0f1f3d]">
      {/* ── SIDEBAR ── */}
      <aside className="w-64 bg-[#0f1f3d] text-white flex flex-col fixed h-full">
        <div className="p-8 text-2xl font-serif tracking-widest border-b border-white/10">
          ALTIS<span className="text-[#b89a5a]">.</span>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          <NavItem icon="📊" label="Overview" active />
          <NavItem icon="🏢" label="Immeubles" />
          <NavItem icon="🔑" label="Apartments" />
          <NavItem icon="👥" label="Workers" />
          <NavItem icon="🕒" label="Attendance" />
          <NavItem icon="⚙️" label="Settings" />
        </nav>
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#b89a5a]" />
            <div className="text-[10px] uppercase tracking-widest text-white/50">Admin Account</div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 ml-64 p-10">
        {/* TOP BAR */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-serif">Agency Command Center</h1>
            <p className="text-sm text-[#8e8b86]">Welcome back, managing 14 buildings today.</p>
          </div>
          <button className="bg-[#b89a5a] text-white px-6 py-2 rounded text-[11px] font-bold uppercase tracking-widest hover:bg-[#0f1f3d] transition-all">
            + New Listing
          </button>
        </header>

        {/* ── KPI STATS ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard title="Active Rents" value="128" sub="94% Occupancy" />
          <StatCard title="Total Revenue" value="$42.5K" sub="Monthly projection" />
          <StatCard title="Workers On-Site" value="8" sub="Across 4 buildings" />
          <StatCard title="Overdue Rent" value="3" sub="Requires attention" />
        </div>

        {/* ── SPLIT VIEW ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Building Management (Immeubles) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#e8e6e2] overflow-hidden">
            <div className="p-6 border-b border-[#e8e6e2] flex justify-between items-center">
              <h3 className="font-serif text-xl">Portfolio Status</h3>
              <button className="text-[10px] uppercase tracking-widest text-[#b89a5a] font-bold">View All</button>
            </div>
            <div className="p-0">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f7f6f3] text-[10px] uppercase tracking-widest text-[#8e8b86]">
                  <tr>
                    <th className="p-4">Immeuble</th>
                    <th className="p-4">Units</th>
                    <th className="p-4">Staff</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <BuildingRow name="Residence Gold" units="24/24" staff="3" status="Fully Rented" />
                  <BuildingRow name="Altis Tower" units="18/20" staff="2" status="2 Available" />
                  <BuildingRow name="Skyline Hub" units="5/12" staff="3" status="Renovating" />
                </tbody>
              </table>
            </div>
          </div>

          {/* Real-time Worker Attendance */}
          <div className="bg-white rounded-xl shadow-sm border border-[#e8e6e2] p-6">
            <h3 className="font-serif text-xl mb-6">Live Attendance</h3>
            <div className="space-y-6">
              <WorkerStatus name="Julian Thorne" building="Residence Gold" time="08:45 AM" status="in" />
              <WorkerStatus name="Amine Rahmani" building="Altis Tower" time="09:12 AM" status="in" />
              <WorkerStatus name="Sarah Chen" building="None" time="05:30 PM" status="out" />
            </div>
            <button className="w-full mt-8 py-3 border border-[#d8d5d0] rounded text-[10px] uppercase tracking-widest hover:bg-[#0f1f3d] hover:text-white transition-all">
              Generate Weekly Report
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

/* ── HELPER COMPONENTS ── */

const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all ${active ? 'bg-[#b89a5a] text-white' : 'hover:bg-white/5 text-white/70'}`}>
    <span className="text-lg">{icon}</span>
    <span className="text-xs uppercase tracking-widest font-medium">{label}</span>
  </div>
);

const StatCard = ({ title, value, sub }) => (
  <div className="bg-white p-6 rounded-xl border border-[#e8e6e2] shadow-sm">
    <p className="text-[10px] uppercase tracking-widest text-[#8e8b86] mb-1">{title}</p>
    <p className="text-2xl font-bold text-[#0f1f3d]">{value}</p>
    <p className="text-[11px] text-[#b89a5a] mt-1">{sub}</p>
  </div>
);

const BuildingRow = ({ name, units, staff, status }) => (
  <tr className="border-b border-[#e8e6e2] hover:bg-[#f7f6f3]/50 transition-all">
    <td className="p-4 font-medium">{name}</td>
    <td className="p-4 text-[#8e8b86]">{units}</td>
    <td className="p-4 text-[#8e8b86]">{staff}</td>
    <td className="p-4 text-[10px] font-bold uppercase tracking-tight text-[#b89a5a]">{status}</td>
  </tr>
);

const WorkerStatus = ({ name, building, time, status }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${status === 'in' ? 'bg-green-500' : 'bg-gray-300'}`} />
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-[10px] text-[#8e8b86] uppercase tracking-tighter">{building}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-xs font-mono">{time}</p>
      <p className="text-[9px] uppercase text-[#8e8b86]">{status === 'in' ? 'Pointé' : 'Sorti'}</p>
    </div>
  </div>
);

export default AdminDashboard;