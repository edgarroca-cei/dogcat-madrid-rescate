import { PawPrint, Facebook, Instagram } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';

export function Footer() {
  const { getContent } = useContent();
  const pageContent = getContent('general', {
    siteName: 'Dogcat Madrid',
    footerCopyright: 'Todos los derechos reservados.',
    siteIcon: 'PawPrint',
    socialFacebook: '',
    socialInstagram: ''
  });

  // Brand Identity Helper
  const BrandLogo = () => {
    const iconName = pageContent.siteIcon || 'PawPrint';
    const Icon = (LucideIcons as any)[iconName] || PawPrint;
    
    if (pageContent.siteLogo) {
      return (
        <img 
          src={pageContent.siteLogo} 
          alt={pageContent.siteName} 
          className="h-6 md:h-8 w-auto object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }
    
    return <Icon className="h-6 w-6 text-brand-green fill-brand-green" />;
  };

  return (
    <footer className="bg-brand-dark text-brand-light py-12 border-t border-brand-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 group">
            <BrandLogo />
            <span className="font-bold text-lg tracking-tight text-brand-light group-hover:text-brand-green transition-colors">
              {pageContent.siteName}
            </span>
          </div>
          
          {/* Social Links */}
          {(pageContent.socialFacebook || pageContent.socialInstagram) && (
            <div className="flex items-center gap-3">
              {pageContent.socialFacebook && (
                <a href={pageContent.socialFacebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-brand-light/10 text-brand-light/70 rounded-full flex items-center justify-center hover:bg-brand-green hover:text-brand-dark transition-all hover:-translate-y-0.5">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {pageContent.socialInstagram && (
                <a href={pageContent.socialInstagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-brand-light/10 text-brand-light/70 rounded-full flex items-center justify-center hover:bg-brand-green hover:text-brand-dark transition-all hover:-translate-y-0.5">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-brand-light/80">
            <Link to="/aviso-legal" className="hover:text-brand-green transition-colors">Aviso legal</Link>
            <Link to="/privacidad" className="hover:text-brand-green transition-colors">Política de privacidad</Link>
            <Link to="/cookies" className="hover:text-brand-green transition-colors">Política de cookies</Link>
            <Link to="/admin" className="hover:text-brand-green transition-colors">Acceso equipo</Link>
          </div>
          
          <div className="text-sm text-brand-light/80 text-center md:text-right">
            &copy; {new Date().getFullYear()} {pageContent.siteName}. 
            {pageContent.footerCopyright && (
              <>
                <br className="hidden md:block" />
                {pageContent.footerCopyright}
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
