
import { useParams } from "react-router-dom";
import { PropertyGallery } from "@/components/PropertyGallery";
import { Button } from "@/components/ui/button";

// Normally, fetch by ID from backend. Using mock data for now.
const mockProperties = [
  {
    id: "1",
    title: "Modern Family Home",
    address: "45 Central Park West, New York, NY",
    price: 2250000,
    agent: "Lisa Moore",
    description: "Spacious open-plan home with chef's kitchen. Walk to the park. Top-rated schools.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80",
    ],
    beds: 4,
    baths: 3,
    sqft: 2870,
    year: 2015,
    hoa: "$190/mo",
  },
  // add more if desired
];

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();

  const property = mockProperties.find((p) => p.id === id) || mockProperties[0];

  return (
    <div className="min-h-screen px-4 py-10 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <PropertyGallery images={property.images} />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
          <div className="mb-2 text-muted-foreground">{property.address}</div>
          <div className="mb-4 text-blue-700 text-2xl font-bold">${property.price.toLocaleString()}</div>
          <ul className="flex flex-wrap gap-4 mb-4 text-gray-700 text-sm">
            <li>{property.beds} bd</li>
            <li>{property.baths} ba</li>
            <li>{property.sqft.toLocaleString()} sqft</li>
            <li>Built {property.year}</li>
            <li>HOA: {property.hoa}</li>
          </ul>
          <p className="mb-4">{property.description}</p>
          <Button className="w-full py-2 mt-4">Contact Agent</Button>
        </div>
      </div>
    </div>
  );
}
