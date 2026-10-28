import { cache } from "react";
import { connectDb, isDbConfigured } from "@/lib/db";
import { contentSchemas, defaultContent, sectionKeys, type SiteContent } from "@/lib/content-schema";
import { ContentModel } from "@/models/content";
import { createLogger } from "@/lib/logger";

const log = createLogger("content");

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
      else log.warn("Ignoring invalid saved content", { section: key });
    }
    return out as Partial<SiteContent>;
  } catch (err) {
    log.error("Loading content failed, using defaults", err);
    return {};
  }
}

/** Memoized per request: layout, page and metadata all call this. */
export const getContent = cache(async (): Promise<SiteContent> => ({
  ...defaultContent,
  ...(await getSavedSections()),
}));
