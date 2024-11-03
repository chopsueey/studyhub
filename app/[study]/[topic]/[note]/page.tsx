import { findContent } from "@/backend/serveractions/postContent";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export default async function Note({params}: {params: {note: string}}) {
  // make note editable and patch existing database entry on save
  const {note} = await params;
  const content = await findContent(note)
  console.log(content)
  const deltaOps = content.content || [
    { insert: "This is my " },
    { attributes: { color: "#ff9900", bold: true }, insert: "cool" },
    { insert: " text!!!11\n" },
  ];

  const cfg = {};

  const converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);

  const html = converter.convert();

  console.log(html);

  return (
    <div>
      <h1>Overview of the note: {note.toUpperCase()}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>

    </div>
  )
}