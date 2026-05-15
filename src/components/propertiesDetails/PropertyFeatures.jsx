import { CheckCircle2 } from 'lucide-react';

const PropertyFeatures = ({ features = [] }) => {
  return (
    <section>
      <h2 className="mb-6 font-serif text-2xl font-normal text-[#0f1f3d]">
        Features & Amenities
      </h2>
      
      {features.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 group">
              <div className="flex-shrink-0">
                <CheckCircle2 size={18} className="text-[#b89a5a] transition-transform group-hover:scale-110" />
              </div>
              <span className="text-sm text-[#4a4845] font-light tracking-wide">
                {feature}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-4 px-6 border border-dashed border-gray-200 rounded-sm">
          <p className="text-sm text-gray-400 italic">No specific features listed for this property.</p>
        </div>
      )}
    </section>
  );
};

export default PropertyFeatures;