import React from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import { divide } from "lodash";
import { AiOutlineArrowLeft } from "react-icons/ai";

export interface Props {}

const WatchPage: React.FunctionComponent<Props> = (props) => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data: movie } = useMovie(movieId as string);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <button onClick={() => router.back()}>
          <AiOutlineArrowLeft
            className="text-white hover:text-gray-300 transition"
            size={40}
          />
        </button>
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light ">Watching: </span>
          {movie?.title}
        </p>
      </nav>
      <video
        src={movie?.videoUrl}
        className="h-full w-full"
        autoPlay
        controls
      ></video>
    </div>
  );
};

export default WatchPage;
