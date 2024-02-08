import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { sortArticleByPublishDate } from "@lib/article";

export const GET: APIRoute = async () => {
	const articles = await getCollection("article");
	const sortedArticles = sortArticleByPublishDate(articles);

	return rss({
		title: "Jay Parry",
		description: "Jay Parry's developer portfolio and personal website.",
		site: import.meta.env.SITE,
		items: sortedArticles.map((article) => ({
			title: article.data.title,
			description: article.data.description,
			pubDate: article.data.publishDate,
			link: `/${article.slug}`,
		})),
		customData: `<language>en-AU</language>`,
		stylesheet: "/styles/pretty-feed-v3.xsl",
	});
};
