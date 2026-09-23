import type { Metadata } from "next";
import PanIndiaExplorer from "@/components/pages/location/PanIndiaExplorer";

export const metadata: Metadata = {
  title: "Obrive Pan India — City Explorer | One India. Every City.",
  description: "Explore the Pan India city explorer for Obrive across Tier 1, Tier 2, and Tier 3 cities.",
  openGraph: {
    title: "Obrive Pan India — City Explorer | One India. Every City.",
    description: "Explore the Pan India city explorer for Obrive across Tier 1, Tier 2, and Tier 3 cities.",
    type: "website",
    siteName: "Obrive",
  },
};

export default function LocationPage() {
  return <PanIndiaExplorer />;
}
