import { blogPosts } from '../data/blog';

// Detectar entorno
const isDev = import.meta.env.DEV;
const isRender = window.location.hostname.includes('render.com');
// Solo usamos PHP si estamos en producción Y NO es Render (lo cual significa Hostinger)
const usePHP = !isDev && !isRender;

const API_URL = import.meta.env.VITE_API_URL || (isDev ? 'http://localhost:3001/api' : '/api');

// --- DATOS DE PRUEBA (MOCK DATA) PARA FALLBACK ---
const mockMapas = [
  {
    id: 'm1',
    title: "Subvenciones 2025",
    mid: "1uN0B5g0B0Ov_e7aO-LRi0y1jCudun5o",
    description: "Mapa de subvenciones para entidades locales en la convocatoria 2025.",
    icon: "Map",
    order: 1
  },
  {
    id: 'm2',
    title: "Subvención Estatal Madrid",
    mid: "15nYt5nqHaz7tlOCxRHZWDEwkjJwelbs",
    description: "Mapa específico de subvenciones estatales para entidades locales en Madrid.",
    icon: "Building2",
    order: 2
  },
  {
    id: 'm3',
    title: "Licitaciones y Contratos",
    mid: "1q6X-VYbUSUqpDXadtFH6Qw_Uz_ff_UQ",
    description: "Mapa de licitaciones y contratos menores relacionados con colonias felinas.",
    icon: "FileText",
    order: 3
  },
  {
    id: 'm4',
    title: "Clínicas y Hospitales Veterinarios",
    mid: "1cp8NLo2PU9w6Aa4si3Uc-yrvsXE-VEs",
    description: "Centros veterinarios y hospitales de urgencia 24h en Madrid.",
    icon: "Hospital",
    order: 4
  }
];

const mockSettings = {
  paypalLink: 'https://paypal.me/dogcatmadrid',
  bizumNumber: '600000000',
  bizumConcept: 'Donativo DOGCAT (Demo)',
  updatedAt: new Date().toISOString()
};

// Helper: en Hostinger las rutas van a archivos .php
// En Render o Local van a las rutas Express originales (sin .php)
function url(path: string) {
  if (usePHP) return `${API_URL}${path}.php`;
  return `${API_URL}${path}`;
}

// Helper para resolver URLs de archivos (especialmente para local dev)
export function getFileUrl(path: string | undefined) {
  if (!path) return '/dog_cat_hero.png'; // Fallback por defecto cada vez que no hay imagen
  
  // Si la base de datos se contaminó con URLs de localhost:3001, las limpiamos para producción
  if (path.includes('localhost:3001') && !isDev) {
    path = path.replace('http://localhost:3001', '');
  }

  if (path.startsWith('http')) return path;
  
  // Normalizar: asegurar que empiece con /uploads si contiene uploads
  let normalizedPath = path;
  if (normalizedPath.includes('uploads/') && !normalizedPath.startsWith('/')) {
    normalizedPath = '/' + normalizedPath;
  }

  if (normalizedPath.startsWith('/uploads')) {
    const finalUrl = isDev ? `http://localhost:3001${normalizedPath}` : normalizedPath;
    if (isDev) console.log(`Resolviendo imagen: ${path} -> ${finalUrl}`);
    return finalUrl;
  }
  
  return path || '/dog_cat_hero.png';
}

export const api = {
  // Blog Posts
  async getBlogPosts() {
    try {
      const res = await fetch(url('/posts'));
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      console.warn("API falló, usando datos de prueba (Modo Demo)");
      return blogPosts;
    }
  },
  
  async getBlogPost(id: string) {
    try {
      // Diferente manejo de IDs en Express vs PHP
      const endpoint = usePHP
        ? `${API_URL}/posts.php?id=${encodeURIComponent(id)}`
        : `${API_URL}/posts/${encodeURIComponent(id)}`;
        
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      return blogPosts.find(p => p.id === id || p.slug === id) || null;
    }
  },
  
  async uploadImage(file: File) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(url('/upload'), {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Backend not found');
      // Aseguramos que devolvemos el objeto con la URL del servidor
      return await res.json();
    } catch (err) {
      return { url: URL.createObjectURL(file) };
    }
  },
  
  async saveBlogPost(postData: any) {
    try {
      const res = await fetch(url('/posts'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      return { success: true, id: postData.id || 'new-id' };
    }
  },
  
  async deleteBlogPost(id: string) {
    try {
      const endpoint = usePHP
        ? `${API_URL}/posts.php?id=${encodeURIComponent(id)}`
        : `${API_URL}/posts/${encodeURIComponent(id)}`;
      const res = await fetch(endpoint, { method: 'DELETE' });
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  },

  // Donation Settings
  async getDonationSettings() {
    try {
      const endpoint = usePHP
        ? `${API_URL}/settings.php`
        : `${API_URL}/settings/donations`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      return mockSettings;
    }
  },
  
  async saveDonationSettings(settingsData: any) {
    try {
      const endpoint = usePHP
        ? `${API_URL}/settings.php`
        : `${API_URL}/settings/donations`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData)
      });
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  },

  // Mapas
  async getMapas() {
    try {
      const res = await fetch(url('/mapas'));
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      return mockMapas;
    }
  },
  
  async saveMapa(mapaData: any) {
    try {
      const res = await fetch(url('/mapas'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mapaData)
      });
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      return { success: true, id: mapaData.id || 'map-id' };
    }
  },
  
  async deleteMapa(id: string) {
    try {
      const endpoint = usePHP
        ? `${API_URL}/mapas.php?id=${encodeURIComponent(id)}`
        : `${API_URL}/mapas/${encodeURIComponent(id)}`;
      const res = await fetch(endpoint, { method: 'DELETE' });
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  },

  // Site Content (Dynamic Texts and Sections)
  async getAllSiteContent() {
    try {
      const res = await fetch(url(`/site-content?t=${Date.now()}`));
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      console.warn("API falló, usando datos por defecto");
      return {};
    }
  },

  async getSiteContent(id: string) {
    try {
      const res = await fetch(url(`/site-content/${id}`));
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async saveSiteContent(id: string, content: any) {
    try {
      const res = await fetch(url('/site-content'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, content })
      });
      if (!res.ok) throw new Error('Error al guardar');
      return await res.json();
    } catch (err) {
      throw err;
    }
  },

  // Backup & Restore
  getBackupUrl() {
    return url('/admin/backup');
  },

  async restoreDatabase(file: File) {
    const formData = new FormData();
    formData.append('database', file);
    try {
      const res = await fetch(url('/admin/restore'), {
        method: 'POST',
        body: formData
      });
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch (err) {
        return { success: false, error: `Respuesta inesperada del servidor (no es JSON): ${text.substring(0, 50)}...` };
      }
    } catch (err) {
      return { success: false, error: 'Error de conexión con el servidor.' };
    }
  }
};
