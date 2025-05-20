// src/hooks/useWeather.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  weathercode: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  uv_index: number;
}

interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
}

interface WeatherData {
  current: CurrentWeather;
  daily: DailyWeather;
  hourly: HourlyWeather;
}
export const useWeather = () => {
  return useQuery<WeatherData>({
    queryKey: ["weather"],
    queryFn: async () => {
      const res = await axios.get(
        "https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current=temperature_2m,weathercode,relative_humidity_2m,wind_speed_10m,uv_index&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto"
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
