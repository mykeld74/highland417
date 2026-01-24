# Highland 417

Business I.T. Systems & Security website. Technology that works quietly, securely, and reliably—so your team can focus on the business.

## Tech Stack

- **Framework**: SvelteKit 2.x with Svelte 5
- **Language**: TypeScript
- **Styling**: CSS with custom variables and design system
- **Deployment**: Cloudflare Pages
- **Package Manager**: pnpm

## Project Structure

```
src/
├── routes/              # SvelteKit pages
│   ├── +page.svelte    # Home page
│   ├── services/       # Services page
│   ├── approach/       # Approach page
│   └── contact/        # Contact page
├── components/         # Reusable Svelte components
│   ├── Nav.svelte     # Navigation component
│   ├── Icon.svelte    # Icon component
│   └── IconsSprite.svelte
├── css/               # Global styles
│   ├── reset.css     # CSS reset
│   └── styles.css    # Global CSS with design system
└── images/           # Static images and SVG assets

static/                # Static assets served at root
```

## Design System

The site uses a carefully crafted design system with:

- **Typography**: Playfair Display (headings) and Inter (body text)
- **Color Palette**: Dark background with warm, professional accent colors
- **Layout**: Responsive grid system with consistent spacing
- **Effects**: Grain texture overlay and subtle vignette for depth

## Development

Install dependencies:

```sh
pnpm install
```

Start the development server:

```sh
pnpm dev
```

The site will be available at `http://localhost:5173`

## Building

Create a production build:

```sh
pnpm build
```

Preview the production build locally:

```sh
pnpm preview
```

## Deployment

The site is configured for deployment to Cloudflare Pages using the `@sveltejs/adapter-cloudflare` adapter.

```sh
pnpm build
wrangler pages deploy .svelte-kit/cloudflare
```

## Code Quality

- **Linting**: ESLint with Svelte plugin
- **Formatting**: Prettier with Svelte plugin
- **Type Checking**: TypeScript with `svelte-check`

Run checks:

```sh
pnpm check        # Type checking
pnpm lint         # Linting
pnpm format       # Format code
```

## Pages

- **Home** (`/`) - Hero section, features overview, and call-to-action
- **Services** (`/services`) - Detailed service offerings across four categories
- **Approach** (`/approach`) - Philosophy and methodology
- **Contact** (`/contact`) - Contact information and inquiry form
