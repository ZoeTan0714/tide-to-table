import { site } from "../site.js";
import { renderFooter, renderHeader } from "./layout.js";

const strengths = [
	{ name: "High Quality", image: "strength-high-quality", width: 268, height: 439 },
	{ name: "Freshness", image: "strength-freshness", width: 320, height: 430 },
	{ name: "Hygienic", image: "strength-hygienic", width: 267, height: 439 },
	{ name: "Shelf-Life Management", image: "strength-shelf-life", width: 311, height: 439 },
];

const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.street}, Singapore ${site.address.postalCode}`)}`;

export function renderContactPage() {
	return `
	${renderHeader()}
	<main id="main" class="inner-page contact-page">
		<header class="inner-page-heading">
			<p class="page-eyebrow">Tide to Table</p>
			<h1>Contact Us</h1>
			<p>We would be glad to hear from you about our wholesale seafood products and supply capabilities in Singapore.</p>
		</header>
		<section class="contact-strengths" aria-labelledby="contact-strengths-title">
			<h2 class="visually-hidden" id="contact-strengths-title">Our Strengths</h2>
			${strengths.map(({ name, image, width, height }) => `<img src="/assets/images/${image}.webp" alt="${name}" width="${width}" height="${height}" decoding="async">`).join("")}
		</section>
		<div class="contact-details">
			<section>
				<h2>Visit Us</h2>
				<address>${site.address.street.replace(", ", " ")}<br>${site.address.locality} ${site.address.postalCode}</address>
				<a href="${mapUrl}" target="_blank" rel="noopener">View on Google Maps</a>
			</section>
			<section>
				<h2>Get in Touch</h2>
				<a href="mailto:${site.email}">${site.email}</a>
				<a href="tel:${site.phone}">${site.phoneDisplay}</a>
			</section>
		</div>
	</main>
	${renderFooter()}
	`;
}
