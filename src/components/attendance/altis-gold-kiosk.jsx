"use client";

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Fingerprint, Smartphone, ChevronRight, CheckCircle2, Clock, Globe } from 'lucide-react';

// --- Multi-lingual UI Dictionary Matrix ---
const kioskLocales = {
  fr: {
    dir: 'ltr',
    brandName: 'Altis',
    titleMain: 'Présence',
    titleSub: 'des Employés',
    premiseWarning: 'Veuillez vous assurer que vous êtes dans les locaux de l’agence avant de scanner.',
    terminalStatus: 'Terminal Vérifié',
    successTitle: 'Enregistrement Réussi',
    successSub: 'Accès accordé. Passez une excellente journée.',
    tabQr: 'Code QR',
    tabManual: 'ID Manuel',
    scanTitle: 'Instructions de numérisation',
    scanDesc: 'Ouvrez l’application mobile Altis et pointez votre caméra vers l’écran ci-dessus.',
    clearBtn: 'Effacer'
  },
  en: {
    dir: 'ltr',
    brandName: 'Altis',
    titleMain: 'Worker',
    titleSub: 'Attendance',
    premiseWarning: 'Please ensure you are within the agency premises before scanning.',
    terminalStatus: 'Verified Terminal',
    successTitle: 'Check-in Success',
    successSub: 'Access granted. Have a wonderful day.',
    tabQr: 'QR Code',
    tabManual: 'Manual ID',
    scanTitle: 'Scanning Instructions',
    scanDesc: 'Open the Altis mobile app and point your camera at the screen above.',
    clearBtn: 'Clear'
  },
  ar: {
    dir: 'rtl',
    brandName: 'ألتيس',
    titleMain: 'تسجيل حضور',
    titleSub: 'الموظفين',
    premiseWarning: 'يرجى التأكد من تواجدك داخل مقر الوكالة قبل إتمام عملية المسح.',
    terminalStatus: 'محطة معتمدة آمنة',
    successTitle: 'تم تسجيل الحضور بنجاح',
    successSub: 'تم السماح بالدخول. نتمنى لك يوماً سعيداً.',
    tabQr: 'رمز QR',
    tabManual: 'المعرف اليدوي',
    scanTitle: 'تعليمات المسح الضوئي',
    scanDesc: 'افتح تطبيق ألتيس للهواتف المحمولة ووجه الكاميرا مباشرة نحو الشاشة أعلاه.',
    clearBtn: 'مسح'
  }
};

