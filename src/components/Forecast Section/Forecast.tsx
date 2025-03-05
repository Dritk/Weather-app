import { useQuery } from "@tanstack/react-query";
import { ForecastDataProps, WeatherDataProps } from "../../types/types";
import WeatherIcons from "../../utils/WeatherIcons";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AqiDisplay from "./AqiDisplay";
import Card from "../Card";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = import.meta.env.VITE_WEATHER_API_URL;

interface ForecastProps {
  city: string | null;
  location: { lat: number; lon: number } | null;
  weatherData: WeatherDataProps;
}

const Forecast = ({ city, location, weatherData }: ForecastProps) => {
  const {
    data: forecastData,
    isLoading,
    isError,
  } = useQuery<ForecastDataProps | null>({
    queryKey: ["forecast", city ?? location?.lat, city ?? location?.lon],
    queryFn: async () => {
      const url = city
        ? `${API_URL}/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        : `${API_URL}/data/2.5/forecast?lat=${location?.lat}&lon=${location?.lon}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch forecast data");
      }

      return response.json();
    },
    enabled: !!location || !!city,
  });

  if (isError) {
    return <p>Error loading forecast</p>;
  }

  const dailyForecast = forecastData?.list.filter(
    (_, index) => index % 8 === 0
  );

  const chartData = dailyForecast?.map((day) => ({
    date: new Date(day.dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    temp: Math.round(day.main.temp),
  }));

  const minTemp = Math.min(...(chartData?.map((d) => d.temp) || [0]));
  const maxTemp = Math.max(...(chartData?.map((d) => d.temp) || [40]));

  return (
    <div className="mt-2 p-4">
      <h2 className="text-2xl font-semibold mb-6">Week</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center">
            <div className="loader">Loading forecast...</div>
          </div>
        ) : (
          dailyForecast?.map((day) => (
            <div
              key={day.dt}
              className="bg-[#2C2929] p-3 flex flex-col items-center w-full rounded-3xl"
            >
              <p className="text-gray-400 text-lg">
                {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <p className="text-lg font-bold">{Math.round(day.main.temp)}°C</p>
              <div className="w-24 h-24  rounded-full flex items-center justify-center text-4xl ">
                {WeatherIcons(day.weather[0].main)}
              </div>
              <p className="text-lg">{day.weather[0].main}</p>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col mt-12">
        <h2 className="text-2xl lg:text-3xl mb-3">Today's Overview</h2>
        <div className="flex flex-col sm:flex-row items-stretch gap-4 mt-2">
          {location && (
            <AqiDisplay
              lat={weatherData.coord.lat}
              lon={weatherData.coord.lon}
            />
          )}
          <Card
            heading="UV Index"
            number={3}
            text="Moderate"
            imgSrc="./Icons/uvIcon.png"
          />
          <Card
            heading="Pressure"
            number={weatherData.main.pressure}
            text="Normal"
            imgSrc="./Icons/pressureIcon.png"
          />
        </div>

        <div className="flex flex-row  gap-4 mt-6">
          <div className="bg-[#2C2929] p-6 rounded-3xl w-full lg:w-2/3">
            <h3 className="text-lg mb-4">Temperature Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid
                  horizontal={true}
                  vertical={false}
                  strokeDasharray="3"
                />
                <XAxis dataKey="date" tick={{ fill: "#ffffff" }} />
                <YAxis
                  tick={{ fill: "#ffffff" }}
                  domain={[minTemp - 5, maxTemp + 5]}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#2C2929] w-full lg:w-1/3 p-6 rounded-3xl flex flex-col justify-between ">
            <h3 className="text-lg">Sunrise & Sunset</h3>

            <div className="flex gap-4 w-full">
              <img
                src="./Icons/sunriseIcon.png"
                alt="Sunrise"
                className="w-10 h-10 lg:w-14 lg:h-14"
              />
              <div className="text-left">
                <p className="text-gray-400 text-sm">Sunrise</p>
                <p className="text-xl lg:text-2xl font-semibold text-white">
                  {new Date(
                    weatherData?.sys?.sunrise * 1000
                  ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full ">
              <img
                src="./Icons/sunsetIcon.png"
                alt="Sunset"
                className="w-10 h-10 lg:w-14 lg:h-14"
              />
              <div className="text-left">
                <p className="text-gray-400 text-sm">Sunset</p>
                <p className="text-xl lg:text-2xl font-semibold text-white">
                  {new Date(weatherData?.sys?.sunset * 1000).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
