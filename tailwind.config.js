/** @type {import('tailwindcss').Config} */

// const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				kanit: ["Kanit", "sans-serif"],
				saira: ["'Saira Condensed'", "sans-serif"],
				cutive: ["Cutive", "serif"],
			},
		},
	},
	plugins: [],
};
