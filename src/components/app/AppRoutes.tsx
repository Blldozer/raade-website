
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLoading from './PageLoading';

// Pages
const Index = lazy(() => import('@/pages/Index'));
const About = lazy(() => import('@/pages/About'));
const InnovationStudios = lazy(() => import('@/pages/InnovationStudios'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const Conference = lazy(() => import('@/pages/Conference'));
const PartnerApplication = lazy(() => import('@/pages/PartnerApplication'));
const StudentApplication = lazy(() => import('@/pages/StudentApplication'));
const Success = lazy(() => import('@/pages/Success'));
const SpeakerProfile = lazy(() => import('@/pages/SpeakerProfile'));
const ConferenceRegistration = lazy(() => import('@/pages/ConferenceRegistration'));
const RegistrationSuccess = lazy(() => import('@/pages/RegistrationSuccess'));
const EmailVerification = lazy(() => import('@/pages/EmailVerification'));
const EmailPreview = lazy(() => import('@/pages/email-preview'));
const AdminReconciliation = lazy(() => import('@/pages/AdminReconciliation'));
const RunStripeReconciliation = lazy(() => import('@/pages/RunStripeReconciliation'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/studios" element={<InnovationStudios />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/conference" element={<Conference />} />
        <Route path="/partner-application" element={<PartnerApplication />} />
        <Route path="/student-application" element={<StudentApplication />} />
        <Route path="/success" element={<Success />} />
        <Route path="/conference/speakers/:id" element={<SpeakerProfile />} />
        <Route path="/conference/register" element={<ConferenceRegistration />} />
        <Route path="/conference/register/success" element={<RegistrationSuccess />} />
        <Route path="/conference/verify" element={<EmailVerification />} />
        <Route path="/email-preview" element={<EmailPreview />} />
        <Route path="/admin/reconciliation" element={<AdminReconciliation />} />
        <Route path="/admin/run-reconciliation" element={<RunStripeReconciliation />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
