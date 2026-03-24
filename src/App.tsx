import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ProyectoPage } from './pages/ProyectoPage';
import { ColoniasFelinasPage } from './pages/ColoniasFelinasPage';
import { RecursosPage } from './pages/RecursosPage';
import { ContactoPage } from './pages/ContactoPage';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { AvisoLegalPage } from './pages/AvisoLegalPage';
import { PoliticaPrivacidadPage } from './pages/PoliticaPrivacidadPage';
import { PoliticaCookiesPage } from './pages/PoliticaCookiesPage';
import { ScrollToTop } from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminBlogEditor } from './pages/admin/AdminBlogEditor';
import { AdminMapas } from './pages/admin/AdminMapas';
import { AdminDonaciones } from './pages/admin/AdminDonaciones';
import { DonationModal } from './components/DonationModal';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <DonationModal />
        <div className="min-h-screen bg-brand-dark text-brand-light font-sans selection:bg-brand-green selection:text-brand-dark flex flex-col">
          <Routes>
            {/* Admin Routes (No Navbar/Footer) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="mapas" element={<AdminMapas />} />
              <Route path="donaciones" element={<AdminDonaciones />} />
              <Route path="blog/new" element={<AdminBlogEditor />} />
              <Route path="blog/edit/:id" element={<AdminBlogEditor />} />
            </Route>

            {/* Public Routes */}
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <div className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/proyecto" element={<ProyectoPage />} />
                      <Route path="/colonias-felinas" element={<ColoniasFelinasPage />} />
                      <Route path="/recursos" element={<RecursosPage />} />
                      <Route path="/contacto" element={<ContactoPage />} />
                      <Route path="/blog" element={<BlogList />} />
                      <Route path="/blog/:id" element={<BlogPost />} />
                      <Route path="/aviso-legal" element={<AvisoLegalPage />} />
                      <Route path="/privacidad" element={<PoliticaPrivacidadPage />} />
                      <Route path="/cookies" element={<PoliticaCookiesPage />} />
                    </Routes>
                  </div>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
