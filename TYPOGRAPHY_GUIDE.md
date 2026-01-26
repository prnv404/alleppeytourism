# Typography Guide - Airbnb-Inspired Design System

## 🎯 Font Choice: DM Sans

**DM Sans** is the closest open-source alternative to Airbnb's proprietary **Airbnb Cereal** font.

### Why DM Sans?

1. ✅ **Geometric proportions** - Similar structure to Cereal
2. ✅ **Slightly rounded terminals** - Friendly and approachable
3. ✅ **Excellent readability** - Optimized for UI/UX at all sizes
4. ✅ **Modern, clean aesthetic** - Perfect for premium interfaces
5. ✅ **Wide weight range** - Flexibility for design hierarchy
6. ✅ **Designed for interfaces** - Not adapted from print

---

## 📦 Implementation

### Next.js Font Configuration

```tsx
// app/layout.tsx
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
```

### Tailwind CSS Configuration

```css
/* app/globals.css */
@theme inline {
  --font-sans: var(--font-dm-sans);
}
```

---

## 🎨 Font Weight Hierarchy (Airbnb-Style)

### **Logo: 700 (Bold)**
- **Purpose**: Brand identity, maximum impact
- **Usage**: Main logo, brand name
- **Example**:
```tsx
<h1 className="font-bold text-xl">Alleppey Tourism</h1>
```

### **Navbar Items: 500 (Medium)**
- **Purpose**: Navigation links, readable but not too heavy
- **Usage**: Menu items, tabs, filters
- **Example**:
```tsx
<a className="font-medium text-sm">Home</a>
```

### **Buttons/CTAs: 600 (Semibold)**
- **Purpose**: Call-to-action elements, emphasis
- **Usage**: Primary buttons, important actions
- **Example**:
```tsx
<button className="font-semibold">Book Now</button>
```

### **Body Text: 400 (Regular)**
- **Purpose**: Main content, descriptions
- **Usage**: Paragraphs, card descriptions, labels
- **Example**:
```tsx
<p className="font-normal">Experience the backwaters...</p>
```

---

## 💡 Usage Examples

### Navbar (Airbnb-Style)

```tsx
<nav className="bg-white shadow-sm">
  {/* Logo - Bold (700) */}
  <a href="/" className="font-bold text-xl">
    Alleppey Tourism
  </a>

  {/* Nav Items - Medium (500) */}
  <div className="flex gap-4">
    <a href="/houseboats" className="font-medium text-sm">
      Houseboats
    </a>
    <a href="/packages" className="font-medium text-sm">
      Packages
    </a>
  </div>

  {/* CTA - Semibold (600) */}
  <button className="font-semibold text-sm bg-emerald-500 text-white px-4 py-2 rounded-lg">
    Book Experience
  </button>
</nav>
```

### Hero Section

```tsx
<section>
  {/* Heading - Bold (700) */}
  <h1 className="font-bold text-5xl">
    Discover the Venice of the East
  </h1>

  {/* Subheading - Medium (500) */}
  <h2 className="font-medium text-2xl text-gray-600">
    Luxury Houseboat Experiences
  </h2>

  {/* Body - Regular (400) */}
  <p className="font-normal text-base text-gray-700">
    Experience the serene backwaters of Alleppey with our curated collection
    of premium houseboats and authentic Kerala experiences.
  </p>

  {/* CTA - Semibold (600) */}
  <button className="font-semibold text-lg">
    Explore Packages
  </button>
</section>
```

### Card Component

```tsx
<div className="card">
  {/* Card Title - Semibold (600) */}
  <h3 className="font-semibold text-lg">
    Deluxe Houseboat Package
  </h3>

  {/* Card Description - Regular (400) */}
  <p className="font-normal text-sm text-gray-600">
    2 days, 1 night luxury experience with traditional Kerala cuisine
  </p>

  {/* Price - Bold (700) */}
  <span className="font-bold text-2xl">₹12,000</span>

  {/* Button - Semibold (600) */}
  <button className="font-semibold">View Details</button>
</div>
```

---

## 📏 Typography Scale (Airbnb-Inspired)

| Element | Size | Weight | Line Height | Use Case |
|---------|------|--------|-------------|----------|
| **Display** | 48-64px | 700 | 1.1 | Hero headlines |
| **H1** | 32-40px | 700 | 1.2 | Page titles |
| **H2** | 24-28px | 600 | 1.3 | Section headers |
| **H3** | 20-24px | 600 | 1.4 | Card titles |
| **Body Large** | 18px | 400 | 1.6 | Intro paragraphs |
| **Body** | 16px | 400 | 1.5 | Main content |
| **Body Small** | 14px | 400 | 1.5 | Captions, labels |
| **Nav Items** | 14px | 500 | 1.4 | Navigation |
| **Buttons** | 14-16px | 600 | 1 | CTAs |
| **Caption** | 12px | 400 | 1.4 | Metadata |

---

## 🎯 Best Practices

### ✅ DO:
- Use **bold (700)** for logos and primary headings
- Use **semibold (600)** for CTAs and important actions
- Use **medium (500)** for navigation and secondary emphasis
- Use **regular (400)** for body text and descriptions
- Maintain consistent spacing between font weights
- Use `tracking-tight` for large headings
- Use `tracking-normal` for body text

### ❌ DON'T:
- Mix too many font weights in one component
- Use light weights (300) - not in our configuration
- Use bold for body text - reduces readability
- Use regular weight for CTAs - lacks emphasis
- Forget to set proper line heights

---

## 🔧 Utility Classes

```css
/* Pre-configured classes you can use */
.font-bold      /* 700 - Logo, headings */
.font-semibold  /* 600 - CTAs, subheadings */
.font-medium    /* 500 - Nav items, emphasis */
.font-normal    /* 400 - Body text */

/* Letter spacing */
.tracking-tight   /* For large headings */
.tracking-normal  /* For body text */
.tracking-wide    /* For small caps, labels */
```

---

## 🌐 Browser Support

DM Sans is served via Google Fonts with `display: swap` for optimal performance:
- ✅ All modern browsers
- ✅ Fallback to system sans-serif
- ✅ FOUT (Flash of Unstyled Text) prevention
- ✅ Optimized loading with font-display: swap

---

## 📱 Responsive Typography

```tsx
{/* Responsive heading */}
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>

{/* Responsive body */}
<p className="text-sm md:text-base lg:text-lg font-normal">
  Responsive paragraph text
</p>

{/* Responsive button */}
<button className="text-sm md:text-base font-semibold">
  Responsive CTA
</button>
```

---

## 🎨 Color Pairing

DM Sans pairs beautifully with:
- **Emerald Green** (#10b981) - Primary brand color
- **Neutral Grays** - For text hierarchy
- **White/Black** - For maximum contrast

```tsx
{/* Example color combinations */}
<h1 className="font-bold text-gray-900">Dark heading</h1>
<p className="font-normal text-gray-600">Body text</p>
<span className="font-semibold text-emerald-500">Accent text</span>
```

---

## 📚 Resources

- [DM Sans on Google Fonts](https://fonts.google.com/specimen/DM+Sans)
- [Airbnb Design Language](https://airbnb.design/)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

---

**Last Updated**: January 26, 2026
**Project**: Alleppey Tourism Website
**Design System**: Airbnb-Inspired
