"use client";

import { useState } from "react";
import AiResponseButton from "./ai-response-button";

export default function Sidebar({ noteId }: { noteId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`max-h-screen fixed left-[2.5%] top-0 space-y-2 overflow-y-auto pr-8 pt-24 bg-white ${isOpen && "-left-7"}`}>
      <button className="absolute left-full z-50" onClick={() => setIsOpen(!isOpen)}>arrow</button>
      <AiResponseButton noteId={noteId} option={0} />
      <AiResponseButton noteId={noteId} option={1} />
      <AiResponseButton noteId={noteId} option={2} />
    </div>
  );
}
