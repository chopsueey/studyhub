"use client";

import { useQuill } from "react-quilljs";
import { useEffect } from "react";

import "quill/dist/quill.snow.css"; // Add css for snow theme

export default function QuillEditor() {
  const { quill, quillRef } = useQuill();

  console.log(quill); // undefined > Quill Object
  console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        console.log(quill.getText());
        console.log(quill.getContents());
        // console.log(quill.root.innerHTML);
        // console.log(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);

  return (
    <div className="w-full">
      <div className="border" ref={quillRef} />
      <button className="border p-2 hover:bg-black hover:text-white">
        Save
      </button>
    </div>
  );
}
