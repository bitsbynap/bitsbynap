import { useSection } from "../../context/SectionContext";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import useContentstack from "../../hooks/useContentstack";

const About = () => {
  const { data: posts, isLoading, error } = useContentstack('portfolio');
  const { activeSection } = useSection();
  useScrollToSection(activeSection === "about" ? "about" : null);

  const about = posts.flatMap((post) => {
    if (!Array.isArray(post.portfolio_page)) {
      return [];
    }

    return post.portfolio_page.flatMap((block) => {
      if (!block.about_us) return [];

      const mission = block.about_us.mission || "Default mission text";
      const story = block.about_us.story || "Default story text";

      return mission ? [{ mission, story }] : [];
    });
  });

  return (
    <section id="about" className="py-16 bg-gray-100 dark:bg-dark-bg animate-fadeIn transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fadeInUp text-gray-800 dark:text-gray-100">
          About Us
        </h2>

        {about.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Our Story
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{about[0].story}</p>
            </div>
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {about[0].mission}
              </p>
            </div>
          </div>
        ) : isLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 dark:text-red-400">{error}</p>
        ) : (
          <p className="text-center text-red-500 dark:text-red-400">
            Failed to load About content.
          </p>
        )}
      </div>
    </section>
  );
};

export default About;
