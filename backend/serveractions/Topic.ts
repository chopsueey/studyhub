"use server";

import { HydratedDocument } from "mongoose";
import { ITopic, Topic } from "../models/Topic";
import { revalidatePath } from "next/cache";
import { IStudy, Study } from "../models/Study";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../lib/mongoose";

await connectToDatabase(); // in production: should be called globally or dynamically on the server as static components aren't executed again

export async function getAllTopics(id: string) {
  try {
    const study: IStudy | null = await Study.findById(id).populate("topics");
    
    if (study == null) {
      throw new Error("Nothing found.")
    }
    // const topic: HydratedDocument<ITopic>[] = await Topic.find({});
    
    return study.topics as HydratedDocument<ITopic>[] | []
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function findTopicById(id: string) {
  try {
    const topic: ITopic | null = await Topic.findOne({
      _id: id,
    }).lean<ITopic>(); // after chaining .lean(): topic is not of type HydratedDocument anymore as it strips of the automatically added mongoose document

    return topic;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function createTopic(formData: FormData, param: string, id: string ) {
  try {
    const topic: HydratedDocument<ITopic> = new Topic({
      name: formData.get("name"),
    });

    await topic.save();

    await Study.findByIdAndUpdate(
      id,
      { $push: { topics: topic._id } },
      { new: true }
    );

    revalidatePath(`/${param}`)
    return;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export async function deleteTopic(id: string) {
  try {
    await Topic.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return;
  }
  redirect("/");
}