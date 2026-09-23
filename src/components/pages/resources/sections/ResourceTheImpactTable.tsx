import type React from "react";
import FONTS from "@/assets/fonts";

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
  bold?: boolean;
}

export interface TableRow {
  [key: string]: React.ReactNode;
}

// Old interface for backward compatibility
export interface ImpactMetric {
  metric: string;
  beforeObrive: string | React.ReactNode;
  afterObrive: string | React.ReactNode;
}

export interface ResourceTheImpactTableProps {
  title?: string;
  columns?: TableColumn[];
  data?: TableRow[];
  firstColumnBold?: boolean;
  metrics?: ImpactMetric[];
  beforeHeader?: string;
  afterHeader?: string;
  children?: React.ReactNode;
}

export function ImpactTableRow({
  children,
  gridTemplateColumns,
}: {
  children: React.ReactNode;
  gridTemplateColumns?: string;
}) {
  return (
    <>
      <div
        className="hidden md:grid border-t border-gray-300"
        style={{
          gridTemplateColumns:
            gridTemplateColumns || "var(--grid-columns, 1fr)",
        }}
      >
        {children}
      </div>
      <div className="md:hidden bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden mb-4 last:mb-0">
        {children}
      </div>
    </>
  );
}

export function ImpactTableCell({
  header,
  children,
  isFirst = false,
  isLast = false,
  firstColumnBold = false,
  bold = false,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  firstColumnBold?: boolean;
  bold?: boolean;
}) {
  return (
    <>
      <div
        className={`hidden md:block p-4 ${!isLast ? "border-r border-gray-300" : ""} ${isFirst && firstColumnBold ? "bg-gray-50" : "bg-white"}`}
      >
        <div
          className={`text-sm leading-relaxed ${bold ? FONTS.microgrammaBold.className : ""}`}
        >
          {children}
        </div>
      </div>
      <div
        className={`md:hidden px-4 py-3 ${!isLast ? "border-b border-gray-200" : ""}`}
      >
        <div
          className={`text-xs uppercase tracking-wide text-gray-600 ${FONTS.microgrammaBold.className}`}
        >
          {header}
        </div>
        <div
          className={`mt-2 text-sm leading-relaxed text-gray-800 ${isFirst && firstColumnBold ? FONTS.microgrammaBold.className : bold ? FONTS.microgrammaBold.className : ""}`}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export function ImpactTableMetric({
  metric,
  beforeObrive,
  afterObrive,
  beforeHeader = "Before Obrive",
  afterHeader = "After Obrive",
}: ImpactMetric & { beforeHeader?: string; afterHeader?: string }) {
  return (
    <ImpactTableRow gridTemplateColumns="35% 32.5% 32.5%">
      <ImpactTableCell
        header="Metric"
        isFirst={true}
        isLast={false}
        firstColumnBold={true}
      >
        {metric}
      </ImpactTableCell>
      <ImpactTableCell header={beforeHeader} isFirst={false} isLast={false}>
        {beforeObrive}
      </ImpactTableCell>
      <ImpactTableCell header={afterHeader} isFirst={false} isLast={true}>
        {afterObrive}
      </ImpactTableCell>
    </ImpactTableRow>
  );
}

export default function ResourceTheImpactTable({
  title,
  columns,
  data,
  firstColumnBold = true,
  metrics,
  beforeHeader = "Before Obrive",
  afterHeader = "After Obrive",
  children,
}: ResourceTheImpactTableProps) {
  const isLegacyMode = !columns && !data;
  const hasChildren = Boolean(children);

  const effectiveColumns: TableColumn[] = isLegacyMode
    ? [
        { key: "metric", header: "Metric", width: "35%" },
        { key: "beforeObrive", header: beforeHeader, width: "32.5%" },
        { key: "afterObrive", header: afterHeader, width: "32.5%" },
      ]
    : columns || [];

  const effectiveData: TableRow[] = isLegacyMode
    ? (metrics || []).map((item) => ({
        metric: item.metric,
        beforeObrive: item.beforeObrive,
        afterObrive: item.afterObrive,
      }))
    : data || [];

  // calculate grid template columns
  const gridTemplateColumns = effectiveColumns
    .map((col) => col.width || "1fr")
    .join(" ");

  return (
    <section className="my-8">
      {title && (
        <h2 className={`${FONTS.microgrammaBold.className} text-3xl mb-6`}>
          {title}
        </h2>
      )}

      <div
        className="md:border md:border-gray-300 md:rounded-lg md:overflow-hidden"
        style={{ "--grid-columns": gridTemplateColumns } as React.CSSProperties}
      >
        {/* Table Header (Desktop only) */}
        <div
          className="hidden md:grid bg-gray-100"
          style={{ gridTemplateColumns }}
        >
          {effectiveColumns.map((column, colIndex) => (
            <div
              key={column.key}
              className={`p-4 ${
                colIndex < effectiveColumns.length - 1
                  ? "border-r border-gray-300"
                  : ""
              } ${FONTS.microgrammaBold.className} text-sm font-semibold`}
            >
              {column.header}
            </div>
          ))}
        </div>

        {/* Table Rows (Desktop and Mobile) */}
        <div className="flex flex-col md:space-y-0">
          {hasChildren
            ? children
            : effectiveData.map((row, rowIndex) => (
                <ImpactTableRow key={rowIndex}>
                  {effectiveColumns.map((column, colIndex) => (
                    <ImpactTableCell
                      key={column.key}
                      header={column.header}
                      isFirst={colIndex === 0}
                      isLast={colIndex === effectiveColumns.length - 1}
                      firstColumnBold={firstColumnBold}
                      bold={column.bold}
                    >
                      {row[column.key as keyof typeof row]}
                    </ImpactTableCell>
                  ))}
                </ImpactTableRow>
              ))}
        </div>
      </div>
    </section>
  );
}
