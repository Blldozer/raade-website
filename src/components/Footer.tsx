
import { Mail, Link, Globe, Copyright, Shield, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#F5F5F0] to-[#EAEAE5] border-t border-gray-200">
      {/* Back to Top Button */}
      <Button
        onClick={scrollToTop}
        className="absolute -top-6 right-8 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
        size="icon"
      >
        <ArrowUp className="h-4 w-4 text-gray-600" />
      </Button>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Logo and Mission Statement Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
          <div className="flex flex-col items-start gap-6">
            <img
              src="/logos/RAADE-logo-final-black.png"
              alt="RAADE Logo"
              className="h-20 w-auto"
            />
            <p className="text-gray-600 max-w-xl text-base leading-relaxed">
              We are a student-led organization pioneering innovative approaches to African 
              development through collaboration and technology.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-16 border-b border-gray-200">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Contact Us</h3>
            <div className="space-y-3">
              <a
                href="mailto:raade@rice.edu"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <Mail className="h-4 w-4" />
                raade@rice.edu
              </a>
              <p className="text-sm text-gray-600">
                6100 Main St,
                <br />
                Houston, TX 77005
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Links</h3>
            <div className="space-y-3">
              {[
                { href: "/studios", text: "Innovation Studios" },
                { href: "/conference", text: "Annual Conference" },
                { href: "/about", text: "About Us" }
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Connect</h3>
            <div className="space-y-3">
              {[
                { href: "https://www.linkedin.com/company/rice-association-for-african-development/", text: "LinkedIn" },
                { href: "https://twitter.com/raade", text: "Twitter" }
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  <Link className={cn(
                    "h-4 w-4",
                    "group-hover:text-[#0077B5]"
                  )} />
                  {social.text}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Copyright className="h-4 w-4" />
            <span>{new Date().getFullYear()} RAADE. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="link"
              className="text-sm text-gray-600 hover:text-gray-800"
              asChild
            >
              <a href="/privacy">
                <Shield className="h-4 w-4 mr-2" />
                Privacy Policy
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
