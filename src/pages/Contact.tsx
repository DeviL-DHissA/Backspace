import { useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { profileConfig } from '../config/profile';
import { servicesData } from '../data/services';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';
import { MotionPoster } from '../components/motion/MotionPoster';

const ease = [0.23, 1, 0.32, 1] as const;

export function Contact() {
  const [sent, setSent] = useState(false);
  const reduceMotion = useReducedMotionPreference();
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`[BackSpace] ${String(form.get('service'))} enquiry from ${String(form.get('name'))}`);
    const body = encodeURIComponent(`Name: ${String(form.get('name'))}\nEmail: ${String(form.get('email'))}\nService: ${String(form.get('service'))}\n\n${String(form.get('message'))}`);
    window.location.href = `mailto:${profileConfig.contactEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  };
  return <section className="page-shell wrap contact-page"><MotionPoster kind="contact" /><div className="page-head"><div><p className="eyebrow">Start a conversation</p><h1>Let’s make<br /><em>something matter.</em></h1></div><p className="page-lede">Have a video, design, or Minecraft project in mind? Tell us what you’re working on and we’ll take it from there.</p></div>
    <div className="contact-layout"><motion.div className="contact-direct" initial={reduceMotion ? false : { opacity: 0, transform: 'translate3d(-24px, 0, 0)' }} animate={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }} transition={{ duration: reduceMotion ? 0 : 0.65, ease }}>
      <div className="contact-signal" aria-label="BackSpace is available for selected projects"><span className="signal-ring signal-ring-one"/><span className="signal-ring signal-ring-two"/><span className="signal-core"/><b>OPEN<br />CHANNEL</b><i>BACKSPACE / 01</i><small>AVAILABLE FOR SELECT PROJECTS</small></div>
      <p className="eyebrow">Or email us directly</p><a className="direct-email" href={`mailto:${profileConfig.contactEmail}`}>{profileConfig.contactEmail}<ArrowUpRight size={19} /></a><p className="contact-note">We’re open to creative commissions and technical collaborations.</p><div className="contact-social"><a href="https://www.youtube.com/@devil_dhissa" target="_blank" rel="noreferrer">YouTube <ArrowUpRight size={15} /></a><a href="https://guns.lol/devil_dhissa" target="_blank" rel="noreferrer">guns.lol <ArrowUpRight size={15} /></a></div>
    </motion.div>
    <motion.form className="contact-form" onSubmit={submit} initial={reduceMotion ? false : { opacity: 0, transform: 'translate3d(24px, 0, 0)' }} animate={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }} transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.08, ease }}>
      <label>Your name<input name="name" autoComplete="name" required placeholder="Name" /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><label>What do you need?<select name="service" defaultValue=""><option value="" disabled>Select a service</option>{servicesData.map(service => <option key={service.id}>{service.title}</option>)}</select></label><label>Tell us about the project<textarea name="message" required rows={4} placeholder="A few details about your idea…" /></label><button className="button button-dark" type="submit">{sent ? 'Open your email app' : 'Send enquiry'} <ArrowUpRight size={18} /></button><p className="form-note">This opens your email app with the enquiry filled in.</p>
    </motion.form></div>
  </section>;
}
