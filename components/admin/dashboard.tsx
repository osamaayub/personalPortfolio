"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import ContentEditor from "./content-editor";

type Message = {
  _id: string;
  name?: string;
  email: string;
  message: string;
  read: boolean;
  emailed: boolean;
  createdAt: string;
};

type Project = {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  url: string;
  github: string;
  featured: boolean;
  order: number;
};

type Draft = Omit<Project, "_id" | "tags"> & { _id?: string; tags: string };

const emptyDraft: Draft = {
  title: "",
  description: "",
  tags: "",
  image: "",
  url: "",
  github: "",
  featured: false,
  order: 0,
};

async function api<T = unknown>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Request failed");
  return data as T;
}

const field =
  "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/15 dark:bg-white/10 dark:text-white";

export default function Dashboard({ dbConfigured }: { dbConfigured: boolean }) {
  const router = useRouter();
  const [tab, setTab] = useState<"messages" | "projects" | "content">("messages");
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(dbConfigured);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!dbConfigured) return;
    try {
      const [m, p] = await Promise.all([
        api<{ messages: Message[] }>("/api/admin/messages"),
        api<{ projects: Project[] }>("/api/admin/projects"),
      ]);
      setMessages(m.messages);
      setProjects(p.projects);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [dbConfigured]);

  useEffect(() => {
    load();
  }, [load]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function toggleRead(m: Message) {
    try {
      await api(`/api/admin/messages/${m._id}`, {
        method: "PATCH",
        body: JSON.stringify({ read: !m.read }),
      });
      setMessages((list) => list.map((x) => (x._id === m._id ? { ...x, read: !m.read } : x)));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  }

  async function removeMessage(id: string) {
    if (!confirm("Delete this message?")) return;
    try {
      await api(`/api/admin/messages/${id}`, { method: "DELETE" });
      setMessages((list) => list.filter((x) => x._id !== id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  }

  async function saveProject(e: React.FormEvent) {
    e.preventDefault();
    if (!draft) return;
    setSaving(true);
    const body = {
      title: draft.title,
      description: draft.description,
      tags: draft.tags.split(",").map((t) => t.trim()).filter(Boolean),
      image: draft.image,
      url: draft.url,
      github: draft.github,
      featured: draft.featured,
      order: Number(draft.order) || 0,
    };
    try {
      await api(draft._id ? `/api/admin/projects/${draft._id}` : "/api/admin/projects", {
        method: draft._id ? "PUT" : "POST",
        body: JSON.stringify(body),
      });
      toast.success("Project saved");
      setDraft(null);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setSaving(false);
    }
  }

  async function removeProject(id: string) {
    if (!confirm("Delete this project?")) return;
    try {
      await api(`/api/admin/projects/${id}`, { method: "DELETE" });
      setProjects((list) => list.filter((x) => x._id !== id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  }

  async function seed() {
    try {
      await api("/api/admin/seed", { method: "POST" });
      toast.success("Imported existing projects");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  }

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {unread} unread · {messages.length} messages · {projects.length} projects
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="rounded-xl border border-gray-300 px-4 py-2 text-sm dark:border-white/15">
            View site
          </Link>
          <button onClick={logout} className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white dark:bg-white/10">
            Sign out
          </button>
        </div>
      </header>

      {!dbConfigured && (
        <p role="alert" className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          MONGODB_URI is not set, so there is nothing to manage yet. Add it to your environment and reload.
        </p>
      )}

      <div role="tablist" className="mt-6 flex gap-2 border-b border-gray-200 dark:border-white/10">
        {(["messages", "projects", "content"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium capitalize ${
              tab === t
                ? "border-indigo-600 text-indigo-700 dark:text-indigo-300"
                : "border-transparent text-gray-500"
            }`}
          >
            {t}
            {t === "messages" && unread > 0 && (
              <span className="ml-2 rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white">{unread}</span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-gray-500">Loading…</p>
      ) : tab === "content" ? (
        <ContentEditor />
      ) : tab === "messages" ? (
        <ul className="mt-6 space-y-3">
          {messages.length === 0 && <li className="text-sm text-gray-500">No messages yet.</li>}
          {messages.map((m) => (
            <li
              key={m._id}
              className={`rounded-2xl border p-5 ${
                m.read
                  ? "border-gray-200 bg-white/60 dark:border-white/10 dark:bg-white/5"
                  : "border-indigo-300 bg-white shadow-sm dark:border-indigo-400/40 dark:bg-slate-900"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">
                  {m.name || "Anonymous"}{" "}
                  <a className="text-sm font-normal text-indigo-600 underline dark:text-indigo-300" href={`mailto:${m.email}`}>
                    {m.email}
                  </a>
                </p>
                <time className="text-xs text-gray-500" dateTime={m.createdAt}>
                  {new Date(m.createdAt).toLocaleString()}
                </time>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-700 dark:text-gray-200">{m.message}</p>
              <div className="mt-4 flex gap-3 text-sm">
                <button onClick={() => toggleRead(m)} className="text-indigo-600 dark:text-indigo-300">
                  Mark {m.read ? "unread" : "read"}
                </button>
                <button onClick={() => removeMessage(m._id)} className="text-red-600 dark:text-red-400">
                  Delete
                </button>
                {!m.emailed && <span className="text-amber-600">email not delivered</span>}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <section className="mt-6">
          <div className="flex gap-2">
            <button
              onClick={() => setDraft({ ...emptyDraft, order: projects.length })}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Add project
            </button>
            {projects.length === 0 && dbConfigured && (
              <button onClick={seed} className="rounded-xl border border-gray-300 px-4 py-2 text-sm dark:border-white/15">
                Import current projects
              </button>
            )}
          </div>
          {projects.length === 0 && (
            <p className="mt-4 text-sm text-gray-500">
              No projects in the database, so the site is showing its built-in list. Import it to start editing.
            </p>
          )}
          <ul className="mt-4 space-y-3">
            {projects.map((p) => (
              <li
                key={p._id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
              >
                <div>
                  <p className="font-medium">
                    {p.title} {p.featured && <span className="ml-1 text-xs text-indigo-600">★ featured</span>}
                  </p>
                  <p className="text-xs text-gray-500">
                    #{p.order} · {p.tags.join(", ")}
                  </p>
                </div>
                <div className="flex gap-3 text-sm">
                  <button
                    onClick={() => setDraft({ ...p, tags: p.tags.join(", ") })}
                    className="text-indigo-600 dark:text-indigo-300"
                  >
                    Edit
                  </button>
                  <button onClick={() => removeProject(p._id)} className="text-red-600 dark:text-red-400">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {draft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Project form">
          <form
            onSubmit={saveProject}
            className="max-h-[90vh] w-full max-w-lg space-y-3 overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <h2 className="text-lg font-semibold">{draft._id ? "Edit project" : "New project"}</h2>
            <input className={field} placeholder="Title" required maxLength={120} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
            <textarea className={`${field} h-28`} placeholder="Description" required maxLength={1200} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
            <input className={field} placeholder="Tags, comma separated" value={draft.tags} onChange={(e) => setDraft({ ...draft, tags: e.target.value })} />
            <input className={field} placeholder="Image URL or /path in public" value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} />
            <input className={field} placeholder="Live URL" value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} />
            <input className={field} placeholder="GitHub URL" value={draft.github} onChange={(e) => setDraft({ ...draft, github: e.target.value })} />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={draft.featured} onChange={(e) => setDraft({ ...draft, featured: e.target.checked })} />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                Order
                <input type="number" min={0} className={`${field} w-24`} value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} />
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setDraft(null)} className="rounded-xl border border-gray-300 px-4 py-2 text-sm dark:border-white/15">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
