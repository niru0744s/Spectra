import Link from "next/link";
import { Product } from "@/lib/mock-data";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-[#e5e2e1] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-[4/3] bg-[#f6f3f2] p-6">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        <button className="absolute right-3 top-3 text-zinc-500 hover:text-[#1e2a44]" aria-label="Favorite">
          <span className="material-symbols-outlined">favorite</span>
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
          <button className="btn-primary flex-1 py-2 text-center text-sm font-medium">
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
