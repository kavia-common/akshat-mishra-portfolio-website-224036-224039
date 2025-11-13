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

### Troubleshooting

- If you see "Something went wrong. Please try again later.", verify:
  - NEXT_PUBLIC_CONTACT_ENDPOINT is set to a valid Formspree endpoint URL (preferred), OR
  - If using EmailJS, ensure all of NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY are set and Formspree is not configured.
- CORS: The app uses fetch with mode: cors; Formspree returns JSON when Accept: application/json is present. Ensure your endpoint is correct.
- Honeypot: The hidden "company" field should remain hidden. If bots fill it, the app will silently succeed without sending the request.
- Logs: In development (NEXT_PUBLIC_NODE_ENV !== production), minimal console logs are printed with prefix [ContactForm] to help diagnose issues.

## Customization

- Edit data in src/lib/content.ts
- Update theme in src/app/globals.css
- Components in src/components

## Accessibility

- Focus-visible styles, skip-to-content, semantic landmarks, aria-current on active nav item, and color contrast mindful defaults.

## SEO

- Metadata, Open Graph/Twitter tags, sitemap.ts, and optional canonical URL using NEXT_PUBLIC_FRONTEND_URL.
