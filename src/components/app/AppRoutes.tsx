import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import PageLoading from "./PageLoading";
import ErrorBoundary from "../ErrorBoundary";
import GlobalErrorFallback from "./GlobalErrorFallback";
import NavigationWrapper from "./NavigationWrapper";

// Import main pages directly to avoid lazy loading issues
import Index from "../../pages/Index";
import InnovationStudios from "../../pages/InnovationStudios";
import Conference from "../../pages/Conference";
import About from "../../pages/About";
import ProjectDetail from "../../pages/ProjectDetail";
import StudentApplication from "../../pages/StudentApplication";
import PartnerApplication from "../../pages/PartnerApplication";
import ConferenceRegistration from "../../pages/ConferenceRegistration";
import SpeakerProfile from "../../pages/SpeakerProfile";
import RegistrationSuccess from "../../pages/RegistrationSuccess";
import EmailPreview from "../../pages/email-preview";
import EmailExport from "../../pages/email-export";
import AdminReconciliation from "../../pages/AdminReconciliation";

/**
 * AppRoutes component
 * Centralizes all application routes with error boundaries and suspense
 */
const AppRoutes = () => {
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <>
      {/* NavigationWrapper inside proper context */}
      <NavigationWrapper />
      
      <ErrorBoundary 
        fallback={<GlobalErrorFallback error={new Error("Content failed to render")} />}
        suppressDevErrors={isDevelopment}
      >
        <div className="flex-grow">
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/studios" element={<InnovationStudios />} />
              <Route path="/conference" element={<Conference />} />
              <Route path="/conference/register" element={<ConferenceRegistration />} />
              <Route path="/conference/success" element={<RegistrationSuccess />} />
              <Route path="/conference/speakers/:speakerId" element={<SpeakerProfile />} />
              <Route path="/projects/:projectSlug" element={<ProjectDetail />} />
              <Route path="/apply/student" element={<StudentApplication />} />
              <Route path="/apply/partner" element={<PartnerApplication />} />
              <Route path="/email-preview" element={<EmailPreview />} />
              <Route path="/email-export" element={<EmailExport />} />
              <Route path="/admin/reconciliation" element={<AdminReconciliation />} />
            </Routes>
          </Suspense>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default AppRoutes;
