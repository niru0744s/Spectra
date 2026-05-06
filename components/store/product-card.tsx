"use client";

import Link from "next/link";
import { Product } from "@/lib/mock-data";
import { useCart } from "@/components/store/cart-context";
import { useWishlist } from "@/components/store/wishlist-context";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-[#e5e2e1] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-[4/3] bg-[#f6f3f2] p-6">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        <button 
          onClick={(e) => {
            e.preventDefault(); // In case it's wrapped in a Link somehow, though it's inside an article
            toggleWishlist(product.id, product.name);
          }}
          className={`absolute right-3 top-3 transition-colors ${isFavorite ? "text-red-500 hover:text-red-600" : "text-zinc-500 hover:text-[#1e2a44]"}`} 
          aria-label="Favorite"
        >
          <span 
            className="material-symbols-outlined transition-all"
            style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <Link href={`/product/${product.slug}`} className="text-xl font-medium text-[#1b1b1c] hover:underline">
            {product.name}
          </Link>
          <p className="text-lg text-[#1b1b1c]">${product.price}</p>
        </div>
        <p className="mb-4 text-sm text-zinc-500">{product.subtitle}</p>
        <div className="mt-auto flex gap-2">
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
            className="btn-primary flex-1 py-2 text-center text-sm font-medium"
          >
            Add to Cart
          </button>
          {product.hasTryOn ? (
            <Link
              href={`/product/${product.slug}#virtual-try-on`}
              className="btn-secondary flex items-center justify-center px-3"
              aria-label="Virtual Try-On"
            >
              <span className="material-symbols-outlined">view_in_ar</span>
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
