import { Hero } from '@/features/hero/Hero';
import { About } from '@/features/about/About';
import { Projects } from '@/features/projects/Projects';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
    </main>
  );
}
