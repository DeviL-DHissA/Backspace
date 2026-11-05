import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: "video-editing",
    title: "Video Editing",
    discipline: "Motion & Narrative",
    tagline: "Dynamic pacing, cinematic polish, and sub-frame audio precision.",
    description: "Turning raw gaming captures and cinematic sequences into high-retention stories. Using industry-standard DaVinci Resolve and Adobe Premiere Pro, every cut is timed to momentum, music, and emotional beats.",
    tools: ["DaVinci Resolve", "Adobe Premiere Pro", "Audition", "Color Match"],
    capabilities: [
      "Speed ramping and velocity curve editing",
      "Dynamic sound design with layered impact SFX",
      "Cinematic color grading and lighting corrections",
      "Seamless masking, whip-pans, and zoom transitions",
      "High-energy gaming montages & narrative episode cuts"
    ],
    workflow: [
      { step: "01", title: "Ingest & Assembly", desc: "Reviewing footage, selecting top moments, and laying down the primary narrative arc." },
      { step: "02", title: "Pacing & Rhythm", desc: "Trimming dead space, crafting velocity ramps, and syncing cuts with audio stems." },
      { step: "03", title: "Visual Polish", desc: "Applying motion graphics, camera moves, color balancing, and sound design." }
    ]
  },
  {
    id: "thumbnail-design",
    title: "Thumbnail Design",
    discipline: "Visual Psychology & Composition",
    tagline: "High-contrast, eye-grabbing artwork engineered to stand out.",
    description: "In crowded feeds, viewers decide in a fraction of a second. I design thumbnails that build instant curiosity through bold focal points, clean separation of subjects, atmospheric backlighting, and legible typography.",
    tools: ["Photoshop", "Lightroom", "Photo Retouching", "Color Compositing"],
    capabilities: [
      "Multi-subject isolation and edge-clean extractions",
      "Volumetric glow, lighting rim blends, and shadows",
      "Focal vector composition designed for mobile feeds",
      "Expressive gaming character and reaction treatments",
      "High-legibility typography with punchy contrast"
    ],
    workflow: [
      { step: "01", title: "Concept & Focus", desc: "Identifying the single strongest emotional hook or gameplay clash." },
      { step: "02", title: "Composite & Light", desc: "Layering backgrounds, subjects, edge glows, and depth-of-field blur." },
      { step: "03", title: "Mobile Verification", desc: "Testing contrast and readability at miniature scales before final delivery." }
    ]
  },
  {
    id: "minecraft-development",
    title: "Minecraft Server Development",
    discipline: "Systems & Infrastructure",
    tagline: "Lag-free performance, custom configurations, and community-first server systems.",
    description: "Developing and maintaining robust Minecraft server ecosystems. Drawing from my hands-on experience as CWR MC Staff Manager at CWR Network, I configure server cores, balance game mechanics, optimize TPS, and structure staff operations.",
    tools: ["PaperMC", "Spigot", "YAML & JSON Configs", "Staff Protocols", "Server Maintenance"],
    capabilities: [
      "Server core performance tuning and tick optimization (20 TPS)",
      "Permission hierarchies, rank matrices, and group inheritances",
      "Economy balance, shop systems, and gameplay progression tuning",
      "Staff management models, ticket workflows, and rule enforcement",
      "Automated backups, disaster recovery, and Discord logging hooks"
    ],
    workflow: [
      { step: "01", title: "Architecture & Scope", desc: "Defining server goals, player capacity, required plugins, and game loops." },
      { step: "02", title: "Config & Stress-Test", desc: "Tuning entity limits, chunk tick rates, and testing player permissions." },
      { step: "03", title: "Staff & Support Systems", desc: "Structuring moderation guidelines, ticket bots, and maintenance cycles." }
    ]
  }
];
