import { PawPrint, Menu, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';

export function Navbar() {
  const { getContent } = useContent();
  const pageContent = getContent('general', {
    siteName: 'DOGCAT Madrid',
    donationButton: 'Donar ahora'
  });
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Colonias felinas', href: '/colonias-felinas' },
    { name: 'Dogcat Rescate', href: '/proyecto' },
    { name: 'Recursos', href: '/recursos' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '/contacto' },
  ];

  // Helper to determine if we should use a standard anchor or a Link
  const renderLink = (link: { name: string; href: string }, isMobile: boolean) => {
    const isHashLink = link.href.includes('#');
    const isActive = location.pathname === link.href;
    
    const baseClasses = isMobile 
      ? "block px-4 py-3 rounded-xl text-lg font-medium text-brand-light/90 hover:text-brand-dark hover:bg-brand-green transition-all"
      : "text-sm font-medium text-brand-light/80 hover:text-brand-green transition-colors";
      
    const activeClasses = isActive 
      ? (isMobile ? "bg-brand-green/10 text-brand-green" : "text-brand-green") 
      : "";

    if (isHashLink) {
      // If we are already on the home page, just use a normal anchor for smooth scrolling
      if (location.pathname === '/') {
        return (
          <a
            key={link.name}
            href={link.href.replace('/', '')}
            onClick={() => isMobile && setIsOpen(false)}
            className={`${baseClasses} ${activeClasses}`}
          >
            {link.name}
          </a>
        );
      }
      // If we are on another page, use a normal anchor to navigate back to home with hash
      return (
        <a
          key={link.name}
          href={link.href}
          onClick={() => isMobile && setIsOpen(false)}
          className={`${baseClasses} ${activeClasses}`}
        >
          {link.name}
        </a>
      );
    }

    // For actual routes (like /proyecto)
    return (
      <Link
        key={link.name}
        to={link.href}
        onClick={() => isMobile && setIsOpen(false)}
        className={`${baseClasses} ${activeClasses}`}
      >
        {link.name}
      </Link>
    );
  };

  // Brand Identity Helper
  const BrandLogo = () => {
    const iconName = pageContent.siteIcon || 'PawPrint';
    const Icon = (LucideIcons as any)[iconName] || PawPrint;
    
    if (pageContent.siteLogo) {
      return (
        <img 
          src={pageContent.siteLogo} 
          alt={pageContent.siteName} 
          className="h-8 md:h-10 w-auto object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }
    
    return <Icon className="h-7 w-7 md:h-8 md:w-8 text-brand-green fill-brand-green" />;
  };

  return (
    <nav className="fixed w-full z-50 bg-brand-dark/90 backdrop-blur-md border-b border-brand-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group transition-transform hover:scale-105 active:scale-95">
            <BrandLogo />
            <span className="font-bold text-lg md:text-xl tracking-tight text-brand-light group-hover:text-brand-green transition-colors">
              {pageContent.siteName}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => renderLink(link, false))}
            {pageContent.donationButton && (
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-donation-modal'))}
                className="bg-brand-cream text-brand-dark px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-brand-light transition-colors"
              >
                {pageContent.donationButton}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-light hover:text-brand-green p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-brand-dark/95 backdrop-blur-xl border-b border-brand-light/10 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2 sm:px-6 shadow-2xl">
          {navLinks.map((link) => renderLink(link, true))}
          {pageContent.donationButton && (
            <div className="pt-4 pb-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.dispatchEvent(new CustomEvent('open-donation-modal'));
                }}
                className="block w-full text-center bg-brand-green text-brand-dark px-6 py-4 rounded-xl font-bold text-lg hover:bg-white transition-colors shadow-lg shadow-brand-green/20"
              >
                {pageContent.donationButton}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
