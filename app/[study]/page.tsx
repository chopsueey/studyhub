import Link from "next/link";
import slug from "slug";
import CreateForm from "../components/create-form";
import { createTopic, getAllTopics } from "@/backend/serveractions/Topic";

export default async function Study({
  params,
}: {
  params: Promise<{ study: string }>;
}) {
  const { study } = await params;
  const topics = await getAllTopics();

  if (!topics) {
    return (
      <div>
        <h1>This note does not exist anymore.</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>{study.toUpperCase()}</h1>

      <h2>Topics:</h2>
      {topics.length < 1 && <div>Create a new topic first</div>}

      <div className="flex space-x-2">
        {topics.length > 0 &&
          topics.map((topic) => (
            <Link
              key={Math.random().toFixed(4)}
              href={`/${study}/${slug(topic.name)}`}
            >
              <div className="border w-fit p-2 hover:bg-slate-300">
                <p>{topic.name}</p>
              </div>
            </Link>
          ))}
      </div>

      <div className="border w-fit p-2 bg-green-500/80 hover:bg-green-500">
        <CreateForm action={createTopic} what="topic" />
      </div>
    </div>
  );
}
