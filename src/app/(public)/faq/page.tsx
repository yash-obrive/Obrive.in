import type { Metadata } from "next";
import FAQMainClientLayout from "@/components/pages/faq/FAQMainClientLayout";
import mainFaqs from "@/data/main-faqs.json";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs) | Obrive",
  description:
    "Explore comprehensive frequently asked questions about Obrive's digital product development, web design, web development, AI, AR, VR, MR, 3D design, Spatial Computing, pricing, timelines, and services.",
  alternates: {
    canonical: "https://obrive.com/faqs",
  },
};

export default function FaqPage() {
  return <FAQMainClientLayout faqs={mainFaqs} />;
}
