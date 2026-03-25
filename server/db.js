import fs from 'fs/promises';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = resolve(__dirname, '../database.json');

// Simple JSON Database implementation to bypass sqlite3 binding issues
let data = {
  posts: [],
  settings: [],
  mapas: [],
  site_content: []
};

// Synchronous initial load to mimic sqlite3 behavior
if (existsSync(dbPath)) {
  try {
    data = JSON.parse(readFileSync(dbPath, 'utf-8'));
  } catch (e) {
    console.error('Error loading JSON DB:', e);
  }
} else {
  writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

async function save() {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export async function run(sql, params = []) {
  const sqlLower = sql.toLowerCase();
  
  if (sqlLower.includes('insert into site_content')) {
    const [id, content, updatedAt] = params;
    const index = data.site_content.findIndex(item => item.id === id);
    if (index > -1) {
      data.site_content[index] = { id, content, updatedAt };
    } else {
      data.site_content.push({ id, content, updatedAt });
    }
  } else if (sqlLower.includes('update site_content')) {
    const [content, updatedAt, id] = params;
    const index = data.site_content.findIndex(item => item.id === id);
    if (index > -1) data.site_content[index] = { id, content, updatedAt };
  } else if (sqlLower.includes('insert into posts')) {
    const [id, title, slug, excerpt, content, image, color, date, author, createdAt] = params;
    data.posts.push({ id, title, slug, excerpt, content, image, color, date, author, createdAt });
  } else if (sqlLower.includes('update posts')) {
    const [title, slug, excerpt, content, image, color, date, author, createdAt, id] = params;
    const index = data.posts.findIndex(item => item.id === id);
    if (index > -1) data.posts[index] = { id, title, slug, excerpt, content, image, color, date, author, createdAt };
  } else if (sqlLower.includes('delete from posts')) {
    const [id] = params;
    data.posts = data.posts.filter(p => p.id !== id);
  } else if (sqlLower.includes('insert into settings')) {
    const [paypalLink, bizumNumber, bizumConcept, updatedAt] = params;
    data.settings = data.settings.filter(s => s.id !== 'donations');
    data.settings.push({ id: 'donations', paypalLink, bizumNumber, bizumConcept, updatedAt });
  } else if (sqlLower.includes('update settings')) {
    const [paypalLink, bizumNumber, bizumConcept, updatedAt] = params;
    const index = data.settings.findIndex(s => s.id === 'donations');
    if (index > -1) data.settings[index] = { id: 'donations', paypalLink, bizumNumber, bizumConcept, updatedAt };
  } else if (sqlLower.includes('insert into mapas')) {
    const [id, title, mid, description, icon, order, createdAt] = params;
    data.mapas.push({ id, title, mid, description, icon, order, createdAt });
  } else if (sqlLower.includes('update mapas')) {
    const [title, mid, description, icon, order, createdAt, id] = params;
    const index = data.mapas.findIndex(m => m.id === id);
    if (index > -1) data.mapas[index] = { id, title, mid, description, icon, order, createdAt };
  } else if (sqlLower.includes('delete from mapas')) {
    const [id] = params;
    data.mapas = data.mapas.filter(m => m.id !== id);
  }

  await save();
  return { lastID: params[0] || Date.now() };
}

export async function get(sql, params = []) {
  const sqlLines = sql.toLowerCase();
  if (sqlLines.includes('from site_content')) {
    return data.site_content.find(item => item.id === params[0]);
  } else if (sqlLines.includes('from settings')) {
    return data.settings.find(s => s.id === 'donations');
  } else if (sqlLines.includes('from posts')) {
    const [idOrSlug] = params;
    return data.posts.find(p => p.id === idOrSlug || p.slug === idOrSlug);
  } else if (sqlLines.includes('from mapas')) {
    return data.mapas.find(m => m.id === params[0]);
  }
  return null;
}

export async function all(sql, params = []) {
  const sqlLower = sql.toLowerCase();
  if (sqlLower.includes('from site_content')) {
    return data.site_content;
  } else if (sqlLower.includes('from posts')) {
    return [...data.posts].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  } else if (sqlLower.includes('from mapas')) {
    return [...data.mapas].sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  return [];
}

export async function reload() {
  if (existsSync(dbPath)) {
    try {
      const content = readFileSync(dbPath, 'utf-8');
      data = JSON.parse(content);
      console.log('Base de datos recargada correctamente');
      return true;
    } catch (e) {
      console.error('Error al recargar JSON DB:', e);
      return false;
    }
  }
  return false;
}

export default { run, get, all, reload };
