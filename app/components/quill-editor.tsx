"use client";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function QuillEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const path = usePathname();
  const { quill, quillRef } = useQuill();

  async function saveContent(formData: FormData) {
    let requestBody;
    const name = formData.get("name");

    if (quill) {
      const content = JSON.stringify(quill.getContents());
      const backToObject = JSON.parse(content);
      backToObject.id = id;
      backToObject.name = name;
      requestBody = JSON.stringify(backToObject);
    }

    await fetch("/api/save-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    const pathSegments = path.split("/");

    router.push(`/${pathSegments[1]}/${pathSegments[2]}?id=${id}`); // have to insert id for searchparams to work in notes.tsx
  }

  return (
    <div className="w-full space-y-4">
      <div className="border">
        <div ref={quillRef} />
      </div>
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
          className="border rounded-lg w-fit p-2 bg-green-500/80 hover:bg-green-500"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
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
