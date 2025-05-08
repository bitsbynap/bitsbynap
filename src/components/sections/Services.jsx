import { useSection } from '../../context/SectionContext';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMemo, useState } from 'react';
import Card from '../common/Card';

const services = [
  {
    title: 'Service 1',
    description: 'Description of service 1 and its benefits.',
    image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg'
  },
  {
    title: 'Service 2',
    description: 'Description of service 2 and its benefits.',
    image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg'
  },
  {
    title: 'Service 3',
    description: 'Description of service 3 and its benefits.',
    image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg'
  },
  {
    title: 'Service 4',
    description: 'Description of service 4 and its benefits.',
    image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg'
  }
];

const Services = () => {
  const { activeSection } = useSection();
  useScrollToSection(activeSection === 'services' ? 'services' : null);
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = useMemo(() => ({
    infinite: true,
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 3,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_, next) => setActiveIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, centerMode: false }
      }
    ]
  }), []);

  return (
    <section id="services" className="bg-gray-100 py-20 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <Slider {...settings}>
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={index} className="px-4">
                <div
                  className={`transition-all duration-700 ${
                    isActive
                      ? 'scale-110 z-10 blur-0 opacity-100'
                      : 'scale-90 opacity-60 blur-sm'
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
          })}
        </Slider>
      </div>
    </section>
  );
};

export default Services;
