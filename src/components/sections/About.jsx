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
    <section id="about" className="py-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fadeInUp">
          About Us
        </h2>

        {about.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="transform transition-all duration-500 hover:scale-105 group relative bg-white rounded-2xl shadow-xl p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/30 group-hover:via-purple-500/30 group-hover:to-pink-500/30 rounded-2xl transition-all duration-300" />
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-4 animate-fadeInUp">
                  Our Story
                </h3>
                <p className="text-gray-600 animate-fadeInUp">{about[0].story}</p>
              </div>
            </div>
            <div className="transform transition-all duration-500 hover:scale-105 group relative bg-white rounded-2xl shadow-xl p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/30 group-hover:via-purple-500/30 group-hover:to-pink-500/30 rounded-2xl transition-all duration-300" />
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-4 animate-fadeInUp">
                  Our Mission
                </h3>
                <p className="text-gray-600 animate-fadeInUp">
                  {about[0].mission}
                </p>
              </div>
            </div>
          </div>
        ) : isLoading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
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
