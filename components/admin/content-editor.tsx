"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { sectionKeys, serviceIcons, type SectionKey, type SiteContent } from "@/lib/content-schema";

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

const field =
  "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/15 dark:bg-white/10 dark:text-white";

const longKeys = new Set(["description", "tagline", "intro", "text"]);
const label = (k: string) => k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

/** Empty copy of a sample value, used for "Add" buttons. */
function blank(sample: Json): Json {
  if (typeof sample === "string") return "";
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === "object") {
    return Object.fromEntries(
      Object.entries(sample).map(([k, v]) => [k, k === "icon" ? v : blank(v)]),
    );
  }
  return sample;
}

function Node({
  name,
  value,
  sample,
  onChange,
}: {
  name: string;
  value: Json;
  sample: Json;
  onChange: (v: Json) => void;
}) {
  if (typeof value === "string") {
    if (name === "icon") {
      return (
        <select className={field} value={value} onChange={(e) => onChange(e.target.value)}>
          {serviceIcons.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      );
    }
    const long = longKeys.has(name) || value.length > 90;
    return long ? (
      <textarea className={`${field} h-24`} value={value} onChange={(e) => onChange(e.target.value)} />
    ) : (
      <input className={field} value={value} onChange={(e) => onChange(e.target.value)} />
    );
  }

  if (Array.isArray(value)) {
    const itemSample = (Array.isArray(sample) ? sample[0] : undefined) ?? value[0] ?? "";
    const stringList = typeof itemSample === "string";
    return (
      <div className="space-y-2">
        {value.map((item, i) => (
          <div
            key={i}
            className={stringList ? "flex gap-2" : "space-y-3 rounded-2xl border border-gray-200 p-4 dark:border-white/10"}
          >
            <div className="flex-1">
              <Node
                name={name}
                value={item}
                sample={itemSample}
                onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))}
              />
            </div>
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="self-start text-sm text-red-600 dark:text-red-400"
              aria-label={`Remove ${name} ${i + 1}`}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, blank(itemSample)])}
          className="rounded-lg border border-dashed border-indigo-400 px-3 py-1.5 text-sm text-indigo-600 dark:text-indigo-300"
        >
          + Add
        </button>
      </div>
    );
  }

  if (value && typeof value === "object") {
    const sampleObj = (sample && typeof sample === "object" && !Array.isArray(sample) ? sample : value) as Record<string, Json>;
    return (
      <div className="space-y-3">
        {Object.entries(value).map(([k, v]) => (
          <div key={k}>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500">{label(k)}</label>
            <Node name={k} value={v} sample={sampleObj[k] ?? v} onChange={(nv) => onChange({ ...value, [k]: nv })} />
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function ContentEditor() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [customized, setCustomized] = useState<string[]>([]);
  const [section, setSection] = useState<SectionKey>("profile");
  const [draft, setDraft] = useState<Json>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/content");
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return toast.error(data.error ?? "Failed to load content");
    setContent(data.content);
    setCustomized(data.customized);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (content) setDraft(structuredClone(content[section]) as Json);
  }, [content, section]);

  async function save() {
    setSaving(true);
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, data: draft }),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) return toast.error(data.error ?? "Save failed");
    toast.success("Saved. The site updates within a minute.");
    load();
  }

  async function reset() {
    if (!confirm(`Reset "${section}" to the built-in defaults?`)) return;
    const res = await fetch(`/api/admin/content?section=${section}`, { method: "DELETE" });
    if (!res.ok) return toast.error("Reset failed");
    toast.success("Reset to defaults");
    load();
  }

  if (!content || draft === null) return <p className="mt-8 text-sm text-gray-500">Loading…</p>;

  return (
    <section className="mt-6">
      <div className="flex flex-wrap gap-2">
        {sectionKeys.map((k) => (
          <button
            key={k}
            onClick={() => setSection(k)}
            aria-pressed={section === k}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize ${
              section === k
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-gray-300 dark:border-white/15"
            }`}
          >
            {k}
            {customized.includes(k) && <span className="ml-1.5" title="Customized">●</span>}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        ● means this section is saved in the database. Others show the built-in text. Use **double asterisks** around
        words in About paragraphs to make them bold.
      </p>

      <div className="mt-5 rounded-3xl border border-gray-200 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
        <Node name={section} value={draft} sample={content[section] as Json} onChange={setDraft} />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {saving ? "Saving…" : `Save ${section}`}
        </button>
        {customized.includes(section) && (
          <button onClick={reset} className="rounded-xl border border-gray-300 px-4 py-2 text-sm dark:border-white/15">
            Reset to defaults
          </button>
        )}
      </div>
    </section>
  );
}
