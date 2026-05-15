import { MapPin, Bed, Bath, Square, Car } from 'lucide-react';

const PropertyInfo = ({ property }) => {
  if (!property) return null;

  return (
    <section>
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#b89a5a]">
            Ref: ALT-{property.id.toString().padStart(4, '0')}
          </p>
          <h1 className="font-serif text-4xl font-normal leading-tight text-[#0f1f3d]">
            {property.name}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={14} className="text-[#b89a5a]" /> {property.location}
          </div>
        </div>
        <div className="text-right">
          <div className="font-serif text-4xl font-semibold text-[#0f1f3d]">
            <sup className="text-xl font-normal">$</sup>{property.price}
            {property.period && <span className="text-lg font-normal text-gray-400">{property.period}</span>}
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-gray-100 bg-gray-100 sm:grid-cols-4">
        {[
          { icon: Bed, val: `${property.beds} Beds`, sub: 'Bedrooms' },
          { icon: Bath, val: `${property.baths} Baths`, sub: 'Bathrooms' },
          { icon: Square, val: `${property.area} m²`, sub: 'Living Area' },
          { icon: Car, val: `${property.garage || 0} Cars`, sub: 'Garage' },
        ].map(({ icon: Icon, val, sub }) => (
          <div key={sub} className="flex flex-col items-center bg-white py-6 px-4 text-center">
            <Icon size={20} className="mb-2 text-[#b89a5a]" />
            <span className="font-serif text-xl font-medium">{val}</span>
            <span className="mt-0.5 text-[10px] uppercase tracking-widest text-gray-400">{sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyInfo;