export interface SidebarLink {
  id: string;
  label: string;
}

export interface ServiceSubSection {
  title: string;
  description: string;
  items?: readonly string[];
}

export interface ServiceSection {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  label?: string;
  items?: readonly string[];
  subSections?: readonly ServiceSubSection[];
  footer?: string;
}

export interface WorkflowStep {
  title: string;
  description: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
}

export interface SolutionIndustriesContent {
  slug: string;
  hero: {
    title: string;
    description: string;
  };
  industries: IndustryItem[];
  extraBlocks?: ServiceSection[];
  footerText: string;
  globalDelivery?: {
    title: string;
    subtitle: string;
    description: string;
    items: string[];
  };
  technologyCapabilities: {
    title: string;
    subtitle: string;
    items: string[];
  };
}
