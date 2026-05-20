"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { today } from '@/constants/attendance';

// --- Multi-lingual UI Dictionary Matrix ---
const modalLocales = {
  fr: {
    dir: 'ltr',
    modalTitle: 'Enregistrer une Présence',
    cancel: 'Annuler',
    save: 'Enregistrer',
    labels: {
      name: 'Nom de l\'employé',
      phone: 'Téléphone',
      email: 'Email',
      role: 'Poste',
      department: 'Département',
      date: 'Date',
      status: 'Statut',
      checkIn: 'Heure d\'entrée',
      checkOut: 'Heure de sortie',
      shift: 'Plage Horaire',
      hours: 'Heures de Travail',
      notes: 'Notes'
    },
    placeholders: {
      name: 'ex., Sarah Jenkins',
      phone: 'ex., +212...',
      email: 'ex., contact@agence.com',
      role: 'ex., Consultant Luxe',
      checkIn: 'ex., 9:05 AM',
      checkOut: 'ex., 6:00 PM',
      shift: 'ex., 9:00 AM – 6:00 PM',
      hours: 'ex., 8h 30m',
      notes: 'Ajouter des notes spécifiques ou des ajustements...'
    },
    departments: ['Ventes', 'Marketing', 'Opérations', 'Ressources Humaines', 'Technologie', 'Finance'],
    statuses: {
      present: 'Présent',
      late: 'En retard',
      'checked-out': 'Sortie enregistrée',
      'on-leave': 'En congé',
      absent: 'Absent'
    }
  },
  en: {
    dir: 'ltr',
    modalTitle: 'Log Attendance',
    cancel: 'Cancel',
    save: 'Save Record',
    labels: {
      name: 'Employee Name',
      phone: 'Phone',
      email: 'Email',
      role: 'Role',
      department: 'Department',
      date: 'Date',
      status: 'Status',
      checkIn: 'Check-in Time',
      checkOut: 'Check-out Time',
      shift: 'Shift Window',
      hours: 'Work Hours',
      notes: 'Notes'
    },
    placeholders: {
      name: 'e.g., Jane Doe',
      phone: 'e.g., +212...',
      email: 'e.g., name@agency.com',
      role: 'e.g., Luxury Consultant',
      checkIn: 'e.g., 9:05 AM',
      checkOut: 'e.g., 6:00 PM',
      shift: 'e.g., 9:00 AM – 6:00 PM',
      hours: 'e.g., 8h 30m',
      notes: 'Add special notes or logs regarding adjustments...'
    },
    departments: ['Sales', 'Marketing', 'Operations', 'Human Resources', 'Technology', 'Finance'],
    statuses: {
      present: 'Present',
      late: 'Late',
      'checked-out': 'Checked Out',
      'on-leave': 'On Leave',
      absent: 'Absent'
    }
  },
  ar: {
    dir: 'rtl',
    modalTitle: 'تسجيل الحضور اليومي',
    cancel: 'إلغاء',
    save: 'حفظ السجل',
    labels: {
      name: 'اسم الموظف',
      phone: 'رقم الهاتف',
      email: 'البريد الإلكتروني',
      role: 'المسمى الوظيفي',
      department: 'القسم',
      date: 'التاريخ',
      status: 'الحالة',
      checkIn: 'وقت الدخول',
      checkOut: 'وقت الخروج',
      shift: 'فترة الدوام',
      hours: 'ساعات العمل',
      notes: 'ملاحظات'
    },
    placeholders: {
      name: 'مثال: سارة بناني',
      phone: 'مثال: +212...',
      email: 'مثال: name@agency.com',
      role: 'مثال: مستشار عقاري فاخر',
      checkIn: 'مثال: 9:05 AM',
      checkOut: 'مثال: 6:00 PM',
      shift: 'مثال: 9:00 AM – 6:00 PM',
      hours: 'مثال: 8 ساعات',
      notes: 'إضافة ملاحظات خاصة أو تفاصيل حول التعديلات الحاصلة...'
    },
    departments: ['المبيعات', 'التسويق', 'العمليات', 'الموارد البشرية', 'التكنولوجيا', 'المالية'],
    statuses: {
      present: 'حاضر',
      late: 'متأخر',
      'checked-out': 'تم تسجيل الخروج',
      'on-leave': 'في إجازة',
      absent: 'غائب'
    }
  }
};

