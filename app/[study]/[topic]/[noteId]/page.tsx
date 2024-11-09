import Sidebar from "@/app/components/sidebar";
import { deleteNote, findNoteById } from "@/backend/serveractions/Note";
import Link from "next/link";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export default async function Note({
  params,
}: {
  params: Promise<{ study: string; topic: string; noteId: string }>;
}) {
  const { study, topic, noteId } = await params;

  const note = await findNoteById(noteId);

  if (!note) {
    return (
      <div>
        <h1>This note does not exist anymore.</h1>
      </div>
    );
  }

  const converter = new QuillDeltaToHtmlConverter(note.content, {
    encodeHtml: true,
    inlineStyles: {
      size: {
        small: "font-size: 0.75em;",
        large: "font-size: 1.5em;",
        huge: "font-size: 2.5em;",
      },
    },
  });

  const html = converter.convert();

  // parseable format for QuillDeltaToHtmlConverter:
  // const deltaOps = [
  //   { insert: "This is my " },
  //   { attributes: { color: "#ff9900", bold: true }, insert: "cool" },
  //   { insert: " text!!!11\n" },
  // ];

  return (
    <div className="max-w-screen-md mx-auto p-8 border rounded-lg flex flex-col relative">
      <Sidebar noteId={noteId} />
      <div>
        <p className="text-xs bg-slate-200 rounded-full py-1 px-3 w-fit mt-auto ml-auto">
          {note.createdAt.toLocaleString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <p className="text-xs rounded-full py-1 px-3 w-fit mt-2 ml-auto">
          {note.updatedAt &&
            "Edited: " +
              note.updatedAt?.toLocaleString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
        </p>
        <h1 className="pl-8 mt-4">{note.name}</h1>
        <div className="p-8" dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
      <div className="w-fit p-2 rounded-lg bg-green-500/80 hover:bg-green-500">
        <Link
          href={{
            pathname: `/${study}/${topic}/edit-note`,
            query: { id: noteId },
          }}
        >
          Edit
        </Link>
      </div>
      <form
        className="ml-auto"
        action={async () => {
          "use server";
          await deleteNote(noteId);
        }}
      >
        <button
          type="submit"
          className="w-fit p-2 rounded-lg bg-red-500/80 hover:bg-red-500"
        >
          delete
        </button>
      </form>
    </div>
  );
}
