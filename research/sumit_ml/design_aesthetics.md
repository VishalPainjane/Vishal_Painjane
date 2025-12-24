# Design & Aesthetics: vishal.ml (Deep Clone)

**Source Analysis:** [vishal.ml](https://web.archive.org/web/20250522140821/https://www.sumit.ml/)
**Tech Stack:** Next.js + Tailwind CSS

## 1. Typography
The website uses a specific pairing of fonts, distinct from standard "Inter" or "System" fonts.

*   **Sans-Serif (Body/Headings):** **Geist**
    *   Weights used: 400, 500, 600, 700.
    *   Source: Vercel's Geist font family.
*   **Monospace (Code/Tech Terms):** **IBM Plex Mono**
    *   Weights used: 400, 500, 600.
    *   Usage: Used for code blocks, technical references (PyTorch/Math), and potentially UI elements requiring precision.

## 2. Color Palette (Exact HSL Values)
The site uses a custom Shadcn-compatible theme with specific HSL values.

### Light Mode
*   **Background:** `0 0% 100%` (Pure White)
*   **Foreground:** `240 10% 3.9%` (Deep Charcoal, almost Black)
*   **Muted Foreground:** `240 3.8% 46.1%` (Mid-Grey)
*   **Border:** `240 5.9% 90%` (Light Grey)

### Dark Mode (The "Deep Slate" Theme)
The dark mode is **NOT** standard grey/zinc. It uses a deep, rich blue-black slate tone.
*   **Background:** `222 47% 5%` (Very Dark Blue/Slate - `#020817`)
*   **Foreground:** `210 20% 98%` (Off-White/Blue-tinted White)
*   **Card/Popover:** Matches Background.
*   **Secondary/Muted:** `217 32% 17%` (Dark Blue-Grey)
*   **Border:** `217 32% 17%`

## 3. Layout & Spacing
*   **Container Width:** `max-w-[42rem]` (approx 672px). The site is strictly single-column prose-focused.
*   **Radius:** `0.5rem` (Rounded-md).
*   **Spacing:** Generous vertical rhythm (`gap-10` between sections).

## 4. UI Components
*   **Header:** Sticky, Blur effect (`backdrop-blur`).
*   **Navigation:**
    *   Active State: Underline indicator (Framer Motion).
    *   Inactive State: Muted foreground.
*   **Prose:** Custom typography styling with specific line heights (`leading-7`) and margin spacing.