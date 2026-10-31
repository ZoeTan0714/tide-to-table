import { defineConfig } from "vite";
import { relative, resolve } from "node:path";

const root = import.meta.dirname;

// Each page is rendered to static HTML at build time so search engines and
// social previews see the full content without running JavaScript.
const prerenderedPages = {
	"index.html": { key: "home", template: "home.js", render: "renderHomePage" },
	"products/index.html": { key: "products", template: "products.js", render: "renderProductsPage", structuredData: "getProductsStructuredData" },
	"contact-us/index.html": { key: "contact", template: "contact.js", render: "renderContactPage" },
};

function prerender() {
	let server;
	// The dev server loads templates through Vite so edits show up on reload.
	const load = (file) => (server ? server.ssrLoadModule(`/src/templates/${file}`) : import(`./src/templates/${file}`));

	return {
		name: "prerender-pages",
		configureServer(devServer) {
			server = devServer;
		},
		transformIndexHtml: {
			order: "pre",
			async handler(html, { filename }) {
				const page = prerenderedPages[relative(root, filename).replaceAll("\\", "/")];
				if (!page) return html;
				const [layout, template] = await Promise.all([load("layout.js"), load(page.template)]);
				const structuredData = page.structuredData ? template[page.structuredData]() : [];
				return html
					.replace("<!--head-->", layout.renderHead(page.key, structuredData))
					.replace("<!--app-->", template[page.render]());
			},
		},
		handleHotUpdate({ file }) {
			if (/\/src\/(templates\/|site\.js|data\/)/.test(file)) {
				server.ws.send({ type: "full-reload" });
				return [];
			}
		},
	};
}

export default defineConfig({
	plugins: [prerender()],
	build: {
		rollupOptions: {
			input: {
				home: resolve(root, "index.html"),
				products: resolve(root, "products/index.html"),
				contact: resolve(root, "contact-us/index.html"),
			},
		},
	},
});
