"use client";

import { useState } from "react";
import AiResponseButton from "./ai-response-button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar({ noteId }: { noteId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`h-screen w-1/2 fixed top-0 left-0 flex flex-col space-y-8 overflow-y-auto p-8 bg-white border rounded-2xl shadow-md transition-all duration-300 ${
        isOpen ? "-translate-x-[0]" : "-translate-x-[90%]"
      }`}
    >
      <button
        className="ml-auto border rounded-full p-1 hover:border-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>

      <AiResponseButton noteId={noteId} option={0} />
      <AiResponseButton noteId={noteId} option={1} />
      <AiResponseButton noteId={noteId} option={2} />
    </div>
  );
}
