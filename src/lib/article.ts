import { getCollection, type CollectionEntry } from "astro:content";

export const getAllProjects = async () => {
	const projects = await getCollection("article", ({ data }) => {
		return data.type === "project";
	});

	return sortArticleByPublishDate(projects);
};

export const getAllBlogPosts = async () => {
	const blogPosts = await getCollection("article", ({ data }) => {
		return data.type === "blog";
	});

	return sortArticleByPublishDate(blogPosts);
};

// sort articles by their publish date - newer articles will be towards the beginning of the array
export const sortArticleByPublishDate = (
	articles: CollectionEntry<"article">[],
) => {
	return articles.sort(
		(a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
	);
};
