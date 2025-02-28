
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Mail, ArrowRight, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import gsap from "gsap";
import { toast } from "@/components/ui/use-toast";

// Launch date - adjust as needed
const LAUNCH_DATE = new Date("2024-09-30T00:00:00");

const ComingSoon = () => {
  const logoRef = useRef<HTMLImageElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate countdown
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = LAUNCH_DATE.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would normally handle the form submission with your mailing list provider
    toast({
      title: "Thank you!",
      description: "We'll notify you when we launch.",
    });
    
    setEmail("");
    
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

  // Function to handle dev mode access
  const accessDevSite = () => {
    window.location.href = '/?dev=true';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background with gradient overlay - different colors from main site */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C]/95 via-[#1A1F2C]/90 to-[#1A1F2C]/95 z-10" />
        <img
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
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
              className="h-32 md:h-40 mx-auto"
            />
          </motion.div>

          {/* Coming Soon Text */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold font-zillaslab mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6]"
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
              { value: countdown.days, label: "Days" },
              { value: countdown.hours, label: "Hours" },
              { value: countdown.minutes, label: "Minutes" },
              { value: countdown.seconds, label: "Seconds" },
            ].map((item, index) => (
              <div 
                key={item.label} 
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-center border border-[#9b87f5]/20"
              >
                <CountUp
                  end={item.value}
                  duration={1}
                  className="text-4xl md:text-5xl font-bold text-[#9b87f5]"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                className="bg-[#8B5CF6] hover:bg-[#9b87f5] text-white"
              >
                Notify Me
              </Button>
            </div>
          </motion.form>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 flex justify-center space-x-6"
          >
            {[
              { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com" },
              { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com" },
              { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com" },
              { icon: <Github className="w-5 h-5" />, href: "https://github.com" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#9b87f5] transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </motion.div>

          {/* Contact Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8"
          >
            <a
              href="mailto:contact@raade.org"
              className="inline-flex items-center gap-2 text-[#9b87f5] hover:underline font-alegreyasans"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
          
          {/* Developer Access Button (hidden in production) */}
          <div className="mt-12">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/30 hover:text-white/50 text-xs"
              onClick={accessDevSite}
            >
              Developer Access
            </Button>
          </div>
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
