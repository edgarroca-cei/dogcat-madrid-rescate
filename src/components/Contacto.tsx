import React, { useState } from 'react';
import { Facebook, Instagram, Mail, MessageCircle, Phone, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';

export function Contacto() {
  const { getContent } = useContent();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // New setting from Admin Dashboard
  const generalSettings = getContent('general', {
    contact_email_notifications: 'dogcatmadrid@gmail.com'
  });

  const contactData = getContent('contacto_page', {
    contact_email: 'dogcatmadrid@gmail.com',
    contact_phone: '687309639',
    contact_whatsapp: '34687309639',
    contact_facebook: '',
    contact_instagram: ''
  });

  // Prioritize the new specific setting for notifications
  const recipientEmail = generalSettings.contact_email_notifications || contactData.contact_email || 'dogcatmadrid@gmail.com';
  
  const email = contactData.contact_email || 'dogcatmadrid@gmail.com';
  const phone = contactData.contact_phone || '687309639';
  const whatsapp = contactData.contact_whatsapp || '34687309639';
  const facebookUrl = contactData.contact_facebook;
  const instagramUrl = contactData.contact_instagram;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="text-brand-dark pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              {/* Contact Cards */}
              <a href={`mailto:${email}`} className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl hover:bg-white transition-all border border-transparent hover:border-brand-dark/10 hover:shadow-md group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-brand-dark transition-all duration-300">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-0.5 sm:mb-1">Email</h3>
                  <p className="text-sm sm:text-base text-brand-dark/70 break-all">{email}</p>
                </div>
              </a>

              <div className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl hover:bg-white transition-all border border-transparent hover:border-brand-dark/10 hover:shadow-md group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-brand-dark transition-all duration-300">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-0.5 sm:mb-1">Teléfono y WhatsApp</h3>
                  <p className="text-sm sm:text-base text-brand-dark/70 mb-3">+34 {phone}</p>
                  <div className="flex flex-wrap gap-2">
                    <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-dark hover:text-brand-light bg-brand-green/20 hover:bg-brand-green px-3 py-1.5 rounded-lg transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                    <a href={`tel:+34${phone}`} className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-dark hover:text-brand-light bg-brand-dark/5 hover:bg-brand-dark px-3 py-1.5 rounded-lg transition-colors">
                      <Phone className="w-3.5 h-3.5" /> Llamar
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block pt-6 sm:pt-8 border-t border-brand-dark/10">
              <h3 className="font-bold mb-4 sm:mb-5 text-base sm:text-lg">Síguenos en redes</h3>
              <div className="flex gap-4">
                {facebookUrl && (
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-brand-dark/10 text-brand-dark rounded-full flex items-center justify-center hover:bg-brand-green hover:border-brand-green hover:text-brand-dark transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                )}
                {instagramUrl && (
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-brand-dark/10 text-brand-dark rounded-full flex items-center justify-center hover:bg-brand-green hover:border-brand-green hover:text-brand-dark transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-xl shadow-brand-dark/5 border border-brand-dark/5">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                <Send className="w-6 h-6 sm:w-7 sm:h-7 text-brand-green" />
                Envíanos un mensaje
              </h3>
              
              {status === 'success' ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold">¡Mensaje enviado con éxito!</h4>
                  <p className="text-brand-dark/60 max-w-sm mx-auto">Gracias por contactar con nosotros. Te responderemos lo antes posible.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-8 py-3 bg-brand-dark text-brand-light rounded-full font-bold hover:bg-brand-green hover:text-brand-dark transition-all"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  {/* Configuración de FormSubmit */}
                  <input type="hidden" name="_subject" value="Nuevo mensaje desde la web" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="name" className="block text-sm font-bold text-brand-dark">Nombre completo</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="Nombre"
                        required
                        disabled={status === 'loading'}
                        className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-brand-light/50 border border-brand-dark/10 focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all text-sm sm:text-base disabled:opacity-50"
                        placeholder="Ej. Ana García"
                      />
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="email" className="block text-sm font-bold text-brand-dark">Correo electrónico</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="Email"
                        required
                        disabled={status === 'loading'}
                        className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-brand-light/50 border border-brand-dark/10 focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all text-sm sm:text-base disabled:opacity-50"
                        placeholder="ana@ejemplo.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 sm:space-y-2">
                    <label htmlFor="subject" className="block text-sm font-bold text-brand-dark">Motivo de tu consulta</label>
                    <div className="relative">
                      <select 
                        id="subject" 
                        name="Asunto"
                        required
                        disabled={status === 'loading'}
                        defaultValue=""
                        className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-brand-light/50 border border-brand-dark/10 focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all text-sm sm:text-base appearance-none cursor-pointer disabled:opacity-50"
                      >
                        <option value="" disabled>Selecciona un asunto...</option>
                        <option value="Información general">Información general</option>
                        <option value="Ayuda con colonia felina">Ayuda con colonia felina</option>
                        <option value="Quiero ser casa de acogida">Quiero ser casa de acogida</option>
                        <option value="Colaboración empresas">Colaboración empresas</option>
                        <option value="Donaciones">Donaciones</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 sm:px-5 pointer-events-none text-brand-dark/50">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label htmlFor="message" className="block text-sm font-bold text-brand-dark">Tu mensaje</label>
                    <textarea 
                      id="message" 
                      name="Mensaje"
                      required
                      disabled={status === 'loading'}
                      rows={4}
                      className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-brand-light/50 border border-brand-dark/10 focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all resize-none text-sm sm:text-base disabled:opacity-50"
                      placeholder="Cuéntanos en detalle cómo podemos ayudarte..."
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-sm font-bold animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-4 h-4" />
                      Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full py-3.5 sm:py-4 bg-brand-dark text-brand-light rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-brand-green hover:text-brand-dark transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                  
                  <p className="text-[10px] sm:text-xs text-brand-dark/50 text-center mt-4 sm:mt-6 px-2 sm:px-4">
                    Al enviar este formulario, aceptas nuestra <Link to="/privacidad" className="underline hover:text-brand-green">política de privacidad</Link> y el tratamiento de tus datos para gestionar tu consulta.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
