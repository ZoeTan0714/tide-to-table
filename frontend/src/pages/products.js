import "../style.css";

import { renderFooter } from "../components/footer.js";
import { initializeHeader, renderHeader } from "../components/header.js";

const productImages = Object.fromEntries(
	Object.entries(import.meta.glob("../../../assets/products/*", { eager: true, query: "?url", import: "default" }))
		.map(([path, url]) => [path.split("/").pop().replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]/g, ""), url]),
);

const imageAliases = {
	"White Shrimp / Vannamei": "White Shrimp",
	"Short Neck Clam/Lala": "Short Neck Clam",
};

const products = [
	{
		title: "Shrimp Paste",
		description: "Selected from premium white Vannamei shrimp, this is handcrafted and contains over 90/95% real shrimp meat. It delivers a bouncy, crisp texture with a rich shrimp flavor, making it the perfect ingredient for hotpot, soups, and pan-frying.",
		category: "semi-processed",
		subcategory: "seafood-products",
		notes: ["150g", "500g", "1kg"],
	},
	{
		title: "Marinated Snakehead Fish Slices",
		description: "Selected from premium snakehead fish, these are pre-marinated with an exclusive recipe. The thin, intact fillets are silky, tender, and crisp. No extra starch is required—ready to use instantly for Sichuan Spicy Boiled Fish.",
		category: "semi-processed",
		subcategory: "seafood-products",
		notes: ["200g", "500g", "1kg"],
	},
	{
		title: "Dory/Basa Fish Slices",
		description: "Selected from premium Vietnam Dory/Basa fish, these fillets are boneless and skinless, featuring pure white and delicate meat. Pre-seasoned and marinated, they deliver a tender, flavorful, and silky texture—making them a highly cost-effective and ideal ingredient Sichuan Spicy Boiled Fish.",
		category: "semi-processed",
		subcategory: "seafood-products",
		notes: ["150g", "500g", "1kg"],
	},
	{
		title: "Grass Carp",
		description: "Specially selected from uniquely diet-fed crispy grass carp, the meat is firm, springy, crisp, and chewy, staying intact even after long cooking. The fish is finely sliced and pre-marinated for maximum flavor—simply thaw and cook. Perfect for hotpot and stir-fry.",
		category: "semi-processed",
		subcategory: "seafood-products",
		notes: ["150g", "500g", "1kg"],
	},
	{
		title: "Butterfly-Cut Channel Catfish",
		description: "Selected from premium Qingjiang fish, these are meticulously descaled, gilled, gutted, and butterflied. The fish is clean, featuring delicate, silky meat with no small bones—making it the ultimate choice for signature grilled fish dishes.",
		category: "semi-processed",
		subcategory: "seafood-products",
		notes: ["700-900g", "900-1100g", "1100-1300g"],
	},
	{
		title: "Butterfly-Cut Dory/Basa Fish",
		description: "Selected from premium imported Vietnam Dory/Basa fish, these feature a butterfly cut for rapid marinating and even grilling. The meat is plump and succulent, pairing perfectly with spicy, garlic, or various flavors.",
		category: "semi-processed",
		subcategory: "seafood-products",
		notes: ["700-900g", "900-1100g"],
	},
	{
		title: "Crabsticks (Kanikama)",
		description: "Selected from premium deep-sea surimi as the core ingredient, this product finely replicates the sweet flavor and distinct texture of real crab meat, featuring a firm quality that shreds effortlessly. Whether for sushi, light salads, hotpot, or oden, it brings a fresh, savory taste to every table.",
		category: "semi-processed",
		subcategory: "seafood-products",
		notes: ["235g", "500g", "1kg"],
	},
	{
		title: "Fish Cake",
		description: "Finely pressed from fresh surimi, this product features a golden color, bouncy texture, and a rich fish aroma. Perfect for enhancing soup stocks, pan-frying, or charcoal grilling, it is also an essential, versatile ingredient for Japanese oden that elevates any cooking style.",
		category: "semi-processed",
		subcategory: "seafood-products",
		notes: ["500g", "1kg"],
	},
	{
		title: "Fish Ball",
		description: "Classic craftsmanship, this product boasts high surimi content and plump, solid meat. Delivering a springy, savory bite, it serves in hotpots and fresh soups.",
		category: "semi-processed",
		subcategory: "seafood-products",
		notes: ["500g", "1kg"],
	},
	{
		title: "Octopus Ball",
		description: "Every single piece contains real octopus chunks, offering a rich layered texture that is bouncy and chewy. Every bite delivers a burst of rich, fresh ocean flavor.",
		category: "semi-processed",
		subcategory: "seafood-products",
		notes: ["500g", "1kg"],
	},
	{
		title: "Shark Ball",
		description: "Selected from premium deep-sea ingredients, the meat is firm and stays intact even after long cooking. It features a unique, springy texture with a sweet, lingering aftertaste.",
		category: "semi-processed",
		subcategory: "seafood-products",
		notes: ["500g", "1kg"],
	},
	{
		title: "Fish Skin",
		description: "Selected from premium fish skin, this product is meticulously washed through a multi-stage process and flash-frozen to lock in freshness. When fried, it turns golden, crispy, and savory—making it a uniquely flavorful snack. It can also be flash-boiled in hotpots or served as a cold salad, offering a smooth, springy texture that adds rich layers of flavor to any meal.",
		category: "semi-processed",
		subcategory: "seafood-products",
		notes: ["500g", "1kg"],
	},
	{
		title: "French Fries",
		description: "Selected from premium potatoes, these are finely cut and flash-frozen at low temperatures to lock in freshness, creating a crispy exterior, tender interior, and rich potato flavor. Available in two classic specifications—1/4\" shoestring and 3/8\" straight cut—to satisfy diverse catering needs.",
		category: "semi-processed",
		subcategory: "fried-items",
		notes: ["2kg/pack", "10kg/Carton"],
	},
	{
		title: "Chicken Bites",
		description: "Strictly selecting tender chicken breast and thigh meat, these are coated in a special golden breading to ensure a crispy crust and juicy meat after high-temperature frying. It is a highly popular, top-selling item for fast food restaurants and casual snack",
		category: "semi-processed",
		subcategory: "fried-items",
		notes: ["1kg", "2.5kg", "10kg"],
	},
	{
		title: "Onion Rings",
		description: "Selected from fresh onions and finely cut into rings, these feature a plump and thick shape. Once fried, they turn golden-brown, offering a light, crispy crunch that melts in your mouth as a rich onion aroma unfolds. They are a popular side dish and casual snack for restaurants.",
		category: "semi-processed",
		subcategory: "fried-items",
		notes: ["908g", "1kg", "10kg"],
	},
	{
		title: "Ebi Furai",
		description: "Selected from white Vannamei shrimp, these are hand-peeled with tails left intact and coated in special Japanese breadcrumbs. Once fried, the crust becomes airy and crispy while the shrimp meat remains sweet and bouncy, making it a classic best-selling dish for Japanese restaurants and Western bistros.",
		category: "semi-processed",
		subcategory: "fried-items",
		notes: ["400g", "800g"],
	},
	{
		title: "Fish Fingers",
		description: "Selecting premium cod or haddock, these are hand-cut into strips and coated in a light, crispy breading. The fish is exceptionally tender and boneless, offering a crispy exterior and juicy interior that makes them a healthy, delicious choice for kids' meals and family sharing.",
		category: "semi-processed",
		subcategory: "fried-items",
		notes: ["1kg", "10kg"],
	},
	{
		title: "Fish Nuggets",
		description: "Crafted from fresh surimi and shaped into uniform blocks using specialized techniques, this product offers a solid, springy bite. Featuring standardized cuts, it fries to a perfect golden-brown after breading—making it an ideal ingredient for fast-food chains, institutional catering, and casual dining.",
		category: "semi-processed",
		subcategory: "fried-items",
		notes: ["1kg", "10kg"],
	},
	{
		title: "Tako",
		description: "Premium seasoned baby octopus. Crisp, savory-sweet, and perfect for sushi or appetizers. texture that is perfectly sweet and savory",
		category: "semi-processed",
		subcategory: "japanese-product",
		notes: ["200g", "1kg"],
	},
	{
		title: "Daifuku",
		description: "Chewy glutinous rice wraps that won't break easily. Perfect for cream or fruit-filled Japanese dessert bases.",
		category: "semi-processed",
		subcategory: "japanese-product",
		notes: ["Individual Pack"],
	},
	{
		title: "Dorayaki",
		description: "Fluffy, authentic Japanese pancake shells with a rich egg aroma. Perfect with cream or red bean fillings.",
		category: "semi-processed",
		subcategory: "japanese-product",
		notes: ["Individual Pack"],
	},
	{
		title: "White Shrimp / Vannamei",
		description: "Premium white/ Vannamei shrimp offer succulent, sweet meat. A versatile favorite for boiling, steaming, grilling, or frying.",
		category: "seafood-ingredients",
		subcategory: "shrimp",
		notes: ["20/30", "30/40", "40/50", "50/60", "60/70"],
	},
	{
		title: "Tiger Prawn",
		description: "Large, vibrant black tiger shrimp feature firm meat and robust flavor—the premier choice for upscale dining and banquets",
		category: "seafood-ingredients",
		subcategory: "shrimp",
		notes: ["10/20", "20/30", "30/40"],
	},
	{
		title: "Salmon",
		description: "Premium Faroe Islands and Chilean deep-sea salmon rich in Omega-3. Marbled, delicate texture—ideal for pan-searing, or smoking.",
		category: "seafood-ingredients",
		subcategory: "premium-fish",
		notes: ["Whole", "Fillet", "Belly"],
	},
	{
		title: "Tuna",
		description: "Premium sashimi-grade yellowfin tuna. Deep red, firm meat melts in your mouth—the core ingredient for high-end sushi.",
		category: "seafood-ingredients",
		subcategory: "premium-fish",
		notes: ["Whole", "Fillet", "Custom Cut"],
	},
	{
		title: "Cod",
		description: "Boneless, premium Atlantic or Pacific true cod with snow-white meat. Perfect for pan-searing, steaming, or making fish fillets",
		category: "seafood-ingredients",
		subcategory: "premium-fish",
		notes: ["Fillet", "Portion"],
	},
	{
		title: "Halibut",
		description: "Wild-caught deep-sea delicacy with firm white meat and delicate texture—a timeless classic for premium Western restaurant menus.",
		category: "seafood-ingredients",
		subcategory: "premium-fish",
		notes: ["Fillet"],
	},
	{
		title: "Sea Bream",
		description: "Premium Japanese sea bream (Jiaji fish) features firm, sweet meat—a top-tier choice for sashimi, sushi, salt-grilling, or simmering.",
		category: "seafood-ingredients",
		subcategory: "premium-fish",
		notes: ["Whole", "Skinless Fillet"],
	},
	{
		title: "Golden Pomfret",
		description: "Richly flavorful and ideal for pan-searing, braising, or steaming.",
		category: "seafood-ingredients",
		subcategory: "premium-fish",
		notes: ["Whole Fish"],
	},
	{
		title: "Silver Pomfret",
		description: "Richly flavorful and ideal for pan-searing, braising, or steaming.",
		category: "seafood-ingredients",
		subcategory: "premium-fish",
		notes: ["Whole Fish"],
	},
	{
		title: "Mackerel",
		description: "Richly marbled, firm fish ideal for pan-searing, marinating, or fish rice. Delivers a robust flavor and high nutrition.",
		category: "seafood-ingredients",
		subcategory: "other-fish",
	},
	{
		title: "Saury",
		description: "Slender, savory fish with a unique ocean flavor. Best salt-grilled or pan-seared—a popular Japanese Izakaya favorite.",
		category: "seafood-ingredients",
		subcategory: "other-fish",
	},
	{
		title: "Sea Bass",
		description: "Family-friendly, boneless white fish with delicate meat. Best when steamed for original flavor, or pan-seared and stewed in soups.",
		category: "seafood-ingredients",
		subcategory: "other-fish",
	},
	{
		title: "Abalone",
		description: "Nutritious, succulent seafood delicacy for high-end banquets. Rich in amino acids and trace elements, blending flavor with wellness.",
		category: "seafood-ingredients",
		subcategory: "others",
		notes: ["5", "8", "10", "15"],
	},
	{
		title: "Squid",
		description: "Wild-caught deep-sea delicacy with firm, crisp meat and a sweet flavor. Versatile for stir-frying, grilling, or teppanyaki.",
		category: "seafood-ingredients",
		subcategory: "others",
		notes: ["Whole", "Tube", "Ring", "Tentacles"],
	},
	{
		title: "Cuttlefish",
		description: "Plump, tender portions rich in natural gelatin for a robust mouthfeel. Exceptionally flavorful whether blanched, seared, or simmered.",
		category: "seafood-ingredients",
		subcategory: "others",
		notes: ["Gutted-Whole", "Portion"],
	},
	{
		title: "Octopus",
		description: "Firm, bouncy premium deep-sea octopus available whole or cut. Perfect for Japanese sashimi, grilling, or cold salads",
		category: "seafood-ingredients",
		subcategory: "others",
		notes: ["Whole", "Tentacles"],
	},
	{
		title: "Arctic Surf Clam",
		description: "North Atlantic deep-sea catch, cooked and flash-frozen within 45 minutes. Crisp, sweet, and a classic choice for premium sashimi.",
		category: "seafood-ingredients",
		subcategory: "others",
		notes: ["1kg Vacuum Bag"],
	},
	{
		title: "Scallops",
		description: "Plump, sweet Canadian surf clams and Japanese scallops. Perfect when pan-seared, grilled, or served as sashimi for high-end dining.",
		category: "seafood-ingredients",
		subcategory: "others",
		notes: ["U10", "10-20", "20-30", "30-40"],
	},
	{
		title: "Whelk/Conch",
		description: "Wild-caught deep-sea conch meat with a firm, bouncy texture. Shelled or pre-sliced, perfect for stir-fries or marinated seafood.",
		category: "seafood-ingredients",
		subcategory: "others",
		notes: ["M", "L", "LL", "Pack"],
	},
	{
		title: "Razor Clam",
		description: "Sand-free, slender shellfish with crisp, snow-white meat. Delivers natural sweetness whether flash-fried or slow-simmered in savory broths.",
		category: "seafood-ingredients",
		subcategory: "others",
		notes: ["8–10cm", "10–12cm"],
	},
	{
		title: "Short Neck Clam/Lala",
		description: "Economical, plump shellfish with thin shells and mild flavor. Highly versatile and cost-effective for stir-fries, soups, or steaming.",
		category: "seafood-ingredients",
		subcategory: "others",
		notes: ["500g Retail", "1kg"],
	},
	{
		title: "Crayfish",
		description: "Selected from premium clean-water crawfish, these are flash-frozen alive to lock in maximum freshness, featuring firm, bouncy meat and rich, plump roe. They serve as the perfect base for making spicy, thirteen-spice, or garlic crawfish—thaw-and-cook convenience with rapid flavor absorption",
		category: "seafood-ingredients",
		subcategory: "others",
		notes: ["4–6", "6–8", "8+"],
	},
	{
		title: "Fish Maw",
		description: "Finely selected from deep-sea fish maws and expertly dried, this delicacy is rich in natural collagen and essential trace elements. It offers a soft, gelatinous, and smooth texture with abundant marrow, serving as a prestigious ingredient for slow-simmered soups and high-end restorative dishes.",
		category: "seafood-ingredients",
		subcategory: "others",
		notes: ["By Thickness & Size"],
	},
	{
		title: "Snow Crab",
		description: "Plump, sweet Canadian and Russian deep-sea crab leg meat. A premier choice for sashimi, hotpot, and Western dining.",
		category: "seafood-ingredients",
		subcategory: "crab",
		notes: ["8–12 oz", "Multi-Specs"],
	},
	{
		title: "King Crab",
		description: "Plump, springy 'King of Crabs' portions. The ultimate show-stopping banquet delicacy, whether steamed or stir-fried with rich spices.",
		category: "seafood-ingredients",
		subcategory: "crab",
		notes: ["1.5–3kg+ Whole"],
	},
];

