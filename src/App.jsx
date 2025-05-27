import { SectionProvider } from "./context/SectionContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Hero from "./layout/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Portfolio from "./components/sections/Portfolio";
import Contact from "./components/sections/Contact";
import AllClients from "./components/pages/AllClients";

function App() {
  return (
    <Router>
      <SectionProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={
              <main className="pt-16">
                <Hero />
                <About />
                <Services />
                <Portfolio />
                <Contact />
              </main>
            } />
            <Route path="/clients" element={<AllClients />} />
          </Routes>
          <Footer />
        </div>
      </SectionProvider>
    </Router>
  );
}

export default App;
