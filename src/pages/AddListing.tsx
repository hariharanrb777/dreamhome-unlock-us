
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AddListing() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [sqft, setSqft] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const nav = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In real impl: submit to backend, refresh listings.
    nav("/properties");
  }

  return (
    <div className="max-w-xl mx-auto min-h-screen pt-12">
      <h1 className="text-2xl font-bold mb-6">List a Property</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="border rounded p-2"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="border rounded p-2"
          placeholder="Address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="number"
          className="border rounded p-2"
          placeholder="Price (USD)"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="flex gap-2">
          <input
            className="border rounded p-2 w-1/2"
            type="number"
            placeholder="Beds"
            required
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            min={0}
          />
          <input
            className="border rounded p-2 w-1/2"
            type="number"
            placeholder="Baths"
            required
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
            min={0}
          />
        </div>
        <input
          type="number"
          className="border rounded p-2"
          placeholder="Square Footage"
          required
          value={sqft}
          onChange={(e) => setSqft(e.target.value)}
        />
        <input
          type="text"
          className="border rounded p-2"
          placeholder="Image URL"
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <textarea
          className="border rounded p-2"
          placeholder="Description"
          rows={4}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button className="mt-4" type="submit">
          Publish Listing
        </Button>
      </form>
    </div>
  );
}
