
import { useState } from "react";
import { motion } from "framer-motion";

const InnovationStudiosSection = () => {
  const methodology = [
    {
      title: "Design Thinking",
      description:
        "We employ human-centered design principles to deeply understand the needs and aspirations of African communities.",
      icon: "DesignIcon",
    },
    {
      title: "Tech Integration",
      description:
        "We leverage cutting-edge technologies to develop scalable and sustainable solutions.",
      icon: "TechIcon",
    },
    {
      title: "Cultural Context",
      description:
        "We ensure our solutions are culturally relevant and respectful of local traditions and values.",
      icon: "CultureIcon",
    },
  ];

  const timeline = [
    {
      year: 2018,
      event: "Founded Innovation Studios",
      description:
        "Established with a vision to drive innovation and create impact in Africa.",
    },
    {
      year: 2020,
      event: "Launched First Project",
      description:
        "Successfully implemented our first project in partnership with a local NGO.",
    },
    {
      year: 2022,
      event: "Expanded Operations",
      description:
        "Expanded our operations to three additional countries in East Africa.",
    },
  ];

  return (
    <section className="py-[var(--section-padding-large)] bg-white">
      <div className="fluid-container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[var(--space-xl)]"
        >
          <p className="text-raade-Thunder font-medium tracking-wider mb-[var(--space-sm)] text-fluid-normal">OUR APPROACH</p>
          <h2 className="text-fluid-h1 leading-[var(--line-height-tight)] font-simula text-raade-Thunder mb-[var(--space-md)]">
            How We Work
          </h2>
          <p className="text-fluid-large font-lora text-raade-Thunder/70 max-w-[var(--content-width-narrow)] mx-auto">
            Our innovation studios combine design thinking, technological expertise, and deep cultural understanding
            to create scalable solutions for Africa's development challenges.
          </p>
        </motion.div>

        {/* Methodology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)] mb-[var(--space-xl)]">
          {methodology.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-gray-50 rounded-2xl shadow-md"
            >
              <h3 className="text-fluid-h4 font-simula text-raade-Thunder mb-[var(--space-sm)]">
                {item.title}
              </h3>
              <p className="text-fluid-normal text-raade-Thunder/80 font-lora">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-fluid-h3 font-simula text-raade-Thunder mb-[var(--space-lg)] text-center">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gray-300 transform -translate-x-1/2"></div>
            <div className="space-y-[var(--space-md)]">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-1/2 text-right pr-[var(--space-md)]">
                    <h3 className="text-fluid-h4 font-simula text-raade-Thunder">
                      {item.year}
                    </h3>
                  </div>
                  <div className="w-1/2 text-left pl-[var(--space-md)]">
                    <h4 className="text-fluid-h4 font-simula text-raade-Thunder mb-[var(--space-xs)]">
                      {item.event}
                    </h4>
                    <p className="text-fluid-normal text-raade-Thunder/80 font-lora">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InnovationStudiosSection;
