import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSection } from "../context/SectionContext";
import { useScrollToSection } from "../hooks/useScrollToSection";
import { useEffect, useState } from "react";
import axios from "axios";
import ENV from "../../env";

const Hero = () => {
  const { activeSection } = useSection();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state to handle async UI

  useEffect(() => {
    const fetchEntries = async () => {
      console.log("Fetching data from Contentstack...");

      console.log("Environment Variables:", {
        apiKey: ENV.CONTENTSTACK_API_KEY,
        deliveryToken: ENV.CONTENTSTACK_DELIVERY_TOKEN,
        environment: ENV.CONTENTSTACK_ENVIRONMENT,
      });

      try {
        const response = await axios.get(
          `https://cdn.contentstack.io/v3/content_types/portfolio/entries`,
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

        console.log("Fetched entries:", response.data.entries);
        setPosts(response.data.entries);
      } catch (error) {
        console.error("Error fetching content:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Status:", error.response.status);
          console.error("Headers:", error.response.headers);
        }
      } finally {
        setIsLoading(false); // Set loading to false after fetching is done
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

  const banners = posts.flatMap((post, postIndex) => {
    if (!Array.isArray(post.portfolio_page)) {
      return [];
    }

    return post.portfolio_page.flatMap((block, blockIndex) => {
      if (!block.hero_section) return [];

      const text = block.hero_section.hero_text || "Default hero text"; // Default text if missing
      const image = block.hero_section.banner_image?.url || "https://via.placeholder.com/1200x500.png?text=No+Image"; // Placeholder if no image


      return image ? [{ text, image }] : [];
    });
  });

  console.log("Final banners array:", banners);

  // If there's no data, show loading or fallback message
  if (isLoading) {
    return (
      <section id="hero" className="pb-20">
        <div className="text-center text-gray-500">Loading banners...</div>
      </section>
    );
  }

  return (
    <section id="hero" className="pb-20">
      {banners.length === 0 ? (
        <div className="text-center text-gray-500">No banners to show.</div>
      ) : (
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index} className="relative w-full h-[500px]">
              <img
                src={banner.image}
                alt={banner.text || "Hero image"}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => e.target.src = "https://via.placeholder.com/1200x500.png?text=Error+Loading+Image"} // Fallback on error
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold text-center px-4">
                  {banner.text}
                </h1>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </section>
  );
};

export default Hero;
