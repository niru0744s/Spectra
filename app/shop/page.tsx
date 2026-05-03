import { ProductCard } from "@/components/store/product-card";
import { StoreShell } from "@/components/store/store-shell";
import { products } from "@/lib/mock-data";

export default function ShopPage() {
  return (
    <StoreShell active="shop">
      <section className="spectra-container flex flex-col gap-8 py-12 md:flex-row">
        <aside className="hidden w-64 shrink-0 border-r border-[#e5e2e1] pr-6 md:block">
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">Category</h3>
              <div className="space-y-2 text-sm text-zinc-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                  <span className="font-medium text-[#1e2a44]">Sunglasses</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>Optical</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>Blue Light</span>
                </label>
              </div>
            </div>

            <div className="border-t border-[#e5e2e1] pt-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">Color</h3>
              <div className="flex flex-wrap gap-2">
                {["#111111", "#7A4B2A", "#D4AF37", "#A0A0A0", "#20422E"].map((color) => (
                  <button key={color} className="h-6 w-6 rounded-full ring-1 ring-zinc-300" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>

            <div className="border-t border-[#e5e2e1] pt-5">
              <label className="flex items-center gap-2 rounded-lg border border-[#e5e2e1] bg-[#f6f3f2] p-2 text-sm text-[#1b1b1c]">
                <input type="checkbox" className="h-4 w-4" />
                <span className="material-symbols-outlined text-[18px]">view_in_ar</span>
                Virtual try-on available
              </label>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between border-b border-[#e5e2e1] pb-4">
            <p className="text-sm text-zinc-600">Showing {products.length} products</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-zinc-500">Sort by:</span>
              <select className="bg-transparent font-medium text-[#1b1b1c]">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </StoreShell>
  );
}
