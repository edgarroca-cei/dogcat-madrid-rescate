import { Fish, Home, LifeBuoy, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import * as LucideIcons from 'lucide-react';

const renderIcon = (iconName: string) => {
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
  return <Icon className="w-8 h-8" />;
};

export function Colonias() {
  const { getContent } = useContent();
  const coloniasContent = getContent('colonias_section', {
    badge: 'Donaciones y recursos',
    title: 'Apoyo económico para las colonias',
    text: 'Actuamos como motor de ayuda para alimentadoras y asociaciones de Madrid. Canalizamos tu solidaridad mediante la donación directa de alimento, financiación de gastos veterinarios y suministro de material especializado.'
  });

  const needs = [
    {
      title: coloniasContent.n1_title || 'Material de captura',
      description: coloniasContent.n1_text || 'Jaulas trampa y transportines para rescates seguros.',
      icon: renderIcon(coloniasContent.n1_icon || 'LifeBuoy'),
    },
    {
      title: coloniasContent.n2_title || 'Atención veterinaria',
      description: coloniasContent.n2_text || 'Esterilizaciones, vacunas y curas de urgencia.',
      icon: renderIcon(coloniasContent.n2_icon || 'Stethoscope'),
    },
    {
      title: coloniasContent.n3_title || 'Alimentación diaria',
      description: coloniasContent.n3_text || 'Pienso y comida húmeda para mantenerlos fuertes.',
      icon: renderIcon(coloniasContent.n3_icon || 'Fish'),
    },
    {
      title: coloniasContent.n4_title || 'Refugios de invierno',
      description: coloniasContent.n4_text || 'Casetas para protegerlos del frío y la lluvia.',
      icon: renderIcon(coloniasContent.n4_icon || 'Home'),
    },
  ];

  return (
    <section id="colonias" className="py-12 md:py-16 bg-brand-light text-brand-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-cream rounded-[2rem] p-6 md:p-10 lg:p-12 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          
          {/* Image Side */}
          <div className="hidden lg:block w-full lg:w-2/5 mb-6 lg:mb-0">
            <div className="relative aspect-[4/3] w-full max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-brand-green/20 rounded-[2rem] transform -rotate-3 scale-105"></div>
              <img 
                src={coloniasContent.image || "/cat_colony.webp"} 
                alt="Gatos de colonia alimentándose" 
                loading="lazy"
                decoding="async"
                className="relative w-full h-full object-cover rounded-[2rem] shadow-lg transition-all duration-500"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-3/5">
            {coloniasContent.badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-dark font-bold text-xs mb-4 uppercase tracking-wider border border-brand-green/30">
                {coloniasContent.badge}
              </div>
            )}
            {coloniasContent.title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
                {coloniasContent.title}
              </h2>
            )}
            {coloniasContent.text && (
              <p className="text-brand-dark/75 mb-10 text-base md:text-lg max-w-xl">
                {coloniasContent.text}
              </p>
            )}

            {/* Loose List */}
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8 mb-10">
              {needs.map((need, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 group"
                >
                  <div className="mt-1 text-brand-green group-hover:scale-110 transition-transform duration-300">
                    {need.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-base md:text-lg mb-1">{need.title}</h3>
                    <p className="text-sm text-brand-dark/70 leading-relaxed">
                      {need.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-donation-modal'))}
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-dark text-brand-light rounded-full font-semibold hover:bg-brand-dark/90 transition-transform hover:scale-105 flex items-center justify-center shadow-md"
              >
                Hacer un donativo
              </button>
              <Link to="/colonias-felinas" className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-brand-dark text-brand-dark rounded-full font-semibold hover:bg-brand-dark/5 transition-colors flex items-center justify-center">
                Saber más
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
