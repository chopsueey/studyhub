import Note from "../models/Note";

interface Note {
  name: string;
  age: number;
}
export async function postNote(): Promise<Note | undefined> {
  const randomNum = Math.random();

  try {
    const newNote = Note({
      name: "My cool new note",
      age: randomNum,
    });
    console.log(newNote);
    const savedNote = await newNote.save();
    console.log(savedNote)
    return savedNote;

  } catch (err) {
    console.log(err);
    return undefined;
  }
  
}
