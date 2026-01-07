# 🔮 Glassmorphism Design Guidelines

**SmartCV Hub Visual Identity**

---

## 🎯 What is Glassmorphism?

Glassmorphism is a design trend that creates a frosted-glass effect using:
- **Backdrop blur** (`backdrop-filter: blur()`)
- **Semi-transparent backgrounds** (`rgba()` with alpha < 1)
- **Subtle borders** (light, semi-transparent)
- **Layered depth** (shadows and overlays)

---

## ✨ Core Principles

### 1. **Transparency & Blur**

Always combine transparency with blur for the glass effect:

```css
/* ✅ Correct */
backdrop-blur-xl bg-white/70

/* ❌ Wrong - No blur */
bg-white/70

/* ❌ Wrong - No transparency */
backdrop-blur-xl bg-white
```

### 2. **Layering**

Create depth by stacking glass elements:

```tsx
<div className="backdrop-blur-xl bg-white/70">  {/* Background layer */}
  <div className="backdrop-blur-md bg-white/60">  {/* Floating element */}
    <div className="backdrop-blur-sm bg-white/50">  {/* Top element */}
    </div>
  </div>
</div>
```

### 3. **Borders**

Use semi-transparent borders to define edges:

```css
border border-white/20 dark:border-slate-700/30
```

### 4. **Shadows**

Enhance depth with soft shadows:

```css
shadow-xl  /* For containers */
shadow-2xl /* For floating elements */
```

---

## 🎨 Glass Variants

### Container Glass (Main Sections)

```tsx
className="
  backdrop-blur-xl 
  bg-white/70 dark:bg-slate-900/70 
  border border-white/20 dark:border-slate-700/30 
  rounded-2xl 
  shadow-2xl
"
```

**Use for:**
- Main content cards
- Form containers
- Modal backgrounds

### Floating Glass (Overlays)

```tsx
className="
  backdrop-blur-md 
  bg-white/60 dark:bg-slate-800/60 
  border border-white/30 dark:border-slate-700/40 
  rounded-xl 
  shadow-xl
"
```

**Use for:**
- Floating AI editor
- Tooltips
- Dropdown menus
- Popovers

### Button Glass (Interactive)

```tsx
className="
  backdrop-blur-sm 
  bg-blue-500/80 hover:bg-blue-500/90 
  border border-blue-300/50 
  rounded-lg 
  transition-all duration-200
"
```

**Use for:**
- Primary buttons
- Call-to-action elements
- Interactive cards

### Input Glass (Form Fields)

```tsx
className="
  backdrop-blur-sm 
  bg-white/50 dark:bg-slate-900/50 
  border border-gray-300/50 dark:border-gray-600/50 
  rounded-lg 
  focus:bg-white/70 dark:focus:bg-slate-900/70
  focus:border-blue-500/50 
  focus:ring-2 focus:ring-blue-500/20
"
```

**Use for:**
- Text inputs
- Textareas
- Select dropdowns

---

## 🌓 Dark Mode Considerations

### Light Mode
- Background: `bg-white/70`
- Border: `border-white/20`
- Text: `text-gray-900`

### Dark Mode
- Background: `dark:bg-slate-900/70`
- Border: `dark:border-slate-700/30`
- Text: `dark:text-gray-100`

### Example

```tsx
<div className="
  backdrop-blur-xl 
  bg-white/70 dark:bg-slate-900/70 
  border border-white/20 dark:border-slate-700/30 
  text-gray-900 dark:text-gray-100
">
  Content
</div>
```

---

## 📱 Performance Optimization

### Browser Support

`backdrop-filter` is supported in:
- ✅ Chrome 76+
- ✅ Safari 9+
- ✅ Firefox 103+
- ✅ Edge 79+

### Fallback for Older Browsers

```tsx
import { supportsBackdropFilter } from '@/lib/styles/glassmorphism';

<div className={
  supportsBackdropFilter()
    ? 'backdrop-blur-xl bg-white/70'
    : 'bg-white/90'  // Fallback: more opaque, no blur
}>
  Content
</div>
```

### Mobile Optimization

Reduce blur intensity on mobile for better performance:

```css
/* Desktop */
backdrop-blur-xl

/* Mobile */
md:backdrop-blur-xl backdrop-blur-md
```

---

## 🎭 Animation with Glass

### Hover Effects

```tsx
<motion.div
  whileHover={{ 
    scale: 1.02,
    backgroundColor: 'rgba(255, 255, 255, 0.8)' 
  }}
  transition={{ duration: 0.2 }}
  className="backdrop-blur-xl bg-white/70"
>
  Hover me
</motion.div>
```

### Entrance Animations

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
  className="backdrop-blur-xl bg-white/70"
>
  Content
