import { pages, site } from "../site.js";

export function escapeHtml(value) {
	return String(value).replace(/[&<>"']/g, (character) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#39;",
	})[character]);
}

const absoluteUrl = (path) => `${site.url}${path}`;

function renderStructuredData(pageKey, extraNodes) {
	const page = pages[pageKey];
	const pageUrl = absoluteUrl(page.path);
	const organization = {
		"@type": "WholesaleStore",
		"@id": `${site.url}/#organization`,
		name: site.name,
		url: `${site.url}/`,
		logo: absoluteUrl("/icon-512.png"),
		image: absoluteUrl("/og-image.jpg"),
		description: pages.home.description,
		email: site.email,
		telephone: site.phone,
		priceRange: "$$",
		address: {
			"@type": "PostalAddress",
			streetAddress: site.address.street,
			addressLocality: site.address.locality,
			postalCode: site.address.postalCode,
			addressCountry: site.address.country,
		},
		areaServed: { "@type": "Country", name: "Singapore" },
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "sales",
			email: site.email,
			telephone: site.phone,
			areaServed: "SG",
			availableLanguage: ["English", "Chinese"],
		},
	};
	const website = {
		"@type": "WebSite",
		"@id": `${site.url}/#website`,
		url: `${site.url}/`,
		name: site.name,
		inLanguage: "en-SG",
		publisher: { "@id": organization["@id"] },
	};
	const webPage = {
		"@type": pageKey === "products" ? "CollectionPage" : pageKey === "contact" ? "ContactPage" : "WebPage",
		"@id": `${pageUrl}#webpage`,
		url: pageUrl,
		name: page.title,
		description: page.description,
		inLanguage: "en-SG",
		isPartOf: { "@id": website["@id"] },
		about: { "@id": organization["@id"] },
		primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl("/og-image.jpg") },
	};
	const graph = [organization, website, webPage];

	if (page.breadcrumb) {
		webPage.breadcrumb = { "@id": `${pageUrl}#breadcrumb` };
		graph.push({
			"@type": "BreadcrumbList",
			"@id": `${pageUrl}#breadcrumb`,
			itemListElement: [
				{ "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
				{ "@type": "ListItem", position: 2, name: page.breadcrumb, item: pageUrl },
			],
		});
	}

	graph.push(...extraNodes);
	// Escape "<" so product copy can never close the script element early.
	return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

export function renderHead(pageKey, extraNodes = []) {
	const page = pages[pageKey];
	const pageUrl = absoluteUrl(page.path);
	const title = escapeHtml(page.title);
	const description = escapeHtml(page.description);
	return `
		<title>${title}</title>
		<meta name="description" content="${description}">
		<meta name="robots" content="index, follow, max-image-preview:large">
		<link rel="canonical" href="${pageUrl}">
		<link rel="icon" type="image/png" sizes="96x96" href="/favicon.png">
		<link rel="apple-touch-icon" href="/apple-touch-icon.png">
		<link rel="manifest" href="/site.webmanifest">
		<meta property="og:type" content="website">
		<meta property="og:site_name" content="${site.name}">
		<meta property="og:locale" content="${site.locale}">
		<meta property="og:title" content="${title}">
		<meta property="og:description" content="${description}">
		<meta property="og:url" content="${pageUrl}">
		<meta property="og:image" content="${absoluteUrl("/og-image.jpg")}">
		<meta property="og:image:width" content="1200">
		<meta property="og:image:height" content="630">
		<meta property="og:image:alt" content="Tide to Table logo over a fishing net full of fresh catch">
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:title" content="${title}">
		<meta name="twitter:description" content="${description}">
		<meta name="twitter:image" content="${absoluteUrl("/og-image.jpg")}">
		<script type="application/ld+json">${renderStructuredData(pageKey, extraNodes)}</script>
	`;
}

export function renderHeader() {
	return `
		<header class="site-header">
			<button class="menu-button" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-menu"><span></span><span></span></button>
			<nav class="site-menu" id="site-menu" aria-label="Main navigation" hidden>
				<a href="/">Home</a>
				<a href="/products/">Products</a>
				<a href="/contact-us/">Contact Us</a>
			</nav>
			<a class="brand" href="/" aria-label="Tide to Table home"><img src="/assets/images/logo.webp" alt="Tide to Table logo" width="320" height="320"></a>
			<a class="header-contact" href="/contact-us/">Contact Us</a>
		</header>
	`;
}

export function renderFooter() {
	return `
		<footer class="site-footer">
			<div class="footer-brand footer-column">
				<a class="footer-logo" href="/" aria-label="Tide to Table home"><img src="/assets/images/logo.webp" alt="Tide to Table logo" width="320" height="320" loading="lazy" decoding="async"></a>
				<p>Copyright © Tide To Table.<br>All rights reserved.</p>
			</div>
			<nav class="footer-links footer-column" aria-labelledby="footer-links-title">
				<h2 id="footer-links-title">Explore</h2>
				<a href="/">Home</a>
				<a href="/products/">Seafood Products</a>
				<a href="/products/?category=seafood-ingredients">Frozen Seafood Ingredients</a>
				<a href="/products/?category=semi-processed">Ready-To-Cook Products</a>
				<a href="/contact-us/">Contact Us</a>
			</nav>
			<section class="footer-contact footer-column" aria-labelledby="footer-contact-title">
				<h2 id="footer-contact-title">Contact</h2>
				<address>
					<p>${site.address.street.replace(", ", " ")}<br>${site.address.locality} ${site.address.postalCode}</p>
					<a href="mailto:${site.email}">${site.email}</a>
					<a href="tel:${site.phone}">${site.phoneDisplay}</a>
				</address>
			</section>
		</footer>
	`;
}
