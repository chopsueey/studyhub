import Notes from "@/app/components/notes";
import { deleteTopic } from "@/backend/serveractions/Topic";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

// TODO: a summary plus an automated quiz
// across all notes to this topic (what about a direct prompt input?)

export default async function NewTopic({
  params,
  searchParams,
}: {
  params: Promise<{ study: string; topic: string }>;
  searchParams: Promise<{ id: string }>;
}) {
  const { topic, study } = await params;
  const { id } = await searchParams;

  return (
    <div className="space-y-8 max-w-screen-xl mx-auto ">
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
            className="w-fit p-2 ml-auto rounded-lg text-red-500 bg-white hover:bg-red-500 hover:text-white border hover:border-red-500 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Trash2 />
          </button>
        </form>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Notes study={study} topic={topic} id={id} />
      </Suspense>

      <Link
        className="block w-fit px-4 py-2 mt-4 rounded-lg bg-green-500 text-white font-semibold shadow-sm hover:bg-green-600 hover:shadow-md transition-all duration-300"
        href={{ pathname: `/${study}/${topic}/new-note`, query: { id: id } }}
      >
        Create a new note
      </Link>
    </div>
  );
}
