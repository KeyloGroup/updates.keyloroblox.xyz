import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/posts";

export default function NewsCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/news/${post.slug}`} className="news-card">
      <div className="news-card-banner">
        <Image
          src={post.banner || "/images/demo-banner.png"}
          alt={post.title}
          width={400}
          height={225}
          className="news-card-image"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="news-card-details">
        <span className="news-card-date">{post.date}</span>
        <h3 className="news-card-title">{post.title}</h3>
        <div className="news-card-tags">
          {post.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
