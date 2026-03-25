import { Heart, Shield, Users, HelpCircle, Type } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export function ColoniasFelinasPage() {
  const { getContent } = useContent();
  const pageContent = getContent('colonias_page', {
    title: 'Intervención y apoyo para las colonias felinas de Madrid',
    text: 'En DOGCAT Madrid centramos nuestros esfuerzos en el terreno, respaldando de forma integral a las gestoras de colonias.',
    cer_title: 'Nuestro apoyo al método C.E.R.',
    cer_text: 'Facilitamos los recursos necesarios para que las gestoras de Madrid puedan aplicar el método C.E.R. (Captura, Esterilización y Retorno) con garantías de éxito.',
    cer_step1_title: 'C: Captura y Material',
    cer_step1_text: 'Donamos jaulas trampa y transportines especializados para que el proceso de captura sea seguro y respetuoso con el animal.',
    cer_step2_title: 'E: Esterilización y Veterinaria',
    cer_step2_text: 'Abonamos directamente las facturas de esterilización, vacunación e identificación en centros clínicos colaboradores.',
    cer_step3_title: 'R: Retorno y Alimentación',
    cer_step3_text: 'Tras el retorno a su colonia, seguimos apoyando a las alimentadoras mediante la donación periódica de pienso y comida húmeda.',
    donations_title: '¿A dónde va tu donativo?',
    donations_text: 'No recibimos ayudas públicas suficientes. Tu solidaridad nos permite seguir enviando alimento y pagando facturas veterinarias para salvaguardar a los gatos de Madrid.'
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

  const renderStepIcon = (iconName: string) => {
    if (!iconName) return <Type className="w-4 h-4" />;
    
    // If it's a short string (1-2 chars), render as text
    if (iconName.length <= 2) {
      return iconName;
    }

    // Otherwise try to render as Lucide icon
    const Icon = getLucideIcon(iconName) || HelpCircle;
    return <Icon className="w-5 h-5" />;
  };

  const needs = [
    {
      title: 'Material de captura',
      description: 'Jaulas trampa y transportines para rescates seguros.',
      icon: <LucideIcons.LifeBuoy className="w-8 h-8" />,
    },
    {
      title: 'Atención veterinaria',
      description: 'Esterilizaciones, vacunas y curas de urgencia.',
      icon: <LucideIcons.Stethoscope className="w-8 h-8" />,
    },
    {
      title: 'Alimentación diaria',
      description: 'Pienso y comida húmeda para mantenerlos fuertes.',
      icon: <LucideIcons.Fish className="w-8 h-8" />,
    },
    {
      title: 'Refugios de invierno',
      description: 'Casetas para protegerlos del frío y la lluvia.',
      icon: <LucideIcons.Home className="w-8 h-8" />,
    },
  ];

  return (
    <div className="pt-28 pb-16 md:pt-32 md:pb-20 bg-brand-light text-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 text-brand-green font-bold tracking-wider uppercase text-sm mb-4 bg-brand-green/10 px-4 py-2 rounded-full">
            <LucideIcons.Home className="w-4 h-4" /> Nuestro trabajo
          </p>
          {pageContent.title && (
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {pageContent.title}
            </h1>
          )}
          {pageContent.text && (
            <p className="text-brand-dark/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {pageContent.text}
            </p>
          )}
        </div>

        {/* Main Content Split */}
        {(pageContent.cer_title || pageContent.cer_text) && (
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl">
              <img 
                src={pageContent.image} 
                alt={pageContent.title} 
                className="w-full h-full object-cover transition-opacity duration-500"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="space-y-6">
              {pageContent.cer_title && <h2 className="text-3xl font-bold">{pageContent.cer_title}</h2>}
              {pageContent.cer_text && (
                <p className="text-brand-dark/80 text-lg leading-relaxed">
                  {pageContent.cer_text}
                </p>
              )}
              <ul className="space-y-4">
                {pageContent.cer_step1_title && (
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-green text-brand-dark flex items-center justify-center font-black shadow-md">
                      {renderStepIcon(pageContent.cer_step1_icon || 'C')}
                    </div>
                    <div>
                      <strong className="block text-lg">{pageContent.cer_step1_title}</strong>
                      {pageContent.cer_step1_text && <span className="text-brand-dark/70">{pageContent.cer_step1_text}</span>}
                    </div>
                  </li>
                )}
                {pageContent.cer_step2_title && (
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-green text-brand-dark flex items-center justify-center font-black shadow-md">
                      {renderStepIcon(pageContent.cer_step2_icon || 'E')}
                    </div>
                    <div>
                      <strong className="block text-lg">{pageContent.cer_step2_title}</strong>
                      {pageContent.cer_step2_text && <span className="text-brand-dark/70">{pageContent.cer_step2_text}</span>}
                    </div>
                  </li>
                )}
                {pageContent.cer_step3_title && (
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-green text-brand-dark flex items-center justify-center font-black shadow-md">
                      {renderStepIcon(pageContent.cer_step3_icon || 'R')}
                    </div>
                    <div>
                      <strong className="block text-lg">{pageContent.cer_step3_title}</strong>
                      {pageContent.cer_step3_text && <span className="text-brand-dark/70">{pageContent.cer_step3_text}</span>}
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Where does the money go? */}
        {(pageContent.donations_title || pageContent.donations_text) && (
          <div className="bg-brand-cream rounded-[2rem] p-8 md:p-12 mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              {pageContent.donations_title && <h2 className="text-3xl font-bold mb-4">{pageContent.donations_title}</h2>}
              {pageContent.donations_text && (
                <p className="text-brand-dark/70 text-lg">
                  {pageContent.donations_text}
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {needs.map((need, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green/20 text-brand-green mb-4">
                    {need.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{need.title}</h3>
                  <p className="text-sm text-brand-dark/70">{need.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-donation-modal'))}
                className="px-8 py-4 bg-brand-dark text-brand-light rounded-full font-bold text-lg hover:bg-brand-dark/90 transition-transform hover:scale-105 shadow-lg"
              >
                Hacer un donativo ahora
              </button>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <Heart className="w-12 h-12 text-brand-green mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Bienestar animal</h3>
            <p className="text-brand-dark/70">Mejoramos la salud de los gatos, evitando peleas, enfermedades y camadas indeseadas.</p>
          </div>
          <div className="p-6">
            <Shield className="w-12 h-12 text-brand-green mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Salud pública</h3>
            <p className="text-brand-dark/70">Una colonia controlada y sana es un beneficio para todo el vecindario, controlando plagas de forma natural.</p>
          </div>
          <div className="p-6">
            <Users className="w-12 h-12 text-brand-green mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Convivencia</h3>
            <p className="text-brand-dark/70">Reducimos los ruidos por celo y marcajes, mejorando la convivencia entre vecinos y felinos.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
