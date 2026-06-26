<div align="center">

# SmileAtelier

### Dental clinic SaaS — online reservations, family accounts, admin dashboard, i18n ES / EN / DE / FR

<br>

[![Stars](https://img.shields.io/github/stars/itzSecretProject/SmileAtelier?color=3b78ff&style=for-the-badge&logo=github&logoColor=white)](https://github.com/itzSecretProject/SmileAtelier/stargazers)
[![Forks](https://img.shields.io/github/forks/itzSecretProject/SmileAtelier?color=3b78ff&style=for-the-badge&logoColor=white)](https://github.com/itzSecretProject/SmileAtelier/network)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-animations-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![License](https://img.shields.io/github/license/itzSecretProject/SmileAtelier?color=3b78ff&style=for-the-badge)](LICENSE)

</div>

---

## Overview

SmileAtelier is a complete dental clinic website built to be sold as a ready-to-deploy product. It covers everything a real practice needs: a landing page that converts, an online booking system with family account support and a SaaS-style admin panel with live analytics.

---

## Landing page

- Animated floating dock navbar with macOS-style icon magnification
- 3D glossy tooth hero with parallax scroll and orbit rings
- Before / after smile comparison slider — drag to compare
- Treatments, technology, team and testimonials sections
- Infinite marquee testimonials (dual direction, no external library)
- Discount offer section + dark navy CTA

---

## Booking system

- Patient registration and login with password recovery
- **Family accounts** — one login manages multiple people (parents + children)
- Book per family member: choose service, date and timeslot
- Patient dashboard with upcoming appointments and cancellation

---

## Admin panel

> Login: `admin` / `123`

- SaaS-style sidebar with animated active indicator
- KPI cards: visits, active bookings, registered patients, consent rate
- **Interactive SVG charts** — area chart with tooltip, donut with segment hover, animated bar chart
- **Global search (⌘K)** — searches across all patients and reservations, click to jump and highlight
- Inline search + filter tabs in the reservations table
- Patient cards with per-account family breakdown

---

## Production extras

- GDPR cookie consent banner with granular controls (analytics / marketing)
- Auto language detection — ES, EN, DE, FR via `navigator.language`
- Floating WhatsApp button with pulse animation
- Page transitions with Framer Motion AnimatePresence
- Privacy policy page (`/privacidad`) — GDPR compliant
- Custom 404 with animated illustration
- SEO: Open Graph, Twitter Card, Schema.org `Dentist` JSON-LD, robots.txt
- Clean build — no demo data, localStorage versioned (auto-wipes stale data on deploy)

---

## Tech stack

| | |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Routing | React Router v7 |
| State | Context API + localStorage |
| i18n | Custom provider — zero dependencies |
| Deploy | Vercel |

---

## Getting started

```bash
git clone https://github.com/itzSecretProject/SmileAtelier.git
cd SmileAtelier
npm install
npm run dev
```

### Customise for a real clinic

1. Replace `ADMIN` credentials in `src/context/AppContext.jsx`
2. Update clinic name, address and phone in `src/i18n/i18n.jsx` and `index.html`
3. Set the WhatsApp number in `src/components/WhatsAppButton.jsx`
4. Add a real `public/og-image.jpg` for social sharing
5. Connect a backend (Supabase, Firebase, etc.) for persistent reservations

---

<div align="center">
Built by <a href="https://github.com/itzSecretProject">itzSecretProject</a>
</div>
