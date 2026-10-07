import type { Metadata } from "next";
import { Michroma } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-michroma",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://obrive.com"),
  title:
    "Obrive | Top AR & VR Services Company in India & Global – Enterprise Immersive Solutions",
  description:
    "Obrive Industries is a leading AR, VR, and MR company delivering enterprise immersive solutions globally and across India. From immersive 3D visualisation to bespoke XR applications, we turn ideas into interactive realities.",
  keywords:
    "Top AR services, best virtual reality companies, AR VR development India, augmented reality agency Bangalore, spatial computing solutions, enterprise immersive technology, AR development global, VR development global, MR solutions enterprise, spatial computing studio, 3D design services international, immersive technology company, enterprise XR applications global, mixed reality development services, 3D visualization design studio, virtual showroom solutions global, digital twin services, immersive business solutions worldwide",

  openGraph: {
    type: "website",
    url: "https://obrive.com",
    title:
      "Obrive | Top AR & VR Services Company in India & Global – Enterprise Immersive Solutions",
    description:
      "Join Obrive in leading the immersive revolution: top-tier solutions in AR, VR, MR, spatial computing and 3D design for enterprises across India and globally in training, retail, real-estate, manufacturing and more.",
    images: [
      {
        url: "https://obrive.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faugmented_first.f8b128f2.webp&w=1200&q=75",
        alt: "Obrive AR/VR/MR immersive technology solutions",
      },
    ],
    siteName: "Obrive",
    locale: "en_US",
  },
};

import { headers } from "next/headers";

import { Toaster } from "react-hot-toast";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const language = headerList.get("x-obrive-language") || "en";
  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <html lang={language} dir={dir} suppressHydrationWarning>
      <head>
        {/* Preconnect to critical external domains only (max 3-4) */}
        {/*
          We set a global before loading the ai script so it can pick up the correct agent id
          without having to edit the file. Replace process.env.NEXT_PUBLIC_ELEVEN_AGENT_ID
          in your environment, or set a literal string here for testing.
        */}
        <Script id="eleven-agent-global" strategy="beforeInteractive">
          {`window.ELEVENLABS_AGENT_ID = "${
            process.env.NEXT_PUBLIC_ELEVEN_AGENT_ID || ""
          }";`}
        </Script>

        {/* Load the local ai loader; include data-agent-id as another override option. */}
        <script
          id="eleven-ai"
          src="/ai/ai.js"
          data-agent-id={process.env.NEXT_PUBLIC_ELEVEN_AGENT_ID || ""}
        ></script>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
        <link rel="dns-prefetch" href="https://storage.googleapis.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `function initApollo(){var cacheBuster=Math.random().toString(36).substring(7);var trackerScript=document.createElement("script");trackerScript.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+cacheBuster;trackerScript.async=true;trackerScript.defer=true;trackerScript.onload=function(){if(window.trackingFunctions&&typeof window.trackingFunctions.onLoad==="function"){window.trackingFunctions.onLoad({appId:"68f8c36bb512bf0015c5fffd"});}};document.head.appendChild(trackerScript);}initApollo();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Organization",
              "@id": "https://obrive.com/#Organization",
              url: "https://obrive.com",
              legalName: "Obrive Industries",
              name: "Obrive Industries",
              description:
                "Obrive Industries delivers cutting-edge AR, VR, MR and spatial computing solutions across industries. From immersive 3D visualisation to bespoke XR applications, we turn ideas into interactive realities.",
              image:
                "https://obrive.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobrive-intro-poster.8a0a1b5d.webp&w=1920&q=75",
              logo: "https://obrive.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobrive-logo.fb3eb1d9.svg&w=256&q=75",
              telephone: "+91 888-477-4300",
              email: "info@obrive.com",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Sree Gururaya Mansion, 3rd Floor, 759, 8th main road KSRTC Layout, JP Nagar III Phase",
                addressLocality: "Bangalore",
                addressRegion: "Karnataka",
                addressCountry: "India",
                postalCode: "560078",
              },
              areaServed: ["IN", "Global"],
              sameAs: [
                "https://www.youtube.com/@ObriveInc",
                "https://www.linkedin.com/in/obrive-industries/",
                "https://x.com/obriveinc",
                "https://www.instagram.com/obrive.inc/",
              ],
            }),
          }}
        />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KSCT4R6J');`}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yt351ocghm");
          `}
        </Script>
      </head>
      <body className={`${michroma.className} antialiased bg-white`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KSCT4R6J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1N4967K4YQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1N4967K4YQ');
          `}
        </Script>

        {/*
          Google Preferred Sources — publisher.js
          Loaded once globally. Google's script scans the DOM for
          <div google-add-preferred-source-btn> elements and initialises
          the Preferred Sources widget on each matching element.
          strategy="afterInteractive" ensures non-blocking load after hydration.
          The stable id prevents Next.js from re-injecting this script
          on client-side navigations.
          Eligibility at the domain level (obrive.com) is determined by Google.
        */}
        <Script
          id="google-preferred-source-publisher"
          src="https://news.google.com/swg/js/v1/publisher.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

