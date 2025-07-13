import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../layout/Header";
import { Check, Users, Target, Award, Heart, Lightbulb } from "lucide-react";

// Dummy data for when Contentstack is not available
const aboutData = {
  story: {
    title: "Our Story",
    subtitle: "From Humble Beginnings to Industry Leaders",
    content: "Founded in 2015, our journey began with a simple yet powerful vision: to transform the digital landscape through innovative solutions. What started as a small team of passionate developers has grown into a full-service digital agency, serving clients across the globe.",
    timeline: [
      {
        year: "2015",
        title: "The Beginning",
        description: "Started with a team of 5 passionate developers in a small office."
      },
      {
        year: "2017",
        title: "First Major Success",
        description: "Launched our first enterprise-level project, serving over 1 million users."
      },
      {
        year: "2019",
        title: "Global Expansion",
        description: "Opened offices in three new countries and expanded our team to 50 members."
      },
      {
        year: "2021",
        title: "Innovation Award",
        description: "Received the 'Most Innovative Tech Company' award for our AI solutions."
      },
      {
        year: "2023",
        title: "Present Day",
        description: "Serving 100+ clients worldwide with a team of 200+ professionals."
      }
    ],
    stats: [
      { number: "200+", label: "Team Members", icon: Users },
      { number: "100+", label: "Global Clients", icon: Target },
      { number: "50+", label: "Awards Won", icon: Award },
      { number: "98%", label: "Client Satisfaction", icon: Heart }
    ]
  },
  mission: {
    title: "Our Mission",
    subtitle: "Empowering Businesses Through Technology",
    content: "Our mission is to empower businesses with cutting-edge technology solutions that drive growth, innovation, and success in the digital age. We believe in creating lasting partnerships with our clients, understanding their unique needs, and delivering solutions that exceed expectations.",
    values: [
      {
        title: "Innovation",
        description: "Constantly pushing boundaries and exploring new technologies to deliver cutting-edge solutions.",
        icon: Lightbulb
      },
      {
        title: "Excellence",
        description: "Committed to delivering the highest quality in everything we do, from code to customer service.",
        icon: Award
      },
      {
        title: "Collaboration",
        description: "Working together with our clients and team members to achieve shared goals and success.",
        icon: Users
      },
      {
        title: "Integrity",
        description: "Building trust through honest communication, ethical practices, and transparent operations.",
        icon: Heart
      }
    ],
    goals: [
      "Expand our global presence to serve more markets",
      "Develop innovative solutions using emerging technologies",
      "Maintain our commitment to sustainable business practices",
      "Foster a culture of continuous learning and growth",
      "Achieve 100% client satisfaction in all projects"
    ]
  }
};

const AboutUs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('story'); // 'story' or 'mission'

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set active section based on URL hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'mission' || hash === 'story') {
      setActiveSection(hash);
    }
  }, [location]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToHome = () => {
    navigate('/', { state: { scrollTo: 'about' } });
  };

  return (
    <>
      <Header isScrolled={isScrolled} />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        {/* Hero section */}
        <div className="relative h-[40vh]">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          <div className="relative h-full flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
              About Us
            </h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="sticky top-16 z-10 bg-white dark:bg-dark-card shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-center space-x-8">
      <button
        onClick={() => setActiveSection("story")}
        className={`py-4 px-2 border-b-2 font-medium text-sm ${
          activeSection === "story"
            ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
        }`}
      >
        Our Story
      </button>
      <button
        onClick={() => setActiveSection("mission")}
        className={`py-4 px-2 border-b-2 font-medium text-sm ${
          activeSection === "mission"
            ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
        }`}
      >
        Our Mission
      </button>
    </div>
  </div>
</div>


        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-12">

          {activeSection === 'story' && (
            <div className="space-y-12">
              {/* Story Header */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {aboutData.story.title}
                </h2>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                  {aboutData.story.subtitle}
                </p>
              </div>

              {/* Story Content */}
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {aboutData.story.content}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                {aboutData.story.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <stat.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {stat.number}
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                  Our Journey
                </h3>
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
                  <div className="space-y-12">
                    {aboutData.story.timeline.map((event, index) => (
                      <div key={index} className="relative">
                        <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                          <div className="flex-1">
                            <div className={`p-6 bg-white dark:bg-dark-card rounded-lg shadow-lg ${
                              index % 2 === 0 ? 'mr-8' : 'ml-8'
                            }`}>
                              <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                {event.year}
                              </div>
                              <h4 className="mt-2 text-lg font-bold text-gray-900 dark:text-gray-100">
                                {event.title}
                              </h4>
                              <p className="mt-2 text-gray-600 dark:text-gray-400">
                                {event.description}
                              </p>
                            </div>
                          </div>
                          <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'mission' && (
            <div className="space-y-12">
              {/* Mission Header */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {aboutData.mission.title}
                </h2>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                  {aboutData.mission.subtitle}
                </p>
              </div>

              {/* Mission Content */}
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {aboutData.mission.content}
                </p>
              </div>

              {/* Values */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {aboutData.mission.values.map((value, index) => (
                  <div key={index} className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-6">
                    <div className="flex items-center space-x-4">
                      <value.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {value.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Goals */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Our Goals
                </h3>
                <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-6">
                  <ul className="space-y-4">
                    {aboutData.mission.goals.map((goal, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Back to Home Button */}
          <div className="mt-12 text-center">
            <button 
              onClick={handleBackToHome}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs; 