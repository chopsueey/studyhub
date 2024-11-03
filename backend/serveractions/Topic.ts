"use server";

import { HydratedDocument } from "mongoose";
import { ITopic, Topic } from "../models/Topic";
import { revalidatePath } from "next/cache";

export async function getAllTopics() {
  try {
    const topic: HydratedDocument<ITopic>[] = await Topic.find({});

    return topic;
  } catch (err) {
    console.error(err);
    return undefined;
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

export async function createTopic(formData: FormData ) {
  try {
    const topic: HydratedDocument<ITopic> = new Topic({
      name: formData.get("name"),
    });

    await topic.save();
    revalidatePath(`/`)
    return;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
