import { CheckCircle2, Home, Calendar, Layers, Maximize, Car, MapPin } from 'lucide-react';

const PropertyFeatures = ({ property }) => {
  if (!property) return null;

  // Configuration for the Property Details grid
  const details = [
    { label: 'Property Type', val: property.isRent ? 'For Rent' : 'For Sale', icon: Home },
    { label: 'Status', val: property.tag || 'Available', icon: CheckCircle2 },
    { label: 'Location', val: property.loc, icon: MapPin },
    { label: 'Bedrooms', val: `${property.beds} Beds`, icon: Layers },
    { label: 'Living Area', val: `${property.sqft} m²`, icon: Maximize },
    { label: 'Bathrooms', val: `${property.baths} Baths`, icon: CheckCircle2 },
    { label: 'Built Year', val: property.year, icon: Calendar },
    { label: 'Parking', val: `${property.garage} Spaces`, icon: Car },
  ];

  return (
    <div className="space-y-10">
      {/* Description Section */}
      <div>
        <h2 className="mb-5 font-serif text-2xl font-normal text-[#0f1f3d]">About This Property</h2>
        {property.description ? (
          property.description.split('\n\n').map((para, i) => (
            <p key={i} className="mb-4 leading-relaxed text-gray-600">
              {para}
            </p>
          ))
        ) : (
          <p className="leading-relaxed text-gray-500 italic">
            Experience luxury living at {property.name} in {property.loc}.
          </p>
        )}
      </div>

      <div className="h-px bg-gray-100" />

      {/* Details Grid */}
      <div>
        <h2 className="mb-6 font-serif text-2xl font-normal text-[#0f1f3d]">Property Details</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {details.map(({ label, val, icon: Icon }) => (
            <div key={label} className="rounded-sm border border-gray-100 bg-[#f7f6f3] px-5 py-4">
              <div className="flex items-center gap-2 mb-1">
                 <Icon size={12} className="text-[#b89a5a]" />
                 <p className="text-[10px] font-bold uppercase tracking-widest text-[#b89a5a]">{label}</p>
              </div>
              <p className="text-sm font-medium text-[#0f1f3d]">{val}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Features & Amenities */}
      <div>
        <h2 className="mb-6 font-serif text-2xl font-normal text-[#0f1f3d]">Features & Amenities</h2>
        
        {/* Simple list of features */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-8">
          {property.features?.map((f) => (
            <div key={f} className="flex items-center gap-3">
              <CheckCircle2 size={16} className="flex-shrink-0 text-[#b89a5a]" />
              <span className="text-sm text-gray-600">{f}</span>
            </div>
          ))}
        </div>

        {/* Visual Amenities Icons */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {property.amenities.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 rounded-sm border border-gray-100 py-5 text-center">
                {Icon && <Icon size={22} className="text-[#b89a5a]" strokeWidth={1.5} />}
                <span className="text-[11px] font-medium uppercase tracking-wider text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyFeatures;