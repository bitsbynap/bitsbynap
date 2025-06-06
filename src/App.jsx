import { SectionProvider } from "./context/SectionContext";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Hero from "./layout/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Portfolio from "./components/sections/Portfolio";
import Contact from "./components/sections/Contact";
import AllClients from "./components/pages/AllClients";
import AboutUs from "./components/pages/AboutUs";
import { useSection } from "./context/SectionContext";
import ServiceDetails from './components/pages/ServiceDetails';
import useContentstack from './hooks/useContentstack';

// Protected Route component for clients page
const ProtectedClientsRoute = () => {
  const { data: entries, isLoading } = useContentstack('portfolio');
  const location = useLocation();

  // Calculate total clients count
  const totalClients = entries?.flatMap((entry) => {
    if (!Array.isArray(entry.portfolio_page)) return [];
    return entry.portfolio_page.flatMap((block) => {
      if (!block.clients) return [];
      const clientsArray = Array.isArray(block.clients) ? block.clients : [block.clients];
      return clientsArray.filter(client => client.image?.url || client.client?.url).length;
    });
  }).reduce((sum, count) => sum + count, 0) || 0;

  if (isLoading) {
    return null; // or a loading spinner
  }

  // If there are 10 or fewer clients, redirect to home
  if (totalClients <= 10) {
    return <Navigate to="/" state={{ fromClients: true }} replace />;
  }

  // If there are more than 10 clients, render the AllClients component
  return <AllClients />;
};

// Wrapper component to handle navigation state
const HomePage = () => {
  const location = useLocation();
  const { setActiveSection } = useSection();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = location.state.scrollTo;
      setActiveSection(section);
      
      // Scroll to the section after a short delay to ensure the DOM is ready
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

      // Clear the state after using it
      window.history.replaceState({}, document.title);
    }
  }, [location, setActiveSection]);

  return (
    <>
      <Hero />
      <div className="relative z-10">
        <div className="h-screen" /> {/* Spacer to account for fixed hero */}
        <main className="relative">
          <About />
          <Services />
          <Portfolio />
          <Contact />
        </main>
      </div>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <SectionProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/clients" element={<ProtectedClientsRoute />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services/:serviceId" element={<ServiceDetails />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </SectionProvider>
    </ThemeProvider>
  );
}

export default App;
