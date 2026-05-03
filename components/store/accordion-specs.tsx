type AccordionSpecsProps = {
  specs: string[];
  fit: string;
};

export function AccordionSpecs({ specs, fit }: AccordionSpecsProps) {
  return (
    <div className="border-t border-[#e5e2e1]">
      <details className="group cursor-pointer border-b border-[#e5e2e1] py-4">
        <summary className="flex list-none items-center justify-between text-sm font-medium text-[#1b1b1c]">
          Technical Specifications
          <span className="material-symbols-outlined text-zinc-500 transition-transform group-open:rotate-180">
            expand_more
          </span>
        </summary>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600">
          {specs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
      </details>

      <details className="group cursor-pointer border-b border-[#e5e2e1] py-4">
        <summary className="flex list-none items-center justify-between text-sm font-medium text-[#1b1b1c]">
          Dimensions &amp; Fit
          <span className="material-symbols-outlined text-zinc-500 transition-transform group-open:rotate-180">
            expand_more
          </span>
        </summary>
        <p className="mt-3 text-sm text-zinc-600">{fit}</p>
      </details>
    </div>
  );
}
