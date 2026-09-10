import React from "react";
import PricingHero from "./components/PricingHero";
import PricingSection from "./components/PricingSection";
import PricingHowItWorks from "./components/PricingHowItWorks";

export const metadata = {
  title: "Pricing | Premium Digital Development | Obrive",
  description:
    "Transparent starting prices for immersive experiences, digital products, software engineering and growth. Choose a stream, select a package and move into a clearly scoped engagement.",
  alternates: {
    canonical: "https://www.obrive.in/pricing",
  },
  openGraph: {
    title: "Pricing | Premium Digital Development | Obrive",
    description:
      "Transparent starting prices for immersive experiences, digital products, software engineering and growth.",
    url: "https://www.obrive.in/pricing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Premium Digital Development | Obrive",
    description: "Transparent starting prices for digital products & growth.",
  },
};

export default function PricingPage() {
  return (
    <main className="w-full bg-white overflow-hidden">
      <PricingHero />
      <PricingSection />
      
      {/* Value Strip */}
      <section className="border-t border-b border-primary/10 bg-primary/5">
        <div className="max-w-[1280px] mx-auto py-12 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <b className="text-primary font-bold block mb-1">Secure checkout</b>
            <span className="text-primary/70 text-sm">Razorpay payment integration</span>
          </div>
          <div>
            <b className="text-primary font-bold block mb-1">Defined scope</b>
            <span className="text-primary/70 text-sm">SOW before final payment</span>
          </div>
          <div>
            <b className="text-primary font-bold block mb-1">GST ready</b>
            <span className="text-primary/70 text-sm">Tax shown on invoice</span>
          </div>
          <div>
            <b className="text-primary font-bold block mb-1">Global pricing</b>
            <span className="text-primary/70 text-sm">INR + indicative USD</span>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="bg-gradient-to-br from-primary to-[#0f2e2a] rounded-3xl p-10 md:p-16 text-white flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="max-w-[600px]">
              <div className="text-accent text-xs font-bold tracking-[0.14em] uppercase mb-4">
                LET'S BUILD TOGETHER
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Need a custom combination?
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Combine design, development, immersive technology and growth into one roadmap. Enterprise and multi-stream scopes are quoted after discovery.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a href="/contact?intent=quote" className="bg-accent text-white px-8 py-4 rounded-full font-bold text-center hover:bg-accent/90 transition-colors">
                Request Custom Quote
              </a>
              <a href="/contact?intent=payment" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-center hover:bg-white/20 transition-colors">
                Start with Razorpay
              </a>
            </div>
          </div>
        </div>
      </section>

      <PricingHowItWorks />
    </main>
  );
}
