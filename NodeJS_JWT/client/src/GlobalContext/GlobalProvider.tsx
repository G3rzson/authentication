import { useEffect, useState, type ReactNode } from "react";
import { GlobalContext } from "./GlobalContext";
import { fetchUser } from "../Functions/fetchUser";

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    fetchUser(setUser, setLoading, null, setAccessToken);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        info,
        setInfo,
        serverError,
        setServerError,
        user,
        setUser,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
