"use client";

import Link from "next/link";
import { StoreShell } from "@/components/store/store-shell";

export default function CheckoutSuccessPage() {
  // Simple success page
  return (
    <StoreShell>
      <section className="spectra-container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#1E2A44] text-white">
          <span className="material-symbols-outlined text-5xl">check</span>
        </div>
        <h1 className="mb-4 text-4xl font-medium text-[#1b1b1c] md:text-5xl">Order Confirmed!</h1>
        <p className="mb-8 max-w-md text-lg text-zinc-600">
          Thank you for your demo purchase. Your mock order has been received and your cart is now empty.
        </p>
        <div className="flex gap-4">
          <Link href="/shop" className="btn-primary px-8 py-3 font-semibold">
            Continue Shopping
          </Link>
          <Link href="/" className="btn-secondary px-8 py-3 font-semibold">
            Return Home
          </Link>
        </div>
      </section>
    </StoreShell>
  );
}
