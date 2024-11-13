"use client";

import { deleteNote } from "@/backend/serveractions/Note";
import { deleteStudy } from "@/backend/serveractions/Study";
import { deleteTopic } from "@/backend/serveractions/Topic";
import { Save, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Dialog({
  action,
  id,
  study,
  topic,
  note,
}: {
  action: string;
  id: string;
  study?: string;
  topic?: string;
  note?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  function handleOutsideClick(e: MouseEvent) {
    const dialog = dialogRef.current;
    if (dialog) {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close();
      }
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog) {
      dialog.addEventListener("click", handleOutsideClick);
    }
    return () => {
      if (dialog)
        return dialog.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="w-fit p-2 ml-auto rounded-lg text-red-500 bg-white hover:bg-red-500 hover:text-white border hover:border-red-500 shadow-sm hover:shadow-md transition-all duration-300"
      >
        {action == "save" ? <Save /> : action == "delete" ? <Trash2 /> : ""}
      </button>

      <dialog
        ref={dialogRef}
        id="confirm-dialog"
        className="rounded-lg p-6 space-y-4 shadow-md"
      >
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
            onClick={() => dialogRef.current?.close()}
          >
            Keep
          </button>
        </div>
      </dialog>
    </>
  );
}
