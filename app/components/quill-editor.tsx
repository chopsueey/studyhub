"use client";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useRouter, useSearchParams } from "next/navigation";
import { patchNote } from "@/backend/serveractions/Note";
import { INote } from "@/backend/models/Note";
import { useContext, useEffect } from "react";
import { Context } from "../context-provider";

export default function QuillEditor({
  action,
  note,
  study,
  topic,
}:
  | {
      action: "create";
      note?: INote & { _id: string };
      study: string;
      topic: string;
    }
  | {
      action: "edit";
      note: INote & { _id: string };
      study: string;
      topic: string;
    }) {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "If you want to access the context, the component must a child of the context provider."
    );
  }
  const router = useRouter();
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const { quill, quillRef } = useQuill();

  if (action == "edit" && quill && note) {
    quill.setContents(note.content);
  }

  async function saveContent(formData: FormData) {
    let requestBody;
    const name = formData.get("name");

    if (quill) {
      const content = JSON.stringify(quill.getContents());
      const backToObject = JSON.parse(content);
      backToObject.topicId = topicId;
      backToObject.name = name;
      requestBody = JSON.stringify(backToObject);

      await fetch("/api/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      router.push(`/${study}/${topic}?topicId=${topicId}`); // have to insert id for searchparams to work in notes.tsx
    }
  }

  async function handleClick() {
    let requestBody;

    if (quill && note) {
      const content = JSON.stringify(quill.getContents());
      const backToObject = JSON.parse(content);
      backToObject.id = note._id;
      requestBody = JSON.stringify(backToObject);
    }
    await patchNote(requestBody!);

    router.push(`/${study}/${topic}/${note?._id}`);
  }

  useEffect(() => {
    if (action == "create" && quill) {
      quill.setText("Start your epic...");
    }
  });

  return (
    <>
      <div className="w-full space-y-4">
        <div className="border">
          <div ref={quillRef} />
        </div>
        {action == "create" && (
          <form action={saveContent} className="space-y-2 flex flex-col w-fit">
            <div className="space-x-2 w-fit p-2 bg-slate-200 rounded-lg">
              <label htmlFor="name">Title:</label>
              <input
                className="border rounded-lg p-1"
                name="name"
                type="text"
                required
                minLength={3}
                pattern="^(?=.*\S{3,}).*$"
              />
            </div>
            <button
              className="w-fit px-4 py-2 mt-4 rounded-lg bg-green-500 text-white font-semibold shadow-sm hover:bg-green-600 hover:shadow-md transition-all duration-300"
              type="submit"
            >
              Save
            </button>
          </form>
        )}
        {action == "edit" && (
          <>
            <button
              onClick={handleClick}
              className="w-fit px-4 py-2 ml-auto mt-4 rounded-lg bg-green-500 text-white font-semibold shadow-sm hover:bg-green-600 hover:shadow-md transition-all duration-300"
            >
              Update
            </button>
            
          </>
        )}
      </div>
    </>
  );
}

// useEffect(() => {
//   if (quill) {
//     quill.on("text-change", (delta, oldDelta, source) => {
//       console.log(quill.getText());
//       console.log(quill.getContents());
//       // console.log(quill.root.innerHTML);
//       // console.log(quillRef.current.firstChild.innerHTML);
//     });
//   }
// }, [quill]);
