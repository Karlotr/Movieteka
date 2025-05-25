/* 
  Filename: Providers.js
  Note: Component used so session can be tracked(client)
*/

"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
