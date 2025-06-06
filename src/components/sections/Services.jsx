import React, { useMemo, useState, useEffect } from "react";
import { useSection } from "../../context/SectionContext";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useContentstack from "../../hooks/useContentstack";
import Card from "../common/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Error Boundary Component
class SliderErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-red-500">Error loading services</div>
      );
    }
    return this.props.children;
  }
}

const Services = () => {
  const { activeSection } = useSection();
  useScrollToSection(activeSection === "services" ? "services" : null);
  const { data: entries, isLoading, error } = useContentstack('portfolio');
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderRef, setSliderRef] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const services = useMemo(() => {
    if (!entries) return [];
    return entries.flatMap((entry) => {
      if (!Array.isArray(entry.portfolio_page)) return [];
      return entry.portfolio_page.flatMap((block) => {
        if (!block.services) return [];
        try {
          return [{
            id: block.services.id || block.services.title?.toLowerCase().replace(/\s+/g, '-'),
            title: block.services.title || "Service Title",
            description: block.services.description || "No description available",
            image: block.services.image?.url || "https://via.placeholder.com/400x300?text=No+Image",
            techStack: block.services.tech_stack || [],
            useCases: block.services.use_cases || [],
            features: block.services.features || [],
            benefits: block.services.benefits || [],
            clients: block.services.clients || [],
            process: block.services.process || [],
            faqs: block.services.faqs || [],
            checked: block.services.checked ?? true,
          }];
        } catch (error) {
          console.error("Error processing service block:", error);
          return [];
        }
      });
    }).filter(service => service.checked === true);
  }, [entries]);

  // Reset slider when data changes
  useEffect(() => {
    if (sliderRef && services.length > 0 && isInitialized) {
      try {
        sliderRef.slickGoTo(0);
        setActiveIndex(0);
      } catch (error) {
        console.error('Error resetting slider:', error);
      }
    }
  }, [services, sliderRef, isInitialized]);

  const settings = useMemo(
    () => ({
      infinite: services.length > 1,
      centerMode: services.length > 3,
      centerPadding: services.length > 3 ? "200px" : "0px",
      slidesToShow: services.length > 3 ? 1 : Math.min(services.length, 3),
      speed: 500,
      arrows: false,
      autoplay: false,
      autoplaySpeed: 3000,
      initialSlide: 0,
      beforeChange: (_, next) => {
        setActiveIndex(next);
        if (!isInitialized) setIsInitialized(true);
      },
      afterChange: () => {
        if (!isInitialized) setIsInitialized(true);
      },
      onInit: () => {
        setIsInitialized(true);
      },
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            centerMode: false,
            centerPadding: "0px",
            slidesToShow: Math.min(services.length, 2),
            arrows: false,
          },
        },
        {
          breakpoint: 768,
          settings: {
            centerMode: false,
            centerPadding: "0px",
            slidesToShow: 1,
            arrows: false,
          },
        },
      ],
    }),
    [isInitialized, services.length]
  );

  const renderCards = useMemo(() => {
    return services.map((service, index) => {
      const isActive = index === activeIndex;
      const isMiddleSlide = index === Math.floor(services.length / 2);

      return (
        <div key={service.id} className="px-2">
          <div
            className={`transition-all duration-500 ease-in-out ${
              isActive || (!isInitialized && isMiddleSlide)
                ? "scale-100 opacity-100 blur-0"
                : "md:scale-90 md:opacity-50 md:blur-sm scale-100 opacity-100 blur-0"
            }`}
          >
            <Card
              serviceId={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
            />
          </div>
        </div>
      );
    });
  }, [services, activeIndex, isInitialized]);

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="animate-pulse-slow">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-[300px] h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-dark-bg animate-fadeIn transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100 animate-fade-in-down">
          Our Services
        </h2>
        
        {services.length <= 3 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {services.map((service) => (
              <Card
                key={service.id}
                serviceId={service.id}
                title={service.title}
                description={service.description}
                image={service.image}
              />
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Arrow Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 z-10 w-full pointer-events-none">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center pointer-events-auto">
                  <button
                    className="w-12 h-12 rounded-full bg-black dark:bg-gray-800 text-white flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-300 shadow-lg"
                    onClick={() => sliderRef?.slickPrev()}
                    aria-label="Previous service"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    className="w-12 h-12 rounded-full bg-black dark:bg-gray-800 text-white flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-300 shadow-lg"
                    onClick={() => sliderRef?.slickNext()}
                    aria-label="Next service"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            <SliderErrorBoundary>
              <Slider ref={setSliderRef} {...settings}>
                {renderCards}
              </Slider>
            </SliderErrorBoundary>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;