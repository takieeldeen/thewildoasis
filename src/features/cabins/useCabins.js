import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    //A key that identify this query data
    queryKey: ["cabins"],
    //The function that actually do the querying work
    queryFn: getCabins,
  });
  return { isLoading, cabins, error };
}
