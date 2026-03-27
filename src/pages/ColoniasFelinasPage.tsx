import { Heart, Shield, Users, HelpCircle, Type } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { getFileUrl } from '../services/api';

export function ColoniasFelinasPage() {
  const { getContent } = useContent();
  const pageContent = getContent('colonias_page', {
    title: 'Intervención y apoyo para las colonias felinas de Madrid',
    text: 'En DOGCAT Madrid centramos nuestros esfuerzos en el terreno, respaldando de forma integral a las gestoras de colonias.',
    image: '/uploads/cat_colony.webp',
    cer_title: 'Nuestro apoyo al método C.E.R.',
    cer_text: 'Facilitamos los recursos necesarios para que las gestoras de Madrid puedan aplicar el método C.E.R. (Captura, Esterilización y Retorno) con garantías de éxito.',
    cer_step1_icon: 'C',
    cer_step1_title: 'C: Captura y Material',
    cer_step1_text: 'Donamos jaulas trampa y transportines especializados para que el proceso de captura sea seguro y respetuoso con el animal.',
    cer_step2_icon: 'E',
    cer_step2_title: 'E: Esterilización y Veterinaria',
    cer_step2_text: 'Abonamos directamente las facturas de esterilización, vacunación e identificación en centros clínicos colaboradores.',
    cer_step3_icon: 'R',
    cer_step3_title: 'R: Retorno y Alimentación',
    cer_step3_text: 'Tras el retorno a su colonia, seguimos apoyando a las alimentadoras mediante la donación periódica de pienso y comida húmeda.',
    donations_title: '¿A dónde va tu donativo?',
    donations_text: 'No recibimos ayudas públicas suficientes. Tu solidaridad nos permite seguir enviando alimento y pagando facturas veterinarias para salvaguardar a los gatos de Madrid.',
    // Dynamic Needs
    n1_icon: 'LifeBuoy', n1_title: 'Material de captura', n1_text: 'Jaulas trampa y transportines para rescates seguros.',
    n2_icon: 'Stethoscope', n2_title: 'Atención veterinaria', n2_text: 'Esterilizaciones, vacunas y curas de urgencia.',
    n3_icon: 'Fish', n3_title: 'Alimentación diaria', n3_text: 'Pienso y comida húmeda para mantenerlos fuertes.',
    n4_icon: 'Home', n4_title: 'Refugios de invierno', n4_text: 'Casetas para protegerlos del frío y la lluvia.',
    // Dynamic Benefits
    b1_icon: 'Heart', b1_title: 'Bienestar animal', b1_text: 'Mejoramos la salud de los gatos, evitando peleas, enfermedades y camadas indeseadas.',
    b2_icon: 'Shield', b2_title: 'Salud pública', b2_text: 'Una colonia controlada y sana es un beneficio para todo el vecindario.',
    b3_icon: 'Users', b3_title: 'Convivencia', b3_text: 'Reducimos los ruidos y marcajes, mejorando la convivencia vecinal.'
  });

  const getLucideIcon = (name: string) => {
    if (!name) return HelpCircle;
    const Icon = (LucideIcons as any)[name] || HelpCircle;
    return Icon;
  };

  const renderIcon = (iconName: string, className: string = "w-8 h-8") => {
    if (!iconName) return <HelpCircle className={className} />;
    
    if (iconName.length <= 2) {
      return <span className="font-black text-lg">{iconName}</span>;
    }

    const Icon = getLucideIcon(iconName);
    return <Icon className={className} />;
  };

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
                src={getFileUrl(pageContent.image)} 
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
                {[1, 2, 3].map(step => (
                  pageContent[`cer_step${step}_title`] && (
                    <li key={step} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-green text-brand-dark flex items-center justify-center font-black shadow-md">
                        {renderIcon(pageContent[`cer_step${step}_icon`], "w-5 h-5")}
                      </div>
                      <div>
                        <strong className="block text-lg">{pageContent[`cer_step${step}_title`]}</strong>
                        {pageContent[`cer_step${step}_text`] && <span className="text-brand-dark/70">{pageContent[`cer_step${step}_text`]}</span>}
                      </div>
                    </li>
                  )
                ))}
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
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green/20 text-brand-green mb-4">
                    {renderIcon(pageContent[`n${num}_icon`])}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{pageContent[`n${num}_title`]}</h3>
                  <p className="text-sm text-brand-dark/70 font-medium">{pageContent[`n${num}_text`]}</p>
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
          {[1, 2, 3].map(num => (
            <div key={num} className="p-6">
              <div className="text-brand-green mx-auto mb-4 flex justify-center">
                {renderIcon(pageContent[`b${num}_icon`], "w-12 h-12")}
              </div>
              <h3 className="font-bold text-xl mb-2">{pageContent[`b${num}_title`]}</h3>
              <p className="text-brand-dark/70 font-medium">{pageContent[`b${num}_text`]}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
