import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import FONTS from "@/assets/fonts";
import { BACKGROUND_IMAGE, BACKGROUND_IMAGE_META } from "@/assets/images";
import BlogCard from "@/components/pages/home/card/BlogCard";
import GoodByeCard from "@/components/pages/home/card/GoodByeCard";
import UsecaseCard from "@/components/pages/home/card/UsecaseCard";
import { HomepageRiveAnimation } from "@/components/pages/home/HomepageRiveAnimation";
import ObriveVideo from "@/components/pages/home/Videos/ObriveVideo";
import AnimatedButton from "@/components/shared/buttons/AnimatedButton";
import SmoothScrollLink from "@/components/shared/buttons/SmoothScrollLink";
import RoundedBallIcon from "@/components/shared/icons/RoundedBallIcon";
import Link from "@/components/shared/LocalizedLink";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import {
  FadeInOnLoad,
  FadeInOnView,
  StaggerTiltBottomLeftOnScroll,
} from "@/components/shared/motion/GsapMotion";
import SmoothScrollProvider from "@/components/shared/motion/SmoothScrollProvider";
import { Button } from "@/components/ui/button";
import { HOME_CARD, HOME_CARD_BLOG } from "@/constants/pages/home/home-card";

// Dynamic imports for performance optimization
// const HomepageRiveAnimation = dynamic(
//   () =>
//     import("@/components/pages/home/HomepageRiveAnimation").then(
//       (mod) => mod.HomepageRiveAnimation
//     ),
//   {
//     // ssr: false,
//     loading: () => (
//       <div className="h-[400px] animate-pulse bg-gray-200 rounded-lg" />
//     ),
//   }
// );

const VideoCardObrive = dynamic(
  () => import("@/components/shared/cards/VideoCardObrive"),
  {
    loading: () => (
      <div className="h-[300px] animate-pulse bg-gray-200 rounded-lg" />
    ),
  },
);

const ImmersiveExperience = dynamic(
  () => import("@/components/shared/cards/ImmersiveExperience"),
  {
    loading: () => (
      <div className="h-[400px] animate-pulse bg-gray-200 rounded-lg" />
    ),
  },
);

const EffortlessControl = dynamic(
  () => import("@/components/shared/cards/EffortlessControl"),
  {
    loading: () => (
      <div className="h-[400px] animate-pulse bg-gray-200 rounded-lg" />
    ),
  },
);

