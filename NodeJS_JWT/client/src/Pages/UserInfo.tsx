import { Link } from "react-router-dom";
import { useGlobalContext } from "../Hooks/useGlobalContext";
import LoadingModal from "../Loader/LoadingModal";
import { useEffect, useState } from "react";
import { getData } from "../Functions/getData";

export default function UserInfo() {
  const { user, loading, setLoading, accessToken, setAccessToken } =
    useGlobalContext();
  const [serverInfo, setServerInfo] = useState<string | null>(null);

  useEffect(() => {
    getData(setLoading, accessToken, setAccessToken, setServerInfo);
  }, [setLoading, accessToken, setAccessToken]);

  if (loading) {
    return <LoadingModal isOpen={true} />;
  }

  return (
    <>
      {user ? (
        <div className="flex items-center flex-col justify-center h-[60vh] p-4">
          <h1 className="pageTitle">
            Bejelentkezve, mint <span className="text-green-500">{user}</span>
          </h1>
          <p className="text-2xl text-center">{serverInfo}</p>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col gap-4 h-[60vh] p-4">
          <h1 className="pageTitle">Nincs bejelentkezve!</h1>
          <Link
            className="bg-green-600 hover:bg-green-400 duration-500 text-zinc-800 py-2 px-4 cursor-pointer rounded"
            to={"/user/login"}
          >
            Bejelentkezés
          </Link>
        </div>
      )}
    </>
  );
}
