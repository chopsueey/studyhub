"use server";

import { HydratedDocument } from "mongoose";
import Content, { IContent, QuillEditorData } from "../models/Content";

export async function postContent(clientData: QuillEditorData) {
  try {
    const content: HydratedDocument<IContent> = new Content({
      content: clientData.ops
    });

    const savedContent = await content.save();
    return savedContent;
    
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
