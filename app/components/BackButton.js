/* 
  Filename: BackButton.js
  Note: BackButton component taken from edit materials that provides ability to return to previous state
*/

"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  function handleClick() {
    router.back();
  }

  return (
    <button
      onClick={handleClick}
      className="hidden sm:block border  ml-10text-xl bg-black-0 pb-1 pt-1 pl-5 pr-5 rounded-lg"
    >
      Return
    </button>
  );
}
