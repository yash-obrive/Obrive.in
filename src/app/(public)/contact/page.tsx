import React from "react";
import ContactForm from "./components/ContactForm";

export const metadata = {
  title: "Contact Us | Discuss Your Project | Obrive",
  description:
    "Get in touch with Obrive to discuss your next AR, VR, digital product, or software engineering project. Let's build what's next.",
  alternates: {
    canonical: "https://obrive.com/contact",
  },
  openGraph: {
    title: "Contact Us | Discuss Your Project | Obrive",
    description:
      "Get in touch with Obrive to discuss your next AR, VR, digital product, or software engineering project.",
    url: "https://obrive.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Discuss Your Project | Obrive",
    description: "Get in touch with Obrive to discuss your next project.",
  },
};

export default function ContactPage() {
  return (
    <main className="w-full bg-background min-h-screen pt-20">
      <ContactForm />
    </main>
  );
}
