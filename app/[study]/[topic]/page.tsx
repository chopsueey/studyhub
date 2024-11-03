import { getAllNotes } from "@/backend/serveractions/Note";
import Link from "next/link";
import slug from "slug";

export default async function NewTopic({
  params,
}: {
  params: Promise<{ study: string; topic: string }>;
}) {
  const { topic, study } = await params;
  const notesDB = await getAllNotes();

  if (!notesDB) {
    return <h1>An error occured while loading your notes.</h1>;
  }

  return (
    <div>
      <h1>{topic.toUpperCase()}</h1>
      <h2>
        TODO: Display all notes for this topic, a summary
        plus an automated quiz across all notes to this topic.
      </h2>

      <div className="flex space-x-2">
        {notesDB.length > 0 ? (
          notesDB.map((note) => (
            <Link
              key={Math.random()}
              href={`/${study}/${topic}/${slug(String(note._id))}`}
            >
              <div className="border w-fit p-2 hover:bg-slate-300">
                <p >{String(note.createdAt.toLocaleString())}</p>
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
