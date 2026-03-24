// En desarrollo (npm run dev) usa el servidor Express en puerto 3001
// En producción (Hostinger) usa las rutas PHP relativas
const isDev = import.meta.env.DEV;

const API_URL = import.meta.env.VITE_API_URL || (isDev ? 'http://localhost:3001/api' : '/api');

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
      if (!res.ok) throw new Error('Error fetching posts');
      return res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  
  async getBlogPost(id: string) {
    try {
      const endpoint = isDev
        ? `${API_URL}/posts/${encodeURIComponent(id)}`
        : `${API_URL}/posts.php?id=${encodeURIComponent(id)}`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Error fetching post');
      return res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(url('/upload'), {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Error uploading image');
    return res.json();
  },
  
  async saveBlogPost(postData: any) {
    const res = await fetch(url('/posts'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
    if (!res.ok) throw new Error('Error saving post');
    return res.json();
  },
  
  async deleteBlogPost(id: string) {
    const endpoint = isDev
      ? `${API_URL}/posts/${encodeURIComponent(id)}`
      : `${API_URL}/posts.php?id=${encodeURIComponent(id)}`;
    const res = await fetch(endpoint, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error deleting post');
    return res.json();
  },

  // Donation Settings
  async getDonationSettings() {
    try {
      const endpoint = isDev
        ? `${API_URL}/settings/donations`
        : `${API_URL}/settings.php`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Error fetching settings');
      return res.json();
    } catch (err) {
      console.error(err);
      return { paypalLink: '', bizumNumber: '', bizumConcept: 'Donativo DOGCAT' };
    }
  },
  
  async saveDonationSettings(settingsData: any) {
    const endpoint = isDev
      ? `${API_URL}/settings/donations`
      : `${API_URL}/settings.php`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settingsData)
    });
    if (!res.ok) throw new Error('Error saving settings');
    return res.json();
  },

  // Mapas
  async getMapas() {
    try {
      const res = await fetch(url('/mapas'));
      if (!res.ok) throw new Error('Error fetching mapas');
      return res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  
  async saveMapa(mapaData: any) {
    const res = await fetch(url('/mapas'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapaData)
    });
    if (!res.ok) throw new Error('Error saving mapa');
    return res.json();
  },
  
  async deleteMapa(id: string) {
    const endpoint = isDev
      ? `${API_URL}/mapas/${encodeURIComponent(id)}`
      : `${API_URL}/mapas.php?id=${encodeURIComponent(id)}`;
    const res = await fetch(endpoint, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error deleting mapa');
    return res.json();
  }
};
