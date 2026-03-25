import React, { useState, useEffect } from 'react';
import { api, getFileUrl } from '../../services/api';
import { Trash2, Copy, ExternalLink, Image as ImageIcon, Search, Check, AlertCircle, Loader2 } from 'lucide-react';

interface MediaFile {
  filename: string;
  url: string;
  size: number;
  mtime: string;
}

export function AdminMedia() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const data = await api.getMedia();
      setMedia(data);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const result = await api.uploadImage(file);
      if (result.url) {
        // Refresh gallery
        await fetchMedia();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error al subir la imagen");
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCopyUrl = (filename: string) => {
    const url = getFileUrl('/uploads/' + filename);
    navigator.clipboard.writeText(url);
    setCopyStatus(filename);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const handleDelete = async (filename: string) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar permanentemente esta imagen?`)) return;
    
    setDeleteLoading(filename);
    try {
      await api.deleteMedia(filename);
      setMedia(media.filter(m => m.filename !== filename));
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("No se pudo eliminar el archivo.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const filteredMedia = media.filter(m => 
    m.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && !isUploading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-brand-green" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
           <h1 className="text-3xl font-bold text-brand-dark flex items-center gap-3">
             <ImageIcon className="w-8 h-8 text-brand-green" />
             Galería Multimedia
           </h1>
           <p className="text-brand-dark/50 mt-1">Gestiona todas las imágenes subidas al servidor.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-initial md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/30" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-brand-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green transition-all shadow-sm"
            />
          </div>
          
          <label className={`inline-flex items-center gap-2 px-4 py-2 bg-brand-green text-brand-dark rounded-xl font-bold text-sm cursor-pointer transition-all hover:scale-105 shadow-sm ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
            {isUploading ? 'Subiendo...' : 'Subir Imagen'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {filteredMedia.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-20 text-center border border-brand-dark/5 shadow-sm">
          <div className="w-20 h-20 bg-brand-light/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ImageIcon className="w-10 h-10 text-brand-dark/20" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mb-2">No se encontraron archivos</h3>
          <p className="text-brand-dark/50">Prueba con otro término de búsqueda o sube nuevas imágenes desde el Blog o Secciones.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia.map((file) => (
            <div key={file.filename} className="group bg-white rounded-3xl overflow-hidden border border-brand-dark/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-square overflow-hidden bg-brand-light/10">
                <img 
                  src={getFileUrl('/uploads/' + file.filename)} 
                  alt={file.filename}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                   <button 
                     onClick={() => handleCopyUrl(file.filename)}
                     className="p-2 bg-white rounded-xl text-brand-dark hover:bg-brand-green transition-colors shadow-lg"
                     title="Copiar URL"
                   >
                     {copyStatus === file.filename ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                   </button>
                   <a 
                     href={getFileUrl('/uploads/' + file.filename)} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="p-2 bg-white rounded-xl text-brand-dark hover:bg-brand-green transition-colors shadow-lg"
                     title="Ver original"
                   >
                     <ExternalLink className="w-5 h-5" />
                   </a>
                   <button 
                     onClick={() => handleDelete(file.filename)}
                     disabled={deleteLoading === file.filename}
                     className="p-2 bg-white rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-lg disabled:opacity-50"
                     title="Eliminar"
                   >
                     {deleteLoading === file.filename ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                   </button>
                </div>
              </div>
              <div className="p-4">
                <p className="font-bold text-brand-dark truncate text-sm mb-1" title={file.filename}>
                  {file.filename}
                </p>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-extrabold text-brand-dark/40">
                   <span>{formatSize(file.size)}</span>
                   <span>{new Date(file.mtime).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 p-6 bg-brand-dark/5 border border-brand-dark/5 rounded-[2rem] flex items-start gap-4">
        <div className="p-3 bg-white rounded-2xl shadow-sm text-amber-500">
           <AlertCircle className="w-6 h-6" />
        </div>
        <div className="text-sm text-brand-dark/70 leading-relaxed">
          <p className="font-bold text-brand-dark mb-1">Nota sobre la limpieza del servidor:</p>
          <p>En este entorno demo (Render), las imágenes se borran automáticamente cada vez que el servidor se reinicia. En un hosting definitivo con almacenamiento persistente, estas imágenes se conservarán y podrás usar esta galería para mantener el servidor limpio borrando las que ya no necesites.</p>
        </div>
      </div>
    </div>
  );
}
