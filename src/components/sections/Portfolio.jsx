import React, { useEffect } from "react";
import { useSection } from "../../context/SectionContext";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import DynamicGrid from "../common/DynamicGrid";
import { useNavigate, useLocation } from "react-router-dom";
import useContentstack from "../../hooks/useContentstack";

const Portfolio = () => {
  const { activeSection, setActiveSection } = useSection();
  useScrollToSection(activeSection === "portfolio" ? "portfolio" : null);
  const navigate = useNavigate();
  const location = useLocation();
  const { data: entries, isLoading, error } = useContentstack('portfolio');

  // Handle scroll position restoration
  useEffect(() => {
    if (location.state?.fromClients) {
      // Clear the state after using it
      window.history.replaceState({}, document.title);
      // Scroll to portfolio section
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleSeeMore = () => {
    // Store current scroll position before navigation
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      sessionStorage.setItem('portfolioScrollPosition', portfolioSection.offsetTop.toString());
    }
    navigate('/clients');
  };

  const projects = entries.flatMap((entry) => {
    if (!entry.portfolio_page) return [];
    if (!Array.isArray(entry.portfolio_page)) return [];

    return entry.portfolio_page.flatMap((block) => {
      if (!block.clients) return [];

      const clientsArray = Array.isArray(block.clients) ? block.clients : [block.clients];
      
      return clientsArray.map((client) => {
        const imageUrl = client.image?.url || client.client?.url;
        return {
          image: imageUrl || "",
        };
      });
    });
  });

  return (
    <section id="portfolio" className="py-20 bg-gray-100 dark:bg-dark-bg animate-fadeIn relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          Some of our preferred Clients
        </h2>

        {isLoading && <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!isLoading && !error && projects.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">No clients found</p>
        )}
        {!isLoading && !error && projects.length > 0 && (
          <>
            <DynamicGrid items={projects.slice(0, 10)} />
            {projects.length > 10 && (
              <div className="flex justify-center mt-8">
                <button 
                  onClick={handleSeeMore}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                >
                  See More Clients
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
