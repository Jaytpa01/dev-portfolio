---
title: Sorting TailwindCSS Classes In an Astro Project with VS Code
slug: tailwind-auto-sorting
description: How I got the TailwindCSS Prettier Plugin setup to work with my
  Astro project in VS Code.
publishDate: 2023-12-23T03:13:21.812Z
type: blog
tags:
  - astro
  - vscode
  - tailwindcss
  - prettier
---
## Installation

```bash
npm i --save-dev prettier-plugin-astro prettier-plugin-tailwindcss
```

(or by running the equivalent command for the package manager of your choice).

### My Prettier Config - `.prettierrc.mjs`

```javascript
/** @type {import("prettier").Config} */
export default {
    useTabs: true,
    singleAttributePerLine: true,
    plugins: [
        "prettier-plugin-astro",
        "prettier-plugin-tailwindcss"
    ],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
    ],
};
```

**NOTE:** The plugin order matters. Ensure that the `prettier-plugin-tailwindcss` is loaded *after* the `prettier-plugin-astro`.

### VS Code Settings

```javascript
"prettier.documentSelectors": ["**/*.astro"],
  "[astro]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
```

Press `Ctrl + Shift + P` (or `Cmd + Shift + P` on mac), and search for `user settings`, selecting `Preferences: Open User Settings (JSON)`.