</motion.div>
```

---

## 🎨 Color Overlays

### Gradient Glass

```tsx
className="
  backdrop-blur-xl 
  bg-gradient-to-br from-blue-500/20 to-purple-500/20 
  border border-white/20
"
```

### Tinted Glass

```tsx
/* Blue tint */
className="backdrop-blur-xl bg-blue-50/70"

/* Purple tint (AI features) */
className="backdrop-blur-xl bg-purple-50/70"

/* Emerald tint (success) */
className="backdrop-blur-xl bg-emerald-50/70"
```

---

## ✅ Do's and Don'ts

### ✅ DO

- **Combine blur + transparency** for true glass effect
- **Use subtle borders** to define edges
- **Layer elements** for depth
- **Test in dark mode** to ensure visibility
- **Provide fallbacks** for older browsers
- **Optimize for mobile** (reduce blur)

### ❌ DON'T

- **Don't use blur without transparency** (not glass)
- **Don't use 100% opacity** (defeats the purpose)
- **Don't stack too many blur layers** (performance hit)
- **Don't forget dark mode variants**
- **Don't use on text** (readability issues)
- **Don't overuse** (use strategically)

---

## 📐 Spacing & Padding

Glass elements need breathing room:

```tsx
/* Container padding */
<div className="backdrop-blur-xl bg-white/70 p-6">
  Content
</div>

/* Spacing between glass elements */
<div className="space-y-4">
  <div className="backdrop-blur-xl bg-white/70">Card 1</div>
  <div className="backdrop-blur-xl bg-white/70">Card 2</div>
</div>
```

---

## 🎯 Use Cases

### ✅ Good Use Cases

- **Main content cards** - Form sections, CV preview
- **Floating panels** - AI editor, tooltips
- **Modal overlays** - Dialogs, confirmations
- **Navigation bars** - Headers, sidebars
- **Interactive buttons** - Primary CTAs

### ❌ Avoid For

- **Body text containers** - Hard to read
- **Dense data tables** - Reduces clarity
- **Small UI elements** - Overkill
- **Performance-critical sections** - Use sparingly

---

## 🔧 Utility Functions

### Check Browser Support

```typescript
import { supportsBackdropFilter } from '@/lib/styles/glassmorphism';

if (supportsBackdropFilter()) {
  // Use glassmorphism
} else {
  // Use fallback
}
```

### Combine Utilities

```typescript
import { cn } from '@/lib/styles/glassmorphism';

<div className={cn(
  'backdrop-blur-xl',
  'bg-white/70 dark:bg-slate-900/70',
  'border border-white/20',
  'rounded-2xl shadow-2xl',
  'transition-all duration-300'
)}>
  Content
</div>
```

---

## 📊 Performance Metrics

### Target Metrics

- **Lighthouse Score:** ≥90
- **Animation FPS:** 60fps
- **Bundle Size Impact:** <10KB
- **Paint Time:** <100ms

### Optimization Tips

1. **Limit blur layers** - Max 3 nested blur elements
2. **Use `will-change`** for animated glass
3. **Reduce blur on mobile** - `backdrop-blur-md` instead of `xl`
4. **Lazy load** heavy glass components
5. **Test on low-end devices** - iPhone 11, Android 10

---

## 🎨 Examples

### Personal Info Card

```tsx
<Card>
  <CardHeader className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70">
    <CardTitle>Personal Information</CardTitle>
  </CardHeader>
  <CardContent className="backdrop-blur-md bg-white/60 dark:bg-slate-800/60">
    <Input placeholder="Full Name" />
  </CardContent>
</Card>
```

### Floating AI Editor

```tsx
<motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  className="
    absolute right-0 top-0
    backdrop-blur-md bg-white/60 dark:bg-slate-800/60
    border border-white/30 dark:border-slate-700/40
    rounded-xl shadow-xl
    p-4
  "
>
  AI Suggestions
</motion.div>
```

### ATS Score Gauge

```tsx
<div className="
  backdrop-blur-xl bg-white/70 dark:bg-slate-900/70
  border border-white/20 dark:border-slate-700/30
  rounded-2xl shadow-2xl
  p-6
">
  <ATSScoreGauge score={85} />
</div>
```

---

## 🚀 Quick Reference

```tsx
// Container
backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-2xl

// Floating
backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/30 dark:border-slate-700/40 rounded-xl shadow-xl

// Button
backdrop-blur-sm bg-blue-500/80 hover:bg-blue-500/90 border border-blue-300/50 rounded-lg

// Input
backdrop-blur-sm bg-white/50 dark:bg-slate-900/50 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:bg-white/70 dark:focus:bg-slate-900/70
```

---

**Built with ❤️ for SmartCV Hub**
