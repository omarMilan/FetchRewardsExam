import { useEffect, useState } from "react";

export default function Filter({ onApplyFilters }) {
  // ✅ Ensure it's a default export
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [sortOrder, setSortOrder] = useState("breed:asc");

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs/breeds",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) throw new Error("Failed to fetch breeds");

        const breedList = await response.json();
        setBreeds(breedList);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    fetchBreeds();
  }, []);

  const handleApplyFilters = () => {
    onApplyFilters({
      breed: selectedBreed || null,
      zipCode: zipCode || null,
      sort: sortOrder,
    });
  };

  return (
    <div className="bg-primary w-fit h-full rounded-xs px-20 py-5  flex flex-row items-center justify-between text-white">
      {/* Breed Dropdown */}
      <select
        className="text-white bg-primary p-1 rounded font-bold"
        value={selectedBreed}
        onChange={(e) => setSelectedBreed(e.target.value)}
      >
        <option value="">All Breeds</option>
        {breeds.map((breed, index) => (
          <option key={index} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      {/* Zip Code Input */}
      <input
        type="text"
        placeholder="Zip Code"
        className="text-white p-1 rounded-xs font-bold"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />

      {/* Sort Order Dropdown */}
      <select
        className="text-white bg-primary p-1 rounded font-bold"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="breed:asc">Breed (A-Z)</option>
        <option value="breed:desc">Breed (Z-A)</option>
      </select>

      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="bg-white text-primary font-bold cursor-pointer px-4 py-1 rounded-xs ml-10"
      >
        Apply
      </button>
    </div>
  );
}
