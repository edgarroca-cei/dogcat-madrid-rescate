import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PawPrint, FileText, Settings, LogOut, Menu, X, MapPin, Layout, Image } from 'lucide-react';
import { useState } from 'react';

export function AdminLayout() {
  const { user, loading, signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { name: 'Blog', href: '/admin', icon: FileText },
    { name: 'Secciones', href: '/admin/secciones', icon: Layout },
    { name: 'Mapas', href: '/admin/mapas', icon: MapPin },
    { name: 'Multimedia', href: '/admin/media', icon: Image },
    { name: 'Donaciones', href: '/admin/donaciones', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-brand-dark/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-dark text-brand-light transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-20 px-6 border-b border-brand-light/10">
            <Link to="/" className="flex items-center gap-2">
              <PawPrint className="h-8 w-8 text-brand-green fill-brand-green" />
              <span className="font-bold text-xl tracking-tight">DOGCAT</span>
            </Link>
            <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-6 h-6 text-brand-light/60" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-brand-green text-brand-dark font-semibold' 
                      : 'text-brand-light/80 hover:bg-brand-light/10 hover:text-brand-light'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-brand-light/10">
            {/* Foto de perfil quitada */}
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-brand-light/80 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between h-16 px-4 bg-brand-dark text-brand-light border-b border-brand-light/10">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold">Panel de administración</span>
          <div className="w-6" /> {/* Spacer */}
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
