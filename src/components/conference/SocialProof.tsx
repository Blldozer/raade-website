
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The RAADE Conference provided an incredible platform to showcase our work and connect with potential partners from across Africa.",
    author: "Amina Ibrahim",
    role: "Founder, EduTech Nairobi",
    year: "2024 Attendee"
  },
  {
    quote: "As a student interested in African development, this conference opened my eyes to innovative approaches and connected me with mentors in my field.",
    author: "David Mensah",
    role: "Student, University of Ghana",
    year: "2024 Attendee"
  },
  {
    quote: "The quality of projects coming from RAADE's Innovation Studios is impressive. This conference demonstrates the power of student-led solutions.",
    author: "Dr. James Okafor",
    role: "Policy Advisor, African Development Bank",
    year: "2024 Speaker"
  },
];

const SocialProof = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-[#FBB03B]/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 scroll-animate">
          <h2 className="text-4xl font-bold text-raade-navy mb-4 font-simula">What Attendees Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">
            Hear from previous conference participants about their experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md h-full relative">
                <Quote className="h-8 w-8 text-[#FBB03B]/30 absolute top-4 right-4" />
                <p className="text-gray-700 font-lora mb-6 relative z-10">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-raade-navy font-simula">{testimonial.author}</p>
                  <p className="text-[#FBB03B] text-sm font-lora">{testimonial.role}</p>
                  <p className="text-gray-500 text-sm font-lora">{testimonial.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 mt-16">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-raade-navy mb-2 font-simula">500+</h3>
            <p className="text-gray-600 font-lora">Past Attendees</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-raade-navy mb-2 font-simula">25+</h3>
            <p className="text-gray-600 font-lora">Speakers</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-raade-navy mb-2 font-simula">15+</h3>
            <p className="text-gray-600 font-lora">Countries Represented</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-raade-navy mb-2 font-simula">95%</h3>
            <p className="text-gray-600 font-lora">Satisfaction Rate</p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-raade-navy font-medium mb-4 font-simula">
            Join us for RAADE Conference 2025
          </p>
          <div className="bg-white p-4 rounded-full inline-flex items-center shadow-md">
            <p className="text-gray-600 font-lora">#RAADEConference2025</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
