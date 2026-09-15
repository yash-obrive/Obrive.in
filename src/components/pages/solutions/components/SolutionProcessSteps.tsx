import FONTS from "@/assets/fonts";
import type { WorkflowStep } from "@/types/solutions";

interface SolutionProcessStepsProps {
  steps: WorkflowStep[];
}

const SolutionProcessSteps = ({ steps }: SolutionProcessStepsProps) => {
  if (!steps || steps.length < 4) return null;

  return (
    <div id="our-process" className="bg-primary w-full py-16 max-sm:py-10">
      {/* We use standard container to give left/right padding so the first line doesn't hug the screen edge */}
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
        <div
          className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1"
          style={{ minHeight: "380px" }}
        >
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const topOffset = isEven ? "40px" : "180px";
            const paddingTop = isEven ? "38px" : "178px";

            return (
              <div key={index} className="relative border-l border-[#F4F9FD]/15">
                {/* Soft bloom glow dot perfectly centered ON the left border line */}
                <div className="absolute z-10 left-0" style={{ top: topOffset }}>
                  <div className="relative flex items-center justify-center">
                    {/* Wide soft outer glow */}
                    <div className="absolute w-[60px] h-[60px] bg-[#d5f3eb]/10 rounded-full blur-xl pointer-events-none" />
                    {/* Medium intense glow */}
                    <div className="absolute w-[30px] h-[30px] bg-white/30 rounded-full blur-md pointer-events-none" />
                    {/* Bright core */}
                    <div className="absolute w-[6px] h-[6px] bg-white rounded-full pointer-events-none shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]" />
                  </div>
                </div>
                {/* Content starts at dot level */}
                <div
                  className="pl-8 pr-4 max-lg:pr-6 max-sm:pr-5"
                  style={{ paddingTop: paddingTop, paddingBottom: "40px" }}
                >
                  <h3
                    className={`${FONTS.microgrammaBold.className} text-[#F4F9FD] text-[15px] leading-snug mb-3`}
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
