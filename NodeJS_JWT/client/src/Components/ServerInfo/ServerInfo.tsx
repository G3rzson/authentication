import { useEffect, useState } from "react";
import { useGlobalContext } from "../../Hooks/useGlobalContext";

export default function ServerInfo() {
  const { serverError, setServerError, info, setInfo } = useGlobalContext();
  const [visible, setVisible] = useState(false);

  // ha változik az üzenet, akkor mutasd és 3 mp után rejtsd el
  useEffect(() => {
    if (serverError || info) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        // Üzenet törlése az animáció után
        setTimeout(() => {
          setServerError(null);
          setInfo(null);
        }, 500);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [serverError, info, setServerError, setInfo]);

  if (!serverError && !info) return null;

  return (
    <div
      className={`text-center rounded p-4 absolute bottom-5 left-5 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      } ${
        serverError ? "bg-red-800 text-zinc-200" : "bg-green-800 text-zinc-200"
      }`}
    >
      <p className="text-xl">{serverError || info}</p>
    </div>
  );
}
