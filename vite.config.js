import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
	plugins: [reactRefresh()],
	server: {
		host: true,
		port: 3000,
	},
	preview: {
		host: true,
		port: 3000,
	},
	resolve: {
		alias: {
			"@": "/src",
		},
	},
});
