import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { profileConfig } from '../../config/profile';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

export function Footer() {
  const reduceMotion = useReducedMotionPreference();
  return <footer className="site-footer">
    <div className="footer-main wrap">
      <div><p className="footer-kicker">A creative studio for brands in motion</p><motion.h2 initial={reduceMotion ? false : { opacity: 0, transform: 'translate3d(0, 36px, 0)' }} whileInView={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.23, 1, 0.32, 1] }}>Let’s make<br /><span>something matter.</span></motion.h2><Link className="footer-mail" to="/contact">Start a project <ArrowUpRight size={19} /></Link></div>
      <motion.div className="footer-side" initial={reduceMotion ? false : { opacity: 0, transform: 'translate3d(0, 18px, 0)' }} whileInView={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.15 }}><Link to="/work">Work</Link><Link to="/services">Services</Link><Link to="/about">About</Link><a href={`mailto:${profileConfig.contactEmail}`}>{profileConfig.contactEmail}</a></motion.div>
    </div>
    <div className="footer-bottom wrap"><Link className="footer-brand" to="/">BACK<span>SPACE</span></Link><span>Independent by nature. Made with intent.</span><span>© {new Date().getFullYear()} BackSpace</span></div>
  </footer>;
}
