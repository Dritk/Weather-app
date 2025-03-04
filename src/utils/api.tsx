import {
  WeatherDataProps,
  ForecastDataProps,
  AqiDataProps,
} from "../types/types";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = import.meta.env.VITE_WEATHER_API_URL;
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

export const fetchWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherDataProps> => {
  const response = await fetch(
    `${API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("Failed to fetch weather data");
  return response.json();
};

export const fetchWeatherByCity = async (
  city: string
): Promise<WeatherDataProps> => {
  const response = await fetch(
    `${API_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("City not found");
  return response.json();
};

export const fetchFiveDayForecastByCoords = async (
  lat: number,
  lon: number
): Promise<ForecastDataProps> => {
  const response = await fetch(
    `${API_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("Failed to fetch five-day forecast data");
  return response.json();
};

export const fetchFiveDayForecastByCity = async (
  city: string
): Promise<ForecastDataProps> => {
  const response = await fetch(
    `${API_URL}/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("City not found");
  return response.json();
};

export const fetchCities = async (search: string) => {
  if (!search) return [];

  const response = await fetch(
    `${API_URL}/geo/1.0/direct?q=${search}&limit=3&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("City not found");
  return response.json();
};

export const fetchAqiByCoords = async (
  lat: number,
  lon: number
): Promise<AqiDataProps> => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch AQI data");
  }
  return response.json();
};

export const fetchCityImage = async (city: string) => {
  if (!city) return null;

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`
  );

  if (!response.ok) throw new Error("Image not found");

  const data = await response.json();
  return data.results.length > 0 ? data.results[0].urls.regular : null;
};
