# The Insurance Provider (Clone)

A Next.js replica of [The Insurance Provider](https://www.theinsuranceprovider.com/) — matching layout, navigation, and styling, with article content loaded from the live WordPress REST API.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage (hero, coverage, blog feed, testimonials) |
| `/auto-insurance` | Auto insurance articles |
| `/home-insurance` | Home insurance articles |
| `/health-insurance` | Health insurance articles |
| `/business-insurance` | Business insurance articles |
| `/contact-us` | Contact page |
| `/privacy-policy` | Privacy policy |
| `/terms-of-services` | Terms of service |
| `/[slug]` | Individual blog posts (~9,900 articles via WP API) |
| `/page/2` | Homepage blog pagination |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Notes

- Images in `public/images/` are from the original site.
- Blog posts are fetched at request time from `https://www.theinsuranceprovider.com/wp-json/wp/v2` (cached for 1 hour).
- Contact/newsletter forms are UI-only (no backend).
