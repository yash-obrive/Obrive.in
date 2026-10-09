import FONTS from "@/assets/fonts";
import Link from "@/components/shared/LocalizedLink";
import type { CAREER_CARD_TYPE } from "@/constants/pages/career/career-card";
import Translate from "@/components/shared/Translate";

const CareerCard = ({ title, date, slug }: CAREER_CARD_TYPE) => {
  return (
    <Link href={`/career/${slug}`}>
      <div className="w-full max-w-[400px] h-[350px] max-md:h-[280px] bg-white rounded-xl p-6 max-md:p-4 flex flex-col justify-between">
        <div>
          <h1
            className={`${FONTS.microgrammaBold.className} text-primary text-2xl max-md:text-xl`}
          >
            {title}
          </h1>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <h2
              className={`${FONTS.microgrammaBold.className} text-primary text-lg max-md:text-base`}
            >
               <Translate text="Obrive.in Bangalore, India" /> </h2>
            <p className="text-sm mt-1 max-md:text-xs"> <Translate text="Posted on" /> {date}</p>
          </div>
          <div>
            <p className="text-sm max-md:text-xs"> <Translate text="Full-time: Remote/On-site" /> </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CareerCard;
