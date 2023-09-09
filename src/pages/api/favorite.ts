import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import { without } from "lodash";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("invalid ID");
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res);
      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("invalid ID");
      }

      const updateFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updateUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updateFavoriteIds,
        },
      });

      return res.status(200).json(updateUser);
    }

    return res.status(404).end();
  } catch (err) {
    console.log(err);
    return res.status(404).end();
  }
}