export function AltisGoldKiosk({ currentLang = 'fr', onLangChange }) {
  const t = kioskLocales[currentLang] || kioskLocales.fr;
  const isRTL = t.dir === 'rtl';

  // --- Kiosk Core Functionality States ---
  const [activeTab, setActiveTab] = useState('qr');
  const [workerNumber, setWorkerNumber] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleKeypadClick = (num) => {
    if (workerNumber.length < 4) setWorkerNumber(prev => prev + num);
  };

  const handleManualSubmit = () => {
    if (workerNumber.length === 4) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setWorkerNumber('');
      }, 3000);
    }
  };

  return (
    <div dir={t.dir} className="min-h-screen bg-[#fcfaf7] flex items-center justify-center p-6 font-sans select-none transition-all duration-300">
      
      {/* Decorative Branding Line Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#b89a5a]" />
      
      {/* Absolute Language Dynamic Switcher Control HUD Box */}
      <div className={`absolute top-6 flex items-center gap-1.5 bg-white border border-[#e2ddd6] shadow-sm rounded-sm px-2.5 py-1.5 z-50 ${isRTL ? 'left-6' : 'right-6'}`}>
        <Globe size={13} className="text-[#b89a5a]" />
        <select 
          value={currentLang} 
          onChange={(e) => onLangChange && onLangChange(e.target.value)}
          className="bg-transparent text-[11px] font-bold uppercase outline-none cursor-pointer text-[#0f1f3d]"
        >
          <option value="fr">FR</option>
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>
      </div>
      
      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-[350px_1fr] bg-white rounded-[2.5rem] shadow-[0_30px_80px_rgba(184,154,90,0.1)] overflow-hidden border border-[#b89a5a]/10">
        
        {/* LEFT PANEL: CONTEXTUAL BRANDING HUB */}
        <div className={`bg-[#faf8f5] p-12 flex flex-col justify-between border-[#b89a5a]/10 ${isRTL ? 'border-l' : 'border-r'}`}>
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-[#0f1f3d] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#b89a5a] font-serif text-lg">A</span>
              </div>
              <span className="font-serif text-xl tracking-[0.2em] text-[#0f1f3d] uppercase">{t.brandName}</span>
            </div>
            
            <h1 className={`text-4xl leading-tight text-[#0f1f3d] mb-6 ${currentLang === 'ar' ? 'font-sans font-bold' : 'font-serif'}`}>
              {t.titleMain} <br />
              <span className="text-[#b89a5a]">{t.titleSub}</span>
            </h1>
            
            <div className="space-y-6 mt-10">
              <div className="flex items-center gap-3 text-gray-500">
                <Clock size={16} className="text-[#b89a5a]" />
                <p className="text-[11px] font-bold uppercase tracking-widest">
                  {new Date().toLocaleTimeString(currentLang === 'ar' ? 'ar-MA' : 'fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
                {t.premiseWarning}
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-[#b89a5a]/10">
             <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#b89a5a]">{t.terminalStatus}</span>
          </div>
        </div>

        {/* RIGHT PANEL: INTERACTION ENGINE MATRIX */}
        <div className="p-8 lg:p-20 bg-white relative">
          
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500 text-center h-full">
              <div className="w-20 h-20 bg-[#b89a5a]/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-[#b89a5a]" />
              </div>
              <h2 className={`text-2xl text-[#0f1f3d] mb-2 ${currentLang === 'ar' ? 'font-sans font-bold' : 'font-serif'}`}>{t.successTitle}</h2>
              <p className="text-gray-400 text-sm italic">{t.successSub}</p>
            </div>
          ) : (
            <div className="max-w-sm mx-auto w-full">
              
              {/* INTERACTIVE NAVIGATION CONTROL TABS */}
              <div className="flex bg-gray-50 rounded-2xl p-1.5 mb-12 border border-gray-100">
                <button 
                  onClick={() => setActiveTab('qr')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'qr' ? 'bg-[#b89a5a] text-white shadow-md' : 'text-gray-400 hover:text-[#b89a5a]'}`}
                >
                  <Smartphone size={14} /> {t.tabQr}
                </button>
                <button 
                  onClick={() => setActiveTab('manual')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'manual' ? 'bg-[#b89a5a] text-white shadow-md' : 'text-gray-400 hover:text-[#b89a5a]'}`}
                >
                  <Fingerprint size={14} /> {t.tabManual}
                </button>
              </div>

              {/* RENDER VIEW: ENCRYPTED PORTAL QR MATRIX */}
              {activeTab === 'qr' ? (
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="bg-white p-4 rounded-[2rem] border-2 border-[#b89a5a]/20 shadow-xl mb-8">
                    <QRCodeSVG value="ALTIS_CHECKIN_TOKEN" size={220} fgColor="#0f1f3d" />
                  </div>
                  <div className="text-center">
                    <p className="text-[#0f1f3d] font-bold text-[11px] uppercase tracking-widest">{t.scanTitle}</p>
                    <p className="text-gray-400 text-xs mt-2 leading-relaxed">{t.scanDesc}</p>
                  </div>
                </div>
              ) : (
                /* RENDER VIEW: SECURITY IDENTIFIER KEYPAD */
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="flex flex-col items-center">
                    
                    {/* Secure Digits Feedback Container Matrix */}
                    <div className="flex gap-4 mb-12" dir="ltr">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className={`w-12 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${workerNumber[i] ? 'border-[#b89a5a] bg-[#b89a5a]/5' : 'border-gray-100 bg-gray-50'}`}>
                          {workerNumber[i] && <div className="w-2 h-2 bg-[#0f1f3d] rounded-full" />}
                        </div>
                      ))}
                    </div>

                    {/* Integrated Numeric Entry Grid Platform */}
                    <div className="grid grid-cols-3 gap-3 w-full" dir="ltr">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button 
                          key={num}
                          type="button"
                          onClick={() => handleKeypadClick(num.toString())}
                          className="h-14 rounded-xl bg-gray-50 text-[#0f1f3d] font-bold text-lg hover:bg-[#b89a5a] hover:text-white transition-all active:scale-95"
                        >
                          {num}
                        </button>
                      ))}
                      
                      <button 
                        type="button" 
                        onClick={() => setWorkerNumber('')} 
                        className="h-14 rounded-xl text-red-400 font-bold text-[9px] uppercase tracking-widest hover:bg-red-50 transition-all"
                      >
                        {t.clearBtn}
                      </button>
                      
                      <button 
                        type="button" 
                        onClick={() => handleKeypadClick('0')} 
                        className="h-14 rounded-xl bg-gray-50 text-[#0f1f3d] font-bold text-lg hover:bg-[#b89a5a] hover:text-white transition-all"
                      >
                        0
                      </button>
                      
                      <button 
                        type="button" 
                        onClick={handleManualSubmit}
                        disabled={workerNumber.length < 4}
                        className="h-14 rounded-xl bg-[#0f1f3d] text-[#b89a5a] flex items-center justify-center hover:bg-[#b89a5a] hover:text-white transition-all disabled:opacity-10 cursor-pointer"
                      >
                        <ChevronRight size={20} className={isRTL ? "transform rotate-180" : ""} />
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}