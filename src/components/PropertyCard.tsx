
import { MapPin, User } from "lucide-react";
import { Link } from "react-router-dom";

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
  agent: string;
}

export function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition-shadow duration-200">
      <Link to={`/properties/${property.id}`}>
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold truncate">{property.title}</h3>
            <span className="text-blue-600 text-xl font-bold">
              ${property.price.toLocaleString()}
            </span>
          </div>
          <div className="text-gray-500 flex items-center text-sm mb-1">
            <MapPin className="mr-1" size={16} />
            <span className="truncate">{property.address}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-3 mt-2">
            <span>{property.beds} beds</span>
            <span>{property.baths} baths</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
          <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
            <User size={16} /> <span>Agent: {property.agent}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

