import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Team from "./pages/Team";
import Technologies from "./pages/Technologies";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import Careers from "./pages/Careers";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ContactManager from "./pages/admin/ContactManager";
import BlogManager from "./pages/admin/BlogManager";
import BlogEditor from "./components/admin/blog/BlogEditor";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes with Navigation */}
            <Route element={<>
              <Navigation />
              <Outlet />
            </>}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/team" element={<Team />} />
              <Route path="/technologies" element={<Technologies />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogPost />} />
              <Route path="/careers" element={<Careers />} />
            </Route>

            {/* Protected Admin Routes - No Main Navigation */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="contacts" element={<ContactManager />} />
              <Route path="blogs" element={<BlogManager />} />
              <Route path="blogs/new" element={<BlogEditor />} />
              <Route path="blogs/:id/edit" element={<BlogEditor />} />
            </Route>

            {/* Catch-all - With Navigation */}
            <Route path="*" element={<>
              <Navigation />
              <NotFound />
            </>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

