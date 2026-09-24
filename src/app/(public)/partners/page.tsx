import type { Metadata } from "next";
import ClientPartnersPage from "./ClientPartnersPage";

export const metadata: Metadata = {
  title: "White Label Technology Partnerships & Development | Obrive",
  description:
    "Partner with Obrive to deliver advanced digital, immersive and AI solutions to your clients under your own brand. Extend your agency capabilities with white-label technology development.",
  keywords: [
    "white label development",
    "technology partnerships",
    "white label AR VR",
    "agency technology partner",
    "white label AI development",
    "dedicated technology teams",
    "Obrive white label services",
  ],
  alternates: {
    canonical: "https://obrive.com/partners",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://obrive.com/partners",
    title: "White Label Technology Partnerships | Obrive",
    description:
      "Extend your capabilities with white-label digital, immersive, and AI development partnerships.",
    siteName: "Obrive",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "White Label Technology Partnerships | Obrive",
    description:
      "Deliver advanced technology solutions to your clients under your own brand.",
  },
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bangalore, Karnataka, India",
    ICBM: "12.9716, 77.5946",
  },
};

export default function PartnersPage() {
  return <ClientPartnersPage />;
}
