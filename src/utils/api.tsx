import axios from "axios";
import {
  WeatherDataProps,
  ForecastDataProps,
  AqiDataProps,
} from "../types/types";

const weatherApi = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_API_URL,
  params: {
    appid: import.meta.env.VITE_WEATHER_API_KEY,
    units: "metric",
  },
});

//Using Async/Await
export const fetchWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherDataProps> => {
  try {
    const response = await weatherApi.get("/data/2.5/weather", {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

export const fetchWeatherByCity = async (
  city: string
): Promise<WeatherDataProps> => {
  try {
    const response = await weatherApi.get("/data/2.5/weather", {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    throw new Error("City not found");
  }
};

export const fetchFiveDayForecastByCoords = async (
  lat: number,
  lon: number
): Promise<ForecastDataProps> => {
  try {
    const response = await weatherApi.get("/data/2.5/forecast", {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch five-day forecast data");
  }
};

export const fetchFiveDayForecastByCity = async (
  city: string
): Promise<ForecastDataProps> => {
  try {
    const response = await weatherApi.get("/data/2.5/forecast", {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    throw new Error("City not found");
  }
};

// Using Then
export const fetchCities = (search: string) => {
  if (!search) return Promise.resolve([]);

  return weatherApi
    .get("/geo/1.0/direct", {
      params: {
        q: search,
        limit: 3,
      },
    })
    .then((response) => response.data)
    .catch(() => {
      throw new Error("City not found");
    });
};

export const fetchAqiByCoords = (
  lat: number,
  lon: number
): Promise<AqiDataProps> => {
  return weatherApi
    .get("/data/2.5/air_pollution", {
      params: { lat, lon },
    })
    .then((response) => response.data)
    .catch(() => {
      throw new Error("Failed to fetch AQI data");
    });
};
