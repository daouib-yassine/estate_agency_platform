import Link from 'next/link';
import PropertyCard from '@/components/properties/property-card-view';

const Featured = () => {
  // In a real application, this data would eventually come from your Node.js/Next.js API
  const featuredProperties = [
    {
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      price: "2,450,000",
      name: "Elysian Heights Villa",
      location: "Beverly Hills, CA",
      beds: "5",
      baths: "4",
      sqft: "620",
      tag: "For Sale",
      isRent: false,
    },
    {
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      price: "8,500",
      name: "Meridian Sky Apartments",
      location: "Manhattan, New York",
      beds: "3",
      baths: "2",
      sqft: "185",
      tag: "For Rent",
      isRent: true,
    },
    {
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      price: "4,200,000",
      name: "Nexus Tower — Office",
      location: "Downtown Miami, FL",
      beds: "12",
      baths: "3",
      sqft: "840",
      tag: "For Sale",
      isRent: false,
    },
  ];

  return (
    <section className="bg-[#f7f6f3] px-8 py-24 lg:px-16">
      {/* Section Header */}
      <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
        <div className="w-full md:w-auto">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#b89a5a]">
            Handpicked Selection
          </p>
          <h2 className="font-serif text-4xl font-normal text-[#0f1f3d]">
            Our Featured Properties
          </h2>
        </div>
        
        <Link 
          href="/properties" 
          className="group flex items-center gap-2 border-b border-[#b89a5a] pb-1 text-[11px] font-bold uppercase tracking-widest text-[#0f1f3d] transition-all hover:text-[#b89a5a]"
        >
          View All Listings 
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Properties Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featuredProperties.map((property, index) => (
          <div 
            key={index} 
            className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;