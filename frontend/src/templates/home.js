import { renderFooter, renderHeader } from "./layout.js";

const certificates = [
	{ name: "BAP (Best Aquaculture Practices) certified", image: "cert-bap", className: "bap", width: 268, height: 120 },
	{ name: "HACCP food safety certified", image: "cert-haccp", className: "haccp", width: 121, height: 120 },
	{ name: "Halal food certified", image: "cert-halal", className: "halal", width: 124, height: 120 },
	{ name: "BRC Global Standards certified", image: "cert-brc", className: "brc", width: 87, height: 120 },
	{ name: "bizSAFE Level 3", image: "cert-bizsafe", className: "bizsafe", width: 189, height: 103 },
];

const categories = [
	{ title: "Dim Sum Food", image: "category-dim-sum", alt: "Steamed dumplings in a bamboo dim sum steamer", href: "/products/", height: 426 },
	{ title: "Frozen Seafood", image: "category-frozen-seafood", alt: "Frozen seafood selection", href: "/products/?category=seafood-ingredients", height: 427 },
	{ title: "Japanese", image: "category-japanese", alt: "Red Japanese paper lanterns at night", href: "/products/?category=japanese-product", height: 423 },
	{ title: "Ready-To-Cook", image: "category-ready-to-cook", alt: "Fresh salmon fillets ready to cook", href: "/products/?category=semi-processed", height: 358 },
];

const icon = (name) => {
	const paths = {
		cart: '<path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 1.9-1.4L22 8H6"/><circle cx="10" cy="21" r="1"/><circle cx="18" cy="21" r="1"/>',
		warehouse: '<path d="m3 10 9-7 9 7v11h-6v-7H9v7H3z"/><path d="M7 11h10"/>',
		ship: '<path d="M3 16h18l-2 4H7zM5 16l2-8h10l2 8M10 8V4h4v4M2 22c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1"/>',
		nodes: '<circle cx="12" cy="12" r="2"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="m7 6 3.5 4.5M17 6l-3.5 4.5M7 18l3.5-4.5M17 18l-3.5-4.5"/>',
		truck: '<path d="M3 6h11v12H3zM14 10h4l3 3v5h-7z"/><circle cx="7.5" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>',
	};
	return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
};

const lazy = 'loading="lazy" decoding="async"';

export function renderHomePage() {
	return `
	${renderHeader()}
	<main id="main">
		<section class="hero">
			<img class="hero-image" src="/assets/images/hero-seafood-catch.webp" alt="Fishing net full of fresh catch being landed on a boat" width="1260" height="844" fetchpriority="high">
			<div class="hero-message" id="top">
				<h1>Widest Selection<br>of Seafood Items on Offer</h1>
				<p class="hero-tagline">Frozen seafood supplier &amp; wholesaler in Singapore</p>
				<a class="hero-contact" href="/contact-us/">Contact Us</a>
			</div>
		</section>

		<section class="certificates" aria-labelledby="certificates-title">
			<h2 class="visually-hidden" id="certificates-title">Quality Certifications</h2>
			${certificates.map(({ name, image, className, width, height }) => `<div class="certificate ${className}"><img src="/assets/images/${image}.webp" alt="${name}" width="${width}" height="${height}"></div>`).join("")}
		</section>

		<section class="statement" aria-labelledby="statement-title">
			<h2 class="visually-hidden" id="statement-title">Our Supply Chain Expertise</h2>
			<span class="quote-mark" aria-hidden="true">“</span>
			<p>Leveraging production expertise across China, Vietnam, India, and Ecuador,<br class="desktop-break"> we integrate raw materials, manage production, and ensure <strong>top-notch quality control</strong><br class="desktop-break"> across the entire supply chain.</p>
			<span class="quote-mark closing" aria-hidden="true">”</span>
		</section>

		<section class="categories" aria-labelledby="categories-title">
			<h2 class="visually-hidden" id="categories-title">Product Categories</h2>
			${categories.map(({ title, image, alt, href, height }) => `<a class="category" href="${href}"><img src="/assets/images/${image}.webp" alt="${alt}" width="640" height="${height}" ${lazy}><span>${title}</span></a>`).join("")}
		</section>

		<section class="why" aria-labelledby="why-title">
			<h2 id="why-title">Why Choose Us</h2>
			<div class="process-grid">
				<article class="process-panel purchasing-panel">
					<img src="/assets/images/why-purchasing.webp" alt="Fresh seafood sourced from trusted suppliers" width="596" height="333" ${lazy}>
					<div class="panel-copy">${icon("cart")}<h3 class="step-title"><b>01.</b> Purchasing</h3><p>Strategic sourcing from<br>trusted suppliers</p></div>
				</article>
				<article class="process-panel warehousing-panel">
					<img src="/assets/images/why-warehousing.webp" alt="Cold storage warehouse for frozen seafood" width="596" height="334" ${lazy}>
					<div class="panel-copy">${icon("warehouse")}<h3 class="step-title"><b>02.</b> Warehousing</h3><p>Secure and efficient<br>inventory management</p></div>
				</article>
				<article class="process-panel logistics-panel">
					<img src="/assets/images/why-logistics.webp" alt="Cargo ship transporting seafood containers" width="596" height="333" ${lazy}>
					<div class="panel-copy">${icon("ship")}<h3 class="step-title"><b>03.</b> Logistics</h3><p>Integrated and optimized<br>transportation solutions</p></div>
				</article>
				<article class="process-panel distribution-panel">
					<img src="/assets/images/why-distribution.webp" alt="Delivery worker unloading boxed orders from a van" width="596" height="334" ${lazy}>
					<div class="panel-copy">${icon("nodes")}<h3 class="step-title"><b>04.</b> Distribution</h3><p>A reliable distribution<br>network</p></div>
				</article>
				<div class="distribution-badge">${icon("truck")}<strong><b>05.</b> Delivery</strong><span>Flexible delivery solutions<br>ensure products arrive<br>safely and on time</span></div>
			</div>
		</section>
	</main>
	${renderFooter()}
	`;
}
