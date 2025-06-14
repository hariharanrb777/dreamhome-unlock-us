
import { useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyFilters } from "@/components/filters/PropertyFilters";

// Sample property dataset
const mockProperties = [
  {
    id: "1",
    title: "Modern Family Home",
    address: "45 Central Park West, New York, NY",
    price: 2250000,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
    beds: 4,
    baths: 3,
    sqft: 2870,
    agent: "Lisa Moore",
  },
  {
    id: "2",
    title: "Downtown Loft Retreat",
    address: "89 Wabash Ave, Chicago, IL",
    price: 745000,
    image: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=600&q=80",
    beds: 2,
    baths: 2,
    sqft: 1358,
    agent: "Anthony Kim",
  },
  {
    id: "3",
    title: "Luxury Scottsdale Villa",
    address: "10000 N 70th Pl, Scottsdale, AZ",
    price: 1850000,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&q=80",
    beds: 5,
    baths: 4,
    sqft: 3900,
    agent: "Emma White",
  },
  {
    id: "4",
    title: "LA Hillside Estate",
    address: "2201 Sunset Blvd, Los Angeles, CA",
    price: 3500000,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80",
    beds: 4,
    baths: 5,
    sqft: 4100,
    agent: "Sophia Villa",
  },
];

export default function Properties() {
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  // For MVP, filter the mock dataset on the frontend
  let filtered = mockProperties.filter((p) => {
    const f = filters as any;
    if (f.query && !`${p.title} ${p.address}`.toLowerCase().includes(f.query.toLowerCase()))
      return false;
    if (f.minPrice && p.price < f.minPrice)
      return false;
    if (f.maxPrice && p.price > f.maxPrice)
      return false;
    if (f.beds && p.beds < f.beds)
      return false;
    if (f.baths && p.baths < f.baths)
      return false;
    return true;
  });

  return (
    <div className="min-h-screen px-6 pb-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 mt-8">Find Your Perfect Property</h1>
      <div className="mb-6">
        <PropertyFilters onApply={setFilters} loading={loading} />
      </div>
      {/* TODO: Add map integration, e.g. Mapbox/Leaflet mock component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-16 text-lg">
            No properties found based on your filters.
          </div>
        ) : (
          filtered.map((p) => <PropertyCard property={p} key={p.id} />)
        )}
      </div>
    </div>
  );
}
