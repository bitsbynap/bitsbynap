import { useSection } from '../../context/SectionContext';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import Card from '../common/Card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMemo, useState } from 'react';

const Portfolio = () => {
  const { activeSection } = useSection();
  useScrollToSection(activeSection === 'portfolio' ? 'portfolio' : null);

  const [activeIndex, setActiveIndex] = useState(0);

  const projects = useMemo(() => [
    { title: 'Project 1', description: 'Description of project 1 and its features.', image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg' },
    { title: 'Project 2', description: 'Description of project 2 and its features.', image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg' },
    { title: 'Project 3', description: 'Description of project 3 and its features.', image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg' },
    { title: 'Project 4', description: 'Description of project 4 and its features.', image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg' },
    { title: 'Project 5', description: 'Description of project 5 and its features.', image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg' },
  ], []);

  const settings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_, next) => setActiveIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        }
      }
    ]
  }), []);

  return (
    <section id="portfolio" className="bg-white py-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fadeInUp">Our Portfolio</h2>
        <Slider {...settings}>
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={project.title} className="px-4">
                <div className={`transition-all duration-700 ${
                  isActive
                    ? 'scale-110 z-10 blur-0 opacity-100'
                    : 'scale-90 opacity-60 blur-sm'
                }`}>
                  <Card
                    title={project.title}
                    description={project.description}
                    image={project.image}
                  />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default Portfolio;
