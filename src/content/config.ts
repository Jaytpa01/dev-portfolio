import { z, defineCollection } from "astro:content";

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

export const collections = {
	article: articleCollection,
};
