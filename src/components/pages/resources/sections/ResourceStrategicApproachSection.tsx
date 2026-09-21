import FONTS from "@/assets/fonts";

interface StrategicStepType {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
}

interface ResourceStrategicApproachSectionProps {
  title?: string;
  steps?: StrategicStepType[];
  children?: React.ReactNode;
}

export function StrategicStepItem({ title, stepNumber, children }: { title?: React.ReactNode, stepNumber?: number | string, children: React.ReactNode }) {
  return (
    <div>
      <h3 className={`${FONTS.microgrammaBold.className} text-lg mb-2`}>
        {stepNumber ? `${stepNumber}. ` : ""}{title}
      </h3>
      <div className="text-base leading-relaxed text-gray-700">
        {children}
      </div>
    </div>
  );
}

export default function ResourceStrategicApproachSection({
  title = "Strategic Approach",
  steps,
  children,
}: ResourceStrategicApproachSectionProps) {
  return (
    <section className="mb-8">
      <h2 className={`${FONTS.microgrammaBold.className} text-3xl mb-6`}>
        {title}
      </h2>
      <div className="space-y-6">
        {children ? (
          children
        ) : (
          steps?.map((step, index) => (
            <div key={index}>
              <h3 className={`${FONTS.microgrammaBold.className} text-lg mb-2`}>
                {index + 1}. {step.title}
              </h3>
              <p className="text-base leading-relaxed text-gray-700">
                {step.description}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
