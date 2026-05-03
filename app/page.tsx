import Link from "next/link";
import { ProductCard } from "@/components/store/product-card";
import { StoreShell } from "@/components/store/store-shell";
import { products } from "@/lib/mock-data";

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <StoreShell active="shop">
      <section className="relative min-h-[720px] overflow-hidden bg-[#f6f3f2]">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvuQdpzNLBU7Ru1hmq_gRqG9aHJKOHqKklfCMzm5Q3FKMl93IuG9wAhHPivm6CvqaMn57mU04PmcxMPtly79XCuT-eyO8MS512Ic9D2JM12Gq4x42Ui5229WKSI-FLxJWPCW1sMLoMTFh0XXj-jEURL5D8slPchwryEo6AOv4UtPhuJCwlARfJ3yVhsPVnOkxGEShxQ3itrrfh4hIpNUyJCbz9wSXPMAFXqIAgcI_WEi4LW-20bVYJICU6GhdCFVeHCH8hfDhULQ"
          alt="Spectra hero"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fcf9f8] via-[#fcf9f8]/70 to-transparent" />

        <div className="spectra-container relative z-10 flex min-h-[720px] items-center py-20">
          <div className="max-w-xl">
            <h1 className="mb-8 text-5xl font-medium leading-tight text-[#1e2a44] md:text-6xl">
              Try on sunglasses before you buy.
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-zinc-600">
              Experience our virtual try-on flow and find frames that match your face shape with confidence.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/shop" className="btn-primary px-8 py-4 text-center text-sm font-semibold">
                Shop sunglasses
              </Link>
              <a href="#how-it-works" className="btn-secondary px-8 py-4 text-center text-sm font-semibold">
                How try-on works
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

      <section id="how-it-works" className="bg-[#f6f3f2] py-20">
        <div className="spectra-container">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 className="mb-3 text-3xl font-medium text-[#1e2a44]">How try-on works</h2>
            <p className="text-zinc-600">
              Precision fitting in three simple steps using our AR-inspired UI flow.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: "photo_camera", title: "1. Upload", text: "Use your webcam or upload a clear front-facing photo." },
              { icon: "eyeglasses", title: "2. Choose", text: "Pick a frame style and color from the product page." },
              { icon: "ar_on_you", title: "3. Preview", text: "Fine-tune and compare before and after instantly." },
            ].map((item) => (
              <article key={item.title} className="card-soft p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0eded] text-[#1e2a44]">
                  <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
                </div>
                <h3 className="mb-2 text-2xl font-medium text-[#1b1b1c]">{item.title}</h3>
                <p className="text-zinc-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </StoreShell>
  );
}
