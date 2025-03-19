import { useState, useEffect } from "react";
import Filter from "../components/Filter";

export default function MatchMePage() {
  const [filters, setFilters] = useState({});
  const [dogIds, setDogIds] = useState([]); // Stores IDs of fetched dogs
  const [dogs, setDogs] = useState([]); // Stores full dog data
  const [currentPage, setCurrentPage] = useState(0); // Pagination
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  // Function to toggle favorite selection
  const toggleFavorite = (dogId) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.includes(dogId);
      const updatedFavorites = isAlreadyFavorite
        ? prevFavorites.filter((id) => id !== dogId) // Remove if already in favorites
        : [...prevFavorites, dogId]; // Add if not in favorites

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  // Function to fetch dog IDs based on filters
  const fetchDogs = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (filters.breed) queryParams.append("breeds", filters.breed);
      if (filters.zipCode) queryParams.append("zipCodes", filters.zipCode);
      queryParams.append("size", 8);
      queryParams.append("from", currentPage * 10);
      queryParams.append("sort", filters.sort || "breed:asc");

      const response = await fetch(
        `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams.toString()}`,
        {
          method: "GET",
          credentials: "include", // ✅ Required for authentication
        }
      );

      if (!response.ok) throw new Error("Failed to fetch dogs");

      const data = await response.json();
      setDogIds(data.resultIds);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  // Function to fetch full dog details using dog IDs
  const fetchDogDetails = async () => {
    if (dogIds.length === 0) return;

    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dogIds),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch dog details");

      const dogData = await response.json();
      setDogs(dogData);
    } catch (error) {
      console.error("Error fetching dog details:", error);
    }
  };

  // Fetch dog IDs when filters change
  useEffect(() => {
    fetchDogs();
  }, [filters, currentPage]);

  // Fetch full dog details when dog IDs change
  useEffect(() => {
    fetchDogDetails();
  }, [dogIds]);

  return (
    <div className="w-screen flex flex-col items-center">
      <Filter onApplyFilters={setFilters} />

      {/* Wrapper for Scrolling Content */}
      <div className="w-full max-w-6xl px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dogs.map((dog) => (
            <button key={dog.id} onClick={() => toggleFavorite(dog.id)}>
              <div
                className={`bg-gray-900 hover:-translate-y-2 cursor-pointer transition-all duration-300 p-4 rounded-xs shadow-md 
                ${
                  favorites.includes(dog.id)
                    ? "ring-4 ring-red-500" // ✅ Show red ring if favorited
                    : "ring-0 hover:ring-4 hover:ring-red-500" // Hover effect only if not favorited
                }`}
              >
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
            </button>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-6 mb-10">
        <button
          className="bg-primary text-white px-4 cursor-pointer py-2 rounded"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
        >
          Previous
        </button>
        <button
          className="bg-primary text-white px-4 cursor-pointer py-2 rounded"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
