"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0f1f3d] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl tracking-widest uppercase">
            Altis<span className="text-[#b89a5a]">.</span>
          </h1>
          <p className="text-[#8e8b86] text-[10px] uppercase tracking-[0.2em] mt-2">Internal Agency Portal</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8e8b86] mb-2">Professional Email</label>
            <input type="email" className="w-full border-b border-[#e8e6e2] py-3 outline-none focus:border-[#b89a5a] transition-all" />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8e8b86] mb-2">Secure Password</label>
            <input type="password" className="w-full border-b border-[#e8e6e2] py-3 outline-none focus:border-[#b89a5a] transition-all" />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#0f1f3d] text-white py-4 rounded font-bold uppercase tracking-widest text-[11px] hover:bg-[#b89a5a] transition-all mt-4"
          >
            Authorize Access
          </button>
        </form>
        
        <p className="text-center text-[10px] text-[#8e8b86] mt-8 uppercase tracking-widest">
          Authorized personnel only. Logs are monitored.
        </p>
      </div>
    </div>
  );
}