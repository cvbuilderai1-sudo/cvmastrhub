# 🖼️ TASK 5.4 - SMART PHOTO EDITOR IMPLEMENTATION PLAN

**SmartCV Hub - AI-Powered Photo Editing**  
**Status:** 🟡 IN PROGRESS  
**Started:** January 7, 2026 - 02:11 AM

---

## 🎯 OBJECTIVE

Build an advanced photo editor with AI-powered face detection, smart cropping, and professional enhancements to make CV photos look premium.

---

## 📦 DEPENDENCIES INSTALLED

✅ **TensorFlow.js Face Detection:**
- `@tensorflow-models/face-detection` - Face detection model
- `@tensorflow/tfjs-core` - TensorFlow core
- `@tensorflow/tfjs-backend-webgl` - WebGL backend for performance

**Installation:** Completed with `--legacy-peer-deps`

---

## 📁 FOLDER STRUCTURE

```
src/
├── components/
│   └── photo-editor/
│       ├── SmartPhotoCropper.tsx       # Face detection + cropping
│       ├── PhotoEnhancer.tsx           # Brightness/contrast/saturation
│       ├── BackgroundEditor.tsx        # Background options
│       ├── BeforeAfterComparison.tsx   # Visual comparison
│       ├── PhotoEditorModal.tsx        # Main container
│       ├── PhotoEditorTabs.tsx         # Tab navigation
│       └── index.ts                    # Exports
├── lib/
│   ├── photo/
│   │   ├── faceDetection.ts           # Face detection setup
│   │   ├── imageProcessing.ts         # Canvas processing
│   │   └── imageOptimization.ts       # Compression
│   └── hooks/
│       └── usePhotoEditor.ts          # State management
```

---

## 🔨 IMPLEMENTATION PHASES

### **Phase 1: Core Utilities** ✅ (30 min)

**Files to Create:**
1. ✅ `lib/photo/faceDetection.ts` - Face detection wrapper
2. ✅ `lib/photo/imageProcessing.ts` - Canvas utilities
3. ✅ `lib/photo/imageOptimization.ts` - Compression

**Key Features:**
- Load TensorFlow model lazily
- Detect faces with confidence threshold
- Canvas-based image manipulation
- JPEG compression with quality control

---

### **Phase 2: Smart Photo Cropper** ⏳ (1.5 hours)

**File:** `components/photo-editor/SmartPhotoCropper.tsx`

**Features:**
- Face detection on image load
- Auto-center face in frame
- Rule of thirds grid overlay
- Manual adjustment controls:
  - Zoom slider (0.5x - 2x)
  - X/Y position sliders
  - Rotation slider (0-360°)
- Real-time canvas preview
- Accept/Cancel buttons

**Technical:**
- Use `useEffect` to detect face on mount
- Canvas API for rendering
- Framer Motion for smooth interactions
- Glassmorphism styling

---

### **Phase 3: Photo Enhancer** ⏳ (1 hour)

**File:** `components/photo-editor/PhotoEnhancer.tsx`

**Features:**
- Brightness slider (-50 to +50)
- Contrast slider (-50 to +50)
- Saturation slider (-50 to +50)
- Sharpness slider (0 to 1)
- Temperature slider (-50 to +50)
- Real-time preview (debounced)
- Reset button

**Technical:**
- Canvas filters for adjustments
- Debounce slider updates (50ms)
- CSS filters for preview
- Export adjusted image as JPEG

---

### **Phase 4: Before/After Comparison** ⏳ (30 min)

**File:** `components/photo-editor/BeforeAfterComparison.tsx`

**Features:**
- Drag slider between before/after
- Or toggle buttons
- Smooth transitions
- Side-by-side view

**Technical:**
- CSS clip-path for slider effect
- Framer Motion for animations
- Responsive layout

---

### **Phase 5: Photo Editor Modal** ⏳ (1 hour)

**File:** `components/photo-editor/PhotoEditorModal.tsx`

**Features:**
- Full-screen modal
- Left: Live preview (60%)
- Right: Controls panel (40%)
- Tabbed interface:
  - Crop
  - Enhance
  - Compare
- Bottom action buttons:
  - Save
  - Cancel
  - Reset

**Technical:**
- Dialog component from Task 5.1
- Tab state management
- Image state management
- Export final image

---

### **Phase 6: Integration** ⏳ (1 hour)

**Files to Update:**
- `PersonalInfoForm.tsx` - Add "Edit Photo" button
- `usePhotoEditor.ts` - State management hook

**Features:**
- Launch editor from photo upload
- Replace photo with edited version
- Preserve quality through pipeline
- Update CV preview

---

### **Phase 7: Testing & Polish** ⏳ (1 hour)

**Tasks:**
- Browser testing (all features)
- Mobile responsiveness
- Performance optimization
- Dark mode verification
- Accessibility check
- Translation support

---

## 🎨 DESIGN SPECIFICATIONS

