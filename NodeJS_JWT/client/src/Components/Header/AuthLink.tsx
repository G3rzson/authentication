import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Hooks/useGlobalContext";
import { handleLogout } from "../../Functions/handleLogout";
import LoadingModal from "../../Loader/LoadingModal";

export default function AuthLink() {
  const {
    user,
    loading,
    setLoading,
    setAccessToken,
    setUser,
    setInfo,
    setServerError,
  } = useGlobalContext();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingModal isOpen={true} />;
  }

  return (
    <>
      {user ? (
        <li className="sm:w-fit w-full">
          <button
            onClick={() =>
              handleLogout(
                setLoading,
                setAccessToken,
                setUser,
                setInfo,
                setServerError,
                navigate
              )
            }
            className="p-4 block  text-center hover:bg-zinc-200 hover:text-zinc-900 duration-500"
          >
            Kijelentkezés
          </button>
        </li>
      ) : (
        <li className="sm:w-fit w-full">
          <Link
            className="p-4 block  text-center hover:bg-zinc-200 hover:text-zinc-900 duration-500"
            to={"/user/login"}
          >
            Bejelentkezés
          </Link>
        </li>
      )}
    </>
  );
}
