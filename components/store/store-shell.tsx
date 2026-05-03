import { ReactNode } from "react";
import { Footer } from "@/components/store/footer";
import { Navbar } from "@/components/store/navbar";

type StoreShellProps = {
  children: ReactNode;
  active?: "shop" | "account" | "cart";
};

export function StoreShell({ children, active }: StoreShellProps) {
  return (
    <>
      <Navbar active={active} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
