
// Browse and filter properties from Supabase
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyFilters } from "@/components/filters/PropertyFilters";
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

export default function Properties() {
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);
  const { user } = useSupabaseAuth();
  const [showMine, setShowMine] = useState(false);

  useEffect(() => {
    fetchProps();
    // eslint-disable-next-line
  }, [filters, showMine, user]);

  async function fetchProps() {
    setLoading(true);
    let query = supabase.from("properties").select("*");
    if (showMine && user) {
      // Only my listings
      query = query.eq("owner_id", user.id);
    }
    const { data, error } = await query;
    let filtered = (data ?? []);
    const f = filters as any;
    if (f.query)
      filtered = filtered.filter((p: any) => `${p.title} ${p.address}`.toLowerCase().includes(f.query.toLowerCase()));
    if (f.minPrice)
      filtered = filtered.filter((p: any) => Number(p.price) >= Number(f.minPrice));
    if (f.maxPrice)
      filtered = filtered.filter((p: any) => Number(p.price) <= Number(f.maxPrice));
    if (f.beds)
      filtered = filtered.filter((p: any) => Number(p.beds) >= Number(f.beds));
    if (f.baths)
      filtered = filtered.filter((p: any) => Number(p.baths) >= Number(f.baths));
    setProperties(filtered);
    setLoading(false);
  }

  return (
    <div className="min-h-screen px-6 pb-10 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mt-8 mb-6">
        <h1 className="text-3xl font-bold">Find Your Perfect Property</h1>
        {user && (
          <Button
            variant={showMine ? "default" : "outline"}
            className="ml-4"
            onClick={() => setShowMine((v) => !v)}
          >
            {showMine ? "Show All Listings" : "Show My Listings"}
          </Button>
        )}
      </div>
      <div className="mb-6">
        <PropertyFilters onApply={setFilters} loading={loading} />
      </div>
      {/* TODO: Add map integration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full text-center text-muted-foreground py-16 text-lg">Loading...</div>
        ) : properties.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-16 text-lg">
            No properties found based on your filters.
          </div>
        ) : (
          properties.map((p) => <PropertyCard property={p} key={p.id} />)
        )}
      </div>
    </div>
  );
}
