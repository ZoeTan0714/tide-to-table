import "../style.css";

import { initializeHeader } from "../components/header.js";

// Product cards and category buttons are prerendered; this script only filters them.
const productCards = [...document.querySelectorAll(".product-card")];
const emptyState = document.querySelector(".product-empty-state");
const resultCount = document.querySelector(".product-result-count");
const categoryButtons = document.querySelectorAll(".product-category");
const mobileCategoryButtons = [...categoryButtons].filter((button) => !button.classList.contains("is-subcategory"));
const subcategoryList = document.querySelector(".product-subcategory-list");

// Subcategory buttons follow their parent category button in the prerendered list.
const categories = [...categoryButtons].map((button) => ({
	value: button.dataset.category,
	label: button.textContent,
	level: button.classList.contains("is-subcategory") ? 1 : 0,
}));
categories.forEach((category, index) => {
	if (category.level === 1) category.parent = categories.slice(0, index).findLast(({ level }) => level === 0).value;
});

let selectedCategory = "all";
let expandedCategory = null;

function updateCategorySelection() {
	const selected = categories.find(({ value }) => value === selectedCategory);
	categoryButtons.forEach((button) => {
		const isActive = button.dataset.category === selectedCategory;
		button.classList.toggle("is-active", isActive);
		button.setAttribute("aria-pressed", String(isActive));
	});
	mobileCategoryButtons.forEach((button) => {
		const value = button.dataset.category;
		const isActive = value === selectedCategory || (selected?.level === 1 && selected.parent === value);
		button.classList.toggle("is-active", Boolean(isActive));
		button.setAttribute("aria-pressed", String(isActive));
		if (value !== "all") button.setAttribute("aria-expanded", String(value === expandedCategory));
	});

	const subcategories = categories.filter(({ parent }) => parent === expandedCategory);
	subcategoryList.hidden = subcategories.length === 0;
	subcategoryList.innerHTML = subcategories.map(({ label, value }) => `
		<button class="product-category is-subcategory${value === selectedCategory ? " is-active" : ""}" type="button" data-category="${value}" aria-pressed="${value === selectedCategory}">${label}</button>
	`).join("");
}

function renderProducts(category = "all") {
	let visibleCount = 0;
	productCards.forEach((card) => {
		const isVisible = category === "all" || card.dataset.category === category || card.dataset.subcategory === category;
		card.hidden = !isVisible;
		if (isVisible) visibleCount += 1;
	});
	emptyState.hidden = visibleCount > 0;
	resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? "product" : "products"}`;

	// Keep the filter in the URL so category links can be shared; the canonical URL stays /products/.
	const url = new URL(window.location.href);
	if (category === "all") url.searchParams.delete("category");
	else url.searchParams.set("category", category);
	window.history.replaceState(null, "", url);
}

function selectCategory(value) {
	selectedCategory = value;
	expandedCategory = null;
	updateCategorySelection();
	renderProducts(value);
}

categoryButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const value = button.dataset.category;
		const category = categories.find(({ value: categoryValue }) => categoryValue === value);
		if (window.matchMedia("(max-width: 760px)").matches && category?.level === 0 && value !== "all") {
			const hasSubcategories = categories.some(({ parent }) => parent === value);
			selectedCategory = value;
			expandedCategory = hasSubcategories && expandedCategory !== value ? value : null;
			updateCategorySelection();
			renderProducts(value);
			return;
		}
		selectCategory(value);
	});
});

subcategoryList.addEventListener("click", (event) => {
	const button = event.target.closest("button[data-category]");
	if (button) selectCategory(button.dataset.category);
});

document.addEventListener("click", (event) => {
	if (window.matchMedia("(max-width: 760px)").matches
		&& expandedCategory
		&& !event.target.closest(".product-categories")) {
		expandedCategory = null;
		updateCategorySelection();
	}
});

const initialCategory = new URLSearchParams(window.location.search).get("category");
if (initialCategory && categories.some(({ value }) => value === initialCategory)) selectCategory(initialCategory);
initializeHeader();
