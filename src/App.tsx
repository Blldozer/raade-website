
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProviders from './components/app/AppProviders';
import NavigationWrapper from './components/app/NavigationWrapper';
import ErrorBoundary from './components/ErrorBoundary';
import GlobalErrorFallback from './components/app/GlobalErrorFallback';
import ScrollToTop from './components/app/ScrollToTop';
import Index from './pages/Index';
import Conference from './pages/Conference';
import ConferenceRegistration from './pages/ConferenceRegistration';
import About from './pages/About';
import InnovationStudios from './pages/InnovationStudios';
import SpeakerProfile from './pages/SpeakerProfile';
import ProjectDetail from './pages/ProjectDetail';
import PartnerApplication from './pages/PartnerApplication';
import StudentApplication from './pages/StudentApplication';
import RegistrationSuccess from './pages/RegistrationSuccess';
import ComingSoon from './pages/ComingSoon';
import Donate from './pages/Donate'; // Import the Donate page

function App() {
  return (
    <ErrorBoundary fallback={<GlobalErrorFallback />}>
      <AppProviders>
        <Router>
          <ScrollToTop />
          <NavigationWrapper>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              
              <Route path="/conference" element={<Conference />} />
              <Route path="/conference/registration" element={<ConferenceRegistration />} />
              <Route path="/conference/confirmation" element={<RegistrationSuccess />} />
              <Route path="/conference/speakers/:speakerId" element={<SpeakerProfile />} />
              
              <Route path="/innovation-studios" element={<InnovationStudios />} />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              
              <Route path="/partner-application" element={<PartnerApplication />} />
              <Route path="/student-application" element={<StudentApplication />} />
              
              <Route path="/donate" element={<Donate />} /> {/* Add the Donate route */}
              
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="*" element={<ComingSoon />} />
            </Routes>
          </NavigationWrapper>
        </Router>
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
