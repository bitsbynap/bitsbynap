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
import { useSection } from "./context/SectionContext";
import ServiceDetails from './components/pages/ServiceDetails';

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
              <Route path="/clients" element={<AllClients />} />
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
