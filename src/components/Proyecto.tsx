import { ArrowRight, Type } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';

export function Proyecto() {
  const { getContent } = useContent();
  const proyectoContent = getContent('proyecto_section', {
    badge: 'Visión integral',
    title: 'Proyecto Dogcat Rescate',
    text: 'Un proyecto técnico de bienestar animal diseñado para dar respuesta profesional a emergencias. Buscamos el apoyo y los recursos para hacerlo realidad.',
    buttonText: 'Ver detalles proyecto',
    f1_icon: 'Truck',
    f1_title: 'Flota de rescate',
    f1_text: 'Vehículos adaptados para transporte seguro y material de captura.',
    f2_icon: 'Building2',
    f2_title: 'Infraestructura',
    f2_text: 'Instalaciones temporales para cuarentenas y recuperación.',
    f3_icon: 'Handshake',
    f3_title: 'Alianzas corporativas',
    f3_text: 'Colaboraciones mediante patrocinios, cesiones de material o donaciones.'
  });

  const getLucideIcon = (name: string) => {
    if (!name) return null;
    
    // First try the exact name as provided
    if ((LucideIcons as any)[name]) return (LucideIcons as any)[name];

    // Convert kebab-case or space-separated to PascalCase
    const pascalName = name
      .replace(/[-_ ]+/g, ' ')
      .split(' ')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
      
    if ((LucideIcons as any)[pascalName]) return (LucideIcons as any)[pascalName];
    
    // Also try with 'Icon' suffix just in case (some environments do this)
    if ((LucideIcons as any)[pascalName + 'Icon']) return (LucideIcons as any)[pascalName + 'Icon'];

    return null;
  };

  const renderFeatureIcon = (iconName: string) => {
    if (!iconName) return <Type className="w-6 h-6 mb-3 text-brand-dark" />;
    
    // If it's a short string (1-2 chars), render as text (like CER icons)
    if (iconName.length <= 2) {
      return (
        <div className="w-8 h-8 rounded-full bg-brand-dark text-brand-green flex items-center justify-center font-black text-sm mb-3 shadow-lg">
          {iconName}
        </div>
      );
    }

    // Otherwise try to render as Lucide icon
    const Icon = getLucideIcon(iconName) || LucideIcons.HelpCircle;
    return <Icon className="w-6 h-6 mb-3 text-brand-dark" />;
  };

  return (
    <section id="proyecto" className="py-12 md:py-16 bg-brand-dark text-brand-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Wide Card */}
        <div className="bg-brand-green text-brand-dark rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center relative overflow-hidden shadow-2xl">
          
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <img 
              src={proyectoContent.image || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000"} 
              alt="Fondo perros" 
              loading="lazy"
              className="w-full h-full object-cover mix-blend-multiply"
            />
          </div>

          {/* Left Column: Text & CTA */}
          <div className="lg:w-5/12 relative z-10 text-center lg:text-left">
            {proyectoContent.badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark/20 text-brand-dark font-bold text-xs mb-4 uppercase tracking-wider backdrop-blur-sm border border-brand-dark/10">
                {proyectoContent.badge}
              </div>
            )}
            {proyectoContent.title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.1] mb-4">
                {proyectoContent.title}
              </h2>
            )}
            {proyectoContent.text && (
              <p className="text-brand-dark/80 font-medium mb-6 max-w-md mx-auto lg:mx-0 text-sm md:text-base">
                {proyectoContent.text}
              </p>
            )}
            {proyectoContent.buttonText && (
              <Link 
                to="/proyecto" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-dark text-brand-light rounded-full font-bold hover:bg-black transition-all transform hover:scale-105"
              >
                {proyectoContent.buttonText} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Right Column: Compact Features Grid */}
          <div className="lg:w-7/12 relative z-10 grid sm:grid-cols-2 gap-3 md:gap-4 w-full">
            
            {/* Feature 1 */}
            {proyectoContent.f1_title && (
              <div className="bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 hover:bg-white/40 transition-colors">
                {renderFeatureIcon(proyectoContent.f1_icon)}
                <h3 className="font-bold mb-1 text-base">{proyectoContent.f1_title}</h3>
                {proyectoContent.f1_text && (
                  <p className="text-xs md:text-sm text-brand-dark/80 leading-snug">
                    {proyectoContent.f1_text}
                  </p>
                )}
              </div>
            )}

            {/* Feature 2 */}
            {proyectoContent.f2_title && (
              <div className="bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 hover:bg-white/40 transition-colors">
                {renderFeatureIcon(proyectoContent.f2_icon)}
                <h3 className="font-bold mb-1 text-base">{proyectoContent.f2_title}</h3>
                {proyectoContent.f2_text && (
                  <p className="text-xs md:text-sm text-brand-dark/80 leading-snug">
                    {proyectoContent.f2_text}
                  </p>
                )}
              </div>
            )}

            {/* Feature 3 (Spans 2 columns on small screens) */}
            {proyectoContent.f3_title && (
              <div className="sm:col-span-2 bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 hover:bg-white/40 transition-colors flex items-center gap-4">
                <div className="flex-shrink-0">
                  {renderFeatureIcon(proyectoContent.f3_icon)}
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-base">{proyectoContent.f3_title}</h3>
                  {proyectoContent.f3_text && (
                    <p className="text-xs md:text-sm text-brand-dark/80 leading-snug">
                      {proyectoContent.f3_text}
                    </p>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
