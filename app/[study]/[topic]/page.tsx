import Notes from "@/app/components/notes";
import { deleteTopic } from "@/backend/serveractions/Topic";
import Link from "next/link";
import { Suspense } from "react";

export default async function NewTopic({
  params,
  searchParams
}: {
  params: Promise<{ study: string; topic: string }>;
  searchParams: Promise<{ id: string }>;
}) {
  const { topic, study } = await params;
  const {id} = await searchParams;

  return (
    <div className="space-y-4 max-w-screen-xl mx-auto ">
      <div className="flex justify-between">
        <h1>{topic.toUpperCase()}</h1>

        <form
          action={async () => {
            "use server";
            await deleteTopic(id);
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

      <h2>
        TODO: a summary plus an automated quiz
        across all notes to this topic (what about a direct prompt input?)
      </h2>

      <Suspense fallback={<div>Loading...</div>}>
        <Notes study={study} topic={topic} id={id} />
      </Suspense>

      <div className="border w-fit p-2 bg-green-500/80 hover:bg-green-500">
        <Link href={{pathname: `/${study}/${topic}/new-note`, query: {id: id}}}>Create a new note.</Link>
      </div>
    </div>
  );
}
