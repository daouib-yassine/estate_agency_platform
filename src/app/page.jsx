"use client";
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import Stats from '@/components/landing/Stats';
import Featured from '@/components/landing/Featured';
import Footer from '@/components/layout/Footer';

export default function AltisLanding() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0f1f3d] selection:bg-[#b89a5a] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Featured />
      </main>
      <Footer />
    </div>
  );
}