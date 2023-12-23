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
You've probably heard Phil Karlton's quote before (or a variation of it at least):

> There are only two hard things in Computer Science: cache invalidation and naming things.

**We all hate naming stuff.** Luckily, I've got some good news; TailwindCSS is a utility-first CSS framework. I could elaborate further on what this means, but thats besides the point. In short, this means we can write CSS without first having think of any annoying class names.

Let’s be real though, we’re developers. We can and will find anything to complain about. So with that said, **how should we order our Tailwind utility classes?**

Well, luckily the devs behind Tailwind have also thought of this and created a plugin for Prettier to auto sort these utility classes for us. You can read a bit more about this <a href="https://tailwindcss.com/blog/automatic-class-sorting-with-prettier" target="_blank">here</a>.

## The Problem

If you're using VS Code and the <a href="https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode" target="_blank">Astro VS Code Extension,</a> code formatting with Prettier is included.
However, after reading the Astro docs, installing additional Prettier plugins still wasn't fully clear to me at first, so here I am, saving you the trouble of figuring it out by telling you how to do it.

## So How Do We Do Install Them?

Well first of all, you'll need to install 2 plugins: `prettier-plugin-astro` and `prettier-plugin-tailwindcss`. You can do this by running:

```bash
npm i --save-dev prettier-plugin-astro \
    prettier-plugin-tailwindcss
```

(or by running the equivalent command for the package manager of your choice).

### The Prettier Config

Once these are installed, you'll need to add these plugins to your prettier configuration file, or create a new one.
There are plenty of ways to do this, but I chose to use the `.prettierrc.mjs` file format.

I use the following configuration:

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

You'll also need to add the following to your VS Code Settings:

```javascript
"prettier.documentSelectors": ["**/*.astro"],
  "[astro]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
```

You can do this by pressing `Ctrl + Shift + P` (or `Cmd + Shift + P` on mac), and searching for `user settings` and selecting `Preferences: Open User Settings (JSON)`.