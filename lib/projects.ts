import { cache } from "react";
import { pinnedProjects, projectsData } from "@/data/data";
import { connectDb, isDbConfigured } from "@/lib/db";
import { ProjectModel } from "@/models/project";
import { createLogger } from "@/lib/logger";
import type { PublicProject } from "@/lib/types";

const log = createLogger("projects");

const toPublicProject = (
  project: (typeof projectsData)[number],
  id: string,
  featured = false,
): PublicProject => ({
  id,
  title: project.title,
  description: project.description,
  tags: [...project.tags],
  image: project.imageUrl.src,
  url: project.url,
  github: project.github,
  featured,
});

const staticProjects = (): PublicProject[] =>
  projectsData.map((project, i) =>
    toPublicProject(project, `static-${i}`, i === 0),
  );

const missingPinnedProjects = (existing: PublicProject[]): PublicProject[] =>
  pinnedProjects
    .map((project, i) => toPublicProject(project, `pinned-${i}`))
    .filter(
      (project) =>
        !existing.some(
          (item) =>
            item.title === project.title ||
            (project.github && item.github === project.github),
        ),
    );

/**
 * Projects come from MongoDB once any exist. Until then (or if the DB is not
 * configured / unreachable) the site falls back to the bundled data so it never
 * renders an empty section.
 */
export const getProjects = cache(async (): Promise<PublicProject[]> => {
  if (!isDbConfigured) return staticProjects();
  try {
    await connectDb();
    const docs = await ProjectModel.find().sort({ order: 1, createdAt: -1 }).lean();
    if (docs.length === 0) return staticProjects();
    const storedProjects = docs.map((d) => ({
      id: String(d._id),
      title: d.title,
      description: d.description,
      tags: d.tags ?? [],
      image: d.image?.trim() ?? "",
      url: d.url ?? "",
      github: d.github ?? "",
      featured: Boolean(d.featured),
    }));
    return [...storedProjects, ...missingPinnedProjects(storedProjects)];
  } catch (err) {
    log.error("Loading projects failed, using static data", err);
    return staticProjects();
  }
});
