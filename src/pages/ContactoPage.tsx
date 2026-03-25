import { Contacto } from '../components/Contacto';
import { MessageCircle } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export function ContactoPage() {
  const { getContent } = useContent();
  const pageContent = getContent('contacto_page', {
    title: 'Contacta con nosotros',
    text: '¿Tienes dudas sobre cómo colaborar o necesitas asesoramiento técnico? Estamos aquí para ayudarte.'
  });

  return (
    <div className="pt-28 pb-16 md:pt-32 md:pb-20 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 text-brand-green font-bold tracking-wider uppercase text-sm mb-4 bg-brand-green/10 px-4 py-2 rounded-full">
            <MessageCircle className="w-4 h-4" /> Centro de Ayuda
          </p>
          {pageContent.title && (
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-brand-dark">
              {pageContent.title}
            </h1>
          )}
          {pageContent.text && (
            <p className="text-brand-dark/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {pageContent.text}
            </p>
          )}
        </div>

        {/* Page Header Image */}
        {pageContent.image && (
          <div className="max-w-5xl mx-auto mb-16 px-4">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-brand-light/10 aspect-[21/9]">
              <img 
                src={pageContent.image} 
                alt={pageContent.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/10 to-transparent"></div>
            </div>
          </div>
        )}
      </div>
      <Contacto />
    </div>
  );
}
