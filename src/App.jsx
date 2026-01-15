import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import Hero from "./components/Hero/Hero";
import Work from "./components/Work/Work";
import Project from "./components/Project/Project";
import Skills from "./components/Skills/Skills";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

import "./App.css";

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};



const AnimatedRoutes = () => {
  const location = useLocation();

  const isScrollablePage = location.pathname === "/skills" || location.pathname === "/about" || location.pathname === "/contact" || location.pathname.startsWith("/work");

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 0.8 }}
      transition={pageTransition}
      style={{ height: "100vh", overflow: isScrollablePage ? "auto" : "hidden", touchAction: location.pathname === '/' ? 'none' : 'auto' }}
    >
      <Routes location={location}>
        <Route path="/" element={<Hero />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:id" element={<Project />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </motion.div>
  );
};

function App() {
  return (
    
      <AnimatedRoutes />
    
  );
}

export default App;
