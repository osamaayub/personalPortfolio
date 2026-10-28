import { connectDb, isDbConfigured } from "@/lib/db";
import { contentSchemas, defaultContent, sectionKeys, type SiteContent } from "@/lib/content-schema";
import { ContentModel } from "@/models/content";

/** Saved sections from MongoDB, each validated; anything missing or invalid falls back to defaults. */
export async function getSavedSections(): Promise<Partial<SiteContent>> {
  if (!isDbConfigured) return {};
  try {
    await connectDb();
    const docs = await ContentModel.find().lean();
    const out: Record<string, unknown> = {};
    for (const doc of docs) {
      const key = doc._id as keyof typeof contentSchemas;
      if (!sectionKeys.includes(key)) continue;
      const parsed = contentSchemas[key].safeParse(doc.data);
      if (parsed.success) out[key] = parsed.data;
      else console.error(`Ignoring invalid saved content for "${key}"`);
    }
    return out as Partial<SiteContent>;
  } catch (err) {
    console.error("getContent failed, using defaults:", err);
    return {};
  }
}

export async function getContent(): Promise<SiteContent> {
  return { ...defaultContent, ...(await getSavedSections()) };
}
