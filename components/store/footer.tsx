import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e8e8e8] bg-[#fafaf8]">
      <div className="spectra-container flex flex-col items-center justify-between gap-8 py-16 md:flex-row">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#1e2a44]">
          Spectra
        </Link>
        <div className="flex gap-6 text-xs uppercase tracking-widest text-zinc-400">
          <a href="#" className="hover:text-[#1e2a44]">
            Privacy
          </a>
          <a href="#" className="hover:text-[#1e2a44]">
            Terms
          </a>
          <a href="#" className="hover:text-[#1e2a44]">
            Contact
          </a>
        </div>
        <p className="text-xs uppercase tracking-widest text-zinc-400">
          © 2024 Spectra. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
