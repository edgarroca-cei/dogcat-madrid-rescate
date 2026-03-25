import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';

export function Hero() {
  const { getContent } = useContent();
  const heroContent = getContent('hero', {
    badge: 'ONG de rescate animal en Madrid',
    title: 'Tu donativo tiene un impacto directo y real',
    text: 'Nuestra labor se desarrolla en los distintos distritos de Madrid, respaldando a quienes velan por el bienestar felino los 365 días del año. Tu aportación se transforma de manera inmediata en alimento, atención veterinaria de urgencia y material de captura ético.',
    buttonText: 'Donar ahora'
  });

  return (
    <section id="inicio" className="relative pt-24 pb-10 lg:pt-36 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Text Content */}
           <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            {heroContent.badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 text-brand-green font-semibold text-xs md:text-sm mb-4 border border-brand-green/20">
                <Heart className="w-3.5 h-3.5" />
                <span>{heroContent.badge}</span>
              </div>
            )}
            {heroContent.title && (
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-brand-light mb-4 leading-[1.15] text-balance">
                {heroContent.title}
              </h1>
            )}
            {heroContent.text && (
              <p className="text-base sm:text-lg md:text-xl text-brand-light/80 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 text-balance">
                {heroContent.text}
              </p>
            )}
            {heroContent.buttonText && (
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-donation-modal'))}
                  className="w-[calc(100%-2rem)] sm:w-auto px-8 py-4 bg-brand-cream text-brand-dark rounded-full font-semibold text-base hover:bg-brand-light transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  {heroContent.buttonText} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Image Content */}
          <div className="relative mt-6 lg:mt-0 max-w-md mx-auto lg:max-w-none">
            <div className="absolute inset-0 bg-brand-green/20 rounded-[2rem] transform rotate-3 scale-105 -z-10"></div>
            <img 
              src={heroContent.image || "/dog_cat_hero.webp"} 
              alt="Perro y gato rescatados" 
              fetchPriority="high"
              decoding="sync"
              className="relative w-full h-[250px] sm:h-[350px] lg:h-[450px] object-cover rounded-[2rem] shadow-2xl transition-opacity duration-300"
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-green/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-brand-cream/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
