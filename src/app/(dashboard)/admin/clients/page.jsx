'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage'; 
import ClientTableView from '@/components/clients/client-table-view';
import ClientCardView from '@/components/clients/client-card-view';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table');
  
  // Get the current translation locale (e.g., 'ar', 'fr', 'en')
  const { currentLang } = useLanguage(); 

  useEffect(() => {
    async function loadLiveClients() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) throw new Error('API server link connection severed');
        
        const data = await response.json();
        
        // Ensure you extract from the specific 'clients' data array
        if (data && Array.isArray(data.clients)) {
          setClients(data.clients);
        } else if (Array.isArray(data)) {
          setClients(data);
        } else {
          setClients([]);
        }
      } catch (error) {
        console.warn("Portfolio sync warning:", error.message || error);
        setClients([]); // Fallback safely to empty list to keep layout stable
      } finally {
        setIsLoading(false);
      }
    }
    loadLiveClients();
  }, [currentLang]);

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center bg-[#f0ede8]">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#b89a5a]" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between border-b border-[#e2ddd6] pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#0f1f3d]">
            {currentLang === 'ar' ? 'إدارة العملاء' : currentLang === 'fr' ? 'Gestion des Clients' : 'Client Management'}
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-0.5">
            Total: {clients.length}
          </p>
        </div>
        
        {/* Toggle Controls */}
        <div className="flex gap-2 bg-[#f7f6f3] border border-gray-200 p-1 rounded-sm text-[11px] font-bold uppercase font-mono">
          <button 
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-xs transition-colors ${viewMode === 'table' ? 'bg-[#0f1f3d] text-white' : 'text-gray-500 hover:text-[#0f1f3d]'}`}
          >
            {currentLang === 'ar' ? 'جدول' : 'Table'}
          </button>
          <button 
            onClick={() => setViewMode('card')}
            className={`px-3 py-1.5 rounded-xs transition-colors ${viewMode === 'card' ? 'bg-[#0f1f3d] text-white' : 'text-gray-500 hover:text-[#0f1f3d]'}`}
          >
            {currentLang === 'ar' ? 'بطاقات' : 'Cards'}
          </button>
        </div>
      </div>

      {/* Conditional Interface Rendering Layout */}
      {clients.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-sm font-mono text-xs text-gray-400">
          {currentLang === 'ar' ? 'لا يوجد عملاء متاحين حالياً' : currentLang === 'fr' ? 'Aucun client disponible' : 'No clients currently available'}
        </div>
      ) : viewMode === 'table' ? (
        <ClientTableView clients={clients} currentLang={currentLang} />
      ) : (
        <ClientCardView clients={clients} currentLang={currentLang} />
      )}
    </div>
  );
}