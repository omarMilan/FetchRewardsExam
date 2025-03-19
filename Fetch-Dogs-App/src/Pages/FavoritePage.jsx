import { useEffect, useState } from "react";

export default function FavoritePage() {
  const [favoriteDogs, setFavoriteDogs] = useState([]);
  const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

  // Function to fetch favorite dogs based on saved IDs
  const fetchFavoriteDogs = async () => {
    if (favoriteIds.length === 0) return;

    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(favoriteIds),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch favorite dogs");

      const dogData = await response.json();
      setFavoriteDogs(dogData);
    } catch (error) {
      console.error("Error fetching favorite dogs:", error);
    }
  };

  // Remove a favorite
  const removeFavorite = (dogId) => {
    const updatedFavorites = favoriteIds.filter((id) => id !== dogId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavoriteDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== dogId));
  };

  useEffect(() => {
    fetchFavoriteDogs();
  }, []);

  return (
    <div className="w-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mt-6">Your Favorite Dogs</h1>

      {favoriteDogs.length === 0 ? (
        <p className="text-white mt-4">No favorites yet. Go find some!</p>
      ) : (
        <div className="w-full max-w-6xl px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteDogs.map((dog) => (
              <div
                key={dog.id}
                className="bg-gray-900 p-4 rounded-xs shadow-md relative"
              >
                <button
                  onClick={() => removeFavorite(dog.id)}
                  className="absolute bottom-2 cursor-pointer right-2 ring-0 hover:ring-2 ring-red-500 duration-300 transition-all bg-gray-900 text-white px-2 py-1 rounded-2xl text-sm"
                >
                  Remove
                </button>
                <img
                  src={dog.img}
                  alt={dog.name}
                  className="w-full h-40 object-cover rounded-xs"
                />
                <h2 className="text-lg text-white font-bold mt-2">
                  {dog.name}
                </h2>
                <p className="text-sm text-white">Breed: {dog.breed}</p>
                <p className="text-sm text-white">Age: {dog.age} years</p>
                <p className="text-sm text-white">Location: {dog.zip_code}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
