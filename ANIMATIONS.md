# 🎬 Animation Guidelines

**SmartCV Hub Motion Design System**

---

## 🎯 Animation Philosophy

Animations in SmartCV Hub serve three purposes:

1. **Feedback** - Confirm user actions
2. **Guidance** - Direct attention to important elements
3. **Delight** - Create a premium, polished experience

**Core Principle:** Every animation must be **purposeful, performant, and accessible**.

---

## ⚡ Performance Standards

### Target Metrics

- **Frame Rate:** 60fps (16.67ms per frame)
- **Duration:** 200-400ms for UI interactions
- **Easing:** Natural, physics-based curves
- **Bundle Size:** <40KB for Framer Motion

### Optimization Rules

✅ **Use GPU-accelerated properties:**
- `transform` (translate, scale, rotate)
- `opacity`

❌ **Avoid animating:**
- `width`, `height` (use `scale` instead)
- `top`, `left` (use `transform: translate` instead)
- `background-color` (use `opacity` on overlay instead)

---

## 🎨 Animation Presets

All presets are defined in `lib/animations/presets.ts`.

### Basic Animations

#### Fade In

```tsx
import { fadeIn } from '@/lib/animations/presets';

<motion.div {...fadeIn}>
  Content
</motion.div>
```

**Use for:**
- Page transitions
- Modal overlays
- Tooltips

#### Slide Up

```tsx
import { slideUp } from '@/lib/animations/presets';

<motion.div {...slideUp}>
  Content
</motion.div>
```

**Use for:**
- Cards entering from bottom
- Form sections
- Success messages

#### Slide Down

```tsx
import { slideDown } from '@/lib/animations/presets';

<motion.div {...slideDown}>
  Content
</motion.div>
```

**Use for:**
- Dropdown menus
- Notifications from top
- Expanding sections

---

### Advanced Animations

#### Float Effect

```tsx
import { float } from '@/lib/animations/presets';

<motion.div {...float}>
  Hover me
</motion.div>
```

**Use for:**
- Interactive cards
- Buttons with hover states
- Feature highlights

#### Scale In

```tsx
import { scaleIn } from '@/lib/animations/presets';

<motion.div {...scaleIn}>
  Content
</motion.div>
```

**Use for:**
- Modals
- Popups
- Confirmation dialogs

#### Pulse

```tsx
import { pulse } from '@/lib/animations/presets';

<motion.div {...pulse}>
  Attention!
</motion.div>
```

**Use for:**
- Loading indicators
- Notification badges
- Call-to-action elements

---

### Specialized Animations

#### Streaming Text

```tsx
import { streamText } from '@/lib/animations/presets';

<motion.div variants={streamText.container} initial="initial" animate="animate">
  {text.split('').map((char, i) => (
    <motion.span key={i} variants={streamText.item}>
      {char}
    </motion.span>
  ))}
</motion.div>
```

**Use for:**
- AI-generated text
- Typewriter effects
- Dynamic content reveals

#### Stagger Container

```tsx
import { staggerContainer, staggerItem } from '@/lib/animations/presets';

<motion.div variants={staggerContainer} initial="initial" animate="animate">
  <motion.div variants={staggerItem}>Item 1</motion.div>
  <motion.div variants={staggerItem}>Item 2</motion.div>
  <motion.div variants={staggerItem}>Item 3</motion.div>
</motion.div>
```

**Use for:**
- Form fields appearing sequentially
- List items
- Feature grids

#### ATS Gauge

```tsx
import { atsGauge } from '@/lib/animations/presets';

<motion.circle
  {...atsGauge}
  strokeDasharray={circumference}
  strokeDashoffset={offset}
/>
```

**Use for:**
- Circular progress indicators
- Score gauges
- Loading rings

---

## 🎭 Easing Functions

### Standard Easings

```typescript
export const easings = {
  easeOut: [0, 0, 0.2, 1],      // Deceleration (entrances)
  easeIn: [0.4, 0, 1, 1],       // Acceleration (exits)
  easeInOut: [0.4, 0, 0.2, 1],  // Smooth both ways
  spring: {                      // Bouncy, natural
    type: 'spring',
    stiffness: 300,
    damping: 30
  }
};
```

### When to Use

- **easeOut** - Elements entering the screen
- **easeIn** - Elements leaving the screen
- **easeInOut** - Elements moving within the screen
- **spring** - Interactive elements (buttons, cards)

---

## ⏱️ Duration Guidelines

| Animation Type | Duration | Example |
|---------------|----------|---------|
| Micro-interactions | 100-200ms | Button hover, checkbox |
| UI transitions | 200-300ms | Modal open, card flip |
| Page transitions | 300-400ms | Route change, tab switch |
| Loading states | 400-600ms | Skeleton → Content |
| Attention-seeking | 1000-2000ms | Pulse, shimmer |

---

## ♿ Accessibility

### Respect User Preferences

