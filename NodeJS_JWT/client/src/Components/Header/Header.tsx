import { Link } from "react-router-dom";
import { navLinks } from "./navLinks";

export default function Header() {
  return (
    <header className="bg-zinc-900">
      <nav className="sm:w-4/5 w-full mx-auto">
        <ul className="flex items-center justify-end sm:flex-row flex-col">
          {navLinks.map((link) => (
            <li key={link.title} className="sm:w-fit w-full">
              <Link
                className="p-4 block text-center hover:bg-zinc-200 hover:text-zinc-900 duration-500"
                to={link.href}
              >
                {link.title}
              </Link>
            </li>
          ))}
          <li className="sm:w-fit w-full">
            <Link
              className="p-4 block  text-center hover:bg-zinc-200 hover:text-zinc-900 duration-500"
              to={"/user/login"}
            >
              Bejelentkezés
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
