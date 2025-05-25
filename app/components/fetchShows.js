/* 
  Filename: fetchShows.js
  Note: Function that returns array that sorts shows into genres, because of performace it only renders first 2 pages, 2 random pages and one of the last pages
  that contain movies with mostly full data(there are few more pages after but mostly not with filled in details). It was madel ike this because this api doesn't
  offer any capabilities to fetch shows based on their genre so I needed to load them in first then sort them into genres, also besides normal genres it adds 
  best rated and most recent shows(that's why I fetched one of the last pages) categories.
*/

export async function getGenreData() {
  const randNum1 = Math.floor(Math.random() * 200);
  const randNum2 = Math.floor(Math.random() * 200);
  let allShows = [];
  const pagesToFetch = [0, 1, randNum1, randNum2, 240];
  for (const page of pagesToFetch) {
    const res = await fetch(`https://api.tvmaze.com/shows?page=${page}`);
    if (res.status === 404) continue;

    const data = await res.json();
    allShows.push(...data);
  }

  const minimalShows = allShows.map((show) => ({
    id: show.id,
    name: show.name,
    image: show.image?.medium || null,
    premiered: show.premiered,
    rating: show.rating?.average || 0,
    genres: show.genres,
  }));

  const genreMap = {};

  minimalShows.forEach((show) => {
    const minimal = {
      id: show.id,
      name: show.name,
      image: show.image,
    };

    show.genres.forEach((genre) => {
      if (!genreMap[genre]) genreMap[genre] = [];
      genreMap[genre].push(minimal);
    });
  });

  genreMap["Most Recent"] = [...minimalShows]
    .filter((s) => s.premiered && !isNaN(new Date(s.premiered)))
    .sort((a, b) => new Date(b.premiered) - new Date(a.premiered))
    .slice(0, 20)
    .map(({ id, name, image }) => ({ id, name, image }));

  genreMap["Best Rated"] = [...minimalShows]
    .filter((s) => s.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 20)
    .map(({ id, name, image }) => ({ id, name, image }));

  return genreMap;
}
