import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, Search, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api, getFileUrl } from '../services/api';
import { useContent } from '../contexts/ContentContext';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  color: string;
  date: string;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
};

export function BlogList() {
  const { getContent } = useContent();
  const pageContent = getContent('blog_page', {
    title: 'Noticias del mundo animal',
    text: 'Descubre nuestras últimas historias de rescate, consejos felinos y entérate de las campañas vigentes.'
  });

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await api.getBlogPosts();
        setPosts(postsData as BlogPost[]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 bg-brand-dark text-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Search Header */}
        <div className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 text-brand-green font-bold tracking-wider uppercase text-sm mb-4 bg-brand-green/10 px-4 py-2 rounded-full">
            <BookOpen className="w-4 h-4" /> Nuestro blog
          </p>
          {pageContent.title && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              {pageContent.title}
            </h1>
          )}
          {pageContent.text && (
            <p className="text-brand-dark/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              {pageContent.text}
            </p>
          )}

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto transform transition-all hover:scale-[1.02]">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-brand-light/40" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-brand-light/5 backdrop-blur-sm border border-brand-light/10 rounded-3xl text-brand-light placeholder-brand-light/40 focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-brand-light/10 transition-all text-lg shadow-2xl"
              placeholder="Buscar artículos o temas de interés..."
            />
          </div>
        </div>


        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-brand-light/60">
            Aún no hay artículos publicados. ¡Vuelve pronto!
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-brand-light/60">
            No hemos encontrado ningún artículo que coincida con tu búsqueda.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredPosts.map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className={`${post.color} rounded-[2rem] overflow-hidden shadow-xl flex flex-col group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-green/10`}
              >
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <img 
                    src={getFileUrl(post.image)} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs opacity-70 mb-4 font-bold tracking-wide uppercase">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDate(post.date)}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight group-hover:opacity-80 transition-opacity">
                    {post.title}
                  </h3>
                  <p className="opacity-80 text-base leading-relaxed mb-8 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="self-start font-bold flex items-center gap-2 group-hover:gap-4 transition-all text-sm mt-auto bg-black/5 px-4 py-2 rounded-full">
                    Leer artículo <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
