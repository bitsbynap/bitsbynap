import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSection } from "../context/SectionContext";
import { useScrollToSection } from "../hooks/useScrollToSection";
import { useEffect, useState } from "react";
import axios from "axios";

const Hero = () => {
  const { activeSection } = useSection();

  //fetch data from contentstack
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      // Debug environment variables
      console.log("Environment Variables:", {
        apiKey: import.meta.env.VITE_API_KEY,
        deliveryToken: import.meta.env.VITE_DELIVERY_TOKEN,
        environment: import.meta.env.VITE_ENVIRONMENT,
      });

      try {
        const response = await axios.get(
          `https://cdn.contentstack.io/v3/content_types/internal_portfolio/entries`,
          {
            params: {
              environment: import.meta.env.VITE_ENVIRONMENT,
            },
            headers: {
              api_key: import.meta.env.VITE_API_KEY,
              access_token: import.meta.env.VITE_DELIVERY_TOKEN,
              "Content-Type": "application/json",
            },
          }
        );
        setPosts(response.data.entries);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
      }
    };

    fetchEntries();
  }, []);
  useScrollToSection(activeSection === "home" ? "hero" : null);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: "linear", 
  };

  const banners = posts.map((post) => ({
    text: post.hero_section?.hero_text,
    image: post.hero_section?.hero_banner.url || "", // optional chaining to avoid crash if undefined
  }));
  

  return (
    <section id="hero" className="pb-20">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="relative w-full h-[500px]">
            <img
              src={banner.image}
              alt={banner.text}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-white text-4xl font-bold text-center px-4">
                {banner.text}
              </h1>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;
