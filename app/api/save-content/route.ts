import { QuillEditorData } from "@/backend/models/Note";
import { postNote } from "@/backend/serveractions/Note";

export async function POST(request: Request) {
  const requestBody: QuillEditorData = await request.json();
  // const path = request.headers.get("referer");
  // const pathSegments = path?.split("/");
  // const revalidateThisPath = `/${pathSegments[pathSegments?.length - 3]}/${
  //   pathSegments[pathSegments?.length - 2]
  // }`;
  console.log(JSON.stringify(requestBody));

  await postNote(requestBody);

  return Response.json({
    message: "Hello from save-content handler api.",
    savedContent: JSON.stringify(requestBody.ops),
  });
}
