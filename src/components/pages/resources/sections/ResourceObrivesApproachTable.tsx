import type React from "react";
import FONTS from "@/assets/fonts";

interface ApproachPhase {
  phase: string;
  action: string;
}

interface ResourceObrivesApproachTableProps {
  title?: string;
  subtitle?: string;
  description?: string | React.ReactNode;
  header1?: string;
  header2?: string;
  footerContent?: string;
  phases?: ApproachPhase[];
  children?: React.ReactNode;
}

export function ApproachPhaseItem({ phase, action, children, header1 = "Phase", header2 = "Action" }: { phase: React.ReactNode, action?: React.ReactNode, children?: React.ReactNode, header1?: string, header2?: string }) {
  const content = children || action;
  return (
    <>
      <div className="hidden md:grid grid-cols-[38%_62%] border-t border-gray-300">
        <div className="p-4 border-r border-gray-300 bg-gray-50">
          <div className={`${FONTS.microgrammaBold.className} text-sm font-semibold`}>
            {phase}
          </div>
        </div>
        <div className="p-4 bg-white">
          <div className="text-sm leading-relaxed">{content}</div>
        </div>
      </div>
      <div className="md:hidden bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <div className={`px-4 py-3 border-b border-gray-300 text-sm text-gray-800 ${FONTS.microgrammaBold.className}`}>
          {header1}: {phase}
        </div>
        <div className="px-4 py-3">
          <div className={`text-xs text-gray-600 leading-relaxed ${FONTS.microgrammaBold.className}`}>
            {header2}
          </div>
          <div className="mt-2 text-sm leading-relaxed text-gray-700">
            {content}
          </div>
        </div>
      </div>
    </>
  );
}

export function ApproachTableTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={`${FONTS.microgrammaBold.className} text-3xl mb-2`}>{children}</h2>;
}

export function ApproachTableDescription({ children }: { children: React.ReactNode }) {
  return <p className="-mt-3 mb-8">{children}</p>;
}

export default function ResourceObrivesApproachTable({
  title = "Obrive's Approach:",
  subtitle = "Structured, Immersive, Scalable",
  description,
  header1 = "Phase",
  header2 = "Action",
  footerContent,
  phases,
  children,
}: ResourceObrivesApproachTableProps) {
  if (children) {
    return (
      <section className="my-8">
        {typeof title === "string" && title && <h2 className={`${FONTS.microgrammaBold.className} text-3xl mb-2`}>{title}</h2>}
        {subtitle && <h3 className={`${FONTS.microgrammaBold.className} text-xl mb-6 text-gray-700`}>{subtitle}</h3>}
        {typeof description === "string" && description && <p className="-mt-3 mb-8">{description}</p>}
        
        <div className="md:border md:border-gray-300 md:rounded-lg md:overflow-hidden">
          <div className="hidden md:grid grid-cols-[38%_62%] bg-gray-100">
            <div className={`${FONTS.microgrammaBold.className} p-4 border-r border-gray-300 text-sm font-semibold`}>
              {header1}
            </div>
            <div className={`${FONTS.microgrammaBold.className} p-4 text-sm font-semibold`}>
              {header2}
            </div>
          </div>
          <div className="flex flex-col space-y-4 md:space-y-0">
            {children}
          </div>
        </div>
        {footerContent && (
          <div className="mt-3 px-6">
            <p>{footerContent}</p>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="my-8">
      <h2 className={`${FONTS.microgrammaBold.className} text-3xl mb-2`}>
        {title}
      </h2>
      <h3
        className={`${FONTS.microgrammaBold.className} text-xl mb-6 text-gray-700`}
      >
        {subtitle}
      </h3>
      <p className="-mt-3 mb-8">{description}</p>

      <div className="border border-gray-300 rounded-lg overflow-hidden hidden md:block">
        {/* Table Header */}
        <div className="grid grid-cols-[38%_62%] bg-gray-100">
          <div
            className={`${FONTS.microgrammaBold.className} p-4 border-r border-gray-300 text-sm font-semibold`}
          >
            {header1}
          </div>
          <div
            className={`${FONTS.microgrammaBold.className} p-4 text-sm font-semibold`}
          >
            {header2}
          </div>
        </div>

        {/* Table Rows */}
        {phases?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[38%_62%] border-t border-gray-300"
          >
            <div className="p-4 border-r border-gray-300 bg-gray-50">
              <div
                className={`${FONTS.microgrammaBold.className} text-sm font-semibold`}
              >
                {item.phase}
              </div>
            </div>
            <div className="p-4 bg-white">
              <div className="text-sm leading-relaxed">{item.action}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="md:hidden space-y-4">
        {phases?.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden"
          >
            <div
              className={`px-4 py-3 border-b border-gray-300 text-sm text-gray-800 ${FONTS.microgrammaBold.className}`}
            >
              {header1}: {item.phase}
            </div>
            <div className="px-4 py-3">
              <div
                className={`text-xs text-gray-600 leading-relaxed ${FONTS.microgrammaBold.className}`}
              >
                {header2}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-gray-700">
                {item.action}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 px-6">
        <p>{footerContent}</p>
      </div>
    </section>
  );
}
