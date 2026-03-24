import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api, getFileUrl } from '../services/api';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  color: string;
}

export function Blog() {
  const [stories, setStories] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await api.getBlogPosts();
        setStories(postsData.slice(0, 3) as BlogPost[]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-16 md:py-20 bg-brand-dark text-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <p className="text-brand-green font-semibold tracking-wider uppercase text-sm mb-2">
              Actualidad
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Noticias del mundo animal</h2>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-brand-light hover:text-brand-green transition-colors font-semibold text-sm">
            Ver todas las noticias <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-green"></div>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-12 text-brand-light/60">
            Aún no hay historias publicadas.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <Link 
                key={story.id} 
                to={`/blog/${story.slug}`}
                className={`${story.color} rounded-3xl overflow-hidden shadow-xl flex flex-col group hover:-translate-y-1 transition-transform duration-300`}
              >
                <div className="relative h-32 sm:h-48 overflow-hidden">
                  <img 
                    src={getFileUrl(story.image)} 
                    alt={story.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 leading-tight">
                    {story.title}
                  </h3>
                  <p className="opacity-80 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-grow line-clamp-3 sm:line-clamp-none">
                    {story.excerpt}
                  </p>
                  <div className="self-start font-bold flex items-center gap-2 hover:opacity-70 transition-opacity text-xs sm:text-sm">
                    Leer más <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
