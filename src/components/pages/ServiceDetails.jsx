import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import useContentstack from '../../hooks/useContentstack';
import Header from '../../layout/Header';

// Dummy data for development
const dummyService = {
  id: "web-development",
  title: "Web Development",
  description: "We build modern, scalable, and high-performance web applications using cutting-edge technologies. Our solutions are tailored to meet your specific business needs while ensuring optimal user experience and performance.",
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
  techStack: [
    "React", "Node.js", "TypeScript", "Next.js", "MongoDB", "AWS"
  ],
  techDetails: [
    {
      name: "React",
      description: "A powerful JavaScript library for building user interfaces, particularly single-page applications.",
      website: "https://reactjs.org",
      useCases: [
        "Single Page Applications",
        "Dynamic User Interfaces",
        "Real-time Data Updates",
        "Component-based Architecture"
      ]
    },
    {
      name: "Node.js",
      description: "A JavaScript runtime built on Chrome's V8 JavaScript engine, perfect for building scalable network applications.",
      website: "https://nodejs.org",
      useCases: [
        "Backend Services",
        "API Development",
        "Real-time Applications",
        "Microservices Architecture"
      ]
    },
    {
      name: "TypeScript",
      description: "A typed superset of JavaScript that compiles to plain JavaScript, adding static type definitions.",
      website: "https://www.typescriptlang.org",
      useCases: [
        "Large-scale Applications",
        "Enterprise Development",
        "Better Code Maintainability",
        "Enhanced Developer Experience"
      ]
    }
  ],
  useCases: [
    "E-commerce Platforms",
    "Enterprise Applications",
    "Real-time Collaboration Tools",
    "Content Management Systems",
    "Progressive Web Apps"
  ],
  features: [
    {
      title: "Responsive Design",
      description: "Our applications work seamlessly across all devices and screen sizes."
    },
    {
      title: "Performance Optimization",
      description: "Optimized for speed and efficiency, ensuring the best user experience."
    },
    {
      title: "Security First",
      description: "Built with security best practices to protect your data and users."
    },
    {
      title: "Scalable Architecture",
      description: "Designed to grow with your business needs."
    }
  ],
  benefits: [
    "Reduced Development Time",
    "Lower Maintenance Costs",
    "Better User Experience",
    "Improved Performance",
    "Enhanced Security"
  ],
  majorCompanies: [
    {
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/2048px-Netflix_icon.svg.png",
      useCase: "Uses React for their streaming platform interface",
      website: "https://netflix.com"
    },
    {
      name: "LinkedIn",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png",
      useCase: "Leverages Node.js for their backend services",
      website: "https://linkedin.com"
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
      useCase: "Uses TypeScript extensively in their development",
      website: "https://microsoft.com"
    }
  ],
  process: [
    {
      title: "Discovery & Planning",
      description: "We work with you to understand your requirements and create a detailed project plan."
    },
    {
      title: "Design & Architecture",
      description: "Our team designs the solution architecture and creates wireframes for your approval."
    },
    {
      title: "Development",
      description: "We build your application using industry best practices and modern technologies."
    },
    {
      title: "Testing & Quality Assurance",
      description: "Rigorous testing ensures your application meets all requirements and quality standards."
    },
    {
      title: "Deployment & Launch",
      description: "We deploy your application and ensure a smooth launch process."
    }
  ],
  faqs: [
    {
      question: "What is the typical development timeline?",
      answer: "The timeline varies based on project complexity, but typically ranges from 2-6 months for a complete web application."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer comprehensive maintenance and support packages to ensure your application runs smoothly."
    },
    {
      question: "How do you handle security?",
      answer: "We implement industry-standard security practices, including regular security audits, SSL encryption, and secure coding practices."
    }
  ],
  marketStats: {
    "Market Size": "$10B+",
    "Adoption Rate": "85%",
    "Average ROI": "300%",
    "Growth Rate": "15% YoY"
  }
};

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: entries, isLoading, error } = useContentstack('portfolio');
  const [expandedFaq, setExpandedFaq] = React.useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // For development, use dummy data
  // In production, this would come from Contentstack
  const service = React.useMemo(() => {
    // For now, always return dummy data
    return dummyService;
    
    // When Contentstack is ready, uncomment this:
    /*
    if (!entries) return null;
    return entries.flatMap((entry) => {
      if (!Array.isArray(entry.portfolio_page)) return [];
      return entry.portfolio_page.flatMap((block) => {
        if (!block.services) return [];
        try {
          return [{
            id: block.services.id || block.services.title?.toLowerCase().replace(/\s+/g, '-'),
            title: block.services.title || "Service Title",
            description: block.services.description || "No description available",
            image: block.services.image?.url || "https://via.placeholder.com/800x400?text=No+Image",
            techStack: block.services.tech_stack || [],
            techDetails: block.services.tech_details || [],
            useCases: block.services.use_cases || [],
            features: block.services.features || [],
            benefits: block.services.benefits || [],
            clients: block.services.clients || [],
            majorCompanies: block.services.major_companies || [],
            process: block.services.process || [],
            faqs: block.services.faqs || [],
            marketStats: block.services.market_stats || {},
          }];
        } catch (error) {
          console.error("Error processing service block:", error);
          return [];
        }
      });
    }).find(service => service.id === serviceId);
    */
  }, [entries, serviceId]);

  const handleBack = () => {
    navigate('/', { 
      state: { scrollTo: 'services' },
      replace: true 
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header isScrolled={isScrolled} />
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-8"></div>
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Header isScrolled={isScrolled} />
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center text-red-500">{error}</div>
          </div>
        </div>
      </>
    );
  }

  // Service not found state
  if (!service) {
    return (
      <>
        <Header isScrolled={isScrolled} />
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center text-gray-600 dark:text-gray-300">
              Service not found
            </div>
          </div>
        </div>
      </>
    );
  }

  // Main render
  return (
    <>
      <Header isScrolled={isScrolled} />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        {/* Hero section with background image */}
        <div className="relative h-[40vh]">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{service.title}</h1>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto">{service.description}</p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className={`relative z-10 -mt-20 transition-all duration-300 ${isScrolled ? 'pt-24' : 'pt-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center text-white dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Tech Stack with Details */}
                {service.techStack && service.techStack.length > 0 && (
                  <section className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Technology Stack</h2>
                    
                    {/* Quick Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {service.techStack.map((tech, index) => (
                        <div key={index} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                          <Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>

                    {/* Detailed Tech Information */}
                    {service.techDetails && service.techDetails.length > 0 && (
                      <div className="mt-8 space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Technology Details</h3>
                        {service.techDetails.map((tech, index) => (
                          <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{tech.name}</h4>
                                <p className="text-gray-600 dark:text-gray-300 mt-2">{tech.description}</p>
                              </div>
                              {tech.website && (
                                <a
                                  href={tech.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                  <span className="mr-1">Website</span>
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                            {tech.useCases && tech.useCases.length > 0 && (
                              <div className="mt-4">
                                <h5 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Common Use Cases:</h5>
                                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                                  {tech.useCases.map((useCase, idx) => (
                                    <li key={idx}>{useCase}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                )}

                {/* Major Companies Using This Tech */}
                {service.majorCompanies && service.majorCompanies.length > 0 && (
                  <section className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Major Companies Using This Technology</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {service.majorCompanies.map((company, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                          <div className="flex items-center space-x-4">
                            {company.logo && (
                              <img
                                src={company.logo}
                                alt={company.name}
                                className="w-16 h-16 object-contain"
                              />
                            )}
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{company.name}</h3>
                              <p className="text-gray-600 dark:text-gray-300 mt-1">{company.useCase}</p>
                              {company.website && (
                                <a
                                  href={company.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline mt-2"
                                >
                                  <span className="mr-1">Learn More</span>
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Market Statistics */}
                {service.marketStats && Object.keys(service.marketStats).length > 0 && (
                  <section className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Market Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(service.marketStats).map(([key, value], index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h3>
                          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <section className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Key Features</h2>
                    <div className="grid gap-4">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Check className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Process */}
                {service.process && service.process.length > 0 && (
                  <section className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Our Process</h2>
                    <div className="space-y-6">
                      {service.process.map((step, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">{step.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* FAQs */}
                {service.faqs && service.faqs.length > 0 && (
                  <section className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {service.faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            className="flex justify-between items-center w-full text-left"
                          >
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">{faq.question}</h3>
                            {expandedFaq === index ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </button>
                          {expandedFaq === index && (
                            <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.answer}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Benefits */}
                {service.benefits && service.benefits.length > 0 && (
                  <section className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Benefits</h2>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2 text-gray-600 dark:text-gray-300">
                          <Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Use Cases */}
                {service.useCases && service.useCases.length > 0 && (
                  <section className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Use Cases</h2>
                    <ul className="space-y-3">
                      {service.useCases.map((useCase, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-300">
                          • {useCase}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetails; 