import { getAllNotes } from "@/backend/serveractions/Note";
import Link from "next/link";
import slug from "slug";

export default async function NewTopic({
  params,
}: {
  params: { study: string; topic: string };
}) {
  const { topic, study } = await params;
  const notesDB = await getAllNotes();

  if (!notesDB) {
    return <h1>An error occured while loading your notes.</h1>;
  }

  return (
    <div>
      <h1>
        TODO: Display all notes for the topic: {topic.toUpperCase()}, a summary
        plus an automated quiz across all notes to this topic.
      </h1>

      <div className="flex space-x-2">
        {notesDB.length > 0 ? (
          notesDB.map((note) => (
            <Link
              key={Math.random()}
              href={`/${study}/${topic}/${slug(String(note._id))}`}
            >
              <div className="border w-fit p-2 hover:bg-slate-300">
                <h2 className="text-xl">{String(note._id)}</h2>
              </div>
            </Link>
          ))
        ) : (
          <div>Nothing found. Create a note first.</div>
        )}
      </div>
    </div>
  );
}
