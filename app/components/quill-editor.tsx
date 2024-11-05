"use client";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { usePathname, useRouter } from "next/navigation";

export default function QuillEditor() {
  const router = useRouter();
  const path = usePathname();
  const { quill, quillRef } = useQuill();

  async function saveContent() {
    let content;

    if (quill) {
      content = JSON.stringify(quill.getContents());
    }

    await fetch("/api/save-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: content,
    });

    const pathSegments = path.split("/");

    router.push(`/${pathSegments[1]}/${pathSegments[2]}`);
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
