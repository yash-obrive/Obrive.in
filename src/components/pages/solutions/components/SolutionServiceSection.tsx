import FONTS from "@/assets/fonts";

import type { ServiceSubSection } from "@/types/solutions";

interface SolutionServiceSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  label?: string;
  items?: readonly string[];
  subSections?: readonly ServiceSubSection[];
  footer?: string;
}

const SolutionServiceSection = ({
  id,
  title,
  subtitle,
  description,
  label,
  items,
  subSections,
  footer,
}: SolutionServiceSectionProps) => {
  return (
    <div id={id} className="flex flex-col gap-8 md:gap-12 scroll-mt-24">
      {/* Section Title */}
      <h2
        className={`${FONTS.microgrammaBold.className} text-primary text-[32px] max-xl:text-3xl max-lg:text-2xl max-md:text-xl`}
      >
        {title}
      </h2>

      <div className="flex flex-col gap-6 md:gap-8 pl-4 md:pl-6 lg:pl-10">
        {/* Subtitle */}
        {subtitle && (
          <p className="text-zinc-600 text-base max-md:text-sm max-w-[680px]">
            {subtitle}
          </p>
        )}

        {/* Description */}
        <p className="text-sm leading-7 tracking-[0.3px] text-zinc-600 max-w-[680px]">
          {description}
        </p>

        {/* Tag Label */}
        {label && <p className={`${FONTS.microgrammaBold.className} text-primary text-xl max-md:text-lg mt-4 md:mt-8`}>{label}</p>}

        {/* Tag container — flex wrap for variable sizes and preventing overflow */}
        {items && items.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mt-2">
            {items.map((item) => (
              <div
                key={item}
                className="flex items-center justify-center gap-2 px-3 py-1.5 border border-zinc-300 rounded-full bg-transparent hover:bg-zinc-50 transition-colors max-w-full"
              >
                <span className="text-[11px] sm:text-xs text-zinc-600 leading-snug text-center break-words">
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Nested Sub-Sections */}
        {subSections && subSections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {subSections.map((sub, idx) => (
              <div
                key={idx}
                className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
              >
                {sub.title && (
                  <h3 className={`${FONTS.microgrammaBold.className} text-primary text-lg`}>
                    {sub.title}
                  </h3>
                )}
                {sub.description && (
                  <p className="text-sm leading-6 tracking-[0.3px] text-zinc-600">
                    {sub.description}
                  </p>
                )}
                {sub.items && sub.items.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {sub.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full text-[11px] sm:text-xs text-zinc-600 leading-snug break-words"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer paragraph */}
        {footer && (
          <p className="text-xs leading-6 text-zinc-500 max-w-[660px] mt-6 md:mt-10">
            {footer}
          </p>
        )}
      </div>
    </div>
  );
};

export default SolutionServiceSection;
