import "../style.css";

import { renderFooter } from "../components/footer.js";
import { initializeHeader, renderHeader } from "../components/header.js";

document.querySelector("#app").innerHTML = `
	${renderHeader()}
	<section class="inner-page contact-page">
		<header class="inner-page-heading">
			<p class="page-eyebrow">Tide to Table</p>
			<h1>Contact Us</h1>
			<p>We would be glad to hear from you about our products and supply capabilities.</p>
		</header>
		<div class="contact-details">
			<section>
				<h2>Visit Us</h2>
				<address>808 French Road #04-151 Kitchener Complex<br>Singapore 200808</address>
			</section>
			<section>
				<h2>Get in Touch</h2>
				<a href="mailto:delphine.lim@tidetotable.com.sg">delphine.lim@tidetotable.com.sg</a>
				<a href="tel:+6590048780">+65 9004 8780</a>
			</section>
		</div>
	</section>
	${renderFooter()}
`;

initializeHeader();
