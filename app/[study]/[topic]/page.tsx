import Notes from "@/app/components/notes";
import Link from "next/link";
import { Suspense } from "react";

export default async function NewTopic({
  params,
}: {
  params: Promise<{ study: string; topic: string }>;
}) {
  const { topic, study } = await params;

  return (
    <div>
      <h1>{topic.toUpperCase()}</h1>
      <h2>
        TODO: Display all notes for this topic, a summary plus an automated quiz
        across all notes to this topic.
      </h2>

      <Suspense fallback={<div>Loading...</div>}>
        <Notes study={study} topic={topic} />
      </Suspense>

      <div className="border w-fit p-2 bg-green-500/80 hover:bg-green-500">
        <Link href={`/${study}/${topic}/new-note`}>Create a new note.</Link>
      </div>
    </div>
  );
}
