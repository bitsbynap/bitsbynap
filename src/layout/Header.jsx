import { useState, useEffect } from 'react';
import { useSection } from '../context/SectionContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Header = () => {
  const { activeSection, setActiveSection } = useSection();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showThemeToggle, setShowThemeToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    let ticking = false;
    const headerHeight = 64; // height of the header (h-16 = 64px)
    let aboutSectionTop = 0;

    // Calculate About section's position relative to document
    const calculateAboutPosition = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        // Get the exact position where About section starts
        aboutSectionTop = aboutSection.offsetTop - headerHeight;
      }
    };

    // Initial calculation
    calculateAboutPosition();

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          // Add a small buffer (20px) to make the transition smoother
          // Only change to solid when we're past the About section's start
          const shouldBeSolid = scrollPosition >= aboutSectionTop - 20;
          
          // If we're scrolling up and near the top, ensure transparency
          if (scrollPosition < 50) {
            setIsScrolled(false);
          } else {
            setIsScrolled(shouldBeSolid);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Recalculate on resize
    const handleResize = () => {
      calculateAboutPosition();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Show theme toggle on hover near the top-right corner
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientX > window.innerWidth - 60 && e.clientY < 60) {
        setShowThemeToggle(true);
      } else {
        setShowThemeToggle(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const sections = ['home', 'about', 'services', 'portfolio', 'contact'];

  const handleNavigation = (section) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: section } });
    } else {
      setActiveSection(section);
    }
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-dark-bg/95 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation('home')}
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-white'
              } hover:scale-105 transition-transform duration-300`}
            >
              Company Name
            </button>
          </div>

          {/* Theme Toggle Trigger Area */}
          <div 
            className={`fixed top-0 right-0 w-16 h-16 transition-opacity duration-300 hidden sm:block ${
              showThemeToggle ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className={`fixed top-4 right-4 p-2 rounded-full transition-all duration-300 hidden sm:block ${
              showThemeToggle 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-2 pointer-events-none'
            } ${
              isScrolled
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                : 'bg-white/10 backdrop-blur-sm text-white'
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isScrolled
                  ? 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  : 'text-white hover:text-white/80'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex space-x-4">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleNavigation(section)}
                className={`px-3 py-2 rounded-md transition-all duration-300 ${
                  activeSection === section
                    ? isScrolled
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                      : 'text-white bg-white/20 backdrop-blur-sm'
                    : isScrolled
                      ? 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`sm:hidden transition-all duration-300 ${
            isOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-2 pointer-events-none'
          } ${
            isScrolled
              ? 'bg-white dark:bg-dark-bg'
              : 'bg-black/80 backdrop-blur-md'
          } absolute top-16 left-0 right-0 rounded-b-lg shadow-lg`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleNavigation(section)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-300 ${
                  activeSection === section
                    ? isScrolled
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                      : 'text-white bg-white/20'
                    : isScrolled
                      ? 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            
            {/* Theme Toggle in Mobile Menu */}
            <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
              <button
                onClick={toggleDarkMode}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-300 flex items-center space-x-2 ${
                  isScrolled
                    ? 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;