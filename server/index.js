import express from 'express';
import cors from 'cors';
import { run, get, all } from './db.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

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

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
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

  // Catch-all route to serve Vite/React SPA index.html for other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));
