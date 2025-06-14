
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PropertyFilters({
  onApply,
  loading,
}: {
  onApply: (filters: Record<string, any>) => void;
  loading?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onApply({
      query,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      beds: beds ? Number(beds) : undefined,
      baths: baths ? Number(baths) : undefined,
    });
  }
  return (
    <form onSubmit={handleSubmit} className="grid gap-2 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 w-full">
      <input
        className="border rounded p-2 col-span-2"
        placeholder="City, zip, or address"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        className="border rounded p-2"
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        min={0}
      />
      <input
        className="border rounded p-2"
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        min={0}
      />
      <input
        className="border rounded p-2"
        type="number"
        placeholder="Beds"
        value={beds}
        onChange={(e) => setBeds(e.target.value)}
        min={0}
      />
      <input
        className="border rounded p-2"
        type="number"
        placeholder="Baths"
        value={baths}
        onChange={(e) => setBaths(e.target.value)}
        min={0}
      />
      <Button type="submit" className="col-span-2 lg:col-span-1 mt-1">
        {loading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
}
