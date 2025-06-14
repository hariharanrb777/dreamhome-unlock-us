
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PropertyGallery({ images }: { images: string[] }) {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="w-full h-72 md:h-96 bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
        <img
          src={images[selected]}
          alt="Property"
          className="object-cover w-full h-full transition-transform duration-150"
        />
      </div>
      <div className="flex gap-2">
        {images.map((img, idx) => (
          <Button
            key={img}
            variant={selected === idx ? "default" : "outline"}
            size="icon"
            className="w-16 h-14 overflow-hidden"
            onClick={() => setSelected(idx)}
            type="button"
            aria-label={`Show image ${idx + 1}`}
          >
            <img src={img} alt="" className="object-cover w-full h-full" />
          </Button>
        ))}
      </div>
    </div>
  );
}
