import Link from "next/link";
import slug from "slug";

export default async function NewTopic({
  params,
}: {
  params: { study: string; topic: string };
}) {
  // fetch notes from DB that belong to this topic and display them
  const notes = ["First day", "Lecture 2", "Workshop about ..."];

  const { topic, study } = await params;

  return (
    <div>
      <h1>Display all notes for the topic: {topic.toUpperCase()}, a summary plus an automated quiz across all notes to this topic.</h1>

      <div className="flex space-x-2">
        {notes.length > 1 &&
          notes.map((note) => (
            <Link key={Math.random().toFixed(4)} href={`/${study}/${topic}/${slug(note)}`}>
              <div className="border w-fit p-2 hover:bg-slate-300">
                <h2 className="text-xl">{note}</h2>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
