import caseStudiesData from "@/data/case-studies.json";

export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  client_raw?: string;
  service: string;
  focus: string;
  overview: string;
  challenge: string;
  approach: {
    title: string;
    description: string;
  }[];
  architecture: {
    layer: string;
    delivery: string;
    purpose: string;
  }[];
  deliverables: string[];
  techStack: string[];
  impacts: {
    metric: string;
    label: string;
    description: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
  };
  outcome_snapshot: string;
  image: string;
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudiesData as CaseStudy[];
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return (caseStudiesData as CaseStudy[]).find((cs) => cs.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return (caseStudiesData as CaseStudy[]).map((cs) => cs.slug);
}
