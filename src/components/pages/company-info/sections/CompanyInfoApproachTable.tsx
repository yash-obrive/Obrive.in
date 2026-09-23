import type React from "react";
import FONTS from "@/assets/fonts";

interface ApproachPhase {
  phase: string;
  action: string;
}

interface CompanyInfoApproachTableProps {
  title?: string;
  subtitle?: string;
  description?: string | React.ReactNode;
  header1?: string;
  header2?: string;
  footerContent?: string;
  phases?: ApproachPhase[];
  children?: React.ReactNode;
}

export function CompanyInfoApproachPhaseItem({
  phase,
  action,
  children,
  header1 = "Phase",
  header2 = "Action",
}: {
  phase: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
  header1?: string;
  header2?: string;
}) {
  const content = children || action;
  return (
    <>
      <div className="hidden md:grid grid-cols-[26%_62%] text-primary/80 odd:bg-gray-50 border-t border-gray-200">
        <div className="p-3 border-r border-gray-200">
          <div className="text-sm pr-8">{phase}</div>
        </div>
        <div className="p-3 pr-8 bg-white">
          <div className="text-sm leading-snug">{content}</div>
        </div>
      </div>
      <div className="md:hidden bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <div
          className={`px-4 py-3 border-b border-gray-200 text-primary ${FONTS.microgrammaBold.className}`}
        >
          {header1}: {phase}
        </div>
        <div className="px-4 py-3">
          <div
            className={`text-xs uppercase tracking-wide text-gray-500 ${FONTS.microgrammaBold.className}`}
          >
            {header2}
          </div>
          <div className="mt-2 text-sm leading-snug text-gray-700">
            {content}
          </div>
        </div>
      </div>
    </>
  );
}

export function CompanyInfoApproachTableTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2
      className={`${FONTS.microgrammaBold.className} text-primary text-3xl mb-2`}
    >
      {children}
    </h2>
  );
}

export function CompanyInfoApproachTableDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="-mt-3 text-sm mb-8">{children}</p>;
}

export default function CompanyInfoApproachTable({
  title = "Obrive's Approach:",
  subtitle,
  description,
  header1 = "Phase",
  header2 = "Action",
  footerContent,
  phases,
  children,
}: CompanyInfoApproachTableProps) {
  if (children) {
    return (
      <section>
        {typeof title === "string" && title && (
          <h2
            className={`${FONTS.microgrammaBold.className} text-primary text-3xl mb-2`}
          >
            {title}
          </h2>
        )}
        {subtitle && (
          <h3
            className={`${FONTS.microgrammaBold.className} text-xl mb-6 text-gray-700`}
          >
            {subtitle}
          </h3>
        )}
        {typeof description === "string" && description && (
          <p className="-mt-3 text-sm mb-8">{description}</p>
        )}

        <div className="md:rounded-lg md:border md:border-gray-300 md:overflow-hidden">
          <div className="hidden md:grid text-primary grid-cols-[26%_62%] bg-gray-100">
            <div
              className={`${FONTS.microgrammaBold.className} p-3 pr-4 text-lg font-semibold`}
            >
              {header1}
            </div>
            <div
              className={`${FONTS.microgrammaBold.className} p-3 text-lg font-semibold`}
            >
              {header2}
            </div>
          </div>
          <div className="flex flex-col space-y-4 md:space-y-0">{children}</div>
        </div>

        {footerContent && (
          <div className="mt-3 text-sm px-2">
            <p>{footerContent}</p>
          </div>
        )}
      </section>
    );
  }

  return (
    <section>
      <h2
        className={`${FONTS.microgrammaBold.className} text-primary text-3xl mb-2`}
      >
        {title}
      </h2>
      <h3
        className={`${FONTS.microgrammaBold.className} text-xl mb-6 text-gray-700`}
      >
        {subtitle}
      </h3>
      <p className="-mt-3 text-sm mb-8">{description}</p>

      <div className="rounded-lg border border-gray-300 overflow-hidden hidden md:block">
        {/* Table Header */}
        <div className="grid text-primary grid-cols-[26%_62%] bg-gray-100">
          <div
            className={`${FONTS.microgrammaBold.className} p-3 pr-4  text-lg font-semibold`}
          >
            {header1}
          </div>
          <div
            className={`${FONTS.microgrammaBold.className} p-3 text-lg font-semibold`}
          >
            {header2}
          </div>
        </div>

        {/* Table Rows */}
        {phases?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[26%_62%] text-primary/80 odd:bg-gray-50 border-t border-gray-200"
          >
            <div className="p-3 border-r border-gray-200">
              <div className={`text-sm pr-8`}>{item.phase}</div>
            </div>
            <div className="p-3 pr-8 bg-white">
              <div className="text-sm leading-snug">{item.action}</div>
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
              className={`px-4 py-3 border-b border-gray-200 text-primary ${FONTS.microgrammaBold.className}`}
            >
              {header1}: {item.phase}
            </div>
            <div className="px-4 py-3">
              <div
                className={`text-xs uppercase tracking-wide text-gray-500 ${FONTS.microgrammaBold.className}`}
              >
                {header2}
              </div>
              <div className="mt-2 text-sm leading-snug text-gray-700">
                {item.action}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-sm px-2">
        <p>{footerContent}</p>
      </div>
    </section>
  );
}
