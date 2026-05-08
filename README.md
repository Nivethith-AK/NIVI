# NIVI Energy Drink

A bold, modern landing page for an energy drink brand. The site uses a deep charcoal base, vibrant pink accents, smooth motion, and a premium product-first layout designed to feel polished on GitHub and in the browser.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.x-ff0055)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed%20with-Vercel-black?logo=vercel)](https://vercel.com/)

## Overview

NIVI Energy Drink is a marketing site built with the Next.js App Router. It includes an animated hero, product carousel, feature cards, community/feed sections, and a social call-to-action footer. The layout is already opinionated and production-shaped, so the main things you will usually change are the brand name, colors, images, and copy.

## Features

- Animated hero section with a floating hero product shot
- Product carousel for flavor or variant storytelling
- Bento-style feature grid with motion and hover states
- Community and Instagram-style visual feed sections
- Smooth scrolling and subtle interaction effects
- Responsive layout for desktop and mobile
- Clean component structure for quick branding updates

## Homepage Preview

![NIVI Energy Drink Full Website Preview](public/readme-homepage.png)

**Full website screenshot** showing the complete landing page from hero section to footer. This is a live capture of the current local build running on port 3001.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lenis
- Vercel Analytics

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run on a different port:

```bash
npm run dev -- -p 3001
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Run linting:

```bash
npm run lint
```

## Project Structure

- `app/` - App Router pages, root layout, and global styles
- `components/` - Landing page sections and reusable UI pieces
- `hooks/` - Shared React hooks
- `lib/` - Utility helpers
- `public/` - Static assets such as product and lifestyle images
- `styles/` - Global stylesheet source

## Customization Guide

If you want to rebrand the site, start here:

- `app/layout.tsx` - page title, metadata, and theme color
- `app/globals.css` - global design tokens and color system
- `components/hero-section.tsx` - hero copy and product image
- `components/flavor-carousel.tsx` - variant cards and carousel content
- `components/lifestyle-section.tsx` - social-style image grid and captions
- `components/social-section.tsx` - Instagram-style gallery and CTA
- `public/` - replace product photos and lifestyle images

## Content Notes

- The site is currently branded as NIVI Energy Drink.
- Local development was verified on port `3001`.
- The gallery assets in `public/` are already wired into the feed sections.
- You can replace the product image set without changing the component structure.

## Suggested Improvements

If you want to take the README even further, add any of the following:

- A short deployment section for Vercel or GitHub Pages
- Brand color tokens with hex values
- A section showing where to edit text and images
- A live demo link once deployed

## License

This project is ready to use as a custom landing page template. Add your preferred license before publishing publicly.
