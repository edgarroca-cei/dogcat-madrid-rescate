const API_URL = import.meta.env.VITE_API_URL || '/api';

export const api = {
  // Blog Posts
  async getBlogPosts() {
    try {
      const res = await fetch(`${API_URL}/posts.php`);
      if (!res.ok) throw new Error('Error fetching posts');
      return res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  
  async getBlogPost(id: string) {
    try {
      const res = await fetch(`${API_URL}/posts.php?id=${encodeURIComponent(id)}`);
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
    const res = await fetch(`${API_URL}/upload.php`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Error uploading image');
    return res.json();
  },
  
  async saveBlogPost(postData: any) {
    const res = await fetch(`${API_URL}/posts.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
    if (!res.ok) throw new Error('Error saving post');
    return res.json();
  },
  
  async deleteBlogPost(id: string) {
    const res = await fetch(`${API_URL}/posts.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error deleting post');
    return res.json();
  },

  // Donation Settings
  async getDonationSettings() {
    try {
      const res = await fetch(`${API_URL}/settings.php`);
      if (!res.ok) throw new Error('Error fetching settings');
      return res.json();
    } catch (err) {
      console.error(err);
      return { paypalLink: '', bizumNumber: '', bizumConcept: 'Donativo DOGCAT' };
    }
  },
  
  async saveDonationSettings(settingsData: any) {
    const res = await fetch(`${API_URL}/settings.php`, {
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
      const res = await fetch(`${API_URL}/mapas.php`);
      if (!res.ok) throw new Error('Error fetching mapas');
      return res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  
  async saveMapa(mapaData: any) {
    const res = await fetch(`${API_URL}/mapas.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapaData)
    });
    if (!res.ok) throw new Error('Error saving mapa');
    return res.json();
  },
  
  async deleteMapa(id: string) {
    const res = await fetch(`${API_URL}/mapas.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error deleting mapa');
    return res.json();
  }
};
