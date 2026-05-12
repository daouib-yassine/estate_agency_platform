"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Direct redirect to dashboard without authentication
      window.location.href = "/admin/dashboard";
    } catch (error) {
      setError("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1f3d] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl tracking-widest uppercase">
            Altis<span className="text-[#b89a5a]">.</span>
          </h1>
          <p className="text-[#8e8b86] text-[10px] uppercase tracking-[0.2em] mt-2">Internal Agency Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8e8b86] mb-2">Professional Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-[#e8e6e2] py-3 outline-none focus:border-[#b89a5a] transition-all" 
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8e8b86] mb-2">Secure Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-[#e8e6e2] py-3 outline-none focus:border-[#b89a5a] transition-all" 
              required
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0f1f3d] text-white py-4 rounded font-bold uppercase tracking-widest text-[11px] hover:bg-[#b89a5a] transition-all mt-4 disabled:opacity-50"
          >
            {isLoading ? "Authorizing..." : "Authorize Access"}
          </button>
        </form>
        
        <p className="text-center text-[10px] text-[#8e8b86] mt-8 uppercase tracking-widest">
          Authorized personnel only. Logs are monitored.
        </p>
      </div>
    </div>
  );
}