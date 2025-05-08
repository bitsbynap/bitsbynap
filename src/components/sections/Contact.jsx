import { useSection } from '../../context/SectionContext';
import { useScrollToSection } from '../../hooks/useScrollToSection';

const Contact = () => {
  const { activeSection } = useSection();
  useScrollToSection(activeSection === 'contact' ? 'contact' : null);

  return (
    <section id="contact" className="py-16 bg-gray-50 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fadeInUp">
          Contact Us
        </h2>
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 transition-transform duration-500 hover:scale-105 overflow-hidden">
          <form className="space-y-6">
            {[
              { id: 'name', type: 'text', label: 'Name', placeholder: 'Your Name', delay: '0.2s' },
              { id: 'email', type: 'email', label: 'Email', placeholder: 'Your Email', delay: '0.3s' },
            ].map((field) => (
              <div
                key={field.id}
                className="animate-fadeInUp"
                style={{ animationDelay: field.delay }}
              >
                <label htmlFor={field.id} className="block text-sm font-semibold text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-300 hover:scale-[1.02]"
                />
              </div>
            ))}

            <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Your Message"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-300 hover:scale-[1.02]"
              />
            </div>

            <div className="animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform duration-300 hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
 