import { QuillEditorData } from "@/backend/models/Content";
import { postContent } from "@/backend/serveractions/postContent";

export async function POST(request: Request) {
  const requestBody: QuillEditorData = await request.json();
  console.log(JSON.stringify(requestBody));

  await postContent(requestBody)
  return Response.json({message: "Hello from save-content handler api.", savedContent: JSON.stringify(requestBody.ops)})
}