/* 
  Filename: FavoriteRow.js
  Note: Simular component to the GenreRow, made into seperate component because only id's are saved to the firebase
  not whole object so it required tvmaze api to return objects corresponding to the given id
*/

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FavoritesRow({ title = "Favorites" }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const res = await fetch("/api/favorites");
        if (!res.ok) {
          setShows([]);
          setLoading(false);
          return;
        }
        const favoriteIds = await res.json();

        const ids = favoriteIds.map((fav) => fav.id);

        const detailedShows = await Promise.all(
          ids.map(async (id) => {
            const showRes = await fetch(`https://api.tvmaze.com/shows/${id}`);
            if (!showRes.ok) return null;
            const showData = await showRes.json();
            return {
              id: showData.id,
              name: showData.name,
              image: showData.image?.medium || null,
            };
          })
        );

        setShows(detailedShows.filter(Boolean));
      } catch (error) {
        console.error("Failed to fetch favorites", error);
        setShows([]);
      }
      setLoading(false);
    }

    fetchFavorites();
  }, []);

  return (
    <div>
      {!loading && shows.length === 0 ? null : (
        <>
          <h2 className="text-4xl font-bold mb-1">{title}</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {shows.map((show) => (
              <div
                key={show.id}
                className="min-w-[150px] flex-shrink-0 flex flex-col transform transition-transform duration-200 hover:scale-105"
              >
                <Link href={`/movies/${show.id}`}>
                  {show.image ? (
                    <Image
                      width={150}
                      height={192}
                      src={show.image}
                      alt={show.name}
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-lg">
                      <span className="text-gray-600 text-sm">No Image</span>
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