const categories = [
	{ title: "All", value: "all", level: 0 },
	{ title: "Semi-Processed Products/Ready-To-Eat", value: "semi-processed", level: 0 },
	{ title: "Seafood Products", value: "seafood-products", parent: "semi-processed", level: 1 },
	{ title: "Fried Items", value: "fried-items", parent: "semi-processed", level: 1 },
	{ title: "Japanese Product", value: "japanese-product", parent: "semi-processed", level: 1 },
	{ title: "Seafood Ingredients", value: "seafood-ingredients", level: 0 },
	{ title: "Shrimp", value: "shrimp", parent: "seafood-ingredients", level: 1 },
	{ title: "Premium Fish", value: "premium-fish", parent: "seafood-ingredients", level: 1 },
	{ title: "Other Fish", value: "other-fish", parent: "seafood-ingredients", level: 1 },
	{ title: "Crab", value: "crab", parent: "seafood-ingredients", level: 1 },
	{ title: "Others", value: "others", parent: "seafood-ingredients", level: 1 },
];

function escapeHtml(value) {
	return String(value).replace(/[&<>"']/g, (character) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#39;",
	})[character]);
}

document.querySelector("#app").innerHTML = `
	${renderHeader()}
	<section class="inner-page products-page">
		<header class="inner-page-heading">
			<p class="page-eyebrow">Tide to Table</p>
			<h1>Our Products</h1>
			<p>Explore a considered range of seafood and food products for every table.</p>
		</header>
		<div class="products-layout">
			<aside class="product-categories" aria-label="Product categories">
				<h2>Category</h2>
				<nav class="product-category-list" aria-label="Filter products by category">
					${categories.map(({ title, value, level }) => `
						<button class="product-category${level ? " is-subcategory" : ""}${value === "all" ? " is-active" : ""}" type="button" data-category="${value}" aria-pressed="${value === "all"}"${level === 0 && value !== "all" ? ' aria-expanded="false"' : ""}>${title}</button>
					`).join("")}
				</nav>
				<nav class="product-category-list product-subcategory-list" aria-label="Subcategories" hidden></nav>
			</aside>
			<div class="product-results">
				<p class="product-result-count" aria-live="polite"></p>
				<div class="product-grid" aria-label="Products"></div>
			</div>
		</div>
	</section>
	${renderFooter()}
`;

