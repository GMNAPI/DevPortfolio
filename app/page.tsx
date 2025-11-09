import { Hero } from '@/features/hero/Hero';
import { About } from '@/features/about/About';
import { Projects } from '@/features/projects/Projects';
import { Contact } from '@/features/contact/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  );
}
