import express from 'express';
import cors from 'cors';
import { run, get, all, reload } from './db.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// --- BACKUP & RESTORE (HIGH PRIORITY) ---
app.get('/api/test-json', (req, res) => {
  res.json({ success: true, message: 'API is working and returning JSON' });
});

app.get('/api/admin/backup', (req, res) => {
  console.log('Solicitud de backup recibida');
  const dbPath = path.join(__dirname, '../database.json');
  if (fs.existsSync(dbPath)) {
    res.download(dbPath, 'backup-dogcat.json');
  } else {
    console.error('Base de datos no encontrada en:', dbPath);
    res.status(404).json({ error: 'Archivo de base de datos no encontrado' });
  }
});

app.post('/api/admin/restore', upload.single('database'), async (req, res) => {
  console.log('Solicitud de restauración recibida');
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }

  const dbPath = path.join(__dirname, '../database.json');
  try {
    const content = fs.readFileSync(req.file.path, 'utf-8');
    JSON.parse(content);
    fs.copyFileSync(req.file.path, dbPath);
    await reload();
    fs.unlinkSync(req.file.path);
    res.json({ success: true, message: 'Base de datos restaurada correctamente.' });
  } catch (err) {
    console.error('Error en restauración:', err);
    try {
      const content = fs.readFileSync(req.file.path, 'utf-8');
      console.log('Inicio del contenido del archivo recibido:', content.substring(0, 200));
    } catch (readErr) {}
    res.status(400).json({ error: `Error en la restauración: ${err.message}` });
  }
});

// Configurar Subida de Archivos con Multer
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'portada-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });

// Servir estáticamente la carpeta de subidas para desarrollo y producción
app.use('/uploads', express.static(uploadsDir));

app.post('/api/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }

  const originalPath = req.file.path;
  const targetName = path.basename(originalPath, path.extname(originalPath)) + '.webp';
  const targetPath = path.join(uploadsDir, targetName);

  try {
    // Optimizar imagen con sharp
    await sharp(originalPath)
      .resize(1200, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(targetPath);

    // Eliminar el archivo original para ahorrar espacio
    fs.unlinkSync(originalPath);

    res.json({ url: `/uploads/${targetName}` });
  } catch (err) {
    console.error('Error al procesar la imagen con sharp:', err);
    // Si falla el procesamiento (ej: formato no soportado), devolver el original
    res.json({ url: `/uploads/${req.file.filename}` });
  }
});

