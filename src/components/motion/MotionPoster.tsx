import { ArrowDown, ArrowUpRight } from 'lucide-react';

type PosterKind = 'work' | 'services' | 'about' | 'cwr' | 'contact';

const posters: Record<PosterKind, { index: string; lineOne: string; lineTwo: string; lineThree: string; image?: string; imageAlt: string; note: string }> = {
  work: { index: '01 / EDIT', lineOne: 'CUT', lineTwo: 'TO', lineThree: 'IMPACT', image: `${import.meta.env.BASE_URL}assets/images/project-motion.jpg`, imageAlt: 'Film reel and cinematic editing imagery', note: 'FIND THE RHYTHM' },
  services: { index: '02 / MAKE', lineOne: 'IDEAS', lineTwo: 'IN', lineThree: 'MOTION', image: `${import.meta.env.BASE_URL}assets/images/project-thumbnail.jpg`, imageAlt: 'Graphic composition with bold cyan and cobalt shapes', note: 'FROM THOUGHT TO FRAME' },
  about: { index: '03 / SPACE', lineOne: 'ROOM', lineTwo: 'TO', lineThree: 'MAKE', image: `${import.meta.env.BASE_URL}assets/images/backspace-hero.jpg`, imageAlt: 'Architectural creative installation in the BackSpace palette', note: 'A STUDIO WITH RANGE' },
  cwr: { index: '04 / PLAY', lineOne: 'BUILT', lineTwo: 'FOR', lineThree: 'PLAY', image: `${import.meta.env.BASE_URL}assets/images/cwr_minecraft_bg.jpg`, imageAlt: 'CWR Minecraft world beneath a vivid sky', note: 'COMMUNITY IS THE POINT' },
  contact: { index: '05 / OPEN', lineOne: 'OPEN', lineTwo: 'A', lineThree: 'CHANNEL', imageAlt: 'Abstract light signal graphic', note: 'LET’S MAKE SOMETHING' }
};

export function MotionPoster({ kind }: { kind: PosterKind }) {
  const poster = posters[kind];
  return <section className={`motion-poster poster-${kind}`} aria-label={`${poster.lineOne} ${poster.lineTwo} ${poster.lineThree}`}>
    <div className="poster-grain" aria-hidden="true" />
    <div className="poster-copy"><p className="poster-index">BACKSPACE <span>{poster.index}</span></p><h2 aria-hidden="true"><span>{poster.lineOne}</span><span>{poster.lineTwo}</span><span>{poster.lineThree}</span></h2><p className="poster-note">{poster.note}<ArrowUpRight size={15} /></p></div>
    <div className="poster-art" aria-hidden="true">{poster.image && <img src={poster.image} alt={poster.imageAlt} />}</div>
    <div className="poster-ring poster-ring-a" aria-hidden="true" /><div className="poster-ring poster-ring-b" aria-hidden="true" />
    <div className="poster-bottom"><span>VISUALS WITH INTENT</span><span>SCROLL TO EXPLORE <ArrowDown size={15} /></span><span>COLOMBO / WORLDWIDE</span></div>
  </section>;
}
