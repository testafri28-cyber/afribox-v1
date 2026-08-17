"use client";

import { useState } from "react";
import { faqItems } from "@/lib/afribox-data";

export default function MobileFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-brand-border px-4 py-9">
      <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-wide text-green-dark">Questions</p>
      <h2 className="mb-6 font-heading text-2xl font-bold leading-tight text-brand-gray">
        L&apos;essentiel, vite fait.
      </h2>

      <div>
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.question} className={`border-b border-brand-border ${i === 0 ? "border-t" : ""}`}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between py-4 text-left text-[14.5px] font-semibold text-brand-gray"
                aria-expanded={isOpen}
              >
                {item.question}
                <span
                  className={`ml-3 flex-shrink-0 text-lg text-green-dark transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-200 ease-in-out"
                style={{ maxHeight: isOpen ? "200px" : "0px" }}
              >
                <p className="pb-4 pr-6 text-[13.5px] leading-relaxed text-brand-sub">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
