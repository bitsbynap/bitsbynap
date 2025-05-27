import React, { useState, useEffect, useMemo } from "react";
import { useSection } from '../../context/SectionContext';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import axios from 'axios';
import ENV from '../../../env';
import DynamicGrid from "../common/DynamicGrid";

const Portfolio = () => {
  const { activeSection } = useSection();
  useScrollToSection(activeSection === 'portfolio' ? 'portfolio' : null);

  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://cdn.contentstack.io/v3/content_types/portfolio/entries`,
          {
            params: { environment: ENV.CONTENTSTACK_ENVIRONMENT },
            headers: {
              api_key: ENV.CONTENTSTACK_API_KEY,
              access_token: ENV.CONTENTSTACK_DELIVERY_TOKEN,
              "Content-Type": "application/json",
            },
          }
        );
        setEntries(response.data.entries);
      } catch (error) {
        console.error("Error fetching content:", error);
        setError(error.message || "Failed to fetch portfolio");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const projects = useMemo(() => {
    return entries.flatMap((entry) => {
      if (!Array.isArray(entry.portfolio_page)) return [];

      return entry.portfolio_page.flatMap((block) => {
        try {
          const imageUrl = block.clients?.client?.url;
          if (!imageUrl) return [];

          return [{
            image: imageUrl
          }];
        } catch (err) {
          console.error("Error processing block:", err);
          return [];
        }
      });
    });
  }, [entries]);

  return (
<section id="portfolio" className="animated-gradient py-20 animate-fadeIn relative text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Some of our preferred Clients
        </h2>

        {isLoading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!isLoading && !error && (
          <DynamicGrid items={projects} />
        )}
        <div className="flex justify-center mt-6">
          <button className="bg-red-700 text-white py-2 px-4 hover:bg-red-800 transition rounded-xl">
            See more...
          </button>
        </div>
      </div>
    </section>

  );
};

export default Portfolio;
