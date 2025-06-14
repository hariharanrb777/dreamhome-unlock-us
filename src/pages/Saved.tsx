
import { PropertyCard } from "@/components/PropertyCard";

const savedProperties = [
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
];

export default function Saved() {
  return (
    <div className="min-h-screen max-w-5xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Saved Properties</h1>
      {savedProperties.length === 0 ? (
        <div className="text-muted-foreground">You have not saved any properties yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          {savedProperties.map((p) => (
            <PropertyCard property={p} key={p.id} />
          ))}
        </div>
      )}
    </div>
  );
}
