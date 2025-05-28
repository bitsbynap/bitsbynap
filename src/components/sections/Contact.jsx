import emailjs from "emailjs-com";
import { useSection } from "../../context/SectionContext";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import { useState, useMemo } from "react";
import { Mail, Phone, MapPin, Send, ArrowUp } from "lucide-react";
import useContentstack from "../../hooks/useContentstack";

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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

const Contact = () => {
  const { activeSection } = useSection();
  useScrollToSection(activeSection === "contact" ? "contact" : null);
  const { data: entries, isLoading, error } = useContentstack("portfolio");

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: null });

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
            console.error("Error processing contact block:", error);
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
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: null });

    const ownerEmail = "nikhil.gahlaut@startappss.com";

    const templateParamsOwner = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: ownerEmail,
    };

    const templateParamsSender = {
      from_name: formData.name,
      from_email: formData.email,
      to_email: formData.email,
      message: formData.message,
    };

    try {
      await emailjs.send("service_123", "template_123", templateParamsOwner, "user_123");
      await emailjs.send("service_123", "template_123", templateParamsSender, "user_123");

      setFormStatus({ submitting: false, success: true, error: null });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setFormStatus({ submitting: false, success: false, error: error.message || "Failed to send message" });
    }
  };

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

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
                  <a href={`mailto:${contactInfo.email}`} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <a href={`tel:${contactInfo.phone}`} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
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
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 animate-fadeInUp">
            <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-100">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name"
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 px-4 py-3 transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 px-4 py-3 transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Your message here..."
                  rows={4}
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 px-4 py-3 transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus.submitting}
                className={`w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 px-6 rounded-lg font-semibold 
                  ${formStatus.submitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700 dark:hover:bg-indigo-600'} 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg
                  transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mt-8`}
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
                <div className="text-green-600 dark:text-green-400 text-center animate-fadeIn mt-4">
                  Message sent successfully!
                </div>
              )}

              {formStatus.error && (
                <div className="text-red-600 dark:text-red-400 text-center animate-fadeIn mt-4">
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
