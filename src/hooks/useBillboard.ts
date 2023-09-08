import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import TypeMovie from "@/types/MovieType";

const useBillboard = () => {
  const { data, error, isLoading } = useSWR<TypeMovie>("api/random", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, isLoading };
};

export default useBillboard;
