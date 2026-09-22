"use client";

import Image from "next/image";
import Link from "@/components/shared/LocalizedLink";
import FONTS from "@/assets/fonts";
import { IMAGES, IMAGES_META } from "@/assets/images";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { GROUPS, PRIMARY_FOOTER_CARD, SOCIAL_LINKS } from "@/constants/Footer";
import DynamicFooterCard from "./DynamicFooterCard";
import { Button } from "@/components/ui/button";
import FooterContact from "./FooterContact";

export default function Footer() {
  const cell =
    "border border-primary/30 rounded-lg text-xs p-3 text-sm hover:text-white transition-colors duration-500 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-primary before:scale-y-0 before:origin-center hover:before:scale-y-100 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.19,1,0.22,1)] before:-z-10 z-10";

  return (
    <footer aria-label="Site footer" className="py-16">
      <div className="flex w-full flex-col gap-12">
        <DynamicFooterCard />

        {/* Links Grid */}
        <section className="w-full flex flex-col gap-12">
          {/* Logo */}
          <div>
            <Image
              src={IMAGES.MAIN_LOGO}
              alt={IMAGES_META.MAIN_LOGO.alt}
              width={IMAGES_META.MAIN_LOGO.width}
              height={IMAGES_META.MAIN_LOGO.height}
              unoptimized
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
            {GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col">
                <div
                  className={`border border-primary/40 py-2 px-3 font-semibold text-primary rounded-lg ${FONTS.microgrammaBold.className}`}
                >
                  {group.title}
                </div>
                {group.items.map((item) => (
                  <Link key={item.label} href={item.href} className={cell} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </Link>
                ))}
                <div className="border border-primary/30 rounded-lg p-5  text-xs text-primary/80"></div>
                <div className="border border-primary/30 rounded-lg p-5  text-xs text-primary/80"></div>
                <div className="border border-primary/30 rounded-lg p-5  text-xs text-primary/80"></div>
              </div>
            ))}

            {/* Contact column */}
            <FooterContact />
          </div>

          {/* bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary/60 mt-4">
            <div className="flex items-center gap-6">
              <Link href="/legal" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                Legal Notice
              </Link>
              <Link href="/terms-accessibility" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                Terms & Accessibility
              </Link>
              <Link href="/global" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                Global Market
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <p>Copyrights Reserved 2026</p>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
