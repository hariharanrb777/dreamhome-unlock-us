
// Show property details, load from Supabase, allow messaging agent
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PropertyGallery } from "@/components/PropertyGallery";
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import ContactAgentModal from "@/components/ContactAgentModal";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const { user } = useSupabaseAuth();

  useEffect(() => {
    fetchProperty();
    // eslint-disable-next-line
  }, [id]);

  async function fetchProperty() {
    setLoading(true);
    // fetch from Supabase
    const { supabase } = await import("@/integrations/supabase/client");
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    setProperty(data);
    setLoading(false);
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!property) {
    return <div className="min-h-screen flex items-center justify-center">Property not found.</div>;
  }

  return (
    <div className="min-h-screen px-4 py-10 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <PropertyGallery images={[property.image]} />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
          <div className="mb-2 text-muted-foreground">{property.address}</div>
          <div className="mb-4 text-blue-700 text-2xl font-bold">${Number(property.price).toLocaleString()}</div>
          <ul className="flex flex-wrap gap-4 mb-4 text-gray-700 text-sm">
            <li>{property.beds} bd</li>
            <li>{property.baths} ba</li>
            <li>{Number(property.sqft).toLocaleString()} sqft</li>
          </ul>
          <p className="mb-4">{property.description}</p>
          {/* Contact Agent Button */}
          {user && user.id !== property.owner_id && (
            <>
              <Button className="w-full py-2 mt-4" onClick={() => setContactOpen(true)}>
                Contact Agent
              </Button>
              <ContactAgentModal open={contactOpen} onOpenChange={setContactOpen} propertyId={property.id} ownerId={property.owner_id} />
            </>
          )}
          {!user && (
            <Button className="w-full py-2 mt-4" onClick={() => window.location.href = "/login"}>
              Sign in to Contact Agent
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
