import React from 'react';
import { Blog } from '../components/Blog';
import { Colonias } from '../components/Colonias';
import { Hero } from '../components/Hero';
import { Proyecto } from '../components/Proyecto';
import { useContent } from '../contexts/ContentContext';

export function Home() {
  const { getContent } = useContent();
  
  const sectionsConfig = getContent('home_sections', {
    order: ['Hero', 'Colonias', 'Proyecto', 'Blog'],
    hidden: []
  });

  const sectionComponents: { [key: string]: React.ReactNode } = {
    Hero: <Hero key="Hero" />,
    Colonias: <Colonias key="Colonias" />,
    Proyecto: <Proyecto key="Proyecto" />,
    Blog: <Blog key="Blog" />,
  };

  return (
    <main>
      {sectionsConfig.order
        .filter((id: string) => !sectionsConfig.hidden.includes(id))
        .map((id: string) => sectionComponents[id])}
    </main>
  );
}
