"use client";

export function IngredientSlider({
  label,
  grams,
  min,
  max,
  onChange,
}: {
  label: string;
  grams: number;
  min: number;
  max: number;
  onChange: (grams: number) => void;
}) {
  const percent = ((grams - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-bark">{label}</span>
        <span className="text-[15px] font-bold text-paw-orange-dark">{grams}g</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={5}
        value={grams}
        onChange={(e) => onChange(Number(e.target.value))}
        className="paw-slider"
        style={{ ["--fill" as string]: `${percent}%` }}
      />
    </div>
  );
}
