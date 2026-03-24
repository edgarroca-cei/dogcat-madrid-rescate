import { Fish, Home, LifeBuoy, Stethoscope, Heart, Shield, Users } from 'lucide-react';

export function ColoniasFelinasPage() {
  const needs = [
    {
      title: 'Material de captura',
      description: 'Jaulas trampa y transportines para rescates seguros.',
      icon: <LifeBuoy className="w-8 h-8" />,
    },
    {
      title: 'Atención veterinaria',
      description: 'Esterilizaciones, vacunas y curas de urgencia.',
      icon: <Stethoscope className="w-8 h-8" />,
    },
    {
      title: 'Alimentación diaria',
      description: 'Pienso y comida húmeda para mantenerlos fuertes.',
      icon: <Fish className="w-8 h-8" />,
    },
    {
      title: 'Refugios de invierno',
      description: 'Casetas para protegerlos del frío y la lluvia.',
      icon: <Home className="w-8 h-8" />,
    },
  ];

  return (
    <div className="pt-28 pb-16 md:pt-32 md:pb-20 bg-brand-light text-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 text-brand-green font-bold tracking-wider uppercase text-sm mb-4 bg-brand-green/10 px-4 py-2 rounded-full">
            <Home className="w-4 h-4" /> Nuestro trabajo
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Gestión de colonias felinas
          </h1>
          <p className="text-brand-dark/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            En DOGCAT Madrid, trabajamos incansablemente para mejorar la calidad de vida de los gatos comunitarios. Utilizamos el método C.E.R. (Captura, Esterilización y Retorno) para controlar la población de forma ética y compasiva.
          </p>
        </div>

        {/* Main Content Split */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl">
            <img 
              src="/cat_colony.jpg" 
              alt="Gatos de colonia alimentándose" 
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">¿Qué es el método C.E.R.?</h2>
            <p className="text-brand-dark/80 text-lg leading-relaxed">
              El método C.E.R. es la única forma demostrada, ética y efectiva de gestionar las poblaciones de gatos callejeros. Consiste en:
            </p>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-brand-dark flex items-center justify-center font-bold">C</div>
                <div>
                  <strong className="block text-lg">Captura</strong>
                  <span className="text-brand-dark/70">Atrapamos a los gatos de forma segura y sin causarles estrés utilizando jaulas trampa especializadas.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-brand-dark flex items-center justify-center font-bold">E</div>
                <div>
                  <strong className="block text-lg">Esterilización</strong>
                  <span className="text-brand-dark/70">Los gatos son revisados por veterinarios, esterilizados, vacunados y desparasitados.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-brand-dark flex items-center justify-center font-bold">R</div>
                <div>
                  <strong className="block text-lg">Retorno</strong>
                  <span className="text-brand-dark/70">Una vez recuperados, los gatos son devueltos a su colonia original, donde las cuidadoras seguirán alimentándolos y vigilando su salud.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Where does the money go? */}
        <div className="bg-brand-cream rounded-[2rem] p-8 md:p-12 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">¿A dónde va tu donativo?</h2>
            <p className="text-brand-dark/70 text-lg">
              No recibimos ayudas públicas suficientes. Dependemos de la solidaridad de personas como tú para mantener a las colonias sanas y alimentadas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {needs.map((need, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green/20 text-brand-green mb-4">
                  {need.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{need.title}</h3>
                <p className="text-sm text-brand-dark/70">{need.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-donation-modal'))}
              className="px-8 py-4 bg-brand-dark text-brand-light rounded-full font-bold text-lg hover:bg-brand-dark/90 transition-transform hover:scale-105 shadow-lg"
            >
              Hacer un donativo ahora
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <Heart className="w-12 h-12 text-brand-green mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Bienestar animal</h3>
            <p className="text-brand-dark/70">Mejoramos la salud de los gatos, evitando peleas, enfermedades y camadas indeseadas.</p>
          </div>
          <div className="p-6">
            <Shield className="w-12 h-12 text-brand-green mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Salud pública</h3>
            <p className="text-brand-dark/70">Una colonia controlada y sana es un beneficio para todo el vecindario, controlando plagas de forma natural.</p>
          </div>
          <div className="p-6">
            <Users className="w-12 h-12 text-brand-green mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Convivencia</h3>
            <p className="text-brand-dark/70">Reducimos los ruidos por celo y marcajes, mejorando la convivencia entre vecinos y felinos.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
