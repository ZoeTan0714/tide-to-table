import logo from "../../../assets/images/logo.png";

export function renderHeader() {
	return `
		<div class="site-header">
			<button class="menu-button" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-menu"><span></span><span></span></button>
			<nav class="site-menu" id="site-menu" aria-label="Main navigation" hidden>
				<a href="products.html">Products</a>
				<a href="contact.html">Contact Us</a>
			</nav>
			<a class="brand" href="index.html" aria-label="Tide to Table home"><img src="${logo}" alt="Tide to Table"></a>
			<a class="header-contact" href="contact.html">Contact Us</a>
		</div>
	`;
}

export function initializeHeader() {
	const siteHeader = document.querySelector(".site-header");
	const menuButton = document.querySelector(".menu-button");
	const siteMenu = document.querySelector(".site-menu");

	const closeMenu = () => {
		menuButton.setAttribute("aria-expanded", "false");
		menuButton.setAttribute("aria-label", "Open menu");
		siteMenu.hidden = true;
	};

	const updateHeaderSurface = () => {
		siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
	};

	window.addEventListener("scroll", updateHeaderSurface, { passive: true });
	updateHeaderSurface();

	menuButton.addEventListener("click", () => {
		const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
		menuButton.setAttribute("aria-expanded", String(!isExpanded));
		menuButton.setAttribute("aria-label", isExpanded ? "Open menu" : "Close menu");
		siteMenu.hidden = isExpanded;
	});

	siteMenu.addEventListener("click", (event) => {
		if (event.target.closest("a")) closeMenu();
	});

	document.addEventListener("click", (event) => {
		if (!event.target.closest(".site-header")) closeMenu();
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") closeMenu();
	});
}