import { useState, useEffect } from 'react';
import { X, Copy, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export function DonationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [paypalLink, setPaypalLink] = useState('');
  const [bizumNumber, setBizumNumber] = useState('');
  const [bizumConcept, setBizumConcept] = useState('Donativo DOGCAT');
  const [showBizumInfo, setShowBizumInfo] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setShowBizumInfo(false);
      setCopied(false);
    };
    
    window.addEventListener('open-donation-modal', handleOpen);
    return () => window.removeEventListener('open-donation-modal', handleOpen);
  }, []);

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
      }
    };

    if (isOpen) {
      fetchSettings();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-brand-dark">Hacer un donativo</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-brand-dark/50 hover:text-brand-dark hover:bg-brand-light rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {!showBizumInfo ? (
            <div className="space-y-4">
              <p className="text-brand-dark/70 mb-6">
                Elige el método que prefieras para ayudarnos a seguir salvando vidas. ¡Cada aportación cuenta!
              </p>

              {paypalLink && (
                <a 
                  href={paypalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-[#003087]/10 hover:border-[#003087] hover:bg-[#003087]/5 transition-all group"
                >
                  <img src="https://cdn.brandfetch.io/id-Wd4a4TS/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="PayPal" className="w-6 h-6 group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                  <span className="font-bold text-[#003087] text-lg">Donar con PayPal</span>
                </a>
              )}

              {bizumNumber && (
                <button 
                  onClick={() => setShowBizumInfo(true)}
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-[#00c4b3]/10 hover:border-[#00c4b3] hover:bg-[#00c4b3]/5 transition-all group"
                >
                  <img src="https://cdn.brandfetch.io/idyRlW6PPW/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="Bizum" className="w-6 h-6 group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                  <span className="font-bold text-[#00c4b3] text-lg">Donar con Bizum</span>
                </button>
              )}

              {!paypalLink && !bizumNumber && (
                <div className="text-center p-4 bg-brand-light/50 rounded-xl text-brand-dark/60">
                  No hay métodos de donación configurados actualmente.
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-2">
                <button 
                  onClick={() => setShowBizumInfo(false)}
                  className="text-brand-dark/50 hover:text-brand-dark"
                >
                  ← Volver
                </button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#00c4b3]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src="https://cdn.brandfetch.io/idyRlW6PPW/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="Bizum" className="w-8 h-8" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">Envía un Bizum</h3>
                <p className="text-brand-dark/70">
                  Abre la app de tu banco y envía un Bizum con los siguientes datos:
                </p>
              </div>

              <div className="bg-brand-light/50 p-5 rounded-2xl space-y-4">
                <div>
                  <p className="text-sm font-bold text-brand-dark/60 mb-1">Número de teléfono</p>
                  <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-brand-dark/10">
                    <span className="font-mono text-lg font-bold text-brand-dark">{bizumNumber}</span>
                    <button 
                      onClick={() => handleCopy(bizumNumber)}
                      className="p-2 text-brand-dark/50 hover:text-brand-green hover:bg-brand-green/10 rounded-lg transition-colors"
                      title="Copiar número"
                    >
                      {copied ? <CheckCircle2 className="w-5 h-5 text-brand-green" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-brand-dark/60 mb-1">Concepto</p>
                  <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-brand-dark/10">
                    <span className="font-medium text-brand-dark">{bizumConcept}</span>
                    <button 
                      onClick={() => handleCopy(bizumConcept)}
                      className="p-2 text-brand-dark/50 hover:text-brand-green hover:bg-brand-green/10 rounded-lg transition-colors"
                      title="Copiar concepto"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
