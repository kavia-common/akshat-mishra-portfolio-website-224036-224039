# Akshat Mishra – Portfolio (Next.js, static export)

A single-page portfolio with sections for Home, About, Experience, Projects, Skills, Education, Certificates, and Contact. Built with Next.js App Router, Tailwind CSS, and exported statically.

## Quick start

1) Install deps
   npm i

2) Set up environment
   - Copy .env.example to .env and set:
     - NEXT_PUBLIC_FRONTEND_URL (e.g., https://your-domain.com)
     - NEXT_PUBLIC_CONTACT_ENDPOINT: your Formspree endpoint (e.g., https://formspree.io/f/abcde)
     - Optional EmailJS (to use instead of Formspree):
       NEXT_PUBLIC_EMAILJS_SERVICE_ID
       NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
       NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

3) Replace assets
   - public/profile.jpg with your photo
   - public/resume.pdf with your resume
   - public/favicon.ico

4) Run
   npm run dev

5) Build static site
   npm run build (output: export)

## Contact form

- Default: Formspree POST to NEXT_PUBLIC_CONTACT_ENDPOINT keeps static export friendly.
- Alternative: EmailJS if NEXT_PUBLIC_EMAILJS_* env vars are present. No extra client package required; the app posts to EmailJS REST API directly.
- Includes honeypot field and a simple sessionStorage rate limit.

## Customization

- Edit data in src/lib/content.ts
- Update theme in src/app/globals.css
- Components in src/components

## Accessibility

- Focus-visible styles, skip-to-content, semantic landmarks, aria-current on active nav item, and color contrast mindful defaults.

## SEO

- Metadata, Open Graph/Twitter tags, sitemap.ts, and optional canonical URL using NEXT_PUBLIC_FRONTEND_URL.
