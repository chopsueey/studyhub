import Link from "next/link";

export default async function Study({ params }: { params: { study: string } }) {
  const { study } = await params;

  return (
    <div>
      <h1>{study.toUpperCase()}</h1>

      <Link key={Math.random().toFixed(4)} href={`/${study}/new-note`}>
        <div className="border w-fit p-2 bg-green-500/80 hover:bg-green-500">
          <h2 className="text-xl">Create new note</h2>
        </div>
      </Link>
    </div>
  );
}
