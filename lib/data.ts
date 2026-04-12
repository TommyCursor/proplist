export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  listing_type: "sale" | "rent";
  property_type: "house" | "apartment" | "villa" | "land" | "commercial";
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  location: string;
  city: string;
  state: string;
  features: string[];
  image: string;
  images: string[];
  agent_name: string;
  agent_phone: string;
  agent_email: string;
  is_featured: boolean;
  created_at: string;
};

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern 4-Bedroom Family Home",
    description:
      "A stunning modern family home in a quiet neighborhood. Features an open-plan kitchen and living area, large garden, and a double garage. Recently renovated with high-end finishes throughout. Perfect for families looking for space and comfort.",
    price: 450000,
    listing_type: "sale",
    property_type: "house",
    bedrooms: 4,
    bathrooms: 3,
    area_sqft: 2400,
    location: "Lekki Phase 1",
    city: "Lagos",
    state: "Lagos",
    features: ["Swimming Pool", "Garden", "Garage", "CCTV", "24/7 Security", "Generator"],
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    ],
    agent_name: "Emeka Johnson",
    agent_phone: "+234 801 234 5678",
    agent_email: "emeka@proplist.com",
    is_featured: true,
    created_at: "2024-01-15",
  },
  {
    id: "2",
    title: "Luxury 3-Bed Apartment with Ocean View",
    description:
      "Experience luxurious living in this beautifully designed 3-bedroom apartment. Floor-to-ceiling windows offer breathtaking ocean views. Fully fitted kitchen, en-suite master bedroom, and access to a rooftop pool.",
    price: 2800000,
    listing_type: "rent",
    property_type: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    area_sqft: 1800,
    location: "Victoria Island",
    city: "Lagos",
    state: "Lagos",
    features: ["Ocean View", "Rooftop Pool", "Gym", "Concierge", "Parking", "Air Conditioning"],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    agent_name: "Amara Osei",
    agent_phone: "+234 802 345 6789",
    agent_email: "amara@proplist.com",
    is_featured: true,
    created_at: "2024-01-20",
  },
  {
    id: "3",
    title: "Executive 5-Bedroom Villa",
    description:
      "An exquisite villa nestled in a prestigious gated estate. This fully detached property boasts a private pool, manicured gardens, a home office, and a cinema room. The highest standard of luxury living.",
    price: 1200000,
    listing_type: "sale",
    property_type: "villa",
    bedrooms: 5,
    bathrooms: 5,
    area_sqft: 5000,
    location: "Banana Island",
    city: "Lagos",
    state: "Lagos",
    features: ["Private Pool", "Cinema Room", "Home Office", "Smart Home", "Tennis Court", "Generator"],
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    agent_name: "Chidi Nwosu",
    agent_phone: "+234 803 456 7890",
    agent_email: "chidi@proplist.com",
    is_featured: true,
    created_at: "2024-02-01",
  },
  {
    id: "4",
    title: "Cozy 2-Bedroom Apartment",
    description:
      "A well-maintained 2-bedroom apartment ideal for young professionals or small families. Close to major shopping centers and schools. Secure estate with 24/7 security.",
    price: 850000,
    listing_type: "rent",
    property_type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area_sqft: 1100,
    location: "Ikeja GRA",
    city: "Lagos",
    state: "Lagos",
    features: ["Security", "Parking", "Inverter", "Water Treatment"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80",
    ],
    agent_name: "Emeka Johnson",
    agent_phone: "+234 801 234 5678",
    agent_email: "emeka@proplist.com",
    is_featured: false,
    created_at: "2024-02-10",
  },
  {
    id: "5",
    title: "Commercial Office Space — Open Plan",
    description:
      "Premium open-plan office space in the heart of the business district. Fully fitted with modern amenities, high-speed fiber internet, and a reception area. Ideal for startups and growing businesses.",
    price: 5500000,
    listing_type: "rent",
    property_type: "commercial",
    bedrooms: 0,
    bathrooms: 2,
    area_sqft: 3200,
    location: "Eko Atlantic",
    city: "Lagos",
    state: "Lagos",
    features: ["Fiber Internet", "Reception Area", "Conference Room", "CCTV", "Elevator", "Backup Power"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    ],
    agent_name: "Amara Osei",
    agent_phone: "+234 802 345 6789",
    agent_email: "amara@proplist.com",
    is_featured: false,
    created_at: "2024-02-15",
  },
  {
    id: "6",
    title: "Serviced 1-Bedroom Studio Apartment",
    description:
      "Modern fully-serviced studio apartment perfect for singles or couples. All utilities included. Located in a premium block with 24/7 security, gym access, and a rooftop lounge.",
    price: 600000,
    listing_type: "rent",
    property_type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: 650,
    location: "Ikoyi",
    city: "Lagos",
    state: "Lagos",
    features: ["All Utilities Included", "Gym", "Rooftop Lounge", "Security", "Laundry"],
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    ],
    agent_name: "Chidi Nwosu",
    agent_phone: "+234 803 456 7890",
    agent_email: "chidi@proplist.com",
    is_featured: false,
    created_at: "2024-02-20",
  },
  {
    id: "7",
    title: "Detached 3-Bedroom Bungalow",
    description:
      "Spacious detached bungalow sitting on a large plot. Beautifully landscaped compound, boys quarters, and ample parking space. Great investment opportunity in a fast-developing area.",
    price: 280000,
    listing_type: "sale",
    property_type: "house",
    bedrooms: 3,
    bathrooms: 2,
    area_sqft: 1900,
    location: "Magodo Phase 2",
    city: "Lagos",
    state: "Lagos",
    features: ["Boys Quarters", "Large Compound", "Ample Parking", "Borehole"],
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    agent_name: "Emeka Johnson",
    agent_phone: "+234 801 234 5678",
    agent_email: "emeka@proplist.com",
    is_featured: false,
    created_at: "2024-03-01",
  },
  {
    id: "8",
    title: "Prime Land — 1,200 sqm",
    description:
      "A prime piece of land in a rapidly growing area. Fully fenced and gated. Suitable for residential or commercial development. All documents are intact — C of O available.",
    price: 95000,
    listing_type: "sale",
    property_type: "land",
    bedrooms: 0,
    bathrooms: 0,
    area_sqft: 12917,
    location: "Epe Expressway",
    city: "Lagos",
    state: "Lagos",
    features: ["C of O", "Fenced & Gated", "Survey Plan", "Accessible Road"],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    ],
    agent_name: "Amara Osei",
    agent_phone: "+234 802 345 6789",
    agent_email: "amara@proplist.com",
    is_featured: true,
    created_at: "2024-03-05",
  },
];

export function getProperty(id: string) {
  return properties.find((p) => p.id === id) ?? null;
}

export function getFeatured() {
  return properties.filter((p) => p.is_featured);
}

export function formatPrice(price: number, type: "sale" | "rent") {
  const formatted = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
  return type === "rent" ? `${formatted}/yr` : formatted;
}
