import { Mail, Link, Globe, Copyright, Shield } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#F1F0FB] mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-raade-navy">Contact Us</h3>
            <div className="space-y-2">
              <a
                href="mailto:raade@rice.edu"
                className="flex items-center gap-2 text-gray-600 hover:text-raade-navy transition-colors"
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
            <h3 className="text-lg font-semibold text-raade-navy">Quick Links</h3>
            <div className="space-y-2">
              <a
                href="/studios"
                className="block text-gray-600 hover:text-raade-navy transition-colors"
              >
                Innovation Studios
              </a>
              <a
                href="/conference"
                className="block text-gray-600 hover:text-raade-navy transition-colors"
              >
                Annual Conference
              </a>
              <a
                href="/about"
                className="block text-gray-600 hover:text-raade-navy transition-colors"
              >
                About Us
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-raade-navy">Connect</h3>
            <div className="space-y-2">
              <a
                href="https://linkedin.com/company/raade"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-raade-navy transition-colors"
              >
                <Link className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://twitter.com/raade"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-raade-navy transition-colors"
              >
                <Link className="h-4 w-4" />
                Twitter
              </a>
            </div>
          </div>

          {/* Rice University Affiliation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-raade-navy">Affiliation</h3>
            <a
              href="https://rice.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-raade-navy transition-colors"
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
                className="text-gray-600 hover:text-raade-navy"
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