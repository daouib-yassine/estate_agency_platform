import React, { useState } from 'react';
import { Phone, Mail, Calendar, CheckCircle2, Eye } from 'lucide-react';

const PropertySidebar = ({ agent }) => {
  const [formSent, setFormSent] = useState(false);

  return (
    <div className="space-y-6">
      <div className="sticky top-28 rounded-sm border border-gray-100 bg-white shadow-xl overflow-hidden">
        <div className="bg-[#0f1f3d] px-6 py-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4b87a]">Your Dedicated Agent</p>
        </div>
        <div className="px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <img src={agent.img} alt={agent.name} className="h-16 w-16 rounded-full object-cover border-2 border-[#b89a5a]/30" />
            <div>
              <p className="font-serif text-lg font-medium">{agent.name}</p>
              <p className="text-[11px] text-[#b89a5a] uppercase tracking-wider">{agent.title}</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            <a href={`tel:${agent.phone}`} className="flex items-center gap-3 rounded-sm bg-[#f7f6f3] px-4 py-3 text-sm font-medium hover:bg-[#0f1f3d] hover:text-white transition-all">
              <Phone size={14} className="text-[#b89a5a]" /> {agent.phone}
            </a>
            <a href={`mailto:${agent.email}`} className="flex items-center gap-3 rounded-sm bg-[#f7f6f3] px-4 py-3 text-sm font-medium hover:bg-[#0f1f3d] hover:text-white transition-all">
              <Mail size={14} className="text-[#b89a5a]" /> {agent.email}
            </a>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }} className="space-y-3">
             <input type="text" placeholder="Your Full Name" className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-4 py-3 text-sm outline-none" required />
             <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#0f1f3d] py-4 text-[11px] font-bold uppercase text-white hover:bg-[#b89a5a]">
               <Calendar size={14} /> Request a Visit
             </button>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
        <Eye size={13} /> 187 people viewed this property
      </div>
    </div>
  );
};

export default PropertySidebar;