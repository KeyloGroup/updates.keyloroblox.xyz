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
  banner?: string;
  tags?: string[];
  robloxId: number;
}

/* =========================
   GET ROBLOX USER DATA
========================= */
async function getRobloxUser(userId: number) {
  const userRes = await fetch(
    `https://users.roblox.com/v1/users/${userId}`,
    { cache: "force-cache" }
  );

  const userData = await userRes.json();

  const thumbRes = await fetch(
    `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=true`,
    { cache: "force-cache" }
  );

  const thumbData = await thumbRes.json();

  return {
    username: userData.name,
    avatar: thumbData.data?.[0]?.imageUrl
  };
}

/* =========================
   GET ALL POSTS
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
   GET SINGLE POST
========================= */
export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(gfm)
    .use(html)
    .process(content);

  const robloxUser = await getRobloxUser(data.robloxId);

  return {
    slug,
    content: processedContent.toString(),
    ...data,
    authorName: robloxUser.username,
    authorAvatar: robloxUser.avatar
  };
}
