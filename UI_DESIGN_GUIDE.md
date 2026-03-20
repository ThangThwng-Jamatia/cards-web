# 3D Interactive Motion UI — Design Guide

A reference for building cinematic, 3D-interactive, motion-heavy websites. Not a copy-paste — a system for understanding *how* to build this category of UI design.

---

## Core Philosophy

The illusion of depth comes from **layered motion at different speeds**, not actual 3D CSS. The premium feel comes from **restraint** — dark backgrounds, minimal color palette (1 accent), slow organic animations, and micro-interactions that feel physical.

---

## The Prompts

When working with an AI to build these designs, be specific about the motion model. Use prompts like:

> "Build a hero section with three text layers that move at different parallax speeds on mousemove using GSAP. The text should have a per-character flip-up entrance animation with stagger. Behind the text, render a Three.js particle field and wireframe geometry that slowly rotates."

> "Create a card component that tilts toward the cursor using CSS perspective transform. Calculate rotateX and rotateY from mouse position relative to card bounds. Add a translateZ lift on hover and a radial gradient glow blob at the top-right corner that simulates a light source."

> "Build an animated background using Framer Motion. Use 5 large blurred divs with radial-gradient fills. Animate each one with different x/y/scale/opacity keyframes on infinite loops with mirror repeat. Add mouse parallax to the whole container using useMotionValue and useTransform."

> "Implement a custom cursor with two elements: a dot that snaps to mouse position instantly and a ring that lerps behind it using a requestAnimationFrame loop with a 0.12 lerp factor. On hover of interactive elements, scale the dot to 0 and expand the ring."

> "Create a loading screen that counts from 0 to 100 using a GSAP timeline animating a single object's numeric value. Display the value as a 2-digit padded string and drive a progress bar's scaleX from the same value. Fade out and unmount when complete."

---

## The Components

### 1. Depth Parallax Text

**Logic:** 3+ text layers, each with its own `ref`. On `mousemove`, call `gsap.to(ref, { x, y })` with different multipliers per layer. Opposite directions and different speeds = depth.

```tsx
// Far layer — moves opposite, slow
gsap.to(line1Ref.current, { x: mouseX * -32, y: mouseY * -20, duration: 1.5, ease: 'power2.out' });

// Close layer — moves with mouse, fast
gsap.to(line2Ref.current, { x: mouseX * 40, y: mouseY * 25, duration: 1.0, ease: 'power2.out' });

// Mid layer — slight opposite
gsap.to(line3Ref.current, { x: mouseX * -16, y: mouseY * -10, duration: 1.8, ease: 'power2.out' });
```

Where `mouseX = e.clientX / window.innerWidth - 0.5` (range: -0.5 to 0.5).

**Per-character entrance:**
```tsx
text.split('').map((char, i) => <span key={i} className="hero-char">{char}</span>)

// GSAP:
gsap.fromTo('.hero-char',
  { opacity: 0, y: 70, rotateX: -90, transformPerspective: 700 },
  { opacity: 1, y: 0, rotateX: 0, stagger: 0.038, duration: 0.85, ease: 'power4.out' }
);
```

---

### 2. CSS Perspective Tilt Card

**Logic:** On `mousemove`, calculate where the mouse is relative to the card center and convert to rotation angles.

```tsx
const handleMouseMove = (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateX = (y - rect.height / 2) / intensity; // intensity: 14-22
  const rotateY = (rect.width / 2 - x) / intensity;
  card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
};

const handleMouseLeave = () => {
  card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
};
```

**Inner glow blob** (simulated light source):
```css
position: absolute;
top: -40%; right: -20%;
width: 280px; height: 280px;
background: radial-gradient(circle, rgba(194,164,255,0.08) 0%, transparent 70%);
border-radius: 50%;
pointer-events: none;
```

---

### 3. Three.js Background Scene

**Minimal setup pattern:**

```tsx
useEffect(() => {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 100);
  camera.position.z = 10;

  // Particle field
  const count = 5000;
  const positions = new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 25);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color: '#c2a4ff', size: 0.045, transparent: true, opacity: 0.55 });
  scene.add(new THREE.Points(geo, mat));

  // Wireframe geometry
  const torusGeo = new THREE.TorusKnotGeometry(1.3, 0.38, 128, 32, 2, 3);
  const torusMat = new THREE.MeshStandardMaterial({ wireframe: true, transparent: true, opacity: 0.2, emissive: '#7c3aed', emissiveIntensity: 0.8 });
  scene.add(new THREE.Mesh(torusGeo, torusMat));

  const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    particles.rotation.y = t * 0.025;
    renderer.render(scene, camera);
  };
  animate();
}, []);
```

**Geometry options for different vibes:**
- `TorusKnotGeometry` — complex organic knot, great for abstract tech feel
- `IcosahedronGeometry` — geometric, crystalline
- `OctahedronGeometry` — minimal, brutalist
- `SphereGeometry` with `wireframe: true` — classic sci-fi
- Custom `BufferGeometry` from a GLTF model — for branded shapes

---

### 4. Liquid Light Blobs (Framer Motion)

**Pattern:** Multiple absolutely positioned, heavily blurred divs with radial gradient fills, animated on infinite loops with different durations so they desync naturally.

```tsx
const blobs = [
  { size: 800, x: '10%', y: '15%', duration: 20, color: 'rgba(255,255,255,0.35)' },
  { size: 700, x: '65%', y: '10%', duration: 16, color: 'rgba(194,164,255,0.25)' },
  // ...
];

blobs.map(blob => (
  <motion.div
    style={{
      position: 'absolute',
      width: blob.size, height: blob.size,
      left: blob.x, top: blob.y,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
      filter: 'blur(150px)',
    }}
    animate={{
      x: [0, 80, -60, 0],
      y: [0, -70, 60, 0],
      scale: [1, 1.2, 0.9, 1],
      opacity: [0.25, 0.4, 0.3, 0.25],
    }}
    transition={{ duration: blob.duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
  />
))
```

