import Link from "next/link";
import React from "react";
import FONTS from "@/assets/fonts";
import { StyledText } from "@/components/shared/StyledText";
import { ButtonLink } from "@/components/ui/ButtonLink";
import ResourceImpactMetricsTable from "./ResourceImpactMetricsTable";
import ResourceChallengeSection from "./sections/ResourceChallengeSection";
import ResourceCompanyOverviewSection from "./sections/ResourceCompanyOverviewSection";
import ResourceObrivesApproachTable from "./sections/ResourceObrivesApproachTable";
import ResourceOutcomeSnapshotSection from "./sections/ResourceOutcomeSnapshotSection";
import ResourceStrategicApproachSection from "./sections/ResourceStrategicApproachSection";
import ResourceTheImpactTable from "./sections/ResourceTheImpactTable";
import ResourceWhyItWorkedSection from "./sections/ResourceWhyItWorkedSection";

export {
  ResourceChallengeSection,
  ResourceStrategicApproachSection,
  ResourceCompanyOverviewSection,
  ResourceWhyItWorkedSection,
  ResourceOutcomeSnapshotSection,
  ResourceImpactMetricsTable,
  ResourceObrivesApproachTable,
  ResourceTheImpactTable,
};

// Create a function that returns MDX components with access to metadata
export const createResourceMDXComponents = (metadata: any) => ({
  // Basic HTML elements with clean styling
  h1: (props: any) => (
    <h1
      className={`${FONTS.microgrammaBold.className} text-4xl mb-6 mt-8`}
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className={`${FONTS.microgrammaBold.className} text-3xl mb-4 mt-6`}
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className={`${FONTS.microgrammaBold.className} text-lg mb-2 mt-4`}
      {...props}
    />
  ),
  p: (props: any) => (
    <p className="text-base leading-relaxed text-gray-700 mb-4" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-700" {...props} />
  ),
  li: (props: any) => (
    <li className="text-base leading-relaxed text-gray-700" {...props} />
  ),
  strong: (props: any) => (
    <strong className={`${FONTS.microgrammaBold.className} text-gray-900`} {...props} />
  ),
  em: (props: any) => <em className="italic" {...props} />,
  blockquote: (props: any) => (
    <div className="pr-30">
      <div className="bg-primary text-accent rounded-xl p-12 my-6">
        <p
          className={`${FONTS.microgrammaBold.className} text-xl leading-relaxed`}
        >
          {props.children}
        </p>
      </div>
    </div>
  ),

  // Custom resource components that can be used in MDX (new names)
  ResourceChallengeSection: (props: any) => (
    <ResourceChallengeSection {...props} />
  ),
  ResourceStrategicApproachSection: (props: any) => (
    <ResourceStrategicApproachSection {...props} />
  ),
  ResourceCompanyOverviewSection: (props: any) => (
    <ResourceCompanyOverviewSection {...props} />
  ),
  ResourceWhyItWorkedSection: (props: any) => (
    <ResourceWhyItWorkedSection {...props} />
  ),
  ResourceOutcomeSnapshotSection: (props: any) => (
    <ResourceOutcomeSnapshotSection {...props} />
  ),

  // Backward compatibility - old component names mapping to new components
  ChallengeSection: (props: any) => <ResourceChallengeSection {...props} />,
  StrategicApproachSection: (props: any) => (
    <ResourceStrategicApproachSection {...props} />
  ),
  CompanyOverviewSection: (props: any) => (
    <ResourceCompanyOverviewSection {...props} />
  ),
  WhyItWorkedSection: (props: any) => <ResourceWhyItWorkedSection {...props} />,
  OutcomeSnapshotSection: (props: any) => (
    <ResourceOutcomeSnapshotSection {...props} />
  ),

  // Impact table that uses metadata
  ResourceImpactMetricsTable: (props: any) => {
    return (
      <ResourceImpactMetricsTable
        metrics={metadata.impactMetrics || []}
        {...props}
      />
    );
  },
  ImpactMetricsTable: (props: any) => {
    return (
      <ResourceImpactMetricsTable
        metrics={metadata.impactMetrics || []}
        {...props}
      />
    );
  },

  ResourceObrivesApproachTable: (props: any) => (
    <ResourceObrivesApproachTable {...props} />
  ),
  ObrivesApproachTable: (props: any) => (
    <ResourceObrivesApproachTable {...props} />
  ),

  // The Impact table component
  TheImpactTable: (props: any) => <ResourceTheImpactTable {...props} />,

  // Custom components
  Link,
  a: (props: any) => {
    const isInternal =
      props.href?.startsWith("/") || props.href?.startsWith("#");
    if (isInternal) {
      return <Link {...props} />;
    }
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
  },
  ButtonLink,
  StyledText,
});

// Default export for backward compatibility
export default {
  h1: (props: any) => (
    <h1
      className={`${FONTS.microgrammaBold.className} text-4xl mb-6 mt-8`}
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className={`${FONTS.microgrammaBold.className} text-3xl mb-4 mt-6`}
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className={`${FONTS.microgrammaBold.className} text-lg mb-2 mt-4`}
      {...props}
    />
  ),
  p: (props: any) => (
    <p className="text-base leading-relaxed text-gray-700 mb-4" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-700" {...props} />
  ),
  li: (props: any) => (
    <li className="text-base leading-relaxed text-gray-700" {...props} />
  ),
  strong: (props: any) => (
    <strong className={`${FONTS.microgrammaBold.className} text-gray-900`} {...props} />
  ),
  em: (props: any) => <em className="italic" {...props} />,
  blockquote: (props: any) => (
    <div className="pr-30">
      <div className="bg-primary text-accent rounded-xl p-12 my-6">
        <p
          className={`${FONTS.microgrammaBold.className} text-xl leading-relaxed`}
        >
          {props.children}
        </p>
      </div>
    </div>
  ),
  Link,
  a: (props: any) => {
    const isInternal =
      props.href?.startsWith("/") || props.href?.startsWith("#");
    if (isInternal) {
      return <Link {...props} />;
    }
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
  },
  // Provide StyledText for default mapping
  StyledText,
};
