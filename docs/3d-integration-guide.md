# 3D Object Integration Guide

This guide explains how to integrate and customize 3D objects in the Web3 Wallet application using Spline.

## Prerequisites

- [Spline](https://spline.design/) account (free tier is sufficient)
- Basic understanding of React and Next.js

## Setup Steps

### 1. Add Spline Script to Layout

The application loads the Spline viewer script in `app/layout.tsx`:

```tsx
<Script
  type="module"
  src="https://unpkg.com/@splinetool/viewer@1.9.93/build/spline-viewer.js"
  strategy="beforeInteractive"
/>
```

This script enables the `<spline-viewer>` custom element.

### 2. Create a Spline Component

We use two approaches for Spline integration:

#### Method 1: Using dangerouslySetInnerHTML (Recommended)

This method works well with TypeScript and avoids type errors:

```tsx
"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function SplineComponent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after a delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Add custom CSS for spline-viewer
    const style = document.createElement("style");
    style.textContent = `
      spline-viewer {
        background: transparent !important;
        --spline-viewer-background-color: transparent !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      clearTimeout(timer);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="w-full h-full overflow-visible bg-transparent">
      <div className="p-0 h-full flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* Using dangerouslySetInnerHTML to avoid TypeScript errors */}
          <div
            className="w-full h-full"
            dangerouslySetInnerHTML={{
              __html: `<spline-viewer url="YOUR_SPLINE_SCENE_URL" background="transparent"></spline-viewer>`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
```

#### Method 2: Using @splinetool/react-spline Package

This method requires installing the npm package:

```bash
npm install @splinetool/react-spline
```

```tsx
"use client";

import Spline from "@splinetool/react-spline";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function SplineComponent() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      <Spline scene="YOUR_SPLINE_SCENE_URL" onLoad={() => setLoading(false)} />
    </div>
  );
}
```

### 3. Create and Publish a Spline Scene

1. Sign up/login to [Spline](https://spline.design/)
2. Create a new project
3. Design your 3D object/scene
4. Click "Export" in the top right
5. Select "Link for Web"
6. Copy the URL (it will look like: `https://prod.spline.design/YOUR_ID/scene.splinecode`)

### 4. CSS Styling for Spline Objects

Create a `spline-overrides.css` file to customize the Spline viewer:

```css
/* Override Spline canvas styles to remove borders */
canvas {
  border: none !important;
  outline: none !important;
}

/* Target any potential iframe that Spline might use */
iframe {
  border: none !important;
  outline: none !important;
}

/* Target any potential container elements Spline might create */
[data-spline-container],
[data-spline-viewer],
spline-viewer {
  border: none !important;
  outline: none !important;
  border-radius: 0 !important;
}

/* Spline Viewer Overrides */
spline-viewer,
:where(spline-viewer) {
  width: 100% !important;
  height: 100% !important;
  max-height: 1000px;
  object-fit: contain;
  transform: translateY(-100px) !important;
}

spline-viewer::part(canvas) {
  background: transparent !important;
  min-height: 650px !important;
}

/* Make the canvas transparent */
canvas.spline-canvas {
  background: transparent !important;
  min-height: 650px !important;
}
```

### 5. Positioning the 3D Object

To position your 3D object differently in specific sections, add custom CSS:

```css
/* Special positioning for the hero section */
.hero-section spline-viewer {
  transform: scale(0.8) translateY(-80px) !important;
}

/* Special positioning for the feature section */
.feature-section spline-viewer {
  transform: scale(0.9) translateY(-50px) !important;
}
```

## Troubleshooting

### Common Issues

1. **3D object not showing**

   - Verify the Spline script is loaded in layout.tsx
   - Check the console for errors
   - Ensure the scene URL is correct

2. **Background not transparent**

   - Add `background="transparent"` to the spline-viewer element
   - Use CSS to enforce transparency: `background: transparent !important;`

3. **Object positioning issues**

   - Adjust the `transform` property in CSS
   - Try different scale and translateY values

4. **TypeScript errors**
   - Use the dangerouslySetInnerHTML method to avoid type errors
   - Or add proper type definitions if using the npm package

## Advanced Customization

### Interaction with 3D Objects

To add interactivity to your 3D objects, use the onLoad callback:

```tsx
<Spline
  scene="YOUR_SPLINE_URL"
  onLoad={(spline) => {
    // You can access the Spline API here
    console.log("Spline loaded:", spline);
    // Access objects
    const obj = spline.findObjectByName("YourObjectName");
    // Add event listeners
    obj.addEventListener("click", () => {
      console.log("Object clicked!");
    });
  }}
/>
```

### Responsive Adjustments

For better mobile responsiveness:

```css
@media (max-width: 768px) {
  spline-viewer {
    transform: scale(0.5) translateY(-100px) !important;
  }

  .hero-section spline-viewer {
    transform: scale(0.6) translateY(-50px) !important;
  }
}
```
