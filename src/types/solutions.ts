export interface SidebarLink {
  id: string;
  label: string;
}

export interface ServiceSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  label: string;
  items: readonly string[];
  footer: string;
}

export interface WorkflowStep {
  title: string;
  description: string;
}
