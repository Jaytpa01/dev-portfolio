/** @type {import("prettier").Config} */
export default {
	useTabs: true,
	tabWidth: 2,
	singleAttributePerLine: true,
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
	tailwindFunctions: ["cva"],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};
