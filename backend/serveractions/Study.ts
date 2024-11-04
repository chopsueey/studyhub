"use server";

import { HydratedDocument } from "mongoose";
import { IStudy, Study } from "../models/Study";
import { revalidatePath } from "next/cache";

export async function getAllStudies() {
  try {
    const study: HydratedDocument<IStudy>[] = await Study.find({});

    return study;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function findStudyById(id: string) {
  try {
    const study: IStudy | null = await Study.findOne({
      _id: id,
    }).lean<IStudy>(); // after chaining .lean(): study is not of type HydratedDocument anymore as it strips of the automatically added mongoose document

    return study;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function createStudy(formData: FormData) {
  try {
    const study: HydratedDocument<IStudy> = new Study({
      name: formData.get("name"),
    });

    await study.save();

    revalidatePath("/");
    return;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
