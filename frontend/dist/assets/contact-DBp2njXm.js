import{r as s,a,i as n}from"./header-DgfJs2-E.js";const r=""+new URL("strength 1-1yEBdwLK.png",import.meta.url).href,i=""+new URL("strength 2-obpSXvtG.png",import.meta.url).href,o=""+new URL("strength 3-CsijDMR3.png",import.meta.url).href,g=""+new URL("strength 4-BU9Gsl8E.png",import.meta.url).href,l=Object.entries(Object.assign({"../../../assets/images/strength 1.png":r,"../../../assets/images/strength 2.png":i,"../../../assets/images/strength 3.png":o,"../../../assets/images/strength 4.png":g})).sort(([e],[t])=>e.localeCompare(t)).map(([,e])=>e);document.querySelector("#app").innerHTML=`
	${s()}
	<section class="inner-page contact-page">
		<header class="inner-page-heading">
			<p class="page-eyebrow">Tide to Table</p>
			<h1>Contact Us</h1>
			<p>We would be glad to hear from you about our products and supply capabilities.</p>
		</header>
		<div class="contact-strengths" aria-label="Our strengths">
			${l.map((e,t)=>`<img src="${e}" alt="Tide to Table strength ${t+1}">`).join("")}
		</div>
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
	${a()}
`;n();
