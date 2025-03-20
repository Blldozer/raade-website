
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";
import AppPreloader from "./components/AppPreloader";

// Lazy load pages for better performance
const IndexPage = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/About"));
const InnovationStudiosPage = lazy(() => import("./pages/InnovationStudios"));
const ConferencePage = lazy(() => import("./pages/Conference"));
const ConferenceRegistrationPage = lazy(() => import("./pages/ConferenceRegistration"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetail"));
const StudentApplicationPage = lazy(() => import("./pages/StudentApplication"));
const PartnerApplicationPage = lazy(() => import("./pages/PartnerApplication"));
const SpeakerProfilePage = lazy(() => import("./pages/SpeakerProfile"));
const ComingSoonPage = lazy(() => import("./pages/ComingSoon"));

/**
 * Main App component with optimized loading strategy
 * - Uses AppPreloader to preload critical assets
 * - Implements lazy loading for route components
 * - Provides Suspense fallback for smoother transitions
 */
function App() {
  // Add scroll restoration and analytics setup
  useEffect(() => {
    // Scroll to top on navigation
    const handleNavigation = () => {
      window.scrollTo(0, 0);
    };

    // Register navigation event listeners
    window.addEventListener("popstate", handleNavigation);
    
    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, []);

  return (
    <>
      {/* Preload critical assets */}
      <AppPreloader />
      
      <Navigation />
      
      <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/innovation-studios" element={<InnovationStudiosPage />} />
          <Route path="/conference" element={<ConferencePage />} />
          <Route path="/conference/registration" element={<ConferenceRegistrationPage />} />
          <Route path="/conference/speakers/:id" element={<SpeakerProfilePage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/apply/student" element={<StudentApplicationPage />} />
          <Route path="/apply/partner" element={<PartnerApplicationPage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="*" element={<ComingSoonPage />} />
        </Routes>
      </Suspense>
      
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
