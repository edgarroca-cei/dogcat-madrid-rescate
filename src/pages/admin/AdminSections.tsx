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
    image: '/dog_cat_hero.png'
  },
  colonias_section: {
    badge: 'Donaciones y recursos',
    title: 'Apoyo económico para las colonias',
    text: 'Actuamos como motor de ayuda para alimentadoras y asociaciones de Madrid. Canalizamos tu solidaridad mediante la donación directa de alimento, financiación de gastos veterinarios y suministro de material especializado.',
    image: '/cat_colony.jpg'
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
    image: '/cat_colony.jpg',
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
    donations_text: 'No recibimos ayudas públicas suficientes. Dependemos de la solidaridad de personas como tú.'
  },
  proyecto_page: {
    title: 'Proyecto Dogcat Rescate',
    text: 'Un proyecto integral de bienestar y protección animal diseñado para dar respuesta profesional a emergencias.',
    image: 'https://images.pexels.com/photos/9000185/pexels-photo-9000185.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fleet_title: 'Flota de rescate: el motor del proyecto',
    fleet_text: 'El diseño del proyecto integra vehículos especialmente rotulados y adaptados para el transporte seguro de animales.',
    areas_title: 'Nuestras áreas de actuación',
    areas_text: 'Nuestra estructura, unidades y protocolos están completamente definidos y listos para implementarse.'
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
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    // Deep merge defaults with content to ensure all fields exist
    const merged: any = {};
    
    // First, populate all defaults
    Object.keys(DEFAULTS).forEach(key => {
      merged[key] = { ...DEFAULTS[key] };
    });

    // Then, overlay content from database
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
    setLocalContent({
      ...localContent,
      [id]: { ...localContent[id], [field]: value }
    });
  };

  const handleImageUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>, field: string = 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await api.uploadImage(file);
      handleContentChange(id, field, res.url);
      setMessage({ type: 'success', text: 'Imagen subida correctamente' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al subir la imagen' });
    }
  };

  const handleSaveAll = async () => {
    setSavingId('all');
    try {
      await api.saveSiteContent('home_sections', sectionsConfig);
      const savePromises = Object.keys(localContent).map(id => 
        api.saveSiteContent(id, localContent[id])
      );
      await Promise.all(savePromises);
      await refreshContent();
      setMessage({ type: 'success', text: 'Toda la configuración guardada' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al conectar con el servidor' });
    } finally {
      setSavingId(null);
    }
  };

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

  // Default contents for Proyecto Page to show when database is empty
  const DYNAMIC_DEFAULTS: Record<string, string> = {
    title: 'Proyecto Dogcat Rescate',
    text: 'Un proyecto técnico de bienestar animal diseñado para dar respuesta profesional a emergencias. Buscamos los recursos para hacerlo realidad.',
    areas_title: 'Nuestras áreas de actuación',
    areas_text: 'Nuestra estructura y protocolos están definidos y listos para implementarse en cuanto dispongamos de la financiación necesaria.',
    fleet_title: 'Flota de rescate: el motor del proyecto',
    fleet_text: 'El diseño del proyecto integra vehículos especialmente rotulados y adaptados.',
    fleet_extra_text: 'Su equipamiento está planteado para ofrecer una primera respuesta en el lugar de la emergencia.',
    fleet_b1: 'Transporte climatizado y seguro',
    fleet_b2: 'Equipamiento de captura profesional',
    fleet_b3: 'Rotulación oficial de DOGCAT Madrid',
    cta_title: 'Ayúdanos a hacerlo realidad',
    cta_text: 'Este proyecto es un concepto técnico listo para ejecutarse. Buscamos el apoyo y la financiación necesaria para poner en marcha estas unidades y empezar a salvar vidas.',
    area1_title: 'Emergencias y rescates',
    area1_text: 'Intervención rápida y profesional en situaciones de riesgo.',
    area1_icon: 'ShieldAlert',
    area2_title: 'Gestión de colonias',
    area2_text: 'Apoyo logístico y técnico en la captura y esterilización.',
    area2_icon: 'HeartHandshake',
    area3_title: 'Apoyo a cuidadores',
    area3_text: 'Asistencia directa a las personas que cuidan de los animales.',
    area3_icon: 'Users',
    badge_icon: 'ShieldAlert',
    cta_email: 'dogcatmadrid@gmail.com',
    cta_phone: '687309639',
    cta_whatsapp: '34687309639',
    n1_title: 'Material de captura',
    n1_text: 'Jaulas trampa y transportines.',
    n1_icon: 'LifeBuoy',
    n2_title: 'Atención veterinaria',
    n2_text: 'Esterilizaciones y vacunas.',
    n2_icon: 'Stethoscope',
    n3_title: 'Alimentación diaria',
    n3_text: 'Pienso y comida húmeda.',
    n3_icon: 'Fish',
    n4_title: 'Refugios de invierno',
    n4_text: 'Casetas para protegerlos.',
    n4_icon: 'Home',
    image: '/cat_colony.jpg',
    proyecto_image: '/dog_cat_hero.png',
    siteName: 'DOGCAT Madrid',
    siteTitle: 'DOGCAT Madrid | Rescate y Bienestar Animal',
    siteIcon: 'PawPrint',
    contact_email: 'dogcatmadrid@gmail.com',
    contact_phone: '687309639',
    contact_whatsapp: '34687309639',
    contact_facebook: 'https://www.facebook.com/people/Fer-Hidalgo-ayudas-colonias-felinas-Dogcat-Madrid/100077417127229/',
    contact_instagram: '',
    socialFacebook: 'https://www.facebook.com/people/Fer-Hidalgo-ayudas-colonias-felinas-Dogcat-Madrid/100077417127229/',
    socialInstagram: ''
  };

  const renderField = (id: string, field: string, label: string, type: 'text' | 'textarea' = 'text', icon: any = Type, max: number = 100) => {
    const data = localContent[id] || {};
    const isDynamic = ['proyecto_page', 'proyecto_section', 'colonias_page', 'colonias_section', 'general', 'contacto_page'].includes(id);
    const value = data[field] !== undefined ? data[field] : (isDynamic ? (DYNAMIC_DEFAULTS[field] || '') : '');
    const Icon = icon;
    const length = value.length;
    
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center gap-4">
          <label className="text-xs font-black text-brand-dark/40 uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
            <Icon className="w-3 h-3" /> {label}
          </label>
          {max && (
            <span className={`text-[10px] font-bold ${length > max * 0.9 ? 'text-red-500' : 'text-brand-dark/30'} whitespace-nowrap`}>
              {length}/{max}
            </span>
          )}
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
                placeholder={field.endsWith('_icon') ? 'Ej: Heart, Truck, Mouse...' : ''}
              />
              {field.endsWith('_icon') && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-brand-cream border border-brand-light/10 flex items-center justify-center text-brand-dark shadow-sm">
                  {(() => {
                    const PreviewIcon = getLucideIcon(value);
                    if (PreviewIcon) return <PreviewIcon className="w-5 h-5 transition-all" />;
                    if (value.length > 0 && value.length <= 2) return <span className="font-black text-xs">{value}</span>;
                    return <HelpCircle className="w-4 h-4 opacity-10" />;
                  })()}
                </div>
              )}
            </div>
             {field.endsWith('_icon') && (
               <p className="text-[10px] text-brand-dark/40 font-bold px-1 flex items-center gap-1.5 leading-tight italic">
                 Escribe el nombre del icono (ej: Heart, Dog...)
               </p>
             )}
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
    
    // Define per-section standard limits based on "perfect" existing contents
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
      ],
      proyecto_page: [
        { id: 'badge', label: 'Etiqueta / Badge', type: 'text', max: 40 },
        { id: 'title', label: 'Título', type: 'text', max: 80 },
        { id: 'text', label: 'Descripción / Texto', type: 'textarea', max: 350 },
        { id: 'areas_title', label: 'Título Áreas', type: 'text', max: 80 },
        { id: 'areas_text', label: 'Texto Áreas', type: 'textarea', max: 350 },
        { id: 'area1_title', label: 'Área 1: Título', type: 'text', max: 50 },
        { id: 'area1_text', label: 'Área 1: Texto', type: 'textarea', max: 150 },
        { id: 'area1_icon', label: 'Área 1: Icono', type: 'text', max: 25 },
        { id: 'area2_title', label: 'Área 2: Título', type: 'text', max: 50 },
        { id: 'area2_text', label: 'Área 2: Texto', type: 'textarea', max: 150 },
        { id: 'area2_icon', label: 'Área 2: Icono', type: 'text', max: 25 },
        { id: 'area3_title', label: 'Área 3: Título', type: 'text', max: 50 },
        { id: 'area3_text', label: 'Área 3: Texto', type: 'textarea', max: 150 },
        { id: 'area3_icon', label: 'Área 3: Icono', type: 'text', max: 25 },
        { id: 'fleet_title', label: 'Título Flota', type: 'text', max: 80 },
        { id: 'fleet_text', label: 'Texto Flota', type: 'textarea', max: 350 },
        { id: 'fleet_extra_text', label: 'Texto Extra Flota', type: 'textarea', max: 350 },
        { id: 'fleet_b1', label: 'Punto 1 Flota', type: 'text', max: 60 },
        { id: 'fleet_b2', label: 'Punto 2 Flota', type: 'text', max: 60 },
        { id: 'fleet_b3', label: 'Punto 3 Flota', type: 'text', max: 60 },
        { id: 'cta_title', label: 'Título CTA', type: 'text', max: 80 },
        { id: 'cta_text', label: 'Texto CTA', type: 'textarea', max: 350 },
        { id: 'cta_email', label: 'Email Proyecto', type: 'text', max: 80 },
        { id: 'cta_phone', label: 'Teléfono Proyecto', type: 'text', max: 20 },
        { id: 'cta_whatsapp', label: 'WhatsApp Proyecto', type: 'text', max: 20 }
      ]
    };

    // Special contact data fields for the contacto_page section
    const contactoSpecialBlock = (id === 'contacto_page') ? (
      <div className="pt-10 border-t border-brand-light/10 space-y-12 text-brand-dark anim-fade-in">
         <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-xs font-black text-brand-green uppercase tracking-[0.2em] border-b border-brand-light/10 pb-2">Datos de Contacto</h3>
              <div className="bg-white/50 p-6 rounded-3xl border border-brand-light/10 space-y-6">
                {renderField(id, 'contact_email', 'Email de contacto', 'text', Mail, 60)}
                {renderField(id, 'contact_phone', 'Teléfono (sin prefijo)', 'text', Phone, 15)}
                {renderField(id, 'contact_whatsapp', 'WhatsApp (con prefijo país, ej: 34...)', 'text', MessageCircle, 20)}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xs font-black text-brand-green uppercase tracking-[0.2em] border-b border-brand-light/10 pb-2">Redes Sociales</h3>
              <div className="bg-white/50 p-6 rounded-3xl border border-brand-light/10 space-y-6">
                {renderField(id, 'contact_facebook', 'URL de Facebook', 'text', Globe, 200)}
                {renderField(id, 'contact_instagram', 'URL de Instagram', 'text', Globe, 200)}
              </div>
            </div>
         </div>
      </div>
    ) : null;

    const defaultFields = [
      { id: 'badge', label: 'Etiqueta / Badge', type: 'text', max: 40 },
      { id: 'title', label: 'Título', type: 'text', max: 80 },
      { id: 'buttonText', label: 'Texto del Botón', type: 'text', max: 30 },
      { id: 'text', label: 'Descripción / Texto', type: 'textarea', max: 350 }
    ];

    if (id === 'proyecto_page') {
      defaultFields.push(
        { id: 'cta_email', label: 'Email de Contacto (Proyecto)', type: 'text', max: 80 },
        { id: 'cta_phone', label: 'Teléfono (Proyecto)', type: 'text', max: 20 },
        { id: 'cta_whatsapp', label: 'WhatsApp (Proyecto)', type: 'text', max: 20 },
        { id: 'fleet_extra_text', label: 'Texto Extra Flota', type: 'textarea', max: 350 }
      );
    }

    const definedFields = standardFieldsConfig[id] || defaultFields;
    
    // Add missing icons and filter based on data availability
    const standardFields = definedFields.map(f => ({
      ...f,
      icon: f.type === 'text' 
        ? (f.id === 'badge' ? Sparkles : (f.id === 'buttonText' ? CheckCircle2 : Type)) 
        : Edit3
    })).filter(f => data[f.id as keyof typeof data] !== undefined || (f.id === 'text' && !['general', 'colonias_page', 'proyecto_page'].includes(id)));

    const shortFields = standardFields.filter(f => f.type === 'text');
    const longFields = standardFields.filter(f => f.type === 'textarea');

    return (
      <div className="mt-6 p-6 md:p-10 bg-brand-cream/20 rounded-[2.5rem] border border-brand-light/10 space-y-10 animate-in fade-in slide-in-from-top-2 duration-300">
        {/* UPPER BLOCK: Basic Info & Hero Image */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Short Inputs (Badge, Title, etc.) */}
          {shortFields.length > 0 && (
            <div className="space-y-6">
              {shortFields.map(f => (
                <div key={f.id}>
                  {renderField(id, f.id, f.label, f.type as any, f.icon, f.max)}
                </div>
              ))}
              {id === 'proyecto_page' && (
                <div className="pt-4 border-t border-brand-light/10">
                   {renderField(id, 'badge_icon', 'Icono de Étiqueta (Badge)', 'text', Sparkles, 25)}
                </div>
              )}
            </div>
          )}

          {/* Right: Main Image Uploader */}
          {!['general', 'contacto_page', 'recursos_page', 'blog_page'].includes(id) && (data.image !== undefined || ['proyecto_page', 'proyecto_section', 'colonias_page', 'colonias_section'].includes(id)) && (
            <div className="space-y-3">
              <label className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest flex items-center gap-2 mb-1">
                <ImageIcon className="w-3.5 h-3.5" /> Imagen Principal
              </label>
              <div className="relative group rounded-[2rem] overflow-hidden border border-brand-light/20 bg-white aspect-video shadow-lg">
                <img 
                  src={data.image || '/dog_cat_hero.png'} 
                  alt="Preview" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-brand-dark/40 backdrop-blur-sm">
                  <label className="cursor-pointer bg-brand-green text-brand-dark px-6 py-3 rounded-full font-bold text-xs uppercase flex items-center gap-2 hover:scale-105 transition-all shadow-xl">
                    <Upload className="w-4 h-4" /> Cambiar Imagen
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(id, e)}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* LOWER BLOCK: Extended Text Content (Full Width) */}
        {longFields.length > 0 && (
          <div className="pt-8 border-t border-brand-light/10 space-y-8">
            {longFields.map(f => (
              <div key={f.id} className="max-w-5xl">
                {renderField(id, f.id, f.label, f.type as any, f.icon, f.max)}
              </div>
            ))}
          </div>
        )}

        {/* SPECIAL SECTIONS CONFIGURATION */}
        
        {/* 1. Global (General) */}
        {id === 'general' && (
           <div className="pt-10 border-t border-brand-light/10 space-y-12 text-brand-dark anim-fade-in">
              <div className="grid lg:grid-cols-2 gap-10">
                 <div className="space-y-6">
                    <h3 className="text-xs font-black text-brand-green uppercase tracking-[0.2em] border-b border-brand-light/10 pb-2">Identidad Visual</h3>
                    <div className="bg-white/50 p-6 rounded-3xl border border-brand-light/10 space-y-6">
                       {renderField(id, 'siteName', 'Nombre de la Organización', 'text', Type, 30)}
                       {renderField(id, 'siteTitle', 'Título SEO (Pestaña Navegador)', 'text', Globe, 60)}
                       {renderField(id, 'siteIcon', 'Icono de Marca (Lucide)', 'text', Sparkles, 25)}
                       
                       <div className="pt-6 border-t border-brand-light/10">
                          <label className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest flex items-center gap-2 mb-4">
                             <ImageIcon className="w-3.5 h-3.5" /> Logo de la Web
                          </label>
                          <div className="bg-white p-4 rounded-2xl border border-brand-light/10 shadow-sm">
                             <div className="flex flex-col gap-4">
                                {data.siteLogo && (
                                   <div className="relative group aspect-[3/1] rounded-xl overflow-hidden bg-brand-dark/5 border border-brand-light/10">
                                      <img src={data.siteLogo} alt="Logo preview" className="w-full h-full object-contain p-4" />
                                      <button 
                                         onClick={() => handleContentChange(id, 'siteLogo', '')}
                                         className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                         <X className="w-4 h-4" />
                                      </button>
                                   </div>
                                )}
                                <label className="cursor-pointer group">
                                   <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-brand-light/20 rounded-xl group-hover:border-brand-green/30 group-hover:bg-brand-green/5 transition-all text-brand-dark/40 group-hover:text-brand-green">
                                      <Upload className="w-5 h-5" />
                                      <span className="text-sm font-bold">{data.siteLogo ? 'Cambiar Logo' : 'Subir Logo'}</span>
                                   </div>
                                   <input 
                                      type="file" 
                                      className="hidden" 
                                      accept="image/*"
                                      onChange={(e) => handleImageUpload(id, e, 'siteLogo')}
                                   />
                                </label>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <h3 className="text-xs font-black text-brand-green uppercase tracking-[0.2em] border-b border-brand-light/10 pb-2">Configuración Global</h3>
                    <div className="bg-white/50 p-6 rounded-3xl border border-brand-light/10 space-y-6">
                       {renderField(id, 'donationButton', 'Texto Botón Donar', 'text', CheckCircle2, 20)}
                       {renderField(id, 'footerCopyright', 'Texto Copyright Footer', 'text', FileText, 80)}
                    </div>
                    
                    <h3 className="text-xs font-black text-brand-green uppercase tracking-[0.2em] border-b border-brand-light/10 pb-2 pt-4">Notificaciones por Email</h3>
                    <div className="bg-white/50 p-6 rounded-3xl border border-brand-light/10 space-y-6">
                       {renderField(id, 'contact_email_notifications', 'Email para recibir mensajes del formulario', 'text', Mail, 60)}
                       <p className="text-[10px] text-brand-dark/40 font-bold px-1 italic">
                         Los mensajes de los clientes se enviarán a esta dirección usando FormSubmit (gratuito).
                       </p>
                    </div>

                    <h3 className="text-xs font-black text-brand-green uppercase tracking-[0.2em] border-b border-brand-light/10 pb-2 pt-4">Redes Sociales (Footer)</h3>
                    <div className="bg-white/50 p-6 rounded-3xl border border-brand-light/10 space-y-6">
                       {renderField(id, 'socialFacebook', 'URL de Facebook', 'text', Globe, 200)}
                       {renderField(id, 'socialInstagram', 'URL de Instagram', 'text', Globe, 200)}
                    </div>
                  </div>
               </div>
            </div>
         )}

        {/* 1.5. Contacto Page — Contact Data & Social */}
        {contactoSpecialBlock}

        {/* 2. Colonias Felinas Page */}
         {((id as string) === 'colonias_page') && (
            <div className="pt-10 border-t border-brand-light/10 space-y-12 text-brand-dark anim-fade-in">
               {/* Icon Help Banner */}
               <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-4 flex items-center gap-4 text-xs font-bold text-brand-dark/70 shadow-sm">
                  <div className="p-2 bg-brand-green/10 rounded-lg text-brand-green">
                     <LucideIcons.Search className="w-4 h-4" />
                  </div>
                  <p>
                    Puedes personalizar los iconos usando nombres de <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline decoration-2 underline-offset-2">lucide.dev</a> (ej: Heart, Dog, Info, Truck...).
                  </p>
               </div>
              <div className="grid lg:grid-cols-2 gap-10">
                 <div className="space-y-6">
                    <h3 className="text-xs font-black text-brand-green uppercase tracking-[0.2em] border-b border-brand-light/10 pb-2">Bloque Método CER</h3>
                    {renderField(id, 'cer_title', 'Título CER', 'text', Type, 60)}
                    <div className="pt-2">{renderField(id, 'cer_text', 'Texto CER', 'textarea', Edit3, 200)}</div>
                 </div>
                 <div className="space-y-6">
                    <h3 className="text-xs font-black text-red-500 uppercase tracking-[0.2em] border-b border-brand-light/10 pb-2">Bloque Donativos</h3>
                    {renderField(id, 'donations_title', 'Título Donativos', 'text', Type, 60)}
                    <div className="pt-2">{renderField(id, 'donations_text', 'Texto Donativos', 'textarea', Edit3, 180)}</div>
                  </div>
               </div>
               
               <div className="space-y-10 bg-white/40 p-6 md:p-12 rounded-[3.5rem] border border-brand-light/10 shadow-inner">
                 <div className="text-center w-full mb-12">
                    <h3 className="text-xs font-black text-brand-green uppercase tracking-[0.4em] mb-3">Proceso de Intervención</h3>
                    <h4 className="text-3xl font-black text-brand-dark leading-none">Los 3 Pasos del Método C.E.R.</h4>
                 </div>
                 <div className="flex flex-col gap-10">
                    {[1, 2, 3].map(step => (
                      <div key={step} className="group px-8 py-10 bg-white rounded-[2.5rem] space-y-8 shadow-xl border border-brand-light/5 hover:border-brand-green/30 transition-all hover:translate-y-[-6px] hover:shadow-2xl max-w-4xl mx-auto w-full">
                        <div className="flex items-center justify-between border-b border-brand-light/10 pb-4">
                           <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full bg-brand-green text-brand-dark flex items-center justify-center font-black text-xs shadow-lg shadow-brand-green/20">
                                 {['C', 'E', 'R'][step-1]}
                              </span>
                              <p className="font-black text-brand-dark/40 text-[10px] uppercase tracking-widest">Paso {step}</p>
                           </div>
                           <div className="flex-1 max-w-[200px]">{renderField(id, `cer_step${step}_icon`, 'Icono', 'text', Sparkles, 25)}</div>
                        </div>
                        {renderField(id, `cer_step${step}_title`, 'Título del Paso', 'text', Type, 40)}
                        {renderField(id, `cer_step${step}_text`, 'Descripción Detallada', 'textarea', Edit3, 150)}
                      </div>
                    ))}
               </div>
            </div>
         </div>
         )}

         {/* 3. Colonias Home Section (Needs Grid) */}
         {((id as string) === 'colonias_section') && (
            <div className="pt-10 border-t border-brand-light/10 space-y-10 anim-fade-in">
               {/* Icon Help Banner */}
               <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-4 flex items-center gap-4 text-xs font-bold text-brand-dark/70 shadow-sm max-w-4xl mx-auto">
                  <div className="p-2 bg-brand-green/10 rounded-lg text-brand-green">
                     <LucideIcons.Search className="w-4 h-4" />
                  </div>
                  <p>
                    Usa nombres de <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline decoration-2 underline-offset-2">lucide.dev</a> para cambiar los iconos.
                  </p>
               </div>
               <div className="text-center w-full mb-8">
                  <h3 className="text-xs font-black text-brand-green uppercase tracking-[0.4em] mb-2">Necesidades de las Colonias</h3>
                  <h4 className="text-2xl font-black text-brand-dark leading-none">Las 4 Claves de Ayuda</h4>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(num => (
                    <div key={num} className="group px-6 py-6 bg-white rounded-[2rem] space-y-5 shadow-xl border border-brand-light/5 hover:border-brand-green/30 transition-all hover:translate-y-[-4px] w-full">
                       <div className="flex items-center justify-between border-b border-brand-light/10 pb-3">
                          <p className="font-black text-brand-green text-[10px] uppercase tracking-widest">Necesidad {num}</p>
                          <div className="flex-1 max-w-[150px]">{renderField(id, `n${num}_icon`, 'Icono', 'text', Sparkles, 25)}</div>
                       </div>
                       {renderField(id, `n${num}_title`, 'Título Corto', 'text', Type, 40)}
                       {renderField(id, `n${num}_text`, 'Descripción Breve', 'textarea', Edit3, 100)}
                    </div>
                  ))}
               </div>
            </div>
         )}

        {/* 3. Proyecto Section (Home) Feature Grid */}
        {id === 'proyecto_section' && (
          <div className="pt-10 border-t border-brand-light/10 space-y-8">
            <h3 className="text-xs font-black text-brand-green uppercase tracking-[0.2em]">Tarjetas de Misión / Características</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(num => (
                <div key={num} className="p-6 bg-white/50 rounded-3xl border border-brand-light/10 space-y-6 shadow-sm">
                  <p className="text-[10px] font-black text-center text-brand-dark/40 uppercase tracking-[0.2em] border-b border-brand-light/10 pb-3">Tarjeta {num}</p>
                  {renderField(id, `f${num}_icon`, 'Ícono (Lucide / Texto)', 'text', Sparkles, 25)}
                  {renderField(id, `f${num}_title`, 'Título', 'text', Type, 30)}
                  {renderField(id, `f${num}_text`, 'Descripción', 'textarea', Edit3, 100)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Proyecto Page */}
        {/* 4. Proyecto Page */}
         {((id as string) === 'proyecto_page') && (
            <div className="pt-10 border-t border-brand-light/10 space-y-16 text-brand-dark anim-fade-in">
               {/* Icon Help Banner */}
               <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4 flex items-center gap-4 text-xs font-bold text-brand-dark/70 shadow-sm">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                     <LucideIcons.Search className="w-4 h-4" />
                  </div>
                  <p>
                    Personaliza los iconos de esta página con nombres de <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline decoration-2 underline-offset-2">lucide.dev</a>.
                  </p>
               </div>
              {/* Header Blocks - Large Cards */}
              <div className="grid lg:grid-cols-2 gap-8">
                 <div className="bg-blue-50/30 p-8 rounded-[2.5rem] border border-blue-100/50 space-y-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-500">
                          <Layout className="w-5 h-5" />
                       </div>
                       <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest">Cabecera de Áreas</h3>
                    </div>
                    {renderField(id, 'areas_title', 'Título Grande', 'text', Type, 60)}
                    {renderField(id, 'areas_text', 'Subtítulo Introductorio', 'textarea', Edit3, 150)}
                 </div>
                 <div className="bg-purple-50/30 p-8 rounded-[2.5rem] border border-purple-100/50 space-y-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-500">
                          <Ambulance className="w-5 h-5" />
                       </div>
                       <h3 className="text-sm font-black text-purple-900 uppercase tracking-widest">Cabecera de Flota</h3>
                    </div>
                    {renderField(id, 'fleet_title', 'Título Grande', 'text', Type, 60)}
                    {renderField(id, 'fleet_text', 'Subtítulo Introductorio', 'textarea', Edit3, 150)}
                 </div>
              </div>

              {/* Areas of Action Detail Grid */}
              <div className="space-y-10 bg-brand-cream/10 p-6 md:p-12 rounded-[3.5rem] border border-brand-light/10 shadow-inner">
                 <div className="text-center w-full mb-12">
                    <h3 className="text-xs font-black text-brand-dark/40 uppercase tracking-[0.4em] mb-3">Gestión de Contenidos</h3>
                    <h4 className="text-3xl font-black text-brand-dark leading-none">Las 3 Áreas de Misión</h4>
                 </div>
                 <div className="flex flex-col gap-10">
                    {[1, 2, 3].map(area => (
                      <div key={area} className="group px-8 py-10 bg-white rounded-[2.5rem] space-y-8 shadow-xl border border-brand-light/5 hover:border-blue-500/30 transition-all hover:translate-y-[-6px] hover:shadow-2xl max-w-4xl mx-auto w-full">
                        <div className="flex items-center justify-between border-b border-brand-light/10 pb-4">
                           <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-blue-500/20">
                              {area}
                           </span>
                           <div className="flex-1 max-w-[200px]">{renderField(id, `area${area}_icon`, 'Icono', 'text', Sparkles, 25)}</div>
                        </div>
                        {renderField(id, `area${area}_title`, 'Título del Área', 'text', Type, 50)}
                        {renderField(id, `area${area}_text`, 'Descripción Corta', 'textarea', Edit3, 180)}
                      </div>
                    ))}
                 </div>
              </div>

              {/* Fleet Extras & Images */}
              <div className="space-y-12 bg-white/50 p-10 rounded-[3rem] border border-brand-light/10">
                 <div className="flex items-center justify-between border-b border-brand-light/10 pb-8">
                    <div>
                       <h3 className="text-xs font-black text-brand-dark/40 uppercase tracking-[0.2em] mb-1">Detalle de Equipamiento</h3>
                       <h4 className="text-2xl font-black text-brand-dark">Puntos Clave y Galería</h4>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-2xl">
                       <ImageIcon className="w-6 h-6 text-purple-500" />
                    </div>
                 </div>
                 
                 <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                       <div className="bg-white p-6 rounded-3xl border border-brand-light/10 shadow-sm">
                          {renderField(id, 'fleet_extra_text', 'Texto Narrativo Adicional', 'textarea', Edit3, 300)}
                       </div>
                       <div className="space-y-4">
                          <p className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest px-2">Bullet Points de la Flota</p>
                          <div className="grid gap-4">
                             {[1, 2, 3].map(b => (
                                <div key={b} className="bg-white px-6 py-4 rounded-2xl border border-brand-light/10 flex items-center gap-4 shadow-sm">
                                   <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green">✓</div>
                                   <div className="flex-1">{renderField(id, `fleet_b${b}`, `Punto ${b}`, 'text', CheckCircle2, 60)}</div>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       {[1, 2].map(imgNum => (
                          <div key={imgNum} className="space-y-4">
                             <p className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest px-1">Foto {imgNum}</p>
                             <div className="relative group rounded-3xl overflow-hidden border-4 border-white bg-white aspect-[3/4] shadow-2xl overflow-hidden">
                                <img 
                                   src={data[`fleet_img${imgNum}`] || (imgNum === 1 ? '/Gemini_Generated_Image_g04w14g04w14g04w.png' : '/Gemini_Generated_Image_plysslplysslplys.png')} 
                                   alt="Preview" 
                                   className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 bg-brand-dark/60 backdrop-blur-[2px] transition-all duration-300">
                                   <label className="cursor-pointer bg-white text-brand-dark px-5 py-2.5 rounded-full font-black text-[10px] uppercase flex items-center gap-2 hover:scale-105 transition-all shadow-xl">
                                      <Upload className="w-3.5 h-3.5" /> Reemplazar
                                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(id, e, `fleet_img${imgNum}`)} />
                                   </label>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* CTA Section - Themed Box */}
              <div className="bg-brand-dark p-12 rounded-[3.5rem] border border-brand-light/10 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>
                 
                 <div className="relative z-10 space-y-10">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-brand-green/20 rounded-2xl text-brand-green ring-1 ring-brand-green/30">
                          <Sparkles className="w-6 h-6" />
                       </div>
                       <div>
                          <h3 className="text-xs font-black text-brand-green uppercase tracking-[0.3em] mb-1">Cierre de Página</h3>
                          <h4 className="text-2xl font-black text-white">Llamada a la Acción</h4>
                       </div>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-10">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest px-1">Título del Reclamo</label>
                          <div className="bg-white/5 rounded-2xl p-2 border border-white/10 hover:border-brand-green/30 transition-colors">
                             {renderField(id, 'cta_title', '', 'text', Type, 60)}
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest px-1">Mensaje de Colaboración</label>
                          <div className="bg-white/5 rounded-2xl p-2 border border-white/10 hover:border-brand-green/30 transition-colors">
                             {renderField(id, 'cta_text', '', 'textarea', Edit3, 200)}
                          </div>
                       </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-white/30 uppercase tracking-widest px-1">Email de Contacto</label>
                           {renderField(id, 'cta_email', '', 'text', Mail, 50)}
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-white/30 uppercase tracking-widest px-1">Teléfono</label>
                           {renderField(id, 'cta_phone', '', 'text', Phone, 20)}
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-white/30 uppercase tracking-widest px-1">WhatsApp (Número)</label>
                           {renderField(id, 'cta_whatsapp', '', 'text', MessageCircle, 20)}
                        </div>
                    </div>
                 </div>
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

            {/* Standalone Pages Visibility */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-brand-light/10">
              <h3 className="text-sm font-black text-brand-dark/40 uppercase tracking-widest mb-6 flex items-center gap-2 text-brand-dark">
                <Globe className="w-4 h-4" /> Páginas Independientes (Navegación)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Recursos', 'Contacto'].map((pageId) => {
                  const meta = SECTION_METADATA[pageId];
                  const isHidden = sectionsConfig.hidden.includes(pageId);
                  
                  return (
                    <div key={pageId} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      isHidden ? 'bg-brand-dark/5 border-brand-light/5' : 'bg-brand-cream/10 border-brand-light/5'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl bg-white shadow-sm ${meta.color}`}>
                          <meta.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-dark text-sm">{pageId}</h4>
                          <p className="text-[10px] text-brand-dark/40 font-black uppercase">Página del menú</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleVisibility(pageId)}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                          isHidden ? 'bg-brand-dark/10 text-brand-dark/40' : 'bg-brand-green/10 text-brand-green'
                        }`}
                      >
                        {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        {isHidden ? 'Oculto' : 'Visible'}
                      </button>
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
      {/* Header Card */}
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

      {/* Tabs */}
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

      {/* Dynamic Content */}
      <div className="space-y-6">
        {activeTab !== 'inicio' && (
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
        {activeTab === 'inicio' && renderActiveTabContent()}
      </div>

      {/* Help Card */}
      <div className="bg-blue-50/50 border border-blue-100 p-8 rounded-[2rem] flex gap-6 items-start">
        <Edit3 className="w-8 h-8 text-blue-500 shrink-0 mt-1" />
        <div className="text-sm text-blue-900 leading-relaxed font-medium">
          <p className="font-black uppercase tracking-widest text-blue-600 mb-2">Asistente de Edición</p>
          <p className="opacity-80 group">
            Usa las pestañas para navegar entre las distintas secciones de tu web. Puedes cambiar el orden de las secciones en la home o editar directamente el contenido de cada página. No olvides pulsar el botón de <span className="font-black text-brand-dark">Guardar Todo</span> para aplicar los cambios.
          </p>
        </div>
      </div>
    </div>
  );
}
