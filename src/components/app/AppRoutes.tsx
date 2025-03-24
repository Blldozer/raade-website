import { Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import InnovationStudios from "@/pages/InnovationStudios";
import ProjectDetail from "@/pages/ProjectDetail";
import ConferencePage from "@/pages/Conference";
import ConferenceRegistration from "@/pages/ConferenceRegistration";
import RegistrationSuccess from "@/pages/RegistrationSuccess";
import SpeakerProfile from "@/pages/SpeakerProfile";
import StudentApplication from "@/pages/StudentApplication";
import PartnerApplication from "@/pages/PartnerApplication";
import ScrollToTop from "./ScrollToTop";

const AppRoutes = () => {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/innovation-studios" element={<InnovationStudios />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/conference" element={<ConferencePage />} />
        <Route path="/conference/registration" element={<ConferenceRegistration />} />
        <Route path="/conference/registration/success" element={<RegistrationSuccess />} />
        <Route path="/conference/speaker/:id" element={<SpeakerProfile />} />
        <Route path="/student-application" element={<StudentApplication />} />
        <Route path="/partner-application" element={<PartnerApplication />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ScrollToTop>
  );
};

export default AppRoutes;
