# SmileAtelier — Premium Dental Clinic Website

Full-featured dental clinic web app built with React 19, Vite and Tailwind CSS v4. Designed to be delivered as a ready-to-deploy product to any dental practice.

---

## What's included

**Landing page**
- Animated floating dock navbar with macOS-style magnification (Framer Motion)
- 3D glossy tooth hero with parallax scroll and orbit rings
- Before/after smile comparison slider (drag to compare)
- Treatments, technology and team sections
- Infinite marquee testimonials with dual-direction rows
- Discount offer section + dark navy CTA
- Fully responsive, mobile-first

**Booking system**
- Patient registration and login with password recovery flow
- Family accounts — one account manages multiple people (parents + children)
- Book appointments per family member with service and timeslot picker
- Patient dashboard with upcoming appointments and cancellation

**Admin panel** (`/login` → `admin` / `123`)
- SaaS-style sidebar with animated active indicator
- KPI cards: visits, active bookings, registered patients, consent rate
- Interactive SVG charts: area chart with hover tooltip, donut with segment hover, animated bars
- Global search (⌘K) across patients and reservations — click result to jump and highlight
- Inline search and filter tabs inside the reservations table
- Patient cards with per-account family member breakdown

**Production-ready extras**
- GDPR cookie consent banner (necessary / analytics / marketing toggles)
- Auto language detection + manual toggle: ES, EN, DE, FR
- Page transitions with AnimatePresence
- Floating WhatsApp button with pulse animation rings
- Privacy policy page (`/privacidad`) — GDPR compliant
- Custom 404 page with animated illustration
- SEO: Open Graph, Twitter Card, Schema.org Dentist JSON-LD, robots.txt
- Clean production build, no demo data, localStorage versioning with cache-bust on deploy

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 (utility-first, custom design tokens) |
| Animations | Framer Motion (spring physics, layout animations, AnimatePresence) |
| Routing | React Router v7 |
| State | React Context API + localStorage persistence |
| i18n | Custom provider — zero external dependencies |
| Deploy | Vercel (vercel.json SPA rewrite included) |

---

## Getting started

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

---

## Project structure

```
src/
├── components/     # Navbar, Hero, BeforeAfter, Testimonials, CTA, WhatsApp...
├── pages/          # Home, Login, Register, Forgot, Dashboard, Admin, Privacy, NotFound
├── context/        # AppContext (auth, reservations, analytics state)
├── i18n/           # i18n.jsx — ES / EN / DE / FR dictionaries + auto-detect
└── lib/            # storage.js (localStorage abstraction)
```

---

## Customising for a real clinic

1. Replace the `ADMIN` credentials in `src/context/AppContext.jsx`
2. Update clinic name, address and phone in `src/i18n/i18n.jsx` and `index.html`
3. Set the WhatsApp number in `src/components/WhatsAppButton.jsx`
4. Replace `public/og-image.jpg` with a real photo for social sharing
5. Connect a backend or form service (Supabase, Formspree, etc.) for persistent reservations

---

Built by [itzSecretProject](https://github.com/itzSecretProject)
