"use client";

import { deleteNote } from "@/backend/serveractions/Note";
import { deleteStudy } from "@/backend/serveractions/Study";
import { deleteTopic } from "@/backend/serveractions/Topic";
import { Trash2 } from "lucide-react";

export default function Dialog({
  id,
  study,
  topic,
  note,
}: {
  id: string;
  study?: string;
  topic?: string;
  note?: string;
}) {
  return (
    <>
      <button
        type="button"
        onClick={() => {
          const dialog = document.getElementById(
            "confirm-dialog"
          ) as HTMLDialogElement;
          dialog.showModal();
        }}
        className="w-fit p-2 ml-auto rounded-lg text-red-500 bg-white hover:bg-red-500 hover:text-white border hover:border-red-500 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <Trash2 />
      </button>

      <dialog id="confirm-dialog" className="border rounded-lg p-6 space-y-4">
        <div className="space-y-2">
          <p>Are you sure you want to delete:</p>
          <p className="font-bold">
            {(study
              ? `study ${study}`
              : topic
              ? `topic ${topic}`
              : note
              ? `note ${note}`
              : ""
            ).toUpperCase()}
          </p>
        </div>
        <div className="flex justify-evenly">
          <button
            type="button"
            className="w-fit p-2 rounded-lg text-red-500 bg-white hover:bg-red-500 hover:text-white border hover:border-red-500 shadow-sm hover:shadow-md transition-all duration-300"
            onClick={async () => {
              if (study) await deleteStudy(id);
              if (topic) await deleteTopic(id);
              if (note) await deleteNote(id);
            }}
          >
            Delete
          </button>
          <button
            type="button"
            className="w-fit p-2 rounded-lg text-green-500 bg-white hover:bg-green-600 hover:text-white border hover:border-green-500 shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => {
              const dialog = document.getElementById(
                "confirm-dialog"
              ) as HTMLDialogElement;
              dialog.close();
            }}
          >
            Keep
          </button>
        </div>
      </dialog>
    </>
  );
}
