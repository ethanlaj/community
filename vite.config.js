import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
	plugins: [reactRefresh()],
	server: {
		port: 3000,
		host: true,
	},
	resolve: {
		alias: {
			"@": "/src",
		},
	},
});
