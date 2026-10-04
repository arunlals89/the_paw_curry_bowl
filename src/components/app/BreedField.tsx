"use client";

import { useMemo, useState } from "react";

import { DOG_BREEDS } from "./dog-breeds";

export function BreedField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return DOG_BREEDS.slice(0, 8);
    return DOG_BREEDS.filter((breed) => breed.toLowerCase().includes(q)).slice(0, 8);
  }, [value]);

  const select = (breed: string) => {
    onChange(breed);
    setOpen(false);
  };

  return (
    <div className="relative flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-bark">Breed (optional)</span>
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Search breed — e.g. Labrador"
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-bark placeholder:text-bark-soft/50 focus:outline-none focus:ring-2 focus:ring-paw-orange/30"
      />
      {open && matches.length > 0 ? (
        <div className="no-scrollbar absolute top-full z-30 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-black/10 bg-white shadow-soft-lg">
          {matches.map((breed) => (
            <button
              key={breed}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => select(breed)}
              className="block w-full px-4 py-2.5 text-left text-sm text-bark hover:bg-paw-orange-light"
            >
              {breed}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
