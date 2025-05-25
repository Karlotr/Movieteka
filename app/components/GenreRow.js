/* 
  Filename: GenreRow.js
  Note: Simple component used to display shows grouped into a category.
*/

"use client";
import Link from "next/link";
import Image from "next/image";

export default function GenreRow({ title, shows }) {
  return (
    <section>
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
    </section>
  );
}
