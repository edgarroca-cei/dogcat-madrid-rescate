import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface User {
  uid: string;
  email: string;
  displayName: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos la verificación de sesión
    const storedAuth = localStorage.getItem('dogcat_auth');
    if (storedAuth === 'true') {
      setUser({
        uid: 'admin-123',
        email: 'admin@dogcat.es',
        displayName: 'Administrador DOGCAT',
      });
    }
    setLoading(false);
  }, []);

  const signIn = async () => {
    // Simulamos un retraso de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Si fuera un login real con contraseña, aquí se pedirían credenciales.
    // Como es temporal, vamos a loguear directamente.
    // En produccion se puede mostrar un prompt temporal.
    const fakePass = window.prompt("Introduce la contraseña de administrador");
    if (fakePass === 'D0gc4t!') {
      localStorage.setItem('dogcat_auth', 'true');
      setUser({
        uid: 'admin-123',
        email: 'admin@dogcat.es',
        displayName: 'Administrador DOGCAT',
      });
    } else {
      throw new Error('Contraseña incorrecta');
    }
  };

  const signOut = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.removeItem('dogcat_auth');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
