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
  const [loading, setLoading] = useState(false);

  const options = ["Summary", "Terms and keywords", "Quiz"];

  const handleGenerateResponse = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <div className="space-y-2 rounded-lg p-2 flex flex-col justify-center">
      {isOpen && (
        <details
          open={isOpen}
          className="group border border-gray-200 rounded-lg shadow-sm transition-all duration-300 open:shadow-lg open:border-gray-300"
        >
          <summary className="flex items-center justify-between cursor-pointer px-4 py-2 text-lg font-semibold text-gray-700 bg-gray-100 rounded-lg group-open:bg-gray-200 group-open:text-gray-800 transition-all duration-300">
            {options[option]}
            <span className="ml-2 transform transition-transform duration-300 group-open:rotate-180">
              ▼
            </span>
          </summary>
          <div className="flex flex-col p-4 text-gray-600 bg-gray-50 rounded-b-lg overflow-y-scroll max-h-[50vh]">
            <ReactMarkDown>{response}</ReactMarkDown>
            <button
              className="w-fit px-4 py-2 ml-auto mt-4 rounded-lg bg-green-500 text-white font-semibold shadow-sm hover:bg-green-600 hover:shadow-md transition-all duration-300"
              onClick={handleGenerateResponse}
              disabled={loading}
            >
              {loading ? "Loading..." : isOpen ? "Create again" : `Create`}
            </button>
          </div>
        </details>
      )}
      {!isOpen && (
        <button
          className="w-fit px-4 py-2 mx-auto rounded-lg bg-green-500 text-white font-semibold shadow-sm hover:bg-green-600 hover:shadow-md transition-all duration-300"
          onClick={handleGenerateResponse}
          disabled={loading}
        >
          {loading ? "Loading..." : `Create ${options[option]}`}
        </button>
      )}
    </div>
  );
}
