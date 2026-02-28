import { getUpdates } from "@/lib/getUpdates";
import UpdateCard from "@/components/UpdateCard";

export default function Page() {
  const updates = getUpdates();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <section className="space-y-6">
        {updates.map((update) => (
          <UpdateCard key={update.slug} {...update} />
        ))}
      </section>
    </main>
  );
}
