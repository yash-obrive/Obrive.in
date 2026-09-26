import FONTS from "@/assets/fonts";
import { IMAGES_META } from "@/assets/images";
import HoverAccordion from "../accordion/HoverAccordion";
import AnimatedButton from "../buttons/AnimatedButton";
import ImmersiveIcon from "../icons/ImmersiveIcon";
import RoundedBallIcon from "../icons/RoundedBallIcon";
import FullWidthSection from "../layout/FullWidthSection";
import { FadeInOnView } from "../motion/GsapMotion";
import Translate from "@/components/shared/Translate";

const ImmersiveExperience = () => {
  return (
    <FullWidthSection>
      <FadeInOnView>
        <div className="my-10 flex flex-col justify-between w-full gap-16 px-4">
          <FadeInOnView>
            <div className="flex flex-col items-center gap-14">
              <div className="flex flex-col items-center gap-2">
                <RoundedBallIcon />
                <span className="uppercase text-xs font-medium"> <Translate text="What Can Obrive Help In" /> </span>
              </div>
              <div className="text-center w-full">
                <h2
                  className={`${FONTS.microgrammaBold.className} text-3xl sm:text-4xl text-center lg:text-[40px]`}
                >
                   <Translate text="BUILD EXPERIENCES THAT LIVE BEYOND" /> <br />  <Translate text="THE SCREEN." /> </h2>
              </div>
            </div>
          </FadeInOnView>
          <div className="flex flex-col lg:flex-row gap-10 justify-between items-start lg:items-start w-full">
            <FadeInOnView>
              <div className="w-full max-w-lg">
                <div className="flex flex-col gap-5">
                  <ImmersiveIcon />
                  <h4 className="text-lg sm:text-xl leading-8">
                     <Translate text="One ecosystem. Infinite possibilities. Obrive brings immersive technology, 3D environments and spatial intelligence together to help organizations design, deploy and scale next-generation digital experiences." /> </h4>
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
                        id: "ie-design",
                        wrapperClassName:
                          "border-y border-primary/40 px-6 py-6",
                        heading: (
                          <h3
                            className={`${FONTS.microgrammaBold.className} text-md`}
                          >
                             <Translate text="CREATE" /> </h3>
                        ),
                        content: (
                          <p className="text-xs max-w-md leading-6">
                             <Translate text="Design AR, VR, MR and 3D experiences around real business objectives—from product visualization and virtual environments to interactive customer experiences and immersive training." /> <br /><br />
                            <strong> <Translate text="Imagine it. Design it. Experience it." /> </strong>
                          </p>
                        ),
                      },
                      {
                        id: "ie-rendering",
                        wrapperClassName:
                          "border-b border-primary/40 px-6 py-6",
                        heading: (
                          <h3
                            className={`${FONTS.microgrammaBold.className} text-md`}
                          >
                             <Translate text="CONNECT" /> </h3>
                        ),
                        content: (
                          <p className="text-xs max-w-md leading-6">
                             <Translate text="We integrate the technologies behind the experience so your data, environments, products and people can work together seamlessly." /> <br /><br />
                            <strong> <Translate text="One ecosystem. Connected intelligence." /> </strong>
                          </p>
                        ),
                      },
                      {
                        id: "ie-collaboration",
                        wrapperClassName:
                          "border-b border-primary/40 px-6 py-6",
                        heading: (
                          <h3
                            className={`${FONTS.microgrammaBold.className} text-md`}
                          >
                             <Translate text="COLLABORATE" /> </h3>
                        ),
                        content: (
                          <p className="text-xs max-w-md leading-6">
                             <Translate text="Explore 3D models, review spaces, simulate experiences and make decisions together—before anything is manufactured, built or deployed." /> <br /><br />
                            <strong> <Translate text="See it. Share it. Shape it together." /> </strong>
                          </p>
                        ),
                      },
                      {
                        id: "ie-portal",
                        wrapperClassName:
                          "border-b border-primary/40 px-6 py-6",
                        heading: (
                          <h3
                            className={`${FONTS.microgrammaBold.className} text-md`}
                          >
                             <Translate text="SCALE" /> </h3>
                        ),
                        content: (
                          <p className="text-xs max-w-md leading-6">
                             <Translate text="From one environment to an entire enterprise, build once, learn continuously and scale without limits." /> <br /><br />
                            <strong> <Translate text="Start small. Think global. Build for what comes next." /> </strong>
                          </p>
                        ),
                      },
                    ]}
                  />
                  <div className="mt-4">
                    <AnimatedButton
                      asChild
                      size={"lg"}
                      className="uppercase text-[10px] cursor-pointer"
                      href="/services"
                      aria-label="Learn more about Immersive Experience services and AR/VR solutions"
                    >
                       <Translate text="EXPLORE OUR CAPABILITIES" /> </AnimatedButton>
                  </div>
                </div>
              </div>
            </FadeInOnView>

            <FadeInOnView>
              <div className="w-full lg:max-w-[620px] xl:max-w-[620px] xl:h-[820px] self-start overflow-hidden rounded-3xl">
                <video
                  className="w-full h-full object-cover"
                  src="/videos/immersive-experience.mp4"
                  preload="metadata"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <span className="sr-only">
                  {IMAGES_META.SERVICE_PAGE_HOME.alt}
                </span>
              </div>
            </FadeInOnView>
          </div>
        </div>
      </FadeInOnView>
    </FullWidthSection>
  );
};

export default ImmersiveExperience;
