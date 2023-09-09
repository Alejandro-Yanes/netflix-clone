import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import InfoModal from "@/components/infoModal";
import useCurrentUser from "@/hooks/getCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import userMovieList from "@/hooks/useMovieList";
import type { NextPageContext } from "next";
import { signOut, getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: moviesFavorites = [] } = useFavorites();
  const { data: moviesList = [] } = userMovieList();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-20">
        <MovieList title="Trending now" movies={moviesList} />
        <MovieList title="My List" movies={moviesFavorites} /> */
      </div>
    </>
  );
}
