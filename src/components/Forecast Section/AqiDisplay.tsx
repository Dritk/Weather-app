import { useQuery } from "@tanstack/react-query";
import { fetchAqiByCoords } from "../../utils/api";
import { AqiDataProps } from "../../types/types";
import { useEffect } from "react";
import Card from "../Card";

interface AqiDisplayProps {
  lat: number;
  lon: number;
}

const getAqiStatus = (aqi: number) => {
  const status = [
    { label: "Good", color: "text-green-500" },
    { label: "Fair", color: "text-yellow-400" },
    { label: "Moderate", color: "text-orange-500" },
    { label: "Poor", color: "text-red-500" },
    { label: "Very Poor", color: "text-purple-600" },
  ];
  return status[aqi - 1] || { label: "Unknown", color: "text-gray-500" };
};

const AqiDisplay = ({ lat, lon }: AqiDisplayProps) => {
  const { data, isLoading, error, refetch } = useQuery<AqiDataProps>({
    queryKey: ["aqi", lat, lon],
    queryFn: () => fetchAqiByCoords(lat, lon),
    enabled: !!lat && !!lon,
    staleTime: 0,
  });

  useEffect(() => {
    if (lat && lon) {
      refetch();
    }
  }, [lat, lon, refetch]);

  if (isLoading) return <p className="text-gray-400">Loading AQI...</p>;
  if (error) return <p className="text-red-500">Error loading AQI</p>;
  if (!data) return <p className="text-gray-500">No AQI data available</p>;

  const aqiLevel = data.list[0].main.aqi;
  const status = getAqiStatus(aqiLevel);

  return (
    <div className="flex flex-row w-full">
      <Card
        heading="Air Quality Index"
        number={aqiLevel}
        text={status.label}
        color={status.color}
        imgSrc="./Icons/aqiIcon.png"
      />

      {/* <h2 className="text-lg font-bold">Air Quality Index</h2>
      <div className={`text-4xl ${status.color}`}>
        {aqiLevel >= 4 ? <IoWarningOutline /> : <FaSmog />}
      </div>
      <h1 className={`text-2xl font-bold ${status.color}`}>{status.label}</h1>
      <p className="text-gray-400">AQI Level: {aqiLevel}</p>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="flex items-center">
          <WiDust className="text-xl text-yellow-400" />
          <p className="ml-1 text-gray-300">
            PM2.5: {data.list[0].components.pm2_5} μg/m³
          </p>
        </div>
        <div className="flex items-center">
          <WiDust className="text-xl text-blue-400" />
          <p className="ml-1 text-gray-300">
            PM10: {data.list[0].components.pm10} μg/m³
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default AqiDisplay;
