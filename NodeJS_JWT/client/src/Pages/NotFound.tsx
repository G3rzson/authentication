import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center flex-col h-[60vh]">
      <h1 className="pageTitle">404 | Page not found</h1>
      <Link
        className="bg-amber-600 hover:bg-amber-400 duration-500 text-zinc-900 px-4 py-2 rounded"
        to={"/"}
      >
        Vissza a Főoldalra
      </Link>
    </div>
  );
}
