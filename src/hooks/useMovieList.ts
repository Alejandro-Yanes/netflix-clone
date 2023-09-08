import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import TypeMovie from "@/types/MovieType";

export default function userMovieList() {
  const { data, isLoading, error } = useSWR<TypeMovie[]>(
    "api/movies",
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
  };
}