export function AddAttendanceModal({ onClose, onAdd, currentLang = 'fr' }) {
  const t = modalLocales[currentLang] || modalLocales.fr;
  const isRTL = t.dir === 'rtl';

  const [formData, setFormData] = useState({
    employeeName: '',
    employeePhone: '',
    employeeEmail: '',
    role: '',
    department: currentLang === 'ar' ? 'المبيعات' : currentLang === 'en' ? 'Sales' : 'Ventes',
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

  const renderField = (labelKey, key, type = 'text') => (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
        {t.labels[labelKey]}
      </label>
      <input 
        type={type} 
        placeholder={t.placeholders[labelKey]} 
        value={formData[key]}
        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
        className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] transition-colors placeholder:text-gray-400" 
      />
    </div>
  );

  return (
    <>
      {/* Backdrop blur overlay */}
      <div className="fixed inset-0 bg-black/20 z-[110] backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
      
      {/* Centered Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-[120] p-4" onClick={onClose}>
        <div 
          dir={t.dir}
          onClick={e => e.stopPropagation()} 
          className="bg-white rounded-sm shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150 border border-[#e2ddd6]/50"
        >
          
          {/* Header Panel */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2ddd6]">
            <h2 className={`text-lg text-[#0f1f3d] ${isRTL ? 'font-sans font-bold' : 'font-serif'}`}>
              {t.modalTitle}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-[#b89a5a] transition-colors">
              <X size={18} />
            </button>
          </div>
          
          {/* Form Matrix */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {renderField('name', 'employeeName', 'text')}
            
            <div className="grid grid-cols-2 gap-3">
              {renderField('phone', 'employeePhone', 'tel')}
              {renderField('email', 'employeeEmail', 'email')}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {renderField('role', 'role', 'text')}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                  {t.labels.department}
                </label>
                <div className="relative">
                  <select 
                    value={formData.department} 
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    className={`w-full rounded-sm border border-gray-200 bg-[#f7f6f3] py-2 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] transition-colors appearance-none cursor-pointer ${
                      isRTL ? 'pl-8 pr-3' : 'pr-8 pl-3'
                    }`}
                  >
                    {t.departments.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <div className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                    isRTL ? 'left-3' : 'right-3'
                  }`}>
                    ▼
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                  {t.labels.date}
                </label>
                <input 
                  type="date" 
                  required 
                  value={formData.date} 
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] transition-colors" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                  {t.labels.status}
                </label>
                <div className="relative">
                  <select 
                    value={formData.status} 
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className={`w-full rounded-sm border border-gray-200 bg-[#f7f6f3] py-2 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] transition-colors appearance-none cursor-pointer ${
                      isRTL ? 'pl-8 pr-3' : 'pr-8 pl-3'
                    }`}
                  >
                    {Object.entries(t.statuses).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                  <div className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                    isRTL ? 'left-3' : 'right-3'
                  }`}>
                    ▼
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {renderField('checkIn', 'checkInTime', 'text')}
              {renderField('checkOut', 'checkOutTime', 'text')}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {renderField('shift', 'shift', 'text')}
              {renderField('hours', 'workHours', 'text')}
            </div>
            
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                {t.labels.notes}
              </label>
              <textarea 
                value={formData.notes} 
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] transition-colors resize-none placeholder:text-gray-400" 
                rows={3} 
                placeholder={t.placeholders.notes} 
              />
            </div>
            
            {/* Modal Action Footer Layout */}
            <div className="flex gap-3 pt-4">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 rounded-sm border border-[#e2ddd6] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-gray-600 hover:border-[#b89a5a] hover:text-[#b89a5a] transition-colors"
              >
                {t.cancel}
              </button>
              <button 
                type="submit"
                className="flex-1 rounded-sm bg-[#0f1f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors"
              >
                {t.save}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}