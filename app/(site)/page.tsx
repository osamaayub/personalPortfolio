import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import Services from "@/components/services";
import Skills from "@/components/skills";
import { getProjects } from "@/lib/projects";

// Re-rendered at most once a minute; admin edits also revalidate on write.
export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="flex flex-col items-center px-4 pb-4">
      <Intro />
      <About />
      <Projects projects={projects} />
      <Skills />
      <Services />
      <Experience />
      <Contact />
    </main>
  );
}
