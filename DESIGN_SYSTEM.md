# 🎨 SmartCV Hub Design System

**Version:** 1.0.0  
**Last Updated:** January 2026  
**Status:** Production Ready

---

## 📖 Table of Contents

1. [Overview](#overview)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Components](#components)
5. [Spacing & Layout](#spacing--layout)
6. [Animations](#animations)
7. [Accessibility](#accessibility)
8. [Dark Mode](#dark-mode)

---

## 🎯 Overview

SmartCV Hub uses a **glassmorphism-based design system** that combines modern aesthetics with premium functionality. The system is built on:

- **Tailwind CSS 3.3+** for utility-first styling
- **Framer Motion** for 60fps animations
- **Custom glassmorphism utilities** for premium visual effects
- **WCAG AA compliance** for accessibility

### Design Principles

1. **Premium Feel:** Every interaction should feel polished and intentional
2. **Performance First:** 60fps animations, optimized bundle size
3. **Accessibility:** WCAG AA compliant, keyboard navigable
4. **Responsive:** Mobile-first, works on all screen sizes
5. **Multilingual:** Full RTL support for Arabic

---

## 🎨 Color Palette

### Primary Colors

```typescript
// Blue - Primary brand color
primary: {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6', // Main
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
}
```

### Glassmorphism Colors

```typescript
glass: {
  light: 'rgba(255, 255, 255, 0.7)',    // Light mode containers
  medium: 'rgba(255, 255, 255, 0.5)',   // Light mode floating elements
  dark: 'rgba(15, 23, 42, 0.7)',        // Dark mode containers
  border: 'rgba(255, 255, 255, 0.2)',   // Glass borders
}
```

### Semantic Colors

```typescript
// AI & Special Features
ai: '#8b5cf6',        // Purple - AI suggestions
success: '#10b981',   // Emerald - Positive feedback
warning: '#f59e0b',   // Amber - Warnings
danger: '#ef4444',    // Red - Errors/Critical
info: '#3b82f6',      // Blue - Information
```

### ATS Score Colors

```typescript
ats: {
  excellent: '#10b981',  // 80-100 (Emerald)
  good: '#3b82f6',       // 60-79 (Blue)
  fair: '#f59e0b',       // 40-59 (Amber)
  poor: '#ef4444',       // 0-39 (Red)
}
```

---

## 📝 Typography

### Font Stack

```css
font-family: 
  'Inter', 
  -apple-system, 
  BlinkMacSystemFont, 
  'Segoe UI', 
  'Roboto', 
  sans-serif;
```

### Type Scale

| Size | Class | Usage |
|------|-------|-------|
| 48px | `text-5xl` | Hero headings |
| 36px | `text-4xl` | Page titles |
| 30px | `text-3xl` | Section headings |
| 24px | `text-2xl` | Card titles |
| 20px | `text-xl` | Subheadings |
| 16px | `text-base` | Body text |
| 14px | `text-sm` | Secondary text |
| 12px | `text-xs` | Captions, labels |

### Font Weights

- **Bold (700):** Headings, important text
- **Semibold (600):** Subheadings, buttons
- **Medium (500):** Labels, navigation
- **Regular (400):** Body text

---

## 🧩 Components

### Button

**Variants:**
- `default` - Primary blue button
- `ai` - Purple gradient (AI features)
- `secondary` - Gray outline
- `outline` - Transparent with border
- `ghost` - No background
- `success` - Emerald (positive actions)
- `warning` - Amber (caution)
- `danger` - Red (destructive actions)

**Sizes:**
- `sm` - 32px height
- `md` - 40px height (default)
- `lg` - 48px height

**Usage:**
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="ai" size="lg">
  AI Enhance
</Button>
```

### Card

**Structure:**
- `Card` - Container
- `CardHeader` - Top section
- `CardTitle` - Title text
- `CardDescription` - Subtitle
- `CardContent` - Main content
- `CardFooter` - Bottom section

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

<Card>
  <CardHeader>
    <CardTitle>Personal Information</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Input

**Features:**
- Glassmorphism background
- Focus state with blue ring
- Error state support
- RTL text direction

**Usage:**
```tsx
import { Input } from '@/components/ui/Input';

<Input 
  type="email" 
  placeholder="john@example.com"
  className="w-full"
/>
```

### Badge

**Variants:**
- `default` - Blue
- `ai` - Purple
- `success` - Emerald
- `warning` - Amber
- `danger` - Red
- `info` - Blue

**Usage:**
```tsx
import { Badge } from '@/components/ui/Badge';

<Badge variant="success">Excellent</Badge>
```

---

## 📐 Spacing & Layout

### Spacing Scale

```
0.5 = 2px   (0.125rem)
1   = 4px   (0.25rem)
2   = 8px   (0.5rem)
3   = 12px  (0.75rem)
4   = 16px  (1rem)
6   = 24px  (1.5rem)
8   = 32px  (2rem)
12  = 48px  (3rem)
16  = 64px  (4rem)
```

### Grid System

```tsx
// 12-column grid
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-5">Left</div>
  <div className="col-span-7">Right</div>
</div>
```

### Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## 🎬 Animations

See [ANIMATIONS.md](./ANIMATIONS.md) for detailed animation guidelines.

**Key Principles:**
- All animations run at **60fps**
- Duration: 200-400ms for UI interactions
- Easing: `easeOut` for entrances, `easeIn` for exits
- Respect `prefers-reduced-motion`

---

## ♿ Accessibility

### WCAG AA Compliance

✅ **Color Contrast:** All text has ≥4.5:1 contrast ratio  
✅ **Keyboard Navigation:** All interactive elements focusable  
✅ **Focus Indicators:** Visible focus rings on all inputs  
✅ **Screen Readers:** Semantic HTML, ARIA labels  
✅ **Motion:** Respects `prefers-reduced-motion`

### Focus States

```css
focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50
```

### Skip Links

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

---

## 🌙 Dark Mode

### Implementation

Dark mode uses Tailwind's `dark:` variant with class-based toggling.

```tsx
// Toggle dark mode
<html className="dark">
```

### Color Adjustments

```css
/* Light mode */
bg-white text-gray-900

/* Dark mode */
dark:bg-slate-900 dark:text-gray-100
```

### Glassmorphism in Dark Mode

```css
backdrop-blur-xl 
bg-white/70 dark:bg-slate-900/70 
border-white/20 dark:border-slate-700/30
```

---

## 📦 Component Checklist

- [x] Button (7 variants)
- [x] Input (glassmorphism)
- [x] Card (full system)
- [x] Badge (6 variants)
- [x] FloatingAIEditor
- [x] ATSScoreGauge
- [x] ScoreBreakdown
- [x] StreamingText
- [x] AILoadingState
- [ ] Dialog (modal)
- [ ] Tooltip
- [ ] Slider
- [ ] Progress (linear)

---

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Import Components

```tsx
import { Button, Card, Input, Badge } from '@/components/ui';
```

### Use Glassmorphism Utilities

```tsx
import { cn } from '@/lib/styles/glassmorphism';

<div className={cn(
  'backdrop-blur-xl bg-white/70',
  'border border-white/20',
  'rounded-2xl shadow-2xl'
)}>
  Content
</div>
```

---

## 📞 Support

For questions or issues with the design system:
- Check component examples in `src/components/ui/`
- Review animation presets in `lib/animations/presets.ts`
- See glassmorphism utilities in `lib/styles/glassmorphism.ts`

---

**Built with ❤️ for SmartCV Hub**
