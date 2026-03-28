import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { api, getFileUrl } from '../../services/api';
import { ArrowLeft, Save, Image as ImageIcon, Globe, Link as LinkIcon } from 'lucide-react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

// Custom Divider (Horizontal Rule) Blot
const BlockEmbed = Quill.import('blots/block/embed') as any;
class DividerBlot extends BlockEmbed {
  static create() {
    return super.create();
  }
}
(DividerBlot as any).blotName = 'divider';
(DividerBlot as any).tagName = 'hr';
Quill.register(DividerBlot as any);

export function AdminBlogEditor() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    color: 'bg-brand-cream text-brand-dark',
    date: new Date().toISOString().split('T')[0],
    author: 'Equipo DOGCAT',
    isExternal: false,
    externalUrl: '',
    sourceName: '',
    fontSize: 'normal'
  });

  useEffect(() => {
    if (isEditing && id) {
      const fetchPost = async () => {
        try {
          const postData = await api.getBlogPost(id);
          
          if (postData) {
            let normalizedDate = (postData as any).date;
            try {
              const d = new Date(normalizedDate);
              if (!isNaN(d.getTime())) {
                normalizedDate = d.toISOString().split('T')[0];
              }
            } catch (e) {}
            setFormData({ ...(postData as any), date: normalizedDate });
          } else {
            setError('El artículo no existe.');
          }
        } catch (err) {
          console.error("Error fetching post:", err);
          setError('Error al cargar el artículo.');
        } finally {
          setLoading(false);
        }
      };
      
      fetchPost();
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-generate slug from title if not editing
    if (name === 'title' && !isEditing) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['divider'],
        ['clean']
      ],
      handlers: {
        divider: function(this: any) {
          const range = this.quill.getSelection(true);
          this.quill.insertText(range.index, '\n', Quill.sources.USER);
          this.quill.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER);
          this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      // Para posts nuevos, el id debe estar vacío para que el backend genere uno automáticamente
      const postId = isEditing ? id : '';
      
      if (!formData.slug) {
        throw new Error('El slug es obligatorio.');
      }

      const postData = {
        ...formData,
        id: postId
      };

      await api.saveBlogPost(postData);
      navigate('/admin');
    } catch (err: any) {
      console.error("Error saving post:", err);
      setError(err.message || 'Error al guardar el artículo. Revisa los permisos.');
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
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin" className="p-2 hover:bg-brand-dark/5 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-brand-dark/60" />
        </Link>
        <h1 className="text-3xl font-bold text-brand-dark">
          {isEditing ? 'Editar artículo' : 'Nuevo artículo'}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-brand-dark/5">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-brand-dark/80">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
              placeholder="Ej: El rescate de Luna..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-brand-dark/80">URL (Slug)</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              disabled={isEditing}
              className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all disabled:bg-brand-light/50 disabled:text-brand-dark/50"
              placeholder="ej-el-rescate-de-luna"
            />
            <p className="text-xs text-brand-dark/50">El identificador en la URL. No se puede cambiar después.</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-brand-dark/80">Resumen (Excerpt)</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            maxLength={160}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all resize-none"
            placeholder="Un breve resumen que aparecerá en la tarjeta del blog..."
          />
          <p className="text-xs text-brand-dark/50 text-right">{formData.excerpt.length}/160 caracteres</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-brand-dark/80">Contenido principal</label>
          <div className="bg-white rounded-xl border border-brand-dark/10 overflow-hidden">
            <ReactQuill 
              theme="snow" 
              value={formData.content} 
              onChange={handleContentChange} 
              modules={modules}
              className="quill-editor-container"
            />
          </div>
          <p className="text-xs text-brand-dark/50 mt-2">Usa el editor para añadir títulos, negritas, listas, enlaces e imágenes dentro del texto.</p>
        </div>

        {/* External Article Settings */}
        <div className="p-6 bg-brand-cream/30 rounded-2xl border border-brand-green/20 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-green/20 rounded-lg">
                <Globe className="w-5 h-5 text-brand-green" />
              </div>
              <div>
                <h3 className="font-bold text-brand-dark">Configuración de Artículo Externo</h3>
                <p className="text-xs text-brand-dark/60">Marca esta opción si el contenido es de otra fuente.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={formData.isExternal}
                onChange={(e) => setFormData(prev => ({ ...prev, isExternal: e.target.checked }))}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
            </label>
          </div>

          {formData.isExternal && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-brand-dark/80">URL Original</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-4 w-4 text-brand-dark/40" />
                  </div>
                  <input
                    type="url"
                    name="externalUrl"
                    value={formData.externalUrl}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-brand-dark/80">Nombre de la Fuente</label>
                <input
                  type="text"
                  name="sourceName"
                  value={formData.sourceName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                  placeholder="Ej: La Vanguardia, El País..."
                />
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-brand-green/10 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-brand-dark/80">Tamaño de Texto:</label>
              <select
                name="fontSize"
                value={formData.fontSize}
                onChange={handleChange}
                className="px-3 py-1.5 rounded-lg border border-brand-dark/10 focus:ring-2 focus:ring-brand-green outline-none bg-white text-sm"
              >
                <option value="small">Pequeño</option>
                <option value="normal">Normal</option>
                <option value="large">Grande</option>
                <option value="xlarge">Muy Grande</option>
              </select>
            </div>
            <p className="text-xs text-brand-dark/50">Ajusta cómo se verá el cuerpo del artículo en pantallas grandes.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-brand-dark/80">Imagen de portada (Opcional)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ImageIcon className="h-5 w-5 text-brand-dark/40" />
              </div>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                placeholder="Pegar URL o subir archivo..."
              />
            </div>
            
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setIsUploadingImage(true);
                  try {
                    const result = await api.uploadImage(file);
                    if (result.url) {
                      setFormData(prev => ({ ...prev, image: result.url }));
                    }
                  } catch (err) {
                    console.error('Error subiendo imagen:', err);
                    alert('Error al subir la imagen. Comprueba el tamaño o formato.');
                  } finally {
                    setIsUploadingImage(false);
                  }
                }
              }}
              className="block w-full text-sm text-brand-dark/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-green/20 file:text-brand-green hover:file:bg-brand-green/30 cursor-pointer"
            />
            <p className="text-xs text-brand-dark/50">Puedes pegar un enlace de una imagen o seleccionar una de tu ordenador.</p>

            {formData.image && (
              <div className="mt-2 relative aspect-video rounded-xl overflow-hidden border border-brand-dark/10 group">
                <img src={getFileUrl(formData.image)} alt="Preview" className={`w-full h-full object-cover ${isUploadingImage ? 'opacity-50 grayscale' : ''}`} />
                {isUploadingImage && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-green"></div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                >
                  Quitar imagen
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-brand-dark/80">Color de acento de la tarjeta</label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="bg-brand-cream text-brand-dark">Crema (bg-brand-cream)</option>
                <option value="bg-brand-green text-brand-dark">Verde (bg-brand-green)</option>
                <option value="bg-brand-light text-brand-dark">Blanco (bg-brand-light)</option>
              </select>
              <p className="text-xs text-brand-dark/50">Este color se usa como detalle visual de la tarjeta, no como fondo completo.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-brand-dark/80">Autor</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-brand-dark/80">Fecha de publicación</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-brand-dark/10 flex justify-end gap-4">
          <Link
            to="/admin"
            className="px-6 py-3 rounded-xl font-semibold text-brand-dark/70 hover:bg-brand-dark/5 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving || isUploadingImage}
            className="inline-flex items-center gap-2 bg-brand-green text-brand-dark px-8 py-3 rounded-xl font-bold hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-brand-dark"></div>
            ) : (
              <Save className="w-5 h-5" />
            )}
            {saving ? 'Guardando...' : 'Guardar artículo'}
          </button>
        </div>
      </form>
    </div>
  );
}
