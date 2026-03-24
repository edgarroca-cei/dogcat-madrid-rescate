import { ArrowRight, Building2, Handshake, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Proyecto() {
  return (
    <section id="proyecto" className="py-12 md:py-16 bg-brand-dark text-brand-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Wide Card */}
        <div className="bg-brand-green text-brand-dark rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center relative overflow-hidden shadow-2xl">
          
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000" 
              alt="Fondo perros" 
              loading="lazy"
              className="w-full h-full object-cover mix-blend-multiply"
            />
          </div>

          {/* Left Column: Text & CTA */}
          <div className="lg:w-5/12 relative z-10 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.1] mb-4">
              Proyecto <br className="hidden lg:block" />Dogcat <br className="hidden lg:block" />Rescate
            </h2>
            <p className="text-brand-dark/80 font-medium mb-6 max-w-md mx-auto lg:mx-0 text-sm md:text-base">
              Buscamos alianzas para expandir nuestra infraestructura y llevar nuestra capacidad de respuesta al siguiente nivel.
            </p>
            <Link 
              to="/proyecto" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-dark text-brand-light rounded-full font-bold hover:bg-black transition-all transform hover:scale-105"
            >
              Conocer el proyecto <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Column: Compact Features Grid */}
          <div className="lg:w-7/12 relative z-10 grid sm:grid-cols-2 gap-3 md:gap-4 w-full">
            
            {/* Feature 1 */}
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 hover:bg-white/40 transition-colors">
              <Truck className="w-6 h-6 mb-3 text-brand-dark" />
              <h3 className="font-bold mb-1 text-base">Flota de rescate</h3>
              <p className="text-xs md:text-sm text-brand-dark/80 leading-snug">
                Vehículos adaptados para transporte seguro y material de captura.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 hover:bg-white/40 transition-colors">
              <Building2 className="w-6 h-6 mb-3 text-brand-dark" />
              <h3 className="font-bold mb-1 text-base">Infraestructura</h3>
              <p className="text-xs md:text-sm text-brand-dark/80 leading-snug">
                Instalaciones temporales para cuarentenas y recuperación.
              </p>
            </div>

            {/* Feature 3 (Spans 2 columns on small screens) */}
            <div className="sm:col-span-2 bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 hover:bg-white/40 transition-colors flex items-center gap-4">
              <Handshake className="w-8 h-8 flex-shrink-0 text-brand-dark" />
              <div>
                <h3 className="font-bold mb-1 text-base">Alianzas corporativas</h3>
                <p className="text-xs md:text-sm text-brand-dark/80 leading-snug">
                  Colaboraciones mediante patrocinios, cesiones de material o donaciones con beneficios fiscales.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
