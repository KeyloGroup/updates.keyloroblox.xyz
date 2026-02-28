import { getAllPosts } from "@/lib/posts";
import NewsCard from "@/components/NewsCard";

interface Props {
  searchParams?: { tag?: string };
}

export default function Home({ searchParams }: Props) {
  const posts = getAllPosts();
  const activeTag = searchParams?.tag;

  const filteredPosts = activeTag
    ? posts.filter((post) =>
        post.tags?.includes(activeTag)
      )
    : posts;

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  );

  return (
    <>
      <div className="filter-bar">
        <a
          href="/"
          className={!activeTag ? "filter active" : "filter"}
        >
          All
        </a>

        {allTags.map((tag) => (
          <a
            key={tag}
            href={`/?tag=${tag}`}
            className={
              activeTag === tag ? "filter active" : "filter"
            }
          >
            {tag}
          </a>
        ))}
      </div>

      <div className="news-grid">
        {filteredPosts.map((post) => (
          <NewsCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
