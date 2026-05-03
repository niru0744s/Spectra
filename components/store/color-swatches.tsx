import { Swatch } from "@/lib/mock-data";

type ColorSwatchesProps = {
  selected: string;
  swatches: Swatch[];
};

export function ColorSwatches({ selected, swatches }: ColorSwatchesProps) {
  return (
    <div className="flex gap-2">
      {swatches.map((swatch) => {
        const isSelected = swatch.name === selected;
        return (
          <button
            key={swatch.name}
            aria-label={swatch.name}
            title={swatch.name}
            className={isSelected ? "h-8 w-8 rounded-full ring-2 ring-[#1e2a44] ring-offset-2 ring-offset-[#fcf9f8]" : "h-8 w-8 rounded-full ring-1 ring-zinc-300 ring-offset-2 ring-offset-[#fcf9f8]"}
            style={{ backgroundColor: swatch.hex }}
          />
        );
      })}
    </div>
  );
}
