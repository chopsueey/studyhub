"use server";

import { HydratedDocument } from "mongoose";
import Content, { IContent, QuillEditorData } from "../models/Content";

export async function getContent() {
  try {
    // Assuming you want to get the latest document added
    const content = await Content.find({});
    if (!content) {
      return [];
    }

    // Return content in the format expected by Quill
    return content;
    
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

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
