import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";

export function useMe() {
  const query = useQuery<User | null>({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        if (!response.ok) {
          return null;
        }

        return response.json();
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,     retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}