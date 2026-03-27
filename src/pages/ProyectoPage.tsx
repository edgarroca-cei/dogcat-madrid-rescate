import { ArrowRight, Sparkles, Type, CheckCircle2, Edit3, Image as ImageIcon, Upload, FileText, Layout, Eye, EyeOff, ArrowUp, ArrowDown, HelpCircle, Save, Smartphone, Globe, ChevronDown, ChevronRight, Search, Ambulance, ExternalLink, ShieldAlert, Mail, Phone, MessageCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { getFileUrl } from '../services/api';

export function ProyectoPage() {
  const { getContent } = useContent();
  const pageContent = getContent('proyecto_page', {
    title: 'Proyecto Dogcat Rescate',
    text: 'Un proyecto técnico de bienestar animal diseñado para dar respuesta profesional a emergencias. Buscamos los recursos para hacerlo realidad.',
    image: 'https://images.pexels.com/photos/9000185/pexels-photo-9000185.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp',
    fleet_img1: '/uploads/Gemini_Generated_Image_g04w14g04w14g04w.png',
    fleet_img2: '/uploads/Gemini_Generated_Image_plysslplysslplys.png',
    areas_title: 'Nuestras áreas de actuación',
    areas_text: 'Nuestra estructura y protocolos están definidos y listos para implementarse en cuanto dispongamos de la financiación necesaria.',
    fleet_title: 'Flota de rescate: el motor del proyecto',
    fleet_text: 'El diseño del proyecto integra vehículos especialmente rotulados y adaptados para el transporte seguro de animales y material de rescate. Estas unidades móviles son el eje operativo de nuestras intervenciones.',
    fleet_extra_text: 'Su equipamiento está planteado para ofrecer una primera respuesta en el lugar de la emergencia y asegurar que el traslado a las clínicas veterinarias se realice en condiciones óptimas de seguridad y bienestar.',
    fleet_b1: 'Transporte climatizado y seguro',
    fleet_b2: 'Equipamiento de captura profesional',
    fleet_b3: 'Rotulación oficial de DOGCAT Madrid',
    cta_title: 'Ayúdanos a hacerlo realidad',
    cta_text: 'Este proyecto es un concepto técnico listo para ejecutarse. Buscamos el apoyo y la financiación necesaria para poner en marcha estas unidades y empezar a salvar vidas.',
    cta_email: 'dogcatmadrid@gmail.com',
    cta_phone: '687309639',
    cta_whatsapp: '34687309639',
    area1_title: 'Emergencias y rescates',
    area1_text: 'Intervención rápida y profesional en situaciones de riesgo, accidentes o abandono, garantizando la seguridad del animal.',
    area1_icon: 'ShieldAlert',
    area2_title: 'Gestión de colonias',
    area2_text: 'Apoyo logístico y técnico en la captura, esterilización y retorno (CER) de gatos ferales, mejorando su calidad de vida.',
    area2_icon: 'HeartHandshake',
    area3_title: 'Apoyo a cuidadores',
    area3_text: 'Asistencia directa a las personas que dedican su tiempo y recursos a cuidar de los animales en situación de vulnerabilidad.',
    area3_icon: 'Users'
  });

  const getLucideIcon = (name: string) => {
    if (!name) return HelpCircle;
    const Icon = (LucideIcons as any)[name] || HelpCircle;
    return Icon;
  };

  const renderIcon = (iconName: string, className: string = "w-7 h-7") => {
    if (!iconName) return <HelpCircle className={className} />;
    
    if (iconName.length <= 2) {
      return <span className="font-black text-lg">{iconName}</span>;
    }

    const Icon = getLucideIcon(iconName);
    return <Icon className={className} />;
  };

  // Scroll to top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lógica para el panel de control (Dashboard)
  const homeSections = getContent('home_sections', { hidden: [] });
  const mostrarProyectoFuturo = !homeSections.hidden.includes('Proyecto');

  const areasActuacion = [1, 2, 3].map(num => ({
    titulo: pageContent[`area${num}_title`],
    descripcion: pageContent[`area${num}_text`],
    icono: renderIcon(pageContent[`area${num}_icon`]),
  })).filter(a => a.titulo);

  return (
    <main className="bg-brand-dark min-h-screen text-brand-light pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          {pageContent.badge && (
            <p className="inline-flex items-center gap-2 text-brand-green font-bold tracking-wider uppercase text-sm mb-4 bg-brand-green/10 px-4 py-2 rounded-full">
              {renderIcon(pageContent.badge_icon || 'ShieldAlert', "w-4 h-4")} 
              {pageContent.badge}
            </p>
          )}
          {pageContent.title && (
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {pageContent.title}
            </h1>
          )}
          {pageContent.text && (
            <p className="text-brand-light/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {pageContent.text}
            </p>
          )}
        </div>
      </div>

      {/* Main Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-brand-light/10">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent z-10"></div>
          <img 
            src={getFileUrl(pageContent.image)} 
            alt="Gato rescatado descansando tranquilamente" 
            loading="lazy"
            decoding="async"
            width={1200}
            height={400}
            className="w-full h-[300px] md:h-[400px] object-cover transition-opacity duration-500"
          />
        </div>
      </div>

      {/* Áreas de Actuación */}
      {(pageContent.areas_title || pageContent.areas_text) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            {pageContent.areas_title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageContent.areas_title}</h2>}
            {pageContent.areas_text && (
              <p className="text-brand-light/70 max-w-2xl mx-auto text-lg">
                {pageContent.areas_text}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {areasActuacion.map((area, index) => (
              <div key={index} className="bg-brand-cream/5 rounded-3xl p-8 border border-brand-light/10 hover:bg-brand-cream/10 transition-colors">
                <div className="w-14 h-14 bg-brand-green rounded-2xl flex items-center justify-center mb-6 text-brand-dark">
                  {area.icono}
                </div>
                <h3 className="text-2xl font-bold mb-4">{area.titulo}</h3>
                <p className="text-brand-light/70 leading-relaxed">
                  {area.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Unidades Móviles (Trucks Placeholder) - Condicional para el Panel de Control */}
      {mostrarProyectoFuturo && (pageContent.fleet_title || pageContent.fleet_text) && (
        <div className="bg-brand-cream text-brand-dark py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-4 md:gap-6 mb-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-green/20 rounded-2xl flex items-center justify-center shrink-0">
                    <Ambulance className="w-7 h-7 md:w-8 md:h-8 text-brand-green" />
                  </div>
                  {pageContent.fleet_title && (
                    <h2 className="text-3xl md:text-4xl font-bold">
                      {pageContent.fleet_title}
                    </h2>
                  )}
                </div>
                {pageContent.fleet_text && (
                  <p className="text-lg leading-relaxed mb-6 text-brand-dark/80">
                    {pageContent.fleet_text}
                  </p>
                )}
                {pageContent.fleet_extra_text && (
                  <p className="text-lg leading-relaxed mb-8 text-brand-dark/80">
                    {pageContent.fleet_extra_text}
                  </p>
                )}
                <ul className="space-y-4 font-medium">
                  {pageContent.fleet_b1 && (
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-brand-dark shrink-0">✓</div>
                      {pageContent.fleet_b1}
                    </li>
                  )}
                  {pageContent.fleet_b2 && (
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-brand-dark shrink-0">✓</div>
                      {pageContent.fleet_b2}
                    </li>
                  )}
                  {pageContent.fleet_b3 && (
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-brand-dark shrink-0">✓</div>
                      {pageContent.fleet_b3}
                    </li>
                  )}
                </ul>
              </div>
              
              {/* Image Gallery Placeholders for Trucks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-200 shadow-xl">
                  <img 
                    src={getFileUrl(pageContent.fleet_img1)} 
                    alt="Unidad móvil 1" 
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-200 shadow-xl sm:mt-12">
                  <img 
                    src={getFileUrl(pageContent.fleet_img2)} 
                    alt="Unidad móvil 2" 
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="bg-brand-green/10 border border-brand-green/20 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-green/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-brand-green/20 rounded-full blur-3xl"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">
            {pageContent.cta_title || 'Ayúdanos a hacerlo realidad'}
          </h2>
          <p className="text-lg md:text-xl mb-10 text-brand-light/80 relative z-10 max-w-2xl mx-auto">
            {pageContent.cta_text || 'Buscamos voluntarios, instituciones y empresas colaboradoras que quieran aportar los recursos necesarios para poner en marcha este proyecto vital.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            {pageContent.cta_email && (
              <a 
                href={`mailto:${pageContent.cta_email}`} 
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand-green text-brand-dark rounded-full font-bold hover:bg-white transition-colors text-lg"
              >
                <Mail className="w-5 h-5" />
                Correo electrónico
              </a>
            )}
            {pageContent.cta_phone && (
              <a 
                href={`tel:+34${pageContent.cta_phone}`} 
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand-green text-brand-dark rounded-full font-bold hover:bg-white transition-colors text-lg"
              >
                <Phone className="w-5 h-5" />
                Teléfono
              </a>
            )}
            {pageContent.cta_whatsapp && (
              <a 
                href={`https://wa.me/${pageContent.cta_whatsapp}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand-green text-brand-dark rounded-full font-bold hover:bg-white transition-colors text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
