import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AqiDataProps } from "../types/types";

interface AqiDisplayProps {
  lat: number;
  lon: number;
}

const getAqiLevel = (aqi: number): { level: string; color: string } => {
  switch (aqi) {
    case 1:
      return { level: "Good", color: "bg-green-500" };
    case 2:
      return { level: "Fair", color: "bg-yellow-500" };
    case 3:
      return { level: "Moderate", color: "bg-orange-500" };
    case 4:
      return { level: "Poor", color: "bg-red-500" };
    case 5:
      return { level: "Very Poor", color: "bg-purple-700" };
    default:
      return { level: "Unknown", color: "bg-gray-500" };
  }
};

const AqiDisplay: React.FC<AqiDisplayProps> = ({ lat, lon }) => {
  const {
    data: aqiData,
    isLoading,
    error,
  } = useQuery<AqiDataProps>({
    queryKey: ["aqi", lat, lon],
    queryFn: () => fetchAqiByCoords(lat, lon),
    enabled: !!lat && !!lon, // Ensure lat/lon are available before fetching
  });

  if (isLoading) return <p className="text-gray-500">Loading AQI data...</p>;
  if (error) return <p className="text-red-500">Failed to load AQI data</p>;
  if (!aqiData || !aqiData.list || aqiData.list.length === 0) {
    return <p className="text-gray-500">No AQI data available</p>;
  }

  const aqi = aqiData.list[0].main.aqi;
  const { level, color } = getAqiLevel(aqi);

  return (
    <div className="p-4 rounded-lg shadow-md bg-white w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-2">Air Quality Index (AQI)</h2>
      <div className={`text-white font-bold p-3 rounded ${color}`}>
        AQI Level: {level} ({aqi})
      </div>
      <ul className="mt-4 text-sm">
        <li>PM2.5: {aqiData.list[0].components.pm2_5} µg/m³</li>
        <li>PM10: {aqiData.list[0].components.pm10} µg/m³</li>
        <li>Ozone (O3): {aqiData.list[0].components.o3} µg/m³</li>
        <li>CO: {aqiData.list[0].components.co} µg/m³</li>
        <li>NO2: {aqiData.list[0].components.no2} µg/m³</li>
        <li>SO2: {aqiData.list[0].components.so2} µg/m³</li>
      </ul>
    </div>
  );
};

export default AqiDisplay;
function fetchAqiByCoords(
  lat: number,
  lon: number
): AqiDataProps | Promise<AqiDataProps> {
  throw new Error("Function not implemented.");
}
