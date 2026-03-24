import { blogPosts } from '../data/blog';

// En desarrollo (npm run dev) usa el servidor Express en puerto 3001
// En producción (Hostinger) usa las rutas PHP relativas
const isDev = import.meta.env.DEV;
const API_URL = import.meta.env.VITE_API_URL || (isDev ? 'http://localhost:3001/api' : '/api');

// --- DATOS DE PRUEBA (MOCK DATA) PARA VERCEL/DEMO ---
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
  }
];

const mockSettings = {
  paypalLink: 'https://paypal.me/dogcatmadrid',
  bizumNumber: '600000000',
  bizumConcept: 'Donativo DOGCAT (Demo)',
  updatedAt: new Date().toISOString()
};

// Helper: en producción las rutas van a archivos .php
// En desarrollo van a las rutas Express originales (sin .php)
function url(path: string) {
  if (isDev) return `${API_URL}${path}`;
  return `${API_URL}${path}.php`;
}

export const api = {
  // Blog Posts
  async getBlogPosts() {
    try {
      const res = await fetch(url('/posts'));
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      console.warn("Usando datos de prueba para BlogPosts (Modo Demo)");
      return blogPosts;
    }
  },
  
  async getBlogPost(id: string) {
    try {
      const endpoint = isDev
        ? `${API_URL}/posts/${encodeURIComponent(id)}`
        : `${API_URL}/posts.php?id=${encodeURIComponent(id)}`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      console.warn(`Usando datos de prueba para BlogPost: ${id} (Modo Demo)`);
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
      return await res.json();
    } catch (err) {
      console.warn("Simulando subida de imagen (Modo Demo)");
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
      console.warn("Simulando guardado de Blog Post (Modo Demo)");
      return { success: true, id: postData.id || 'new-id' };
    }
  },
  
  async deleteBlogPost(id: string) {
    try {
      const endpoint = isDev
        ? `${API_URL}/posts/${encodeURIComponent(id)}`
        : `${API_URL}/posts.php?id=${encodeURIComponent(id)}`;
      const res = await fetch(endpoint, { method: 'DELETE' });
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      console.warn("Simulando borrado de Blog Post (Modo Demo)");
      return { success: true };
    }
  },

  // Donation Settings
  async getDonationSettings() {
    try {
      const endpoint = isDev
        ? `${API_URL}/settings/donations`
        : `${API_URL}/settings.php`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      console.warn("Usando datos de prueba para Ajustes (Modo Demo)");
      return mockSettings;
    }
  },
  
  async saveDonationSettings(settingsData: any) {
    try {
      const endpoint = isDev
        ? `${API_URL}/settings/donations`
        : `${API_URL}/settings.php`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData)
      });
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      console.warn("Simulando guardado de Ajustes (Modo Demo)");
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
      console.warn("Usando datos de prueba para Mapas (Modo Demo)");
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
      console.warn("Simulando guardado de Mapa (Modo Demo)");
      return { success: true, id: mapaData.id || 'map-id' };
    }
  },
  
  async deleteMapa(id: string) {
    try {
      const endpoint = isDev
        ? `${API_URL}/mapas/${encodeURIComponent(id)}`
        : `${API_URL}/mapas.php?id=${encodeURIComponent(id)}`;
      const res = await fetch(endpoint, { method: 'DELETE' });
      if (!res.ok) throw new Error('Backend not found');
      return await res.json();
    } catch (err) {
      console.warn("Simulando borrado de Mapa (Modo Demo)");
      return { success: true };
    }
  }
};
