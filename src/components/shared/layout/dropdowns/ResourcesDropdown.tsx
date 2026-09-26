import Image from "next/image";
import { ICONS, ICONS_META } from "@/assets/images";
import Link from "@/components/shared/LocalizedLink";
import { Button } from "@/components/ui/button";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import AnimatedNavLabel from "../AnimatedNavLabel";
import Translate from "@/components/shared/Translate";

export function ResourcesDropdown() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        showChevron={false}
        className="text-[10px] hover:bg-transparent! focus:bg-transparent! active:bg-transparent! hover:font-extrabold transition-all duration-200 ease-in-out uppercase cursor-pointer hover:text-primary bg-transparent"
      >
         <Translate text="Resources" /> </NavigationMenuTrigger>
      <NavigationMenuContent className="bg-primary! border-none p-6 w-[600px] md:w-[700px] absolute -left-70 top-full mt-2 z-[60] rounded-md shadow-lg">
        <div className="grid grid-cols-2 gap-6">
          <div className="border-r border-accent/30">
            <div>
              <div className="border-b border-accent/30 pb-4">
                <h3 className="text-white text-xs mb-2 pr-2 uppercase">
                   <Translate text="Obrive Resource Library" /> </h3>
                <p className="text-white/80 text-[9px] mb-4 pr-2 uppercase">
                   <Translate text="A COLLECTION OF BLOGS, INDUSTRY INSIGHTS, AND RESOURCES
                                                    SHAPING THE FUTURE OF IMMERSIVE TECHNOLOGY." /> </p>
                <div className="flex items-center">
                  <Button
                    variant="link"
                    className="text-accent text-[10px] !px-0 h-auto"
                  >
                    <Link href="/resources">
                      <AnimatedNavLabel
                        iconSize={8}
                        gap={8}
                        shiftDirection="right"
                      >
                         <Translate text="READ MORE" /> </AnimatedNavLabel>
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="py-4">
                <div className="w-28 rounded-xs h-38 bg-accent">
                  <div className="flex items-center justify-between p-2">
                    <Image
                      src={ICONS.ROUNDED_BALLS}
                      width={18}
                      height={18}
                      className="w-3 h-6"
                      alt={ICONS_META.ROUNDED_BALLS.alt}
                    />

                    <p className="text-[8px]"> <Translate text="E-Book" /> </p>
                  </div>

                  <div className="flex flex-col items-center w-full justify-center">
                    <div className="text-left pl-1 w-full py-1 text-[8px] border-b border-primary/20">
                       <Translate text="Discover how AR," /> </div>
                    <div className="text-left pl-1 w-full py-1 text-[8px] border-b border-primary/20">
                       <Translate text="VR, MR, and spatial" /> </div>
                    <div className="text-left pl-1 w-full py-1 text-[8px] border-b border-primary/20">
                       <Translate text="redefining industries" /> </div>
                    <div className="text-left pl-1 w-full py-1 text-[8px] border-b border-primary/20">
                       <Translate text="worldwide." /> </div>
                  </div>
                </div>

                <h3 className="text-white text-xs mt-4 mb-3 pr-2 uppercase">
                   <Translate text="Obrive Resource Library" /> </h3>
                <p className="text-white/80 text-[9px] mb-2 pr-2 uppercase">
                   <Translate text="DOWNLOAD YOUR FREE E-BOOK AND DISCOVER HOW IMMERSIVE
                                                    TECHNOLOGIES CAN TRANSFORM YOUR BUSINESS OPERATIONS." /> </p>
                <Button
                  variant="link"
                  className="text-accent p-0 text-[9px] h-auto"
                >
                  <AnimatedNavLabel iconSize={8} gap={8} shiftDirection="right">
                     <Translate text="DOWNLOAD" /> </AnimatedNavLabel>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white text-xs mb-2"> <Translate text="SOLUTIONS" /> </h3>
            <p className="text-white/80 text-[10px] mb-4 uppercase">
               <Translate text="Expert Insights, Guides, and Tools to Power Immersive Innovation" /> </p>

            <div className="">
              <div className="flex items-center gap-3 py-4 px-2 border-y border-white/20">
                <Button
                  variant="link"
                  className="!text-white text-sm !p-0 h-auto"
                >
                  <AnimatedNavLabel iconSize={8} gap={8} shiftDirection="right">
                    <Link href="/support/help-center"> <Translate text="OB Help Center" /> </Link>
                  </AnimatedNavLabel>
                </Button>
              </div>
              <div className="flex items-center gap-3 py-4 px-2 border-b border-white/20">
                <Button
                  variant="link"
                  className="!text-white text-sm !p-0 h-auto"
                >
                  <AnimatedNavLabel iconSize={8} gap={8} shiftDirection="right">
                    <Link href="/faq/ob-product-faq"> <Translate text="OB Products FAQ" /> </Link>
                  </AnimatedNavLabel>
                </Button>
              </div>
              <div className="flex items-center gap-3 py-4 px-2 border-b border-white/20">
                <Button
                  variant="link"
                  className="!text-white text-sm !p-0 h-auto"
                >
                  <AnimatedNavLabel iconSize={8} gap={8} shiftDirection="right">
                    <Link href="/faq/ob-services-faq"> <Translate text="OB Services FAQ" /> </Link>
                  </AnimatedNavLabel>
                </Button>
              </div>
              <div className="flex items-center gap-3 py-4 px-2 border-b border-white/20">
                <Button
                  variant="link"
                  className="!text-white text-sm !p-0 h-auto"
                >
                  <AnimatedNavLabel iconSize={8} gap={8} shiftDirection="right">
                    <Link href="/faq/obpark-faq"> <Translate text="Obpark FAQ" /> </Link>
                  </AnimatedNavLabel>
                </Button>
              </div>
              <div className="flex items-center gap-3 py-4 px-2 border-b border-white/20">
                <Button
                  variant="link"
                  className="!text-white text-sm !p-0 h-auto"
                >
                  <AnimatedNavLabel iconSize={8} gap={8} shiftDirection="right">
                    <Link href="/support/change-log"> <Translate text="Change Log" /> </Link>
                  </AnimatedNavLabel>
                </Button>
              </div>
              <div className="flex items-center gap-3 py-4 px-2 border-b border-white/20">
                <Button
                  variant="link"
                  className="!text-white text-sm !p-0 h-auto"
                >
                  <AnimatedNavLabel iconSize={8} gap={8} shiftDirection="right">
                    <Link href="/legal"> <Translate text="Legal" /> </Link>
                  </AnimatedNavLabel>
                </Button>
              </div>
              <div className="flex items-center gap-3 py-4 px-2 border-b border-white/20">
                <Button
                  variant="link"
                  className="!text-white text-sm !p-0 h-auto"
                >
                  <AnimatedNavLabel iconSize={8} gap={8} shiftDirection="right">
                    <Link href="/certifications"> <Translate text="Certifications" /> </Link>
                  </AnimatedNavLabel>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
