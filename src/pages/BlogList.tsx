import { useState, useEffect } from 'react';
import { ArrowRight, Search, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api, getFileUrl } from '../services/api';
import { useContent } from '../contexts/ContentContext';
import { getBlogCardClasses } from '../utils/blogCardStyles';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  color: string;
  date: string;
}

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
            <p className="text-brand-light/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className={`${getBlogCardClasses(post.color)} rounded-3xl overflow-hidden flex flex-col group hover:-translate-y-1.5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20`}
              >
                <div className="relative h-32 sm:h-48 overflow-hidden">
                  <img 
                    src={`${getFileUrl(post.image)}?auto=format&fit=crop&q=80&w=800&fm=webp`}
                    alt={post.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-brand-dark/75 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-grow line-clamp-3 sm:line-clamp-none">
                    {post.excerpt}
                  </p>
                  <div className="self-start font-bold flex items-center gap-2 text-xs sm:text-sm bg-brand-dark/[0.04] px-4 py-2 rounded-full group-hover:bg-brand-green/20 transition-colors">
                    Leer más <ArrowRight className="w-4 h-4" />
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
