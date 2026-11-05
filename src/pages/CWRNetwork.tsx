import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cwrNetworkConfig } from '../config/cwrLinks';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';
import { MotionPoster } from '../components/motion/MotionPoster';

const ease = [0.23, 1, 0.32, 1] as const;

export function CWRNetwork() {
  const reduceMotion = useReducedMotionPreference();
  return <section className="page-shell wrap cwr-page"><MotionPoster kind="cwr" />
    <Link className="back-link" to="/work">← Back to work</Link>
    <div className="page-head"><div><p className="eyebrow">Selected experience · CWR Network</p><h1>Built for<br /><em>community.</em></h1></div><p className="page-lede">BackSpace brings forward Dhimash’s hands-on work as CWR MC Staff Manager—where player support, staff operations, and server systems meet.</p></div>
    <div className="cwr-feature"><motion.div className="cwr-block" initial={reduceMotion ? false : { opacity: 0, transform: 'perspective(900px) rotateY(-12deg) scale(.92)' }} whileInView={{ opacity: 1, transform: 'perspective(900px) rotateY(0deg) scale(1)' }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.9, ease }}><img className="cwr-photo" src={`${import.meta.env.BASE_URL}assets/images/cwr_minecraft_bg.jpg`} alt="" /><span>CWR</span><b>NETWORK</b><i>MC STAFF TEAM</i></motion.div><motion.div initial={reduceMotion ? false : { opacity: 0, transform: 'translate3d(35px, 0, 0)' }} whileInView={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.12, ease }}><p className="eyebrow">The role</p><h2>{cwrNetworkConfig.dhissaRole}</h2><p>Supporting the people and systems behind a busy Minecraft community. The work connects day-to-day operations with practical server development.</p><Link className="text-link" to="/contact">Discuss a similar project <ArrowUpRight size={17} /></Link></motion.div></div>
    <div className="cwr-responsibilities"><p className="eyebrow">Areas of responsibility</p>{cwrNetworkConfig.departments.map((item, i) => <motion.div className="responsibility-row" key={item} initial={reduceMotion ? false : { opacity: 0, transform: 'translate3d(-26px, 0, 0)' }} whileInView={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : i * 0.08, ease }}><b>0{i + 1}</b><span>{item}</span><ArrowUpRight size={17} /></motion.div>)}</div>
    <div className="cwr-links"><p className="eyebrow">CWR Network</p>{cwrNetworkConfig.links.map((item, i) => <motion.a key={item.platform} href={item.url ?? '#'} target="_blank" rel="noreferrer" initial={reduceMotion ? false : { opacity: 0, transform: 'translate3d(0, 20px, 0)' }} whileInView={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : i * 0.08 }}><span>0{i + 1} / {item.platform}</span><b>{item.label}</b><ArrowUpRight size={17} /></motion.a>)}</div>
  </section>;
}
