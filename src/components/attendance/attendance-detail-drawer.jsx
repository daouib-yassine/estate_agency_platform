import React from 'react';
import { X, Building2, Clock, Calendar, Phone, Mail, RefreshCw } from 'lucide-react';
import { statusConfig } from '@/constants/attendance';

/**
 * Quick date formatter helper
 */
function fmt(dateString) {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch (e) {
    return dateString;
  }
}

export function AttendanceDetailDrawer({ record, onClose, updateStatus }) {
  if (!record) return null;

  const cfg = statusConfig[record.status] || { label: record.status, color: 'text-gray-500', bg: 'bg-gray-50', icon: Clock };
  const StatusIcon = cfg.icon;

  return (
    <>
      {/* Backdrop blur overlay */}
      <div className="fixed inset-0 bg-black/20 z-30 backdrop-blur-sm" onClick={onClose} />
      
      {/* Slider Drawer Container */}
      <aside className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-40 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Top Header Information Panel */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#0f1f3d]">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#b89a5a]">Attendance · {record.id}</p>
            <h2 className="mt-1 font-serif text-xl text-white">{record.employeeName}</h2>
            <p className="text-[11px] text-white/50 mt-0.5">{record.role} · {record.department}</p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white transition-colors">
            <X size={15} />
          </button>
        </div>

        {/* Scrollable Detailed Sections */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Status</h3>
            <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color}`}>
              <StatusIcon size={10} />{cfg.label}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Role & Department</h3>
            <div className="rounded-sm bg-[#f7f6f3] p-4 space-y-1">
              <p className="font-medium text-[13px] text-[#0f1f3d]">{record.role}</p>
              <p className="text-[11px] text-gray-400 flex items-center gap-1"><Building2 size={10} className="text-[#b89a5a]" />{record.department}</p>
              <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-1"><Clock size={10} className="text-[#b89a5a]" />Shift: {record.shift}</p>
              {record.workHours && record.workHours !== '–' && (
                <p className="text-[12px] font-bold text-[#b89a5a] mt-2 pt-1 border-t border-[#e2ddd6]/60">Hours Worked: {record.workHours}</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Attendance Record</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center gap-2 text-[12px]"><Calendar size={12} className="text-[#b89a5a]" />{fmt(record.date)}</div>
              <div className="flex items-center gap-2 text-[12px]"><Clock size={12} className="text-[#b89a5a]" />Check-in: {record.checkInTime}</div>
              {record.checkOutTime && <div className="flex items-center gap-2 text-[12px]"><Clock size={12} className="text-[#b89a5a]" />Check-out: {record.checkOutTime}</div>}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Contact Details</h3>
            <div className="space-y-2 text-gray-700">
              {record.employeePhone && <div className="flex items-center gap-2 text-[12px]"><Phone size={12} className="text-[#b89a5a]" />{record.employeePhone}</div>}
              {record.employeeEmail && <div className="flex items-center gap-2 text-[12px]"><Mail size={12} className="text-[#b89a5a]" />{record.employeeEmail}</div>}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Notes</h3>
            <p className="text-[12px] text-gray-600 bg-gray-50 rounded-sm p-3 border border-dashed border-[#e2ddd6]">{record.notes || 'No notes added for this attendance log.'}</p>
          </div>
        </div>

        {/* Dynamic Action Dispatch Footers */}
        <div className="border-t border-[#e2ddd6] p-4 space-y-2 bg-gray-50">
          {record.status === 'late' && (
            <>
              <button onClick={() => updateStatus(record.id, 'present')} className="w-full rounded-sm bg-emerald-50 border border-emerald-200 py-2 text-[10px] font-bold uppercase tracking-widest text-emerald-700 hover:bg-emerald-100 transition-colors">✓ Mark Present</button>
              <button onClick={() => updateStatus(record.id, 'absent')} className="w-full rounded-sm bg-gray-50 border border-gray-200 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-100 transition-colors">Mark Absent</button>
            </>
          )}
          {record.status === 'present' && (
            <>
              <button onClick={() => updateStatus(record.id, 'checked-out')} className="w-full rounded-sm bg-blue-50 border border-blue-200 py-2 text-[10px] font-bold uppercase tracking-widest text-blue-700 hover:bg-blue-100 transition-colors">✓ Check Out</button>
              <button onClick={() => updateStatus(record.id, 'absent')} className="w-full rounded-sm bg-gray-50 border border-gray-200 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-100 transition-colors">Mark Absent</button>
              <button onClick={() => updateStatus(record.id, 'on-leave')} className="w-full rounded-sm bg-rose-50 border border-rose-200 py-2 text-[10px] font-bold uppercase tracking-widest text-rose-700 hover:bg-rose-100 transition-colors">✕ Mark On Leave</button>
            </>
          )}
          {(record.status === 'checked-out' || record.status === 'on-leave' || record.status === 'absent') && (
            <button onClick={() => updateStatus(record.id, 'present')} className="w-full rounded-sm bg-[#f0ede8] border border-[#e2ddd6] py-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:border-[#b89a5a] transition-all flex items-center justify-center gap-1">
              <RefreshCw size={10} /> Reset to Present
            </button>
          )}
        </div>

      </aside>
    </>
  );
}