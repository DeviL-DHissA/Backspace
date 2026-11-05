import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import type { ProjectCategory } from '../types';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';
import { MotionPoster } from '../components/motion/MotionPoster';

const filters: { label: string; value: ProjectCategory | 'all' }[] = [{ label: 'All work', value: 'all' }, { label: 'Video', value: 'video' }, { label: 'Thumbnails', value: 'thumbnail' }, { label: 'Minecraft', value: 'minecraft' }];

export function Work() {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  const visible = useMemo(() => projectsData.filter(project => filter === 'all' || project.category === filter), [filter]);
  const reduceMotion = useReducedMotionPreference();
  return <section className="page-shell work-page"><MotionPoster kind="work" /><div className="wrap"><div className="page-head"><div><p className="eyebrow">The portfolio</p><h1>Selected<br /><em>work.</em></h1></div><p className="page-lede">A mix of creative experiments, client-style concepts, and hands-on systems work across video, visual design, and Minecraft.</p></div>
    <div className="work-toolbar" aria-label="Filter projects">{filters.map(item => <button key={item.value} className={filter === item.value ? 'filter-active' : ''} onClick={() => setFilter(item.value)} aria-pressed={filter === item.value}>{item.label}</button>)}</div>
    <motion.div layout className="work-grid"><AnimatePresence mode="popLayout">{visible.map((project, i) => <motion.article layout key={project.id} className={`work-card work-card-${i % 3}`} initial={reduceMotion ? false : { opacity: 0, transform: 'translate3d(0, 36px, 0) scale(.97)' }} animate={{ opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'translate3d(0, -18px, 0) scale(.98)' }} transition={{ duration: reduceMotion ? 0 : 0.55, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}><div className={`project-art art-${project.previewType} art-index-${i % 3}`}><img className="project-image" src={project.category === 'video' ? '/assets/images/project-motion.jpg' : project.category === 'thumbnail' ? '/assets/images/project-thumbnail.jpg' : '/assets/images/cwr_minecraft_bg.jpg'} alt="" loading="lazy" /><span className="art-label">{project.categoryLabel} | Concept</span><strong>{(project.previewType === 'video' ? ['CUT','WITH','FEELING'] : project.previewType === 'image' ? ['STOP','THE','SCROLL'] : ['A WORLD','THAT','WORKS']).map(line => <span key={line}>{line}</span>)}</strong><span className="art-number">0{i + 1}</span></div><div className="work-card-copy"><p>{project.categoryLabel}</p><h2>{project.title}</h2><p>{project.summary}</p><details><summary>Project details <ArrowUpRight size={15} /></summary><div className="project-details"><p>{project.description}</p><p><b>Role:</b> {project.role}</p><div className="tag-list">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div><ul>{project.highlights.map(item => <li key={item}>{item}</li>)}</ul></div></details></div></motion.article>)}</AnimatePresence></motion.div>
    <div className="work-end"><p>Have a project in mind?</p><Link className="button button-cyan" to="/contact">Let's talk <ArrowUpRight size={18} /></Link></div>
  </div></section>;
}
