import useBillboard from "@/hooks/useBillboard";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import { useCallback } from "react";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard = () => {
  const { data: billboard } = useBillboard();
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(billboard?.id);
  }, [billboard, openModal]);

  return (
    <div className="relative h-[56.25vw] ">
      <video
        src={billboard?.videoUrl}
        poster={billboard?.thumbnailUrl}
        muted
        loop
        className="w-full h-[56-25vw] object-cover brightness-[60%]"
      ></video>
      <div className="absolute top-[30%] md:top[40%] ml-4 md:ml-16 ">
        <h2 className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {billboard?.title}
        </h2>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {billboard?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-3 gap-3">
          <PlayButton movieId={billboard?.id} />
          <button
            className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xd lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
            onClick={handleOpenModal}
          >
            <AiOutlineInfoCircle className="mr-1" />
            More info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
