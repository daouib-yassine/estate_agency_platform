import { ViewButton } from '@/components/PropertyUI';

const PropertyToolbar = ({ count, viewMode, setViewMode }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div className="text-sm text-[#8e8b86]">
        <strong>{count}</strong> properties found
      </div>
      
      <div className="flex items-center gap-4">
        {/* Sort Dropdown */}
        <div className="relative">
          <select className="border border-[#d8d5d0] rounded px-4 py-2 text-[12px] bg-white appearance-none cursor-pointer pr-8 focus:border-[#b89a5a] outline-none transition-colors">
            <option>Newest First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
          {/* Custom Arrow for select */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#8e8b86]">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1L5 5L9 1" /></svg>
          </div>
        </div>
        
        {/* Grid/List Toggle buttons */}
        <div className="flex border border-[#d8d5d0] rounded overflow-hidden">
          <ViewButton 
            active={viewMode === 'grid'} 
            onClick={() => setViewMode('grid')} 
            icon="grid" 
          />
          <ViewButton 
            active={viewMode === 'list'} 
            onClick={() => setViewMode('list')} 
            icon="list" 
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyToolbar;