import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface ContentContextType {
  content: any;
  loading: boolean;
  refreshContent: () => Promise<void>;
  getContent: (id: string, defaults: any) => any;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const refreshContent = async () => {
    setLoading(true);
    try {
      const data = await api.getAllSiteContent();
      setContent(data);
    } catch (err) {
      console.error('Error fetching site content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const general = content.general || {};
    const title = general.siteTitle || general.siteName || 'DOGCAT Madrid';
    if (document.title !== title) {
      document.title = title;
    }
  }, [content]);

  useEffect(() => {
    refreshContent();
  }, []);

  const getContent = (id: string, defaults: any) => {
    const dbContent = content[id] || {};
    return { ...defaults, ...dbContent };
  };

  return (
    <ContentContext.Provider value={{ content, loading, refreshContent, getContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
