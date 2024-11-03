import Link from "next/link";
import slug from "slug";

export default function Home() {
  const studies = ["Math", "Webdevelopment", "C language"];
  return (
    <div>
      <h1>Your studies:</h1>
      {studies.length < 1 && <div>Create a new study first</div>}

      <div className="flex space-x-2">
        {studies.length > 1 &&
          studies.map((subject) => (
            <Link
              key={Math.random().toFixed(4)}
              href={`/${slug(subject)}`}
            >
              <div className="border w-fit p-2 hover:bg-slate-300">
                <h2 className="text-xl">{subject}</h2>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
