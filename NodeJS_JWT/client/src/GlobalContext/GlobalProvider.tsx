import { useState, type ReactNode } from "react";
import { GlobalContext } from "./GlobalContext";

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        info,
        setInfo,
        serverError,
        setServerError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
