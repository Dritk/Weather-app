import { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import useDebounce from "../Hooks/useDebounce";
import useCitySearch from "../Hooks/useCitySearch";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchCity, setSearchCity] = useState("");
  const debouncedSearch = useDebounce(searchCity, 300);
  const { data: cities } = useCitySearch(debouncedSearch);

  const handleSearch = (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (
      e &&
      "key" in e &&
      /\d|[!@#$%^&*()_+\-=[\]{};':"\\|.<>/?]/.test(e.key)
    ) {
      e.preventDefault();
      return;
    }

    if (
      !e ||
      ("key" in e && e.key === "Enter") ||
      ("type" in e && e.type === "click")
    ) {
      if (debouncedSearch.trim()) {
        onSearch(debouncedSearch);
      }
    }
  };

  return (
    <>
      {/* Search Bar */}
      <div className="relative w-full flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter a city"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyDown={handleSearch}
          maxLength={30}
          className="w-full p-3 rounded-3xl bg-[#C2D4D3] text-[#7E7C7C] placeholder-[#7E7C7C] font-medium"
        />
        <button onClick={handleSearch} className="absolute right-3">
          <FaSearchLocation className="text-[#7E7C7C] text-xl" />
        </button>
      </div>

      {/* City suggestions */}
      {cities && cities.length > 0 && (
        <ul className="bg-[#2C2929] border mt-1 w-full max-h-60 overflow-auto shadow-md rounded-3xl mb-4">
          {cities.map((city: any) => (
            <li
              key={`${city.name}-${city.country}`} // Unique key
              className="p-2 border-b hover:bg-[#3E3B3B]"
            >
              <button
                className="w-full text-left cursor-pointer"
                onClick={() => {
                  setSearchCity(city.name);
                  onSearch(city.name);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSearchCity(city.name);
                    onSearch(city.name);
                  }
                }}
              >
                {city.name}, {city.country}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchBar;
