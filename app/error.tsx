"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-8 max-w-screen-xl mx-auto ">
      <h1 className="mx-auto w-fit">
        An error occured or this page does not exist anymore.
      </h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
