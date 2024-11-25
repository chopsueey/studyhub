"use client";

import { useEffect, useRef, useState } from "react";
import AiResponseButton from "./ai-response-button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar({ noteId }: { noteId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  function handleOutsideClick(e: MouseEvent) {
    const sidebar = sidebarRef.current;

    if (sidebar && !sidebar.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);
  return (
    <div
    ref={sidebarRef}
      className={`h-screen w-1/2 fixed top-0 left-0 flex flex-col space-y-8 overflow-y-auto p-8 bg-white border rounded-2xl shadow-md transition-all duration-300 ${
        isOpen ? "-translate-x-[0]" : "-translate-x-[90%]"
      }`}
    >
      <button
        className="ml-auto border rounded-full p-1 hover:border-black transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft className="relative right-[1px]" /> : <ChevronRight className="relative left-[1px]" />}
      </button>

      <AiResponseButton noteId={noteId} option={0} />
      <AiResponseButton noteId={noteId} option={1} />
      <AiResponseButton noteId={noteId} option={2} />
    </div>
  );
}
