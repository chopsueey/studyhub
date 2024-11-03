import { findNoteById } from "@/backend/serveractions/Note";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export default async function Note({ params }: { params: Promise<{ noteId: string }> }) {
  // TODO: make note editable and patch existing database entry on save
  const { noteId } = await params;
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

  // const deltaOps = [
  //   { insert: "This is my " },
  //   { attributes: { color: "#ff9900", bold: true }, insert: "cool" },
  //   { insert: " text!!!11\n" },
  // ];

  return (
    <div>
      <h1>Note: {noteId.toUpperCase()}</h1>
      <div className="max-w-screen-md mx-auto p-2 border" dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}