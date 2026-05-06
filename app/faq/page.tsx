import Link from "next/link";
import { StoreShell } from "@/components/store/store-shell";

const faqItems = [
  {
    question: "How does virtual try-on work?",
    answer:
      "Upload a clear front-facing photo, then we detect facial landmarks to position the sunglasses overlay. You can fine-tune fit with scale and rotate controls.",
  },
  {
    question: "What kind of photo gives the best result?",
    answer:
      "Use a front-facing photo with good lighting and no heavy filters. Keep your full face visible for reliable eye landmark detection.",
  },
  {
    question: "Are my photos stored permanently?",
    answer:
      "No. Uploaded photos are temporary and are automatically deleted after the configured TTL window (6 hours by default).",
  },
  {
    question: "Why am I seeing a no-face or low-confidence error?",
    answer:
      "This usually happens with poor lighting, angled faces, multiple people in frame, or blurry images. Try a clearer single-face image.",
  },
];

export default function FaqPage() {
  return (
    <StoreShell active="faq">
      <section className="spectra-container py-16">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-medium text-[#1e2a44]">Frequently Asked Questions</h1>
          <p className="mx-auto max-w-2xl text-zinc-600">
            Everything you need to know about Spectra shopping and the Virtual Try-On experience.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4">
          {faqItems.map((item) => (
            <article key={item.question} className="card-soft p-6">
              <h2 className="mb-2 text-lg font-semibold text-[#1b1b1c]">{item.question}</h2>
              <p className="text-zinc-600">{item.answer}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/shop" className="btn-primary inline-block px-6 py-3 text-sm font-semibold">
            Continue shopping
          </Link>
        </div>
      </section>
    </StoreShell>
  );
}
