import { defineConfig } from "cypress";
import { cypressBrowserPermissionsPlugin } from "cypress-browser-permissions";

export default defineConfig({
	env: {
		browserPermissions: {
			geolocation: "allow",
		},
	},
	e2e: {
		baseUrl: "http://localhost:5173/",
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
