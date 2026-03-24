import { Fish, Home, LifeBuoy, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Colonias() {
  const needs = [
    {
      title: 'Material de captura',
      description: 'Jaulas trampa y transportines para rescates seguros.',
      icon: <LifeBuoy className="w-8 h-8" />,
    },
    {
      title: 'Atención veterinaria',
      description: 'Esterilizaciones, vacunas y curas de urgencia.',
      icon: <Stethoscope className="w-8 h-8" />,
    },
    {
      title: 'Alimentación diaria',
      description: 'Pienso y comida húmeda para mantenerlos fuertes.',
      icon: <Fish className="w-8 h-8" />,
    },
    {
      title: 'Refugios de invierno',
      description: 'Casetas para protegerlos del frío y la lluvia.',
      icon: <Home className="w-8 h-8" />,
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
                src="/cat_colony.jpg" 
                alt="Gatos de colonia alimentándose" 
                loading="lazy"
                className="relative w-full h-full object-cover rounded-[2rem] shadow-lg"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-3/5">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
              Ayuda a las <span className="text-brand-green">colonias felinas</span>
            </h2>
            <p className="text-brand-dark/75 mb-10 text-base md:text-lg max-w-xl">
              Gestionamos colonias mediante el método <strong>C.E.R.</strong> (Captura, Esterilización y Retorno). Tu aportación mensual o puntual se destina íntegramente a cubrir sus necesidades básicas:
            </p>

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
