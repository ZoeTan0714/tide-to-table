import { existsSync } from "node:fs";
import { categories, getProductImageName, getProductsForCategory, products, slugify } from "../data/products.js";
import { pages, site } from "../site.js";
import { escapeHtml, renderFooter, renderHeader } from "./layout.js";

const productImageDirectory = new URL("../../assets/products/", import.meta.url);

function getProductImage(title) {
	const name = getProductImageName(title);
	return existsSync(new URL(`${name}.webp`, productImageDirectory)) ? `/assets/products/${name}.webp` : null;
}

function renderProductCard({ title, description, notes, category, subcategory }, index) {
	const image = getProductImage(title);
	const noteTags = notes?.length
		? `<ul class="product-spec-tags" aria-label="Available specifications">${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>`
		: "";
	// The first row is above the fold on desktop, so only lazy-load the rest.
	const loading = index < 3 ? "" : ' loading="lazy"';
	return `
		<article class="product-card" id="${slugify(title)}" data-category="${category}" data-subcategory="${subcategory}">
			${image
				? `<img src="${image}" alt="${escapeHtml(title)}" width="800" height="600" decoding="async"${loading}>`
				: `<div class="product-card-image-placeholder" role="img" aria-label="Image coming soon for ${escapeHtml(title)}">Image coming soon</div>`}
			<div class="product-card-copy">
				<h3>${escapeHtml(title)}</h3>
				<p>${escapeHtml(description)}</p>
				${noteTags}
			</div>
		</article>
	`;
}

export function getProductsStructuredData() {
	const pageUrl = `${site.url}${pages.products.path}`;
	return [{
		"@type": "ItemList",
		"@id": `${pageUrl}#products`,
		name: "Tide to Table product range",
		numberOfItems: products.length,
		itemListElement: products.map(({ title }, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: title,
			url: `${pageUrl}#${slugify(title)}`,
		})),
	}];
}

export function renderProductsPage() {
	return `
	${renderHeader()}
	<main id="main" class="inner-page products-page">
		<header class="inner-page-heading">
			<p class="page-eyebrow">Tide to Table</p>
			<h1>Our Seafood Products</h1>
			<p>Explore our wholesale range of frozen seafood, premium fish, shellfish and ready-to-cook food products for restaurants, caterers and retailers in Singapore.</p>
		</header>
		<div class="products-layout">
			<aside class="product-categories" aria-labelledby="product-categories-title">
				<h2 id="product-categories-title">Category</h2>
				<nav class="product-category-list" aria-label="Filter products by category">
					${categories.map(({ title, value, level }) => `
						<button class="product-category${level ? " is-subcategory" : ""}${value === "all" ? " is-active" : ""}" type="button" data-category="${value}" aria-pressed="${value === "all"}"${level === 0 && value !== "all" ? ' aria-expanded="false"' : ""}>${escapeHtml(title)} (${getProductsForCategory(value).length})</button>
					`).join("")}
				</nav>
				<nav class="product-category-list product-subcategory-list" aria-label="Subcategories" hidden></nav>
			</aside>
			<section class="product-results" aria-labelledby="product-results-title">
				<h2 class="visually-hidden" id="product-results-title">Product Range</h2>
				<p class="product-result-count" aria-live="polite">${products.length} products</p>
				<div class="product-grid">
					${products.map(renderProductCard).join("")}
					<p class="product-empty-state" hidden>No products in this category yet.</p>
				</div>
			</section>
		</div>
	</main>
	${renderFooter()}
	`;
}
