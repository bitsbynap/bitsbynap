import React from "react";
import { useSection } from "../../context/SectionContext";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import useContentstack from "../../hooks/useContentstack";

const About = () => {
  const { data: posts, isLoading, error } = useContentstack('portfolio');
  const { activeSection } = useSection();
  useScrollToSection(activeSection === "about" ? "about" : null);
  const navigate = useNavigate();

  const about = posts.flatMap((post) => {
    if (!Array.isArray(post.portfolio_page)) {
      return [];
    }

    return post.portfolio_page.flatMap((block) => {
      if (!block.about_us) return [];

      const mission = block.about_us.mission || "Default mission text";
      const story = block.about_us.story || "Default story text";

      return mission ? [{ mission, story }] : [];
    });
  });

  const handleNavigate = (section) => {
    navigate('/about', { state: { section } });
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-dark-bg animate-fadeIn relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          About Us
        </h2>

        {about.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              onClick={() => handleNavigate('story')}
              className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Our Story
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                From humble beginnings to becoming industry leaders, discover our journey of innovation, growth, and success.
              </p>
              <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold group">
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
            <div 
              onClick={() => handleNavigate('mission')}
              className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Learn about our commitment to excellence, innovation, and creating lasting partnerships with our clients.
              </p>
              <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold group">
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ) : isLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 dark:text-red-400">{error}</p>
        ) : (
          <p className="text-center text-red-500 dark:text-red-400">
            Failed to load About content.
          </p>
        )}
      </div>
    </section>
  );
};

export default About;
