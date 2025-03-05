import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaSearchLocation, FaSpinner } from "react-icons/fa";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { WeatherDataProps } from "../types/types";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../utils/api";
import { fetchCountryName } from "../utils/CountryName";
import WeatherIcons from "../utils/WeatherIcons";
import Forecast from "./Forecast Section/Forecast";
import useCitySearch from "./Hooks/useCitySearch";
import useDebounce from "./Hooks/useDebounce";

const DisplayWeather = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [searchCity, setSearchCity] = useState("");

  const debouncedSearch = useDebounce(searchCity, 300);

  const { data: cities } = useCitySearch(debouncedSearch);

  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, []);

  const { data, isLoading, error, refetch } = useQuery<WeatherDataProps | null>(
    {
      queryKey: ["weather", city ?? location?.lat, city ?? location?.lon],
      queryFn: () =>
        city
          ? fetchWeatherByCity(city)
          : location
          ? fetchWeatherByCoords(location.lat, location.lon)
          : null,
      enabled: !!location || !!city,
      refetchInterval: 5 * 60 * 1000,
    }
  );

  const { data: countryName, isLoading: isCountryLoading } = useQuery({
    queryKey: ["countryName", data?.sys.country],
    queryFn: () =>
      data?.sys.country
        ? fetchCountryName(data.sys.country)
        : "Unknown Country",
    enabled: !!data?.sys.country,
  });

  const handleSearch = (e?: React.KeyboardEvent) => {
    if (e && /[0-9]/ && /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/.test(e.key))
      e.preventDefault();
    if (!e || e.key === "Enter" || e.type === "click") {
      if (debouncedSearch.trim()) {
        setCity(debouncedSearch);
        refetch();
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start w-full  text-gray-200 p-4 lg:p-6 gap-4 lg:gap-6  ">
      {/* Left Column */}
      <div className="flex flex-col w-full lg:w-[30%] bg-[#3E3B3B] text-lg p-6 lg:p-10 rounded-3xl h-full ">
        {/* Search Bar */}
        <div className="relative w-full  flex items-center mb-4">
          <input
            type="text"
            placeholder="Enter a city"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            onKeyDown={handleSearch}
            maxLength={30}
            className="w-full p-3 rounded-3xl bg-[#C2D4D3] text-[#7E7C7C] placeholder-[#7E7C7C] font-medium"
          />
          <button onClick={() => handleSearch()} className="absolute right-3">
            <FaSearchLocation className="text-[#7E7C7C] text-xl" />
          </button>
        </div>

        {cities && cities.length > 0 && (
          <ul className="bg-[#2C2929] border mt-1 w-full max-h-60 overflow-auto shadow-md rounded-3xl mb-4">
            {cities.map((city: any, index: number) => (
              <li
                key={index}
                className="p-2 border-b cursor-pointer hover:bg-[#3E3B3B]"
                onClick={() => {
                  setSearchCity(city.name);
                  setCity(city.name);
                }}
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}

        {/* Weather Information */}
        <div className="flex flex-col items-center justify-center gap-y-10 ">
          {isLoading ? (
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-4xl ">
              <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
          ) : error ? (
            <h2 className="text-red-500">Error: {error.message}</h2>
          ) : (
            data && (
              <>
                <div className="flex flex-col items-center">
                  {WeatherIcons(data.weather[0].main)}
                  <h1 className="text-2xl lg:text-4xl text-gray-300">
                    {data.weather[0].main}
                  </h1>
                  <h2 className="text-4xl lg:text-8xl font-bold text-white">
                    {Math.round(data.main.temp)}°C
                  </h2>
                </div>

                <div className="flex flex-col justify-center mt-2">
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-28">
                    <p className="text-2xl lg:text-3xl font-bold text-white">
                      {data.name}
                    </p>
                    <span className="text-lg text-gray-400">
                      {isCountryLoading ? "Loading..." : countryName}
                    </span>
                  </div>

                  <hr className="mt-3 border-t-2 w-full" />

                  <div className="text-left mt-6">
                    <p className="text-gray-400 text-center lg:text-left">
                      {data.weather[0].description}
                    </p>
                    <div className="flex flex-col items-center lg:items-start">
                      <p className="flex items-center gap-2 mt-2">
                        <img
                          src="./Icons/minIcon.png"
                          alt="Min Temp"
                          className="w-5 h-5"
                        />
                        Minimum Temperature- {Math.round(data.main.temp_min)}°C
                      </p>
                      <p className="flex items-center gap-2 mt-2">
                        <img
                          src="./Icons/maxIcon.png"
                          alt="Max Temp"
                          className="w-5 h-5"
                        />
                        Maximum Temperature- {Math.round(data.main.temp_max)}°C
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full max-w-md bg-[#2C2929] rounded-3xl p-4">
                  <div className="flex items-center">
                    <WiHumidity className="text-2xl lg:text-4xl text-teal-400 animate-bounce" />
                    <div className="ml-3">
                      <p className="text-lg lg:text-xl font-semibold">
                        {data.main.humidity}%
                      </p>
                      <p className="text-gray-400 text-sm lg:text-base">
                        Humidity
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaWind className="text-2xl lg:text-4xl text-blue-400 animate-pulse" />
                    <div className="ml-3">
                      <p className="text-lg lg:text-xl font-semibold">
                        {data.wind.speed} km/h
                      </p>
                      <p className="text-gray-400 text-sm lg:text-base">
                        Wind Speed
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>

      {/* Right Column - Forecast */}
      <div className="flex flex-col w-full lg:w-[70%] bg-[#3E3B3B] text-lg p-4 lg:p-6 rounded-3xl h-full ">
        {data && (
          <Forecast city={city} location={location} weatherData={data} />
        )}
      </div>
    </div>
  );
};

export default DisplayWeather;
