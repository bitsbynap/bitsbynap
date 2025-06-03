import emailjs from "emailjs-com"
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

    const ownerEmail = "nikhil.gahlaut@startappss.com";  // Replace  your email address

    const templateParamsOwner = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: ownerEmail,  // Add the recipient email here
    };

    const templateParamsSender = {
      from_name: formData.name,
      from_email: formData.email,
      to_email: formData.email, // This is required by EmailJS to send the email
      message: formData.message,
    };


    try {
      // Send email to owner (website owner)
      await emailjs.send(
        'service_gew3s3l',       // Replace  service ID
        'template_9q6j2pa',     // Replace the owner template ID
        templateParamsOwner,
        'k_RwrE_XXrYqZru-R'        // Replace your public key
      );

      // Send confirmation email to sender (person filling out the form)
      await emailjs.send(
        'service_gew3s3l',       // Replace  your service ID
        'template_5g8kwjx',    // Replace  the sender template ID
        templateParamsSender,
        'k_RwrE_XXrYqZru-R'        // Replace  your public key
      );

      setFormStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, success: false }));
      }, 3000);

    } catch (error) {
      console.error("EmailJS error:", error);
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
    <section id="contact" className="py-20 bg-gray-50 dark:bg-dark-bg animate-fadeIn transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100 animate-fadeInUp">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6 animate-fadeInUp">
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 transition-transform duration-500 hover:scale-105">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-gray-600 dark:text-gray-300">{contactInfo.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 animate-fadeInUp">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full bg-transparent border-b-2 border-gray-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white autofill:!bg-transparent autofill:!text-gray-900 dark:autofill:!text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full bg-transparent border-b-2 border-gray-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white autofill:!bg-transparent autofill:!text-gray-900 dark:autofill:!text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="mt-1 block w-full bg-transparent border-b-2 border-gray-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white autofill:!bg-transparent autofill:!text-gray-900 dark:autofill:!text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus.submitting}
                className={`w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 px-6 rounded-md font-semibold 
        ${formStatus.submitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700 dark:hover:bg-indigo-600'} 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg
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
                <div className="text-green-600 dark:text-green-400 text-center animate-fadeIn">
                  Message sent successfully!
                </div>
              )}

              {formStatus.error && (
                <div className="text-red-600 dark:text-red-400 text-center animate-fadeIn">
                  {formStatus.error}
                </div>
              )}
            </form>
          </div>
        </div>

      </div>
      <ScrollToTop />
    </section>
  );
};

export default Contact;

