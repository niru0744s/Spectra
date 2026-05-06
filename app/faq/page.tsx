import Link from "next/link";
import { StoreShell } from "@/components/store/store-shell";

const faqItems = [
  {
    question: "Are Spectra products cruelty-free?",
    answer:
      "Yes, all Spectra products are 100% cruelty-free and never tested on animals. We are committed to ethical and sustainable beauty practices.",
  },
  {
    question: "Are your products suitable for sensitive skin?",
    answer:
      "Our skincare line is carefully formulated with gentle, clinically tested ingredients without harsh irritants. However, we always recommend doing a patch test before incorporating any new product into your routine.",
  },
  {
    question: "How can I find the right skincare routine for my skin type?",
    answer:
      "You can browse our collections by skin type—such as oily, dry, or combination—or check the product descriptions for specific active ingredients. Our support team is also available to help build your perfect regimen.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We want you to love your skin. We offer a 30-day money-back guarantee. If a product doesn't work out for you, simply return the gently used item within 30 days for a full refund.",
  },
];

export default function FaqPage() {
  return (
    <StoreShell active="faq">
      <section className="spectra-container py-16">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-medium text-[#1e2a44]">Frequently Asked Questions</h1>
          <p className="mx-auto max-w-2xl text-zinc-600">
            Everything you need to know about Spectra skincare, our clean ingredients, and our beauty community.
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
