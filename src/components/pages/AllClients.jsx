import React, { useMemo } from "react";
import DynamicGrid from "../common/DynamicGrid";
import useContentstack from "../../hooks/useContentstack";

const AllClients = () => {
  const { data: entries, isLoading, error } = useContentstack('portfolio');

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          Our Clients
        </h1>

        {isLoading && (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">Loading clients...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        
        {!isLoading && !error && clients.length === 0 && (
          <div className="text-center">
            <p className="text-gray-500">No clients found</p>
          </div>
        )}
        
        {!isLoading && !error && clients.length > 0 && (
          <>
            <DynamicGrid items={clients} />
            <div className="mt-8 text-center">
              <button 
                onClick={() => window.history.back()}
                className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllClients; 