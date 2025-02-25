import { WeatherDataProps, ForecastDataProps } from "../types/types";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherDataProps> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("Failed to fetch weather data");
  return response.json();
};

export const fetchWeatherByCity = async (
  city: string
): Promise<WeatherDataProps> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("City not found");
  return response.json();
};

export const fetchFiveDayForecastByCoords = async (
  lat: number,
  lon: number
): Promise<ForecastDataProps> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("Failed to fetch five-day forecast data");
  return response.json();
};

export const fetchFiveDayForecastByCity = async (
  city: string
): Promise<ForecastDataProps> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("City not found");
  return response.json();
};

{
  /*
export const fetchAqiByCoords = async (
  lat: number,
  lon: number
): Promise<ForecastDataProps> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("AQI couldn't be fetched");
  return response.json();
}; */
}
