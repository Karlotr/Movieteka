/* 
  Filename: route.js favorites
  Note: Api route which connects firebase database and githubAuth
*/

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getFavorites, saveFavorite, deleteFavorite } from "@/lib/favorites";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const items = await getFavorites(session.user.email);
  return new Response(JSON.stringify(items), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  const { id, name } = body;
  await saveFavorite(session.user.email, { id, name });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  await deleteFavorite(session.user.email, body.id);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
