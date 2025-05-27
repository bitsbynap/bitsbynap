import React, { useState, useMemo } from "react";
import { useSection } from "../../context/SectionContext";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useContentstack from "../../hooks/useContentstack";
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
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-gray-800">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Arrow Controls */}
            <div className="absolute top-1/2 left-0 right-0 px-4 -translate-y-1/2 z-10">
              {/* Desktop Arrow Controls (visible only on md and up) */}
              <div className="hidden md:flex justify-between items-center">
                <button
                  className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors duration-300"
                  onClick={() => sliderRef?.slickPrev()}
                >
                  <ChevronLeft />
                </button>
                <button
                  className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors duration-300"
                  onClick={() => sliderRef?.slickNext()}
                >
                  <ChevronRight />
                </button>
              </div>

              {/* Mobile Arrow Controls (visible only on sm and below) */}
              <div className="md:hidden flex justify-between items-center">
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
            </div>

            <SliderErrorBoundary>
              <Slider ref={setSliderRef} {...settings}>
                {data.map((service, index) => (
                  <div key={index} className="px-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                      <div className="relative h-48">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x300?text=Error+Loading+Image";
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </SliderErrorBoundary>
          </>
        )}
      </div>
    </section>
  );
};

export default Services;
