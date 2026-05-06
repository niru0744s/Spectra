import Link from "next/link";

type NavbarProps = {
  active?: "shop" | "account" | "cart" | "faq";
};

export function Navbar({ active }: NavbarProps) {
  const isShop = active === "shop";
  const isCart = active === "cart";
  const isAccount = active === "account";
  const isFaq = active === "faq";

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e8e8e8] bg-[#fafaf8] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="spectra-container flex h-20 items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-[#1e2a44]"
          aria-label="Spectra home"
        >
          Spectra
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium tracking-tight md:flex">
          <Link
            href="/shop"
            className={isShop ? "border-b-2 border-[#1e2a44] pb-1 text-[#1e2a44]" : "text-zinc-500 hover:text-[#1e2a44]"}
          >
            Shop
          </Link>
          <Link href="/#how-it-works" className="text-zinc-500 hover:text-[#1e2a44]">
            How it works
          </Link>
          <Link
            href="/faq"
            className={isFaq ? "border-b-2 border-[#1e2a44] pb-1 text-[#1e2a44]" : "text-zinc-500 hover:text-[#1e2a44]"}
          >
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-5 text-[#1e2a44]">
          <button aria-label="Search" className="hover:opacity-80">
            <span className="material-symbols-outlined">search</span>
          </button>
          <Link
            href="/cart"
            aria-label="Cart"
            className={isCart ? "border-b-2 border-[#1e2a44] pb-1 hover:opacity-80" : "hover:opacity-80"}
          >
            <span className="material-symbols-outlined">shopping_bag</span>
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className={isAccount ? "border-b-2 border-[#1e2a44] pb-1 hover:opacity-80" : "hover:opacity-80"}
          >
            <span className="material-symbols-outlined">person</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
