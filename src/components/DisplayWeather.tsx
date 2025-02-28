import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaSearchLocation, FaSpinner } from "react-icons/fa";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { WeatherDataProps } from "../types/types";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../utils/api";
import { fetchCountryName } from "../utils/CountryName";
import WeatherIcons from "../utils/WeatherIcons";
import Forecast from "./Forecast";
import useCitySearch from "./useCitySearch";
import useDebounce from "./useDebounce";
import AqiDisplay from "./AqiDisplay";

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
    <div className="flex flex-col items-center justify-center  w-screen min-h-screen text-gray-200 p-6">
      <div className="flex flex-col items-center justify-center bg-slate-500  bg-cover text-gray-200 min-w-[40%] p-6 rounded-lg  flex-grow">
        <div className="relative w-full max-w-md flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter a city"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full p-3 pl-4 rounded-2xl bg-gray-800 text-gray-200 placeholder-white outline-none shadow-md transition-all focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSearch()}
            className="absolute right-3 bg-blue-500 p-2 rounded-full shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            <FaSearchLocation className="text-white text-xl" />
          </button>
        </div>

        {cities && cities.length > 0 && (
          <ul className=" bg-gray-700 border mt-1 w-full max-h-60 overflow-auto shadow-md">
            {cities.map((city: any, index: number) => (
              <li
                key={index}
                className="p-2 border-b cursor-pointer "
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

        <div className="flex flex-col items-center justify-center flex-grow mt-8">
          {isLoading ? (
            <div className="w-24 h-24 mt-10 bg-gray-700 rounded-full flex items-center justify-center text-4xl">
              <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
          ) : error ? (
            <h2 className="text-red-500">Error: {error.message}</h2>
          ) : (
            data && (
              <>
                <div className="mt-8 p-6 bg-gray-800 rounded-2xl text-center w-full max-w-md shadow-lg">
                  <h1 className="text-3xl font-bold text-white">{data.name}</h1>
                  <span className="text-lg text-gray-400">
                    {isCountryLoading ? "Loading..." : countryName}
                  </span>

                  <div className="mt-4 flex flex-col items-center">
                    <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-4xl">
                      {WeatherIcons(data.weather[0].main)}
                    </div>
                    <h1 className="text-5xl font-bold mt-2 text-white">
                      {Math.round(data.main.temp)}°C
                    </h1>
                    <h2 className="text-xl text-gray-300">
                      {data.weather[0].main}
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="flex items-center bg-gray-800 p-4 rounded-xl shadow-lg">
                    <WiHumidity className="text-4xl text-teal-400 animate-bounce" />
                    <div className="ml-3">
                      <h1 className="text-xl font-semibold">
                        {data.main.humidity}%
                      </h1>
                      <p className="text-gray-400">Humidity</p>
                    </div>
                  </div>

                  <div className="flex items-center bg-gray-800 p-4 rounded-xl shadow-lg">
                    <FaWind className="text-4xl text-blue-400 animate-pulse" />
                    <div className="ml-3">
                      <h1 className="text-xl font-semibold">
                        {data.wind.speed} km/h
                      </h1>
                      <p className="text-gray-400">Wind Speed</p>
                    </div>
                  </div>
                </div>

                {data && <Forecast city={city} location={location} />}
                {location && (
                  <AqiDisplay lat={location.lat} lon={location.lon} />
                )}
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayWeather;
