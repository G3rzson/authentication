import React from "react";

type Props = {
  children: React.ReactNode;
  isSubmitting: boolean;
};

export default function SubmitBtn({ children, isSubmitting }: Props) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="bg-green-600 hover:bg-green-400 duration-500 text-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 p-2 cursor-pointer w-full rounded mt-4"
    >
      {children}
    </button>
  );
}
