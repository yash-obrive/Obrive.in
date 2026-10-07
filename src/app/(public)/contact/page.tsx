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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Obrive Industries",
  "image": "https://obrive.com/api/og?title=Obrive+Industries",
  "@id": "https://obrive.com",
  "url": "https://obrive.com/contact",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sree Gururaya Mansion, JP Nagar",
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.9063,
    "longitude": 77.5855
  }
};

export default function ContactPage() {
  return (
    <main className="w-full bg-background min-h-screen pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ContactForm />
    </main>
  );
}
