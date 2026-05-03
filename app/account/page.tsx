import { StoreShell } from "@/components/store/store-shell";
import { orders, userProfile } from "@/lib/mock-data";

export default function AccountPage() {
  return (
    <StoreShell active="account">
      <section className="spectra-container flex flex-col gap-6 py-20 md:flex-row">
        <aside className="w-full shrink-0 border-r border-[#e5e2e1] md:w-64 md:pr-8">
          <div className="mb-8 flex items-center gap-4 border-b border-[#e5e2e1] pb-6">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-[#f0eded]">
              <img src={userProfile.avatar} alt={userProfile.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-[#1b1b1c]">{userProfile.name}</h2>
              <p className="text-sm text-zinc-500">{userProfile.tier}</p>
            </div>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 rounded px-4 py-3 text-zinc-500 hover:bg-[#f0eded]">
              <span className="material-symbols-outlined">account_circle</span>
              Profile
            </a>
            <a href="#" className="flex items-center gap-3 rounded bg-[#1e2a44] px-4 py-3 text-white">
              <span className="material-symbols-outlined">local_shipping</span>
              Orders
            </a>
            <a href="#" className="flex items-center gap-3 rounded px-4 py-3 text-zinc-500 hover:bg-[#f0eded]">
              <span className="material-symbols-outlined">location_on</span>
              Addresses
            </a>
          </nav>
        </aside>

        <div className="flex-1 md:pl-8">
          <header className="mb-8">
            <h1 className="mb-1 text-4xl font-medium text-[#1b1b1c]">Order History</h1>
            <p className="text-zinc-600">View and track your recent purchases.</p>
          </header>

          <div className="space-y-4">
            {orders.map((order) => (
              <article
                key={order.id}
                className="card-soft flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-center"
              >
                <div className="flex w-full items-start gap-4 md:w-auto">
                  <div className="h-20 w-20 shrink-0 rounded bg-[#f6f3f2] p-2">
                    <img src={order.image} alt={order.productName} className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-xs uppercase tracking-widest text-zinc-500">Order #{order.id}</span>
                      <span className="rounded-full border border-[#e5e2e1] bg-[#f0eded] px-2 py-0.5 text-xs">
                        {order.status}
                      </span>
                    </div>
                    <h2 className="text-xl font-medium text-[#1b1b1c]">{order.productName}</h2>
                    <p className="text-sm text-zinc-600">Placed on {order.placedOn}</p>
                  </div>
                </div>

                <div className="w-full border-t border-[#e5e2e1] pt-4 md:w-auto md:border-none md:pt-0 md:text-right">
                  <p className="mb-2 text-2xl font-medium text-[#1b1b1c]">${order.total.toFixed(2)}</p>
                  <button className="btn-secondary px-4 py-2 text-sm font-medium">
                    {order.status === "Shipped" ? "Track Package" : "View Receipt"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </StoreShell>
  );
}
