"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StoreShell } from "@/components/store/store-shell";
import { useCart } from "@/components/store/cart-context";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // If cart is empty, redirect or show message
  if (cartItems.length === 0 && !isProcessing) {
    return (
      <StoreShell>
        <section className="spectra-container flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined mb-4 text-6xl text-zinc-300">shopping_bag</span>
          <h1 className="mb-4 text-3xl font-medium text-[#1b1b1c]">Your cart is empty</h1>
          <p className="mb-8 text-zinc-600">You need to add items to your cart before checking out.</p>
          <Link href="/shop" className="btn-primary px-8 py-3 font-semibold">
            Return to Shop
          </Link>
        </section>
      </StoreShell>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call and payment processing
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Processing order...",
        success: "Order placed successfully!",
        error: "Failed to place order.",
      }
    ).then(() => {
      clearCart();
      router.push("/checkout/success");
    });
  };

  return (
    <StoreShell>
      <section className="spectra-container py-12 md:py-20">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-medium text-[#1b1b1c] md:text-5xl">Checkout</h1>
          <p className="mt-3 text-zinc-600">Complete your order securely (Demo Mode)</p>
        </div>

        <form onSubmit={handlePlaceOrder} className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Form Fields */}
          <div className="lg:col-span-7 space-y-10">
            {/* Contact Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-[#1b1b1c]">Contact Information</h2>
              <div>
                <label className="block text-sm font-medium text-zinc-700">Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="mt-1 block w-full rounded-[8px] border border-zinc-300 p-3 shadow-sm focus:border-[#1E2A44] focus:outline-none focus:ring-1 focus:ring-[#1E2A44]"
                  defaultValue="demo@spectra.com"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-[#1b1b1c]">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700">First Name</label>
                  <input type="text" required className="mt-1 block w-full rounded-[8px] border border-zinc-300 p-3 shadow-sm focus:border-[#1E2A44] focus:outline-none focus:ring-1 focus:ring-[#1E2A44]" defaultValue="Jane" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">Last Name</label>
                  <input type="text" required className="mt-1 block w-full rounded-[8px] border border-zinc-300 p-3 shadow-sm focus:border-[#1E2A44] focus:outline-none focus:ring-1 focus:ring-[#1E2A44]" defaultValue="Doe" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-zinc-700">Address</label>
                  <input type="text" required className="mt-1 block w-full rounded-[8px] border border-zinc-300 p-3 shadow-sm focus:border-[#1E2A44] focus:outline-none focus:ring-1 focus:ring-[#1E2A44]" defaultValue="123 Spectra Way" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-zinc-700">City</label>
                  <input type="text" required className="mt-1 block w-full rounded-[8px] border border-zinc-300 p-3 shadow-sm focus:border-[#1E2A44] focus:outline-none focus:ring-1 focus:ring-[#1E2A44]" defaultValue="San Francisco" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-zinc-700">Postal Code</label>
                  <input type="text" required className="mt-1 block w-full rounded-[8px] border border-zinc-300 p-3 shadow-sm focus:border-[#1E2A44] focus:outline-none focus:ring-1 focus:ring-[#1E2A44]" defaultValue="94105" />
                </div>
              </div>
            </div>

            {/* Payment Method (Fake) */}
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-[#1b1b1c]">Payment Details</h2>
              <div className="rounded-[8px] border border-[#e5e2e1] bg-[#f6f3f2] p-4 text-sm text-zinc-700">
                <div className="flex items-center gap-2 mb-2 font-medium text-[#1E2A44]">
                  <span className="material-symbols-outlined">info</span>
                  Demo Mode Active
                </div>
                No actual payment will be processed. Feel free to use any dummy values or leave the defaults.
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-zinc-700">Card Number</label>
                  <input type="text" required className="mt-1 block w-full rounded-[8px] border border-zinc-300 p-3 shadow-sm focus:border-[#1E2A44] focus:outline-none focus:ring-1 focus:ring-[#1E2A44]" defaultValue="4242 4242 4242 4242" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">Expiry Date</label>
                  <input type="text" required placeholder="MM/YY" className="mt-1 block w-full rounded-[8px] border border-zinc-300 p-3 shadow-sm focus:border-[#1E2A44] focus:outline-none focus:ring-1 focus:ring-[#1E2A44]" defaultValue="12/26" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">CVC</label>
                  <input type="text" required className="mt-1 block w-full rounded-[8px] border border-zinc-300 p-3 shadow-sm focus:border-[#1E2A44] focus:outline-none focus:ring-1 focus:ring-[#1E2A44]" defaultValue="123" />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <aside className="card-soft p-6 sticky top-28 bg-[#fafaf8]">
              <h2 className="mb-6 text-xl font-medium text-[#1b1b1c]">Order Summary</h2>
              
              <div className="mb-6 max-h-60 overflow-y-auto space-y-4 pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-[#f0eded]">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-[#1b1b1c] line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-[#1b1b1c]">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6 space-y-2 text-sm border-t border-[#e5e2e1] pt-4">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="text-[#1b1b1c]">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Shipping</span>
                  <span className="text-[#1b1b1c]">Free</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Taxes</span>
                  <span className="text-[#1b1b1c]">$0.00</span>
                </div>
              </div>
              
              <div className="mb-8 border-t border-[#e5e2e1] pt-4">
                <div className="flex justify-between text-xl font-medium text-[#1b1b1c]">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="btn-primary w-full py-4 text-sm font-semibold uppercase tracking-wider disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    Place Order (Demo)
                  </>
                )}
              </button>
            </aside>
          </div>
        </form>
      </section>
    </StoreShell>
  );
}
