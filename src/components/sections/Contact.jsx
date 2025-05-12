import React from "react";
import { useSection } from '../../context/SectionContext';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ENV from '../../../env';
import { Mail, Phone, MapPin, Send, ArrowUp } from 'lucide-react';

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 animate-pulse">
    <div className="space-y-6">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  </div>
);

// ScrollToTop Component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg 
        transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 
        focus:ring-blue-500 focus:ring-offset-2 z-50
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

const Contact = () => {
  const { activeSection } = useSection();
  useScrollToSection(activeSection === 'contact' ? 'contact' : null);
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          `https://cdn.contentstack.io/v3/content_types/portfolio/entries`,
          {
            params: { environment: ENV.CONTENTSTACK_ENVIRONMENT },
            headers: {
              api_key: ENV.CONTENTSTACK_API_KEY,
              access_token: ENV.CONTENTSTACK_DELIVERY_TOKEN,
              "Content-Type": "application/json",
            },
          }
        );
        setEntries(response.data.entries);
      } catch (error) {
        setError(error.message || "Failed to fetch contact information");
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const contactInfo = useMemo(() => {
    return entries
      .flatMap((entry) => {
        if (!Array.isArray(entry.portfolio_page)) return [];
        return entry.portfolio_page.flatMap((block) => {
          if (!block.contact) return [];
          try {
            return [{
              email: block.contact.email || "",
              phone: block.contact.phone || "",
              address: block.contact.address || "",
              checked: block.contact.checked ?? true,
            }];
          } catch (error) {
            console.error('Error processing contact block:', error);
            return [];
          }
        });
      })
      .filter((info) => info.checked === true)[0] || {
        email: "contact@example.com",
        phone: "+1 234 567 890",
        address: "123 Business Street, City, Country"
      };
  }, [entries]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: null });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      setFormStatus({
        submitting: false,
        success: false,
        error: "Failed to send message. Please try again."
      });
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <section id="contact" className="py-20 bg-gray-100 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fadeInUp">
            Contact Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-6 animate-fadeInUp">
              <div className="bg-white rounded-2xl shadow-xl p-6 transition-transform duration-500 hover:scale-105">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <a href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <a href={`tel:${contactInfo.phone}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                      {contactInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">{contactInfo.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white rounded-2xl shadow-xl p-8 transition-transform duration-500 hover:scale-105">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { id: 'name', type: 'text', label: 'Name', placeholder: 'Your Name' },
                    { id: 'email', type: 'email', label: 'Email', placeholder: 'Your Email' },
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-semibold text-gray-700 mb-1">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        value={formData[field.id]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 hover:scale-[1.02]"
                      />
                    </div>
                  ))}

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Your Message"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 hover:scale-[1.02]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className={`w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold 
                      ${formStatus.submitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'} 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                      transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2`}
                  >
                    {formStatus.submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {formStatus.success && (
                    <div className="text-green-600 text-center animate-fadeIn">
                      Message sent successfully!
                    </div>
                  )}

                  {formStatus.error && (
                    <div className="text-red-600 text-center animate-fadeIn">
                      {formStatus.error}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </>
  );
};

export default Contact;
 