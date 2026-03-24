import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { api } from '../services/api';

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  color: string;
  date: string;
  author: string;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
};

const calculateReadingTime = (content: string) => {
  const words = content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

export function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Escrollear arriba de forma suave cuando el id cambia (por si hace click en un relacionado)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const fetchPostData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const postData = await api.getBlogPost(id);
        
        if (postData) {
          setPost(postData as BlogPostData);
          
          // Cargar relacionados
          const allPosts = await api.getBlogPosts();
          const others = allPosts.filter((p: any) => p.slug !== id && p.id !== id).slice(0, 3);
          setRelatedPosts(others as BlogPostData[]);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-24 pb-16 md:pt-32 md:pb-20 bg-brand-cream text-brand-dark min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  if (error || !post) {
    return <Navigate to="/blog" replace />;
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 bg-brand-cream text-brand-dark min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 bg-brand-dark/5 hover:bg-brand-green hover:text-brand-dark px-4 py-2 rounded-full font-bold transition-all mb-8 sm:mb-12 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al inicio del blog
        </Link>
        
        {/* Header Section: Split Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center mb-12 md:mb-20">
          <div className="w-full lg:w-1/2">
            <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm text-brand-dark/70 mb-6 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-brand-dark/5"><Calendar className="w-4 h-4 text-brand-green" /> {formatDate(post.date)}</span>
              <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-brand-dark/5"><Clock className="w-4 h-4 text-brand-green" /> {readingTime} min lectura</span>
              <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-brand-dark/5"><User className="w-4 h-4 text-brand-green" /> {post.author}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-brand-dark/80 leading-relaxed border-l-4 border-brand-green pl-6 font-medium">
              {post.excerpt}
            </p>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] w-full max-w-lg mx-auto lg:max-w-none group">
              <div className="absolute inset-0 bg-brand-green rounded-[2rem] transform rotate-3 scale-105 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
              <img 
                src={post.image} 
                alt={post.title} 
                className="relative w-full h-full object-cover rounded-[2rem] shadow-xl border-4 border-white"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 md:p-14 rounded-[2.5rem] shadow-xl shadow-brand-dark/5 border border-brand-dark/5 mb-20 relative">
          {/* Decorative pin */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-brand-green rounded-full shadow-inner border-2 border-white/50"></div>
          
          <div 
            className="prose prose-lg md:prose-xl prose-brand max-w-none prose-headings:font-bold prose-headings:text-brand-dark prose-p:text-brand-dark/80 prose-a:text-brand-green hover:prose-a:text-brand-green/80 prose-img:rounded-3xl prose-img:shadow-lg prose-ul:list-disc prose-ul:pl-6 marker:text-brand-green"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Share Section */}
        <div className="max-w-3xl mx-auto mb-20 flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t border-b border-brand-dark/10">
          <div className="font-bold text-lg text-brand-dark">Compartir este artículo:</div>
          <div className="flex items-center gap-4">
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-dark hover:bg-[#1877F2] hover:text-white transition-colors"
              title="Compartir en Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a 
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-dark hover:bg-black hover:text-white transition-colors"
              title="Compartir en X (Twitter)"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a 
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-dark hover:bg-[#0A66C2] hover:text-white transition-colors"
              title="Compartir en LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('¡Enlace copiado al portapapeles!');
              }}
              className="w-12 h-12 rounded-full bg-brand-green text-brand-dark shadow-sm flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              title="Copiar enlace"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Otras Entradas / Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-7xl mx-auto pt-16 border-t-2 border-brand-dark/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
              <div>
                <p className="text-brand-dark/50 font-bold tracking-wider uppercase text-sm mb-2">
                  Sigue descubriendo
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark">Otras entradas recientes</h2>
              </div>
              <Link to="/blog" className="inline-flex items-center gap-2 text-brand-dark font-bold hover:text-brand-green transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm hover:shadow-md">
                Ver todos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.slug}`}
                  className={`${relatedPost.color} rounded-3xl overflow-hidden shadow-lg flex flex-col group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <div className="text-xs opacity-70 mb-3 font-bold uppercase tracking-wider flex items-center gap-2">
                       <Calendar className="w-3 h-3" /> {formatDate(relatedPost.date)}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight group-hover:opacity-80 transition-opacity">
                      {relatedPost.title}
                    </h3>
                    <p className="opacity-80 text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
