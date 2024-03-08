/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// extend the window object to keep typescript happy
interface Window {
	netlifyIdentity: any;
}
