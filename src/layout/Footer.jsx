import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-100 dark:bg-dark-card text-gray-800 dark:text-gray-100 py-12 transition-colors duration-300 relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-200/20 dark:to-gray-900/20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold transform transition-transform duration-300 hover:scale-105">
              Company Name
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Creating innovative solutions for your digital needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transform transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transform transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transform transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transform transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transform transition-all duration-300 hover:translate-x-2 block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transform transition-all duration-300 hover:translate-x-2">
                <Mail className="w-5 h-5" />
                <a href="mailto:contact@company.com">contact@company.com</a>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transform transition-all duration-300 hover:translate-x-2">
                <Phone className="w-5 h-5" />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transform transition-all duration-300 hover:translate-x-2">
                <MapPin className="w-5 h-5" />
                <span>123 Business Street, City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white text-sm transform transition-all duration-300 hover:scale-105">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white text-sm transform transition-all duration-300 hover:scale-105">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white text-sm transform transition-all duration-300 hover:scale-105">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-indigo-600 dark:bg-indigo-500 text-white p-3 rounded-full shadow-lg 
          transition-all duration-300 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 
          focus:ring-indigo-500 dark:focus:ring-indigo-400 z-50
          ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
          transform hover:scale-110`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
};

export default Footer; 