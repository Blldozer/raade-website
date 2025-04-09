import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Conference from './pages/Conference';
import ConferenceRegistration from './pages/ConferenceRegistration';
import EmailVerification from './pages/EmailVerification';
import Success from './pages/Success';
import { ThemeProvider } from "@/components/theme-provider"
import AdminRegistrations from './pages/AdminRegistrations';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-react-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Conference />} />
          <Route path="/conference" element={<Conference />} />
          <Route path="/register" element={<ConferenceRegistration />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/conference/success" element={<Success />} />
          <Route path="/admin/registrations" element={<AdminRegistrations />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
