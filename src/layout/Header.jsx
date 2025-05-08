import { useState } from 'react';
import { useSection } from '../context/SectionContext';

const Header = () => {
  const { activeSection, setActiveSection } = useSection();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const sections = ['home', 'about', 'services', 'portfolio', 'contact'];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 fixed w-full top-0 z-50 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600 hover:scale-105 transition-transform duration-300">Company Name</span>
          </div>

          {/* Hamburger (mobile) */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-indigo-600 px-3 py-2 focus:outline-none transform hover:scale-110 transition-transform duration-300"
              aria-label="Toggle Menu"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex space-x-4">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-3 py-2 rounded-md transition-all duration-300 focus:outline-none transform hover:scale-105 ${
                  activeSection === section
                    ? 'text-indigo-600 font-semibold bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden fixed top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-md z-40 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col space-y-4 p-6 pt-20">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => {
                setActiveSection(section);
                setIsOpen(false);
              }}
              className={`text-left px-4 py-2 rounded-md transition-all duration-300 focus:outline-none transform hover:scale-105 ${
                activeSection === section
                  ? 'text-indigo-600 font-semibold bg-indigo-50'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
