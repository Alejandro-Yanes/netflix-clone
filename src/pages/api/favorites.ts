import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(404).end();
  }

  try {
    const { currentUser } = await serverAuth(req);

    const favoriteMovies = prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    return res.status(200).json(favoriteMovies);
  } catch (err) {
    console.log(err);
    return res.status(404).end();
  }
}
