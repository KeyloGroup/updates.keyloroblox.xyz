import { getPostBySlug, getAllPosts } from "@/lib/posts";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function NewsPost({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) return notFound();

  return (
    <article className="post">
      {post.banner && (
        <img
          src={post.banner}
          className="post-banner"
          alt="Banner"
        />
      )}

      <h1 className="post-title">{post.title}</h1>

      {/* Author Block */}
      <div className="author">
        <img
          src={post.authorAvatar}
          alt="Author"
          className="author-avatar"
        />
        <div>
          <div className="author-name">
            {post.authorName}
          </div>
          <div className="author-date">
            {post.date}
          </div>
        </div>
      </div>

      <MarkdownRenderer content={post.content} />
    </article>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug
  }));
}
