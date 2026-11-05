import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

const links = [{ label: 'Work', to: '/work' }, { label: 'Services', to: '/services' }, { label: 'About', to: '/about' }];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotionPreference();
  return <header className="site-header">
    <div className="nav-inner">
      <Link className="brand" to="/" aria-label="BackSpace home" onClick={() => setOpen(false)}>
        <span className="brand-crop"><img src={`${import.meta.env.BASE_URL}assets/images/backspace-logo.png`} alt="" /></span>
      </Link>
      <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        {links.map(link => <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className={({ isActive }) => isActive || (link.to === '/work' && location.pathname === '/cwr-network') ? 'active' : ''}>{({ isActive }) => <>{link.label}{(isActive || (link.to === '/work' && location.pathname === '/cwr-network')) && <motion.span layoutId="nav-active-line" className="nav-active-line" transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.23, 1, 0.32, 1] }} />}</>}</NavLink>)}
        <Link className="mobile-contact" to="/contact" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={17} /></Link>
      </nav>
      <Link className="nav-cta" to="/contact">Start a project <ArrowUpRight size={17} /></Link>
      <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
  </header>;
}
