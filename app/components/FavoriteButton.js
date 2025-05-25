/* 
  Filename: FavoriteButton.js
  Note: Simple hearth shaped button that uses internal api for favorite managment. Using Delete, Post and Fetch.
*/

"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Heart, HeartOff } from "lucide-react";

export default function FavoriteButton({ show }) {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!session || !show?.id) return;

    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        setIsFavorite(data.some((fav) => fav.id === show.id));
      });
  }, [session, show?.id]);

  const toggleFavorite = async () => {
    if (!session) return alert("Log in for this action!");
    if (!show?.id) return;

    if (isFavorite) {
      await fetch("/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: show.id }),
      });
      setIsFavorite(false);
    } else {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(show),
      });
      setIsFavorite(true);
    }
  };

  if (!show?.id) return null;

  return (
    <button
      onClick={toggleFavorite}
      className="w-[30%] inline-flex items-center justify-center p-2 rounded-lg"
    >
      {isFavorite ? (
        <Heart className="text-red-500 fill-red-500 w-6 h-6" />
      ) : (
        <Heart className="text-gray-400 w-6 h-6" />
      )}
    </button>
  );
}
