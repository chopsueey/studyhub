"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ContextState {
  showEditor: boolean;
  setShowEditor: Dispatch<SetStateAction<boolean>>;
}

export const Context = createContext<ContextState | undefined>(undefined);

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showEditor, setShowEditor] = useState(false);
  const state: ContextState = {
    showEditor: showEditor,
    setShowEditor: setShowEditor,
  };
  return <Context.Provider value={state}>{children}</Context.Provider>;
}
