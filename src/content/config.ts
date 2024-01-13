import { z, defineCollection } from "astro:content";

/** defining an article */

// an article can be either a blog or a project
const articleTypes = ["blog", "project"] as const;

const articleSchema = () =>
	z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.coerce.date().default(new Date()),
		type: z.enum(articleTypes),
		tags: z.array(z.string().toLowerCase()).optional(),
	});

const articleCollection = defineCollection({
	type: "content",
	schema: articleSchema,
});

/** defining an open source contribution */
const contributionSchema = () =>
	z.object({
		projectName: z.string(),
		projectUrl: z.string().url(),
		publishDate: z.coerce.date().default(new Date()),
		description: z.string(),
		url: z.string().url(),
	});

const contributionCollection = defineCollection({
	type: "data",
	schema: contributionSchema,
});

export const collections = {
	article: articleCollection,
	contribution: contributionCollection,
};
