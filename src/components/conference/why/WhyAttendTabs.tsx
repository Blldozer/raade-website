
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import AttendeeCard from "./AttendeeCard";
import { Lightbulb, GraduationCap, Globe, Users } from "lucide-react";

const WhyAttendTabs = () => {
  return (
    <Tabs defaultValue="established" className="w-full">
      <TabsList className="grid grid-cols-4 mb-8 bg-gray-100 w-full max-w-4xl mx-auto">
        <TabsTrigger value="established" className="data-[state=active]:bg-[#FBB03B] data-[state=active]:text-white">
          <span className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <span className="hidden md:inline">Established Changemakers</span>
            <span className="md:hidden">Leaders</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value="nextgen" className="data-[state=active]:bg-[#FBB03B] data-[state=active]:text-white">
          <span className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span className="hidden md:inline">Next Generation</span>
            <span className="md:hidden">Students</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value="curious" className="data-[state=active]:bg-[#FBB03B] data-[state=active]:text-white">
          <span className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden md:inline">Curious Minds</span>
            <span className="md:hidden">Curious</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value="all" className="data-[state=active]:bg-[#FBB03B] data-[state=active]:text-white">
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden md:inline">All Attendees</span>
            <span className="md:hidden">Everyone</span>
          </span>
        </TabsTrigger>
      </TabsList>
      
      <div className="mt-4">
        <TabsContent value="established" className="mt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AttendeeCard 
              icon={Lightbulb}
              title="For Established Changemakers"
              subtitle="Business Leaders, Policymakers, Investors"
              benefits={[
                "Access to fresh solutions and innovation from talented young minds",
                "Connections to implementation-ready projects that address specific regional challenges",
                "Cross-regional networking with other leaders working on similar issues",
                "Investment opportunities in early-stage solutions with potential for continental scaling",
                "Intelligence on emerging trends and approaches in African development"
              ]}
            />
          </motion.div>
        </TabsContent>
        
        <TabsContent value="nextgen" className="mt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AttendeeCard 
              icon={GraduationCap}
              title="For the Next Generation of Leaders"
              subtitle="Students, Young Professionals"
              benefits={[
                "Direct connections to decision-makers who can implement or fund their ideas",
                "Mentorship from established African leaders who have successfully navigated similar challenges",
                "Practical experience solving real-world problems with real stakeholders",
                "Resume-building opportunities that demonstrate impact rather than just theoretical knowledge",
                "Peer networks across disciplines and institutions that can support future collaboration"
              ]}
            />
          </motion.div>
        </TabsContent>
        
        <TabsContent value="curious" className="mt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AttendeeCard 
              icon={Globe}
              title="For Curious Minds"
              subtitle="Professionals, Academics, Interested Observers"
              benefits={[
                "Deeper understanding of African development challenges beyond headlines",
                "Connections to opportunities for involvement that match their specific skills",
                "Exposure to innovative approaches they might apply in their own work",
                "Forum to contribute their perspectives and expertise to meaningful problems",
                "Networking with diverse professionals interested in similar issues"
              ]}
            />
          </motion.div>
        </TabsContent>
        
        <TabsContent value="all" className="mt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AttendeeCard 
              icon={Users}
              title="For All Attendees"
              subtitle="Everyone at the Conference"
              benefits={[
                "Being part of transformative solutions that could scale across regions",
                "Participation in a new model of problem-solving rather than just discussion",
                "Meaningful connections formed through collaborative work",
                "Access to a continuing community beyond the conference itself",
                "Belonging to a pioneering effort that could reshape how development challenges are addressed"
              ]}
            />
          </motion.div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default WhyAttendTabs;
