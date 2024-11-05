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

  async function saveContent() {
    let requestBody;

    if (quill) {
      const content = JSON.stringify(quill.getContents());
      const backToObject = JSON.parse(content)
      backToObject.id = id;
      requestBody = JSON.stringify(backToObject)
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
    <div className="w-full">
      <div className="border" ref={quillRef} />
      <button
        onClick={saveContent}
        className="border p-2 hover:bg-black hover:text-white"
      >
        Save
      </button>
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
