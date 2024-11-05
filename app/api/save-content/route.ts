import { QuillEditorData } from "@/backend/models/Note";
import { postNote } from "@/backend/serveractions/Note";

export async function POST(request: Request) {
  const requestBody: QuillEditorData & { id: string } = await request.json();

  // console.log("from save-content route", JSON.stringify(requestBody));

  await postNote(requestBody);

  return Response.json({
    message: "Hello from save-content handler api.",
    savedContent: JSON.stringify(requestBody.ops),
  });
}
