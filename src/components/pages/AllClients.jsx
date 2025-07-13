import React, { useMemo, useEffect, useState } from "react";
import DynamicGrid from "../common/DynamicGrid";
import useContentstack from "../../hooks/useContentstack";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/Header";

const AllClients = () => {
  const { data: entries, isLoading, error } = useContentstack('portfolio');
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToHome = () => {
    navigate('/', { state: { fromClients: true } });
  };

  const clients = useMemo(() => {
    return entries.flatMap((entry) => {
      if (!Array.isArray(entry.portfolio_page)) return [];

      return entry.portfolio_page.flatMap((block) => {
        if (!block.clients) return [];

        const clientsArray = Array.isArray(block.clients) ? block.clients : [block.clients];
        
        return clientsArray.map((client) => {
          const imageUrl = client.image?.url || client.client?.url;
          if (!imageUrl) return null;
          return { image: imageUrl };
        }).filter(Boolean);
      });
    });
  }, [entries]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Header isScrolled={isScrolled} />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        {/* Hero section with background image */}
        <div className="relative h-[40vh]">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          <div className="relative h-full flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
              Our Clients
            </h1>
          </div>
        </div>

        {/* Main content - Adjusted z-index */}
        <div className={`relative z-0 -mt-20 transition-all duration-300 ${isScrolled ? 'pt-24' : 'pt-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading && (
              <div className="text-center bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
                <p className="text-gray-600 dark:text-gray-300">Loading clients...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            
            {!isLoading && !error && clients.length === 0 && (
              <div className="text-center bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
                <p className="text-gray-500">No clients found</p>
              </div>
            )}
            
            {!isLoading && !error && clients.length > 0 && (
              <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
                <DynamicGrid items={clients} />
                <div className="mt-12 text-center">
                  <button 
                    onClick={handleBackToHome}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllClients; 