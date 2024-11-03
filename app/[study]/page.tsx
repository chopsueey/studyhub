import Link from "next/link";
import slug from "slug";

export default async function Study({ params }: { params: Promise<{ study: string }>}) {
  const { study } = await params;
  const topics = ["Basics", "History of ...", "Module II"];
  return (
    <div>
      <h1>{study.toUpperCase()}</h1>

      <Link key={Math.random().toFixed(4)} href={`/${study}/new-note`}>
        <div className="border w-fit p-2 bg-green-500/80 hover:bg-green-500">
          <h2 className="text-xl">Create new note</h2>
        </div>
      </Link>

      <h1>Topics:</h1>
      {topics.length < 1 && <div>Create a new topic first</div>}

      <div className="flex space-x-2">
        {topics.length > 1 &&
          topics.map((topic) => (
            <Link key={Math.random().toFixed(4)} href={`/${study}/${slug(topic)}`}>
              <div className="border w-fit p-2 hover:bg-slate-300">
                <h2 className="text-xl">{topic}</h2>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
