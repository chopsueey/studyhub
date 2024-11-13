import Link from "next/link";
import slug from "slug";
import CreateForm from "../components/create-form";
import { createTopic, getAllTopics } from "@/backend/serveractions/Topic";
import { HydratedDocument } from "mongoose";
import { ITopic } from "@/backend/models/Topic";
import Dialog from "../components/dialog";

export default async function Study({
  params,
  searchParams,
}: {
  params: Promise<{ study: string }>;
  searchParams: Promise<{ id: string }>;
}) {
  const { study } = await params;
  const { id } = await searchParams;
  const topics: HydratedDocument<ITopic>[] | [] = await getAllTopics(id);

  return (
    <div className="space-y-4 max-w-screen-xl mx-auto">
      <div className="flex justify-between">
        <h1>{study.toUpperCase()}</h1>
          <Dialog action="delete" id={id} study={study} />
      </div>

      <h2>Topics:</h2>
      {topics.length < 1 && (
        <div>This study doesn&apos;t have any topics yet.</div>
      )}

      <div className="flex space-y-2 flex-col">
        {topics.length > 0 &&
          topics.map((topic) => (
            <Link
              key={Math.random().toFixed(4)}
              href={{
                pathname: `/${study}/${slug(topic.name)}`,
                query: { id: topic.id },
              }}
            >
              <div className="border w-fit p-2 rounded-lg hover:bg-slate-300">
                <p>{topic.name}</p>
              </div>
            </Link>
          ))}
      </div>

      <CreateForm action={createTopic} what="topic" param={study} id={id} />
    </div>
  );
}
