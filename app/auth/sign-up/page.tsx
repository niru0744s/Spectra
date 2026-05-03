import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border border-[#e5e2e1] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-medium text-[#1e2a44]">Spectra</h1>
          <p className="mt-2 text-zinc-600">Create your account to start trying on frames.</p>
        </div>

        <div className="mb-8 flex rounded-lg bg-[#f6f3f2] p-1 text-sm font-medium">
          <Link href="/auth/sign-in" className="flex-1 rounded-md py-2 text-center text-zinc-500">
            Sign In
          </Link>
          <Link href="/auth/sign-up" className="flex-1 rounded-md bg-white py-2 text-center shadow-sm">
            Sign Up
          </Link>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Alex Mercer"
              className="w-full rounded border border-[#e5e2e1] bg-white px-4 py-3 outline-none focus:border-[#1e2a44]"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="alex@example.com"
              className="w-full rounded border border-[#e5e2e1] bg-white px-4 py-3 outline-none focus:border-[#1e2a44]"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded border border-[#e5e2e1] bg-white px-4 py-3 outline-none focus:border-[#1e2a44]"
            />
          </div>
          <button type="submit" className="btn-primary w-full py-3 text-sm font-semibold">
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
}