const productGrid = document.querySelector(".product-grid");
const resultCount = document.querySelector(".product-result-count");
const categoryButtons = document.querySelectorAll(".product-category");
const mobileCategoryButtons = [...categoryButtons].filter((button) => !button.classList.contains("is-subcategory"));
const subcategoryList = document.querySelector(".product-subcategory-list");
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
	subcategoryList.innerHTML = subcategories.map(({ title, value }) => `
		<button class="product-category is-subcategory${value === selectedCategory ? " is-active" : ""}" type="button" data-category="${value}" aria-pressed="${value === selectedCategory}">${title}</button>
	`).join("");
}

function selectCategory(value) {
	selectedCategory = value;
	expandedCategory = null;
	updateCategorySelection();
	renderProducts(value);
}

function renderProducts(selectedCategory = "all") {
	const selected = categories.find(({ value }) => value === selectedCategory);
	const filteredProducts = products.filter((product) => {
		if (selectedCategory === "all") return true;
		if (selected?.level === 0) {
			return product.category === selectedCategory || product.subcategory === selectedCategory;
		}
		return product.subcategory === selectedCategory;
	});

	resultCount.textContent = `${filteredProducts.length} ${filteredProducts.length === 1 ? "product" : "products"}`;
	productGrid.innerHTML = filteredProducts.length
		? filteredProducts.map(({ title, description, notes }) => {
			const imageName = imageAliases[title] ?? title;
			const image = productImages[imageName.toLowerCase().replace(/[^a-z0-9]/g, "")];
			const noteTags = notes?.length
				? `<ul class="product-spec-tags" aria-label="Available specifications">${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>`
				: "";
			return `
			<article class="product-card">
				${image
					? `<img src="${image}" alt="${escapeHtml(title)}">`
					: `<div class="product-card-image-placeholder" role="img" aria-label="Image coming soon for ${escapeHtml(title)}">Image coming soon</div>`}
				<div class="product-card-copy">
					<h2>${escapeHtml(title)}</h2>
					<p>${escapeHtml(description)}</p>
					${noteTags}
				</div>
			</article>
		`;
		}).join("")
		: `<p class="product-empty-state">No products in this category yet.</p>`;
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

renderProducts();
updateCategorySelection();
initializeHeader();
