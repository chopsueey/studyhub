// import QuillEditor from "@/app/components/quill-editor";
import { findNoteById } from "@/backend/serveractions/Note";

export default async function EditNote({
  params,
}: {
  params: { study: string; topic: string; noteId: string };
}) {
  const {  noteId } = await params;

  const note = await findNoteById(noteId);
  if (!note) {
    return (
      <div>
        <h1>This note does not exist anymore.</h1>
      </div>
    );
  }
  return (
    <div className="max-w-screen-md m-auto flex justify-center">
      {/* <QuillEditor action={"edit"} note={note}  /> */}
    </div>
  );
}
