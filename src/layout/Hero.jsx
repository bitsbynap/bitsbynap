import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSection } from "../context/SectionContext";
import { useScrollToSection } from "../hooks/useScrollToSection";
import { useEffect, useState, useRef } from "react";
import useContentstack from "../hooks/useContentstack";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const { activeSection } = useSection();
  const { data: posts, isLoading, error } = useContentstack('portfolio');
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useScrollToSection(activeSection === "home" ? "hero" : null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    beforeChange: (_, next) => setCurrentSlide(next),
    customPaging: (i) => (
      <motion.div 
        className={`w-2.5 h-2.5 rounded-full mx-1 cursor-pointer ${
          i === currentSlide ? 'bg-white' : 'bg-white/50'
        }`}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      />
    ),
  };

  const banners = posts.flatMap((post) => {
    if (!Array.isArray(post.portfolio_page)) {
      return [];
    }

    return post.portfolio_page.flatMap((block) => {
      if (!block.hero_section) return [];

      const text = block.hero_section.hero_text || "Default hero text";
      const image = block.hero_section.banner_image?.url || "https://via.placeholder.com/1200x500.png?text=No+Image";

      return image ? [{ text, image }] : [];
    });
  });

  if (isLoading) {
    return (
      <section id="hero" className="fixed top-0 left-0 w-full h-screen z-0">
        <div className="flex items-center justify-center h-full">
          <motion.div 
            className="text-white text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            Loading...
          </motion.div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="hero" className="fixed top-0 left-0 w-full h-screen z-0">
        <div className="flex items-center justify-center h-full">
          <motion.div 
            className="text-red-500 text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.div>
        </div>
      </section>
    );
  }

  if (banners.length === 0) {
    return (
      <section id="hero" className="fixed top-0 left-0 w-full h-screen z-0">
        <div className="flex items-center justify-center h-full">
          <motion.div 
            className="text-white text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No banners available
          </motion.div>
        </div>
      </section>
    );
  }

  // Calculate blur based on scroll position
  const blurAmount = Math.min(scrollY / 20, 10); // Max blur of 10px
  const opacity = Math.max(1 - scrollY / 500, 0.3); // Min opacity of 0.3

  return (
    <section 
      id="hero" 
      className="fixed top-0 left-0 w-full h-screen z-0 transition-all duration-300"
      style={{
        filter: `blur(${blurAmount}px)`,
        opacity: opacity,
      }}
    >
      <Slider ref={sliderRef} {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="relative h-screen">
            <motion.div
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${banner.image})` }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "linear" }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="text-center text-white px-4 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  }}
                >
                  <motion.h1 
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.4,
                      ease: [0.6, -0.05, 0.01, 0.99]
                    }}
                  >
                    {banner.text}
                  </motion.h1>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.6,
                      ease: [0.6, -0.05, 0.01, 0.99]
                    }}
                  >
                    <motion.button 
                      className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      Explore More
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-3 bg-white rounded-full mt-1"
            animate={{ 
              y: [0, 12, 0],
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
