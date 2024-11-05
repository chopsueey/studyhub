import { connectToDatabase } from "@/backend/lib/mongoose";
import { createStudy, getAllStudies } from "@/backend/serveractions/Study";
import Link from "next/link";
import slug from "slug";
import CreateForm from "./components/create-form";

await connectToDatabase(); // should be called globally or dynamically on the server as static components aren't executed again

export default async function Home() {
  const studies = await getAllStudies();

  if (!studies) {
    return (
      <div>
        <h1>This note does not exist anymore.</h1>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-screen-xl mx-auto">
      <h1>Your studies:</h1>
      {studies.length < 1 && <div>Create a new study first</div>}

      <div className="flex space-x-2">
        {studies.length > 0 &&
          studies.map((subject) => (
            <Link key={Math.random().toFixed(4)} href={`/${slug(subject.name)}`}>
              <div className="border w-fit p-2 hover:bg-slate-300">
                <p>{subject.name}</p>
              </div>
            </Link>
          ))}
      </div>

      <div className="border w-fit p-2 bg-green-500/80 hover:bg-green-500">
        <CreateForm action={createStudy} what="study"/>
      </div>
    </div>
  );
}
