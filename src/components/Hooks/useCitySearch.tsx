import { useQuery } from "@tanstack/react-query";
import { fetchCities } from "../../utils/api";

const useCitySearch = (search: string) => {
  return useQuery({
    queryKey: ["citySearch", search],
    queryFn: () => fetchCities(search),
    enabled: search.length > 1,
    staleTime: 5 * 60 * 1000,
  });
};

export default useCitySearch;