### **Modal Layout (Desktop)**

```
┌─────────────────────────────────────────────────┐
│ Photo Editor - Edit Your Professional Photo    │
├──────────────────┬──────────────────────────────┤
│                  │                              │
│   Preview        │  Tabs: Crop | Enhance | ... │
│   (Left 60%)     │                              │
│                  │  Controls Panel              │
│                  │  (Right 40%)                 │
│                  │                              │
│                  │  Sliders & Options           │
│                  │                              │
└──────────────────┴──────────────────────────────┘
│  Save  │  Cancel  │  Reset  │                   │
└─────────────────────────────────────────────────┘
```

### **Color Scheme**

- **Primary:** Blue (#3b82f6)
- **Success:** Emerald (#10b981)
- **Warning:** Amber (#f59e0b)
- **Danger:** Red (#ef4444)
- **Glass:** Glassmorphism from Task 5.1

---

## ⚙️ CONFIGURATION

### **Face Detection Settings**

```typescript
const FACE_DETECTION_CONFIG = {
  model: 'mediapipe_face_detector',
  maxFaces: 1,
  minConfidence: 0.5,
  runtime: 'tfjs'
};
```

### **Image Export Settings**

```typescript
const EXPORT_CONFIG = {
  format: 'image/jpeg',
  quality: 0.85,
  maxWidth: 500,
  maxHeight: 500,
  backgroundColor: '#ffffff'
};
```

### **Canvas Processing**

```typescript
const CANVAS_CONFIG = {
  debounceMs: 50,
  previewQuality: 0.7,
  exportQuality: 0.85
};
```

---

## 📊 ACCEPTANCE CRITERIA

### **Smart Cropper**
- [ ] Face detection works on valid photos
- [ ] Face is centered in suggested crop
- [ ] Rule of thirds grid visible
- [ ] Manual adjustment sliders work
- [ ] Zoom slider functions (0.5x - 2x)
- [ ] Rotation slider functions (0-360°)
- [ ] Preview updates in real-time
- [ ] Cropped image quality maintained

### **Photo Enhancer**
- [ ] All sliders work (brightness, contrast, etc.)
- [ ] Preview updates smoothly
- [ ] Reset button restores original
- [ ] No lag or performance issues

### **Modal Interface**
- [ ] Modal opens/closes smoothly
- [ ] Tabs functional
- [ ] Save button exports edited image
- [ ] Cancel button closes without saving
- [ ] Glassmorphism styling applied

### **Integration**
- [ ] Launches from photo upload form
- [ ] Edited photo replaces original
- [ ] Photo updates in CV preview
- [ ] No data loss or corruption

### **Performance**
- [ ] Face detection loads without blocking UI
- [ ] Slider interactions smooth (60fps)
- [ ] No memory leaks
- [ ] Mobile performance acceptable

---

## 🚀 PROGRESS TRACKER

| Phase | Component | Status | Time |
|-------|-----------|--------|------|
| 1 | Dependencies | ✅ Done | 10 min |
| 1 | faceDetection.ts | ⏳ Next | - |
| 1 | imageProcessing.ts | ⏳ Pending | - |
| 1 | imageOptimization.ts | ⏳ Pending | - |
| 2 | SmartPhotoCropper.tsx | ⏳ Pending | - |
| 3 | PhotoEnhancer.tsx | ⏳ Pending | - |
| 4 | BeforeAfterComparison.tsx | ⏳ Pending | - |
| 5 | PhotoEditorModal.tsx | ⏳ Pending | - |
| 6 | Integration | ⏳ Pending | - |
| 7 | Testing & Polish | ⏳ Pending | - |

**Total Progress:** 5% (1/20 items)

---

## 📝 NOTES

### **Technical Decisions**

1. **Face Detection:** Using TensorFlow.js MediaPipe model for accuracy
2. **Canvas API:** For image processing (better performance than CSS filters)
3. **Lazy Loading:** Load ML model only when editor opens
4. **Debouncing:** 50ms debounce on slider inputs for smooth UX
5. **Compression:** JPEG at 85% quality for good size/quality balance

### **Performance Optimizations**

- Lazy load face detection model
- Debounce slider updates
- Use requestAnimationFrame for canvas updates
- Compress preview images
- Cache processed images in state

### **Accessibility**

- All sliders keyboard accessible
- Tab navigation works
- Screen reader support
- Color contrast WCAG AA
- Focus management

---

## 🎯 NEXT STEPS

**Immediate:**
1. Create `lib/photo/faceDetection.ts`
2. Create `lib/photo/imageProcessing.ts`
3. Create `lib/photo/imageOptimization.ts`

**Then:**
4. Build `SmartPhotoCropper.tsx`
5. Build `PhotoEnhancer.tsx`
6. Build modal and integrate

---

**Status:** 🟡 IN PROGRESS  
**Last Updated:** January 7, 2026 - 02:15 AM  
**Estimated Completion:** 5-7 hours
