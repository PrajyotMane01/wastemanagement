import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Blogs from "./pages/Blog";
import NotFound from "./pages/NotFound";
import SmoothScrollProvider from "./components/providers/SmoothScrollProvider";
import ScrollToTop from "@/components/ScrollToTop";
import BlogPost from "@/pages/BlogPost";
import AboutUs from "./pages/AboutUs";
import TermsAndConditions from "./pages/TermsAndConditions";
import TermsOfService from "./pages/TermsOfService";
import CookiesPolicy from "./pages/CookiesPolicy";

// Scroll to top component for page transitions
const PageScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const queryClient = new QueryClient();

const AppRoutes = () => (
  <>
    <PageScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/cookies-policy" element={<CookiesPolicy />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SmoothScrollProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SmoothScrollProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
