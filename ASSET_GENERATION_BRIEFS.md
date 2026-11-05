# DHISSA Portfolio — Asset Generation Briefs
## Production Media Specifications & Prompts

This document provides exact technical specifications, camera directions, lighting parameters, and prompt formulas for generating production video reels, thumbnail art, and Minecraft 3D renders for Dhimash Thathsara (**DHISSA**).

The website currently uses high-performance SVG and Three.js WebGL procedural fallbacks so that it renders completely and smoothly without waiting for external assets. Once generated, save the files to `/public/assets/...` and reference them directly in `src/data/projects.ts` or hero media.

---

### 1. HERO SHOWREEL VIDEO (`hero_cinematic_reel.mp4`)

- **Role**: Desktop hero background video or modal showreel.
- **Duration**: 8–12 seconds seamless loop.
- **Resolution**: 1920 × 1080 (or 2560 × 1440), 24.00 or 60.00 fps.
- **Audio**: Muted background loop (or synchronized bass stem for modal viewer).
- **Format**: H.264 / MP4 with WebM fallback.
- **Prompt Specification**:
  ```text
  Cinematic wide-angle dark studio capture of a high-speed motion design sequence. Fluid neon lime green (#C8FF3D) and cool slate geometric shards slicing through deep graphite darkness. Dynamic camera movement panning along an abstract glowing timeline with sub-frame timecode marks and volumetric lens reflections. High contrast, film grain texture, zero text, zero watermarks, 8k editorial render.
  ```
- **Poster Image**: `hero_cinematic_poster.jpg` (Frame at 00:03:12).

---

### 2. VIDEO EDITING SHOWCASE (`video_montage_preview.jpg` / `.mp4`)

- **Role**: Preview media for the "Cinematic Velocity & Rhythm Montage" project.
- **Dimensions**: 16:9 ratio (1920 × 1080).
- **Prompt Specification**:
  ```text
  Cinematic still of a high-octane gaming character moving through an electric smoke arena, stylized speed motion blur streaks, rim light glowing in electric lime and cyan, DaVinci Resolve color grading aesthetic with deep blacks and sharp highlight rolloff, dramatic anamorphic depth of field.
  ```

---

### 3. THUMBNAIL DESIGN SUITE (`thumbnail_contrast_suite.jpg`)

- **Role**: Showcase media for "High-Contrast Storytelling Thumbnail".
- **Dimensions**: 16:9 ratio (1280 × 720).
- **Prompt Specification**:
  ```text
  Commercial YouTube gaming thumbnail composition: two expressive gaming avatars in a dynamic diagonal clash, dramatic warm versus cold dual lighting, volumetric rim light halos around hair and shoulders, 3D floating particle dust, bold focal separation against a dark atmospheric arena background, high CTR visual hierarchy.
  ```

---

### 4. MINECRAFT SERVER NETWORK RENDER (`minecraft_server_render.jpg`)

- **Role**: Visual asset for CWR Network and Minecraft Server Core projects.
- **Dimensions**: 16:9 ratio (1920 × 1080).
- **Prompt Specification**:
  ```text
  Art-directed cinematic 3D isometric render of a monumental Minecraft medieval fortress hub at twilight, illuminated by floating cyan soul-fire lanterns, glowing redstone conduit wiring running across dark stone brick pathways, volumetric fog, realistic ray-traced shadows and shaders, crisp architectural lines without cartoonish distortion.
  ```

---

### 5. IMPLEMENTATION INSTRUCTIONS

When assets are ready:
1. Place videos in `public/assets/videos/`.
2. Place images in `public/assets/images/`.
3. Update `src/data/projects.ts` with local asset paths (e.g., `previewUrl: '/assets/images/thumbnail_contrast_suite.jpg'`).
4. Keep `isConcept: false` only for genuine completed client projects verified by DHISSA.

### Current BackSpace hero motion background

`public/assets/videos/backspace-geometric-loop.mp4` is a decorative 10-second loop by Sri Diya, downloaded from [Pexels video 16381076](https://www.pexels.com/video/abstract-geometry-background-16381076/). Pexels lists it as free to use; see the [Pexels license](https://www.pexels.com/license/). It is background motion only and does not represent a BackSpace client project. The home page uses the existing `project-motion.jpg` image as its poster and reduced-motion fallback.

Replace the local MP4 with BackSpace's own showreel when available; keep it muted, compressed, and loopable for the hero.
