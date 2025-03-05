import { useQuery } from "@tanstack/react-query";
import { fetchCityImage } from "../../utils/api";

export const useCityImage = (city: string) => {
  return useQuery({
    queryKey: ["cityImage", city],
    queryFn: () => fetchCityImage(city),
    enabled: !!city,
    staleTime: 1000 * 60 * 60,
  });
};
