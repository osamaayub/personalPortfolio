import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import Services from "@/components/services";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4 pb-4">
      <Intro />
      <About />
      <Projects />
      <Skills />
      <Services />
      <Experience />
      <Contact />
    </main>
  );
}
