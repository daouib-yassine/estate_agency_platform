import { FilterSection } from '@/components/PropertyUI';

const PropertySidebar = ({ searchQuery, setSearchQuery, status, setStatus }) => {
  return (
   <aside className="bg-white border-r border-[#e8e6e2] p-8 lg:sticky lg:top-[66px] lg:h-[calc(100vh-66px)] overflow-y-auto">
          <FilterSection label="Search">
            <input type="text" placeholder="City, neighborhood..." className="w-full border border-[#d8d5d0] rounded p-2.5 bg-[#f7f6f3] text-sm focus:border-[#0f1f3d] outline-none" />
          </FilterSection>

          <FilterSection label="Status">
            <div className="flex border border-[#d8d5d0] rounded overflow-hidden">
              {['All', 'For Sale', 'For Rent'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => setStatus(opt)}
                  className={`flex-1 py-2 text-[11px] uppercase tracking-wider border-r border-[#d8d5d0] last:border-0 transition-colors ${status === opt ? 'bg-[#0f1f3d] text-white' : 'bg-[#f7f6f3] text-[#4a4845] hover:bg-[#f0eff0]'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection label="Amenities">
            <div className="flex flex-wrap gap-2">
              {['Pool', 'Gym', 'Parking', 'Sea View'].map(item => (
                <button key={item} className="px-3 py-1.5 rounded-full border border-[#d8d5d0] text-[11px] bg-[#f7f6f3] hover:border-[#0f1f3d] transition-all">
                  {item}
                </button>
              ))}
            </div>
          </FilterSection>

          <button className="w-full bg-[#0f1f3d] text-white py-3 rounded text-[11px] font-medium tracking-widest uppercase mt-4 hover:bg-[#b89a5a] transition-all">
            Apply Filters
          </button>
        </aside>
  );
};

export default PropertySidebar;