import { connectToDatabase } from "@/backend/lib/mongoose.js";
import Note from "@/backend/models/Note";
import { postNote } from "@/backend/serveractions/Note";

export default async function Test() {
  await connectToDatabase();
  await postNote();

  const response = await Note.find({});

  return <div>{response[0].name}</div>;
}
