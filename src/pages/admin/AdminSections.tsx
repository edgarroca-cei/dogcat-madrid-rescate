import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useContent } from '../../contexts/ContentContext';
import * as LucideIcons from 'lucide-react';
import { 
  Layout, ArrowUp, ArrowDown, Eye, EyeOff, Save, CheckCircle2, 
  AlertCircle, Edit3, ChevronDown, ChevronUp,
  Image as ImageIcon, Upload, Sparkles, Heart, FileText,
  ShieldAlert, Type, Ambulance, Settings, HelpCircle,
  Mail, Phone, MessageCircle, Globe, X
} from 'lucide-react';

const DEFAULTS: any = {
  hero: {
    badge: 'ONG de rescate animal en Madrid',
    title: 'Tu donativo tiene un impacto directo y real',
    text: 'Nuestra labor se desarrolla en los distintos distritos de Madrid, respaldando a quienes velan por el bienestar felino los 365 días del año. Tu aportación se transforma de manera inmediata en alimento, atención veterinaria de urgencia y material de captura ético.',
    buttonText: 'Donar ahora',
    image: '/uploads/dog_cat_hero.png'
  },
  colonias_section: {
    badge: 'Donaciones y recursos',
    title: 'Apoyo económico para las colonias',
    text: 'Actuamos como motor de ayuda para alimentadoras y asociaciones de Madrid. Canalizamos tu solidaridad mediante la donación directa de alimento, financiación de gastos veterinarios y suministro de material especializado.',
    image: '/uploads/cat_colony.jpg'
  },
  proyecto_section: {
    badge: 'Visión integral',
    title: 'Proyecto Dogcat Rescate',
    text: 'Buscamos alianzas para expandir nuestra infraestructura y llevar nuestra capacidad de respuesta al siguiente nivel.',
    buttonText: 'Ver detalles proyecto',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000',
    f1_icon: 'Truck',
    f1_title: 'Flota de rescate',
    f1_text: 'Vehículos adaptados para transporte seguro y material de captura.',
    f2_icon: 'Building2',
    f2_title: 'Infraestructura',
    f2_text: 'Instalaciones temporales para cuarentenas y recuperación.',
    f3_icon: 'Handshake',
    f3_title: 'Alianzas corporativas',
    f3_text: 'Colaboraciones mediante patrocinios, cesiones de material o donaciones.'
  },
  colonias_page: {
    title: 'Intervención y apoyo para las colonias felinas de Madrid',
    text: 'En DOGCAT Madrid centramos nuestros esfuerzos en el terreno, respaldando de forma integral a las gestoras de colonias.',
    image: '/uploads/cat_colony.jpg',
    cer_title: 'Nuestro apoyo al método C.E.R.',
    cer_text: 'Facilitamos los recursos necesarios para que las gestoras de Madrid puedan aplicar el método C.E.R. (Captura, Esterilización y Retorno) con garantías de éxito.',
    cer_step1_title: 'Captura y Material',
    cer_step1_text: 'Donamos jaulas trampa y transportines especializados para que el proceso de captura sea seguro y respetuoso con el animal.',
    cer_step1_icon: 'C',
    cer_step2_title: 'Esterilización y Veterinaria',
    cer_step2_text: 'Abonamos directamente las facturas de esterilización, vacunación e identificación en centros clínicos colaboradores.',
    cer_step2_icon: 'E',
    cer_step3_title: 'Retorno y Alimentación',
    cer_step3_text: 'Tras el retorno a su colonia, seguimos apoyando a las alimentadoras mediante la donación periódica de pienso y comida húmeda.',
    cer_step3_icon: 'R',
    donations_title: '¿A dónde va tu donativo?',
    donations_text: 'No recibimos ayudas públicas suficientes. Dependemos de la solidaridad de personas como tú.',
    n1_icon: 'LifeBuoy', n1_title: 'Material de captura', n1_text: 'Jaulas trampa y transportines para rescates seguros.',
    n2_icon: 'Stethoscope', n2_title: 'Atención veterinaria', n2_text: 'Esterilizaciones, vacunas y curas de urgencia.',
    n3_icon: 'Fish', n3_title: 'Alimentación diaria', n3_text: 'Pienso y comida húmeda para mantenerlos fuertes.',
    n4_icon: 'Home', n4_title: 'Refugios de invierno', n4_text: 'Casetas para protegerlos del frío y la lluvia.',
    b1_icon: 'Heart', b1_title: 'Bienestar animal', b1_text: 'Mejoramos la salud de los gatos.',
    b2_icon: 'Shield', b2_title: 'Salud pública', b2_text: 'Una colonia controlada y sana es un beneficio.',
    b3_icon: 'Users', b3_title: 'Convivencia', b3_text: 'Reducimos los ruidos por celo y marcajes.'
  },
  proyecto_page: {
    title: 'Proyecto Dogcat Rescate',
    text: 'Un proyecto integral de bienestar y protección animal diseñado para dar respuesta profesional a emergencias.',
    image: 'https://images.pexels.com/photos/9000185/pexels-photo-9000185.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fleet_title: 'Flota de rescate: el motor del proyecto',
    fleet_text: 'El diseño del proyecto integra vehículos especialmente rotulados y adaptados para el transporte seguro de animales.',
    areas_title: 'Nuestras áreas de actuación',
    areas_text: 'Nuestra estructura, unidades y protocolos están completamente definidos y listos para implementarse.',
    area1_title: 'Emergencias y rescates',
    area1_text: 'Intervención rápida y profesional en situaciones de riesgo.',
    area1_icon: 'ShieldAlert',
    area2_title: 'Gestión de colonias',
    area2_text: 'Apoyo logístico y técnico en la captura, esterilización y retorno.',
    area2_icon: 'HeartHandshake',
    area3_title: 'Apoyo a cuidadores',
    area3_text: 'Asistencia directa a las personas que cuidan de los animales.',
    area3_icon: 'Users',
    fleet_extra_text: 'Equipamiento planteado para ofrecer una primera respuesta en el lugar de la emergencia.',
    fleet_b1: 'Transporte climatizado y seguro',
    fleet_b2: 'Equipamiento de captura profesional',
    fleet_b3: 'Rotulación oficial de DOGCAT Madrid',
    fleet_img1: '/uploads/Gemini_Generated_Image_g04w14g04w14g04w.png',
    fleet_img2: '/uploads/Gemini_Generated_Image_plysslplysslplys.png',
    cta_title: 'Ayúdanos a hacerlo realidad',
    cta_text: 'Este proyecto es un concepto técnico listo para ejecutarse.',
    cta_email: 'dogcatmadrid@gmail.com',
    cta_phone: '687309639',
    cta_whatsapp: '34687309639'
  },
  recursos_page: {
    title: 'Recursos para Gestoras',
    text: 'Ponemos a tu disposición guías, normativas y herramientas para facilitar la gestión ética de colonias.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2000'
  },
  blog_page: {
    title: 'Noticias y Actualidad',
    text: 'Sigue de cerca nuestra labor, rescates y casos de éxito del día a día.',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=2000'
  },
  contacto_page: {
    title: 'Contacta con nosotros',
    text: '¿Tienes dudas sobre cómo colaborar o necesitas asesoramiento técnico? Estamos aquí para ayudarte.',
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=2000'
  },
  general: {
    siteName: 'DOGCAT Madrid',
    donationButton: 'Donar ahora',
    footerCopyright: 'Todos los derechos reservados.',
    contact_email_notifications: 'dogcatmadrid@gmail.com'
  }
};

