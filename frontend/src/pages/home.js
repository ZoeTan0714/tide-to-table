import "../style.css";

import bap from "../../../assets/images/license 1.png";
import brc from "../../../assets/images/license 2.png";
import haccp from "../../../assets/images/license 3.png";
import halal from "../../../assets/images/license 4.png";
import bizsafe from "../../../assets/images/license 5.png";
import dimSumFood from "../../../assets/images/dim sum food.png";
import frozenFood from "../../../assets/images/2 frozen food.png";
import whyImage1 from "../../../assets/images/why choose us 1.png";
import whyImage2 from "../../../assets/images/why choose us 2.png";
import whyImage3 from "../../../assets/images/why choose us 3.png";
import whyImage4 from "../../../assets/images/why choose us 4.png";
import homepageBackground from "../../../assets/images/homepage backgrounf.png";
import { renderFooter } from "../components/footer.js";
import { initializeHeader, renderHeader } from "../components/header.js";

const certificates = [
	{ name: "BAP certified", image: bap, className: "bap" },
	{ name: "HACCP food safety certified", image: haccp, className: "haccp" },
	{ name: "Halal food certified", image: halal, className: "halal" },
	{ name: "BRC global standards", image: brc, className: "brc" },
	{ name: "bizSAFE level 3", image: bizsafe, className: "bizsafe" },
];

const categories = [
	{ title: "Dim Sum Food", image: dimSumFood, alt: "Dim sum food selection" },
	{ title: "Frozen Seafood", image: frozenFood, alt: "Frozen seafood selection" },
	{ title: "Japanese", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85", alt: "Traditional Japanese street at dusk" },
	{ title: "Ready-To-Cook", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85", alt: "Salmon ready to cook" },
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

document.querySelector("#app").innerHTML = `
	${renderHeader()}
	<header class="hero">
		<img class="hero-image" src="${homepageBackground}" alt="Fishing nets and catch on the water">
		<div class="hero-message" id="top">
			<h1>Widest Selection<br>of Seafood Items on Offer</h1>
			<a class="hero-contact" href="contact.html">Contact Us</a>
		</div>
	</header>

	<section class="certificates" aria-label="Our quality certifications">
		${certificates.map(({ name, image, className }) => `<div class="certificate ${className}"><img src="${image}" alt="${name}"></div>`).join("")}
	</section>

	<section class="statement" aria-label="Our supply chain expertise">
		<span class="quote-mark" aria-hidden="true">“</span>
		<p>Leveraging production expertise across China, Vietnam, India, and Ecuador,<br class="desktop-break"> we integrate raw materials, manage production, and ensure <strong>top-notch quality control</strong><br class="desktop-break"> across the entire supply chain.</p>
		<span class="quote-mark closing" aria-hidden="true">”</span>
	</section>

	<section class="categories" aria-label="Product categories">
		${categories.map(({ title, image, alt }) => `<div class="category"><img src="${image}" alt="${alt}"><span>${title}</span></div>`).join("")}
	</section>

	<section class="why" aria-labelledby="why-title">
		<h2 id="why-title">Why Choose Us</h2>
		<div class="process-grid">
			<article class="process-panel purchasing-panel">
				<img src="${whyImage1}" alt="Fresh seafood beside a blue information panel">
				<div class="panel-copy">${icon("cart")}<span class="step-title"><b>01.</b> Purchasing</span><p>Strategic sourcing from<br>trusted suppliers</p></div>
			</article>
			<article class="process-panel warehousing-panel">
				<img src="${whyImage3}" alt="Warehouse beside a yellow information panel">
				<div class="panel-copy">${icon("warehouse")}<span class="step-title"><b>02.</b> Warehousing</span><p>Secure and efficient<br>inventory management</p></div>
			</article>
			<article class="process-panel logistics-panel">
				<img src="${whyImage2}" alt="Cargo ship beside a yellow information panel">
				<div class="panel-copy">${icon("ship")}<span class="step-title"><b>03.</b> Logistics</span><p>Integrated and optimized<br>transportation solutions</p></div>
			</article>
			<article class="process-panel distribution-panel">
				<img src="${whyImage4}" alt="Delivery worker beside a blue information panel">
				<div class="panel-copy">${icon("nodes")}<span class="step-title"><b>04.</b> Distribution</span><p>A reliable distribution<br>network</p></div>
			</article>
			<div class="distribution-badge">${icon("truck")}<strong><b>05.</b> Distribution</strong><span>Flexible delivery solutions<br>ensure products arrive<br>safely and on time</span></div>
		</div>
	</section>
	${renderFooter()}
`;

initializeHeader();
