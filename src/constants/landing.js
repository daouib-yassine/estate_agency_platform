export const NAVIGATION_LINKS = [
  { name: 'Properties', href: '#properties' },
  { name: 'Developments', href: '#developments' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
];

export const STATS = [
  { num: '1,800+', label: 'Properties Listed' },
  { num: '98%', label: 'Client Satisfaction' },
  { num: '25 yrs', label: 'Market Experience' },
  { num: '14', label: 'Cities Covered' },
];

export const FEATURED_PROPERTIES = [
  {
    id: '1',
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    price: "2,450,000",
    name: "Elysian Heights Villa",
    loc: "Beverly Hills, CA",
    beds: 5,
    baths: 4,
    sqft: 620,
    tag: "For Sale",
    isRent: false
  },
  {
    id: '2',
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    price: "8,500",
    name: "Meridian Sky Apartments",
    loc: "Manhattan, New York",
    beds: 3,
    baths: 2,
    sqft: 185,
    tag: "For Rent",
    isRent: true
  },
  {
    id: '3',
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    price: "4,200,000",
    name: "Nexus Tower — Office",
    loc: "Downtown Miami, FL",
    beds: 12,
    baths: 3,
    sqft: 840,
    tag: "For Sale",
    isRent: false
  }
];

export const PROPERTY_DETAILS = {
  id: 1,
  title: "Skyline Penthouse — Tower One",
  price: "3,850,000",
  location: "Midtown, Manhattan NY",
  description: "A masterwork of contemporary design, this penthouse offers 360-degree views of the Manhattan skyline. Featuring biophilic interior walls, smart home integration that adapts to your circadian rhythm, and a private terrace with an infinity-edge plunge pool.",
  specs: { beds: 4, baths: 3.5, area: "420 m²", year: 2024, garage: "2 Slots" },
  amenities: ["Infinity Pool", "Private Elevator", "Smart Home AI", "24/7 Concierge", "Wine Cellar", "Home Cinema"],
  images: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
    "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=600"
  ],
  agent: { name: "Julian Thorne", role: "Senior Partner", phone: "+1 212 555 0198" }
};