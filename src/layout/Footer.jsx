const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-dark-card text-white py-8 animate-fadeIn transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold transform transition-transform duration-300 hover:scale-105">Company Name</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-indigo-400 transform transition-transform duration-300 hover:scale-110">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-indigo-400 transform transition-transform duration-300 hover:scale-110">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-indigo-400 transform transition-transform duration-300 hover:scale-110">Contact</a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 