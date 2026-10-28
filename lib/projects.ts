import { projectsData } from "@/data/data";
import { connectDb, isDbConfigured } from "@/lib/db";
import { ProjectModel } from "@/models/project";
import type { PublicProject } from "@/lib/types";

const staticProjects = (): PublicProject[] =>
  projectsData.map((p, i) => ({
    id: `static-${i}`,
    title: p.title,
    description: p.description,
    tags: [...p.tags],
    // Plain URL string: static-import objects are fragile across the server/client boundary.
    image: p.imageUrl.src,
    url: p.url,
    github: p.github,
    featured: i === 0,
  }));

/**
 * Projects come from MongoDB once any exist. Until then (or if the DB is not
 * configured / unreachable) the site falls back to the bundled data so it never
 * renders an empty section.
 */
export async function getProjects(): Promise<PublicProject[]> {
  if (!isDbConfigured) return staticProjects();
  try {
    await connectDb();
    const docs = await ProjectModel.find().sort({ order: 1, createdAt: -1 }).lean();
    if (docs.length === 0) return staticProjects();
    return docs.map((d) => ({
      id: String(d._id),
      title: d.title,
      description: d.description,
      tags: d.tags ?? [],
      image: d.image?.trim() ?? "",
      url: d.url ?? "",
      github: d.github ?? "",
      featured: Boolean(d.featured),
    }));
  } catch (err) {
    console.error("getProjects failed, using static data:", err);
    return staticProjects();
  }
}
