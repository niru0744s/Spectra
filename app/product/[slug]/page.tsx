"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AccordionSpecs } from "@/components/store/accordion-specs";
import { ColorSwatches } from "@/components/store/color-swatches";
import { StoreShell } from "@/components/store/store-shell";
import { TryOnJumpButton } from "@/components/store/try-on-jump-button";
import { TryOnModule } from "@/components/store/try-on-module";
import { useProducts } from "@/components/store/product-context";
import { useCart } from "@/components/store/cart-context";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const { getProductBySlug } = useProducts();
  const { addToCart } = useCart();
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const modelImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDu3wPwM8H7c6rAbRSzTnURkSGM9p-zQCl9yZ9VAA7MJlmN0KR-br4cmlS6kJb9VMYPt_Qw0_TpmfLUAd_mKdN2wyf1VO701Rp7dSrLFY-wNPrJPLEi34sSJ401gifPfsyG_t2C4JMWqIWkYaoszFhvqeGz_zoiRYENNAVcXQtiAtD4gd2vwyHmDGPp52N8w8n3QS4klNSJR4K5uaRddjFd543ODFVWKnBNd-gZi6L9MZjcQLSv7tHJ9_I9hX-4uXUFeodfGUwePQ";
  const overlayImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC5L_rzECIcgfTj7OAGHKhJLCMbyYd7DGQZNMzA9jtky2ueedlb4YICVBvgeU8BeZzZU28Ah19IgcfwHRbHUKmxBbrtXczx5sHozbmRYwziNtNwCcmYeYg8TEXPvOfHQhYQ9FO4hKQr0dUAJOSbaMsNEBlWyfg76CvO408A7GGvHU4UKQ65K7GYygVOl0mtOXQ-4IAKswq6Egh0s2d29esVN2sFaJuAUtq4jhfU74azEjabdA6tzxs3rlKXYduXvoVfRq6WyekHDw";

  return (
    <StoreShell active="shop">
      <section className="spectra-container py-16">
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-7">
            <div className="overflow-hidden rounded-xl bg-[#f6f3f2] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <img src={product.image} alt={product.name} className="aspect-square h-auto w-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.gallery.map((image, index) => (
                <button
                  key={image}
                  className={index === 0 ? "overflow-hidden rounded-lg border-2 border-[#1e2a44]" : "overflow-hidden rounded-lg border border-[#e5e2e1] opacity-70 hover:opacity-100"}
                >
                  <img src={image} alt={`${product.name} preview ${index + 1}`} className="aspect-square w-full object-cover" />
                </button>
              ))}
              <button className="flex items-center justify-center rounded-lg border border-[#e5e2e1] bg-[#e5e2e1]">
                <span className="material-symbols-outlined text-zinc-500">play_circle</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-8">
            <div className="mb-4 flex items-center gap-1 text-zinc-500">
              {Array.from({ length: 4 }).map((_, index) => (
                <span key={`full-${index}`} className="material-symbols-outlined text-[16px]">
                  star
                </span>
              ))}
              <span className="material-symbols-outlined text-[16px]">star_half</span>
              <span className="ml-1 text-xs uppercase tracking-wider text-zinc-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <h1 className="mb-2 text-5xl font-medium text-[#1b1b1c]">{product.name}</h1>
            <p className="mb-6 text-3xl text-zinc-600">${product.price}</p>
            <p className="mb-8 text-zinc-600">{product.description}</p>

            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Frame Color: {product.frameColorLabel}
              </p>
              <ColorSwatches selected={product.frameColorLabel} swatches={product.colors} />
            </div>

            <div className="mb-8 space-y-3">
              <button 
                onClick={() => {
                  addToCart({
                    id: "temp",
                    productSlug: product.slug,
                    title: product.name,
                    variant: product.frameColorLabel || "Default",
                    quantity: 1,
                    unitPrice: product.price,
                    image: product.image
                  });
                }}
                className="btn-primary flex w-full items-center justify-center gap-2 py-4 text-sm font-semibold"
              >
                Add to Cart
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              </button>
              <TryOnJumpButton />
            </div>

            <AccordionSpecs specs={product.specs} fit={product.fit} />
          </div>
        </div>

        <TryOnModule productSlug={slug} />

        <div id="faq" className="card-soft p-6">
          <h3 className="mb-2 text-2xl font-medium text-[#1b1b1c]">Need help choosing?</h3>
          <p className="text-zinc-600">
            Our skincare experts can help you compare active ingredients, formulations, and routines before checkout.
          </p>
          <Link href="/auth/sign-in" className="mt-4 inline-block text-sm font-medium text-[#1e2a44] hover:underline">
            Contact support
          </Link>
        </div>
      </section>
    </StoreShell>
  );
}
