import { StoreShell } from "@/components/store/store-shell";
import { orders, userProfile } from "@/lib/mock-data";

export default function AccountPage() {
  return (
    <StoreShell active="account">
      <section className="spectra-container flex flex-col gap-6 py-20 md:flex-row">
        <aside className="w-full shrink-0 border-r border-[#E8E8E8] md:w-64 md:pr-8">
          <div className="mb-8 flex items-center gap-4 border-b border-[#E8E8E8] pb-6">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-[#FAFAF8]">
              <img src={userProfile.avatar} alt={userProfile.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-[#1E1E1E]">{userProfile.name}</h2>
              <p className="text-sm text-[#75777e]">{userProfile.tier}</p>
            </div>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 rounded-[8px] px-4 py-3 text-[#75777e] transition-colors hover:bg-[#FAFAF8] hover:text-[#1E1E1E]">
              <span className="material-symbols-outlined">account_circle</span>
              Profile
            </a>
            <a href="#" className="flex items-center gap-3 rounded-[8px] bg-[#1E2A44] px-4 py-3 text-white shadow-sm">
              <span className="material-symbols-outlined">local_shipping</span>
              Orders
            </a>
            <a href="#" className="flex items-center gap-3 rounded-[8px] px-4 py-3 text-[#75777e] transition-colors hover:bg-[#FAFAF8] hover:text-[#1E1E1E]">
              <span className="material-symbols-outlined">location_on</span>
              Addresses
            </a>
          </nav>
        </aside>

        <div className="flex-1 md:pl-8">
          <header className="mb-8">
            <h1 className="mb-1 text-4xl font-medium tracking-tight text-[#1E1E1E]">Order History</h1>
            <p className="text-[#75777e]">View and track your recent purchases.</p>
          </header>

          <div className="space-y-4">
            {orders.map((order) => (
              <article
                key={order.id}
                className="flex flex-col items-start justify-between gap-4 rounded-[12px] border border-[#E8E8E8] bg-white p-6 transition-all hover:border-[#1E2A44] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] md:flex-row md:items-center"
              >
                <div className="flex w-full items-start gap-4 md:w-auto">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[8px] bg-[#FAFAF8] p-2">
                    <img src={order.image} alt={order.productName} className="h-full w-full mix-blend-multiply object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#75777e] font-bold">Order #{order.id}</span>
                      <span className="rounded-full border border-[#E8E8E8] bg-[#FAFAF8] px-2 py-0.5 text-[10px] font-semibold text-[#1E2A44]">
                        {order.status}
                      </span>
                    </div>
                    <h2 className="text-base font-medium text-[#1E1E1E] leading-snug">{order.productName}</h2>
                    <p className="mt-1 text-sm text-[#75777e]">Placed on {order.placedOn}</p>
                  </div>
                </div>

                <div className="w-full border-t border-[#E8E8E8] pt-4 md:w-auto md:border-none md:pt-0 md:text-right">
                  <p className="mb-2 text-xl font-medium text-[#1E2A44]">${order.total.toFixed(2)}</p>
                  <button className="rounded-[8px] border border-[#E8E8E8] bg-white px-4 py-2 text-sm font-medium text-[#1E2A44] shadow-sm transition-all hover:bg-[#FAFAF8] hover:shadow-md">
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
