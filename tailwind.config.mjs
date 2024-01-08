/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Reem Kufi", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				"neo-red": "#ff7a64",
				"neo-yellow": "#ffef6b",
				"neo-neutral": "#fffeec",
			},
		},
	},
	plugins: [],
};
