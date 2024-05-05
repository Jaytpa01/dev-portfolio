/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				mono: ["iA Writer Mono", ...defaultTheme.fontFamily.mono],
			},
			colors: {
				"neo-red": "#ff7a64",
				"neo-yellow": "#ffef6b",
				"neo-neutral": "#fffeec",
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						code: {
							color: theme("colors.red.500"),
							backgroundColor: theme("colors.rose.100"),
							borderRadius: theme("spacing.[1.5]"),
							paddingLeft: theme("spacing.2"),
							paddingRight: theme("spacing.2"),
							whiteSpace: "break-spaces",
						},
					},
				},
				quoteless: {
					css: {
						"blockquote p:first-of-type::before": { content: "none" },
						"blockquote p:first-of-type::after": { content: "none" },
					},
				},
			}),
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
