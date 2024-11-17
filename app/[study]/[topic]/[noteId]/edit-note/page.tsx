import QuillEditor from "@/app/components/quill-editor";
import { findNoteByIdSerialized } from "@/backend/serveractions/Note";

export default async function EditNote({
  params,
}: {
  params: Promise<{ study: string; topic: string; noteId: string }>;
}) {
  const { study, topic, noteId } = await params;

  const note = await findNoteByIdSerialized(noteId);
  if (!note) {
    return (
      <div>
        <h1>This note does not exist anymore.</h1>
      </div>
    );
  }
  return (
    <div className="max-w-screen-md m-auto flex justify-center">
      <QuillEditor action="edit" note={note} study={study} topic={topic} />
    </div>
  );
}
