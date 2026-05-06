"use client";

import Link from "next/link";
import { CartSummary } from "@/components/store/cart-summary";
import { StoreShell } from "@/components/store/store-shell";
import { useCart } from "@/components/store/cart-context";

export default function CartPage() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();

  return (
    <StoreShell active="cart">
      <section className="spectra-container py-16">
        <h1 className="mb-8 text-5xl font-medium text-[#1b1b1c]">Your Cart</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            {cartItems.length === 0 ? (
              <p className="text-zinc-600">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <article key={item.id} className="card-soft flex flex-col gap-6 p-6 sm:flex-row">
                  <div className="h-32 w-full overflow-hidden rounded-lg bg-[#f0eded] sm:w-32">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover mix-blend-multiply" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-medium text-[#1b1b1c]">{item.title}</h2>
                        <p className="text-sm text-zinc-600">{item.variant}</p>
                      </div>
                      <button 
                        aria-label="Remove item" 
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-500 hover:text-red-700"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <div className="flex h-10 w-28 items-center rounded-full border border-[#c5c6ce]">
                        <button onClick={() => updateQuantity(item.id, -1)} className="flex-1 text-zinc-500 hover:text-[#1e2a44]" aria-label="Decrease quantity">
                          <span className="material-symbols-outlined text-[18px]">remove</span>
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="flex-1 text-zinc-500 hover:text-[#1e2a44]" aria-label="Increase quantity">
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                      </div>
                      <p className="text-2xl font-medium text-[#1b1b1c]">${(item.unitPrice * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </article>
              ))
            )}
            <Link href="/shop" className="inline-block text-sm font-medium text-[#1e2a44] hover:underline">
              Continue shopping
            </Link>
          </div>

          <div className="lg:col-span-4">
            <CartSummary subtotal={cartTotal} />
          </div>
        </div>
      </section>
    </StoreShell>
  );
}
