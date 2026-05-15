import Link from "next/link";

export const PropertyCard = ({ property, viewMode }) => {
  const isList = viewMode === 'list';

  // Use the first image in the array as the thumbnail
  const mainImage = property.images?.[0] || property.image;

  return (
    <Link href={`/properties/${property?.id}`} className="contents">
      <div className={`bg-white rounded-md overflow-hidden shadow-[0_2px_16px_rgba(15,31,61,0.07)] hover:shadow-[0_14px_40px_rgba(15,31,61,0.14)] hover:-translate-y-1 transition-all cursor-pointer group ${isList ? 'flex flex-col md:flex-row' : ''} ${property.featured && !isList ? 'md:col-span-2' : ''}`}>
        
        {/* Image Section */}
        <div className={`relative overflow-hidden ${isList ? 'md:w-72 h-48 md:h-auto' : property.featured ? 'h-64' : 'h-[210px]'}`}>
          <img 
            src={mainImage} 
            alt={property.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          {/* Updated from .badge to .tag */}
          {property.tag && (
            <span className="absolute top-3 left-3 bg-[#1a7f5a] text-white text-[9px] font-medium uppercase tracking-widest px-2 py-1 rounded-sm">
              {property.tag}
            </span>
          )}
          <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all">
            <span className="text-sm">♡</span>
          </button>
        </div>

        {/* Body Section */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="font-serif text-xl font-bold text-[#0f1f3d]">
              <sup className="text-[12px] font-normal">$</sup>{property.price}
              {property.period && <span className="text-xs font-light text-[#8e8b86]">{property.period}</span>}
            </div>
            <h3 className="text-[14px] font-medium mt-1 truncate">{property.name}</h3>
            {/* Updated from .location to .loc */}
            <div className="flex items-center gap-1 text-[#8e8b86] text-[11px] mt-1 font-light">
               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                 <circle cx="12" cy="10" r="3" />
               </svg>
               {property.loc}
            </div>
          </div>

          <div className="mt-4">
            <div className="h-[1px] bg-[#e8e6e2] mb-3" />
            <div className="flex gap-4 text-[#4a4845] text-[11px]">
              <span className="flex items-center gap-1.5">
                <strong className="text-[#b89a5a]">●</strong> {property.beds} Beds
              </span>
              <span className="flex items-center gap-1.5">
                <strong className="text-[#b89a5a]">●</strong> {property.baths} Baths
              </span>
              {/* Updated from .area to .sqft */}
              <span className="flex items-center gap-1.5">
                <strong className="text-[#b89a5a]">●</strong> {property.sqft} m²
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;