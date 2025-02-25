export interface WeatherDataProps {
  dt: number;
  name: string;
  main: { temp: number; humidity: number };
  sys: { country: string };
  weather: { main: string }[];
  wind: { speed: number };
  visibility: number;
}

export interface ForecastDataProps {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

export interface AqiDataProps {
  coord: {
    lon: number;
    lat: number;
  };
  list: {
    dt: number;
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
  }[];
}
