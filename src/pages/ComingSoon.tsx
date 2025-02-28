import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import gsap from "gsap";

const ComingSoon = () => {
  const logoRef = useRef<HTMLImageElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Animation setup
  useEffect(() => {
    const tl = gsap.timeline();
    
    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1 }
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  // Handle form submission (you can replace with your actual mailing list logic)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle the form submission 
    // For now, we'll just show a visual confirmation
    if (formRef.current) {
      gsap.to(formRef.current, { 
        y: -10, 
        opacity: 0, 
        duration: 0.3,
        onComplete: () => {
          gsap.to(formRef.current, { 
            y: 0, 
            opacity: 1, 
            duration: 0.3,
          });
        }
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A365D]/95 via-[#1A365D]/90 to-[#1A365D]/95 z-10" />
        <img
          src="/coming-soon-bg.jpg" 
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0 filter blur-sm"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex-grow flex flex-col items-center justify-center px-4 py-16 text-white">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <img
              ref={logoRef}
              src="/lovable-uploads/53c3e0e3-e1ae-42a9-bdb8-6854c8b646ba.png"
              alt="RAADE Logo"
              className="h-40 mx-auto"
            />
          </motion.div>

          {/* Coming Soon Text */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold font-zillaslab mb-6"
          >
            Coming Soon
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl font-merriweather text-white/80 mb-10 max-w-3xl mx-auto"
          >
            We're building innovative solutions for African development. 
            Our full website is under construction.
          </motion.p>

          {/* Countdown Element */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-16"
          >
            {[
              { value: 25, label: "Days" },
              { value: 14, label: "Hours" },
              { value: 36, label: "Minutes" },
              { value: 42, label: "Seconds" },
            ].map((item, index) => (
              <div 
                key={item.label} 
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-center"
              >
                <CountUp
                  end={item.value}
                  duration={2.5}
                  delay={0.5 + (index * 0.2)}
                  className="text-4xl md:text-5xl font-bold text-[#FBB03B]"
                />
                <span className="text-sm md:text-base text-white/70">{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Email Signup Form */}
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="max-w-md mx-auto flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <p className="text-white/70 mb-2 font-merriweather">
              Be the first to know when we launch:
            </p>
            <div className="flex w-full items-center space-x-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/20 backdrop-blur-md border-white/30 text-white placeholder:text-white/50"
                required
              />
              <Button 
                type="submit" 
                className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-[#1A365D]"
              >
                Notify Me
              </Button>
            </div>
          </motion.form>

          {/* Contact Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16"
          >
            <a
              href="mailto:contact@raade.org"
              className="inline-flex items-center gap-2 text-[#FBB03B] hover:underline font-alegreyasans"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20 pb-6 pt-10 text-center text-white/50 text-sm">
        <p>© {new Date().getFullYear()} Rice Association for African Development. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ComingSoon;