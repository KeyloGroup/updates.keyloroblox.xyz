// app/news/[slug]/page.tsx
import { getPostBySlug, getAllPosts, Post } from "@/lib/posts";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { notFound } from "next/navigation";
import Image from "next/image";

interface Props {
  params: { slug: string };
}

// Default fallback banner if post.banner is missing
const FALLBACK_BANNER = "/images/demo-banner.png";

export default async function NewsPost({ params }: Props) {
  const post: Post | null = await getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <article className="post">
      {/* Banner - Slimmer cinematic aspect ratio */}
      <div className="post-banner-container">
        <Image
          src={post.banner || FALLBACK_BANNER}
          alt={post.title || "Banner"}
          width={1200}   
          height={400}   // Reduced height for a slimmer look
          className="post-banner"
          priority
          style={{ objectFit: 'cover', borderRadius: '12px' }}
        />
      </div>

      {/* Title */}
      <h1 className="post-title">{post.title}</h1>

      {/* Author & Meta */}
      <div className="author">
        {post.authorAvatar && (
          <img
            src={post.authorAvatar}
            alt={post.authorName}
            className="author-avatar"
          />
        )}
        <div>
          <div className="author-name">{post.authorName}</div>
          <div className="author-date">{post.date}</div>
        </div>
      </div>

      {/* Content */}
      <div className="post-content">
        <MarkdownRenderer content={post.content} />
      </div>
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
