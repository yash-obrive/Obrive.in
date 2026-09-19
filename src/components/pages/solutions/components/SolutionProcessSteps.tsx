import FONTS from "@/assets/fonts";
import type { WorkflowStep } from "@/types/solutions";

interface SolutionProcessStepsProps {
  steps: WorkflowStep[];
}

const SolutionProcessSteps = ({ steps }: SolutionProcessStepsProps) => {
  if (!steps || steps.length < 4) return null;

  return (
    <div id="our-process" className="bg-primary w-full py-16 lg:py-20">
      {/* We use standard container to give left/right padding so the first line doesn't hug the screen edge */}
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;

            // Responsive staggering for vertical whitespace - compact offsets
            const desktopPt = isEven ? "lg:pt-12 lg:mt-0" : "lg:pt-40 lg:mt-0";
            const tabletPt = isEven ? "sm:pt-10 sm:mt-0" : "sm:pt-28 sm:mt-0";
            const mobilePt = "pt-10 mt-0";

            const desktopTop = isEven ? "lg:top-12" : "lg:top-40";
            const tabletTop = isEven ? "sm:top-10" : "sm:top-28";
            const mobileTop = "top-10";

            return (
              <div key={index} className="relative border-l border-[#F4F9FD]/15 flex flex-col h-full">
                <div className={`absolute z-10 left-[-1px] -translate-x-1/2 -translate-y-1/2 ${mobileTop} ${tabletTop} ${desktopTop}`}>
                  <div className="relative">
                    {/* Diffuse outer glow (large) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] pointer-events-none"
                         style={{ background: 'radial-gradient(circle, rgba(213,243,235,0.2) 0%, rgba(213,243,235,0.08) 35%, rgba(213,243,235,0) 70%)' }} />
                    {/* Soft translucent halo (medium) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] pointer-events-none"
                         style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0) 70%)' }} />
                    {/* Very small bright white center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[4px] h-[4px] bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.9)] pointer-events-none" />
                  </div>
                </div>
                {/* Content starts at dot level */}
                <div
                  className={`pl-10 pr-6 md:pl-12 md:pr-8 lg:pl-16 lg:pr-10 pb-12 lg:pb-16 flex-1 ${mobilePt} ${tabletPt} ${desktopPt}`}
                >
                  <h3
                    className={`${FONTS.microgrammaBold.className} text-[#F4F9FD] text-[15px] leading-snug mb-5`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-6 text-[#F4F9FD]/60">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SolutionProcessSteps;
