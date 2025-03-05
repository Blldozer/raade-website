
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Rocket, CheckCircle } from "lucide-react";

const StudioOverview = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Title Section - 39/61 split */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row mb-16"
        >
          <div className="w-full lg:w-[39%]">
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-raade-Thunder">
              Transforming <span className="font-['Simula_Book_Italic']">non-consumption</span> into consumption
            </h2>
          </div>
          <div className="lg:w-[61%]"></div> {/* Filler space */}
        </motion.div>

        {/* Content Section - 39/61 split reversed */}
        <div className="flex flex-col lg:flex-row mb-20">
          <div className="lg:w-[39%]"></div> {/* Filler space */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[61%]"
          >
            <div className="space-y-8 text-xl leading-relaxed font-lora text-gray-700 max-w-[800px]">
              <p>
                At RAADE, we focus on a powerful concept: identifying areas where millions 
                of people cannot access essential products and services, then creating 
                innovative solutions to make them accessible.
              </p>
              <p>
                Rather than simply improving existing offerings for those already served, 
                we design pathways that reach those previously excluded from markets 
                entirely — transforming "non-consumers" into consumers.
              </p>
              <p>
                This approach creates sustainable impact by building new markets that serve 
                more people while creating economic opportunity. When done right, these 
                solutions scale organically, reaching far beyond initial implementations.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Three Phase Cards */}
        <div className="mt-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-montserrat font-semibold text-center mb-12 text-raade-Thunder"
          >
            OUR INNOVATION APPROACH
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Phase 1: Immersion & Discovery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full bg-[#F4F5F4] border-none hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full bg-raade-navy text-white">
                      <Compass size={28} />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-montserrat text-center text-raade-Thunder">
                    Immersion & Discovery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700 font-lora">
                    We begin by deeply understanding the problem space through field research, stakeholder interviews, 
                    and empathy building. Our teams immerse themselves in the local context to uncover hidden insights 
                    and identify true user needs rather than assumed ones.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Phase 2: Rapid Ideation & Prototyping */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full bg-[#F4F5F4] border-none hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full bg-raade-yellow-orange text-white">
                      <Rocket size={28} />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-montserrat text-center text-raade-Thunder">
                    Rapid Ideation & Prototyping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700 font-lora">
                    Our collaborative design sprints generate diverse solutions quickly. We build low-fidelity 
                    prototypes to test core assumptions, gather feedback from actual users, and iterate rapidly. 
                    This approach allows us to fail fast, learn continuously, and refine concepts before significant 
                    investment.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Phase 3: Implementation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full bg-[#F4F5F4] border-none hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full bg-raade-Oslo-gray text-white">
                      <CheckCircle size={28} />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-montserrat text-center text-raade-Thunder">
                    Implementation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700 font-lora">
                    We move from prototypes to minimum viable products with careful attention to sustainability and 
                    scalability. Our implementation plans include measurable impact goals, market entry strategies, 
                    and partnerships to ensure solutions can grow beyond initial pilots and create lasting change.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioOverview;
