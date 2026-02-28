import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const postsDirectory = path.join(process.cwd(), "content");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  banner?: string;
  tags?: string[];
}

/* =========================
   GET ALL POSTS (Metadata)
========================= */
export function getAllPosts(): PostMeta[] {
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const slug = filename.replace(".md", "");
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      slug,
      ...(data as Omit<PostMeta, "slug">)
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );
}

/* =========================
   GET SINGLE POST (Full)
========================= */
export async function getPostBySlug(slug: string) {
  const fullPath = path.join(
    postsDirectory,
    `${slug}.md`
  );

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(
    fullPath,
    "utf8"
  );

  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(gfm)
    .use(html)
    .process(content);

  return {
    slug,
    content: processedContent.toString(),
    ...(data as Omit<PostMeta, "slug">)
  };
}