export const metadata: Metadata = {
  metadataBase: new URL("https://obrive.com"),

  title: "AR, VR, MR & Spatial Computing Solutions | Obrive",

  description:
    "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.",

  keywords: [
    "AR development global",
    "VR development enterprise",
    "MR solutions India",
    "spatial computing studio",
    "3D visualization Bangalore",
    "augmented reality services",
    "virtual reality applications",
    "mixed reality enterprise solutions",
    "immersive technology company",
  ],

  alternates: {
    canonical: "https://obrive.com/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://obrive.com/",
    title: "Obrive – AR, VR, MR & Spatial Computing Solutions",
    description:
      "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.",
    siteName: "Obrive",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Obrive – AR, VR, MR & Spatial Computing Solutions",
    description:
      "Immersive technology company in Bangalore delivering AR, VR, MR and 3D visualization solutions.",
  },

  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bangalore, Karnataka, India",
    ICBM: "12.9716, 77.5946",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Obrive",
  url: "https://obrive.com/",
  description:
    "Leading immersive technology company delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <SmoothScrollProvider>
        <div className="flex flex-col items-center">
          {/* hero content, buttons, and animation combined to fix spacing */}
          <FullWidthSection backgroundColor="accent" className="pt-28 pb-10">
            <div className="text-center flex flex-col items-center gap-6 mt-4">
              <FadeInOnLoad delay={0.15}>
                <h1
                  className={`${FONTS.microgrammaBold.className} text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-secondary`}
                >
                  Owning the Future
                </h1>
              </FadeInOnLoad>
              <FadeInOnLoad delay={0.3}>
                <p className="text-sm sm:text-md text-center max-w-4xl px-4 font-medium leading-relaxed">
                  We build the spatial layer between the physical and digital worlds. We combine Spatial Computing, Artificial Intelligence, Augmented Reality, Virtual Reality, Mixed Reality, 3D, Digital Twins, Computer Vision and intelligent software to transform how people experience places, products, services and information. The future isn't something we wait for. It's something we build.
                </p>
              </FadeInOnLoad>

              <FadeInOnLoad delay={0.45}>
                <div className="flex sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-4">
                  <AnimatedButton
                    asChild
                    className="text-xs uppercase"
                    size="lg"
                    href="/faqs"
                    aria-label="explore faqs"
                    iconSize={16}
                  >
                    Explore FAQs
                  </AnimatedButton>
                  <SmoothScrollLink href="/about" offset={80}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-primary uppercase text-xs"
                    >
                      Learn More
                    </Button>
                  </SmoothScrollLink>
                </div>
              </FadeInOnLoad>
            </div>

            {/* homepage animation */}
            <div className="mx-auto flex items-center w-full mt-12 sm:mt-16">
              <HomepageRiveAnimation className="w-full aspect-[16/4] max-h-[320px] sm:max-h-[340px] lg:max-h-[380px]" />
            </div>
          </FullWidthSection>

          {/* brand-line */}
          <FullWidthSection backgroundColor="accent" className="py-6">
            <FadeInOnView>
              <div className="flex flex-col sm:flex-row pb-8 border-b-2 border-primary/40 sm:items-center max-sm:items-start justify-between w-full gap-4">
                <Link href="/resources">
                  <Button
                    className="uppercase bg-accent cursor-pointer rounded-lg text-xs"
                    variant={"outline"}
                  >
                    News
                  </Button>
                </Link>
                <p className="uppercase text-xs font-semibold max-sm:text-left text-primary text-center sm:text-right">
                  TURNING COMPLEX BUSINESS CHALLENGES INTO INTELLIGENT EXPERIENCES.
                </p>
              </div>
            </FadeInOnView>
          </FullWidthSection>

          {/* mission */}
          <FullWidthSection backgroundColor="accent" className="pt-10">
            <FadeInOnView>
              <div className="flex relative w-full overflow-hidden gap-10 flex-col">
                <div className="absolute top-20 left-80">
                  <Image
                    src={BACKGROUND_IMAGE.CURVED_BG}
                    alt={BACKGROUND_IMAGE_META.CURVED_BG.alt}
                    width={BACKGROUND_IMAGE_META.CURVED_BG.width}
                    height={BACKGROUND_IMAGE_META.CURVED_BG.height}
                  />
                </div>
                <FadeInOnView>
                  <div className="max-w-4xl w-full flex flex-col gap-6 items-start px-4">
                    <h2
                      className={`${FONTS.microgrammaBold.className} text-2xl sm:text-3xl lg:text-4xl leading-tight`}
                    >
                      THE WORLD IS BECOMING SPATIAL. Screens are becoming environments. Products are becoming experiences. Buildings are becoming intelligent. Cities are becoming interactive. And businesses are moving beyond the flat digital world.
                    </h2>
                    <Link href="/about">
                      <Button
                        className="uppercase text-xs cursor-pointer"
                        variant={"outline"}
                        size={"lg"}
                      >
                        Know More About Obrive
                      </Button>
                    </Link>
                  </div>
                </FadeInOnView>

                <div className="my-10">
                  <FadeInOnView>
                    <ObriveVideo />
                  </FadeInOnView>
                  <FadeInOnView>
                    <div
                      className="mt-6 max-w-3xl w-full text-sm px-4 sm:px-14"
                      id="mission"
                    >
                      <p>
                        Obrive brings Augmented Reality, Virtual Reality, Mixed Reality, 3D, Artificial Intelligence and Spatial Computing together to help businesses create experiences that people can see, explore, understand and interact with.
                      </p>
                    </div>
                  </FadeInOnView>
                </div>
              </div>
            </FadeInOnView>
          </FullWidthSection>

          {/* services */}
          <ImmersiveExperience />

          {/* effortless control */}
          <EffortlessControl />

          {/* goodbye card */}
          <FadeInOnView>
            <GoodByeCard />
          </FadeInOnView>

          {/* video vard obrive */}
          <VideoCardObrive />

          {/* use cases  */}
          <FullWidthSection>
            <FadeInOnView>
              <div className="my-16 flex flex-col justify-between w-full gap-16 px-4">
                <FadeInOnView>
                  <div className="flex flex-col items-center gap-14">
                    <div className="flex flex-col items-center gap-2">
                      <RoundedBallIcon />
                      <span className="uppercase text-xs font-medium">
                        USE CASES
                      </span>
                    </div>
                    <div className="w-full flex justify-center">
                      <h2
                        className={`${FONTS.microgrammaBold.className} text-center w-full max-w-none text-3xl sm:text-4xl lg:text-5xl px-2 sm:px-4`}
                      >
                        WHAT CAN YOU BUILD WHEN <br className="hidden lg:block" /> THE WORLD BECOMES YOUR INTERFACE?
                      </h2>
                    </div>
                  </div>
                </FadeInOnView>
                <div className="relative flex flex-col px-4 sm:px-8 lg:px-18 gap-6 lg:gap-10 min-h-[400px]">
                  {/* curved primary bg image */}
                  <div className="hidden lg:block absolute inset-y-0 left-30 w-[800px] -z-10 pointer-events-none">
                    <Image
                      src={BACKGROUND_IMAGE.PRIMARY_CURVED_BG}
                      alt={BACKGROUND_IMAGE_META.PRIMARY_CURVED_BG.alt}
                      fill
                      className="object-contain"
                      sizes="800px"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>

                  {/* Cards column aligned to the end (right). Add left padding to avoid overlap with the absolute image */}
                  <div id="use-cases">
                    <StaggerTiltBottomLeftOnScroll className="flex relative flex-col gap-6 sm:gap-8 lg:gap-12 w-full mt-10 items-end">
                      {HOME_CARD.map((card) => (
                        <UsecaseCard
                          key={card.title}
                          description={card.description}
                          title={card.title}
                          icon={card.icon}
                          use={card.use}
                          url={card.url}
                        />
                      ))}
                    </StaggerTiltBottomLeftOnScroll>
                  </div>
                </div>
              </div>
            </FadeInOnView>
          </FullWidthSection>

          {/* immersive tech section */}
          <FullWidthSection>
            <FadeInOnView>
              <div className="my-16 flex flex-col justify-between w-full gap-16 px-4">
                <FadeInOnView>
                  <div className="text-center flex flex-col items-center gap-4">
                    <h2
                      className={`${FONTS.microgrammaBold.className} w-full leading-tight sm:leading-14 px-4 sm:px-10 text-primary text-3xl sm:text-4xl lg:text-5xl`}
                    >
                      THE FUTURE IS ALREADY BEING BUILT.
                    </h2>
                    <p className="text-md w-full max-w-4xl lg:max-w-5xl px-4 sm:px-10 text-center">
                      Ideas, technologies and perspectives shaping the spatial era. Explore the technologies transforming industries—and the ideas that will define what comes next.
                    </p>
                  </div>
                </FadeInOnView>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {HOME_CARD_BLOG.map((blog) => (
                    <BlogCard
                      key={blog.title}
                      date={blog.date}
                      title={blog.title}
                      imageSrc={blog.imageSrc}
                      imgWidth={blog.imgWidth}
                      imgHeight={blog.imgHeight}
                      imgAlt={blog.imgAlt}
                      description={blog.description}
                      slug={blog.slug}
                    />
                  ))}
                </div>

                <div className="w-full flex justify-center mt-5 px-4">
                  <Link href="/resources">
                    <Button
                      size={"lg"}
                      variant={"outline"}
                      className="uppercase rounded-full bg-white! hover:bg-[#074139]! transition-all duration-300 hover:text-white text-xs w-full sm:w-auto cursor-pointer"
                    >
                      Visit Library
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeInOnView>
          </FullWidthSection>
        </div>
      </SmoothScrollProvider>
    </>
  );
}
