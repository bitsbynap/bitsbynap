import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useSection } from '../context/SectionContext';
import { useTheme } from '../context/ThemeContext';

// Redesigned Floating Theme Toggle Button
const FloatingThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-8 left-8 z-50 w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg transition-colors duration-300 group"
      aria-label="Toggle theme"
    >

      {/* Theme Icon */}
      <div className="relative z-10">
        {isDarkMode ? (
          <Moon size={24} className="text-white" />
        ) : (
          <Sun size={24} className="text-yellow-500" />
        )}
      </div>
    </button>
  );
};

// Header Component
const Header = () => {
  const { activeSection, setActiveSection } = useSection();
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const SCROLL_THRESHOLD = 20;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const isNearTop = currentScrollY <= SCROLL_THRESHOLD;

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

  const isSolidNav = isScrolled;

  return (
    <>
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
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-md transition-all duration-300 ${
                  isSolidNav
                    ? 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'text-white hover:text-white/80 hover:bg-white/10 backdrop-blur-sm'
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="sm:hidden bg-white dark:bg-dark-bg shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => handleNavigation(section)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                      activeSection === section
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      <FloatingThemeToggle />
    </>
  );
};

export default Header;
