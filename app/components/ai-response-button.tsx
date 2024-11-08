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
        className="w-fit px-4 py-2 rounded-lg bg-green-500 text-white font-semibold shadow-sm hover:bg-green-600 hover:shadow-md transition-all duration-300"
        onClick={handleGenerateResponse}
      >
        Create {options[option]}
      </button>
      {isOpen && (
        <details open={isOpen} className="group border my-4 border-gray-200 rounded-lg shadow-sm transition-all duration-300 open:shadow-lg open:border-gray-300">
          <summary className="flex items-center justify-between cursor-pointer p-4 text-lg font-semibold text-gray-700 bg-gray-100 rounded-lg group-open:bg-gray-200 group-open:text-gray-800 transition-all duration-300">
            More Information
            <span className="ml-2 transform transition-transform duration-300 group-open:rotate-180">
              ▼
            </span>
          </summary>
          <div className="p-4 text-gray-600 bg-gray-50 rounded-b-lg overflow-y-scroll max-h-[50vh]">
            <ReactMarkDown>{response}</ReactMarkDown>
          </div>
        </details>
      )}

      {/* <details open={isOpen}>
        <ReactMarkDown>{response}</ReactMarkDown>
      </details> */}
    </div>
  );
}
