import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PawPrint, LogIn } from 'lucide-react';

export function AdminLogin() {
  const { user, loading, signIn } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <PawPrint className="h-12 w-12 text-brand-green fill-brand-green" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-light">
          Panel de administración
        </h2>
        <p className="mt-2 text-center text-sm text-brand-light/60">
          Acceso exclusivo para el equipo de DOGCAT Madrid
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-3xl sm:px-10">
          <button
            onClick={signIn}
            className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-brand-dark bg-brand-green hover:bg-brand-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green transition-colors"
          >
            <LogIn className="w-5 h-5" />
            Introducir contraseña
          </button>
        </div>
      </div>
    </div>
  );
}
