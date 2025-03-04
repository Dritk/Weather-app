import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const WeatherIcons = (weather: string) => {
  switch (weather) {
    case "Clear":
      return (
        <div className="w-56 h-56">
          <DotLottieReact src="sunny2.lottie" loop autoplay />
        </div>
      );
    case "Clouds":
      return (
        <div className="w-56 h-56">
          <DotLottieReact src="cloudy.lottie" loop autoplay />
        </div>
      );
    case "Rain":
      return (
        <div className="w-56 h-56">
          <DotLottieReact src="rain.lottie" loop autoplay />
        </div>
      );
    case "Fog":
      return (
        <div className="w-56 h-56">
          <DotLottieReact src="fog.lottie" loop autoplay />
        </div>
      );
    case "Snow":
      return (
        <div className="w-56 h-56">
          <DotLottieReact src="snow.lottie" loop autoplay />
        </div>
      );

    case "Thunderstorm":
      return (
        <div className="w-56 h-56">
          <DotLottieReact src="Thunderstorm.lottie" loop autoplay />
        </div>
      );
    case "Haze":
      return (
        <div className="w-56 h-56">
          <DotLottieReact src="fog.lottie" loop autoplay />
        </div>
      );

    default:
      return (
        <div className="w-56 h-56">
          <DotLottieReact src="partlysunny.lottie" loop autoplay />
        </div>
      );
  }
};

export default WeatherIcons;
