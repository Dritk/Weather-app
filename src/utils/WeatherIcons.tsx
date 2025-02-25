import {
  BsFillSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
  BsCloudHazeFill,
} from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { MdCloudySnowing } from "react-icons/md";

const WeatherIcons = (weather: string) => {
  switch (weather) {
    case "Clear":
      return <BsFillSunFill className="text-yellow-400 text-6xl " />;
    case "Clouds":
      return <BsCloudyFill className="text-white text-6xl " />;
    case "Rain":
      return <BsFillCloudRainFill className="text-blue-400 text-6xl" />;
    case "Fog":
      return <BsCloudFog2Fill className="text-[#B9B2AA] text-6xl" />;
    case "Snow":
      return <MdCloudySnowing className="text-white text-6xl" />;
    case "Haze":
      return (
        <BsCloudHazeFill className="text-gray-500 text-6xl animate-pulse animate-infinite" />
      );
    default:
      return <TiWeatherPartlySunny className="text-orange-300 text-6xl" />;
  }
};

export default WeatherIcons;
