import { useState, useEffect } from 'react';
import { api } from '../services/api';
import * as Icons from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export interface Mapa {
  id: string;
  title: string;
  mid: string;
  description: string;
  icon: string;
  order: number;
}

export function Recursos() {
  const { getContent } = useContent();
  const pageContent = getContent('recursos_page', {
    title: 'Mapas y recursos',
    text: 'Explora los mapas interactivos con información sobre subvenciones, licitaciones y registros históricos.'
  });

  const [mapas, setMapas] = useState<Mapa[]>([]);
  const [activeMap, setActiveMap] = useState<Mapa | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMapLoading, setIsMapLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchMapas = async () => {
      try {
        const mapasData = await api.getMapas();
        if (mounted) {
          setMapas(mapasData as Mapa[]);
          if (mapasData.length > 0 && !activeMap) {
            setActiveMap(mapasData[0] as Mapa);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching mapas:", error);
        if (mounted) setLoading(false);
      }
    };

    fetchMapas();

    return () => {
      mounted = false;
    };
  }, [activeMap]);

  // Reset map loading state when active map changes
  useEffect(() => {
    if (activeMap) {
      setIsMapLoading(true);
    }
  }, [activeMap?.id]);

  if (loading) {
    return (
      <section id="recursos" className="bg-brand-light text-brand-dark py-8 min-h-[600px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
      </section>
    );
  }

  if (mapas.length === 0) {
    return null; // Don't show the section if there are no maps
  }

  return (
    <section id="recursos" className="bg-brand-light text-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 text-brand-green font-bold tracking-wider uppercase text-sm mb-4 bg-brand-green/10 px-4 py-2 rounded-full">
            <Icons.Map className="w-4 h-4" /> Documentación
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

        <div className="bg-white rounded-2xl p-3 md:p-5 shadow-sm border border-brand-light/20">
          {/* Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-3 mb-2 md:flex-wrap md:justify-center snap-x snap-mandatory -mx-3 px-3 md:mx-0 md:px-0">
            {mapas.map((map) => {
              // Dynamically get the icon component from lucide-react
              const IconComponent = (Icons as any)[map.icon] || Icons.Map;
              const isActive = activeMap?.id === map.id;
              
              return (
                <button
                  key={map.id}
                  onClick={() => setActiveMap(map)}
                  className={`shrink-0 snap-center flex items-center gap-1.5 px-3 py-2 md:py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-brand-green text-brand-dark shadow-sm' 
                      : 'bg-brand-cream/50 text-gray-600 hover:bg-brand-cream hover:text-brand-dark'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-dark' : 'text-gray-500'}`} />
                  <span className="whitespace-nowrap">{map.title}</span>
                </button>
              );
            })}
          </div>
          
          {activeMap && (
            <>
              <p className="text-xs text-gray-500 text-center mb-4">{activeMap.description}</p>

              {/* Map Container */}
              <div className="rounded-xl overflow-hidden shadow-inner border-2 border-brand-cream h-[70vh] min-h-[500px] relative bg-gray-100 mb-8">
                {isMapLoading && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green mb-4"></div>
                    <p className="text-brand-dark/60 font-medium animate-pulse">Cargando mapa...</p>
                  </div>
                )}
                <iframe
                  src={`https://www.google.com/maps/d/embed?mid=${activeMap.mid}&ehbc=2D3142`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  onLoad={() => setIsMapLoading(false)}
                  referrerPolicy="no-referrer-when-downgrade"
                  className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isMapLoading ? 'opacity-0' : 'opacity-100'}`}
                ></iframe>
              </div>
            </>
          )}

          {/* Page Image */}
          {pageContent.image && (
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-[21/9] mt-12">
              <img 
                src={pageContent.image} 
                alt={pageContent.title} 
                className="w-full h-full object-cover transition-opacity duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
