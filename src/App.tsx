import { useLayoutEffect } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { CWRNetwork } from './pages/CWRNetwork';
import { Contact } from './pages/Contact';
import { useReducedMotionPreference } from './hooks/useReducedMotionPreference';

function SiteRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotionPreference();
  useLayoutEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [location.pathname]);
  return <AnimatePresence mode="wait" initial={false}><motion.div className="route-scene" key={location.pathname} initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }} transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.23, 1, 0.32, 1] }}><Routes location={location}>
    <Route path="/" element={<Home />} />
    <Route path="/work" element={<Work />} />
    <Route path="/services" element={<Services />} />
    <Route path="/about" element={<About />} />
    <Route path="/cwr-network" element={<CWRNetwork />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></motion.div></AnimatePresence>;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

export default function App() {
  return <HashRouter><ScrollProgress /><Navbar /><main id="main-content"><SiteRoutes /></main><Footer /></HashRouter>;
}
