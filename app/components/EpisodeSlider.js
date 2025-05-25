/* 
  Filename: EpisodeSlider.js
  Note: Netlifx like slider, with episodes being displayed in horizontal way. By hovering there is summary that 
  describes that apisode and upon clicking it leads you to the episode page.
*/

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function EpisodeSlider({ episodes, showId }) {
  const seasons = Array.from(new Set(episodes.map((ep) => ep.season))).sort(
    (a, b) => a - b
  );

  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);

  const filteredEpisodes = episodes.filter(
    (ep) => ep.season === selectedSeason
  );

  return (
    <div>
      <div className="mb-4 flex justify-start ">
        <select
          id="season"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
          className="border rounded px-6 py-2 bg-gray text-white text-xl"
        >
          {seasons.map((season) => (
            <option key={season} value={season}>
              Season {season}
            </option>
          ))}
        </select>
      </div>

      <div className="flex overflow-x-auto gap-4 py-4 bg-gray-0">
        {filteredEpisodes.map((ep) => (
          <Link key={ep.id} href={`/movies/${showId}/episodes/${ep.id}`}>
            <div
              className="relative flex-shrink-0 w-60 rounded shadow p-2 bg-white-0 cursor-pointer group transition-all duration-300 ease-in-out hover:h-[320px]"
              style={{ height: 200 }}
            >
              {ep.image ? (
                <Image
                  src={ep.image.medium}
                  alt={ep.name}
                  width={250}
                  height={140}
                  className="rounded object-cover"
                />
              ) : (
                <div className="w-full h-[140px] bg-gray-0 rounded flex items-center justify-center text-sm text-gray-500">
                  No Image
                </div>
              )}

              <h3 className="font-semibold mt-2 text-sm">{ep.name}</h3>
              <p className="text-xs text-gray-600">
                S{ep.season}E{ep.number}
              </p>

              <div
                className="absolute left-0 right-0 bottom-0 bg-black bg-opacity-80 text-white p-2 opacity-0 group-hover:opacity-100 overflow-auto text-xs"
                style={{ maxHeight: "100px", transition: "opacity 0.3s ease" }}
              >
                {ep.summary ? ep.summary.replace(/<[^>]+>/g, "") : "No summary"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