```tsx
import { getReducedMotion } from '@/lib/animations/presets';

const shouldAnimate = !getReducedMotion();

<motion.div
  animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1 }}
>
  Content
</motion.div>
```

### Implementation

```typescript
export function getReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
```

### Fallback Behavior

When `prefers-reduced-motion` is enabled:
- ✅ Keep opacity transitions (subtle)
- ❌ Disable movement animations
- ❌ Disable scale/rotate animations
- ✅ Instant state changes

---

## 🎯 Use Cases

### Form Interactions

```tsx
// Field focus
<Input
  whileFocus={{ scale: 1.02 }}
  transition={{ duration: 0.2 }}
/>

// Submit button
<Button
  whileTap={{ scale: 0.95 }}
  whileHover={{ scale: 1.05 }}
/>
```

### Card Interactions

```tsx
<motion.div
  whileHover={{ y: -5, shadow: '2xl' }}
  transition={{ duration: 0.2 }}
  className="backdrop-blur-xl bg-white/70"
>
  Card content
</motion.div>
```

### Modal Entrance

```tsx
import { modalBackdrop, modalContent } from '@/lib/animations/presets';

<AnimatePresence>
  {isOpen && (
    <>
      <motion.div {...modalBackdrop} />
      <motion.div {...modalContent}>
        Modal content
      </motion.div>
    </>
  )}
</AnimatePresence>
```

### List Animations

```tsx
<motion.ul variants={staggerContainer} initial="initial" animate="animate">
  {items.map((item, i) => (
    <motion.li key={i} variants={staggerItem}>
      {item}
    </motion.li>
  ))}
</motion.ul>
```

---

## 🚀 Advanced Patterns

### Orchestrated Sequences

```tsx
const sequence = async () => {
  await controls.start({ opacity: 1 });
  await controls.start({ y: 0 });
  await controls.start({ scale: 1 });
};

<motion.div animate={controls} />
```

### Scroll-Triggered Animations

```tsx
import { useInView } from 'framer-motion';

const ref = useRef(null);
const isInView = useInView(ref, { once: true });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
>
  Content
</motion.div>
```

### Gesture-Based Animations

```tsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300 }}
  dragElastic={0.2}
  whileDrag={{ scale: 1.1 }}
>
  Drag me
</motion.div>
```

---

## 📊 Performance Monitoring

### Check Animation Performance

```tsx
import { motion, useAnimationFrame } from 'framer-motion';

useAnimationFrame((t, delta) => {
  if (delta > 16.67) {
    console.warn('Frame drop detected:', delta);
  }
});
```

### Optimize Heavy Animations

```tsx
// ❌ Bad - Animates layout
<motion.div animate={{ width: 300 }} />

// ✅ Good - Uses transform
<motion.div animate={{ scaleX: 1.5 }} />
```

---

## 🎨 Animation Combinations

### Fade + Slide

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Scale + Rotate

```tsx
<motion.div
  initial={{ scale: 0, rotate: -180 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  Content
</motion.div>
```

### Stagger + Fade

```tsx
<motion.div variants={staggerContainer}>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={staggerItem}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

## ✅ Do's and Don'ts

### ✅ DO

- **Keep animations under 400ms** for UI interactions
- **Use GPU-accelerated properties** (transform, opacity)
- **Respect `prefers-reduced-motion`**
- **Test on low-end devices**
- **Use easing functions** for natural motion
- **Animate with purpose** (feedback, guidance, delight)

### ❌ DON'T

- **Don't animate layout properties** (width, height, top, left)
- **Don't create infinite loops** without user control
- **Don't use animations for critical information**
- **Don't stack too many animations** (performance)
- **Don't ignore accessibility**
- **Don't animate just because you can**

---

## 📚 Quick Reference

### Import Presets

```tsx
import {
  fadeIn,
  slideUp,
  slideDown,
  float,
  scaleIn,
  pulse,
  streamText,
  staggerContainer,
  staggerItem,
  modalBackdrop,
  modalContent,
  floatingAI,
  atsGauge
} from '@/lib/animations/presets';
```

### Basic Usage

```tsx
<motion.div {...fadeIn}>Fade in</motion.div>
<motion.div {...slideUp}>Slide up</motion.div>
<motion.div {...float}>Float on hover</motion.div>
```

### With Variants

```tsx
<motion.div variants={staggerContainer} initial="initial" animate="animate">
  <motion.div variants={staggerItem}>Item 1</motion.div>
  <motion.div variants={staggerItem}>Item 2</motion.div>
</motion.div>
```

---

## 🔧 Debugging

### Enable Motion DevTools

```tsx
import { MotionConfig } from 'framer-motion';

<MotionConfig reducedMotion="user">
  <App />
</MotionConfig>
```

### Log Animation States

```tsx
<motion.div
  onAnimationStart={() => console.log('Animation started')}
  onAnimationComplete={() => console.log('Animation complete')}
  animate={{ opacity: 1 }}
>
  Content
</motion.div>
```

---

**Built with ❤️ for SmartCV Hub**
