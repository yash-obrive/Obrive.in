import Image from "next/image";
import Link from "next/link";
import FONTS from "@/assets/fonts";
import { CaseStudy } from "@/lib/case-studies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

const CaseStudyCard = ({ caseStudy }: CaseStudyCardProps) => {
  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className="group block h-full"
      aria-label={`Read case study: ${caseStudy.title}`}
    >
      <div className="group bg-card rounded-2xl p-6 max-w-sm transition-colors duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg group-hover:bg-accent h-full flex flex-col mx-auto w-full">
        {/* image */}
        <div className="relative rounded-xl overflow-hidden mb-6 flex-shrink-0">
          <Image
            src={`/images/case-studies/${caseStudy.image}`}
            width={350}
            height={200}
            alt={caseStudy.title}
            className="object-cover w-full aspect-video block transition-transform duration-300 group-hover:scale-105 bg-gray-100"
          />

          {/* overlay that appears on hover / focus */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm opacity-0 translate-y-2 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-all duration-300 pointer-events-none">
            <span className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-black/40">
              Read Case Study
            </span>
          </div>
        </div>

        <div className="flex text-xs items-center justify-between px-3 mb-4 text-muted-foreground flex-shrink-0">
          <span className="uppercase tracking-wide line-clamp-1 mr-2 font-medium">{caseStudy.service}</span>
          <span className="flex-shrink-0 text-accent-foreground font-medium text-[10px]">{caseStudy.client_raw?.includes("Confidential") ? "Enterprise Client" : caseStudy.client}</span>
        </div>

        <div className="space-y-3 flex-grow">
          <h3
            className={`${FONTS.microgrammaBold.className} text-lg font-bold text-foreground leading-tight transition-colors duration-200 group-hover:text-accent-foreground line-clamp-3`}
          >
            {caseStudy.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-accent-foreground/90 line-clamp-3">
            {caseStudy.outcome_snapshot || caseStudy.overview}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;
