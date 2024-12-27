import Dialog from "@/app/components/dialog";
import NoteContent from "@/app/components/note-content";
import Sidebar from "@/app/components/sidebar";
import { findNoteByIdSerialized } from "@/backend/serveractions/Note";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default async function Note({
  params,
}: {
  params: Promise<{ study: string; topic: string; noteId: string }>;
}) {
  const { study, topic, noteId } = await params;

  const note = await findNoteByIdSerialized(noteId);

  if (!note) {
    return (
      <div>
        <h1>This note does not exist anymore.</h1>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto p-8 border rounded-lg flex flex-col relative">
      <Sidebar noteId={noteId} />
      <div>
        <div className="flex flex-col justify-between border-b space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-5xl break-all">{note.name}</h1>
            <Link
              className="w-fit h-fit p-2 rounded-lg border hover:border-blue-600 inline-block shadow-sm hover:shadow-md transition-all duration-300"
              href={{
                pathname: `/${study}/${topic}/${noteId}/edit-note`,
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

        <NoteContent note={note.content} />
      </div>

      <Dialog action="delete" id={noteId} note={note.name} />
    </div>
  );
}
