import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Save } from 'lucide-react';

export function AdminDonaciones() {
  const [paypalLink, setPaypalLink] = useState('');
  const [bizumNumber, setBizumNumber] = useState('');
  const [bizumConcept, setBizumConcept] = useState('Donativo DOGCAT');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.getDonationSettings();
        if (data) {
          setPaypalLink(data.paypalLink || '');
          setBizumNumber(data.bizumNumber || '');
          setBizumConcept(data.bizumConcept || 'Donativo DOGCAT');
        }
      } catch (error) {
        console.error("Error fetching donation settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });

    try {
      await api.saveDonationSettings({
        paypalLink,
        bizumNumber,
        bizumConcept
      });
      
      setMessage({ text: 'Configuración guardada correctamente.', type: 'success' });
    } catch (error) {
      console.error("Error saving donation settings:", error);
      setMessage({ text: 'Error al guardar la configuración.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-dark">Configuración de donaciones</h1>
        <p className="text-brand-dark/70 mt-2">
          Gestiona los enlaces y números que aparecerán cuando los usuarios hagan clic en "Donar ahora".
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-brand-dark/5 p-6 md:p-8">
        {message.text && (
          <div className={`p-4 rounded-xl mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-brand-dark flex items-center gap-2">
              <span className="text-[#003087]">PayPal</span>
            </h2>
            <div className="space-y-2">
              <label htmlFor="paypalLink" className="block text-sm font-bold text-brand-dark">
                Enlace de PayPal.me
              </label>
              <input
                type="url"
                id="paypalLink"
                value={paypalLink}
                onChange={(e) => setPaypalLink(e.target.value)}
                placeholder="https://paypal.me/tuusuario"
                className="w-full px-4 py-3 rounded-xl bg-brand-light/50 border border-brand-dark/10 focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all"
              />
              <p className="text-xs text-brand-dark/50">
                Ejemplo: https://paypal.me/dogcatmadrid
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-dark/10 space-y-4">
            <h2 className="text-xl font-bold text-brand-dark flex items-center gap-2">
              <span className="text-[#00c4b3]">Bizum</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="bizumNumber" className="block text-sm font-bold text-brand-dark">
                  Número de teléfono
                </label>
                <input
                  type="text"
                  id="bizumNumber"
                  value={bizumNumber}
                  onChange={(e) => setBizumNumber(e.target.value)}
                  placeholder="Ej. 600 000 000"
                  className="w-full px-4 py-3 rounded-xl bg-brand-light/50 border border-brand-dark/10 focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="bizumConcept" className="block text-sm font-bold text-brand-dark">
                  Concepto por defecto
                </label>
                <input
                  type="text"
                  id="bizumConcept"
                  value={bizumConcept}
                  onChange={(e) => setBizumConcept(e.target.value)}
                  placeholder="Donativo DOGCAT"
                  className="w-full px-4 py-3 rounded-xl bg-brand-light/50 border border-brand-dark/10 focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-dark/10 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-brand-green text-brand-dark px-6 py-3 rounded-xl font-bold hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
