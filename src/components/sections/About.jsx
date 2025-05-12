import { useSection } from "../../context/SectionContext";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import ENV from "../../../env";
import axios from "axios";
import { useEffect, useState } from "react";

const About = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state to handle async UI
  useEffect(() => {
    const fetchEntries = async () => {
      console.log("Fetching data from Contentstack...");

      console.log("Environment Variables about:", {
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

        console.log("Fetched about:", response.data.entries);
        setPosts(response.data.entries);
      } catch (error) {
        console.error("Error fetching about:", error);
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

  const { activeSection } = useSection();
  useScrollToSection(activeSection === "about" ? "about" : null);
  //added
  const about = posts.flatMap((post, postIndex) => {
    if (!Array.isArray(post.portfolio_page)) {
      return [];
    }

    return post.portfolio_page.flatMap((block, blockIndex) => {
      if (!block.about_us) return [];

      const mission = block.about_us.mission || "Default mission text"; // Default text if missing
      const story = block.about_us.story || "Default story text"; // Default text if missing

      return mission ? [{ mission, story }] : [];
    });
  });
  console.log("about", about);

  return (
    <section id="about" className="py-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fadeInUp">
          About Us
        </h2>

        {about.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="transform transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 animate-fadeInUp">
                Our Story
              </h3>
              <p className="text-gray-600 animate-fadeInUp">{about[0].story}</p>
            </div>
            <div className="transform transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 animate-fadeInUp">
                Our Mission
              </h3>
              <p className="text-gray-600 animate-fadeInUp">
                {about[0].mission}
              </p>
            </div>
          </div>
        ) : isLoading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <p className="text-center text-red-500">
            Failed to load About content.
          </p>
        )}
      </div>
    </section>
  );
};

export default About;
