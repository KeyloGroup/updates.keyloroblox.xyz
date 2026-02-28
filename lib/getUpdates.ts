import fs from "fs";
import path from "path";
import matter from "gray-matter";

const updatesPath = path.join(process.cwd(), "content/updates");

export function getUpdates() {
  return fs
    .readdirSync(updatesPath)
    .map((file) => {
      const raw = fs.readFileSync(
        path.join(updatesPath, file),
        "utf8"
      );
      const { data, content } = matter(raw);

      return {
        title: data.title,
        type: data.type,
        date: data.date,
        content,
        slug: file.replace(".md", "")
      };
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );
}
