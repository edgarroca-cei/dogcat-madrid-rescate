import { PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-light py-12 border-t border-brand-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <PawPrint className="h-6 w-6 text-brand-green fill-brand-green" />
            <span className="font-bold text-lg tracking-tight text-brand-light">
              Dogcat Madrid
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-brand-light/80">
            <Link to="/aviso-legal" className="hover:text-brand-green transition-colors">Aviso legal</Link>
            <Link to="/privacidad" className="hover:text-brand-green transition-colors">Política de privacidad</Link>
            <Link to="/cookies" className="hover:text-brand-green transition-colors">Política de cookies</Link>
            <Link to="/admin" className="hover:text-brand-green transition-colors">Acceso equipo</Link>
          </div>
          
          <div className="text-sm text-brand-light/80 text-center md:text-right">
            &copy; {new Date().getFullYear()} Dogcat Madrid. <br className="hidden md:block" />
            Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
