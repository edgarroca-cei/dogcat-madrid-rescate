import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';

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

  useEffect(() => {
    let mounted = true;
    
    const fetchPosts = async () => {
      try {
        const postsData = await api.getBlogPosts();
        if (mounted) {
          setPosts(postsData as BlogPost[]);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        if (mounted) setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, []);

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
        <Link
          to="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-brand-green text-brand-dark px-4 py-2 rounded-xl font-semibold hover:bg-brand-green/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nueva entrada
        </Link>
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
