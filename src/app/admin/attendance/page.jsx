import React, { useState } from 'react';

const AttendanceScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // This function would call your Next.js API route
  const handlePointage = async (employeeId) => {
    const response = await fetch('/api/attendance/scan', {
      method: 'POST',
      body: JSON.stringify({ employeeId, timestamp: new Date() }),
    });
    const data = await response.json();
    setScanResult(data);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white border border-[#e8e6e2] rounded-lg shadow-sm">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl text-[#0f1f3d]">Station de Pointage</h2>
        <p className="text-[#8e8b86] text-xs uppercase tracking-widest mt-1">Scan your ID Card</p>
      </div>

      {/* Scanner Viewport Area */}
      <div className="relative aspect-video bg-[#f7f6f3] border-2 border-dashed border-[#d8d5d0] rounded-lg flex items-center justify-center overflow-hidden">
        {isScanning ? (
          <div className="w-full h-full bg-black flex items-center justify-center text-white text-xs">
            {/* Camera feed would render here */}
            <div className="absolute inset-0 border-2 border-[#b89a5a] animate-pulse m-12"></div>
            Camera Active...
          </div>
        ) : (
          <button 
            onClick={() => setIsScanning(true)}
            className="bg-[#0f1f3d] text-white px-6 py-3 rounded text-[11px] font-bold uppercase tracking-widest hover:bg-[#b89a5a] transition-all"
          >
            Activate Scanner
          </button>
        )}
      </div>

      {/* Last Scan Feedback */}
      {scanResult && (
        <div className={`mt-6 p-4 rounded-md flex items-center justify-between ${scanResult.success ? 'bg-green-50 border border-green-100' : 'bg-red-50'}`}>
          <div>
            <p className="text-[10px] uppercase font-bold text-green-700">Scan Successful</p>
            <p className="text-sm font-medium text-[#0f1f3d]">{scanResult.employeeName}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-serif">{scanResult.time}</p>
            <p className="text-[10px] text-[#8e8b86] uppercase">{scanResult.type === 'in' ? 'Check-In' : 'Check-Out'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceScanner;