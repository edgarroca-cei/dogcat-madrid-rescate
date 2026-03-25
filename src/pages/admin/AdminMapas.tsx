import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Pencil, Trash2, X, Save, Map as MapIcon, FileText, Building2, Search, Cat, Hospital } from 'lucide-react';

export interface Mapa {
  id: string;
  title: string;
  mid: string;
  description: string;
  icon: string;
  order: number;
  createdAt?: any;
}

const AVAILABLE_ICONS = [
  { name: 'Map', icon: MapIcon, label: 'Mapa general' },
  { name: 'FileText', icon: FileText, label: 'Documento' },
  { name: 'Building2', icon: Building2, label: 'Edificio/institución' },
  { name: 'Search', icon: Search, label: 'Búsqueda' },
  { name: 'Cat', icon: Cat, label: 'Gato/animal' },
  { name: 'Hospital', icon: Hospital, label: 'Clínica/Hospital' },
];

export function AdminMapas() {
  const [mapas, setMapas] = useState<Mapa[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMapa, setCurrentMapa] = useState<Partial<Mapa>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMapas();
  }, []);

  const fetchMapas = async () => {
    try {
      const data = await api.getMapas();
      setMapas(data as Mapa[]);
    } catch (err) {
      console.error("Error fetching mapas:", err);
      setError("Error al cargar los mapas.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      if (!currentMapa.title || !currentMapa.mid || !currentMapa.icon) {
        throw new Error("Por favor, rellena todos los campos obligatorios.");
      }

      const dataToSave = {
        title: currentMapa.title,
        mid: currentMapa.mid,
        description: currentMapa.description || '',
        icon: currentMapa.icon,
        order: currentMapa.order || 0,
      };

      if (currentMapa.id) {
        await api.saveMapa({ ...dataToSave, id: currentMapa.id });
      } else {
        await api.saveMapa(dataToSave);
      }

      setIsEditing(false);
      setCurrentMapa({});
      fetchMapas();
    } catch (err: any) {
      console.error("Error saving mapa:", err);
      setError(err.message || "Error al guardar el mapa.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este mapa?")) return;
    try {
      await api.deleteMapa(id);
      fetchMapas();
    } catch (err) {
      console.error("Error deleting mapa:", err);
      alert("Error al eliminar el mapa.");
    }
  };

  const handleSeedData = async () => {
    if (!window.confirm("¿Añadir mapas iniciales?")) return;
    setIsSaving(true);
    try {
      const sampleData = [
        {
          title: "Subvenciones 2025",
          mid: "1uN0B5g0B0Ov_e7aO-LRi0y1jCudun5o",
          description: "Mapa de subvenciones para entidades locales en la convocatoria 2025.",
          icon: "Map",
          order: 1
        },
        {
          title: "Subvención Estatal Madrid",
          mid: "15nYt5nqHaz7tlOCxRHZWDEwkjJwelbs",
          description: "Mapa específico de subvenciones estatales para entidades locales en Madrid.",
          icon: "Building2",
          order: 2
        },
        {
          title: "Licitaciones y Contratos",
          mid: "1q6X-VYbUSUqpDXadtFH6Qw_Uz_ff_UQ",
          description: "Mapa de licitaciones y contratos menores relacionados con colonias felinas.",
          icon: "FileText",
          order: 3
        },
        {
          title: "Gatos Perdidos Madrid",
          mid: "1J9bg7ZYkPDy7unW2ee77Q4FGlKK2tVR6",
          description: "Registro histórico de gatos perdidos en la Comunidad de Madrid (2014-2020).",
          icon: "Search",
          order: 4
        },
        {
          title: "Clínicas y Hospitales Veterinarios",
          mid: "1cp8NLo2PU9w6Aa4si3Uc-yrvsXE-VEs",
          description: "Centros veterinarios y hospitales de urgencia 24h en Madrid.",
          icon: "Hospital",
          order: 5
        }
      ];

      for (const data of sampleData) {
        await api.saveMapa(data);
      }
      fetchMapas();
      alert("Mapas añadidos correctamente.");
    } catch (err) {
      console.error("Error seeding data:", err);
      alert("Error al añadir mapas.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brand-dark">Gestión de mapas</h1>
        <div className="flex gap-3">
          {mapas.length === 0 && (
            <button
              onClick={handleSeedData}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Añadir mapas iniciales
            </button>
          )}
          <button
            onClick={() => {
              setCurrentMapa({ order: mapas.length + 1, icon: 'Map' });
              setIsEditing(true);
              setError('');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-brand-green text-brand-dark rounded-xl font-semibold hover:bg-opacity-90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nuevo mapa
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-xl">
          {error}
        </div>
      )}

      {isEditing ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-light/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-brand-dark">
              {currentMapa.id ? 'Editar mapa' : 'Nuevo mapa'}
            </h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título del mapa</label>
                <input
                  type="text"
                  required
                  value={currentMapa.title || ''}
                  onChange={e => setCurrentMapa({ ...currentMapa, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  placeholder="Ej: Subvenciones 2025"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID del mapa (mid)</label>
                <input
                  type="text"
                  required
                  value={currentMapa.mid || ''}
                  onChange={e => setCurrentMapa({ ...currentMapa, mid: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  placeholder="Ej: 1uN0B5g0B0Ov_e7aO-LRi0y1jCudun5o"
                />
                <p className="text-xs text-gray-500 mt-1">Es el código que aparece en la URL después de "mid=".</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                required
                rows={2}
                value={currentMapa.description || ''}
                onChange={e => setCurrentMapa({ ...currentMapa, description: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                placeholder="Breve descripción de lo que muestra el mapa..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icono</label>
                <select
                  required
                  value={currentMapa.icon || 'Map'}
                  onChange={e => setCurrentMapa({ ...currentMapa, icon: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                >
                  {AVAILABLE_ICONS.map(icon => (
                    <option key={icon.name} value={icon.name}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Orden de aparición</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={currentMapa.order || 1}
                  onChange={e => setCurrentMapa({ ...currentMapa, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 bg-brand-green text-brand-dark rounded-xl font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {isSaving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-brand-light/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-semibold text-gray-600">Orden</th>
                  <th className="p-4 font-semibold text-gray-600">Título</th>
                  <th className="p-4 font-semibold text-gray-600">ID (mid)</th>
                  <th className="p-4 font-semibold text-gray-600 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mapas.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      No hay mapas registrados.
                    </td>
                  </tr>
                ) : (
                  mapas.map((mapa) => {
                    const iconConfig = AVAILABLE_ICONS.find(i => i.name === mapa.icon);
                    const IconComponent = iconConfig ? iconConfig.icon : MapIcon;

                    return (
                      <tr key={mapa.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4 text-gray-600 font-medium">{mapa.order}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 text-brand-green" />
                            <span className="font-medium text-brand-dark">{mapa.title}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 max-w-xs truncate" title={mapa.description}>
                            {mapa.description}
                          </div>
                        </td>
                        <td className="p-4 text-gray-500 font-mono text-sm">{mapa.mid}</td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setCurrentMapa(mapa);
                              setIsEditing(true);
                              setError('');
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(mapa.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
