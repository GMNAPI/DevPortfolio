import { Hero } from '@/features/hero/Hero';
import { About } from '@/features/about/About';
import { Projects } from '@/features/projects/Projects';
import { Contact } from '@/features/contact/Contact';
import { Skills } from '@/features/skills/Skills';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
