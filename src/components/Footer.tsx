
import { Mail, Link, Globe, Copyright, Shield } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F0] z-10 mt-auto border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Logo and Mission Statement Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <img
            src="/lovable-uploads/53c3e0e3-e1ae-42a9-bdb8-6854c8b646ba.png"
            alt="RAADE Logo"
            className="h-20 w-auto"
          />
          <p className="text-gray-600 max-w-xl text-lg">
            We are a student-led organization pioneering innovative approaches to African development through collaboration and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
            <div className="space-y-2">
              <a
                href="mailto:raade@rice.edu"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Mail className="h-4 w-4" />
                raade@rice.edu
              </a>
              <p className="text-gray-600">
                6100 Main St,
                <br />
                Houston, TX 77005
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <div className="space-y-2">
              <a
                href="/studios"
                className="block text-gray-600 hover:text-gray-800 transition-colors"
              >
                Innovation Studios
              </a>
              <a
                href="/conference"
                className="block text-gray-600 hover:text-gray-800 transition-colors"
              >
                Annual Conference
              </a>
              <a
                href="/about"
                className="block text-gray-600 hover:text-gray-800 transition-colors"
              >
                About Us
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Connect</h3>
            <div className="space-y-2">
              <a
                href="https://linkedin.com/company/raade"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Link className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://twitter.com/raade"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Link className="h-4 w-4" />
                Twitter
              </a>
            </div>
          </div>

          {/* Rice University Affiliation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Affiliation</h3>
            <a
              href="https://rice.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Globe className="h-4 w-4" />
              Rice University
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Copyright className="h-4 w-4" />
              <span>{new Date().getFullYear()} RAADE. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="link"
                className="text-gray-600 hover:text-gray-800"
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
      </div>
    </footer>
  );
};

export default Footer;
