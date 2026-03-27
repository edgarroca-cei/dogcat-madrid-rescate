import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 bg-brand-dark relative">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-3xl w-full text-center relative z-10">
        <div className="relative mb-8 pt-10">
          <h1 className="text-[12rem] md:text-[18rem] font-black text-white/5 leading-none select-none tracking-tighter">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Página <span className="text-brand-green">no encontrada</span>
            </h2>
          </div>
        </div>
        
        <p className="text-brand-light/70 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed text-balance">
          Parece que hemos perdido el rastro de esta dirección. No te preocupes, nuestros amigos peludos te ayudarán a regresar.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/"
            className="group flex items-center gap-3 bg-brand-green text-brand-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-light transition-all shadow-2xl shadow-brand-green/10"
          >
            <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            Volver al inicio
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg text-white/90 border border-white/10 hover:bg-white/5 transition-all backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            Regresar
          </button>
        </div>
        
        <div className="mt-20 pt-10 border-t border-white/5 text-brand-light/30 text-sm uppercase tracking-[0.2em] font-medium">
          DOGCAT Madrid · Rescate Animal
        </div>
      </div>
    </div>
  );
}
