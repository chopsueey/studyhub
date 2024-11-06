import Link from "next/link";
import slug from "slug";
import CreateForm from "../components/create-form";
import { createTopic, getAllTopics } from "@/backend/serveractions/Topic";
import { HydratedDocument } from "mongoose";
import { ITopic } from "@/backend/models/Topic";
import { deleteStudy } from "@/backend/serveractions/Study";

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

        <form
          action={async () => {
            "use server";
            await deleteStudy(id);
          }}
        >
          <button
            type="submit"
            className="border w-fit p-2 bg-red-500/80 hover:bg-red-500"
          >
            delete
          </button>
        </form>
      </div>

      <h2>Topics:</h2>
      {topics.length < 1 && (
        <div>This study doesn&apos;t have any topics yet.</div>
      )}

      <div className="flex space-x-2">
        {topics.length > 0 &&
          topics.map((topic) => (
            <Link
              key={Math.random().toFixed(4)}
              href={{
                pathname: `/${study}/${slug(topic.name)}`,
                query: { id: topic.id },
              }}
            >
              <div className="border w-fit p-2 hover:bg-slate-300">
                <p>{topic.name}</p>
              </div>
            </Link>
          ))}
      </div>

      <div className="border w-fit p-2 bg-green-500/80 hover:bg-green-500">
        <CreateForm action={createTopic} what="topic" param={study} id={id} />
      </div>
    </div>
  );
}
