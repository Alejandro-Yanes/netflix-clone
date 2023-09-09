import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";

export type InfoModalProps = {
  visible?: boolean;
  onClose: any;
};

const InfoModal: React.FunctionComponent<InfoModalProps> = ({
  visible,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);

  const { movieId } = useInfoModal();
  const { data: movie } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, []);

  if (!movie) return null;

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } duration-300 transform relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-96">
            <video
              src={movie?.videoUrl}
              poster={movie?.thumbnailUrl}
              autoPlay
              muted
              loop
              className="w-full brightness-[60%] object-cover h-full"
            ></video>
            <button
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
            >
              <AiOutlineClose size={30} className="text-white" />
            </button>

            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {movie.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={movie.id} />
                <FavoriteButton movieId={movie.id} />
              </div>
            </div>
          </div>
          <div className="px-12 py-8">
            <p className="text-green-400 font-semibold text-lg">New</p>
            <p className="text-white text-lg">{movie.duration}</p>
            <p className="text-white text-lg">{movie.genre}</p>
            <p className="text-white text-lg">{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
