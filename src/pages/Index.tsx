
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/hero/Hero';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import ConferencePromo from '@/components/sections/ConferencePromo';
import JoinSection from '@/components/sections/JoinSection';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="relative">
      <Hero />
      <ProjectsShowcase />
      <ConferencePromo />
      <JoinSection />
      
      {/* Temporary direct link to reconciliation tool */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link to="/admin/run-reconciliation">
          <Button variant="outline" size="sm" className="bg-white/90 border-gray-300 text-gray-700 hover:bg-gray-100">
            Run Stripe Reconciliation
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
