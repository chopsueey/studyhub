"use server";

import { HydratedDocument } from "mongoose";
import Note, { INote, QuillEditorData } from "../models/Note";

export async function getAllNotes() {
  try {
    const note: HydratedDocument<INote>[] = await Note.find({});

    return note;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function findNoteById(id: string) {
  try {
    const note: INote | null = await Note.findOne({
      _id: id,
    }).lean<INote>(); // after chaining .lean(): note is not of type HydratedDocument anymore as it strips of the automatically added mongoose document

    return note;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function postNote(clientData: QuillEditorData) {
  console.log(clientData);
  try {
    const note: HydratedDocument<INote> = new Note({
      content: clientData.ops,
    });

    const savedContent = await note.save();
    return savedContent;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
