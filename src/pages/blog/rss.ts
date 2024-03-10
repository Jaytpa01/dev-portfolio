import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getAllBlogPosts, sortArticleByPublishDate } from "@lib/article";

export const GET: APIRoute = async () => {
	const blogPosts = await getAllBlogPosts();

	return rss({
		title: "Jay Parry",
		description: "Jay Parry's developer portfolio and personal website.",
		site: import.meta.env.SITE,
		items: blogPosts.map((blog) => ({
			title: blog.data.title,
			description: blog.data.description,
			pubDate: blog.data.publishDate,
			link: `/blog/${blog.slug}`,
		})),
		customData: `<language>en-AU</language>`,
		stylesheet: "/styles/pretty-feed-v3.xsl",
	});
};
