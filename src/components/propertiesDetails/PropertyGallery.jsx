import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Heart, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const PropertyGallery = ({ images, propertyName, tag, isRent }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [saved, setSaved] = useState(false);

  const prev = () => setActiveImg((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveImg((i) => (i + 1) % images.length);

  return (
    <div className="relative h-[60vh] min-h-[480px] overflow-hidden bg-[#0f1f3d]">
      <img src={images[activeImg]} alt={propertyName} className="h-full w-full object-cover opacity-90 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3d]/60 to-transparent pointer-events-none" />

      {/* Navigation */}
      <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20">
        <ChevronLeft size={18} />
      </button>
      <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20">
        <ChevronRight size={18} />
      </button>

      {/* Badges & Actions */}
      <div className="absolute top-24 left-8 flex items-center gap-4">
        <Link href="/properties" className="flex items-center gap-2 rounded-sm bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-[11px] font-bold uppercase text-white hover:bg-white/20">
          <ArrowLeft size={13} /> Back
        </Link>
        <span className={`rounded-sm px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white ${isRent ? 'bg-[#b89a5a]' : 'bg-[#0f1f3d] border border-white/30'}`}>
          {tag}
        </span>
      </div>

      <div className="absolute top-24 right-8 flex gap-3">
        <button onClick={() => setSaved(!saved)} className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-all ${saved ? 'bg-[#b89a5a] border-[#b89a5a] text-white' : 'bg-white/10 border-white/20 text-white'}`}>
          <Heart size={15} fill={saved ? 'white' : 'none'} />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white"><Share2 size={15} /></button>
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5">
        {images.map((src, i) => (
          <button key={src} onClick={() => setActiveImg(i)} className={`h-14 w-20 overflow-hidden rounded-sm border-2 transition-all ${i === activeImg ? 'border-[#d4b87a]' : 'border-white/20 opacity-50'}`}>
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;