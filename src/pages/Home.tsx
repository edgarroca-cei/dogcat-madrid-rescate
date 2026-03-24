import { Blog } from '../components/Blog';
import { Colonias } from '../components/Colonias';
import { Hero } from '../components/Hero';
import { Proyecto } from '../components/Proyecto';

export function Home() {
  return (
    <main>
      <Hero />
      <Colonias />
      <Proyecto />
      <Blog />
    </main>
  );
}
