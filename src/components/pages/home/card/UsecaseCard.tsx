import FONTS from "@/assets/fonts";
import AnimatedButton from "@/components/shared/buttons/AnimatedButton";
import { Button } from "@/components/ui/button";
import type { HomeCard } from "@/constants/pages/home/home-card";
import Translate from "@/components/shared/Translate";

export default function UsecaseCard({
  title,
  description,
  icon,
  use,
  url,
}: HomeCard) {
  const Icon = icon;
  return (
    <div className="w-full sm:w-[450px] md:w-[550px] lg:w-[580px] py-6 sm:py-6 px-6 sm:px-10 lg:px-8 min-h-[320px] rounded-2xl bg-gradient cursor-default">
      <div className="flex justify-between items-start gap-3 sm:gap-4 w-full">
        <div className="flex-shrink-0">
          <Icon />
        </div>
        <div className="flex-1 min-w-0 flex justify-end">
          <Button
            className={`${FONTS.microgrammaBold.className} bg-transparent! hover:bg-transparent! text-primary rounded-full h-auto py-2 text-[10px] sm:text-xs text-center max-w-full flex-shrink`}
            size={"lg"}
            variant={"outline"}
          >
            <span className="block whitespace-normal break-words text-wrap max-w-full">
              <Translate text={use} />
            </span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-5 pe-0 sm:pe-6 lg:pe-11">
        <h3
          className={`${FONTS.microgrammaBold.className} text-lg text-primary`}
        >
          <Translate text={title} />
        </h3>
        <p className="text-xs sm:text-sm text-primary/80"><Translate text={description} /></p>
        <AnimatedButton
          asChild
          size={"lg"}
          className="text-xs mt-4 uppercase cursor-pointer w-fit"
          iconSize={14}
          href={url}
          aria-label={`Learn more about ${title}`}
        >
           <Translate text="Learn More" /> </AnimatedButton>
      </div>
    </div>
  );
}
