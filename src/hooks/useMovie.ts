import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import TypeMovie from "@/types/MovieType";

const useMovie = (id: string | undefined) => {
  const { data, isLoading, error, mutate } = useSWR<TypeMovie>(
    id ? `/api/movies/${id}` : null,
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
};

export default useMovie;