**Mouse parallax on the whole container:**
```tsx
const mouseX = useMotionValue(0.5);
const parallaxX = useTransform(mouseX, [0, 1], [-20, 20]);

// In JSX:
<motion.div style={{ x: parallaxX, y: parallaxY }}>
  {blobs}
</motion.div>

// Update on mousemove:
mouseX.set(e.clientX / window.innerWidth);
```

---

### 5. Canvas Animated Background

**Pattern:** `requestAnimationFrame` loop painting gradients onto a `<canvas>`.

```tsx
const animate = () => {
  time += 0.001;
  const angle = (time * 0.5) % (Math.PI * 2);

  // Rotating linear gradient
  const gradient = ctx.createLinearGradient(
    cx - Math.cos(angle) * w, cy - Math.sin(angle) * h,
    cx + Math.cos(angle) * w, cy + Math.sin(angle) * h
  );
  gradient.addColorStop(0, 'rgba(0,0,0,1)');
  gradient.addColorStop(Math.sin(time * 0.8) * 0.5 + 0.5, 'rgba(26,26,26,1)');
  gradient.addColorStop(1, 'rgba(0,0,0,1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  // Breathing radial glow
  const glow = (Math.sin(time * 0.4) * 0.5 + 0.5) * 0.12;
  const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.7);
  radial.addColorStop(0, `rgba(255,255,255,${glow})`);
  radial.addColorStop(1, 'transparent');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, w, h);

  requestAnimationFrame(animate);
};
```

---

### 6. Custom GSAP Cursor

```tsx
// Dot: instant snap
gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });

// Ring: lerp in rAF loop
const lerp = () => {
  pos.x += (mouse.x - pos.x) * 0.12;
  pos.y += (mouse.y - pos.y) * 0.12;
  gsap.set(ring, { x: pos.x, y: pos.y });
  requestAnimationFrame(lerp);
};
```

**CSS:**
```css
.cursor-dot {
  position: fixed;
  width: 6px; height: 6px;
  background: #c2a4ff;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
.cursor-ring {
  position: fixed;
  width: 32px; height: 32px;
  border: 1px solid rgba(194,164,255,0.6);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;
  transition: width 0.2s, height 0.2s, border-color 0.2s;
}
.cursor-ring.hovered {
  width: 48px; height: 48px;
  border-color: rgba(194,164,255,1);
  background: rgba(194,164,255,0.05);
}
```

---

### 7. GSAP Loading Screen

```tsx
const obj = useRef({ value: 0 });

gsap.to(obj.current, {
  value: 100,
  duration: 1.8,
  ease: 'power2.inOut',
  onUpdate: () => {
    counter.textContent = Math.round(obj.current.value).toString().padStart(2, '0');
    bar.style.transform = `scaleX(${obj.current.value / 100})`;
  },
  onComplete: () => {
    gsap.to(screen, { opacity: 0, duration: 0.7, onComplete: () => setVisible(false) });
  },
});
```

---

### 8. Scroll-Triggered Entrance (Framer Motion)

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
>
```

The easing `[0.22, 1, 0.36, 1]` is an expo-out curve — fast start, smooth settle. Use it everywhere for premium feel.

---

## Color System

For this dark/cinematic style, keep the palette to **3 values**:

| Role | Value | Use |
|---|---|---|
| Background | `#0b080c` (near-black with slight warmth) | Page background |
| Accent | `#c2a4ff` (lavender) | Headings, CTAs, icons, borders |
| Text | `#eae5ec` / `rgba(..., 0.5)` | Body text at various opacity levels |

All other colors come from opacity variations of these three. Borders are `rgba(255,255,255,0.06)`. Cards are `rgba(255,255,255,0.02)`.

Other accent color combos that work with this pattern:
- Electric blue `#4fc3f7` on `#08080f`
- Neon green `#39ff14` on `#0a0a0a` (hacker/terminal)
- Warm gold `#f5c842` on `#0d0b00`
- Coral/pink `#ff6b9d` on `#0f080c`

---

## Going Further / Better

To push past what this site does:

1. **React Three Fiber** — use `@react-three/fiber` + `@react-three/drei` instead of raw Three.js. `useFrame`, `OrbitControls`, `Environment` maps, `MeshTransmissionMaterial` for glass effects.

2. **Shader materials** — `THREE.ShaderMaterial` with custom GLSL for noise-driven vertex displacement, plasma backgrounds, or ripple effects on hover.

3. **ScrollTrigger pinning** — pin sections while animating 3D camera movement through a scene (scroll-driven cinematics).

4. **Lenis smooth scroll** — replace native scroll with Lenis for buttery inertia scrolling that makes the whole page feel physical.

5. **Motion blur** — `CSS filter: blur()` applied briefly on fast tilt with `transition: filter 0.1s` — gives a physical weight feel on card interactions.

6. **FLIP animations** — use GSAP's `Flip` plugin or Framer's `layoutId` for animated layout transitions between pages.

7. **Spline** — use `@splinetool/react-spline` to embed interactive 3D scenes built in the Spline editor directly into React with zero Three.js code.

---

## Dependency List (minimal)

```json
{
  "next": "^16",
  "react": "^18",
  "framer-motion": "^12",
  "gsap": "^3.12",
  "@gsap/react": "^2",
  "three": "^0.168",
  "@react-three/fiber": "^8",
  "@react-three/drei": "^9",
  "tailwindcss": "^3",
  "react-fast-marquee": "^1.6",
  "lucide-react": "latest"
}
```
