import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ProductTemplate } from "@/components/pages/products/ProductTemplate";
import { COUNTRIES, SUPPORTED_COUNTRIES } from "@/config/countries";
import { getProductData, getProductSlugs } from "@/lib/products";

function getAlternates(slug: string) {
  const activeCountries = SUPPORTED_COUNTRIES.filter(
    (code) => COUNTRIES[code].isProductionReady
  );
  const langs: Record<string, string> = {
    "x-default": `https://obrive.in/products/${slug}`,
  };
  for (const code of activeCountries) {
    langs[COUNTRIES[code].hreflang] = `https://obrive.in/${code}/products/${slug}`;
  }
  return {
    canonical: `https://obrive.in/products/${slug}`,
    languages: langs,
  };
}


interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getProductSlugs().map((slug: string) => ({ slug }));
}

import { resolveProductMetadata } from "@/lib/metadata-resolvers";

export async function generateMetadata(props: any): Promise<Metadata> {
  return resolveProductMetadata((await props.params).slug);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const productData = getProductData(slug);

  if (!productData) {
    notFound();
  }

  return (
    <>
      {slug === "obpark" && (
        <Script
          id="obpark-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Product",
            name: "OBPARK",
            description:
              "Make parking effortless for your customers with AR wayfinding. Increase in revenues, visits and customer satisfaction guaranteed with OBPARK | Obrive Products",
            image: [
              "https://obrive.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobpark-hero.65e28982.webp&w=1920&q=75",
              "https://obrive.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobpark_3.db8370e2.webp&w=1200&q=75",
              "https://obrive.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep_6.64adc1fc.webp&w=640&q=75",
            ],
            brand: {
              "@type": "Brand",
              name: "Obrive Industries",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://obrive.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": "https://obrive.in/products"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "OBPARK",
                "item": `https://obrive.in/products/${slug}`
              }
            ]
          }
          ])}
        </Script>
      )}
      {slug === "obnavi" && (
        <Script
          id="obnavi-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Product",
            name: "OBNAVI",
            description:
              "Shopping just got smarter. Get real-time AR navigation, find products instantly, and get personalized recommendations. OBNAVI guides you everywhere.",
            image: [
              "https://obrive.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobnavi-hero.e25a129e.webp&w=1920&q=75",
              "https://obrive.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobnavi_3.df52f4da.webp&w=1200&q=75",
            ],
            brand: {
              "@type": "Brand",
              name: "Obrive Industries",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://obrive.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": "https://obrive.in/products"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "OBNAVI",
                "item": `https://obrive.in/products/${slug}`
              }
            ]
          }
          ])}
        </Script>
      )}
      {slug === "obmove" && (
        <Script
          id="obmove-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Product",
            name: "OBMOVE",
            description:
              "Explore, customize, and test drive any vehicle in VR before committing to one product. OBMOVE makes it happen. See how.",
            image: [
              "https://obrive.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobmove-hero.d1062fdc.webp&w=1920&q=75",
              "https://obrive.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobmove_3.072acded.webp&w=1200&q=75",
              "https://obrive.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobmove_1.777137d2.webp&w=1200&q=75",
            ],
            brand: {
              "@type": "Brand",
              name: "Obrive Industries",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://obrive.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": "https://obrive.in/products"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "OBMOVE",
                "item": `https://obrive.in/products/${slug}`
              }
            ]
          }
          ])}
        </Script>
      )}
      {slug === "obnest" && (
        <Script
          id="obnest-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Product",
            name: "OBNEST",
            description:
              "Channeling MR/VR technology to deliver the property of your dreams at your doorstep. Get a Demo Now! | OBNEST",
            image: [
              "https://obrive.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobnest-hero.07df667c.webp&w=1920&q=75",
              "https://obrive.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobnest_3.acbe931d.webp&w=1200&q=75",
              "https://obrive.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fauthor.1358b851.webp&w=640&q=75",
            ],
            brand: {
              "@type": "Brand",
              name: "Obrive Industries",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://obrive.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": "https://obrive.in/products"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "OBNEST",
                "item": `https://obrive.in/products/${slug}`
              }
            ]
          }
          ])}
        </Script>
      )}
      <ProductTemplate {...productData} />
    </>
  );
}
