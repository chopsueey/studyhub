import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/create"}>Create</Link>
      <Link href={"/learn"}>Learn</Link>
    </div>
  );
}
