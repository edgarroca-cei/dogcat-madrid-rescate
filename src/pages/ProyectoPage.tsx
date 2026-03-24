import { ArrowRight, ShieldAlert, HeartHandshake, Truck, Users, Phone, Mail, MessageCircle, Ambulance } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function ProyectoPage() {
  // Scroll to top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-brand-dark min-h-screen text-brand-light pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 text-brand-green font-bold tracking-wider uppercase text-sm mb-4 bg-brand-green/10 px-4 py-2 rounded-full">
            <ShieldAlert className="w-4 h-4" /> Proyecto en desarrollo
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Proyecto <span className="text-brand-green">Dogcat Rescate</span>
          </h1>
          <p className="text-brand-light/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Un proyecto integral de bienestar y protección animal diseñado para dar respuesta profesional a emergencias. Con la estructura y protocolos ya definidos, buscamos los recursos y el apoyo institucional para ponerlo en marcha.
          </p>
        </div>
      </div>

      {/* Main Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-brand-light/10">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent z-10"></div>
          <img 
            src="https://images.pexels.com/photos/9000185/pexels-photo-9000185.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp" 
            alt="Gato rescatado descansando tranquilamente" 
            fetchPriority="high"
            width={1200}
            height={400}
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
        </div>
      </div>

      {/* Áreas de Actuación */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestras áreas de actuación</h2>
          <p className="text-brand-light/70 max-w-2xl mx-auto text-lg">
            Nuestra estructura, unidades y protocolos están completamente definidos y listos para implementarse en cuanto dispongamos de la financiación necesaria.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-brand-cream/5 rounded-3xl p-8 border border-brand-light/10 hover:bg-brand-cream/10 transition-colors">
            <div className="w-14 h-14 bg-brand-green rounded-2xl flex items-center justify-center mb-6 text-brand-dark">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Emergencias y rescates</h3>
            <p className="text-brand-light/70 leading-relaxed">
              Intervención rápida y profesional en situaciones de riesgo, accidentes o abandono, garantizando la seguridad del animal y su traslado seguro a centros veterinarios.
            </p>
          </div>

          <div className="bg-brand-cream/5 rounded-3xl p-8 border border-brand-light/10 hover:bg-brand-cream/10 transition-colors">
            <div className="w-14 h-14 bg-brand-green rounded-2xl flex items-center justify-center mb-6 text-brand-dark">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Gestión de colonias</h3>
            <p className="text-brand-light/70 leading-relaxed">
              Apoyo logístico y técnico en la captura, esterilización y retorno (CER) de gatos ferales, mejorando su calidad de vida y controlando la población de forma ética.
            </p>
          </div>

          <div className="bg-brand-cream/5 rounded-3xl p-8 border border-brand-light/10 hover:bg-brand-cream/10 transition-colors">
            <div className="w-14 h-14 bg-brand-green rounded-2xl flex items-center justify-center mb-6 text-brand-dark">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Apoyo a cuidadores</h3>
            <p className="text-brand-light/70 leading-relaxed">
              Asistencia directa a las personas que dedican su tiempo y recursos a cuidar de los animales en situación de vulnerabilidad, ofreciendo formación y recursos.
            </p>
          </div>
        </div>
      </div>

      {/* Unidades Móviles (Trucks Placeholder) */}
      <div className="bg-brand-cream text-brand-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 md:gap-6 mb-6">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-green/20 rounded-2xl flex items-center justify-center shrink-0">
                  <Ambulance className="w-7 h-7 md:w-8 md:h-8 text-brand-green" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Flota de rescate: el motor <br /> del proyecto
                </h2>
              </div>
              <p className="text-lg leading-relaxed mb-6 text-brand-dark/80">
                El diseño del proyecto integra vehículos especialmente rotulados y adaptados para el transporte seguro de animales y material de rescate. Estas unidades móviles son el eje operativo de nuestras intervenciones.
              </p>
              <p className="text-lg leading-relaxed mb-8 text-brand-dark/80">
                Su equipamiento está planteado para ofrecer una primera respuesta en el lugar de la emergencia y asegurar que el traslado a las clínicas veterinarias se realice en condiciones óptimas de seguridad y bienestar.
              </p>
              <ul className="space-y-4 font-medium">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-brand-dark">✓</div>
                  Transporte climatizado y seguro
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-brand-dark">✓</div>
                  Equipamiento de captura profesional
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-brand-dark">✓</div>
                  Rotulación oficial de DOGCAT Madrid
                </li>
              </ul>
            </div>
            
            {/* Image Gallery Placeholders for Trucks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-200 shadow-xl">
                <img 
                  src="/Gemini_Generated_Image_g04w14g04w14g04w.png" 
                  alt="Unidad móvil 1" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-200 shadow-xl sm:mt-12">
                <img 
                  src="/Gemini_Generated_Image_plysslplysslplys.png" 
                  alt="Unidad móvil 2" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="bg-brand-green/10 border border-brand-green/20 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-green/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-brand-green/20 rounded-full blur-3xl"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Ayúdanos a hacerlo realidad</h2>
          <p className="text-lg md:text-xl mb-10 text-brand-light/80 relative z-10 max-w-2xl mx-auto">
            Buscamos voluntarios, instituciones y empresas colaboradoras que quieran aportar los recursos necesarios para poner en marcha este proyecto vital.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <a 
              href="mailto:dogcatmadrid@gmail.com" 
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand-green text-brand-dark rounded-full font-bold hover:bg-white transition-colors text-lg"
            >
              <Mail className="w-5 h-5" />
              Correo electrónico
            </a>
            <a 
              href="tel:+34687309639" 
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand-green text-brand-dark rounded-full font-bold hover:bg-white transition-colors text-lg"
            >
              <Phone className="w-5 h-5" />
              Teléfono
            </a>
            <a 
              href="https://wa.me/34687309639" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand-green text-brand-dark rounded-full font-bold hover:bg-white transition-colors text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
