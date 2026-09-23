import Image from "next/image";
import FONTS from "@/assets/fonts";
import { OBPARK_IMAGES, OBPARK_IMAGES_META } from "@/assets/images";
import HoverAccordion from "../accordion/HoverAccordion";
import AnimatedButton from "../buttons/AnimatedButton";
import ObIcon from "../icons/ObIcon";
import FullWidthSection from "../layout/FullWidthSection";
import { FadeInOnView } from "../motion/GsapMotion";

const EffortlessControl = () => {
  return (
    <FullWidthSection>
      <FadeInOnView>
        <div className="my-20 flex flex-col justify-between w-full gap-16 px-4">
          <FadeInOnView>
            <div className="text-center">
              <h2
                className={`${FONTS.microgrammaBold.className} text-3xl sm:text-4xl max-sm:text-center lg:text-5xl`}
              >
                THE FUTURE OF MOBILITY IS SPATIAL.
              </h2>
            </div>
          </FadeInOnView>
          <div className="flex flex-col lg:flex-row gap-10 justify-between items-start lg:items-start">
            <FadeInOnView>
              <div className="w-full max-w-3xl self-start rounded-2xl pointer-events-none select-none overflow-hidden">
                <Image
                  src={OBPARK_IMAGES.OBPARK_BUSINESS_3}
                  alt={OBPARK_IMAGES_META.OBPARK_BUSINESS_3.alt}
                  width={OBPARK_IMAGES_META.OBPARK_BUSINESS_3.width}
                  height={OBPARK_IMAGES_META.OBPARK_BUSINESS_3.height}
                  priority={false}
                />
              </div>
            </FadeInOnView>
            <FadeInOnView>
              <div className="w-full max-w-lg">
                <div className="flex flex-col gap-5">
                  <ObIcon />
                  <h4 className="text-lg sm:text-xl leading-8">
                    Meet OBPARK. Parking shouldn't begin when you reach the parking lot. It should begin the moment you start your journey. OBPARK uses AR, spatial navigation and intelligent mobility technology to transform how people find, navigate, reserve and experience parking.
                  </h4>
                  <HoverAccordion
                    className="mt-4"
                    defaultOpen={0}
                    autoAdvance={[
                      {
                        fromIndex: 0,
                        toIndex: 1,
                        durationMs: 4000,
                      },
                      {
                        fromIndex: 1,
                        toIndex: 2,
                        durationMs: 4000,
                      },
                      {
                        fromIndex: 2,
                        toIndex: 3,
                        durationMs: 4000,
                      },
                      {
                        fromIndex: 3,
                        toIndex: 0,
                        durationMs: 4000,
                      },
                    ]}
                    autoAdvanceMode="loop"
                    items={[
                      {
                        id: "ec-realtime",
                        wrapperClassName:
                          "border-y border-primary/40 px-6 py-6",
                        heading: (
                          <h3
                            className={`${FONTS.microgrammaBold.className} text-md`}
                          >
                            FIND.
                          </h3>
                        ),
                        content: (
                          <p className="text-xs max-w-md leading-6">
                            OBPARK turns parking discovery into a smarter, more informed first step of the journey.<br /><br />
                            <strong>Find less. Drive smarter.</strong>
                          </p>
                        ),
                      },
                      {
                        id: "ec-automation",
                        wrapperClassName:
                          "border-b border-primary/40 px-6 py-6",
                        heading: (
                          <h3
                            className={`${FONTS.microgrammaBold.className} text-md`}
                          >
                            NAVIGATE.
                          </h3>
                        ),
                        content: (
                          <p className="text-xs max-w-md leading-6">
                            From entrances and ramps to parking zones and your final destination, OBPARK helps turn unfamiliar spaces into navigable experiences.<br /><br />
                            <strong>From location to destination.</strong>
                          </p>
                        ),
                      },
                      {
                        id: "ec-safety",
                        wrapperClassName:
                          "border-b border-primary/40 px-6 py-6",
                        heading: (
                          <h3
                            className={`${FONTS.microgrammaBold.className} text-md`}
                          >
                            RESERVE.
                          </h3>
                        ),
                        content: (
                          <p className="text-xs max-w-md leading-6">
                            Discover and reserve available parking spaces in advance, helping drivers plan their journey with greater confidence and convenience.<br /><br />
                            <strong>Know your space before you reach it.</strong>
                          </p>
                        ),
                      },
                      {
                        id: "ec-flow",
                        wrapperClassName:
                          "border-b border-primary/40 px-6 py-6",
                        heading: (
                          <h3
                            className={`${FONTS.microgrammaBold.className} text-md`}
                          >
                            EXPERIENCE.
                          </h3>
                        ),
                        content: (
                          <p className="text-xs max-w-md leading-6">
                            From car care and EV charging to mobility services, offers and digital commerce, OBPARK creates a connected ecosystem that extends beyond the parking space.<br /><br />
                            <strong>Park. Discover. Connect. Experience.</strong>
                          </p>
                        ),
                      },
                    ]}
                  />
                  <div className="mt-4">
                    <AnimatedButton
                      size={"lg"}
                      className="uppercase text-[10px] cursor-pointer"
                      href="https://www.obpark.in/"
                      aria-label="Learn more about ObPark AR navigation and parking solutions"
                    >
                      EXPLORE OBPARK
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </FadeInOnView>
          </div>
        </div>
      </FadeInOnView>
    </FullWidthSection>
  );
};

export default EffortlessControl;
