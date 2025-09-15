import { Link } from "react-router-dom";

type Props = {
  text: string;
  linkText: string;
  path: string;
};

export default function Paragraph({ text, linkText, path }: Props) {
  return (
    <div className="flex flex-row gap-2 mt-4">
      <p>{text}</p>
      <Link className="hover:text-green-500 duration-500" to={path}>
        {linkText}
      </Link>
    </div>
  );
}
