# Humba Logistics Website

**Humba Logistics Pvt Ltd** — Moving Today. Building Tomorrow. Connecting Africa.

A responsive Angular website for a transport and logistics company based in Harare, Zimbabwe.

---

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Hero banner with tagline, stats bar, services overview, why choose us, CTA |
| `/about` | **About** | Company story, vision & mission, operations workflow, competitive advantage |
| `/services` | **Services** | Goods transport, removals, construction logistics with feature breakdowns |
| `/fleet` | **Our Fleet** | 6 truck cards with images, specs (capacity, dimensions, max load), growth roadmap |
| `/investors` | **Investors** | Executive summary, market opportunity, business model, financial outlook, strategy timeline |
| `/contact` | **Contact** | Contact info, operating hours, inquiry form with validation and success state |
| `/messages` | **Admin Messages** | Password-protected page to view customer inquiries (hidden, not linked in navigation) |

---

## Tech Stack

- **Angular 21** (standalone components, lazy-loaded routes)
- **TypeScript**
- **CSS** (custom properties for brand colors, responsive grid layouts)
- No external UI libraries — all custom built

---

## Brand Colors

| Role | Color | Hex |
|------|-------|-----|
| Primary (navy) | Headers, nav, backgrounds | `#021323` |
| Accent (orange) | Buttons, CTAs, highlights | `#F47920` |
| White | Cards, sections | `#FFFFFF` |
| Light gray | Backgrounds | `#F8F9FA` |

Fonts: **Outfit** (headings) and **Inter** (body)

---

## Fleet

| Truck | Type | Capacity | Image |
|-------|------|----------|-------|
| Humba LightRunner | Light Delivery | 1.5 Tons | `lightRunner.png` |
| Humba Mover X2 | Medium Transport | 4 Tons | `mover.png` |
| Humba Titan Cargo | Heavy Transport | 10 Tons | `titan cargo.png` |
| Humba FlatMaster | Flatbed / Construction | 8 Tons | `flatmaster.png` |
| Humba ChillTrans | Refrigerated Transport | 3 Tons | `chills.png` |
| Humba SwiftVan | Small Van | 800 kg | `swift.png` |

Images are stored in `public/trucks/`.

---

## Admin Messages Page

Access at `/messages`. Not linked in navigation — click the subtle "Admin" text in the footer.

**Default password:** `humba2025`

**Change password:** After logging in, click the **Settings** button and enter current + new password. The new password is saved to your browser's `localStorage`.

**Important:** Messages are stored in `localStorage` of the device that submits the form (frontend-only). To receive messages across devices, connect a form backend (see Form Submission below).

---

## Form Submission

The contact form saves to `localStorage` under the key `humba_messages`.

To receive messages in your email inbox, connect a free service:

### Option: Web3Forms (free, no code change needed)
1. Sign up at [web3forms.com](https://web3forms.com)
2. Get your Access Key
3. The contact form can be updated to POST to their API

### Option: Formspree (free)
1. Create an account at [formspree.io](https://formspree.io)
2. Get your form endpoint URL
3. Update the contact component to POST to that URL

---

## File Structure

```
humba-web/
├── public/
│   ├── favicon.ico
│   ├── logo.jpeg
│   └── trucks/
│       ├── lightRunner.png
│       ├── mover.png
│       ├── titan cargo.png
│       ├── flatmaster.png
│       ├── chills.png
│       └── swift.png
├── src/
│   ├── index.html
│   ├── styles.css              # Global styles, CSS variables, animations
│   └── app/
│       ├── app.ts              # Root component
│       ├── app.html            # Layout: header + router-outlet + footer
│       ├── app.routes.ts       # All route definitions
│       ├── app.config.ts       # App configuration
│       ├── pages/
│       │   ├── home/           # Home page
│       │   ├── about/          # About page
│       │   ├── services/       # Services page
│       │   ├── fleet/          # Fleet page with truck data
│       │   ├── investor/       # Investor pitch page
│       │   ├── contact/        # Contact form with Reactive Forms
│       │   └── messages/       # Admin messages page with password gate
│       └── shared/
│           ├── header/         # Site header with nav
│           ├── footer/         # Site footer with links
│           ├── truck-card/     # Reusable truck card component
│           └── appear.ts       # Scroll-reveal animation directive
├── angular.json
├── package.json
└── tsconfig.json
```

---

## Development Commands

```bash
# Install dependencies
npm install

# Run locally
ng serve
# Opens at http://localhost:4200

# Build for production
ng build
# Output to dist/humba-web/
```

---

## Deployment

Build output: `dist/humba-web/browser/`

### Netlify (recommended, free)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `dist/humba-web/browser` folder onto the page
3. You get a public URL like `humba-logistics.netlify.app`
4. To use a custom domain, go to Domain Settings in Netlify

### Any static host (free options)
- **Vercel:** `vercel --prod` or drag-drop
- **GitHub Pages:** Push to a repo, enable Pages in Settings
- **Cloudflare Pages:** Connect repo or drag-drop

---

## Features

- Fully responsive (mobile, tablet, desktop)
- Scroll-reveal animations on sections and cards
- Lazy-loaded routes for fast initial load
- SEO meta tags (Open Graph, Twitter Card)
- Custom favicon from company logo
- Contact form with real-time validation
- Password-protected admin messages panel
- Animated mobile navigation with backdrop overlay
- 6 distinct truck cards with specs and images
- Investor pitch drawn from company PDFs

---

Humba Logistics Pvt Ltd — Harare, Zimbabwe
