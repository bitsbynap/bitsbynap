import { useState, useEffect, useCallback, memo } from 'react';
import { useSection } from '../context/SectionContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Header = () => {
  const { activeSection, setActiveSection } = useSection();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Optimized scroll handling with immediate response
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const SCROLL_THRESHOLD = 20; // Reduced threshold for faster response

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we're near the top
      const isNearTop = currentScrollY <= SCROLL_THRESHOLD;
      // If we're scrolling up and near the top, make transparent immediately
      if (currentScrollY < lastScrollY && isNearTop) {
        setIsScrolled(false);
      } else {
        setIsScrolled(currentScrollY > SCROLL_THRESHOLD);
      }
      lastScrollY = currentScrollY;
      
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    // Initial state
    updateScrollState();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const sections = ['home', 'about', 'services', 'portfolio', 'contact'];

  const handleNavigation = useCallback((section) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: section } });
    } else {
      setActiveSection(section);
    }
    setIsOpen(false);
  }, [location.pathname, navigate, setActiveSection]);

  // Memoize the navigation buttons to prevent unnecessary re-renders
  const NavigationButtons = memo(({ sections, activeSection, isScrolled, handleNavigation }) => (
    <>
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
    </>
  ));

  // Update the isSolidNav check to be consistent across all pages
  const isSolidNav = isScrolled;

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        isSolidNav
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
                isSolidNav
                  ? 'text-gray-800 dark:text-gray-100'
                  : 'text-white'
              }`}
            >
              Company Name
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            <NavigationButtons 
              sections={sections}
              activeSection={activeSection}
              isScrolled={isScrolled}
              handleNavigation={handleNavigation}
            />
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md transition-all duration-300 ${
                isSolidNav
                  ? 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-white hover:text-white/80 hover:bg-white/10 backdrop-blur-sm'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isSolidNav
                  ? 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  : 'text-white hover:text-white/80'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`sm:hidden transition-all duration-300 ${
            isOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-2 pointer-events-none'
          } ${
            isSolidNav
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
                    ? isSolidNav
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                      : 'text-white bg-white/20'
                    : isSolidNav
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
                  isSolidNav
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

export default memo(Header);