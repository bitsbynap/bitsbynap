import { useSection } from '../../context/SectionContext';
import { useScrollToSection } from '../../hooks/useScrollToSection';

const About = () => {
  
  const { activeSection } = useSection();
  useScrollToSection(activeSection === 'about' ? 'about' : null);

  return (
    <section id="about" className="py-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fadeInUp">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="transform transition-all duration-500 hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>Our Story</h3>
            <p className="text-gray-600 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="transform transition-all duration-500 hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>Our Mission</h3>
            <p className="text-gray-600 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 