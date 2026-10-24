import logo from "../../../assets/images/logo.png";

export function renderFooter() {
	return `
		<footer class="site-footer">
			<div class="footer-brand footer-column">
				<a class="footer-logo" href="index.html" aria-label="Tide to Table home"><img src="${logo}" alt="Tide to Table"></a>
				<p>Copyright © Tide To Table.<br>All rights reserved.</p>
			</div>
			<section class="footer-contact footer-column" aria-labelledby="footer-contact-title">
				<h2 id="footer-contact-title">Contact</h2>
				<address>
					<p>808 French Road #04-151 Kitchener Complex<br>Singapore 200808</p>
					<a href="mailto:delphine.lim@tidetotable.com.sg">delphine.lim@tidetotable.com.sg</a>
					<a href="tel:+6590048780">+65 9004 8780</a>
				</address>
			</section>
		</footer>
	`;
}