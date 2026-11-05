import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: "cinematic-gaming-montage",
    title: "Cinematic Velocity & Rhythm Montage",
    category: "video",
    categoryLabel: "Video Editing",
    summary: "Precision-synced gameplay sequence featuring dynamic speed ramps, sound-sculpted impact points, and custom color grading.",
    description: "An intensive study in pacing and visual rhythm. Built in DaVinci Resolve with layered audio staging, micro-shakes, masking transitions, and punchy motion blur to amplify action without visual fatigue.",
    tools: ["DaVinci Resolve", "Adobe Premiere Pro", "Audition"],
    role: "Editor, Sound Designer & Colorist",
    highlights: [
      "Sub-frame beat matching to custom audio stem tracks",
      "Directional motion-blur passes & whip-pan transitions",
      "Controlled shadow & highlight isolation for high clarity",
      "Layered SFX: impact sweeps, whooshes & ambient risers"
    ],
    isConcept: true,
    accentColor: "#8B5CF6",
    previewType: "video"
  },
  {
    id: "high-ctr-gaming-thumbnail",
    title: "High-Contrast Storytelling Thumbnail",
    category: "thumbnail",
    categoryLabel: "Thumbnail Design",
    summary: "High-impact visual composition built to command attention in crowded YouTube feeds with crisp subject separation and depth.",
    description: "Designed around eye-tracking focal patterns. Combines multi-layer character masking, ambient backlight rimming, expressive foreground elements, and high-legibility bold typography that reads cleanly on mobile screens.",
    tools: ["Photo Editing", "Photoshop", "Lightroom"],
    role: "Thumbnail Designer & Retoucher",
    highlights: [
      "Custom rim lighting and edge-bleed correction",
      "Dynamic 3D depth layering with atmospheric particles",
      "Mobile-scale legibility testing across 120px viewports",
      "High color contrast ratio between subject and background"
    ],
    isConcept: true,
    accentColor: "#E879F9",
    previewType: "image"
  },
  {
    id: "minecraft-server-core",
    title: "Modular Server Engine & Economy Core",
    category: "minecraft",
    categoryLabel: "Minecraft Development",
    summary: "Scalable Minecraft server framework engineered for low-tick lag, balanced multi-tiered economies, and customized gameplay loops.",
    description: "Technical configuration and development of an optimized paper-based Minecraft server architecture. Implements custom permission ranks, asynchronous database backups, anti-exploit rule enforcement, and real-time TPS monitoring.",
    tools: ["PaperMC", "Plugin Development", "YAML Configs", "Server Management"],
    role: "Lead Systems Architect & Developer",
    highlights: [
      "Asynchronous data persistence reducing world save hiccups",
      "Tiered permission matrices for staff and player hierarchies",
      "Entity cap optimization delivering consistent 20.0 TPS under load",
      "Integrated Discord webhook logging for security events"
    ],
    isConcept: true,
    accentColor: "#34D399",
    previewType: "code"
  },
  {
    id: "gameplay-narrative-cutdown",
    title: "Narrative-Driven Gaming Story Cut",
    category: "video",
    categoryLabel: "Video Editing",
    summary: "Transforming 4-hour raw session recordings into a tight, comedic 12-minute storyline with kinetic typography and audio cues.",
    description: "Editorial storytelling that removes dead air while retaining organic character banter. Utilizes subtle zooms, animated zoom-ins on player reactions, and custom subtitle animations that emphasize key comedic beats.",
    tools: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve"],
    role: "Lead Video Editor",
    highlights: [
      "Condensation ratio: 240 mins raw footage to 12.5 mins narrative",
      "Dynamic kinetic subtitle tracks styled to individual speakers",
      "Color grading matched across diverse in-game lighting conditions",
      "L-cuts and J-cuts for fluid conversational pacing"
    ],
    isConcept: true,
    accentColor: "#A78BFA",
    previewType: "video"
  },
  {
    id: "character-depth-thumbnail-suite",
    title: "Hero Subject & Lighting Vignette Suite",
    category: "thumbnail",
    categoryLabel: "Thumbnail Design",
    summary: "Dual-character visual faceoff thumbnail emphasizing tension, glowing volumetric lighting, and directional gaze vectors.",
    description: "A showcase in thumbnail psychology: directing the viewer's eye along strong diagonal vectors toward the focal clash point. Features hand-painted highlights, realistic glow diffusion, and crisp silhouette separation.",
    tools: ["Photo Editing", "Color Grading", "Compositing"],
    role: "Visual Designer",
    highlights: [
      "Diagonal contrast lines separating warm and cool lighting tones",
      "Volumetric fog and ambient dust textures creating natural depth",
      "Expressive facial retouching tailored for thumbnail display",
      "Zero clutter approach focusing exclusively on two core elements"
    ],
    isConcept: true,
    accentColor: "#F43F5E",
    previewType: "image"
  },
  {
    id: "cwr-staff-pipeline",
    title: "Staff Management & Community Protocol Suite",
    category: "minecraft",
    categoryLabel: "Minecraft Development",
    summary: "Operational workflows, dispute resolution procedures, and staff coordination models developed for CWR Network.",
    description: "Operational framework developed as CWR MC Staff Manager for CWR Network. Includes structured onboarding guides for trial moderators, automated ticket escalation flows, player support benchmarks, and emergency incident drills.",
    tools: ["Staff Management", "Discord Bot Integration", "Community Support", "Documentation"],
    role: "CWR MC Staff Manager",
    highlights: [
      "Standardized multi-tier ticket triage system",
      "Clear escalation pathways for griefing, exploits, and rank disputes",
      "Weekly staff sync outlines and activity evaluation metrics",
      "Player-facing support documentation reducing repeated inquiries"
    ],
    isConcept: true,
    accentColor: "#34D399",
    previewType: "code"
  }
];
