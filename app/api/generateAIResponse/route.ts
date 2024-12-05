import { connectToDatabase } from "@/backend/lib/mongoose";
import Note, { QuillFormat } from "@/backend/models/Note";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: Request) {
  const req = await request.json();

  await connectToDatabase();

  try {
    const { noteId, option } = req;

    const note = await Note.findById(noteId);

    if (!note) {
      return Response.json({ message: "Note not found" });
    }

    const content = note.content
      .map((item: QuillFormat) => item.insert)
      .join("");

    const prompts = [
      `Summarize the following content:`,
      `Give me the most important keywords or technical terms of the following content with a short explanation:`,
      `Make a quiz that involves the most important concepts, ideas and aspects of the following content:`,
      `Make an advanced quiz that is not necessarily about the following content but related to it:`,
    ];

    const prompt = `${prompts[option]} \n\n${content} ${
      option == 2 || option == 3
        ? `The quiz should be in a suitable JSON format, like this: "{
                "quizTitle": "Gespräch mit Suleiman & Unterricht mit Rene: Wissen & Organisation",
                "questions": [
                     {
                      "question": "According to Rene, what is the difference in development between OneDrive's web and desktop versions?",
                      "options": [
      "The desktop version is more advanced.",
      "The web version is 3 months ahead in development.",
      "Both versions are identical.",
      "The desktop version is constantly updated, while the web version is static."
    ],
    "answerText": "The web version is 3 months ahead in development.",
    "answer": "B",
  }
    ]
    }`
        : ""
    }`;

    const result = await model.generateContent(prompt);

    let asText = result.response.text();

    if (option == 2 || option == 3) {
      asText = asText.replace(/^```json\s*/, "").replace(/```/, ""); 
    }
    console.log(asText)
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
