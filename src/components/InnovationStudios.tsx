
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Users, Calendar, Target, LightbulbIcon, Code, BarChart3, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const process = [
  {
    title: "Research & Discovery",
    description: "We begin by deeply understanding the challenge through interviews, research, and immersion with partner organizations.",
    icon: LightbulbIcon,
    color: "bg-[#9b87f5]/90",
  },
  {
    title: "Ideation & Design",
    description: "Teams brainstorm solutions, develop concepts, and create low-fidelity prototypes for rapid testing and feedback.",
    icon: Code,
    color: "bg-[#8B5CF6]/90",
  },
  {
    title: "Prototype & Test",
    description: "Promising ideas are built into functional prototypes that are tested with end-users in real environments.",
    icon: BarChart3,
    color: "bg-[#7E69AB]/90",
  },
  {
    title: "Implementation & Scale",
    description: "Final solutions are refined and deployed with a strategic plan for scaling and sustainable impact.",
    icon: Rocket,
    color: "bg-[#6E59A5]/90",
  },
];

const timeline = [
  {
    week: "Weeks 1-2",
    title: "Problem Discovery",
    description: "Deep dive into the challenge with partner organizations",
    icon: Users,
  },
  {
    week: "Weeks 3-5",
    title: "Solution Design",
    description: "Collaborative ideation and prototype development",
    icon: Calendar,
  },
  {
    week: "Weeks 6-9",
    title: "Implementation",
    description: "Testing, refinement, and deployment of solutions",
    icon: Target,
  },
];

const InnovationStudios = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Studio Methodology */}
        <div className="mb-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.p variants={itemVariants} className="text-[#9b87f5] font-medium tracking-wider mb-3">OUR APPROACH</motion.p>
            <motion.h2 variants={itemVariants} className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-raade-Thunder mb-6">
              The Innovation Studios Method
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg font-lora text-raade-Thunder/70 max-w-3xl mx-auto">
              A 9-week intensive program where Rice students collaborate with African organizations
              to develop innovative solutions for real-world challenges.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {process.map((step, index) => (
              <motion.div 
                key={step.title} 
                variants={itemVariants}
                className="relative group"
              >
                <div className="absolute inset-0 bg-white rounded-2xl shadow-lg transform group-hover:-translate-y-2 transition-all duration-300"></div>
                <Card className="relative z-10 overflow-hidden border-none bg-transparent">
                  <CardHeader className="pb-2">
                    <div className={`${step.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 transform transition-transform group-hover:scale-110 duration-300`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-simula text-raade-Thunder">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-raade-Thunder/70 font-lora">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="mb-24 bg-gray-50 rounded-3xl p-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#9b87f5] font-medium tracking-wider mb-3">PROGRAM STRUCTURE</p>
            <h3 className="text-3xl md:text-4xl font-simula text-raade-Thunder mb-6">9-Week Innovation Sprint</h3>
            <p className="text-lg font-lora text-raade-Thunder/70 max-w-3xl mx-auto">
              Our structured approach ensures that teams move efficiently from problem to solution.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-[#9b87f5]/30 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-16 relative">
              {timeline.map((phase, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'} mb-8 md:mb-0`}>
                    <h4 className="text-xl font-simula text-[#9b87f5] mb-2">{phase.week}</h4>
                    <h5 className="text-2xl font-simula text-raade-Thunder mb-3">{phase.title}</h5>
                    <p className="text-raade-Thunder/70 font-lora">{phase.description}</p>
                  </div>
                  
                  {/* Timeline Point */}
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white border-4 border-[#9b87f5] flex items-center justify-center mb-8 md:mb-0">
                    {phase.icon && <phase.icon className="w-5 h-5 text-[#9b87f5]" />}
                  </div>
                  
                  <div className="w-full md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <p className="text-[#9b87f5] font-medium tracking-wider mb-3">OUR IMPACT</p>
            <h3 className="text-3xl md:text-4xl font-simula text-raade-Thunder mb-6">Making a Difference</h3>
            <p className="text-lg font-lora text-raade-Thunder/70 max-w-3xl mx-auto">
              Our collaborative approach has delivered measurable impact across multiple projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { metric: "100+", label: "Students Engaged" },
              { metric: "8", label: "Active Projects" },
              { metric: "6", label: "Faculty Mentors" },
              { metric: "3", label: "Partner Countries" },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl font-simula font-bold text-[#7E69AB] mb-2">{stat.metric}</div>
                <div className="text-raade-Thunder/80 font-lora">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-[#1A1F2C] rounded-3xl p-16"
        >
          <h3 className="text-3xl md:text-4xl font-simula font-bold text-white mb-6">Ready to Innovate With Us?</h3>
          <p className="text-lg font-lora text-white/80 max-w-3xl mx-auto mb-8">
            Join our next Innovation Studios cohort and collaborate on solutions that make a real difference.
          </p>
          <Button
            size="lg"
            className="bg-[#9b87f5] text-white hover:bg-[#8B5CF6] transition-colors text-lg px-8 py-6 h-auto font-lora"
          >
            Apply Now <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default InnovationStudios;
