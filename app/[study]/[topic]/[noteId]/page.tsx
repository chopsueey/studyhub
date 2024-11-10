import Sidebar from "@/app/components/sidebar";
import { deleteNote, findNoteById } from "@/backend/serveractions/Note";
import { Pencil, Trash2 } from "lucide-react";
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
        <div className="flex flex-col justify-between border-b space-y-4">
          <div className="flex justify-between items-end">
            <h1 className="text-5xl break-all">{note.name}</h1>
            <Link
              className="w-fit h-fit p-2 rounded-lg border hover:border-blue-600 inline-block shadow-sm hover:shadow-md transition-all duration-300"
              href={{
                pathname: `/${study}/${topic}/edit-note`,
                query: { id: noteId },
              }}
            >
              <Pencil className="text-blue-600" />
            </Link>
          </div>
          <div className="mr-auto pb-4 flex space-x-2">
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
          </div>
        </div>
        <div className="p-8" dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>

      <form
        className="flex px-8"
        action={async () => {
          "use server";
          await deleteNote(noteId);
        }}
      >
        <button
          type="submit"
          className="w-fit p-2 ml-auto rounded-lg text-red-500 bg-white hover:bg-red-500 hover:text-white border hover:border-red-500 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <Trash2 />
        </button>
      </form>
    </div>
  );
}
