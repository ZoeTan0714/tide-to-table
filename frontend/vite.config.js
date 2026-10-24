import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
	base: "./",
	build: {
		rollupOptions: {
			input: {
				home: resolve(import.meta.dirname, "index.html"),
				products: resolve(import.meta.dirname, "products.html"),
				contact: resolve(import.meta.dirname, "contact.html"),
			},
		},
	},
});