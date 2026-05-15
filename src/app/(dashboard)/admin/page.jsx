"use client";
import React, { useState } from 'react';
import { Search, Bell, Plus, CheckCircle2 } from 'lucide-react';
// import Sidebar from '@/components/admin/Sidebar';
import DashboardView from '@/components/admin/DashboardView';
import { STATUS_CONFIG } from '@/constants/dashboard';

const INITIAL_VISITS = [
  {
    id: '1',
    clientName: 'Sarah Jenkins',
    property: 'The Meridian Residences - Unit 4B',
    agent: 'Sophia Laurent',
    date: new Date().toISOString().split('T')[0],
    status: 'confirmed',
  },
  {
    id: '2',
    clientName: 'Michael Chen',
    property: 'Pinnacle Tower - Floor 12',
    agent: 'Marcus Webb',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
  }
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [visits, setVisits] = useState(INITIAL_VISITS);
  const [notification, setNotification] = useState(null);

  const pendingCount = visits.filter(v => v.status === 'pending').length;

  const updateStatus = (id, status) => {
    setVisits(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    setNotification(`Status updated to ${STATUS_CONFIG[status].label}`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex h-screen bg-[#f0ede8] font-sans text-[#0f1f3d] overflow-hidden">
      {/* <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} /> */}

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#e2ddd6] bg-white px-6 py-3.5 flex-shrink-0">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="rounded-sm border border-gray-200 bg-[#f7f6f3] pl-9 pr-4 py-2 text-[12px] outline-none focus:border-[#b89a5a] w-64" 
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#f7f6f3] border border-gray-200">
              <Bell size={14} />
              {pendingCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#b89a5a] text-[8px] font-bold text-white">
                  {pendingCount}
                </span>
              )}
            </button>
            <button className="flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-all">
              <Plus size={12} /> New Visit
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <DashboardView visits={visits} updateStatus={updateStatus} />
        </main>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-sm bg-[#0f1f3d] px-5 py-3.5 shadow-2xl border-l-4 border-[#b89a5a] animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 size={15} className="text-[#d4b87a]" />
          <span className="text-[12px] font-medium text-white">{notification}</span>
        </div>
      )}
    </div>
  );
}