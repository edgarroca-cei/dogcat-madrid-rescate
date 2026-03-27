import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, ExternalLink, Database } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
};

export function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const postsData = await api.getBlogPosts();
      setPosts(postsData as BlogPost[]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSeedData = async () => {
    if (!window.confirm("¿Añadir 5 entradas de prueba al blog?")) return;
    setLoading(true);
    try {
      const samplePosts = [
        {
          title: "Rescate nocturno en el centro",
          slug: "rescate-nocturno-centro",
          excerpt: "Una noche intensa ayudando a un cachorro atrapado en una obra. Gracias al aviso de un vecino pudimos actuar rápido.",
          content: "<p>Fue una noche larga pero valió la pena. Recibimos el aviso a las 2 AM sobre un cachorro que lloraba en una zona de obras vallada. Tras coordinarnos con la policía local, pudimos acceder y rescatar al pequeño Toby, que ahora descansa seguro en nuestra casa de acogida.</p>",
          image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200",
          color: "bg-brand-cream text-brand-dark",
          date: new Date().toISOString(),
          author: "Equipo DOGCAT"
        },
        {
          title: "Nueva colonia gestionada en Vallecas",
          slug: "colonia-vallecas-gestion",
          excerpt: "Gracias a los voluntarios hemos comenzado la gestión CER en una nueva zona con más de 20 felinos.",
          content: "<p>La expansión de nuestro programa CER continúa. Esta semana hemos empezado el censo y las primeras capturas en una zona industrial de Vallecas. Es un reto grande pero contamos con un equipo increíble de alimentadores autorizados.</p>",
          image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1200",
          color: "bg-brand-green text-brand-dark",
          date: new Date().toISOString(),
          author: "Unidad CER"
        },
        {
          title: "Consejos para el calor con tus mascotas",
          slug: "consejos-calor-mascotas",
          excerpt: "Cómo mantener a tus perros y gatos frescos este verano. Evita golpes de calor con estas pautas sencillas.",
          content: "<p>Con la llegada de la ola de calor, es vital recordar: nunca dejes a tu mascota en el coche, mantén agua fresca siempre disponible y evita los paseos en las horas centrales del día por el asfalto caliente.</p>",
          image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&q=80&w=1200",
          color: "bg-brand-light text-brand-dark",
          date: new Date().toISOString(),
          author: "Salud Animal"
        },
        {
          title: "Entrevista con nuestra veterinaria",
          slug: "entrevista-veterinaria-dogcat",
          excerpt: "Hablamos sobre la importancia de las revisiones anuales y la vacunación preventiva en animales rescatados.",
          content: "<p>Hoy charlamos con Ana, nuestra veterinaria colaboradora, sobre los retos de salud más comunes que encontramos en la calle y cómo una detección temprana puede salvar vidas.</p>",
          image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200",
          color: "bg-brand-cream text-brand-dark",
          date: new Date().toISOString(),
          author: "Redacción"
        },
        {
          title: "Final feliz para Luna",
          slug: "final-feliz-luna",
          excerpt: "Tras 6 meses en el refugio, Luna por fin ha encontrado su hogar definitivo con una familia maravillosa.",
          content: "<p>No hay nada que nos llene más que ver estas fotos de Luna durmiendo en su nuevo sofá. Después de su largo proceso de recuperación, por fin tiene la estabilidad y el amor que siempre mereció.</p>",
          image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=1200",
          color: "bg-brand-green text-brand-dark",
          date: new Date().toISOString(),
          author: "Adopciones"
        }
      ];

      for (const p of samplePosts) {
        await api.saveBlogPost(p);
      }
      await fetchPosts();
    } catch (error) {
      console.error("Error seeding posts:", error);
      alert("Error al generar las entradas.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el artículo "${title}"?`)) {
      try {
        await api.deleteBlogPost(id);
        setPosts(posts.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Hubo un error al eliminar el artículo.");
      }
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
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-dark">Entradas del blog</h1>
        <div className="flex gap-3">
          {posts.length === 0 && (
            <button
              onClick={handleSeedData}
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              <Database className="w-5 h-5" />
              Generar artículos de prueba
            </button>
          )}
          <Link
            to="/admin/blog/new"
            className="inline-flex items-center gap-2 bg-brand-green text-brand-dark px-4 py-2 rounded-xl font-semibold hover:bg-brand-green/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nueva entrada
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-brand-dark/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-light/50 border-b border-brand-dark/5">
                <th className="px-6 py-4 font-semibold text-brand-dark/70 text-sm uppercase tracking-wider">Título</th>
                <th className="px-6 py-4 font-semibold text-brand-dark/70 text-sm uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 font-semibold text-brand-dark/70 text-sm uppercase tracking-wider">Autor</th>
                <th className="px-6 py-4 font-semibold text-brand-dark/70 text-sm uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-dark/5">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-brand-dark/60">
                    No hay entradas de blog todavía. ¡Crea la primera!
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-brand-light/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-brand-dark">{post.title}</div>
                      <div className="text-xs text-brand-dark/50 mt-1">/{post.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-brand-dark/70">{formatDate(post.date)}</td>
                    <td className="px-6 py-4 text-brand-dark/70">{post.author}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          to={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-dark/50 hover:text-brand-green transition-colors"
                          title="Ver en la web"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                        <Link
                          to={`/admin/blog/edit/${post.id}`}
                          className="text-brand-dark/50 hover:text-blue-500 transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="text-brand-dark/50 hover:text-red-500 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
