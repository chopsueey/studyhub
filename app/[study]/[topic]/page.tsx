import { getContent } from "@/backend/serveractions/postContent";
import Link from "next/link";
import slug from "slug";

export default async function NewTopic({
  params,
}: {
  params: { study: string; topic: string };
}) {
  // fetch notes from DB that belong to this topic and display them
  const notes = ["First day", "Lecture 2", "Workshop about ..."];
  const notesDB = await getContent() || notes;

  const { topic, study } = await params;

  return (
    <div>
      <h1>Display all notes for the topic: {topic.toUpperCase()}, a summary plus an automated quiz across all notes to this topic.</h1>

      <div className="flex space-x-2">
        {notesDB.length > 1 &&
          notesDB.map((note) => (
            <Link key={Math.random().toFixed(4)} href={`/${study}/${topic}/${slug(String(note._id))}`}>
              <div className="border w-fit p-2 hover:bg-slate-300">
                <h2 className="text-xl">{String(note._id)}</h2>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
