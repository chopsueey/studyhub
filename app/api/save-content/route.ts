import { QuillEditorData } from "@/backend/models/Note";
import { postNote } from "@/backend/serveractions/Note";

export async function POST(request: Request) {
  const requestBody: QuillEditorData = await request.json();
  console.log(JSON.stringify(requestBody));

  await postNote(requestBody)
  return Response.json({message: "Hello from save-content handler api.", savedContent: JSON.stringify(requestBody.ops)})
}