"use client";

import { useState } from "react";
import ReactMarkDown from "react-markdown";

export default function AiResponseButton({
  noteId,
  option,
}: {
  noteId: string;
  option: number;
}) {
  const [response, setResponse] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Summary", "Keywords", "Quiz"];

  const handleGenerateResponse = async () => {
    const res = await fetch("/api/generateAIResponse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteId, option }),
    });
    const data = await res.json();
    setResponse(data.asText || "No response from AI");

    if (data.asText) {
      setIsOpen(true);
    }
  };

  return (
    <div className="max-w-screen-sm">
      <button
        className="w-fit p-2 rounded-lg bg-green-500/80 hover:bg-green-500"
        onClick={handleGenerateResponse}
      >
       Create {options[option]}
      </button>
      <details open={isOpen}>
        <ReactMarkDown>{response}</ReactMarkDown>
      </details>
    </div>
  );
}
