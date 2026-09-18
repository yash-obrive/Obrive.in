import FONTS from "@/assets/fonts";
import { WorkflowStep } from "@/types/solutions";

interface SolutionProcessStepsProps {
  steps: WorkflowStep[];
}

const SolutionProcessSteps = ({ steps }: SolutionProcessStepsProps) => {
  if (!steps || steps.length < 4) return null;

  return (
    <div className="bg-primary w-full py-16 max-sm:py-10">
      {/* We use standard container to give left/right padding so the first line doesn't hug the screen edge */}
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1" style={{ minHeight: "380px" }}>

          {/* Col 1 — Discover & Strategize — dot near top */}
          <div className="relative border-l border-[#F4F9FD]/15">
            {/* Soft bloom glow dot perfectly centered ON the left border line */}
            <div
              className="absolute z-10 left-0"
              style={{ top: "40px" }}
            >
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
            <div className="pl-8 pr-4 max-lg:pr-6 max-sm:pr-5" style={{ paddingTop: "38px", paddingBottom: "40px" }}>
              <h3 className={`${FONTS.microgrammaBold.className} text-[#F4F9FD] text-[15px] leading-snug mb-3`}>
                {steps[0].title}
              </h3>
              <p className="text-[13px] leading-6 text-[#F4F9FD]/60">
                {steps[0].description}
              </p>
            </div>
          </div>

          {/* Col 2 — Design & Experience — dot lower */}
          <div className="relative border-l border-[#F4F9FD]/15">
            {/* Soft bloom glow dot perfectly centered ON the left border line */}
            <div
              className="absolute z-10 left-0"
              style={{ top: "180px" }}
            >
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
            <div className="pl-8 pr-4 max-lg:pr-6 max-sm:pr-5" style={{ paddingTop: "178px", paddingBottom: "40px" }}>
              <h3 className={`${FONTS.microgrammaBold.className} text-[#F4F9FD] text-[15px] leading-snug mb-3`}>
                {steps[1].title}
              </h3>
              <p className="text-[13px] leading-6 text-[#F4F9FD]/60">
                {steps[1].description}
              </p>
            </div>
          </div>

          {/* Col 3 — Build & Integrate — dot near top */}
          <div className="relative border-l border-[#F4F9FD]/15">
            {/* Soft bloom glow dot perfectly centered ON the left border line */}
            <div
              className="absolute z-10 left-0"
              style={{ top: "40px" }}
            >
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
            <div className="pl-8 pr-4 max-lg:pr-6 max-sm:pr-5" style={{ paddingTop: "38px", paddingBottom: "40px" }}>
              <h3 className={`${FONTS.microgrammaBold.className} text-[#F4F9FD] text-[15px] leading-snug mb-3`}>
                {steps[2].title}
              </h3>
              <p className="text-[13px] leading-6 text-[#F4F9FD]/60">
                {steps[2].description}
              </p>
            </div>
          </div>

          {/* Col 4 — Launch & Scale — dot lower */}
          <div className="relative border-l border-[#F4F9FD]/15">
            {/* Soft bloom glow dot perfectly centered ON the left border line */}
            <div
              className="absolute z-10 left-0"
              style={{ top: "180px" }}
            >
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
            <div className="pl-8 pr-4 max-lg:pr-6 max-sm:pr-5" style={{ paddingTop: "178px", paddingBottom: "40px" }}>
              <h3 className={`${FONTS.microgrammaBold.className} text-[#F4F9FD] text-[15px] leading-snug mb-3`}>
                {steps[3].title}
              </h3>
              <p className="text-[13px] leading-6 text-[#F4F9FD]/60">
                {steps[3].description}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SolutionProcessSteps;

