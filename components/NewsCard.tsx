import Link from "next/link";
import Badge from "./Badge";
import Image from "next/image";

export default function NewsCard({ post }: { post: any }) {
  // Ensure we have a valid string for the src
  const bannerSrc = post.banner || "/images/banner-demo.png";

  return (
    <Link href={`/news/${post.slug}`} className="card">
      <div className="card-banner-wrapper">
        <Image 
          src={bannerSrc} 
          alt={post.title} 
          width={600} 
          height={300} 
          className="card-banner"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="card-content">
        <div className="badge-group">
          {post.tags?.map((tag: string) => (
            <Badge key={tag} text={tag} />
          ))}
        </div>

        <h2>{post.title}</h2>
        <p className="meta">
          {post.author || "Keylo Team"} • {post.date}
        </p>
      </div>
    </Link>
  );
}
