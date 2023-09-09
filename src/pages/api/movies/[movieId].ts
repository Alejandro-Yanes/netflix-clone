import { NextApiResponse, NextApiRequest } from "next";
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
    await serverAuth(req, res);

    const { movieId } = req.query;

    if (typeof movieId !== "string") {
      throw new Error("invalid Id");
    }

    if (!movieId) {
      throw new Error("No movie Id");
    }

    const movie = await prismadb.movie.findUnique({ where: { id: movieId } });

    if (!movie) {
      throw new Error("No movie");
    }

    return res.status(200).json(movie);
  } catch (err) {
    console.log(err);
    return res.status(404).end();
  }
}
