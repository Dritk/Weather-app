import { useQuery } from "@tanstack/react-query";
import {
  fetchFiveDayForecastByCity,
  fetchFiveDayForecastByCoords,
} from "../utils/api";
import { ForecastDataProps } from "../types/types";
import WeatherIcons from "../utils/WeatherIcons";

interface ForecastProps {
  city: string | null;
  location: { lat: number; lon: number } | null;
}

const Forecast = ({ city, location }: ForecastProps) => {
  const {
    data: forecastData,
    isLoading,
    error,
  } = useQuery<ForecastDataProps | null>({
    queryKey: ["forecast", city ?? location?.lat, city ?? location?.lon],
    queryFn: () =>
      city
        ? fetchFiveDayForecastByCity(city)
        : fetchFiveDayForecastByCoords(location!.lat, location!.lon),
    enabled: !!location || !!city,
  });

  if (error instanceof Error)
    return <p>Error loading forecast: {error.message}</p>;

  const dailyForecast = forecastData?.list.filter(
    (_, index) => index % 8 === 0
  );

  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2 text-center">5-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center">
            <div className="loader">Loading forecast...</div>
          </div>
        ) : (
          dailyForecast?.map((day, index) => (
            <div
              key={index}
              className="bg-gray-700 p-3 rounded-lg flex flex-col items-center"
            >
              <p className="text-gray-400">
                {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="text-lg font-bold">{Math.round(day.main.temp)}°C</p>
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-4xl">
                {WeatherIcons(day.weather[0].main)}
              </div>
              <p>{day.weather[0].main}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Forecast;
