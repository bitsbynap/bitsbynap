import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSection } from "../context/SectionContext";
import { useScrollToSection } from "../hooks/useScrollToSection";
import useContentstack from "../hooks/useContentstack";

const Hero = () => {
  const { activeSection } = useSection();
  const { data: posts, isLoading, error } = useContentstack('portfolio');
  useScrollToSection(activeSection === "home" ? "hero" : null);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    fade: true,
    cssEase: "linear",
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
      <section id="hero" className="pb-20">
        <div className="text-center text-gray-500">Loading banners...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="hero" className="pb-20">
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  if (banners.length === 0) {
    return (
      <section id="hero" className="pb-20">
        <div className="text-center text-gray-500">No banners available</div>
      </section>
    );
  }

  return (
    <section id="hero" className="pb-20">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="relative">
            <div
              className="h-[500px] bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {banner.text}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;
