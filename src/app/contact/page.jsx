"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, Phone, MapPin, Clock, 
  Send, ArrowRight, MessageSquare, 
  Globe, ChevronRight 
} from 'lucide-react';
import { SiInstagram, SiX } from '@icons-pack/react-simple-icons';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    interest: 'Buying',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic
    console.log("Form Submitted:", formState);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#0f1f3d] selection:bg-[#b89a5a] selection:text-white">
      
      {/* ── NAV (Simplified for Contact) ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-[#0f1f3d] lg:px-16">
        <Link href="/" className="font-serif text-2xl font-medium tracking-wider text-white">
          Altis<span className="text-[#d4b87a]">.</span>
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/properties" className="text-[11px] font-normal uppercase tracking-[0.15em] text-white/80 hover:text-[#d4b87a] transition-colors">
            Back to Listings
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-8 lg:px-16">
          
          {/* ── HEADER ── */}
          <div className="mb-16 max-w-2xl">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#b89a5a]">Inquiry</p>
            <h1 className="font-serif text-5xl font-light leading-tight md:text-6xl">
              Connect with <br />
              <em className="not-italic text-[#d4b87a]">Our Advisors.</em>
            </h1>
            <p className="mt-6 text-lg font-light text-gray-500 leading-relaxed">
              Whether you are looking to divest a portfolio or acquire a primary residence, 
              our team provides the discretion and data you require.
            </p>
          </div>

          <div className="grid gap-16 lg:grid-cols-[1fr_400px]">
            
            {/* ── LEFT: FORM ── */}
            <section className="rounded-sm border border-gray-100 bg-[#fcfbf9] p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jonathan Doe"
                      className="w-full border-b border-gray-200 bg-transparent py-3 text-sm outline-none focus:border-[#b89a5a] transition-colors"
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="email@domain.com"
                      className="w-full border-b border-gray-200 bg-transparent py-3 text-sm outline-none focus:border-[#b89a5a] transition-colors"
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nature of Inquiry</label>
                  <div className="flex flex-wrap gap-3">
                    {['Buying', 'Selling', 'Development', 'General'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormState({...formState, interest: type})}
                        className={`rounded-full px-6 py-2 text-[11px] font-medium transition-all ${
                          formState.interest === type 
                          ? 'bg-[#0f1f3d] text-white' 
                          : 'border border-gray-200 text-gray-500 hover:border-[#b89a5a]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="How can we assist you?"
                    className="w-full border-b border-gray-200 bg-transparent py-3 text-sm outline-none focus:border-[#b89a5a] transition-colors resize-none"
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="group flex items-center gap-3 bg-[#0f1f3d] px-10 py-4 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-all"
                >
                  Submit Inquiry 
                  <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </section>

            {/* ── RIGHT: INFO ── */}
            <aside className="space-y-12">
              
              {/* Primary Office */}
              <div>
                <h3 className="mb-6 font-serif text-xl">Main Office</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin size={18} className="mt-1 text-[#b89a5a]" />
                    <p className="text-sm font-light leading-relaxed text-gray-600">
                      450 N Bedford Dr,<br />
                      Beverly Hills, CA 90210
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={18} className="text-[#b89a5a]" />
                    <a href="tel:+13105550190" className="text-sm font-light text-gray-600 hover:text-[#b89a5a]">
                      +1 (310) 555-0190
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail size={18} className="text-[#b89a5a]" />
                    <a href="mailto:hello@altisrealty.com" className="text-sm font-light text-gray-600 hover:text-[#b89a5a]">
                      hello@altisrealty.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="rounded-sm bg-[#0f1f3d] p-8 text-white">
                <div className="mb-4 flex items-center gap-3">
                  <Clock size={16} className="text-[#d4b87a]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4b87a]">Consultation Hours</span>
                </div>
                <div className="space-y-3 text-sm font-light opacity-70">
                  <div className="flex justify-between">
                    <span>Mon — Fri</span>
                    <span>9:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-[#d4b87a]">By Appointment</span>
                  </div>
                </div>
              </div>

              {/* Global Reach */}
              <div>
                <h4 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Social Channels</h4>
                <div className="flex gap-4">
                  {[SiInstagram, SiX].map((Icon, i) => (
                    <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 text-gray-400 hover:border-[#b89a5a] hover:text-[#b89a5a] transition-all">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

            </aside>
          </div>
        </div>
      </main>

      {/* ── MAP PLACEHOLDER ── */}
      <section className="h-[400px] w-full bg-gray-100 grayscale transition-all hover:grayscale-0">
        {/* You would integrate Google Maps or Mapbox here */}
        <div className="flex h-full w-full items-center justify-center bg-[#f0ece4]">
          <div className="text-center">
            <Globe size={40} className="mx-auto mb-4 text-gray-300" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 italic">Interactive Map Hub coming soon</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#080f1f] px-8 py-12 text-center text-white lg:px-16">
        <p className="text-[10px] font-light uppercase tracking-widest text-white/20">
          © 2026 Altis Realty Group. Discreet. Professional. Exact.
        </p>
      </footer>
    </div>
  );
}