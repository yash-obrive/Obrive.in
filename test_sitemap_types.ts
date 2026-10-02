import type { MetadataRoute } from "next";

export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }];
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  return [];
}