const SECTION_METADATA: any = {
  Hero: { id: 'hero', icon: Sparkles, color: 'text-brand-green' },
  Colonias: { id: 'colonias_section', icon: Heart, color: 'text-red-500' },
  Proyecto: { id: 'proyecto_section', icon: ShieldAlert, color: 'text-blue-500' },
  Blog: { id: 'blog_section', icon: FileText, color: 'text-orange-500' },
  Recursos: { id: 'recursos_page', icon: Globe, color: 'text-purple-500' },
  Contacto: { id: 'contacto_page', icon: Mail, color: 'text-brand-green' },
};

type TabId = 'inicio' | 'colonias' | 'proyecto' | 'recursos' | 'blog' | 'contacto' | 'configuracion';

const TABS: { id: TabId, name: string }[] = [
  { id: 'inicio', name: 'Inicio' },
  { id: 'colonias', name: 'Colonias Felinas' },
  { id: 'proyecto', name: 'DOGCAT Rescate' },
  { id: 'recursos', name: 'Recursos' },
  { id: 'blog', name: 'Blog' },
  { id: 'contacto', name: 'Contacto' },
  { id: 'configuracion', name: 'Configuración' },
];

export function AdminSections() {
  const { content, loading, refreshContent } = useContent();
  const [sectionsConfig, setSectionsConfig] = useState<{ order: string[], hidden: string[] }>({
    order: ['Hero', 'Colonias', 'Proyecto', 'Blog'],
    hidden: []
  });
  const [localContent, setLocalContent] = useState<any>({});
  const [activeTab, setActiveTab] = useState<TabId>('inicio');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const merged: any = {};
    Object.keys(DEFAULTS).forEach(key => {
      merged[key] = { ...DEFAULTS[key] };
    });
    Object.keys(content).forEach(key => {
      if (key === 'home_sections' && content[key]) {
        setSectionsConfig(content[key]);
      } else if (key !== 'home_sections') {
        merged[key] = { ...merged[key], ...content[key] };
      }
    });
    setLocalContent(merged);
  }, [content]);

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...sectionsConfig.order];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newOrder.length) return;
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    setSectionsConfig({ ...sectionsConfig, order: newOrder });
  };

  const toggleVisibility = (sectionId: string) => {
    const newHidden = sectionsConfig.hidden.includes(sectionId)
      ? sectionsConfig.hidden.filter(id => id !== sectionId)
      : [...sectionsConfig.hidden, sectionId];
    setSectionsConfig({ ...sectionsConfig, hidden: newHidden });
  };

  const handleContentChange = (id: string, field: string, value: string) => {
    setLocalContent((prev: any) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleImageUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>, field: string = 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await api.uploadImage(file);
      handleContentChange(id, field, res.url);
      setMessage({ type: 'success', text: 'Imagen subida correctamente' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al subir la imagen' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveAll = async () => {
    if (isUploading) return;
    setSavingId('all');
    try {
      await api.saveSiteContent('home_sections', sectionsConfig);
      const ids = Object.keys(localContent);
      for (const id of ids) {
        await api.saveSiteContent(id, localContent[id]);
      }
      await refreshContent();
      setMessage({ type: 'success', text: 'Toda la configuración guardada' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Error saving content:", err);
      setMessage({ type: 'error', text: 'Error al conectar con el servidor' });
    } finally {
      setSavingId(null);
    }
  };

  const getLucideIcon = (name: string) => {
    if (!name) return null;
    if ((LucideIcons as any)[name]) return (LucideIcons as any)[name];
    const pascalName = name.replace(/[-_ ]+/g, ' ').split(' ').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
    if ((LucideIcons as any)[pascalName]) return (LucideIcons as any)[pascalName];
    return null;
  };

  const DYNAMIC_DEFAULTS: Record<string, string> = {
    title: 'Proyecto Dogcat Rescate',
    text: 'Un proyecto técnico de bienestar animal diseñado para dar respuesta profesional a emergencias.',
    areas_title: 'Nuestras áreas de actuación',
    areas_text: 'Nuestra estructura y protocolos están definidos y listos para implementarse.',
    fleet_title: 'Flota de rescate: el motor del proyecto',
    fleet_text: 'El diseño del proyecto integra vehículos especialmente rotulados y adaptados.',
    fleet_extra_text: 'Su equipamiento está planteado para ofrecer una primera respuesta en el lugar de la emergencia.',
    fleet_b1: 'Transporte climatizado y seguro',
    fleet_b2: 'Equipamiento de captura profesional',
    fleet_b3: 'Rotulación oficial de DOGCAT Madrid',
    cta_title: 'Ayúdanos a hacerlo realidad',
    cta_text: 'Este proyecto es un concepto técnico listo para ejecutarse.',
    area1_title: 'Emergencias y rescates',
    area1_text: 'Intervención rápida y profesional.',
    area1_icon: 'ShieldAlert',
    area2_title: 'Gestión de colonias',
    area2_text: 'Apoyo logístico y técnico.',
    area2_icon: 'HeartHandshake',
    area3_title: 'Apoyo a cuidadores',
    area3_text: 'Asistencia directa a las personas.',
    area3_icon: 'Users',
    badge_icon: 'ShieldAlert',
    cta_email: 'dogcatmadrid@gmail.com',
    cta_phone: '687309639',
    cta_whatsapp: '34687309639',
    contact_email: 'dogcatmadrid@gmail.com',
    contact_phone: '687309639',
    contact_whatsapp: '34687309639',
    contact_facebook: 'https://www.facebook.com/people/Fer-Hidalgo-ayudas-colonias-felinas-Dogcat-Madrid/100077417127229/',
    contact_instagram: '',
    socialFacebook: 'https://www.facebook.com/people/Fer-Hidalgo-ayudas-colonias-felinas-Dogcat-Madrid/100077417127229/',
    socialInstagram: '',
    image: '/uploads/cat_colony.jpg'
  };

  const renderField = (id: string, field: string, label: string, type: 'text' | 'textarea' = 'text', icon: any = Type, max: number = 100) => {
    const data = localContent[id] || {};
    const value = data[field] !== undefined ? data[field] : (DYNAMIC_DEFAULTS[field] || '');
    const Icon = icon;
    const length = value.length;
    
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center gap-4">
          <label className="text-xs font-black text-brand-dark/40 uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
            <Icon className="w-3 h-3" /> {label}
          </label>
          <span className={`text-[10px] font-bold ${length > max * 0.9 ? 'text-red-500' : 'text-brand-dark/30'} whitespace-nowrap`}>
            {length}/{max}
          </span>
        </div>
        {type === 'text' ? (
          <div className="space-y-2">
            <div className="relative">
              <input
                type="text"
                maxLength={max}
                className={`w-full ${field.endsWith('_icon') ? 'pl-12 font-mono' : 'px-4 font-semibold'} py-3 rounded-xl bg-white border border-brand-light/20 focus:ring-4 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all text-brand-dark`}
                value={value}
                onChange={(e) => handleContentChange(id, field, e.target.value)}
                placeholder={field.endsWith('_icon') ? 'Ej: Heart, Truck...' : ''}
              />
              {field.endsWith('_icon') && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-brand-cream border border-brand-light/10 flex items-center justify-center text-brand-dark shadow-sm">
                  {(() => {
                    const PreviewIcon = getLucideIcon(value);
                    if (PreviewIcon) return <PreviewIcon className="w-5 h-5 transition-all" />;
                    return <HelpCircle className="w-4 h-4 opacity-10" />;
                  })()}
                </div>
              )}
            </div>
          </div>
        ) : (
          <textarea
            rows={4}
            maxLength={max}
            className="w-full px-4 py-3 rounded-xl bg-white border border-brand-light/20 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all resize-none text-brand-dark/80"
            value={value}
            onChange={(e) => handleContentChange(id, field, e.target.value)}
          />
        )}
      </div>
    );
  };

  const renderSectionEditor = (id: string) => {
    const data = localContent[id] || {};
    
    const renderBlock = (title: string, subtitle: string, icon: any, color: string, children: React.ReactNode) => {
      const Icon = icon;
      return (
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-brand-light/10 space-y-10 group hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
           <div className="flex items-center gap-6 border-b border-brand-light/5 pb-8">
              <div className={`p-4 rounded-2xl bg-brand-cream/5 shadow-sm ${color} transition-transform group-hover:scale-110`}>
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-black text-brand-dark uppercase tracking-tight text-3xl">{title}</h3>
                <p className="text-xs text-brand-dark/30 font-black uppercase tracking-[0.2em] mt-1">{subtitle}</p>
              </div>
            </div>
            <div className="pt-2">
              {children}
            </div>
        </div>
      );
    };

    const renderPageHeader = (title: string, icon: any) => {
       const Icon = icon;
       return (
          <div className="flex items-center justify-between px-8 py-2 mb-4">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-dark text-brand-green flex items-center justify-center shadow-lg">
                   <Icon className="w-6 h-6" />
                </div>
                <div>
                   <span className="font-black text-[10px] text-brand-dark/30 uppercase tracking-[0.3em]">Editor de Página</span>
                   <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tight">{title}</h2>
                </div>
             </div>
          </div>
       );
    };

    if (id === 'proyecto_page') {
      return (
        <div className="space-y-8 pb-10">
          {renderPageHeader('Proyecto Dogcat Rescate', LucideIcons.ShieldCheck)}
          
          {renderBlock('Cabecera de Página', 'Hero, Títulos e Imagen principal', LucideIcons.Sparkles, 'text-brand-green', (
             <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                   {renderField(id, 'badge', 'Etiqueta superior (Badge)', 'text', LucideIcons.Tag, 40)}
                   {renderField(id, 'badge_icon', 'Icono del Badge (Lucide)', 'text', LucideIcons.Sparkles, 25)}
                   {renderField(id, 'title', 'Título Principal', 'text', LucideIcons.Type, 80)}
                   {renderField(id, 'text', 'Descripción Sugerente', 'textarea', LucideIcons.Edit3, 350)}
                </div>
                <div className="space-y-4">
                    <p className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest px-2 text-center">Imagen de Portada</p>
                    <div className="relative group/up rounded-[2rem] overflow-hidden border border-brand-light/10 bg-brand-cream/10 aspect-video shadow-lg">
                       <img src={data.image || '/uploads/dog_cat_hero.png'} className="w-full h-full object-cover" alt="Preview"/>
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/up:opacity-100 bg-brand-dark/40 backdrop-blur-sm transition-all">
                          <label className="cursor-pointer bg-brand-green text-brand-dark px-6 py-3 rounded-full font-bold text-xs uppercase flex items-center gap-2 hover:scale-105 transition-all">
                             <LucideIcons.Upload className="w-4 h-4" /> Cambiar Imagen
                             <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(id, e)} />
                          </label>
                       </div>
                    </div>
                </div>
             </div>
          ))}

          {renderBlock('Áreas de Actuación', 'Misión, Objetivos y servicios', LucideIcons.Layout, 'text-blue-500', (
             <div className="space-y-10">
                <div className="grid lg:grid-cols-2 gap-10">
                   {renderField(id, 'areas_title', 'Título del Bloque de Áreas', 'text', LucideIcons.Type, 80)}
                   {renderField(id, 'areas_text', 'Descripción Introductoria', 'textarea', LucideIcons.Edit3, 350)}
                </div>
                <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                   {[1, 2, 3].map(area => (
                      <div key={area} className="bg-brand-cream/5 p-6 rounded-3xl border border-brand-light/10 space-y-6 shadow-sm hover:border-blue-500/30 transition-colors">
                         <div className="flex items-center justify-between border-b border-brand-light/5 pb-3">
                            <span className="text-[10px] font-black text-blue-500">ÁREA {area}</span>
                            <div className="w-20">{renderField(id, `area${area}_icon`, 'Icono', 'text', LucideIcons.Sparkles, 25)}</div>
                         </div>
                         {renderField(id, `area${area}_title`, 'Título Corto', 'text', LucideIcons.Type, 50)}
                         {renderField(id, `area${area}_text`, 'Descripción', 'textarea', LucideIcons.Edit3, 180)}
                      </div>
                   ))}
                </div>
             </div>
          ))}

          {renderBlock('Flota de Rescate', 'Unidades móviles y equipamiento', LucideIcons.Ambulance, 'text-purple-500', (
             <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                   {renderField(id, 'fleet_title', 'Título del Bloque Flota', 'text', LucideIcons.Type, 80)}
                   {renderField(id, 'fleet_text', 'Descripción Principal', 'textarea', LucideIcons.Edit3, 350)}
                   {renderField(id, 'fleet_extra_text', 'Texto Adicional / Equipamiento', 'textarea', LucideIcons.Edit3, 300)}
                   
                   <div className="pt-4 space-y-4">
                      <p className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest px-1">Puntos destacados</p>
                      {[1, 2, 3].map(b => (
                         <div key={b} className="bg-brand-cream/5 p-4 rounded-2xl border border-brand-light/10">
                            {renderField(id, `fleet_b${b}`, `Punto ${b}`, 'text', LucideIcons.CheckCircle2, 60)}
                         </div>
                      ))}
                   </div>
                </div>
                <div className="space-y-6">
                   <p className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest px-2 text-center text-brand-dark">Visualización del Proyecto</p>
                   <div className="grid grid-cols-2 gap-4">
                      {[1, 2].map(num => (
                         <div key={num} className="relative group/img rounded-[2rem] overflow-hidden bg-brand-cream/10 aspect-[3/4] border-2 border-white shadow-md">
                            <img src={data[`fleet_img${num}`] || (num === 1 ? '/uploads/Gemini_Generated_Image_g04w14g04w14g04w.png' : '/uploads/Gemini_Generated_Image_plysslplysslplys.png')} className="w-full h-full object-cover" alt="Preview"/>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 bg-brand-dark/40 backdrop-blur-sm transition-all">
                               <label className="cursor-pointer bg-white text-brand-dark px-4 py-2 rounded-full font-bold text-[10px] uppercase shadow-xl">
                                  Subir
                                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(id, e, `fleet_img${num}`)} />
                               </label>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          ))}

          {renderBlock('Llamada a la Acción', 'Contacto y botones finales', LucideIcons.Mail, 'text-brand-green', (
             <div className="space-y-10">
                <div className="grid lg:grid-cols-2 gap-10">
                   <div className="bg-brand-cream/5 p-6 rounded-3xl border border-brand-light/10">{renderField(id, 'cta_title', 'Título del CTA', 'text', LucideIcons.Type, 60)}</div>
                   <div className="bg-brand-cream/5 p-6 rounded-3xl border border-brand-light/10">{renderField(id, 'cta_text', 'Mensaje Final', 'textarea', LucideIcons.Edit3, 200)}</div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-brand-light/10 text-brand-dark">
                   {renderField(id, 'cta_email', 'Email de Contacto', 'text', LucideIcons.Mail, 50)}
                   {renderField(id, 'cta_phone', 'Teléfono (Sin prefijo)', 'text', LucideIcons.Phone, 20)}
                   {renderField(id, 'cta_whatsapp', 'WhatsApp (Con prefijo 34...)', 'text', LucideIcons.MessageCircle, 20)}
                </div>
             </div>
          ))}
        </div>
      );
    }

    if (id === 'colonias_page') {
      return (
        <div className="space-y-8 pb-10">
           {renderPageHeader('Colonias Felinas', LucideIcons.Heart)}

           {renderBlock('Cabecera de Página', 'Hero e imagen de colonias', LucideIcons.Heart, 'text-brand-green', (
              <div className="grid lg:grid-cols-2 gap-12">
                 <div className="space-y-6">
                    {renderField(id, 'title', 'Título Principal', 'text', LucideIcons.Type, 80)}
                    {renderField(id, 'text', 'Descripción Introductoria', 'textarea', LucideIcons.Edit3, 350)}
                 </div>
                 <div className="relative group/up rounded-[2rem] overflow-hidden border border-brand-light/10 bg-brand-cream/10 aspect-video shadow-lg">
                    <img src={data.image || '/uploads/cat_colony.jpg'} className="w-full h-full object-cover" alt="Preview"/>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/up:opacity-100 bg-brand-dark/40 backdrop-blur-sm transition-all">
                       <label className="cursor-pointer bg-brand-green text-brand-dark px-6 py-3 rounded-full font-bold text-xs uppercase flex items-center gap-2 hover:scale-105 transition-all">
                          <LucideIcons.Upload className="w-4 h-4" /> Cambiar Imagen
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(id, e)} />
                       </label>
                    </div>
                 </div>
              </div>
           ))}

           {renderBlock('Método C.E.R.', 'Captura, Esterilización y Retorno', LucideIcons.CheckCircle2, 'text-brand-green', (
              <div className="space-y-10">
                 <div className="grid lg:grid-cols-2 gap-10">
                    {renderField(id, 'cer_title', 'Título del Bloque CER', 'text', LucideIcons.Type, 60)}
                    {renderField(id, 'cer_text', 'Explicación del Método', 'textarea', LucideIcons.Edit3, 200)}
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    {[1, 2, 3].map(step => (
                       <div key={step} className="bg-brand-cream/5 p-6 rounded-3xl border border-brand-light/10 space-y-6 shadow-sm">
                          <div className="flex items-center justify-between border-b border-brand-light/5 pb-3">
                             <span className="w-8 h-8 rounded-full bg-brand-green text-brand-dark flex items-center justify-center font-black text-xs shadow-sm shadow-brand-green/20">
                                {['C', 'E', 'R'][step-1]}
                             </span>
                             <div className="w-20">{renderField(id, `cer_step${step}_icon`, 'Icono', 'text', LucideIcons.Sparkles, 25)}</div>
                          </div>
                          {renderField(id, `cer_step${step}_title`, 'Título Paso', 'text', LucideIcons.Type, 40)}
                          {renderField(id, `cer_step${step}_text`, 'Descripción', 'textarea', LucideIcons.Edit3, 140)}
                       </div>
                    ))}
                 </div>
              </div>
           ))}

           {renderBlock('Donativos', 'Recursos necesarios para colonias', LucideIcons.Package, 'text-red-500', (
              <div className="space-y-10">
                 <div className="grid lg:grid-cols-2 gap-10">
                    {renderField(id, 'donations_title', 'Título Bloque Donativos', 'text', LucideIcons.Type, 60)}
                    {renderField(id, 'donations_text', 'Mensaje de Ayuda', 'textarea', LucideIcons.Edit3, 180)}
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                    {[1, 2, 3, 4].map(num => (
                       <div key={num} className="bg-brand-cream/5 p-6 rounded-3xl border border-brand-light/10 space-y-5 shadow-sm">
                          <div className="flex items-center justify-between border-b border-brand-light/5 pb-3">
                             <LucideIcons.Package className="w-4 h-4 text-brand-dark/20" />
                             <div className="w-20">{renderField(id, `n${num}_icon`, 'Icono', 'text', LucideIcons.Sparkles, 25)}</div>
                          </div>
                          {renderField(id, `n${num}_title`, 'Título', 'text', LucideIcons.Type, 30)}
                          {renderField(id, `n${num}_text`, 'Descripción', 'text', LucideIcons.Edit3, 80)}
                       </div>
                    ))}
                 </div>
              </div>
           ))}
        </div>
      );
    }

    const standardFieldsConfig: Record<string, any[]>  = {
      hero: [
        { id: 'badge', label: 'Etiqueta / Badge', type: 'text', max: 40 },
        { id: 'title', label: 'Título', type: 'text', max: 60 },
        { id: 'text', label: 'Descripción / Texto', type: 'textarea', max: 300 },
        { id: 'buttonText', label: 'Texto del Botón', type: 'text', max: 20 }
      ],
      colonias_section: [
        { id: 'badge', label: 'Etiqueta / Badge', type: 'text', max: 40 },
        { id: 'title', label: 'Título', type: 'text', max: 50 },
        { id: 'text', label: 'Descripción / Texto', type: 'textarea', max: 200 }
      ],
      blog_page: [
        { id: 'title', label: 'Título', type: 'text', max: 40 },
        { id: 'text', label: 'Resumen / Texto', type: 'textarea', max: 120 }
      ],
      recursos_page: [
        { id: 'title', label: 'Título', type: 'text', max: 40 },
        { id: 'text', label: 'Resumen / Texto', type: 'textarea', max: 120 }
      ],
      contacto_page: [
        { id: 'title', label: 'Título', type: 'text', max: 40 },
        { id: 'text', label: 'Resumen / Texto', type: 'textarea', max: 120 }
      ]
    };

    const isSimplePage = ['recursos_page', 'blog_page', 'contacto_page', 'general'].includes(id);
    const fields = standardFieldsConfig[id] || [
      { id: 'badge', label: 'Etiqueta / Badge', type: 'text', max: 40 },
      { id: 'title', label: 'Título', type: 'text', max: 80 },
      { id: 'text', label: 'Descripción / Texto', type: 'textarea', max: 350 }
    ];

    return (
      <div className="mt-6 p-6 md:p-10 bg-brand-cream/20 rounded-[2.5rem] border border-brand-light/10 space-y-10 animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {fields.filter(f => f.type === 'text').map(f => (
              <div key={f.id}>{renderField(id, f.id, f.label, 'text', Type, f.max)}</div>
            ))}
          </div>
          {data.image !== undefined && (
            <div className="space-y-3">
              <label className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest flex items-center gap-2 mb-1">
                <ImageIcon className="w-3.5 h-3.5" /> Imagen Principal
              </label>
              <div className="relative group rounded-[2rem] overflow-hidden border border-brand-light/20 bg-white aspect-video shadow-lg">
                <img src={data.image || '/uploads/dog_cat_hero.png'} alt="Preview" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-brand-dark/40 backdrop-blur-sm">
                  <label className="cursor-pointer bg-brand-green text-brand-dark px-6 py-3 rounded-full font-bold text-xs uppercase flex items-center gap-2 hover:scale-105 transition-all shadow-xl">
                    <Upload className="w-4 h-4" /> Cambiar Imagen
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(id, e)} />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {fields.filter(f => f.type === 'textarea').map(f => (
          <div key={f.id} className="pt-4 border-t border-brand-light/10">
            {renderField(id, f.id, f.label, 'textarea', Edit3, f.max)}
          </div>
        ))}

        {id === 'contacto_page' && (
           <div className="pt-10 border-t border-brand-light/10 space-y-8">
              <h3 className="text-xs font-black text-brand-green uppercase tracking-[0.2em] border-b border-brand-light/10 pb-2">Datos de Contacto Directo</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {renderField(id, 'contact_email', 'Email', 'text', Mail, 60)}
                {renderField(id, 'contact_phone', 'Teléfono', 'text', Phone, 15)}
                {renderField(id, 'contact_whatsapp', 'WhatsApp', 'text', MessageCircle, 20)}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {renderField(id, 'contact_facebook', 'Facebook URL', 'text', Globe, 200)}
                {renderField(id, 'contact_instagram', 'Instagram URL', 'text', Globe, 200)}
              </div>
           </div>
        )}

        {id === 'general' && (
           <div className="pt-10 border-t border-brand-light/10 space-y-6">
              <h3 className="text-xs font-black text-brand-green uppercase tracking-[0.2em] border-b border-brand-light/10 pb-2">Configuración Global</h3>
              <div className="grid md:grid-cols-2 gap-6">
                 {renderField(id, 'siteName', 'Nombre de la ONG', 'text', Type, 30)}
                 {renderField(id, 'contact_email_notifications', 'Email Notificaciones', 'text', Mail, 60)}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {renderField(id, 'socialFacebook', 'Facebook (Footer)', 'text', Globe, 200)}
                {renderField(id, 'socialInstagram', 'Instagram (Footer)', 'text', Globe, 200)}
              </div>
           </div>
        )}
      </div>
    );
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-brand-light/10">
              <h3 className="text-sm font-black text-brand-dark/40 uppercase tracking-widest mb-6 flex items-center gap-2 text-brand-dark">
                <Layout className="w-4 h-4" /> Disposición de la Página de Inicio
              </h3>
              <div className="space-y-3">
                {sectionsConfig.order.map((sectionId, index) => {
                  const meta = SECTION_METADATA[sectionId] || { id: sectionId.toLowerCase(), icon: Layout, color: 'text-gray-400' };
                  const isHidden = sectionsConfig.hidden.includes(sectionId);
                  const isExpanded = expandedSection === sectionId;
                  
                  return (
                    <div key={sectionId} className="group text-brand-dark">
                      <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        isExpanded 
                          ? 'bg-brand-green/5 border-brand-green/30 ring-2 ring-brand-green/10' 
                          : 'bg-brand-cream/10 border-brand-light/5 hover:border-brand-light/20'
                      }`}>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col gap-1">
                            <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="p-1 px-1.5 hover:bg-brand-green hover:text-brand-dark rounded-lg transition-colors disabled:opacity-10">
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => moveSection(index, 'down')} disabled={index === sectionsConfig.order.length - 1} className="p-1 px-1.5 hover:bg-brand-green hover:text-brand-dark rounded-lg transition-colors disabled:opacity-10">
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className={`p-3 rounded-xl bg-white shadow-sm ${meta.color}`}>
                            <meta.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-brand-dark uppercase tracking-tight">{sectionId}</h4>
                            <p className="text-[10px] text-brand-dark/40 font-black uppercase">Bloque de inicio</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleVisibility(sectionId)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                              isHidden ? 'bg-brand-dark/10 text-brand-dark/40' : 'bg-brand-green/10 text-brand-green'
                            }`}
                          >
                            {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {isHidden ? 'Oculto' : 'Visible'}
                          </button>
                          {sectionId !== 'Blog' && (
                            <button
                              onClick={() => setExpandedSection(isExpanded ? null : sectionId)}
                              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                                isExpanded ? 'bg-brand-dark text-brand-light shadow-lg' : 'bg-brand-cream text-brand-dark hover:bg-brand-cream/80'
                              }`}
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              {isExpanded ? 'Cerrar' : 'Editar'}
                            </button>
                          )}
                        </div>
                      </div>
                      {isExpanded && renderSectionEditor(meta.id)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case 'colonias': return renderSectionEditor('colonias_page');
      case 'proyecto': return renderSectionEditor('proyecto_page');
      case 'recursos': return renderSectionEditor('recursos_page');
      case 'blog': return renderSectionEditor('blog_page');
      case 'contacto': return renderSectionEditor('contacto_page');
      case 'configuracion': return renderSectionEditor('general');
      default: return null;
    }
  };

  if (loading && Object.keys(localContent).length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="bg-brand-dark text-brand-light p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight flex items-center gap-3">
              <Layout className="w-10 h-10 text-brand-green" />
              Gestión Maestra
            </h1>
            <p className="text-brand-light/60 mt-2 max-w-xl font-medium">
              Toma el control total de tu web. Cada sección, cada texto y cada imagen es configurable desde aquí.
            </p>
          </div>
          <button
            onClick={handleSaveAll}
            disabled={savingId === 'all'}
            className="flex items-center justify-center gap-3 px-10 py-5 bg-brand-green text-brand-dark rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-green/20 disabled:opacity-50"
          >
            {savingId === 'all' ? (
               <div className="w-6 h-6 border-2 border-brand-dark/30 border-t-brand-dark rounded-full animate-spin" />
            ) : (
              <Save className="w-6 h-6" />
            )}
            {savingId === 'all' ? 'Guardando...' : 'Guardar Todo'}
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex bg-white rounded-full p-1.5 shadow-sm border border-brand-light/10 w-fit shrink-0">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-brand-dark text-brand-light shadow-md' : 'text-brand-dark/40 hover:text-brand-dark'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
          message.type === 'success' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-bold">{message.text}</span>
        </div>
      )}

      <div className="space-y-6">
        {!['inicio', 'proyecto', 'colonias'].includes(activeTab) && (
          <div className="bg-white rounded-[2rem] shadow-sm border border-brand-light/10 overflow-hidden text-brand-dark">
            <div className="px-8 py-6 border-b border-brand-light/10 bg-brand-cream/5 flex items-center justify-between">
              <div>
                <span className="font-black text-xs text-brand-dark/40 uppercase tracking-widest">Edición de Página</span>
                <h2 className="text-2xl font-black text-brand-dark uppercase mt-1">{TABS.find(t => t.id === activeTab)?.name}</h2>
              </div>
              <div className="p-3 rounded-2xl bg-brand-green/10 text-brand-green">
                 {activeTab === 'configuracion' ? <Settings className="w-6 h-6" /> : <Edit3 className="w-6 h-6" />}
              </div>
            </div>
            <div className="p-8">
               {renderActiveTabContent()}
            </div>
          </div>
        )}
        {['inicio', 'proyecto', 'colonias'].includes(activeTab) && renderActiveTabContent()}
      </div>

      <div className="bg-blue-50/50 border border-blue-100 p-8 rounded-[2rem] flex gap-6 items-start">
        <Edit3 className="w-8 h-8 text-blue-500 shrink-0 mt-1" />
        <div className="text-sm text-blue-900 leading-relaxed font-medium">
          <p className="font-black uppercase tracking-widest text-blue-600 mb-2">Asistente de Edición</p>
          <p className="opacity-80">
            Usa las pestañas para navegar entre las distintas secciones de tu web. Puedes cambiar el orden de las secciones en la home o editar directamente el contenido de cada página. No olvides pulsar el botón de <span className="font-black text-brand-dark">Guardar Todo</span> para aplicar los cambios.
          </p>
        </div>
      </div>
    </div>
  );
}
