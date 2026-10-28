import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import Services from "@/components/services";
import Skills from "@/components/skills";
import { getContent } from "@/lib/content";
import { getProjects } from "@/lib/projects";

// Re-rendered at most once a minute; admin edits also revalidate on save.
export const revalidate = 60;

export default async function Home() {
  const [projects, content] = await Promise.all([getProjects(), getContent()]);

  return (
    <main id="main" className="flex flex-col items-center px-4 pb-4">
      <Intro profile={content.profile} />
      <About about={content.about} copy={content.sections.about} />
      <Projects projects={projects} copy={content.sections.projects} />
      <Skills groups={content.skills} copy={content.sections.skills} />
      <Services content={content.services} copy={content.sections.services} />
      <Experience items={content.experience} copy={content.sections.experience} />
      <Contact profile={content.profile} copy={content.sections.contact} />
    </main>
  );
}
