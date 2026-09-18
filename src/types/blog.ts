export type BlogCategory =
  | "All"
  | "Smart parking"
  | "Digital Twin"
  | "Enterprise"
  | "Driver Experience"
  | "Immersive Tech";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category: string;
  date: string;
  readTime?: string;
  imageUrl?: string;
  isFeatured?: boolean;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}
