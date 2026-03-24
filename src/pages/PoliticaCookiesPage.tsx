export function PoliticaCookiesPage() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-20 bg-brand-light text-brand-dark min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Política de cookies</h1>
        
        <div className="prose prose-brand max-w-none space-y-6 text-brand-dark/80">
          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">1. ¿Qué son las cookies?</h2>
            <p>
              Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">2. ¿Qué tipos de cookies utiliza esta página web?</h2>
            <ul className="list-disc pl-5 mt-2 space-y-4">
              <li>
                <strong>Cookies técnicas:</strong> Son aquellas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan como, por ejemplo, controlar el tráfico y la comunicación de datos, identificar la sesión, acceder a partes de acceso restringido, recordar los elementos que integran un pedido, realizar el proceso de compra de un pedido, realizar la solicitud de inscripción o participación en un evento, utilizar elementos de seguridad durante la navegación, almacenar contenidos para la difusión de videos o sonido o compartir contenidos a través de redes sociales.
              </li>
              <li>
                <strong>Cookies de personalización:</strong> Son aquellas que permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del usuario como por ejemplo serian el idioma, el tipo de navegador a través del cual accede al servicio, la configuración regional desde donde accede al servicio, etc.
              </li>
              <li>
                <strong>Cookies de análisis:</strong> Son aquellas que bien tratadas por nosotros o por terceros, nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado. Para ello se analiza su navegación en nuestra página web con el fin de mejorar la oferta de productos o servicios que le ofrecemos.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">3. Revocación y eliminación de cookies</h2>
            <p>
              Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador instalado en tu ordenador.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Google Chrome:</strong> Configuración - Privacidad y seguridad - Cookies y otros datos de sitios.</li>
              <li><strong>Mozilla Firefox:</strong> Opciones - Privacidad & Seguridad - Cookies y datos del sitio.</li>
              <li><strong>Safari:</strong> Preferencias - Privacidad.</li>
              <li><strong>Microsoft Edge:</strong> Configuración - Cookies y permisos del sitio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">4. Terceros prestadores de servicios</h2>
            <p>
              En concreto, los terceros prestadores de servicios con los que hemos contratado algún servicio para el que es necesario la utilización de cookies son:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Google Analytics:</strong> Herramienta de analítica web de Google que principalmente permite a los propietarios de sitios web conocer cómo interactúan los usuarios con su sitio web.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
