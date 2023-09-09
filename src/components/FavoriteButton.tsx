import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import useFavorites from "@/hooks/useFavorites";
import useCurrentUser from "@/hooks/getCurrentUser";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import Spinner from "./Spinner";

type FavoriteButtonType = {
  movieId: string;
};

const FavoriteButton: React.FC<FavoriteButtonType> = ({ movieId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: currentUser, mutate: mutateUser } = useCurrentUser();
  const { mutate: mutateFavorites } = useFavorites();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      setIsLoading(true);
      response = await axios.delete("/api/favorite", { data: { movieId } });
      setIsLoading(false);
    } else {
      setIsLoading(true);
      response = await axios.post("/api/favorite", { movieId });
      setIsLoading(false);
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutateUser({ ...currentUser, favoriteIds: updatedFavoriteIds });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutateFavorites, mutateUser]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      className="cursor-pointer group/item w-6 h-5 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
      onClick={() => toggleFavorites()}
    >
      {isLoading ? <Spinner /> : <Icon className="text-white" size={25} />}
    </div>
  );
};

export default FavoriteButton;
