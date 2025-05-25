/* 
  Filename: Search.js
  Note: Search component, with autocomplete. Autocomplete only starts working after 4 chars so it's doesn't 
  call api for something so irelevant, also there is a debouce to not hit api limits while searching. Autocomplete
  just uses tvmaze api with this algorthm "Search through all the shows in our database by the show's name. A fuzzy 
  algorithm is used (with a fuzziness value of 2), meaning that shows will be found even if your query contains small 
  typos. Results are returned in order of relevancy (best matches on top) and contain each show's full information."
*/

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length < 4) {
      setResults([]);
      return;
    }

    const fetchShows = async () => {
      try {
        const res = await fetch(
          `https://api.tvmaze.com/search/shows?q=${debouncedQuery}`
        );
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      }
    };

    fetchShows();
  }, [debouncedQuery]);

  return (
    <div className="relative w-full max-w-md mb-5">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search shows..."
        className="w-full p-2 border border-gray-300 rounded"
      />

      {results.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-black border border-gray-300 rounded mt-1 z-50 shadow-lg max-h-64 overflow-y-auto">
          {results.map((item) => (
            <Link key={item.show.id} href={`/movies/${item.show.id}`}>
              <li className="flex items-center gap-2 p-2 hover:bg-gray-100 hover:bg-opacity-50 hover:text-black cursor-pointer">
                {item.show.image?.medium ? (
                  <Image
                    src={item.show.image.medium}
                    alt={item.show.name}
                    className="w-10 h-14 object-cover rounded"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-10 h-14 bg-gray-300 flex items-center justify-center text-xs rounded text-black">
                    No Img
                  </div>
                )}
                <span>{item.show.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
