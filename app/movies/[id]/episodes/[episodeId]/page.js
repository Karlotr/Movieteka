/* 
  Filename: page.js movies/[id]/episodes/[episodeId]
  Note: Very simple page that displays besic information of selected episode
*/

import Image from "next/image";
import BackButton from "@/app/components/BackButton";

export default async function EpisodePage({ params }) {
  const { episodeId } = params;

  const res = await fetch(`https://api.tvmaze.com/episodes/${episodeId}`);

  if (!res.ok) {
    throw new Error("Episode not found");
  }

  const data = await res.json();
  const imageUrl = data.image?.original;

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 rounded">
        <div className="w-full md:w-1/3 relative rounded overflow-hidden">
          <BackButton></BackButton>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`Image ${data.name}`}
              width={300}
              height={640}
              className="object-contain rounded mb-2"
              priority
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-800 flex items-center justify-center text-gray-400 text-sm rounded">
              No Image
            </div>
          )}
        </div>

        <div className="w-full md:w-2/3 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {data.name}
          </h1>

          <p className="text-base md:text-lg lg:text-xl mb-2">
            Season {data.season} Episode {data.number}
          </p>

          <p className="text-sm text-gray-400 mb-2">
            Airdate: {data.airdate} | Runtime: {data.runtime} minutes
          </p>

          <div
            className="text-base md:text-lg"
            dangerouslySetInnerHTML={{ __html: data.summary }}
          />
        </div>
      </div>
    </main>
  );
}
