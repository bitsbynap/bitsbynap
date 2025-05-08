import { SectionProvider } from "./context/SectionContext";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Hero from "./layout/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Portfolio from "./components/sections/Portfolio";
import Contact from "./components/sections/Contact";

function App() {
  return (
    <SectionProvider>
      <div className="min-h-screen bg-gray-50">
        <main className="pt-16">
          <Header />
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </div>
    </SectionProvider>
  );
}

export default App;
