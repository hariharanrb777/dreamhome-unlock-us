
// US Real Estate App - Home/Dashboard

import { useNavigate } from "react-router-dom";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Mock Data for featured listings
const featured = [
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
];

const Index = () => {
  const nav = useNavigate();
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="flex flex-col xl:flex-row gap-8 min-h-screen xl:pt-20 pt-10 bg-gradient-to-bl from-slate-100 to-blue-50 xl:px-24 px-2">
      <div className="xl:w-2/3 w-full flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold mb-2 text-gray-800">
          Discover Your Next Home
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-4">
          The smarter, easier way to <span className="font-semibold text-blue-600">buy, sell, or rent</span> property across the United States.
          {showDescription ? (
            <span className="block mt-2 text-base text-gray-500">
              Our mission: make real estate transparent, efficient, and accessible—connecting buyers, sellers, renters, and agents coast-to-coast. Advanced search, listing management, and personalized AI tools built in.
            </span>
          ) : (
            <Button variant="link" className="px-1 h-auto text-blue-600 inline" onClick={() => setShowDescription(true)}>
              Read more
            </Button>
          )}
        </p>
        <div className="flex gap-2 flex-wrap mb-4">
          <Button size="lg" onClick={() => nav("/properties")} className="hover-scale">
            Browse Properties
          </Button>
          <Button size="lg" variant="outline" onClick={() => nav("/add-listing")}>
            List Your Property
          </Button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Featured Properties</h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {featured.map((p) => (
              <PropertyCard property={p} key={p.id} />
            ))}
          </div>
        </div>
      </div>
      <div className="xl:w-1/3 w-full flex flex-col items-center xl:items-end">
        <div className="bg-white/70 p-6 rounded-xl shadow-lg max-w-sm w-full">
          <h3 className="text-lg font-bold mb-2 text-blue-600">Start your search</h3>
          <p className="text-gray-600">Buy or rent in cities like <span className="font-semibold">New York</span>, <span className="font-semibold">Chicago</span>, <span className="font-semibold">LA</span>, <span className="font-semibold">Houston</span> and more.</p>
          <Button className="w-full mt-4 hover-scale" onClick={() => nav("/properties")}>
            Find a Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
