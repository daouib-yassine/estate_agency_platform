// src/app/properties/PropertyHeader.jsx
import Link from 'next/link';

const PropertyHeader = ({ title = "All Properties", count = 0 }) => {
  return (
    /* Added pt-24 or pt-32 to push content below a fixed navbar */
    <header className="relative bg-[#0f1f3d] pt-12 pb-12 px-6 md:px-14 overflow-hidden z-10">
      {/* The Gold Ring */}
      <div className="absolute -top-16 -right-16 w-[340px] h-[340px] rounded-full border-[60px] border-[#b89a5a]/10 pointer-events-none" />
      
      <div className="relative z-20">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest mb-4">
          <Link href="/" className="text-white/45 hover:text-white/80 transition-colors">Home</Link>
          <span className="text-white/20">›</span>
          <span className="text-[#d4b87a]">Properties</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-white font-light mb-3">{title}</h1>
        <p className="text-white/55 text-sm max-w-md font-light">
          Browse our curated portfolio of premium residential and commercial properties.
        </p>
      </div>
    </header>
  );
};

export default PropertyHeader;