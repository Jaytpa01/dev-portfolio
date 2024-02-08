import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { sortArticleByPublishDate } from "@lib/article";

export const GET: APIRoute = async ({ site }) => {
	const articles = await getCollection("article");
	const sortedArticles = sortArticleByPublishDate(articles);

	return rss({
		title: "Jay Parry",
		description: "Jay Parry's developer portfolio and personal website.",
		site: site!,
		items: sortedArticles.map((article) => ({
			title: article.data.title,
			description: article.data.description,
			pubDate: article.data.publishDate,
			link: `/${article.slug}`,
		})),
		customData: `<language>en-AU</language>`,
		stylesheet: "/rss/pretty-feed-v3.xsl",
	});
};
