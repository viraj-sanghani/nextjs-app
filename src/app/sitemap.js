import { getSitemap } from "@/services/api";

export default async function sitemap() {
  try {
    const data = await getSitemap();
    return data?.data || [];
  } catch (err) {
    return [];
  }
}
