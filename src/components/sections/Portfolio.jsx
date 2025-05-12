import React from "react";
import { useSection } from '../../context/SectionContext';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import Card from '../common/Card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMemo, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import ENV from '../../../env';

// Error Boundary Component
class SliderErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <div className="text-center text-red-500">Error loading portfolio</div>;
    }
    return this.props.children;
  }
}

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg"></div>
        <div className="h-4 bg-gray-200 rounded mt-4"></div>
        <div className="h-4 bg-gray-200 rounded mt-2 w-3/4"></div>
      </div>
    ))}
  </div>
);

const Portfolio = () => {
  const { activeSection } = useSection();
  useScrollToSection(activeSection === 'portfolio' ? 'portfolio' : null);
  const [sliderRef, setSliderRef] = useState(null);
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setIsLoading(true);
        setError(null);
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
        setError(error.message || "Failed to fetch portfolio");
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const projects = useMemo(() => {
    return entries
      .flatMap((entry) => {
        if (!Array.isArray(entry.portfolio_page)) return [];
        return entry.portfolio_page.flatMap((block) => {
          if (!block.portfolio) return [];
          try {
            return [{
              title: block.portfolio.title || "Project Title",
              description: block.portfolio.description || "No description available",
              link: block.portfolio.link || "#",
              image: block.portfolio.image?.url || "https://via.placeholder.com/400x300?text=No+Image",
              checked: block.portfolio.checked ?? true,
            }];
          } catch (error) {
            console.error('Error processing portfolio block:', error);
            return [];
          }
        });
      })
      .filter((project) => project.checked === true);
  }, [entries]);

  const settings = useMemo(() => ({
    dots: false,
    infinite: projects.length > 3,
    speed: 500,
    slidesToShow: Math.min(projects.length, 3),
    slidesToScroll: 1,
    centerMode: projects.length > 3,
    autoplay: false,
    arrows: projects.length > 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(projects.length, 2),
          arrows: projects.length > 2,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          arrows: projects.length > 1,
        }
      }
    ]
  }), [projects.length]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (projects.length === 0) {
    return <div className="text-center text-gray-500">No projects available</div>;
  }

  return (
    <section id="portfolio" className="bg-gray-100 py-20 animate-fadeIn relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Latest from Our Work</h2>

        {/* Arrows - Only show if there are more than 3 projects */}
        {projects.length > 3 && (
          <div className="flex justify-end gap-4 mb-4">
            <button
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors duration-300"
              onClick={() => sliderRef?.slickPrev()}
            >
              <ChevronLeft />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors duration-300"
              onClick={() => sliderRef?.slickNext()}
            >
              <ChevronRight />
            </button>
          </div>
        )}

        <SliderErrorBoundary>
          <Slider ref={setSliderRef} {...settings}>
            {projects.map((project, index) => (
              <div key={index} className="px-2">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden group">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-gray-800">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-300 text-sm font-medium inline-flex items-center"
                    >
                      View Project 
                      <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </SliderErrorBoundary>
      </div>
    </section>
  );
};

export default Portfolio;
