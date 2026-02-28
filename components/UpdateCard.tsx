type Update = {
  title: string;
  date: string;
  type: string;
  content: string;
};

export default function UpdateCard({
  title,
  date,
  type,
  content
}: Update) {
  return (
    <article className="rounded-xl border border-border bg-panel p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-white">
          {type}
        </span>
        <span className="text-xs text-muted">
          {date}
        </span>
      </div>

      <h2 className="text-lg font-medium mb-2">
        {title}
      </h2>

      <p className="text-sm text-muted leading-relaxed">
        {content}
      </p>
    </article>
  );
}
