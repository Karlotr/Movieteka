/* 
  Filename: Auth.js
  Note: Basic auth component taken from react docs for providing autentification capabilities
*/

"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    <div className="flex gap-4 items-center absolute right-0 top-0">
      <span>{session.user.name}</span>
      <button
        onClick={() => signOut()}
        className="bg-gray-800 p-2 rounded text-white"
      >
        Sign out
      </button>
    </div>
  ) : (
    <button
      onClick={() => signIn("github")}
      className="bg-gray-800 p-2 rounded text-white absolute right-0 top-0"
    >
      GitHub Sign in
    </button>
  );
}
