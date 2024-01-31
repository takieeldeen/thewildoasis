import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  // eslint-disable-next-line no-unsafe-optional-chaining

  const role = user?.role;
  return {
    isLoading,
    user,
    isAuthenticated: role === "authenticated",
  };
}
