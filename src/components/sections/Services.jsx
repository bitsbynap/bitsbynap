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

  const data = useMemo(() => {
    return entries
      .flatMap((entry) => {
        if (!Array.isArray(entry.portfolio_page)) return [];
        return entry.portfolio_page.flatMap((block) => {
          if (!block.services) return [];
          try {
            return [
              {
                title: block.services.title || "Service Title",
                description:
                  block.services.description || "No description available",
                image:
                  block.services.image?.url ||
                  "https://via.placeholder.com/400x300?text=No+Image",
                checked: block.services.checked ?? true,
              },
            ];
          } catch (error) {
            console.error("Error processing service block:", error);
            return [];
          }
        });
      })
      .filter((service) => service.checked === true);
  }, [entries]);

  // Reset slider when data changes
  useEffect(() => {
    if (sliderRef && data.length > 0) {
      sliderRef.slickGoTo(0);
      setActiveIndex(0);
    }
  }, [data, sliderRef]);

  const settings = useMemo(
    () => ({
      infinite: data.length > 1,
      centerMode: data.length > 3,
      centerPadding: data.length > 3 ? "200px" : "0px",
      slidesToShow: data.length > 3 ? 1 : Math.min(data.length, 3),
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
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            centerMode: false,
            centerPadding: "0px",
            slidesToShow: Math.min(data.length, 2),
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
    [isInitialized, data.length]
  );

  const renderCards = useMemo(() => {
    return data.map((service, index) => {
      const isActive = index === activeIndex;
      const isMiddleSlide = index === Math.floor(data.length / 2);

      return (
        <div key={index} className="px-2">
          <div
            className={`transition-all duration-500 ease-in-out ${
              isActive || (!isInitialized && isMiddleSlide)
                ? "scale-100 opacity-100 blur-0"
                : "md:scale-90 md:opacity-50 md:blur-sm scale-100 opacity-100 blur-0"
            }`}
          >
            <Card
              title={service.title}
              description={service.description}
              image={service.image}
            />
          </div>
        </div>
      );
    });
  }, [data, activeIndex, isInitialized]);

  if (isLoading) {
    return (
      <section id="services" className="py-16">
        <div className="text-center text-gray-500">Loading services...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-16">
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  if (data.length === 0) {
    return (
      <section id="services" className="py-16">
        <div className="text-center text-gray-500">No services available</div>
      </section>
    );
  }

  return (
    <section
      id="services"
      className="bg-gray-100 py-20 animate-fadeIn relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Services
        </h2>

        {data.length <= 3 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center px-4 sm:px-0">
            {data.map((service, index) => (
              <div
                key={index}
                className="transform transition-all duration-500 hover:scale-105 w-full sm:max-w-sm"
              >
                <Card
                  title={service.title}
                  description={service.description}
                  image={service.image}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Arrow Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 z-10 w-full pointer-events-none">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center pointer-events-auto">
                  <button
                    className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 shadow-lg"
                    onClick={() => sliderRef?.slickPrev()}
                    aria-label="Previous service"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 shadow-lg"
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