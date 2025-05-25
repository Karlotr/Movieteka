/* 
  Filename: page.js movies/[id]
  Note: Movie page that uses 2 api-s, classic tvmaze api that was given to us for movie information
  and other api I decided to use so I can get trailer(sometimes inccorect). Other api is TMDB api 
  which has feature to return youtube link of trailer by sending it movie name. I created function
  fetchTrailerEmbedUrl so I can easly use this on local machine and later on vercel.
*/

import Image from "next/image";
import EpisodeSlider from "@/app/components/EpisodeSlider";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";
import FavoriteButton from "@/app/components/FavoriteButton";

async function fetchTrailerEmbedUrl(movieName) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/trailer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: movieName }),
  });

  const data = await res.json();
  return data.embedUrl || null;
}

export default async function Shows({ params }) {
  const { id } = await params;
  const res = await fetch(
    `https://api.tvmaze.com/shows/${id}?embed[]=episodes&embed[]=cast`
  );

  if (!res.ok) {
    throw new Error("Movie not found");
  }

  const data = await res.json();
  const imageUrl = data.image?.original || "";
  const embedUrl = await fetchTrailerEmbedUrl(data.name);

  return (
    <div className="relative w-full">
      <BackButton />
      <main className="w-[70%] mx-auto mt-4 flex flex-col">
        <div className="flex flex-col md:flex-row gap-6 rounded">
          <div className="w-[300px] h-[440px] relative rounded overflow-hidden border border-yellow-500">
            <Image
              src={imageUrl}
              alt={"Movie poster"}
              fill
              className="object-cover rounded"
              priority
            />
          </div>

          <div className="w-full md:w-2/3 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {data.name}
            </h1>
            <div
              className="text-base md:text-lg lg:text-xl"
              dangerouslySetInnerHTML={{ __html: data.summary }}
            />
          </div>
        </div>
        <ul>
          <li className="text-3xl font-bold text-yellow-500">
            Rating: {data.rating.average}
          </li>
          <li className="text-xl mb-2">Genres: {data.genres.join(" | ")}</li>
          <li>Language: {data.language}</li>
          <li>Status: {data.status}</li>
          <li>Premiered: {data.premiered}</li>
        </ul>
        <div className="w-[15%]">
          <FavoriteButton show={data}></FavoriteButton>
        </div>

        {embedUrl ? (
          <div className="flex justify-start items-start mt-10">
            <iframe
              width="560"
              height="315"
              src={embedUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="flex-middle mt-10"
            ></iframe>
          </div>
        ) : (
          <p></p>
        )}

        <div className="mt-8">
          <h2 className="text-3xl font-semibold mb-2 text-center">Episodes</h2>
          <EpisodeSlider episodes={data._embedded.episodes} showId={id} />
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-semibold mb-2">Cast</h2>
          <ul className="flex flex-wrap gap-4">
            {data._embedded.cast.map(({ person, character }) => (
              <li
                key={`${person.id}-${character.id}`}
                className="w-24 text-center"
              >
                <Link href={`/people/${person.id}`}>
                  {person.image?.medium ? (
                    <img
                      src={person.image.medium}
                      alt={person.name}
                      className="w-24 h-32 object-cover rounded"
                    />
                  ) : (
                    <div className="w-24 h-32 bg-gray-300 flex items-center justify-center text-sm rounded">
                      No Image
                    </div>
                  )}
                  <p className="font-semibold mt-2">{person.name}</p>
                  <p className="text-sm text-gray-600">{character.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
