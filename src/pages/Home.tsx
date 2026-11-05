import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { servicesData } from '../data/services';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

const ease = [0.23, 1, 0.32, 1] as const;

export function Home() {
  const featured = projectsData.slice(0, 3);
  const reduceMotion = useReducedMotionPreference();
  return <>
    <section className="home-hero home-hero-cinematic">
      <div className="home-reel" aria-hidden="true">
        {reduceMotion ? <img src={`${import.meta.env.BASE_URL}assets/images/project-motion.jpg`} alt="" /> : <video autoPlay muted loop playsInline preload="metadata" poster={`${import.meta.env.BASE_URL}assets/images/project-motion.jpg`}><source src={`${import.meta.env.BASE_URL}assets/videos/backspace-geometric-loop.mp4`} type="video/mp4" /></video>}
      </div>
      <div className="home-hero-grain" aria-hidden="true" />
      <motion.div className="hero-copy home-hero-copy" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}>
        <p className="hero-kicker"><span className="status-dot" /> Independent creative studio <span>Colombo / Worldwide</span></p>
        <h1 aria-label="Make space for what moves you"><span>MAKE</span><span>SPACE<span className="hero-accent">.</span></span><span className="hero-outline">FOR WHAT MOVES YOU</span></h1>
        <p>BackSpace makes visual stories, digital worlds, and ideas people remember.</p>
        <Link className="button button-cyan" to="/work">See the work <ArrowUpRight size={18} /></Link>
      </motion.div>
      <div className="home-image-stack" aria-label="BackSpace work preview">
        <motion.figure className="home-image home-image-main" initial={reduceMotion ? false : { opacity: 0, transform: 'translate3d(8%, 0, 0) rotate(4deg) scale(.92)' }} animate={{ opacity: 1, transform: 'translate3d(0, 0, 0) rotate(2deg) scale(1)' }} transition={{ duration: 1.1, delay: .25, ease }}><img src={`${import.meta.env.BASE_URL}assets/images/backspace-hero.jpg`} alt="Geometric installation in BackSpace colors" /><figcaption>01 / ROOM TO THINK</figcaption></motion.figure>
        <motion.figure className="home-image home-image-cut" initial={reduceMotion ? false : { opacity: 0, transform: 'translate3d(-12%, 12%, 0) rotate(-9deg) scale(.88)' }} animate={{ opacity: 1, transform: 'translate3d(0, 0, 0) rotate(-7deg) scale(1)' }} transition={{ duration: .9, delay: .5, ease }}><img src={`${import.meta.env.BASE_URL}assets/images/project-thumbnail.jpg`} alt="Layered graphic design study" /><figcaption>02 / FRAME BY FRAME</figcaption></motion.figure>
        <motion.figure className="home-image home-image-film" initial={reduceMotion ? false : { opacity: 0, transform: 'translate3d(12%, -12%, 0) rotate(7deg) scale(.86)' }} animate={{ opacity: 1, transform: 'translate3d(0, 0, 0) rotate(5deg) scale(1)' }} transition={{ duration: .9, delay: .7, ease }}><img src={`${import.meta.env.BASE_URL}assets/images/cwr_minecraft_bg.jpg`} alt="CWR Minecraft world at sunset" /><figcaption>03 / BUILD A WORLD</figcaption></motion.figure>
        <span className="image-stack-index">BS—001<br />SELECTED FRAMES</span>
      </div>
      <a className="scroll-cue home-scroll-cue" href="#selected" onClick={(event) => { event.preventDefault(); document.getElementById('selected')?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' }); }}><span>Scroll to explore</span><ArrowDown size={16} /></a>
    </section>
    <div className="motion-marquee" aria-label="Ideas need space. Make something matter."><div className="motion-marquee-track"><span>IDEAS NEED SPACE</span><b>✳</b><span>MAKE SOMETHING MATTER</span><b>✳</b><span>IDEAS NEED SPACE</span><b>✳</b><span>MAKE SOMETHING MATTER</span><b>✳</b></div></div>
    <section id="selected" className="selected-section section-dark"><div className="wrap"><motion.div className="section-heading" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, ease }}><div><p className="eyebrow">A little of what we do</p><h2>Work with<br /><span>something to say.</span></h2></div><Link className="text-link" to="/work">All projects <ArrowUpRight size={17} /></Link></motion.div><div className="feature-projects">{featured.map((project, i) => <motion.div className={`feature-project feature-${i + 1}`} key={project.id} initial={reduceMotion ? false : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay: i * 0.12, ease }}><Link to="/work"><div className={`project-art art-${project.previewType} art-index-${i}`}><img className="project-image" src={project.category === 'video' ? `${import.meta.env.BASE_URL}assets/images/project-motion.jpg` : project.category === 'thumbnail' ? `${import.meta.env.BASE_URL}assets/images/project-thumbnail.jpg` : `${import.meta.env.BASE_URL}assets/images/cwr_minecraft_bg.jpg`} alt="" loading="lazy" /><span className="art-label">{project.categoryLabel}</span><strong>{(i === 0 ? ['FEEL','THE','FRAME'] : i === 1 ? ['MAKE','THEM','LOOK'] : ['BUILD','A WORLD']).map(line => <span key={line}>{line}</span>)}</strong><span className="art-number">0{i + 1}</span><span className="card-arrow"><ArrowUpRight size={21} /></span></div><div className="feature-caption"><span>{project.title}</span><ArrowUpRight size={18} /></div></Link></motion.div>)}</div></div></section>
    <section className="home-services wrap"><div className="services-intro"><p className="eyebrow">The studio</p><h2>One studio.<br /><span>Many ways in.</span></h2><p>From the first cut to the whole world around it, we bring creative and technical work under one roof.</p><Link className="text-link" to="/services">Explore services <ArrowUpRight size={17} /></Link></div><div className="service-list">{servicesData.map((service, i) => <Link className="service-row" to="/services" key={service.id}><span className="row-index">0{i + 1}</span><span className="row-title">{service.title}</span><span className="row-desc">{service.tagline}</span><ArrowUpRight size={18} /></Link>)}</div></section>
    <section className="home-about"><div className="wrap home-about-inner"><div className="about-mark">BS<span>↗</span></div><div><p className="eyebrow">About BackSpace</p><h2>Space to think.<br /><em>Freedom to make.</em></h2><p>BackSpace brings visual storytelling, creator-first design, and Minecraft systems together, built on the hands-on experience behind the work.</p><Link className="button button-dark" to="/about">Meet the studio <ArrowUpRight size={18} /></Link></div></div></section>
  </>;
}
