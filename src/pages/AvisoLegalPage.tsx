export function AvisoLegalPage() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-20 bg-brand-light text-brand-dark min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Aviso legal</h1>
        
        <div className="prose prose-brand max-w-none space-y-6 text-brand-dark/80">
          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">1. Información general</h2>
            <p>
              En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), a continuación se reflejan los siguientes datos:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Titular:</strong> Asociación Dogcat Madrid Rescate</li>
              <li><strong>Correo electrónico:</strong> dogcatmadrid@gmail.com</li>
              <li><strong>Teléfono:</strong> +34 687 30 96 39</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">2. Usuarios</h2>
            <p>
              El acceso y/o uso de este portal web atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">3. Uso del portal</h2>
            <p>
              La web proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a Dogcat Madrid Rescate o a sus licenciantes a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">4. Propiedad intelectual e industrial</h2>
            <p>
              Dogcat Madrid Rescate por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, etc.).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">5. Exclusión de garantías y responsabilidad</h2>
            <p>
              Dogcat Madrid Rescate no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">6. Modificaciones</h2>
            <p>
              Dogcat Madrid Rescate se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
