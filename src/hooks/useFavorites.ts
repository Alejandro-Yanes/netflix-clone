import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import TypeMovie from "@/types/MovieType";

export default function useFavorites() {
  const { data, isLoading, error, mutate } = useSWR<TypeMovie[]>(
    "api/favorites",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
}
