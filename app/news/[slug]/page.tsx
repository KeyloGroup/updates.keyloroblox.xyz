// app/news/[slug]/page.tsx
import { getPostBySlug, getAllPosts, Post } from "@/lib/posts";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { notFound } from "next/navigation";
import Image from "next/image";

interface Props {
  params: { slug: string };
}

// default fallback banner if post.banner is missing
const FALLBACK_BANNER = "/images/default-banner.png";

export default async function NewsPost({ params }: Props) {
  const post: Post | null = await getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <article className="post">
      {/* Banner */}
      <Image
        src={post.banner || FALLBACK_BANNER}
        alt={post.title || "Banner"}
        width={1200}   // adjust to your banner size
        height={400}   // adjust to your banner size
        className="post-banner"
        priority
      />

      {/* Title */}
      <h1 className="post-title">{post.title}</h1>

      {/* Author */}
      <div className="author">
        <img
          src={post.authorAvatar}
          alt={post.authorName}
          className="author-avatar"
        />
        <div>
          <div className="author-name">{post.authorName}</div>
          <div className="author-date">{post.date}</div>
        </div>
      </div>

      {/* Content */}
      <MarkdownRenderer content={post.content} />
    </article>
  );
}

// Static generation
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug
  }));
}
