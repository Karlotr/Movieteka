/* 
  Filename: route.js trailer
  Note: Internal api that uses TMDB api which offers trailer info based on show's name, tvmaze doesn't offer anything like that
  so I had to resort to using other api-s. Then it embedes it into youutube link because Api returns only key value of the trailer 
  not whole youtube link.
*/

import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const movieName = body?.name;

  if (!movieName) {
    return NextResponse.json({ error: "name missing" }, { status: 400 });
  }

  const apiKey = process.env.TMDB_API_KEY;

  try {
    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
        movieName
      )}`
    );
    const searchData = await searchRes.json();

    const movieId = searchData.results?.[0]?.id;

    if (!movieId) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    const videoRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
    );
    const videoData = await videoRes.json();

    const trailer = videoData.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    if (!trailer) {
      return NextResponse.json({ error: "Trailer not found" }, { status: 404 });
    }

    const embedUrl = `https://www.youtube.com/embed/${trailer.key}`;
    return NextResponse.json({ ok: true, embedUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
