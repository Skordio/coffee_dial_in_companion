import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { fileURLToPath } from "url"

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		host: "0.0.0.0", // Listens on all network interfaces
		port: 3000, // Optional: specify a custom port number (default is 3000)
		// If you face issues with CORS, you can also set the strictPort and cors options like this:
		strictPort: true,
		cors: { origin: "*" },
	},
})
