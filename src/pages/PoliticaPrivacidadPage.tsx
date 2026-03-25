import { useContent } from '../contexts/ContentContext';

export function PoliticaPrivacidadPage() {
  const { getContent } = useContent();
  const general = getContent('general', {
    siteName: 'Dogcat Madrid Rescate'
  });
  const orgName = general.siteName || 'Dogcat Madrid Rescate';

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-20 bg-brand-light text-brand-dark min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Política de privacidad</h1>
        
        <div className="prose prose-brand max-w-none space-y-6 text-brand-dark/80">
          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">1. Información al usuario</h2>
            <p>
              {orgName}, como Responsable del Tratamiento, le informa que, según lo dispuesto en el Reglamento (UE) 2016/679, de 27 de abril, (RGPD) y en la L.O. 3/2018, de 5 de diciembre, de protección de datos y garantía de los derechos digitales (LOPDGDD), trataremos sus datos tal y como reflejamos en la presente Política de Privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">2. Principios aplicados en el tratamiento de datos</h2>
            <p>
              En el tratamiento de sus datos personales, el Responsable aplicará los siguientes principios que se ajustan a las exigencias del nuevo reglamento europeo de protección de datos:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Principio de licitud, lealtad y transparencia:</strong> El Responsable siempre requerirá el consentimiento para el tratamiento de sus datos personales.</li>
              <li><strong>Principio de minimización de datos:</strong> El Responsable solicitará solo los datos estrictamente necesarios para el fin o los fines que los solicita.</li>
              <li><strong>Principio de limitación del plazo de conservación:</strong> Los datos se mantendrán durante el tiempo estrictamente necesario para el fin o los fines del tratamiento.</li>
              <li><strong>Principio de integridad y confidencialidad:</strong> Sus datos serán tratados de tal manera que su seguridad, confidencialidad e integridad esté garantizada.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">3. Finalidad del tratamiento</h2>
            <p>
              Sus datos personales se recaban con la finalidad de:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Gestionar las consultas, solicitudes de información o cualquier tipo de petición que sea realizada por el usuario a través de cualquiera de las formas de contacto que se ponen a su disposición.</li>
              <li>Gestionar las donaciones y aportaciones económicas realizadas a la asociación.</li>
              <li>Gestionar las solicitudes de adopción, acogida o voluntariado.</li>
              <li>Enviar comunicaciones informativas sobre nuestras actividades, campañas y eventos (siempre que haya dado su consentimiento expreso).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">4. Legitimación</h2>
            <p>
              La base legal para el tratamiento de sus datos es:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>El consentimiento del interesado (para consultas, envío de boletines, etc.).</li>
              <li>La ejecución de un contrato o precontrato (para adopciones, acogidas, voluntariado).</li>
              <li>El cumplimiento de obligaciones legales (para la gestión de donaciones y emisión de certificados fiscales).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">5. Destinatarios</h2>
            <p>
              Los datos no se cederán a terceros salvo en los casos en que exista una obligación legal (por ejemplo, a la Agencia Tributaria para la gestión de donaciones) o sea estrictamente necesario para la prestación del servicio (por ejemplo, a clínicas veterinarias colaboradoras en procesos de adopción o gestión de colonias).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">6. Derechos de los usuarios</h2>
            <p>
              Cualquier persona tiene derecho a obtener confirmación sobre si en {orgName} estamos tratando datos personales que les conciernan, o no.
            </p>
            <p className="mt-2">
              Las personas interesadas tienen derecho a:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Solicitar el acceso a los datos personales relativos al interesado.</li>
              <li>Solicitar su rectificación o supresión.</li>
              <li>Solicitar la limitación de su tratamiento.</li>
              <li>Oponerse al tratamiento.</li>
              <li>Solicitar la portabilidad de los datos.</li>
            </ul>
            <p className="mt-4">
              Podrá ejercer sus derechos enviando un correo electrónico a <strong>dogcatmadrid@gmail.com</strong>, adjuntando copia de su DNI o documento equivalente.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
