/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Fields } from './pages/Fields';
import { Subject } from './pages/Subject';
import { Events } from './pages/Events';
import { Team } from './pages/Team';
import { Join } from './pages/Join';
import { Donate } from './pages/Donate';
import { Sponsors } from './pages/Sponsors';

const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    // Custom Cursor
    const handleMouseMove = (e: MouseEvent) => {
      const ring = document.getElementById('cursor-ring');
      const dot = document.getElementById('cursor-dot');
      if (ring && dot) {
        ring.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-nexus-purple/30 selection:text-nexus-purple bg-mesh">
      <div className="noise-overlay"></div>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          {/* Custom Cursor */}
          <div className="hidden lg:block fixed top-0 left-0 w-6 h-6 border border-nexus-purple/50 rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out" id="cursor-ring"></div>
          <div className="hidden lg:block fixed top-0 left-0 w-1.5 h-1.5 bg-nexus-purple rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" id="cursor-dot"></div>

          {/* Scroll Progress Bar */}
          <motion.div 
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-nexus-purple to-nexus-blue z-[60] origin-left"
            style={{ scaleX }}
          />

          <Navbar />
          <main className="min-h-screen">
            <AnimatePresence mode="wait">
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/fields" element={<Fields />} />
                <Route path="/fields/:subjectId" element={<Subject />} />
                <Route path="/events" element={<Events />} />
                <Route path="/team" element={<Team />} />
                <Route path="/join" element={<Join />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/sponsors" element={<Sponsors />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}
