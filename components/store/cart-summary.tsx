type CartSummaryProps = {
  subtotal: number;
};

export function CartSummary({ subtotal }: CartSummaryProps) {
  return (
    <aside className="card-soft p-6 lg:sticky lg:top-28">
      <h2 className="mb-4 text-2xl font-medium text-[#1b1b1c]">Order Summary</h2>
      <div className="mb-4 space-y-2 text-sm">
        <div className="flex justify-between text-zinc-600">
          <span>Subtotal</span>
          <span className="text-[#1b1b1c]">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-zinc-600">
          <span>Shipping</span>
          <span className="text-[#1b1b1c]">Calculated at checkout</span>
        </div>
        <div className="flex justify-between text-zinc-600">
          <span>Estimated Tax</span>
          <span className="text-[#1b1b1c]">$0.00</span>
        </div>
      </div>
      <div className="mb-4 border-t border-[#e5e2e1] pt-4">
        <div className="flex justify-between text-xl font-medium text-[#1b1b1c]">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>
      <div className="space-y-3">
        <button className="btn-primary w-full py-3 text-sm font-semibold uppercase tracking-wider">
          Checkout
        </button>
        <div className="flex items-center justify-center gap-1 text-xs uppercase tracking-wider text-zinc-500">
          <span className="material-symbols-outlined text-[16px]">lock</span>
          <span>Secure checkout</span>
        </div>
        <button className="btn-secondary w-full py-3 text-sm font-semibold uppercase tracking-wider">
          Continue Shopping
        </button>
      </div>
    </aside>
  );
}
