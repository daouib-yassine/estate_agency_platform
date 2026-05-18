import React, { useState } from 'react';
import { X } from 'lucide-react';
import { today } from '@/constants/attendance';

export function AddAttendanceModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeePhone: '',
    employeeEmail: '',
    role: '',
    department: 'Sales',
    date: today || '',
    checkInTime: '',
    checkOutTime: '',
    shift: '9:00 AM – 6:00 PM',
    status: 'present',
    workHours: '–',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      id: `A${String(Math.floor(Math.random() * 9000) + 1000)}`,
      ...formData,
      checkOutTime: formData.checkOutTime || undefined,
    };
    onAdd(newRecord);
  };

  const renderField = (label, key, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
        {label}
      </label>
      <input 
        type={type} 
        placeholder={placeholder} 
        value={formData[key]}
        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
        className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] transition-colors placeholder:text-gray-400" 
      />
    </div>
  );

  return (
    <>
      {/* Backdrop blur overlay */}
      <div className="fixed inset-0 bg-black/20 z-30 backdrop-blur-sm" onClick={onClose} />
      
      {/* Centered Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
        <div className="bg-white rounded-sm shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header Panel */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2ddd6]">
            <h2 className="font-serif text-lg text-[#0f1f3d]">Log Attendance</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={18} />
            </button>
          </div>
          
          {/* Form Matrix */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {renderField('Employee Name', 'employeeName', 'text', 'e.g., Jane Doe')}
            
            <div className="grid grid-cols-2 gap-3">
              {renderField('Phone', 'employeePhone', 'tel', 'e.g., +212...')}
              {renderField('Email', 'employeeEmail', 'email', 'e.g., name@agency.com')}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {renderField('Role', 'role', 'text', 'e.g., Luxury Consultant')}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Department</label>
                <select 
                  value={formData.department} 
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] transition-colors"
                >
                  {['Sales', 'Marketing', 'Operations', 'Human Resources', 'Technology', 'Finance'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Date</label>
                <input 
                  type="date" 
                  required 
                  value={formData.date} 
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] transition-colors" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Status</label>
                <select 
                  value={formData.status} 
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] transition-colors"
                >
                  <option value="present">Present</option>
                  <option value="late">Late</option>
                  <option value="checked-out">Checked Out</option>
                  <option value="on-leave">On Leave</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {renderField('Check-in Time', 'checkInTime', 'text', 'e.g., 9:05 AM')}
              {renderField('Check-out Time', 'checkOutTime', 'text', 'e.g., 6:00 PM')}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {renderField('Shift Window', 'shift', 'text', 'e.g., 9:00 AM – 6:00 PM')}
              {renderField('Work Hours', 'workHours', 'text', 'e.g., 8h 30m')}
            </div>
            
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Notes</label>
              <textarea 
                value={formData.notes} 
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] transition-colors resize-none" 
                rows={3} 
                placeholder="Add special notes or logs regarding adjustments..." 
              />
            </div>
            
            {/* Modal Action Footer */}
            <div className="flex gap-3 pt-4">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 rounded-sm border border-[#e2ddd6] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-gray-600 hover:border-[#b89a5a] transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 rounded-sm bg-[#0f1f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors"
              >
                Save Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}