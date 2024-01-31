import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    //Query Function needs to be an async function (function that returns a promise)
    queryFn: getSettings,
  });
  return { isLoading, error, settings };
}
