import { NextRequest, NextResponse } from "next/server";
import { without } from "lodash";

import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export async function handler(req: NextRequest) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth();

      const { movieId } = await req.json();

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
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

      return NextResponse.json(user);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth();

      const { movieId } = await req.json();

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return NextResponse.json(updatedUser);
    }

    return new NextResponse("Internal Error", { status: 500 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
