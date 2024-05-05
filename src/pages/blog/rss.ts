import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getAllBlogPosts } from "@lib/article";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

export const GET: APIRoute = async () => {
	const blogPosts = await getAllBlogPosts();
	const parser = new MarkdownIt();

	return rss({
		title: "Jay Parry",
		description: "Jay Parry's developer portfolio and personal website.",
		site: import.meta.env.SITE,
		items: blogPosts.map((blog) => ({
			title: blog.data.title,
			description: blog.data.description,
			content: sanitizeHtml(parser.render(blog.body)),
			pubDate: blog.data.publishDate,
			link: `/blog/${blog.slug}`,
		})),
		customData: `<language>en-AU</language>`,
	});
};
