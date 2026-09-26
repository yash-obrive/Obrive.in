import { Suspense } from "react";
import CheckoutForm from "./components/CheckoutForm";
import CheckoutHero from "./components/CheckoutHero";

export const metadata = {
  title: "Secure Checkout | Obrive",
  description:
    "Secure checkout for Obrive project scopes and digital services.",
  alternates: {
    canonical: "https://www.obrive.in/checkout",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  return (
    <main className="w-full bg-background min-h-screen pt-20">
      <CheckoutHero />
      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center text-primary">
            Loading checkout...
          </div>
        }
      >
        <CheckoutForm />
      </Suspense>
    </main>
  );
}
