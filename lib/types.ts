import { links } from "@/data/data";

export type SectionName = (typeof links)[number]["name"];


export type PublicProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  url: string;
  github: string;
  featured: boolean;
};
