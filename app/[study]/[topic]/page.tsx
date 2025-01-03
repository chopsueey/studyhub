import Dialog from "@/app/components/dialog";
import Notes from "@/app/components/notes";
import { findTopicById } from "@/backend/serveractions/Topic";
import Link from "next/link";
import { Suspense } from "react";

// TODO: a summary plus an automated quiz
// across all notes to this topic (what about a direct prompt input?)

export default async function NewTopic({
  params,
  searchParams,
}: {
  params: Promise<{ study: string; topic: string }>;
  searchParams: Promise<{ topicId: string }>;
}) {
  const { topic, study } = await params;
  const { topicId } = await searchParams;

  const findTopic = await findTopicById(topicId);

  if (!findTopic) {
    throw new Error("Topic does not exist.")
  }

  return (
    <div className="space-y-8 max-w-screen-xl mx-auto ">
      <div className="flex justify-between">
        <h1>{topic.toUpperCase()}</h1>

        <Dialog action="delete" id={topicId} topic={topic} />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Notes study={study} topic={topic} topicId={topicId} />
      </Suspense>

      <Link
        className="block w-fit px-4 py-2 mt-4 rounded-lg bg-green-500 text-white font-semibold shadow-sm hover:bg-green-600 hover:shadow-md transition-all duration-300"
        href={{
          pathname: `/${study}/${topic}/new-note`,
          query: { topicId: topicId },
        }}
      >
        Create a new note
      </Link>
    </div>
  );
}
