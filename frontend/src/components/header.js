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