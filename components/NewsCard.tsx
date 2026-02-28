import Link from "next/link";
import Badge from "./Badge";

export default function NewsCard({ post }: any) {
  return (
    <Link href={`/news/${post.slug}`} className="card">
      {post.banner && (
        <img src={post.banner} className="card-banner" alt="Banner" />
      )}

      <div className="card-content">
        <div className="badge-group">
          {post.tags?.map((tag: string) => (
            <Badge key={tag} text={tag} />
          ))}
        </div>

        <h2>{post.title}</h2>
        <p className="meta">
          {post.author} • {post.date}
        </p>
      </div>
    </Link>
  );
}
