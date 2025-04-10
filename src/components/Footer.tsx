import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {}

const Footer = () => {
  
  return (
    <footer className="w-full bg-white dark:bg-gray-900 pt-12 pb-6 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Us section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Email: <a href="mailto:support@raadeconf.com" className="text-blue-500">support@raadeconf.com</a>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Phone: (123) 456-7890
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Address: 123 Main St, Houston, TX
            </p>
          </div>
          
          {/* Quick Links section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/studios" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                  Innovation Studios
                </Link>
              </li>
              <li>
                <Link to="/conference" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                  Conference
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Connect section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.663 9.15 8.431 9.817v-6.988h-2.033v-2.829h2.033V9.354c0-2.029 1.262-3.138 3.086-3.138 0.883 0 1.642 0.064 1.863 0.094v2.16h-1.281c-0.994 0-1.187 0.476-1.187 1.179v1.54h2.396l-0.31 2.829h-2.086v6.988C18.337 21.15 22 16.991 22 12z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.372 3.946 4.827-.413.111-.849.171-1.304.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.169-.067 2.189 1.394 4.768 2.212 7.548 2.212 9.058 0 14.01-7.508 14.01-14.008 0-.211-.009-.421-.023-.632.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M14 13.5c0 1.381-1.119 2.5-2.5 2.5s-2.5-1.119-2.5-2.5 1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5zm9-5.122c0 .626-.506 1.132-1.132 1.132H1.132C.506 8.378 0 7.872 0 7.246v9.508c0-.626.506-1.132 1.132-1.132h21.736c.626 0 1.132.506 1.132 1.132V7.246zm-1.132 8.378H1.132c-.076 0-.141-.014-.194-.039L11.868 6.07a1.376 1.376 0 0 1 2.264 0l10.936 9.515c-.053.025-.118.039-.194.039z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
          <div>
            © {new Date().getFullYear()} RAADE. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-4">
            <div>Site Contributors: Ife Idakolo & Kene Onubogu</div>
            
            <div className="flex items-center">
              <Link to="/admin/reconciliation" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs">
                Admin
              </Link>
            </div>
            
            <Link to="/privacy" className="flex items-center">
              <div className="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
