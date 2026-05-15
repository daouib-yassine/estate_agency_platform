import React from 'react';
import { Calendar, UserCheck, Clock, Star } from 'lucide-react';
import { STATUS_CONFIG } from '@/constants/dashboard';

const DashboardView = ({ visits, updateStatus }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayVisits = visits.filter(v => v.date === today);
  
  const kpis = [
    { 
      label: "Today's Visits", 
      val: todayVisits.length, 
      icon: Calendar, 
      trend: '+2 vs yesterday', 
      color: 'bg-[#0f1f3d]' 
    },
    { 
      label: 'Confirmed', 
      val: visits.filter(v => v.status === 'confirmed').length, 
      icon: UserCheck, 
      trend: 'Active sessions', 
      color: 'bg-emerald-700' 
    },
    { 
      label: 'Pending', 
      val: visits.filter(v => v.status === 'pending').length, 
      icon: Clock, 
      trend: 'Needs action', 
      color: 'bg-amber-600' 
    },
    { 
      label: 'Deals Closed', 
      val: visits.filter(v => v.status === 'completed').length, 
      icon: Star, 
      trend: 'This month', 
      color: 'bg-[#b89a5a]' 
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ label, val, icon: Icon, trend, color }) => (
          <div key={label} className="relative overflow-hidden rounded-sm border border-[#e2ddd6] bg-white p-5 shadow-sm">
            <div className={`absolute left-0 top-0 h-full w-1 ${color}`} />
            <div className="mb-3 flex items-start justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
              <div className={`flex h-8 w-8 items-center justify-center rounded-sm ${color}`}>
                <Icon size={14} className="text-white" />
              </div>
            </div>
            <div className="font-serif text-4xl text-[#0f1f3d]">{val}</div>
            <div className="mt-2 text-[10px] font-medium text-emerald-600">{trend}</div>
          </div>
        ))}
      </div>

      {/* Recent Attendance Table */}
      <div className="rounded-sm border border-[#e2ddd6] bg-white shadow-sm">
        <div className="border-b border-[#e2ddd6] px-6 py-4">
          <h2 className="font-serif text-lg text-[#0f1f3d]">Recent Attendance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#faf9f7]">
              <tr className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                <th className="px-6 py-3 text-left font-bold">Client & Property</th>
                <th className="px-6 py-3 text-left font-bold">Agent</th>
                <th className="px-6 py-3 text-left font-bold">Status</th>
                <th className="px-6 py-3 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f7f5f2]">
              {visits.map((v) => {
                const cfg = STATUS_CONFIG[v.status] || STATUS_CONFIG.pending;
                const StatusIcon = cfg.icon;
                
                return (
                  <tr key={v.id} className="transition-colors hover:bg-[#faf9f7]/50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-[#0f1f3d]">{v.clientName}</p>
                      <p className="text-[11px] text-gray-400">{v.property}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#4a4845]">
                      {v.agent}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase ${cfg.bg} ${cfg.color}`}>
                        <StatusIcon size={10} />
                        {cfg.label}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {v.status === 'pending' ? (
                        <button 
                          onClick={() => updateStatus(v.id, 'confirmed')}
                          className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-800"
                        >
                          Confirm Visit
                        </button>
                      ) : (
                        <span className="text-[10px] font-medium uppercase text-gray-300">No Actions</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {visits.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-400 italic">
              No attendance records found for today.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;