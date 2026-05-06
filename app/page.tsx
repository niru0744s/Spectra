import Link from "next/link";
import { ProductCard } from "@/components/store/product-card";
import { StoreShell } from "@/components/store/store-shell";
import { products } from "@/lib/mock-data";

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <StoreShell active="shop">
      <section className="relative min-h-[720px] overflow-hidden bg-[#FAFAF8]">
        <img
          src="https://images.unsplash.com/photo-1615397323719-58b4f1791a8d?auto=format&fit=crop&q=80&w=1200&h=800"
          alt="Skincare hero"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF8] via-[#FAFAF8]/80 to-transparent" />

        <div className="spectra-container relative z-10 flex min-h-[720px] items-center py-20">
          <div className="max-w-xl">
            <h1 className="mb-8 text-5xl font-medium leading-tight text-[#1E2A44] md:text-6xl tracking-tight">
              Clinical-grade skincare analysis.
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-[#45464d]">
              Experience our AI-powered skin analysis and discover a curated regimen formulated specifically for your skin's unique needs.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/shop" className="rounded-[12px] bg-[#1E2A44] text-white px-8 py-4 text-center text-sm font-semibold transition-all hover:bg-[#08152e]">
                Shop routines
              </Link>
              <a href="#how-it-works" className="rounded-[12px] border border-[#E8E8E8] bg-white text-[#1b1b1c] px-8 py-4 text-center text-sm font-semibold transition-all hover:bg-[#f6f3f2]">
                How analysis works
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="spectra-container py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-medium text-[#1e2a44]">Featured Collections</h2>
          <Link href="/shop" className="text-sm font-medium text-[#1e2a44] hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-[#FAFAF8] py-20">
        <div className="spectra-container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="mb-3 text-3xl font-medium tracking-tight text-[#1E1E1E]">How analysis works</h2>
            <p className="text-lg text-[#45464d]">
              Precision skincare recommendations in three simple steps using our clinical AI model.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: "add_a_photo", title: "1. Upload", text: "Take a clear, makeup-free selfie or upload a portrait." },
              { icon: "troubleshoot", title: "2. Analyze", text: "Our AI scans for metrics like moisture, oiliness, and acne." },
              { icon: "medical_services", title: "3. Curate", text: "Receive a personalized regimen formulated for your needs." },
            ].map((item) => (
              <article key={item.title} className="rounded-[12px] border border-[#E8E8E8] bg-white p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FAFAF8] text-[#1E2A44]">
                  <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
                </div>
                <h3 className="mb-3 text-2xl font-medium tracking-tight text-[#1E1E1E]">{item.title}</h3>
                <p className="text-[#45464d] leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </StoreShell>
  );
}
