"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Breadcrumb() {
  const path = usePathname();
  const searchParams = useSearchParams()
  console.log(searchParams)
  const segments = path.split("/").filter((item) => item != "");

  return (
    <div className="flex max-w-screen-lg mx-auto">
      {segments.map((segment, index) => (
        <>
          <Link
            className="hover:underline text-blue-500"
            key={Math.random()}
            href={`/${segment}`}
          >
            {segment + " "}
          </Link>
          <p key={Date()}>&nbsp;{segments.length > 1 && index !== segments.length - 1 && `>`}&nbsp;</p>
        </>
      ))}
    </div>
  );
}
