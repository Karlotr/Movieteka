/* 
  Filename: page.js
  Note: Main page of the webapp, uses multiple components, firstly it fetches shows from external function
  (available for usage within whole project) and sends that data as props to client componets GenreRow and 
  FavoritesRow (didn't reuse GenreRow because it uses Api to get shows from id's saved in cookie), also 
  Search component for Show search
*/

import GenreRow from "./components/GenreRow";
import { getGenreData } from "./components/fetchShows";
import Search from "./components/Search";
import FavoritesRow from "./components/FavoritesRow";

export default async function HomePage() {
  const genreMap = await getGenreData();
  const selectedGenres = ["Action", "Comedy", "Drama", "Crime", "History"];

  return (
    <main className="p-6">
      <div className="flex flex-row">
        <h1 className="text-8xl text-yellow-600 font-sans font-bold">Movie</h1>
        <h1 className="text-8xl text-white font-sans font-bold">teka</h1>
      </div>
      <h1 className="text-2xl text-white font-sans  mb-20">
        Find out about best movies!
      </h1>
      <Search></Search>
      <FavoritesRow title="My Favorite Shows" />
      <GenreRow
        key={"Best Rated"}
        title={"Best Rated"}
        shows={genreMap["Best Rated"]}
      />
      <GenreRow
        key={"Most Recent"}
        title={"Most Recent"}
        shows={genreMap["Most Recent"]}
      />
      {selectedGenres.map((genre) => (
        <GenreRow key={genre} title={genre} shows={genreMap[genre] || []} />
      ))}
    </main>
  );
}
