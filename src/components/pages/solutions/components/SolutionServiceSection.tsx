import FONTS from "@/assets/fonts";

interface SolutionServiceSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  label: string;
  items: readonly string[];
  footer: string;
}

const SolutionServiceSection = ({
  id,
  title,
  subtitle,
  description,
  label,
  items,
  footer,
}: SolutionServiceSectionProps) => {
  return (
    <div id={id} className="flex flex-col gap-5 scroll-mt-24">
      {/* Section Title */}
      <h2
        className={`${FONTS.microgrammaBold.className} text-primary text-3xl max-xl:text-2xl max-lg:text-xl max-md:text-lg`}
      >
        {title}
      </h2>

      {/* Subtitle */}
      <p className="text-zinc-800 text-base font-medium max-md:text-sm">
        {subtitle}
      </p>

      {/* Description */}
      <p className="text-sm leading-7 tracking-[0.3px] text-zinc-600 max-w-[680px]">
        {description}
      </p>

      {/* Tag Label */}
      <p className="text-xs text-zinc-500 font-medium mt-1">
        {label}:
      </p>

      {/* Tag container — flex wrap for variable sizes and preventing overflow */}
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-zinc-300 rounded-full bg-transparent hover:bg-zinc-50 transition-colors max-w-full"
          >
            <span className="text-xs text-zinc-700 leading-snug text-center break-words">{item}</span>
          </div>
        ))}
      </div>

      {/* Footer paragraph */}
      <p className="text-xs leading-6 text-zinc-500 max-w-[660px] mt-2">
        {footer}
      </p>

      {/* Divider */}
      <div className="border-b border-zinc-100 mt-6" />
    </div>
  );
};

export default SolutionServiceSection;
