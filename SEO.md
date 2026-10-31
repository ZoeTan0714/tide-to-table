# SEO notes — Tide to Table

## What was changed (2026-10-31)

| Area | Before | After |
|---|---|---|
| Rendering | Every page was an empty `<main id="app">` filled in by JavaScript | All three pages are prerendered to static HTML at build time (`vite.config.js` → `src/templates/`). Crawlers and social previews see the full content without running JS |
| URLs | `/products.html`, `/contact.html` | `/products/`, `/contact-us/`, the same URLs the old WordPress site already had indexed |
| Image weight | ~112 MB of PNG (3 MB per product photo) | ~3.5 MB of WebP (products 800×600, ~50 KB each) |
| Image markup | No `width`/`height`, no lazy loading, generic alts ("Tide to Table strength 1"), 2 images hot-linked from Unsplash | Explicit dimensions (no layout shift), `loading="lazy"` below the fold, `fetchpriority="high"` on the hero, descriptive alts, all images local |
| Image file names | `homepage backgrounf.png`, `why choose us 1.png` … | Descriptive kebab-case: `hero-seafood-catch.webp`, `why-purchasing.webp` … |
| Titles / descriptions | Short, no keywords or location | Keyword + location titles (≤60 chars) and descriptions (≤160 chars), edited in `src/site.js` |
| Meta | None | Canonical, robots, Open Graph, Twitter card, favicon, apple-touch-icon, web manifest, `lang="en-SG"` |
| Structured data | None | JSON-LD `WholesaleStore` (address, phone, email), `WebSite`, `WebPage`/`CollectionPage`/`ContactPage`, `BreadcrumbList`, `ItemList` of products |
| Semantics | Header, nav and footer were all inside `<main>`; sections had no headings | `<header>` / `<main>` / `<footer>` landmarks; one `<h1>` per page; every section has an `<h2>` (visually hidden where the design has none); product names are `<h3>` |
| Internal links | Home category tiles were not links; footer had no navigation | Category tiles link to the filtered product list; footer has an "Explore" nav; product filter is reflected in `?category=` |
| Crawl files | None | `robots.txt`, `sitemap.xml`, `404.html` (noindex) |
| Server (`public/.htaccess`) | n/a | HTTPS + non-www redirect, `index.html` → `/`, **301 redirects for every old WordPress URL**, 410 for theme demo/junk pages, gzip, 1-year caching for hashed assets |
| Fonts | Unused Manrope loaded; font CSS blocked rendering | Only Almarai 400/700, loaded without blocking first paint |

## What you still need to do

1. **Deploy `frontend/dist/`** (including the hidden `.htaccess`) to the Hostinger web root, replacing WordPress. Back up WordPress first.
2. **Google Search Console**: verify `tidetotable.com.sg`, submit `https://tidetotable.com.sg/sitemap.xml`, then use URL Inspection on `/`, `/products/` and `/contact-us/`. Over the following weeks, check "Pages" for 404s from old URLs that aren't covered in `.htaccess`.
3. **Google Business Profile**: create or claim a profile with the exact same name, address and phone as the site (808 French Road #04-151, Kitchener Complex, Singapore 200808 · +65 9004 8780). For local search this matters more than anything on the page.
4. **Bing Webmaster Tools**: import the site from Search Console.
5. Test with the [Rich Results Test](https://search.google.com/test/rich-results) and the [PageSpeed Insights](https://pagespeed.web.dev/) after deploy.

## Recommended next steps (content)

- **Homepage copy is thin.** Add 150–300 words of real text: who you supply (restaurants, hotels, caterers, retailers), where you source from, delivery coverage in Singapore, and minimum order or wholesale terms.
- **An About / Supply Chain page.** The old site had `/about-us/` and `/supply-chain/`; they currently 301 to the homepage. A real page about sourcing, certifications and cold-chain handling would rank for those searches again.
- **Individual product pages** (e.g. `/products/snow-crab/`) would let each product rank on its own ("frozen snow crab supplier Singapore"). The template system makes this straightforward to add later.
- Add **opening hours** to `src/site.js` and the `WholesaleStore` JSON-LD once confirmed.
- Missing product photo: `assets/products/samba.webp` exists but no product uses it.

## Where to edit

- Titles, descriptions, business details: `frontend/src/site.js`
- Product list: `frontend/src/data/products.js` (image file = slug of the title, in `frontend/assets/products/`)
- Page markup: `frontend/src/templates/*.js`
- Update `<lastmod>` in `frontend/public/sitemap.xml` when content changes.
