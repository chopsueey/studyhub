"use server";

import { HydratedDocument } from "mongoose";
import Note, { INote } from "../models/Note";

export async function postNote() {
  const randomNum = Math.random();

  try {
    const note: HydratedDocument<INote> = new Note({
      name: "My cool new note",
      age: randomNum,
    });

    console.log(note);
    const savedNote = await note.save();
    console.log(savedNote);
    return savedNote;
    
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
