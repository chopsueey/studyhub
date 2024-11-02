export async function POST(request: Request) {
  const requestBody = await request.json();
  console.log(JSON.stringify(requestBody));
  return Response.json({message: "Hello from save-content handler api."})
}