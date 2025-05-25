/* 
  Filename: page.js people/[id]
  Note: firstly checks if acotr exists using tvmaze api, then it sends another call but this
  time it embededs shows this actor was acting in, in rendering part it's split into 2 conditions
  if there is only one movie it places it in middle to account for having 1 movie placed to the left
  if there is more than one movie then it creates grid, also using tailwind I was able to optimise view
  for smaller devices by lowering number of rows that are displayed in grid for easier usage
*/

import Image from "next/image";
import BackButton from "@/app/components/BackButton";
import Link from "next/link";

export default async function ActorPage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `https://api.tvmaze.com/people/${id}?embed=castcredits`
  );
  if (!res.ok) {
    throw new Error("Not found");
  }

  const actor = await res.json();
  const castCreditsRes = await fetch(
    `https://api.tvmaze.com/people/${id}/castcredits?embed=show`
  );
  const castCredits = await castCreditsRes.json();

  return (
    <div className="relative w-full">
      <BackButton />
      <main className="w-[80%] mx-auto mt-10 flex flex-col items-center text-center">
        {actor.image?.medium && (
          <Image
            src={actor.image.medium}
            alt={actor.name}
            width={300}
            height={300}
            className="rounded mb-4"
          />
        )}
        <h1 className="text-4xl font-bold mb-2">{actor.name}</h1>
        <p className="text-gray-600 mb-6">
          {actor.birthday && `Born: ${actor.birthday}`}
        </p>

        {castCredits.length === 1 ? (
          <ul className="flex justify-center">
            {castCredits.map((credit, idx) => {
              const show = credit._embedded?.show;
              return (
                <Link key={idx} href={`/movies/${show.id}`}>
                  <li key={idx} className="p-4 rounded shadow text-center">
                    <h3 className="font-bold text-lg">{show?.name}</h3>
                    {show?.image?.medium && (
                      <Image
                        src={show.image.medium}
                        alt={show.name}
                        width={150}
                        height={200}
                        className="rounded mt-2 mx-auto"
                      />
                    )}
                  </li>
                </Link>
              );
            })}
          </ul>
        ) : (
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {castCredits.map((credit, idx) => {
              const show = credit._embedded?.show;
              return (
                <li key={idx} className="p-4 rounded shadowtext-center">
                  <Link href={`/movies/${show.id}`}>
                    <h3 className="font-bold text-lg">{show?.name}</h3>
                    {show?.image?.medium && (
                      <Image
                        src={show.image.medium}
                        alt={show.name}
                        width={200}
                        height={200}
                        className="rounded mt-2 mx-auto"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
