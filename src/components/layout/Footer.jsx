"use client";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Search, MapPin, Bed, Bath, Square } from 'lucide-react';
import { SiInstagram, SiX } from '@icons-pack/react-simple-icons';

const Footer = () => {
  // Map them clearly here
  const socialIcons = [
    { Icon: SiInstagram, href: "#" },
    { Icon: SiX, href: "#" },
    // { Icon: SiLinkedin, href: "#" }
  ];

  return (
    <footer className="bg-[#080f1f] px-8 pt-20 pb-10 text-white lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-1">
            <a href="#" className="font-serif text-2xl font-medium tracking-wider">Altis<span className="text-[#d4b87a]">.</span></a>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-white/40">
              Your trusted partner in premium real estate across the United States and beyond.
            </p>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-[#d4b87a]">Properties</h4>
            <ul className="space-y-3 text-sm font-light text-white/50">
              {['For Sale', 'For Rent', 'Developments', 'Commercial'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-[#d4b87a]">Contact</h4>
            <ul className="space-y-3 text-sm font-light text-white/50">
              <li>hello@altisrealty.com</li>
              <li>+1 (310) 555-0190</li>
              <li>Book a Consultation</li>
            </ul>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex gap-4">
              {[SiInstagram, SiX].map((Icon, i) => (
                <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-[#b89a5a] hover:text-[#d4b87a]">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-20 border-t border-white/5 pt-8 text-center text-[10px] font-light uppercase tracking-widest text-white/20">
          © 2026 Altis Realty. All rights reserved.
        </div>
      </footer>
  );
};

export default Footer;