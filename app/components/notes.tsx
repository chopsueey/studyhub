import { getAllNotes } from "@/backend/serveractions/Note";
import Link from "next/link";
import slug from "slug";

export default async function Notes({
  study,
  topic,
  topicId,
}: {
  study: string;
  topic: string;
  topicId: string;
}) {
  const notesDB = await getAllNotes(topicId);

  if (!notesDB) {
    return <h1>An error occured while loading your notes.</h1>;
  }

  return (
    <div className="flex space-y-2 space-y-reverse flex-wrap py-8 border-y">
      {notesDB.length > 0 ? (
        notesDB.map((note) => (
          <Link
            className="mr-4"
            key={Math.random()}
            href={`/${study}/${topic}/${slug(String(note._id))}`}
          >
            <div className="border rounded-lg w-fit px-4 py-4 pt-2 hover:border-black duration-200 space-y-2">
              <h2 className="font-bold">{note?.name}</h2>
              <p className="text-xs bg-slate-200 rounded-full py-1 px-3 w-fit ml-auto">
                {String(
                  note.createdAt.toLocaleString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                )}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <div>Nothing found. Create a note first.</div>
      )}
    </div>
  );
}