// --- POSTS ---
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await all('SELECT * FROM posts ORDER BY createdAt DESC');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await get('SELECT * FROM posts WHERE id = ? OR slug = ?', [req.params.id, req.params.id]);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/posts', async (req, res) => {
  const p = req.body;
  const isEditing = !!p.id;
  const id = p.id || Math.random().toString(36).substr(2, 9);
  const createdAt = p.createdAt || new Date().toISOString();
  
  try {
    if (isEditing) {
      const existing = await get('SELECT id FROM posts WHERE id = ?', [id]);
      if (existing) {
        await run(`UPDATE posts SET 
          title=?, slug=?, excerpt=?, content=?, image=?, color=?, date=?, author=?, createdAt=?
          WHERE id=?`, 
          [p.title, p.slug, p.excerpt, p.content, p.image, p.color, p.date, p.author, p.createdAt || createdAt, id]
        );
      } else {
        await run(`INSERT INTO posts 
          (id, title, slug, excerpt, content, image, color, date, author, createdAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [id, p.title, p.slug, p.excerpt, p.content, p.image, p.color, p.date, p.author, createdAt]
        );
      }
    } else {
       await run(`INSERT INTO posts 
        (id, title, slug, excerpt, content, image, color, date, author, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, p.title, p.slug, p.excerpt, p.content, p.image, p.color, p.date, p.author, createdAt]
      );
    }
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    await run('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SETTINGS (Donations) ---
app.get('/api/settings/donations', async (req, res) => {
  try {
    const row = await get("SELECT * FROM settings WHERE id = 'donations'");
    res.json(row || { paypalLink: '', bizumNumber: '', bizumConcept: 'Donativo DOGCAT' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/settings/donations', async (req, res) => {
  const p = req.body;
  try {
    const existing = await get("SELECT id FROM settings WHERE id = 'donations'");
    if (existing) {
      await run(`UPDATE settings SET paypalLink=?, bizumNumber=?, bizumConcept=?, updatedAt=? WHERE id='donations'`,
        [p.paypalLink, p.bizumNumber, p.bizumConcept, p.updatedAt || new Date().toISOString()]
      );
    } else {
      await run(`INSERT INTO settings (id, paypalLink, bizumNumber, bizumConcept, updatedAt) VALUES ('donations', ?, ?, ?, ?)`,
        [p.paypalLink, p.bizumNumber, p.bizumConcept, p.updatedAt || new Date().toISOString()]
      );
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- MAPAS ---
app.get('/api/mapas', async (req, res) => {
  try {
    const mapas = await all('SELECT * FROM mapas ORDER BY "order" ASC');
    res.json(mapas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SITE CONTENT ---
app.get('/api/site-content', async (req, res) => {
  try {
    const rows = await all('SELECT * FROM site_content');
    const content = {};
    rows.forEach(row => {
      try {
        content[row.id] = JSON.parse(row.content);
      } catch (e) {
        content[row.id] = row.content;
      }
    });
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/site-content/:id', async (req, res) => {
  try {
    const row = await get('SELECT * FROM site_content WHERE id = ?', [req.params.id]);
    if (row) {
      try {
        res.json(JSON.parse(row.content));
      } catch (e) {
        res.json(row.content);
      }
    } else {
      res.status(404).json({ error: 'Content not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/site-content', async (req, res) => {
  const { id, content } = req.body;
  const contentStr = typeof content === 'object' ? JSON.stringify(content) : content;
  const updatedAt = new Date().toISOString();
  
  try {
    const existing = await get('SELECT id FROM site_content WHERE id = ?', [id]);
    if (existing) {
      await run('UPDATE site_content SET content = ?, updatedAt = ? WHERE id = ?', [contentStr, updatedAt, id]);
    } else {
      await run('INSERT INTO site_content (id, content, updatedAt) VALUES (?, ?, ?)', [id, contentStr, updatedAt]);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/mapas', async (req, res) => {
  const p = req.body;
  const isEditing = !!p.id;
  const id = p.id || Math.random().toString(36).substr(2, 9);
  const createdAt = p.createdAt || new Date().toISOString();
  
  try {
    if (isEditing) {
      const existing = await get('SELECT id FROM mapas WHERE id = ?', [id]);
      if (existing) {
        await run(`UPDATE mapas SET title=?, mid=?, description=?, icon=?, "order"=?, createdAt=? WHERE id=?`, 
          [p.title, p.mid, p.description, p.icon, p.order, p.createdAt || createdAt, id]
        );
      } else {
        await run(`INSERT INTO mapas (id, title, mid, description, icon, "order", createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [id, p.title, p.mid, p.description, p.icon, p.order, createdAt]
        );
      }
    } else {
       await run(`INSERT INTO mapas (id, title, mid, description, icon, "order", createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, p.title, p.mid, p.description, p.icon, p.order, createdAt]
      );
    }
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/mapas/:id', async (req, res) => {
  try {
    await run('DELETE FROM mapas WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// --- Serve React App with Dynamic SEO (Production Mode) ---
const distPath = path.join(__dirname, '../dist');

if (fs.existsSync(distPath)) {
  // Serve everything in dist except index.html statically
  app.use(express.static(distPath, { index: false }));

  // Dynamic route for blog articles
  app.get('/blog/:slug', async (req, res) => {
    try {
      const slug = req.params.slug;
      
      // Attempt to get the post from the database
      const post = await get('SELECT * FROM posts WHERE slug = ?', [slug]);
      
      // Read the base index.html
      let html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
      
      if (post) {
        // Sanitize strings just in case for HTML attributes
        const safeTitle = (post.title || '').replace(/"/g, '&quot;');
        const safeDesc = (post.excerpt || '').replace(/"/g, '&quot;');
        const safeImg = post.image || '/dog_cat_hero.png';

        // Replace the default title and meta tags with dynamic values
        html = html.replace(
          /<title>[^<]*<\/title>/i,
          `<title>${safeTitle} | DOGCAT Madrid</title>`
        );
        html = html.replace(
          /<meta name="description" content="[^"]*" \/>/gi,
          `<meta name="description" content="${safeDesc}" />`
        );
        
        // Open Graph
        html = html.replace(
          /<meta property="og:title" content="[^"]*" \/>/gi,
          `<meta property="og:title" content="${safeTitle} | DOGCAT Madrid" />`
        );
        html = html.replace(
          /<meta property="og:description" content="[^"]*" \/>/gi,
          `<meta property="og:description" content="${safeDesc}" />`
        );
        html = html.replace(
          /<meta property="og:image" content="[^"]*" \/>/gi,
          `<meta property="og:image" content="${safeImg}" />`
        );

        // Twitter Cards
        html = html.replace(
          /<meta property="twitter:title" content="[^"]*" \/>/gi,
          `<meta property="twitter:title" content="${safeTitle} | DOGCAT Madrid" />`
        );
        html = html.replace(
          /<meta property="twitter:description" content="[^"]*" \/>/gi,
          `<meta property="twitter:description" content="${safeDesc}" />`
        );
        html = html.replace(
          /<meta property="twitter:image" content="[^"]*" \/>/gi,
          `<meta property="twitter:image" content="${safeImg}" />`
        );
      }
      
      res.send(html);
    } catch (err) {
      console.error('Error serving dynamic blog post:', err);
      // Fallback
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });

  // API 404 handler - ensures API calls don't get the SPA's index.html
  app.all('/api/*', (req, res) => {
    res.status(404).json({ error: `Ruta API no encontrada: ${req.method} ${req.url}` });
  });

  // Catch-all route to serve Vite/React SPA index.html for other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));
