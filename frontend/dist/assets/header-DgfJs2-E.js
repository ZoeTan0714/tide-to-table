(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=a(t);fetch(t.href,e)}})();const s=""+new URL("logo-BaNkg8fN.png",import.meta.url).href;function c(){return`
		<footer class="site-footer">
			<div class="footer-brand footer-column">
				<a class="footer-logo" href="index.html" aria-label="Tide to Table home"><img src="${s}" alt="Tide to Table"></a>
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
	`}function l(){return`
		<div class="site-header">
			<button class="menu-button" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-menu"><span></span><span></span></button>
			<nav class="site-menu" id="site-menu" aria-label="Main navigation" hidden>
				<a href="products.html">Products</a>
				<a href="contact.html">Contact Us</a>
			</nav>
			<a class="brand" href="index.html" aria-label="Tide to Table home"><img src="${s}" alt="Tide to Table"></a>
			<a class="header-contact" href="contact.html">Contact Us</a>
		</div>
	`}function d(){const i=document.querySelector(".site-header"),r=document.querySelector(".menu-button"),a=document.querySelector(".site-menu"),o=()=>{r.setAttribute("aria-expanded","false"),r.setAttribute("aria-label","Open menu"),a.hidden=!0},t=()=>{i.classList.toggle("is-scrolled",window.scrollY>12)};window.addEventListener("scroll",t,{passive:!0}),t(),r.addEventListener("click",()=>{const e=r.getAttribute("aria-expanded")==="true";r.setAttribute("aria-expanded",String(!e)),r.setAttribute("aria-label",e?"Open menu":"Close menu"),a.hidden=e}),a.addEventListener("click",e=>{e.target.closest("a")&&o()}),document.addEventListener("click",e=>{e.target.closest(".site-header")||o()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&o()})}export{c as a,d as i,l as r};
