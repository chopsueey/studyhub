import Note, { QuillFormat } from "@/backend/models/Note";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: Request) {
  const req = await request.json();

  try {
    const { noteId, option } = req;

    const note = await Note.findById(noteId);

    if (!note) {
      return Response.json({ message: "Note not found" });
    }

    const content = note.content.map((item: QuillFormat) => item.insert).join("");

    const prompts = [
      `Summarize the following content:`,
      `Give me the most important keywords or technical terms of the following content:`,
      `Make a little quiz that involves the most important concepts, ideas and aspects of the following content:`,
    ];

    const prompt = `${prompts[option]} \n\n${content} in quill format.`;

    const result = await model.generateContent(prompt);

    const asText = result.response.text();

    return Response.json({ asText });
  } catch (error) {
    return Response.json({ error });
  }

}

// const openai = new OpenAI();

// const completion = await openai.chat.completions.create({
//   model: "gpt-4o-mini",
//   messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       {
//           role: "user",
//           content: `Summarize the following content:\n\n${content}`,
//       },
//   ],
// });

// const aiResponse = completion.choices[0].message || '';
//       console.log(aiResponse)
