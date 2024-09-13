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

export const getBlogPostsByTag = async (tag: string) => {
  const blogPosts = await getCollection("article", ({ data }) => {
    // ensure we have a blog and that it has the expected tag
    return data.type === "blog" && data.tags && data.tags.includes(tag);
  });

  return sortArticleByPublishDate(blogPosts);
};

export const getAllBlogTags = async () => {
  const posts = await getAllBlogPosts();

  const tags: string[] = [];
  posts.forEach((post) => {
    if (post.data.tags) {
      tags.push(...post.data.tags);
    }
  });

  // this ensures all tags are unique, not falsey, and are sorted
  return [...new Set(tags.filter(Boolean))].sort();
};

export const getArticleCount = async () => {
  const articles = await getCollection("article");
  return articles.length;
};

// sort articles by their publish date - newer articles will be towards the beginning of the array
const sortArticleByPublishDate = (articles: CollectionEntry<"article">[]) => {
  return articles.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );
};
