import React, { useEffect, useState } from 'react';

export default function GameReleaseGuide() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingGames = async () => {
      setLoading(true);
      const today = new Date();
      const endDate = new Date();
      endDate.setMonth(today.getMonth() + 3);

      const startStr = today.toISOString().split('T')[0];
      const endStr = endDate.toISOString().split('T')[0];

      const url = `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&dates=${startStr},${endStr}&ordering=released&page_size=100`;
      console.log("Fetching from URL:", url);

      try {
        const response = await fetch(url);
        console.log("Response received");

        const data = await response.json();
        console.log("Parsed JSON:", data);

        // Filter to only games with images
        const filteredGames = data.results.filter(game => game.background_image && game.background_image.trim() !== "");

        //Slice to only the first 30
        setGames(filteredGames.slice(0, 30));

      } catch (error) {
        console.error("Error fetching upcoming games:", error);
        setGames([]);
      } finally {
        setLoading(false);
        console.log("Loading complete");
      }
    };

    fetchUpcomingGames();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading upcoming games...</p>;
  if (games.length === 0) return <p className="text-center text-gray-500">No upcoming games found.</p>;

  return (
  <div className="min-h-screen bg-black text-neonGreen p-6 font-rubik">
    <h2 className="text-3xl font-bold mb-6 text-neonGreen text-center">Game Release Guide</h2>
    <h4 className="text-1xl font-bold mb-4 text-white text-center">Discover the Latest Games Coming Soon&trade;</h4>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <li
          key={game.id}
          className="bg-gray-900 rounded-xl shadow-lg p-4 flex flex-col items-center text-center border border-neonGreen ring-1 ring-neonGreen hover:ring-4 transition-all duration-200"
        >
          {game.background_image ? (
            <img
              src={game.background_image}
              alt={game.name}
              className="rounded-md mb-2 w-full h-48 sm:h-56 md:h-64 object-cover transition-opacity duration-500 ease-in-out"
            />
          ) : (
            <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-white text-sm">
              No image available
            </div>
          )}
          <strong className="text-lg font-bold text-neonGreen">{game.name}</strong>
          <p className="text-sm text-white mt-1">Release Date: {game.released}</p>

          {game.website ? (
            <a
              href={game.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-neonGreen transition-colors"
            >
              Visit Official Website
            </a>
          ) : game.slug ? (
              <a
              href={`https://rawg.io/games/${game.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block bg-neonGreen text-black px-4 py-2 rounded hover:bg-white transition"
            >
              See Details
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  </div>
);
}